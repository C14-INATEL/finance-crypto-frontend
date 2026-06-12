import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-noticias',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './noticias.component.html'
})
export class NoticiasComponent implements OnInit {
    artigos: any[] = [];
    carregando = true;
    erro = false;

    constructor(
        private cryptoService: CryptoService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.carregarFeed();
    }

    carregarFeed() {
        this.carregando = true;

        this.cryptoService.buscarNoticiasRss().pipe(take(1)).subscribe({
            next: (resposta) => {

                this.artigos = (resposta.items || []).map((item: any) => {
                    return {
                        ...item,
                        imagemCapa: this.extrairImagem(item)
                    };
                });

                this.carregando = false;
                this.cdr.detectChanges();
            },
            error: (erro) => {
                console.error('Falha ao buscar o feed RSS:', erro);
                this.erro = true;
                this.carregando = false;
                this.cdr.detectChanges();
            }
        });
    }
    extrairImagem(artigo: any): string {
        if (artigo.thumbnail) {
            return artigo.thumbnail;
        }

        if (artigo.enclosure && artigo.enclosure.link && artigo.enclosure.type?.startsWith('image/')) {
            return artigo.enclosure.link;
        }

        const conteudo = artigo.content || artigo.description || '';
        const matchImagem = conteudo.match(/<img[^>]+src=["']([^"']+)["']/i);

        if (matchImagem && matchImagem[1]) {
            return matchImagem[1];
        }

        return '';
    }

    limparHtml(texto: string): string {
        if (!texto) return '';
        return texto.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';
    }
}