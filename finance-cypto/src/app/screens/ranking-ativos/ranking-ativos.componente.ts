import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export interface AtivoRanking {
  simbolo: string;
  precoMedioCompra: number;
  precoAtual: number;
  percentualLucro: number;
}

@Component({
  selector: 'app-ranking-ativos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-ativos.component.html'
})
export class RankingAtivosComponent implements OnInit, OnDestroy {

  ativos: AtivoRanking[] = [];
  carregando = true;
  erro = '';
  mostrarLucrativos = true;

  private routerSubscription!: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.carregarRanking(this.mostrarLucrativos);
    });
  }

  ngOnInit(): void {
    this.carregarRanking(true);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  carregarRanking(lucrativos: boolean) {
    this.ngZone.run(() => {
      this.carregando = true;
      this.erro = '';
      this.mostrarLucrativos = lucrativos;
      this.cdr.detectChanges();
    });

    const request = lucrativos
      ? this.cryptoService.buscarRankingLucrativos()
      : this.cryptoService.buscarRankingPrejuizos();

    request.pipe(take(1)).subscribe({
      next: (dados: AtivoRanking[]) => {
        // O SEGREDO ESTÁ AQUI: Forçamos a atualização das variáveis DENTRO da zona do Angular
        this.ngZone.run(() => {
          this.ativos = dados;
          this.carregando = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Falha ao buscar o ranking:', err);

        this.ngZone.run(() => {
          if (err.status === 401) {
            this.erro = 'Sessão expirada. Por favor, faça login novamente.';
          } else {
            this.erro = 'Não foi possível conectar com o servidor.';
          }
          this.carregando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }
}