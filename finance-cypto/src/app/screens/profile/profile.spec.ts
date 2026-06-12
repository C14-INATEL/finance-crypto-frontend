import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { vi } from 'vitest';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    const usuarioMock = { userId: 1, username: 'joao', email: 'joao@test.com' };
    const authServiceMock = {
        usuarioLogado$: new BehaviorSubject(usuarioMock),
        logout: vi.fn()
    };
    const profileServiceMock = {
        atualizarPerfil: vi.fn(),
        excluirConta: vi.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: ProfileService, useValue: profileServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('deve carregar o usuário do AuthService ao iniciar', () => {
        expect(component.usuario).toEqual(usuarioMock);
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('@joao');
    });

    it('deve alternar a visibilidade dos modais', () => {
        expect(component.showEditModal).toBe(false);
        component.toggleEditModal();
        expect(component.showEditModal).toBe(true);

        component.toggleDeleteModal();
        expect(component.showDeleteModal).toBe(true);
    });

    it('deve chamar profileService.atualizarPerfil no handleUpdate', () => {
        const novosDados = { username: 'novo_joao' };
        profileServiceMock.atualizarPerfil.mockReturnValue(of({}));

        component.handleUpdate(novosDados);

        expect(profileServiceMock.atualizarPerfil).toHaveBeenCalledWith(novosDados);
        expect(component.usuario.username).toBe('novo_joao');
        expect(component.showEditModal).toBe(false);
    });

    it('deve deslogar o usuário após excluir a conta com sucesso', () => {
        profileServiceMock.excluirConta.mockReturnValue(of({}));
        Object.defineProperty(window, 'location', { value: { href: '' }, writable: true });

        component.handleDelete();

        expect(profileServiceMock.excluirConta).toHaveBeenCalled();
        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(window.location.href).toBe('/login');
    });

    it('deve exibir alerta em caso de erro na exclusão', () => {
        profileServiceMock.excluirConta.mockReturnValue(throwError(() => new Error('Erro')));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });

        component.handleDelete();

        expect(alertSpy).toHaveBeenCalledWith('Falha ao excluir a conta.');
    });
});