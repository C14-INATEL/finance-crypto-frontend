import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './signup.html',
})
export class SignupComponent {
    username = '';
    email = '';
    password = '';
    errorMessage = '';
    carregando = false;

    constructor(private authService: AuthService, private router: Router) { }

    onSignup() {
        this.carregando = true;
        this.errorMessage = '';

        this.authService.signup(this.username, this.email, this.password).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (erro) => {
                if (erro.status === 409) {
                    this.errorMessage = 'Este usuário já existe.';
                } else {
                    this.errorMessage = 'Erro ao criar a conta.';
                }
                this.carregando = false;
            }
        });
    }
}