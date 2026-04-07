import { Component } from '@angular/core';

@Component({
  selector: 'app-lateral',
  standalone: true,
  imports: [],
  templateUrl: './lateral.component.html',
  styleUrl: './lateral.component.css'
})
export class LateralComponent {
  usuario = {
    nome: 'Vanessa Carvalho',
    banco: 'AnyBank',
    avatar: '/avatar.jpeg'


  };
}
