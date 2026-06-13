import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileModalComponent } from './modals/edit-profile-modal.component';
import { DeleteAccountModalComponent } from './modals/delete-account-modal.component';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, EditProfileModalComponent, DeleteAccountModalComponent],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    usuario: any;

    showEditModal = false;
    showDeleteModal = false;

    constructor(private profileService: ProfileService) { }

    ngOnInit() {
        const userStr = localStorage.getItem('usuario_logado');
        if (userStr) {
            this.usuario = JSON.parse(userStr);
        }
    }

    toggleEditModal() { this.showEditModal = !this.showEditModal; }
    toggleDeleteModal() { this.showDeleteModal = !this.showDeleteModal; }

    handleUpdate(novosDados: any) {
        this.profileService.atualizarPerfil(novosDados).subscribe({
            next: () => {
                this.usuario = { ...this.usuario, ...novosDados };
                this.showEditModal = false;
                window.location.reload();
            },
            error: () => {
                alert('Falha ao atualizar o perfil.');
            }
        });
    }

    handleDelete() {
        this.profileService.excluirConta().subscribe({
            next: () => {
                this.showDeleteModal = false;
                window.location.href = '/login';
            },
            error: () => {
                alert('Falha ao excluir a conta.');
            }
        });
    }
}