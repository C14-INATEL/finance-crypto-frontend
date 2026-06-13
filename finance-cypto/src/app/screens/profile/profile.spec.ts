import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../services/profile.service';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let profileServiceMock: any;
    const usuarioMock = { userId: 1, username: 'joao', email: 'joao@test.com' };

    beforeEach(async () => {
        localStorage.clear();
        localStorage.setItem('usuario_logado', JSON.stringify(usuarioMock));

        profileServiceMock = {
            atualizarPerfil: vi.fn().mockReturnValue(of({ success: true })),
            excluirConta: vi.fn().mockReturnValue(of({ success: true }))
        };

        Object.defineProperty(window, 'location', {
            value: { reload: vi.fn(), href: '' },
            writable: true
        });
        vi.spyOn(window, 'alert').mockImplementation(() => { });

        await TestBed.configureTestingModule({
            imports: [ProfileComponent],
            providers: [
                { provide: ProfileService, useValue: profileServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve carregar o usuário do localStorage ao iniciar', () => {
        expect(component.usuario).toEqual(usuarioMock);

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('@joao');
    });

    it('deve alternar a visibilidade do modal de edição', () => {
        expect(component.showEditModal).toBe(false);
        component.toggleEditModal();
        expect(component.showEditModal).toBe(true);
    });

    it('deve alternar a visibilidade do modal de exclusão', () => {
        expect(component.showDeleteModal).toBe(false);
        component.toggleDeleteModal();
        expect(component.showDeleteModal).toBe(true);
    });

    it('deve atualizar o perfil e recarregar a página', () => {
        const novosDados = { username: 'joao_novo' };
        component.handleUpdate(novosDados);

        expect(profileServiceMock.atualizarPerfil).toHaveBeenCalledWith(novosDados);
        expect(component.usuario.username).toBe('joao_novo');
        expect(component.showEditModal).toBe(false);
        expect(window.location.reload).toHaveBeenCalled();
    });

    it('deve exibir um alert se a atualização do perfil falhar', () => {
        profileServiceMock.atualizarPerfil.mockReturnValueOnce(throwError(() => new Error('Erro na API')));

        component.handleUpdate({});

        expect(window.alert).toHaveBeenCalledWith('Falha ao atualizar o perfil.');
    });

    it('deve excluir a conta e redirecionar para o login', () => {
        component.handleDelete();

        expect(profileServiceMock.excluirConta).toHaveBeenCalled();
        expect(component.showDeleteModal).toBe(false);
        expect(window.location.href).toBe('/login');
    });

    it('deve exibir um alert se a exclusão da conta falhar', () => {
        profileServiceMock.excluirConta.mockReturnValueOnce(throwError(() => new Error('Erro na API')));

        component.handleDelete();

        expect(window.alert).toHaveBeenCalledWith('Falha ao excluir a conta.');
    });
});