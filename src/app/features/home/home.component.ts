import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { ProductService } from '../../../app/core/services/product.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { combineLatest } from 'rxjs';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { CategoryFilterComponent } from '../../shared/components/category-filter/category-filter.component';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    SearchBarComponent,
    CategoryFilterComponent,
    ProductGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  featuredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = 'all';
  searchQuery = '';
  loading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;

    combineLatest([
      this.productService.getProducts(),
      this.productService.getCategories()
    ]).subscribe({
      next: ([products, categories]) => {
        this.products = products;
        this.filteredProducts = products;
        this.featuredProducts = this.getRandomProducts(products, 5);
        this.categories = categories;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  private getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  onSearch(query: any): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredProducts = filtered;
  }

  onAddToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  onProductClick(product: Product): void {

  }
}