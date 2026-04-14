import { Component, inject, AfterViewInit } from '@angular/core';
import { InvestimentosService } from '../../services/investimentos.service';
import { Chart } from 'chart.js/auto';
import { interval, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-investimentos',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './investimentos.component.html',
  styleUrl: './investimentos.component.css'
})
export class InvestimentosComponent implements AfterViewInit {

  api = inject(InvestimentosService);

  bitcoin: any;

  chart!: Chart;
  ibovChart!: Chart;

  valoresBTC: number[] = [];
  labelsBTC: string[] = [];

  valoresIBOV: number[] = [];
  labelsIBOV: string[] = [];

  ngAfterViewInit() {
    this.criarGraficoBTC();
    this.criarGraficoIBOV();
    this.iniciarAtualizacao();
  }

  // 📊 BTC
  criarGraficoBTC() {
  const ctx = document.getElementById('btcChart') as HTMLCanvasElement;

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

              if (prev == null || curr == null) {
                return '#f7931a';
              }

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

  // 📊 IBOV
  criarGraficoIBOV() {
  const ctx = document.getElementById('ibovChart') as HTMLCanvasElement;

  this.ibovChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.labelsIBOV,
      datasets: [
        {
          label: 'Ibovespa',
          data: this.valoresIBOV,
          borderWidth: 2,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

  
  iniciarAtualizacao() {

    // 📡 Bitcoin
    interval(10000).pipe(
      switchMap(() => this.api.getBitcoin())
    ).subscribe((data: any) => {

      const btc = data.BTCBRL;
      this.bitcoin = btc;

      const valor = Number(btc.bid);

      this.valoresBTC.push(valor);
      this.labelsBTC.push(new Date().toLocaleTimeString());

      if (this.valoresBTC.length > 10) {
        this.valoresBTC.shift();
        this.labelsBTC.shift();
      }

      this.chart.update();
    });

    // 📡 Ibovespa
    interval(10000).pipe(
      switchMap(() => this.api.getIbovespa())
    ).subscribe((data: any) => {

      const ibov = data.quoteResponse.result[0].regularMarketPrice;

      this.valoresIBOV.push(ibov);
      this.labelsIBOV.push(new Date().toLocaleTimeString());

      if (this.valoresIBOV.length > 10) {
        this.valoresIBOV.shift();
        this.labelsIBOV.shift();
      }

      if (this.ibovChart) {
        this.ibovChart.update();
      }
    });
  }
}