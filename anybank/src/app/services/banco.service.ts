import { Injectable, signal, computed } from '@angular/core';
import { Transacao, TipoTransacao } from '../modelos/transacao';

@Injectable({ providedIn: 'root' })
export class BancoService {

  transacoes = signal<Transacao[]>(this.carregar());

  saldo = computed(() => {
    return this.transacoes().reduce((acc, t) => {
      if (t.tipo === TipoTransacao.DEPOSITO) return acc + t.valor;
      if (t.tipo === TipoTransacao.SAQUE) return acc - t.valor;
      return acc;
    }, 0);
  });

  adicionarTransacao(t: Transacao) {
    this.transacoes.update(lista => {
      const novaLista = [t, ...lista];
      localStorage.setItem('transacoes', JSON.stringify(novaLista));
      return novaLista;
    });
  }

  private carregar(): Transacao[] {
    return JSON.parse(localStorage.getItem('transacoes') || '[]');
  }
}