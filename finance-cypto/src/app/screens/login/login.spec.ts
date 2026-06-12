import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { of, throwError } from 'rxjs';

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

  it('deve renderizar o título de boas-vindas', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Bem-vindo de volta');
  });

  it('deve chamar o serviço de login e retornar sucesso', () => {
    authServiceMock.login.mockReturnValue(of({ tokenValue: 'fake-jwt-token' }));

    component.username = 'joao_ryan';
    component.password = 'senha123';

    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('joao_ryan', 'senha123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('deve exibir mensagem de erro quando o serviço falhar', () => {
    authServiceMock.login.mockReturnValue(throwError(() => ({ status: 401 })));

    component.username = 'errado';
    component.password = 'senhaErrada';

    component.onLogin();
    fixture.detectChanges();

    expect(authServiceMock.login).toHaveBeenCalledWith('errado', 'senhaErrada');
    expect(component.errorMessage).toBe('Usuário ou senha incorretos.');
  });
});