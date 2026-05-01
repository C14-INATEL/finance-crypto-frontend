import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { vi } from 'vitest';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const authServiceMock = {
    login: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: 'AuthService', useValue: authServiceMock }
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

  it('deve chamar o serviço de login e retornar sucesso', async () => {
    authServiceMock.login.mockResolvedValue(true);

    component.email = 'seu@email.com';
    component.password = 'senha123';

    await component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('seu@email.com', 'senha123');
  });

  it('deve exibir mensagem de erro quando o serviço falhar', async () => {
    authServiceMock.login.mockRejectedValue(new Error('Erro de API'));

    component.email = 'errado@email.com';
    component.password = 'senhaErrada';

    await component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('errado@email.com', 'senhaErrada');
    expect(component.errorMessage).toBe('Credenciais inválidas');
  });
});