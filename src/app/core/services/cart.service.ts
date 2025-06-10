import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();
  items$ = this.itemsSubject.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCount.asObservable();
  constructor() { }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.updateCart(currentItems);
  }
  getItems() {
    return this.itemsSubject;
  }
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter(
      item => item.product.id !== productId
    );
    this.updateCart(currentItems);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }
  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCart(currentItems);
      }
    }
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(totalCount);

  }

  isInCart(productId: number): Observable<boolean> {
    return this.cartItems$.pipe(
      map(items => items.some(item => item.product.id === productId))
    );
  }
  getTotalPrice(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) =>
        total + (item.product.price * item.quantity), 0
      ))
    );
  }
}
