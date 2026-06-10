import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
    id: string;
    email: string;
    nome: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private tabelaUsuarios: any[] = [{
        id: '1',
        email: 'admin@example.com',
        nome: 'Administrador',
        senha: 'admin123'
    }];

    private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);

    public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

    constructor() { }

    async signup(nome: string, email: string, senha: string): Promise<void> {
        await this.delay(500);

        const usuarioExiste = this.tabelaUsuarios.find(u => u.email === email);
        if (usuarioExiste) {
            throw new Error('Este e-mail já está em uso.');
        }

        const novoUsuario = {
            id: Math.random().toString(36).substring(2, 9), // ID aleatório
            nome,
            email,
            senha
        };

        this.tabelaUsuarios.push(novoUsuario);

        this.usuarioLogadoSubject.next({
            id: novoUsuario.id,
            email: novoUsuario.email,
            nome: novoUsuario.nome
        });
    }

    async login(email: string, senha: string): Promise<void> {
        await this.delay(500);

        const usuario = this.tabelaUsuarios.find(u => u.email === email && u.senha === senha);

        if (!usuario) {
            throw new Error('E-mail ou senha incorretos.');
        }

        this.usuarioLogadoSubject.next({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome
        });
    }

    logout(): void {
        this.usuarioLogadoSubject.next(null);
    }

    get usuarioAtual(): Usuario | null {
        return this.usuarioLogadoSubject.value;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}