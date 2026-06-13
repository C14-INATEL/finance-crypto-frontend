import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
  precoMomento: number;
  data: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html'
})
export class Home implements OnInit, OnDestroy {
  userId: string = '';
  saldoVisivel: boolean = true;
  patrimonioTotal: number = 0;
  ativosMercado: any[] = [];
  carregandoApi: boolean = false;

  modalCompraAberto: boolean = false;
  modalVendaAberto: boolean = false;

  formTransacao = {
    ativoId: '',
    quantidade: null as number | null,
    valorTotal: null as number | null,
    precoUnitarioAtual: 0,
    quantidadePossuida: 0
  };

  minhaCarteira: AtivoCarteira[] = [];
  historicoTransacoes: Transacao[] = [];

  private authSub!: Subscription;

  constructor(
    private cryptoService: CryptoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authSub = this.authService.usuarioLogado$.subscribe(user => {
      if (user) {
        this.userId = user.userId;
      } else {
        this.userId = 'guest';
      }

      this.carregarDadosPersistidos();
      this.carregarPrecosDoMercado();
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  private getStorageKey(key: string): string {
    return `${key}_${this.userId}`;
  }

  carregarDadosPersistidos() {
    const carteiraSalva = localStorage.getItem(this.getStorageKey('minhaCarteira'));
    const historicoSalvo = localStorage.getItem(this.getStorageKey('historicoTransacoes'));
    const patrimonioSalvo = localStorage.getItem(this.getStorageKey('patrimonioTotal'));

    if (carteiraSalva) {
      this.minhaCarteira = JSON.parse(carteiraSalva);
    } else {
      this.minhaCarteira = [];
    }

    if (historicoSalvo) {
      this.historicoTransacoes = JSON.parse(historicoSalvo);
    } else {
      this.historicoTransacoes = [];
    }

    if (patrimonioSalvo) {
      this.patrimonioTotal = Number(patrimonioSalvo);
    } else {
      this.patrimonioTotal = 0;
    }
  }

  salvarDadosPersistidos() {
    localStorage.setItem(this.getStorageKey('minhaCarteira'), JSON.stringify(this.minhaCarteira));
    localStorage.setItem(this.getStorageKey('historicoTransacoes'), JSON.stringify(this.historicoTransacoes));
    localStorage.setItem(this.getStorageKey('patrimonioTotal'), this.patrimonioTotal.toString());
  }

  carregarPrecosDoMercado() {
    this.carregandoApi = true;
    this.cryptoService.buscarDetalhesCriptos().subscribe({
      next: (dados) => {
        this.ativosMercado = dados;
        this.carregandoApi = false;
        this.sincronizarCarteiraComPrecosAtuais();
      },
      error: () => {
        this.carregandoApi = false;
      }
    });
  }

  sincronizarCarteiraComPrecosAtuais() {
    this.patrimonioTotal = 0;
    this.minhaCarteira.forEach(ativo => {
      const dadosAtuais = this.ativosMercado.find(a => a.id === ativo.id);
      if (dadosAtuais) {
        ativo.variacao = dadosAtuais.price_change_percentage_24h;
        ativo.valorTotal = ativo.quantidade * dadosAtuais.current_price;
      }
      this.patrimonioTotal += ativo.valorTotal;
    });

    this.minhaCarteira.forEach(ativo => {
      ativo.alocacao = this.patrimonioTotal > 0 ? (ativo.valorTotal / this.patrimonioTotal) * 100 : 0;
    });

    this.salvarDadosPersistidos();
  }

  alternarVisibilidadeSaldo() {
    this.saldoVisivel = !this.saldoVisivel;
  }

  obterClasseBadge(variacao: number): string {
    if (variacao > 0) return 'text-emerald-400 bg-emerald-500/10';
    if (variacao < 0) return 'text-rose-400 bg-rose-500/10';
    return 'text-zinc-400 bg-zinc-500/10';
  }

  abrirModalCompra() {
    this.resetarFormulario();
    this.modalCompraAberto = true;
  }

  abrirModalVenda() {
    this.resetarFormulario();
    this.modalVendaAberto = true;
  }

  fecharModais() {
    this.modalCompraAberto = false;
    this.modalVendaAberto = false;
  }

  resetarFormulario() {
    this.formTransacao = { ativoId: '', quantidade: null, valorTotal: null, precoUnitarioAtual: 0, quantidadePossuida: 0 };
  }

  onAtivoSelecionado() {
    const ativoMercado = this.ativosMercado.find(a => a.id === this.formTransacao.ativoId);
    const ativoCarteira = this.minhaCarteira.find(a => a.id === this.formTransacao.ativoId);

    this.formTransacao.quantidadePossuida = ativoCarteira ? ativoCarteira.quantidade : 0;
    this.formTransacao.quantidade = null;
    this.formTransacao.valorTotal = null;

    if (ativoMercado) {
      this.formTransacao.precoUnitarioAtual = ativoMercado.current_price;
    } else {
      this.formTransacao.precoUnitarioAtual = 0;
    }
  }

  calcularPorQuantidade() {
    if (this.formTransacao.quantidade != null && this.formTransacao.precoUnitarioAtual > 0) {
      this.formTransacao.valorTotal = this.formTransacao.quantidade * this.formTransacao.precoUnitarioAtual;
    } else {
      this.formTransacao.valorTotal = null;
    }
  }

  calcularPorValor() {
    if (this.formTransacao.valorTotal != null && this.formTransacao.precoUnitarioAtual > 0) {
      this.formTransacao.quantidade = this.formTransacao.valorTotal / this.formTransacao.precoUnitarioAtual;
    } else {
      this.formTransacao.quantidade = null;
    }
  }

  isVendaInvalida(): boolean {
    return this.modalVendaAberto && (this.formTransacao.quantidade ?? 0) > this.formTransacao.quantidadePossuida;
  }

  confirmarTransacao(tipo: 'COMPRA' | 'VENDA') {
    const ativoMoeda = this.ativosMercado.find(a => a.id === this.formTransacao.ativoId);

    if (!ativoMoeda || !this.formTransacao.quantidade || !this.formTransacao.valorTotal || this.formTransacao.quantidade <= 0) {
      alert('Selecione um ativo e informe valores válidos.');
      return;
    }

    if (this.isVendaInvalida()) return;

    const novaTransacao: Transacao = {
      id: Math.random().toString(36).substring(2, 9),
      tipo: tipo,
      ativo: ativoMoeda.name,
      simbolo: ativoMoeda.symbol.toUpperCase(),
      quantidadeMovimentada: this.formTransacao.quantidade,
      valorReais: this.formTransacao.valorTotal,
      precoMomento: this.formTransacao.precoUnitarioAtual,
      data: new Date().toLocaleString('pt-BR')
    };

    this.historicoTransacoes.unshift(novaTransacao);

    if (tipo === 'COMPRA') {
      this.atualizarOuAdicionarNaCarteira(ativoMoeda, this.formTransacao.quantidade, this.formTransacao.valorTotal);
    } else {
      this.removerOuReduzirNaCarteira(ativoMoeda, this.formTransacao.quantidade, this.formTransacao.valorTotal);
    }

    this.recalcularPatrimonioEAlocacao();
    this.fecharModais();
  }

  atualizarOuAdicionarNaCarteira(ativoMoeda: any, qtd: number, valor: number) {
    const ativoExistente = this.minhaCarteira.find(a => a.id === ativoMoeda.id);
    if (ativoExistente) {
      ativoExistente.quantidade += qtd;
      ativoExistente.valorTotal += valor;
    } else {
      this.minhaCarteira.push({
        id: ativoMoeda.id,
        nome: ativoMoeda.name,
        simbolo: ativoMoeda.symbol.toUpperCase(),
        quantidade: qtd,
        valorTotal: valor,
        variacao: ativoMoeda.price_change_percentage_24h,
        icone: ativoMoeda.image,
        alocacao: 0
      });
    }
  }

  removerOuReduzirNaCarteira(ativoMoeda: any, qtd: number, valor: number) {
    const ativoExistente = this.minhaCarteira.find(a => a.id === ativoMoeda.id);
    if (ativoExistente) {
      ativoExistente.quantidade -= qtd;
      ativoExistente.valorTotal -= valor;
      if (ativoExistente.quantidade <= 0) {
        this.minhaCarteira = this.minhaCarteira.filter(a => a.id !== ativoMoeda.id);
      }
    }
  }

  recalcularPatrimonioEAlocacao() {
    this.patrimonioTotal = 0;
    this.minhaCarteira.forEach(ativo => {
      this.patrimonioTotal += ativo.valorTotal;
    });

    this.minhaCarteira.forEach(ativo => {
      ativo.alocacao = this.patrimonioTotal > 0 ? (ativo.valorTotal / this.patrimonioTotal) * 100 : 0;
    });

    this.salvarDadosPersistidos();
  }
}