import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, ProductCardComponent, RouterModule],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    product?: Product;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.productService.getProductById(+id).subscribe(product => {
                this.product = product;
                console.log(this.product);
            });
        }
    }

    addToCart(product: any): void {
        console.log(product, 'Producto agregado');
        if (product) {
            this.cartService.addToCart(product);
        }
    }

    removeFromCart(product: any): void {
        console.log(product, 'Producto eliminado');
        if (product) {
            this.cartService.removeFromCart(product.id);
        }
    }
}