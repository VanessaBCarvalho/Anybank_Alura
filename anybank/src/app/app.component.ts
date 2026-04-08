import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { LateralComponent } from './components/lateral/lateral.component';
import { FormNovaTransacaoComponent } from './form-nova-transacao/form-nova-transacao.component';
import { Transacao } from './modelos/transacao';

@Component({
  selector: 'app-root',
  imports: [BannerComponent, LateralComponent, FormNovaTransacaoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  processarTransacao(transacao: Transacao) {
    console.log(transacao)
  }
}
