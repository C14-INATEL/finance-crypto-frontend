import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

const MOCK_DASHBOARD_DATA = [
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        image: 'bitcoin.png',
        current_price: 350000,
        price_change_percentage_24h: 5.5,
        market_cap: 7000000000000,
        total_volume: 50000000000,
        sparkline_in_7d: { price: [340000, 345000, 350000] }
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'eth',
        image: 'ethereum.png',
        current_price: 18000,
        price_change_percentage_24h: -2.2,
        market_cap: 2000000000000,
        total_volume: 10000000000,
        sparkline_in_7d: { price: [17000, 17500, 18000] }
    }
];

describe('Dashboard Component', () => {
    let component: Dashboard;
    let fixture: ComponentFixture<Dashboard>;
    let mockCryptoService: any;

    beforeAll(() => {
        registerLocaleData(localePt);
    });

    beforeEach(async () => {
        mockCryptoService = {
            buscarDetalhesCriptos: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [Dashboard],
            providers: [
                { provide: CryptoService, useValue: mockCryptoService },
                { provide: Router, useValue: { events: of() } },
                ChangeDetectorRef
            ]
        }).compileComponents();
    });

    const createComponent = async () => {
        fixture = TestBed.createComponent(Dashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    };

    it('deve processar o dashboard com sucesso', async () => {
        mockCryptoService.buscarDetalhesCriptos.mockReturnValue(of(MOCK_DASHBOARD_DATA));
        await createComponent();
        expect(component.criptos.length).toBe(2);
        expect(component.carregando).toBe(false);
    });
});