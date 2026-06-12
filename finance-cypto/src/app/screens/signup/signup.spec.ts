import { ComponentFixture, TestBed } from '@angular/core/testing';
// ou o nome exato da classe do seu componente (ex: SignupComponent)
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { SignupComponent } from './signup';

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

    it('deve chamar o serviço de signup e redirecionar para o login em caso de sucesso', () => {
        // Simula uma resposta de sucesso do backend com Observable
        authServiceMock.signup.mockReturnValue(of({}));

        // Trocamos .name por .username
        component.username = 'João';
        component.email = 'joao@email.com';
        component.password = 'senha123';

        // Executamos a função
        component.onSignup();

        expect(authServiceMock.signup).toHaveBeenCalledWith('João', 'joao@email.com', 'senha123');
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('deve exibir mensagem de erro quando o usuário já existir (409)', () => {
        // Simula um erro 409 Conflict vindo do backend
        authServiceMock.signup.mockReturnValue(throwError(() => ({ status: 409 })));

        // Trocamos .name por .username
        component.username = 'Maria';
        component.email = 'maria@email.com';
        component.password = 'senha123';

        component.onSignup();
        fixture.detectChanges(); // Atualiza o HTML

        expect(authServiceMock.signup).toHaveBeenCalledWith('Maria', 'maria@email.com', 'senha123');
        expect(component.errorMessage).toBe('Este usuário já existe.');
    });
});