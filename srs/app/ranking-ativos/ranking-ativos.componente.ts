import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-ativos',
  templateUrl: './ranking-ativos.component.html',
  styleUrls: ['./ranking-ativos.component.css']
})
export class RankingAtivosComponent implements OnInit {

  // Lista mockada (dados falsos) baseada exatamente no contrato
  // que definimos no DTO do Backend.
  ativos = [
    {
      simbolo: 'BTC',
      precoMedioCompra: 300000.00,
      precoAtual: 350000.00,
      percentualLucro: 16.67
    },
    {
      simbolo: 'ETH',
      precoMedioCompra: 15000.00,
      precoAtual: 18000.00,
      percentualLucro: 20.00
    },
    {
      simbolo: 'SOL',
      precoMedioCompra: 500.00,
      precoAtual: 450.00,
      percentualLucro: -10.00
    },
    {
      simbolo: 'USDT',
      precoMedioCompra: 5.05,
      precoAtual: 5.06,
      percentualLucro: 0.20
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // No futuro, aqui o Angular chamará o Backend real.
  }

}