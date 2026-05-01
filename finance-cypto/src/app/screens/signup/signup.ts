import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

    constructor(@Inject('SignupService') private signupService: any) { }

    async onSignup() {
        try {
            await this.signupService.register(this.name, this.email, this.password);
            console.log('Conta criada com sucesso para:', this.name);
            this.errorMessage = '';
        } catch (error) {
            this.errorMessage = 'Erro ao criar conta. Tente novamente.';
            console.error('Signup falhou:', error);
        }
    }
}