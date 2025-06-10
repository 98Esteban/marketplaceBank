import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CartComponent } from './../app/features/cart/cart.component';
import { CartIconComponent } from './../app/shared/components/cart-icon/cart-icon.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, CartIconComponent],
  template: `
  <app-loading></app-loading>
  <app-cart-icon></app-cart-icon>
  <router-outlet></router-outlet>`
})
export class App { }