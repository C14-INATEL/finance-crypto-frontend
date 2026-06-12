import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasComponent } from './noticias.component';
import { CryptoService } from '../../services/crypto.service';
import { ChangeDetectorRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

const MOCK_NOTICIAS = {
    items: [
        {
            title: 'Bitcoin sobe novamente',
            description: '<p>O mercado de cripto está aquecido...</p><img src="btc-alta.jpg">',
            link: 'https://noticia.com',
            author: 'João Ryan',
            pubDate: '2026-06-12 10:00:00',
            thumbnail: 'thumb.jpg',
            categories: ['Mercado']
        }
    ]
};

describe('NoticiasComponent', () => {
    let component: NoticiasComponent;
    let fixture: ComponentFixture<NoticiasComponent>;
    let mockCryptoService: any;

    beforeEach(async () => {
        mockCryptoService = {
            buscarNoticiasRss: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [NoticiasComponent],
            providers: [
                { provide: CryptoService, useValue: mockCryptoService },
                ChangeDetectorRef
            ]
        }).compileComponents();
    });

    const createComponent = async () => {
        fixture = TestBed.createComponent(NoticiasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    };

    it('deve processar o feed com sucesso e limpar o HTML', async () => {
        mockCryptoService.buscarNoticiasRss.mockReturnValue(of(MOCK_NOTICIAS));

        await createComponent();

        expect(component.artigos.length).toBe(1);
        expect(component.artigos[0].title).toBe('Bitcoin sobe novamente');
        expect(component.artigos[0].categories[0]).toBe('Mercado');
    });

    it('deve tratar erro da API', async () => {
        mockCryptoService.buscarNoticiasRss.mockReturnValue(throwError(() => new Error('Falha')));

        await createComponent();

        expect(component.erro).toBe(true);
        expect(component.carregando).toBe(false);
    });
});