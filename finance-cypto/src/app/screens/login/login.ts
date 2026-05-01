import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(@Inject('AuthService') private authService: any) { }

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      console.log('Login com sucesso');
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Credenciais inválidas';
      console.error(this.errorMessage);
    }
  }
}