import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

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

    private getDbUsuarios(): any[] {
        const db = localStorage.getItem('db_usuarios');
        return db ? JSON.parse(db) : [];
    }

    private salvarDbUsuarios(db: any[]): void {
        localStorage.setItem('db_usuarios', JSON.stringify(db));
    }

    signup(username: string, email: string, senha: string): Observable<any> {
        const payload = { username, email, password: senha };

        return this.http.post(`${this.apiUrl}/users`, payload).pipe(
            catchError(erro => this.fallbackSignup(username, email, senha, erro))
        );
    }

    private fallbackSignup(username: string, email: string, senha: string, erroOriginal: any): Observable<any> {
        const db = this.getDbUsuarios();

        const existe = db.find(u => u.username === username || u.email === email);
        if (existe) {
            return throwError(() => ({ status: 409, message: 'Usuário ou e-mail já existe no banco local.' }));
        }

        const newUser = {
            userId: Math.random().toString(36).substring(2, 9),
            username,
            email,
            password: senha
        };

        db.push(newUser);
        this.salvarDbUsuarios(db);

        console.warn('API falhou. Usuário criado no banco local (localStorage).');
        return of({ message: 'Usuário criado localmente com sucesso' });
    }

    login(username: string, senha: string): Observable<any> {
        const payload = { username, password: senha };

        return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, payload).pipe(
            catchError(erro => this.fallbackLogin(username, senha, erro)),
            tap(response => {
                console.log('Login efetuado. Token salvo.');
                localStorage.setItem('token', response.accessToken);
                this.carregarDadosUsuario(response.accessToken).subscribe();
            })
        );
    }

    private fallbackLogin(username: string, senha: string, erroOriginal: any): Observable<{ accessToken: string }> {
        const db = this.getDbUsuarios();
        const user = db.find(u => u.username === username && u.password === senha);

        if (!user) {
            return throwError(() => ({ status: 401, message: 'Credenciais inválidas no banco local.' }));
        }

        console.warn('API falhou. Login realizado via banco local.');
        const fakeToken = `local-token-${user.userId}`;
        return of({ accessToken: fakeToken });
    }

    private carregarDadosUsuario(token: string): Observable<Usuario> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<Usuario>(`${this.apiUrl}/users/me`, { headers }).pipe(
            catchError(erro => this.fallbackCarregarUsuario(token, erro)),
            tap(usuario => {
                this.usuarioLogadoSubject.next(usuario);
                localStorage.setItem('usuario_logado', JSON.stringify(usuario));
            })
        );
    }

    private fallbackCarregarUsuario(token: string, erroOriginal: any): Observable<Usuario> {
        if (token.startsWith('local-token-')) {
            const userId = token.split('local-token-')[1];
            const db = this.getDbUsuarios();
            const user = db.find(u => u.userId === userId);

            if (user) {
                const { password, ...usuarioSeguro } = user;
                return of(usuarioSeguro as Usuario);
            }
        }

        const cachedUser = localStorage.getItem('usuario_logado');
        if (cachedUser) {
            return of(JSON.parse(cachedUser));
        }

        return throwError(() => erroOriginal);
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario_logado');
        this.usuarioLogadoSubject.next(null);
    }

    get usuarioAtual(): Usuario | null {
        return this.usuarioLogadoSubject.value;
    }
}