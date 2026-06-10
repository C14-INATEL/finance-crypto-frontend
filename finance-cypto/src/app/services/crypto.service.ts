import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  buscarPrecoBitcoinApi(): number {
    return 300000;
  }
}