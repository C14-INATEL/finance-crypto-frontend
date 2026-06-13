import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Home } from './home';
import { CryptoService } from '../../services/crypto.service';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, of } from 'rxjs';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockCryptoService: any;
  let mockAuthService: any;

  beforeAll(() => {
    registerLocaleData(localePt);
  });

  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem('usuario_logado', JSON.stringify({ userId: 'teste-123', username: 'Tester' }));

    mockCryptoService = {
      buscarDetalhesCriptos: () => of([
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 350000, price_change_percentage_24h: 5.5 }
      ])
    };

    mockAuthService = {
      usuarioLogado$: new BehaviorSubject({ userId: 'teste-123' })
    };

    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule],
      providers: [
        { provide: CryptoService, useValue: mockCryptoService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
    expect(component.userId).toBe('teste-123');
  });

  it('Teste 1: Deve alternar a visibilidade do saldo na tela', () => {
    expect(component.saldoVisivel).toBe(true);
    component.alternarVisibilidadeSaldo();
    expect(component.saldoVisivel).toBe(false);
    component.alternarVisibilidadeSaldo();
    expect(component.saldoVisivel).toBe(true);
  });

  it('Teste 2: Deve aplicar as classes CSS corretas nas badges de rentabilidade', () => {
    expect(component.obterClasseBadge(5.2)).toContain('emerald');
    expect(component.obterClasseBadge(-1.2)).toContain('rose');
    expect(component.obterClasseBadge(0)).toContain('zinc');
  });

  it('Teste 3: Deve abrir os modais e resetar o formulário', () => {
    component.formTransacao.quantidade = 10;

    component.abrirModalCompra();
    expect(component.modalCompraAberto).toBe(true);
    expect(component.formTransacao.quantidade).toBeNull();

    component.fecharModais();
    expect(component.modalCompraAberto).toBe(false);
  });

  it('Teste 4: Deve calcular valores bidirecionais corretamente', () => {
    component.formTransacao.precoUnitarioAtual = 100;

    component.formTransacao.quantidade = 2;
    component.calcularPorQuantidade();
    expect(component.formTransacao.valorTotal).toBe(200);

    component.formTransacao.valorTotal = 500;
    component.calcularPorValor();
    expect(component.formTransacao.quantidade).toBe(5);
  });

  it('Teste 5: Deve realizar a compra de um ativo e atualizar o portfólio', () => {
    const patrimonioInicial = component.patrimonioTotal;

    component.abrirModalCompra();
    component.formTransacao.ativoId = 'bitcoin';
    component.onAtivoSelecionado();

    component.formTransacao.quantidade = 0.1;
    component.calcularPorQuantidade();

    component.confirmarTransacao('COMPRA');

    expect(component.modalCompraAberto).toBe(false);
    expect(component.historicoTransacoes.length).toBe(1);
    expect(component.historicoTransacoes[0].tipo).toBe('COMPRA');
    expect(component.patrimonioTotal).toBe(patrimonioInicial + 35000);
  });

  it('Teste 6: Deve impedir a venda se a quantidade for maior que a possuída', () => {
    component.abrirModalVenda();

    component.formTransacao.ativoId = 'bitcoin';
    component.onAtivoSelecionado();

    component.formTransacao.quantidade = 1;

    expect(component.isVendaInvalida()).toBe(true);
  });
});