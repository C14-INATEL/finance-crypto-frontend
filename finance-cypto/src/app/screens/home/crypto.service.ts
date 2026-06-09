import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  // Simula uma chamada real de API na internet para pegar o preço do Bitcoin
  buscarPrecoBitcoinApi(): number {
    return 300000; // Valor de mentira para o nosso app principal
  }
}