import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Usuario {
    userId: string;
    username: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080';
    private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
    public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

    constructor(private http: HttpClient) {
        const token = localStorage.getItem('token');
        if (token) {
            this.carregarDadosUsuario(token).subscribe({
                error: () => this.logout()
            });
        }
    }

    signup(username: string, email: string, senha: string): Observable<any> {
        const payload = { username, email, password: senha };
        return this.http.post(`${this.apiUrl}/users`, payload);
    }

    login(username: string, senha: string): Observable<any> {
        const payload = { username, password: senha };

        return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, payload).pipe(
            tap(response => {
                console.log('Login bem-sucedido, token recebido:', response);
                localStorage.setItem('token', response.accessToken);
                this.carregarDadosUsuario(response.accessToken).subscribe();
            })
        );
    }

    private carregarDadosUsuario(token: string): Observable<Usuario> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<Usuario>(`${this.apiUrl}/users/me`, { headers }).pipe(
            tap(usuario => {
                this.usuarioLogadoSubject.next(usuario);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.usuarioLogadoSubject.next(null);
    }

    get usuarioAtual(): Usuario | null {
        return this.usuarioLogadoSubject.value;
    }
}