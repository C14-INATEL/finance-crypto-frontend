import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup';
import { vi } from 'vitest';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    const signupServiceMock = {
        register: vi.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignupComponent],
            providers: [
                { provide: 'SignupService', useValue: signupServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve renderizar o título correto', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h2')?.textContent).toContain('Crie sua conta');
    });

    it('deve chamar o serviço de registro com os dados corretos ao acionar onSignup', async () => {
        signupServiceMock.register.mockResolvedValue(true);

        component.name = 'João';
        component.email = 'joao@email.com';
        component.password = 'senhaForte123';

        await component.onSignup();

        expect(signupServiceMock.register).toHaveBeenCalledWith('João', 'joao@email.com', 'senhaForte123');
        expect(component.errorMessage).toBe('');
    });

    it('deve exibir mensagem de erro quando o serviço de cadastro falhar', async () => {
        signupServiceMock.register.mockRejectedValue(new Error('E-mail já em uso'));

        component.name = 'Maria';
        component.email = 'maria@email.com';
        component.password = 'senha123';

        await component.onSignup();

        expect(signupServiceMock.register).toHaveBeenCalled();
        expect(component.errorMessage).toBe('Erro ao criar conta. Tente novamente.');
    });
});