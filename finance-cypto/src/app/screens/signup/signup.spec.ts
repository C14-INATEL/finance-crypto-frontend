import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { of, throwError, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Signup Component', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    const authServiceMock = {
        signup: vi.fn()
    };

    const routerMock = {
        navigate: vi.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
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
        expect(component.email).toBe('');
        expect(component.password).toBe('');
        expect(component.errorMessage).toBe('');
        expect(component.carregando).toBe(false);
    });

    it('deve renderizar o título principal', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h2')?.textContent).toContain('Crie sua conta');
    });

    it('deve desabilitar o botão e mostrar "Criando..." quando estiver carregando', () => {
        component.carregando = true;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

        expect(button.disabled).toBe(true);
        expect(button.textContent.trim()).toBe('Criando...');
    });

    it('deve habilitar o botão e mostrar "Criar Conta" quando não estiver carregando', () => {
        component.carregando = false;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

        expect(button.disabled).toBe(false);
        expect(button.textContent.trim()).toBe('Criar Conta');
    });

    it('não deve exibir o parágrafo de erro inicialmente', () => {
        const errorParagraph = fixture.debugElement.query(By.css('.text-rose-400'));
        expect(errorParagraph).toBeNull();
    });

    it('deve limpar a mensagem de erro e ativar o loading ao iniciar um novo cadastro', () => {
        component.errorMessage = 'Erro anterior';
        component.carregando = false;

        const signupPendente = new Subject();
        authServiceMock.signup.mockReturnValue(signupPendente.asObservable());

        component.onSignup();

        expect(component.errorMessage).toBe('');
        expect(component.carregando).toBe(true);
    });

    it('deve chamar o serviço de signup e redirecionar para o login em caso de sucesso', () => {
        authServiceMock.signup.mockReturnValue(of({}));

        component.username = 'Maria';
        component.email = 'maria@email.com';
        component.password = 'senha123';

        component.onSignup();

        expect(authServiceMock.signup).toHaveBeenCalledWith('Maria', 'maria@email.com', 'senha123');
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('deve exibir mensagem de erro específica quando o usuário já existir (Erro 409)', () => {
        authServiceMock.signup.mockReturnValue(throwError(() => ({ status: 409 })));

        component.username = 'João';
        component.email = 'joao@email.com';
        component.password = 'senha123';

        component.onSignup();
        fixture.detectChanges();

        expect(authServiceMock.signup).toHaveBeenCalledWith('João', 'joao@email.com', 'senha123');
        expect(component.errorMessage).toBe('Este usuário já existe.');
        expect(component.carregando).toBe(false);

        const errorParagraph = fixture.debugElement.query(By.css('.text-rose-400')).nativeElement;
        expect(errorParagraph.textContent).toContain('Este usuário já existe.');
    });

    it('deve exibir mensagem de erro genérica quando a API falhar por outros motivos (ex: 500)', () => {
        authServiceMock.signup.mockReturnValue(throwError(() => ({ status: 500 })));

        component.username = 'Teste';
        component.email = 'teste@email.com';
        component.password = '123456';

        component.onSignup();
        fixture.detectChanges();

        expect(component.errorMessage).toBe('Erro ao criar a conta.');
        expect(component.carregando).toBe(false);
    });
});