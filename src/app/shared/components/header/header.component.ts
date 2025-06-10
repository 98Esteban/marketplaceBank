import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  cartCount$: Observable<number>;

  constructor(private cartService: CartService,
    private router: Router
  ) {
    this.cartCount$ = this.cartService.cartCount$;

  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }
}


