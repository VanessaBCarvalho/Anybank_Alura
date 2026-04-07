import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { LateralComponent } from './components/lateral/lateral.component';

@Component({
  selector: 'app-root',
  imports: [BannerComponent, LateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anybank';
}
