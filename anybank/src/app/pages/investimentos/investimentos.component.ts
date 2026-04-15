import { Component, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { InvestimentosService } from '../../services/investimentos.service';
import { Chart } from 'chart.js/auto';
import { interval, switchMap, startWith, takeUntil, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investimentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investimentos.component.html',
  styleUrl: './investimentos.component.css'
})
export class InvestimentosComponent implements AfterViewInit, OnDestroy {

  api = inject(InvestimentosService);

  chart!: Chart;
  usdChart!: Chart;

  valoresBTC: number[] = [];
  labelsBTC: string[] = [];

  valoresUSD: number[] = [];
  labelsUSD: string[] = [];

  private destroy$ = new Subject<void>();
  bitcoin: any;
  usd: any;

  ngAfterViewInit() {
    this.criarGraficoBTC();
    this.criarGraficoUSD();
    this.iniciarAtualizacao();
  }

  // 📊 BTC
  criarGraficoBTC() {
    const ctx = document.getElementById('btcChart') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsBTC,
        datasets: [
          {
            label: 'Bitcoin (R$)',
            data: this.valoresBTC,
            borderWidth: 2,
            tension: 0.3,
            segment: {
              borderColor: (ctx) => {
                const prev = ctx.p0?.parsed?.y;
                const curr = ctx.p1?.parsed?.y;
                if (prev == null || curr == null) return '#f7931a';
                return curr >= prev ? '#16a34a' : '#dc2626';
              }
            }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // 💵 USD
  criarGraficoUSD() {
    const ctx = document.getElementById('usdChart') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.usdChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labelsUSD,
        datasets: [
          {
            label: 'Dólar (R$)',
            data: this.valoresUSD,
            borderWidth: 2,
            tension: 0.3,
            segment: {
              borderColor: (ctx) => {
                const prev = ctx.p0?.parsed?.y;
                const curr = ctx.p1?.parsed?.y;
                if (prev == null || curr == null) return '#2563eb';
                return curr >= prev ? '#16a34a' : '#dc2626';
              }
            }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // 🔄 Atualização
  iniciarAtualizacao() {

    // 📡 Bitcoin
    interval(10000).pipe(
  startWith(0),
  switchMap(() => this.api.getBitcoin()),
  takeUntil(this.destroy$)
).subscribe((data: any) => {

  const btc = data.BTCBRL;

  this.bitcoin = btc;

  const valor = Number(btc.bid);

  this.valoresBTC = [...this.valoresBTC, valor];
  this.labelsBTC = [...this.labelsBTC, new Date().toLocaleTimeString()];

  if (this.valoresBTC.length > 10) {
    this.valoresBTC = this.valoresBTC.slice(1);
    this.labelsBTC = this.labelsBTC.slice(1);
  }

  this.chart.data.labels = this.labelsBTC;
  this.chart.data.datasets[0].data = this.valoresBTC;

  this.chart.update();
});

    // 💵 Dólar
    interval(10000).pipe(
  startWith(0),
  switchMap(() => this.api.getDolar()),
  takeUntil(this.destroy$)
).subscribe((data: any) => {

  const usd = data.USDBRL;

  this.usd = usd; // 👈 ESSENCIAL

  const valor = Number(usd.bid);

  this.valoresUSD = [...this.valoresUSD, valor];
  this.labelsUSD = [...this.labelsUSD, new Date().toLocaleTimeString()];

  if (this.valoresUSD.length > 10) {
    this.valoresUSD = this.valoresUSD.slice(1);
    this.labelsUSD = this.labelsUSD.slice(1);
  }

  this.usdChart.data.labels = this.labelsUSD;
  this.usdChart.data.datasets[0].data = this.valoresUSD;

  this.usdChart.update();
});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}