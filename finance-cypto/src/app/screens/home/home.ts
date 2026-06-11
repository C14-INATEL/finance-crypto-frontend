import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class Home {
  patrimonioTotal: number = 14520;
  saldoVisivel: boolean = true;

  precoAtualBtc: number = 0;
  mensagemErroApi: string = '';

  constructor(private cryptoService: CryptoService) { }

  atualizarCotacao(): void {
    try {
      this.precoAtualBtc = this.cryptoService.buscarPrecoBitcoinApi();
      this.mensagemErroApi = '';
    } catch (error) {
      this.mensagemErroApi = 'Falha na conexão com a API de Criptomoedas';
    }
  }

  alternarVisibilidadeSaldo(): void {
    this.saldoVisivel = !this.saldoVisivel;
  }

  obterClasseBadge(porcentagem: number): string {
    return porcentagem >= 0 ? 'positive' : 'negative';
  }

  comprarAtivo(valor: number): boolean {
    if (valor <= 0) return false;
    this.patrimonioTotal += valor;
    return true;
  }

  venderAtivo(valor: number): boolean {
    if (valor > this.patrimonioTotal || valor <= 0) return false;
    this.patrimonioTotal -= valor;
    return true;
  }
}