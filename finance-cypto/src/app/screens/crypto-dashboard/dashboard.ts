import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit, OnDestroy {
    criptos: any[] = [];
    carregando = true;

    maiorAlta: any;
    maiorQueda: any;
    criptoSelecionadaId: string = 'bitcoin';

    chartOptions: any;
    private routerSubscription!: Subscription;

    constructor(
        private cryptoService: CryptoService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this.inicializarConfiguracaoGrafico();

        this.routerSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.carregarDashboard();
        });
    }

    ngOnInit(): void {
        this.carregarDashboard();
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    carregarDashboard() {
        this.carregando = true;

        this.cryptoService.buscarDetalhesCriptos().pipe(take(1)).subscribe({
            next: (dados) => {
                if (!dados || dados.length === 0) {
                    this.carregando = false;
                    this.cdr.detectChanges();
                    return;
                }

                this.criptos = dados;

                const ordenados = [...dados].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
                this.maiorAlta = ordenados[0];
                this.maiorQueda = ordenados[ordenados.length - 1];

                const ativa = this.criptos.find(c => c.id === this.criptoSelecionadaId) || dados[0];
                if (ativa) {
                    this.criptoSelecionadaId = ativa.id;
                    this.prepararGrafico(ativa);
                }

                this.carregando = false;

                this.cdr.detectChanges();
            },
            error: (erro) => {
                console.error('Erro na requisição da Dashboard:', erro);
                this.carregando = false;
                this.cdr.detectChanges();
            }
        });
    }

    inicializarConfiguracaoGrafico() {
        this.chartOptions = {
            series: [{ name: 'Preço (BRL)', data: [] }],
            chart: {
                type: 'area',
                height: 320,
                background: 'transparent',
                toolbar: { show: false },
                zoom: { enabled: false }
            },
            colors: ['#f59e0b'],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 2 },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.25,
                    opacityTo: 0.0,
                    stops: [0, 100]
                }
            },
            grid: {
                borderColor: '#27272a',
                strokeDashArray: 4,
                padding: { right: 20, left: 20 }
            },
            xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: { enabled: false }
            },
            yaxis: {
                labels: {
                    style: { colors: '#71717a', fontFamily: 'monospace' },
                    formatter: (value: number) => 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
            },
            tooltip: { theme: 'dark' }
        };
    }

    prepararGrafico(crypto: any) {
        if (crypto?.sparkline_in_7d?.price) {
            this.chartOptions.series = [{
                name: crypto.name,
                data: [...crypto.sparkline_in_7d.price]
            }];
        }
    }

    onCriptoChange(event: any) {
        const id = event.target.value;
        this.criptoSelecionadaId = id;
        const selecionada = this.criptos.find(c => c.id === id);
        if (selecionada) {
            this.prepararGrafico(selecionada);
            this.cdr.detectChanges();
        }
    }
}