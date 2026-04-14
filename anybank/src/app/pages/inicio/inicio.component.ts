import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../banner/banner.component';
import { FormNovaTransacaoComponent } from '../../form-nova-transacao/form-nova-transacao.component';
import { BancoService } from '../../services/banco.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    BannerComponent,
    FormNovaTransacaoComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  banco = inject(BancoService);

  processarTransacao(transacao: any) {
    this.banco.adicionarTransacao(transacao);
  }
}