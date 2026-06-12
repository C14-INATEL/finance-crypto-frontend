import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

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

export interface Transacao {
  id: string;
  tipo: 'COMPRA' | 'VENDA';
  ativo: string;
  simbolo: string;
  quantidadeMovimentada: number;
  valorReais: number;
  data: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html'
})
export class Home {
  saldoVisivel: boolean = true;
  patrimonioTotal: number = 1000;
  precoAtualBtc: number = 0;
  mensagemErroApi: string = '';

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

  historicoTransacoes: Transacao[] = [
    {
      id: 't1',
      tipo: 'COMPRA',
      ativo: 'Bitcoin',
      simbolo: 'BTC',
      quantidadeMovimentada: 0.05,
      valorReais: 10200.00,
      data: '12/06/2026 10:30'
    },
    {
      id: 't2',
      tipo: 'COMPRA',
      ativo: 'Ethereum',
      simbolo: 'ETH',
      quantidadeMovimentada: 0.30,
      valorReais: 4320.00,
      data: '10/06/2026 14:15'
    },
    {
      id: 't3',
      tipo: 'VENDA',
      ativo: 'Bitcoin',
      simbolo: 'BTC',
      quantidadeMovimentada: 0.01,
      valorReais: 2040.00,
      data: '05/06/2026 09:00'
    }
  ];

  constructor(private cryptoService: CryptoService) {}

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