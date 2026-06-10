import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  carregando = false;

  constructor(private authService: AuthService, private router: Router) { }

  async onLogin() {
    this.carregando = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
      console.log('Login com sucesso! O estado global foi atualizado.');

      this.router.navigate(['/home']);

    } catch (error: any) {
      this.errorMessage = error.message || 'Erro inesperado ao fazer login';
      console.error(this.errorMessage);
    } finally {
      this.carregando = false;
    }
  }
}