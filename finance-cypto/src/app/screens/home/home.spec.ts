import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, RouterTestingModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- TESTES UNITÁRIOS  ---

  it('Teste 1: Deve alternar a visibilidade do saldo na tela', () => {
    expect(component.saldoVisivel).toBe(true); 
    
    component.alternarVisibilidadeSaldo(); 
    expect(component.saldoVisivel).toBe(false); 
    
    component.alternarVisibilidadeSaldo(); 
    expect(component.saldoVisivel).toBe(true); 
  });

  it('Teste 2: Deve aplicar a classe CSS correta na badge de rentabilidade', () => {
    expect(component.obterClasseBadge(5.2)).toBe('positive');
    expect(component.obterClasseBadge(-1.2)).toBe('negative');
  });

  it('Teste 3: Deve aumentar o patrimônio ao comprar um ativo válido', () => {
    component.patrimonioTotal = 1000; 
    
    const compraRealizada = component.comprarAtivo(500); 
    
    expect(compraRealizada).toBe(true);
    expect(component.patrimonioTotal).toBe(1500); 
    
    expect(component.comprarAtivo(-100)).toBe(false); 
  });

  it('Teste 4: Deve diminuir o patrimônio ao vender ativo e impedir saldo negativo', () => {
    component.patrimonioTotal = 2000; 
    
    const vendaRealizada = component.venderAtivo(500); 
    
    expect(vendaRealizada).toBe(true);
    expect(component.patrimonioTotal).toBe(1500); 
    
    const vendaInvalida = component.venderAtivo(5000); 
    
    expect(vendaInvalida).toBe(false); 
    expect(component.patrimonioTotal).toBe(1500); 
  });

});