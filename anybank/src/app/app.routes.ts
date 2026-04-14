import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContaComponent } from './pages/conta/conta.component';
import { InvestimentosComponent } from './pages/investimentos/investimentos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  { path: 'inicio', component: InicioComponent },

  { path: 'conta', component: ContaComponent },

  { path: 'investimentos', component: InvestimentosComponent }

];