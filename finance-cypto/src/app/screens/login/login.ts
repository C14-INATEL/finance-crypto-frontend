import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  carregando = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.carregando = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login efetuado com sucesso! Token JWT salvo.');
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        if (erro.status === 401) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else {
          this.errorMessage = 'Erro ao conectar com o servidor.';
        }
        console.error(erro);
        this.carregando = false;
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }
}