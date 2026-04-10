import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  patrimonioTotal: number = 14520; //valor fixo para simular o patrimônio total do usuário, final sera alterado para ser dinamico, puxando do backend
  

  saldoVisivel: boolean = true;

  alternarVisibilidadeSaldo(): void {
    this.saldoVisivel = !this.saldoVisivel;
  }


  obterClasseBadge(porcentagem: number): string {
    return porcentagem >= 0 ? 'positive' : 'negative';
  }


  comprarAtivo(valor: number): boolean {
    if (valor <= 0) return false; 
    this.patrimonioTotal += valor;
    return true;
  }


  venderAtivo(valor: number): boolean {
    if (valor > this.patrimonioTotal || valor <= 0) {
      return false; 
    }
    this.patrimonioTotal -= valor;
    return true;
  }
}