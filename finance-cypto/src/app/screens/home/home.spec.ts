import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

// Interface que define o formato dos dados da nossa carteira
export interface AtivoCarteira {
  id: string;
  nome: string;
  simbolo: string;
  quantidade: number;
  valorTotal: number;
  variacao: number;
  icone: string;
  alocacao: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html'
})
export class Home {
  // Variáveis de estado da tela
  saldoVisivel: boolean = true;
  patrimonioTotal: number = 1000;
  precoAtualBtc: number = 0;
  mensagemErroApi: string = '';

  // Nossa lista dinâmica (o Mock da Carteira) que o HTML está procurando!
  minhaCarteira: AtivoCarteira[] = [
    { 
      id: '1', 
      nome: 'Bitcoin', 
      simbolo: 'BTC', 
      quantidade: 0.05, 
      valorTotal: 10200.00, 
      variacao: 5.2, 
      icone: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032',
      alocacao: 70
    },
    { 
      id: '2', 
      nome: 'Ethereum', 
      simbolo: 'ETH', 
      quantidade: 0.30, 
      valorTotal: 4320.00, 
      variacao: -1.2, 
      icone: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032',
      alocacao: 30
    }
  ];

  constructor(private cryptoService: CryptoService) {}

  // Lógicas e Regras de Negócio
  alternarVisibilidadeSaldo() {
    this.saldoVisivel = !this.saldoVisivel;
  }

  comprarAtivo(valor: number): boolean {
    if (valor > 0) {
      this.patrimonioTotal += valor;
      return true;
    }
    return false;
  }

  venderAtivo(valor: number): boolean {
    if (valor > 0 && this.patrimonioTotal >= valor) {
      this.patrimonioTotal -= valor;
      return true;
    }
    return false;
  }

  obterClasseBadge(variacao: number): string {
    if (variacao > 0) return 'positive';
    if (variacao < 0) return 'negative';
    return '';
  }

  atualizarCotacao() {
    try {
      this.precoAtualBtc = this.cryptoService.buscarPrecoBitcoinApi();
      this.mensagemErroApi = '';
    } catch (error) {
      this.mensagemErroApi = 'Falha na conexão com a API de Criptomoedas';
      this.precoAtualBtc = 0;
    }
  }
}