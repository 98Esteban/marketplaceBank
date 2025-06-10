import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.interface';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { ExportService } from '../../core/services/export-service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
    standalone: true,
    selector: 'app-cart',
    imports: [CommonModule, MatIconModule, MatCardModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']

})
export class CartComponent {
    cartItems$: Observable<CartItem[]>;
    totalPrice$: Observable<number>;

    constructor(
        private cartService: CartService,
        private exportService: ExportService
    ) {
        this.cartItems$ = this.cartService.cartItems$;
        this.totalPrice$ = this.cartService.getTotalPrice();
    }

    ngOnInit(): void { }

    trackByProductId(index: number, item: CartItem): number {
        return item.product.id;
    }

    increaseQuantity(productId: number, currentQuantity: number): void {
        this.cartService.updateQuantity(productId, currentQuantity + 1);
    }

    decreaseQuantity(productId: number, currentQuantity: number): void {
        if (currentQuantity > 1) {
            this.cartService.updateQuantity(productId, currentQuantity - 1);
        }
    }

    removeItem(productId: number): void {
        this.cartService.removeFromCart(productId);
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

    getTotalItems(items: CartItem[]): number {
        return items.reduce((total, item) => total + item.quantity, 0);
    }

    exportCSV(): void {
        this.cartItems$.pipe(take(1)).subscribe(items => {
            this.exportService.exportToExcel(items);
        });
    }

    exportExcel(): void {
        this.cartItems$.pipe(take(1)).subscribe(items => {
            this.exportService.exportToExcel(items);
        });
    }
}