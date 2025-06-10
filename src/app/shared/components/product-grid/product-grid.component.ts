import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-grid',

  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    MatIconModule
  ],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']

})

export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Input() loading: boolean = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() productClick = new EventEmitter<Product>();

  constructor(private router: Router) { }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }

  onProductClick(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }
}