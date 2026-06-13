import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

export interface AtivoCarteira {
    id: string;
    nome: string;
    simbolo: string;
    quantidade: number;
    valorTotal: number;
    variacao: number;
    icone: string;
    alocacao: number;
}

export interface Transacao {
    id: string;
    tipo: 'COMPRA' | 'VENDA';
    ativo: string;
    simbolo: string;
    quantidadeMovimentada: number;
    valorReais: number;
    precoMomento: number;
    data: string;
}

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [CommonModule, RouterModule, NgApexchartsModule],
    templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
    userId: string = '';
    minhaCarteira: AtivoCarteira[] = [];
    historicoTransacoes: Transacao[] = [];

    patrimonioTotal: number = 0;
    lucroPrejuizoTotal: number = 0;
    percentualRentabilidade: number = 0;
    ativoMaiorPosicao: string = 'Nenhum';

    chartOptions: any;

    constructor() { }

    ngOnInit() {
        const userStr = localStorage.getItem('usuario_logado');
        if (userStr) {
            const user = JSON.parse(userStr);
            this.userId = user.userId;
        } else {
            this.userId = 'guest';
        }

        this.carregarDadosLocal();
        this.calcularMetricas();
        this.configurarGraficoAlocacao();
    }

    private getStorageKey(key: string): string {
        return `${key}_${this.userId}`;
    }

    carregarDadosLocal() {
        const carteiraSalva = localStorage.getItem(this.getStorageKey('minhaCarteira'));
        const historicoSalvo = localStorage.getItem(this.getStorageKey('historicoTransacoes'));

        if (carteiraSalva) {
            this.minhaCarteira = JSON.parse(carteiraSalva);
        }
        if (historicoSalvo) {
            this.historicoTransacoes = JSON.parse(historicoSalvo);
        }
    }

    calcularMetricas() {
        this.patrimonioTotal = 0;
        let custoTotalCompra = 0;
        let maiorValor = 0;

        this.minhaCarteira.forEach(ativo => {
            this.patrimonioTotal += ativo.valorTotal;
            if (ativo.valorTotal > maiorValor) {
                maiorValor = ativo.valorTotal;
                this.ativoMaiorPosicao = `${ativo.nome} (${ativo.simbolo})`;
            }
        });

        this.historicoTransacoes.forEach(t => {
            if (t.tipo === 'COMPRA') {
                custoTotalCompra += t.valorReais;
            } else if (t.tipo === 'VENDA') {
                custoTotalCompra -= t.valorReais;
            }
        });

        if (custoTotalCompra > 0) {
            this.lucroPrejuizoTotal = this.patrimonioTotal - custoTotalCompra;
            this.percentualRentabilidade = (this.lucroPrejuizoTotal / custoTotalCompra) * 100;
        } else {
            this.lucroPrejuizoTotal = 0;
            this.percentualRentabilidade = 0;
        }
    }

    configurarGraficoAlocacao() {
        const seriesData = this.minhaCarteira.map(ativo => ativo.valorTotal);
        const labelsData = this.minhaCarteira.map(ativo => `${ativo.nome} (${ativo.simbolo})`);

        this.chartOptions = {
            series: seriesData.length > 0 ? seriesData : [1],
            chart: {
                type: 'donut',
                height: 320,
                background: 'transparent'
            },
            labels: seriesData.length > 0 ? labelsData : ['Sem ativos'],
            colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#6366f1'],
            stroke: {
                show: true,
                colors: ['#18181b'],
                width: 2
            },
            legend: {
                position: 'bottom',
                labels: {
                    colors: '#f4f4f5'
                },
                fontFamily: 'sans-serif'
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                theme: 'dark'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '75%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                color: '#a1a1aa'
                            },
                            value: {
                                show: true,
                                color: '#ffffff',
                                fontFamily: 'monospace',
                                formatter: (val: string) => `R$ ${parseFloat(val).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#a1a1aa',
                                formatter: () => `R$ ${this.patrimonioTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                            }
                        }
                    }
                }
            }
        };
    }
}