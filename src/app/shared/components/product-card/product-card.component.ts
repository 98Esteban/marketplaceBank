import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map, take, tap } from 'rxjs';

import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();
  @Input() isDetailView: boolean = false;
  @Output() removeFromCart = new EventEmitter<Product>();

  isInCart$!: Observable<boolean>;
  discountPercentage = 0;
  hasDiscount = false;
  originalPrice = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.isInCart$ = this.cartService.isInCart(this.product.id);

    if (this.product.discountPercentage && this.product.discountPercentage > 0) {
      this.hasDiscount = true;
      this.discountPercentage = this.product.discountPercentage;
      this.originalPrice = this.product.price / (1 - this.discountPercentage / 100);
    }
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  onRemoveFromCart() {
    this.removeFromCart.emit(this.product);
  }

  onProductClick(): void {
    this.productClicked.emit(this.product);
  }

  onCartAction(): void {
    this.isInCart$.pipe(
      take(1),
      tap(inCart => {
        if (!inCart) {
          this.cartService.addToCart(this.product);
          this.addToCart.emit(this.product);
        } else {
          this.cartService.removeFromCart(this.product.id);
        }
      })
    ).subscribe();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/default-product.png';
  }

  getStarArray(rating: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}

