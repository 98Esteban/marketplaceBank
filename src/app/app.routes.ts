import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id',component: ProductDetailComponent }
];