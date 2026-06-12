import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  buscarPrecoBitcoinApi(): number {
    return 300000;
  }

  buscarDetalhesCriptos(): Observable<any> {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h');
  }

  buscarNoticiasRss(): Observable<any> {
    const rssUrl = 'https://livecoins.com.br/feed/';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    return this.http.get(apiUrl);
  }
}