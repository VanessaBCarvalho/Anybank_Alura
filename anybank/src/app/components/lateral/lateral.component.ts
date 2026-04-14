import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lateral',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './lateral.component.html',
  styleUrl: './lateral.component.css'
})
export class LateralComponent {

  @Output() toggle = new EventEmitter<boolean>();

isOpen = true;

toggleSidebar() {
  this.isOpen = !this.isOpen;
  this.toggle.emit(this.isOpen);
  }

  usuario = {
    nome: 'Vanessa Carvalho',
    banco: 'AnyBank',
    avatar: '/avatar.jpeg'
  };
}