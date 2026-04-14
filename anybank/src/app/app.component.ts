import { Component, inject } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { LateralComponent } from './components/lateral/lateral.component';
import { FormNovaTransacaoComponent } from './form-nova-transacao/form-nova-transacao.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { BancoService } from './services/banco.service';
import { TipoTransacao, Transacao } from './modelos/transacao';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    BannerComponent,
    LateralComponent,
    FormNovaTransacaoComponent,
    ExtratoComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isSidebarOpen = true;

  banco = inject(BancoService);

  processarTransacao(transacao: Transacao) {
    if (
      transacao.tipo === TipoTransacao.SAQUE &&
      transacao.valor > this.banco.saldo()
    ) {
      return alert('Saldo insuficiente!');
    }

    this.banco.adicionarTransacao(transacao);
  }
}
