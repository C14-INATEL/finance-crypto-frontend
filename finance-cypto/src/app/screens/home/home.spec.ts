import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Home } from './home';
import { CryptoService } from '../../services/crypto.service';

class MockCryptoService {
  buscarPrecoBitcoinApi(): number {
    return 99999;
  }
}

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule],
      providers: [
        { provide: CryptoService, useClass: MockCryptoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    cryptoService = TestBed.inject(CryptoService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste 1: Deve alternar a visibilidade do saldo na tela', () => {
    expect(component.saldoVisivel).toBe(true);
    component.alternarVisibilidadeSaldo();
    expect(component.saldoVisivel).toBe(false);
    component.alternarVisibilidadeSaldo();
    expect(component.saldoVisivel).toBe(true);
  });

  it('Teste 2: Deve aumentar o patrimônio ao comprar um ativo válido', () => {
    component.patrimonioTotal = 1000;
    expect(component.comprarAtivo(500)).toBe(true);
    expect(component.patrimonioTotal).toBe(1500);
    expect(component.comprarAtivo(-100)).toBe(false);
  });

  it('Teste 3: Deve diminuir o patrimônio ao vender ativo e impedir saldo negativo', () => {
    component.patrimonioTotal = 2000;
    expect(component.venderAtivo(500)).toBe(true);
    expect(component.patrimonioTotal).toBe(1500);
    expect(component.venderAtivo(5000)).toBe(false);
  });

  it('Teste 4 (Mock): Deve atualizar a cotação usando os dados simulados da API', () => {
    expect(component.precoAtualBtc).toBe(0);

    component.atualizarCotacao();

    expect(component.precoAtualBtc).toBe(99999);
    expect(component.mensagemErroApi).toBe('');
  });

  it('Teste 5 (Mock): Deve tratar erro e exibir mensagem se a API falhar', () => {
    cryptoService.buscarPrecoBitcoinApi = () => { throw new Error('API Offline'); };

    component.atualizarCotacao();

    expect(component.mensagemErroApi).toBe('Falha na conexão com a API de Criptomoedas');
    expect(component.precoAtualBtc).toBe(0);
  });

});