import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './signup.html',
})
export class SignupComponent {

    name = '';
    email = '';
    password = '';
    errorMessage = '';

    constructor(private authService: AuthService) { }

    async onSignup() {
        try {
            await this.authService.signup(this.name, this.email, this.password);
            console.log('Conta criada com sucesso para:', this.name);
            this.errorMessage = '';
        } catch (error) {
            this.errorMessage = 'Erro ao criar conta. Tente novamente.';
            console.error('Signup falhou:', error);
        }
    }
}