import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor() { }

    private getUsuarioLogadoId(): string | null {
        const userStr = localStorage.getItem('usuario_logado');
        if (userStr) {
            const user = JSON.parse(userStr);
            return user.userId;
        }
        return null;
    }

    atualizarPerfil(dados: { username?: string; email?: string; password?: string }): Observable<any> {
        const userId = this.getUsuarioLogadoId();

        if (!userId) {
            return of({ success: false, message: 'Usuário não logado.' });
        }

        const dbStr = localStorage.getItem('db_usuarios');
        if (dbStr) {
            let db = JSON.parse(dbStr);
            const index = db.findIndex((u: any) => u.userId === userId);
            if (index !== -1) {
                db[index] = { ...db[index], ...dados };
                localStorage.setItem('db_usuarios', JSON.stringify(db));
            }
        }

        const logadoStr = localStorage.getItem('usuario_logado');
        if (logadoStr) {
            let logado = JSON.parse(logadoStr);
            logado = { ...logado, ...dados };
            localStorage.setItem('usuario_logado', JSON.stringify(logado));
        }

        return of({ success: true, message: 'Perfil atualizado com sucesso.' });
    }

    excluirConta(): Observable<any> {
        const userId = this.getUsuarioLogadoId();

        if (!userId) {
            return of({ success: false, message: 'Usuário não logado.' });
        }

        const dbStr = localStorage.getItem('db_usuarios');
        if (dbStr) {
            let db = JSON.parse(dbStr);
            db = db.filter((u: any) => u.userId !== userId);
            localStorage.setItem('db_usuarios', JSON.stringify(db));
        }

        localStorage.removeItem('usuario_logado');
        localStorage.removeItem('token');

        return of({ success: true, message: 'Conta excluída com sucesso.' });
    }
}