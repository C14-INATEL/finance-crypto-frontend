import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { of, throwError, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const authServiceMock = {
    login: vi.fn()
  };

  const routerMock = {
    navigate: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com campos vazios e estado padrão correto', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.carregando).toBe(false);
  });

  it('deve renderizar o título de boas-vindas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Bem-vindo de volta');
  });

  it('deve desabilitar o botão e mostrar "Entrando..." quando estiver carregando', () => {
    component.carregando = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(button.disabled).toBe(true);
    expect(button.textContent.trim()).toBe('Entrando...');
  });

  it('deve habilitar o botão e mostrar "Entrar" quando não estiver carregando', () => {
    component.carregando = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    expect(button.disabled).toBe(false);
    expect(button.textContent.trim()).toBe('Entrar');
  });

  it('não deve exibir o parágrafo de erro inicialmente', () => {
    const errorParagraph = fixture.debugElement.query(By.css('.text-rose-400'));
    expect(errorParagraph).toBeNull();
  });

  it('deve limpar a mensagem de erro e ativar o loading ao iniciar um novo login', () => {
    component.errorMessage = 'Erro antigo';
    component.carregando = false;

    const loginPendente = new Subject();
    authServiceMock.login.mockReturnValue(loginPendente.asObservable());

    component.onLogin();

    expect(component.errorMessage).toBe('');
    expect(component.carregando).toBe(true);
  });

  it('deve chamar o serviço de login e redirecionar para /home em caso de sucesso', () => {
    authServiceMock.login.mockReturnValue(of({ tokenValue: 'fake-jwt-token' }));

    component.username = 'joao_ryan';
    component.password = 'senha123';

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('joao_ryan', 'senha123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);

    expect(component.carregando).toBe(false);
  });

  it('deve exibir mensagem de credenciais incorretas quando a API retornar erro 401', () => {
    authServiceMock.login.mockReturnValue(throwError(() => ({ status: 401 })));

    component.username = 'errado';
    component.password = 'senhaErrada';

    component.onLogin();
    fixture.detectChanges();

    expect(authServiceMock.login).toHaveBeenCalledWith('errado', 'senhaErrada');
    expect(component.errorMessage).toBe('Usuário ou senha incorretos.');
    expect(component.carregando).toBe(false);

    const errorParagraph = fixture.debugElement.query(By.css('.text-rose-400')).nativeElement;
    expect(errorParagraph.textContent).toContain('Usuário ou senha incorretos.');
  });

  it('deve exibir mensagem de erro genérica quando a API falhar por outros motivos (ex: 500, network error)', () => {
    authServiceMock.login.mockReturnValue(throwError(() => ({ status: 500 })));

    component.username = 'joao_ryan';
    component.password = 'senha123';

    component.onLogin();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Erro ao conectar com o servidor.');
    expect(component.carregando).toBe(false);
  });
});