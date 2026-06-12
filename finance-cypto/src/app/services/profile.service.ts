import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = 'http://localhost:8080/users/me';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    atualizarPerfil(dados: { username?: string; email?: string; password?: string }): Observable<any> {
        return this.http.put(this.apiUrl, dados, { headers: this.getHeaders() });
    }

    excluirConta(): Observable<any> {
        return this.http.delete(this.apiUrl, { headers: this.getHeaders() });
    }
}