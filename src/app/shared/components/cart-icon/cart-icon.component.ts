import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-cart-icon',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatBadgeModule, MatToolbarModule],
    templateUrl: './cart-icon.component.html',
    styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
    @Input() itemCount: number | null = 0;
    @Output() cartClick = new EventEmitter<void>();

    constructor(private router: Router, private cartService: CartService) { }

    ngOnInit(): void {
        this.cartService.cartCount$.subscribe(count => {
            this.itemCount = count;
        });
    }
    onCartClick(): void {
        this.cartClick.emit();
    }

    get cartItemCount(): number {
        return this.cartService.getItems().value.reduce((sum, item) => sum + item.quantity, 0);
    }
    goToCart(): void {
        this.router.navigate(['/cart']);
    }
}