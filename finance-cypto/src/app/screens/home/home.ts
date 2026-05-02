import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CryptoService } from './crypto.service'; // Puxando o serviço

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  patrimonioTotal: number = 14520;
  saldoVisivel: boolean = true;
  
  precoAtualBtc: number = 0;
  mensagemErroApi: string = '';

  // Injetando o serviço no componente
  constructor(private cryptoService: CryptoService) {}

  // Função que tenta buscar o preço e trata o erro caso a API falhe
  atualizarCotacao(): void {
    try {
      this.precoAtualBtc = this.cryptoService.buscarPrecoBitcoinApi();
      this.mensagemErroApi = ''; 
    } catch (error) {
      this.mensagemErroApi = 'Falha na conexão com a API de Criptomoedas';
    }
  }

  // --- Funções antigas que você já tinha ---
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