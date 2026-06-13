import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'http://localhost:8080/api/ranking';
  private coinGeckoUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private salvarCache(chave: string, dados: any): void {
    localStorage.setItem(chave, JSON.stringify(dados));
  }

  private lerCache(chave: string): any {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
  }

  buscarRankingLucrativos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lucrativos`, { headers: this.getHeaders() }).pipe(
      tap(dados => this.salvarCache('cache_ranking_lucrativos', dados)),
      catchError(erro => this.fallbackRanking('cache_ranking_lucrativos', 'lucro', erro))
    );
  }

  buscarRankingPrejuizos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prejuizos`, { headers: this.getHeaders() }).pipe(
      tap(dados => this.salvarCache('cache_ranking_prejuizos', dados)),
      catchError(erro => this.fallbackRanking('cache_ranking_prejuizos', 'prejuizo', erro))
    );
  }

  private fallbackRanking(chaveCache: string, tipo: 'lucro' | 'prejuizo', erroOriginal: any): Observable<any[]> {
    return this.http.get<any[]>(this.coinGeckoUrl).pipe(
      map(dadosCoinGecko => {
        let dadosFormatados = dadosCoinGecko.map(moeda => ({
          simbolo: moeda.symbol.toUpperCase(),
          precoMedioCompra: 0.0,
          precoAtual: moeda.current_price,
          percentualLucro: moeda.price_change_percentage_24h || 0
        }));

        if (tipo === 'lucro') {
          dadosFormatados.sort((a, b) => b.percentualLucro - a.percentualLucro);
        } else {
          dadosFormatados.sort((a, b) => a.percentualLucro - b.percentualLucro);
        }

        const top10 = dadosFormatados.slice(0, 10);
        this.salvarCache(chaveCache, top10);
        return top10;
      }),
      catchError(() => {
        const cacheLocal = this.lerCache(chaveCache);
        if (cacheLocal) {
          return of(cacheLocal);
        }
        return throwError(() => erroOriginal);
      })
    );
  }

  buscarDetalhesCriptos(): Observable<any> {
    return this.http.get(this.coinGeckoUrl).pipe(
      tap(dados => this.salvarCache('cache_detalhes_criptos', dados)),
      catchError(erro => {
        const cacheLocal = this.lerCache('cache_detalhes_criptos');
        if (cacheLocal) {
          return of(cacheLocal);
        }
        return throwError(() => erro);
      })
    );
  }

  buscarNoticiasRss(): Observable<any> {
    const rssUrl = 'https://livecoins.com.br/feed/';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    return this.http.get(apiUrl).pipe(
      tap(dados => this.salvarCache('cache_noticias_rss', dados)),
      catchError(erro => {
        const cacheLocal = this.lerCache('cache_noticias_rss');
        if (cacheLocal) {
          return of(cacheLocal);
        }
        return throwError(() => erro);
      })
    );
  }

  buscarPrecoBitcoinApi(): number {
    const cache = this.lerCache('cache_detalhes_criptos');
    if (cache && cache.length > 0) {
      const bitcoin = cache.find((c: any) => c.id === 'bitcoin');
      if (bitcoin && bitcoin.current_price) {
        return bitcoin.current_price;
      }
    }
    return 300000;
  }
}