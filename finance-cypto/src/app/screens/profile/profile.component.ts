import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileModalComponent } from './modals/edit-profile-modal.component';
import { DeleteAccountModalComponent } from './modals/delete-account-modal.component';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, EditProfileModalComponent, DeleteAccountModalComponent],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
    usuario: any;
    private sub!: Subscription;

    showEditModal = false;
    showDeleteModal = false;

    constructor(
        private authService: AuthService,
        private profileService: ProfileService
    ) { }

    ngOnInit() {
        // Escuta o estado do usuário logado
        this.sub = this.authService.usuarioLogado$.subscribe(user => {
            this.usuario = user;
        });
    }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
    }

    toggleEditModal() { this.showEditModal = !this.showEditModal; }
    toggleDeleteModal() { this.showDeleteModal = !this.showDeleteModal; }

    handleUpdate(novosDados: any) {
        this.profileService.atualizarPerfil(novosDados).subscribe({
            next: (resposta) => {
                this.usuario = { ...this.usuario, ...novosDados };
                this.showEditModal = false;
                alert('Perfil atualizado com sucesso!');
            },
            error: (erro) => {
                console.error('Erro ao atualizar perfil', erro);
                alert('Falha ao atualizar o perfil. Verifique os logs.');
            }
        });
    }

    // Exemplo de como você chamaria a exclusão
    handleDelete() {
        this.profileService.excluirConta().subscribe({
            next: () => {
                this.showDeleteModal = false;
                this.authService.logout(); // Desloga e limpa o token
                window.location.href = '/login';
            },
            error: (erro) => {
                console.error('Erro ao excluir conta', erro);
                alert('Falha ao excluir a conta.');
            }
        });
    }
}