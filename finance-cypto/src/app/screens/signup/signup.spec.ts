import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { AuthService } from '../../services/auth.service';
import { vi } from 'vitest';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    const authServiceMock = {
        signup: vi.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock }
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

    it('deve renderizar o título correto', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h2')?.textContent).toContain('Crie sua conta');
    });

    it('deve chamar o serviço de registro com os dados corretos ao acionar onSignup', async () => {
        authServiceMock.signup.mockResolvedValue(undefined);

        component.name = 'João';
        component.email = 'joao@email.com';
        component.password = 'senhaForte123';

        await component.onSignup();

        expect(authServiceMock.signup).toHaveBeenCalledWith('João', 'joao@email.com', 'senhaForte123');
        expect(component.errorMessage).toBe('');
    });

    it('deve exibir mensagem de erro quando o serviço de cadastro falhar', async () => {
        authServiceMock.signup.mockRejectedValue(new Error('Este e-mail já está em uso.'));

        component.name = 'Maria';
        component.email = 'maria@email.com';
        component.password = 'senha123';

        await component.onSignup();
        fixture.detectChanges();

        expect(authServiceMock.signup).toHaveBeenCalled();
        expect(component.errorMessage).toBeTruthy();
    });
});