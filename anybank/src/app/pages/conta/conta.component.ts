import { Component, inject } from '@angular/core';
import { ExtratoComponent } from '../../extrato/extrato.component';
import { BancoService } from '../../services/banco.service';



@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [
    ExtratoComponent
  ],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent {
  banco = inject(BancoService);

}