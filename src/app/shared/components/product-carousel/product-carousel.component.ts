import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-carousel',
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ProductCardComponent
  ],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent {
  @Input() products: Product[] = [];

  customOptions: any = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 }
    }
  };

 
}