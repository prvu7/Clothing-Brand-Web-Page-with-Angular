import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './cart.interface';
import { Clothes } from '../clothes/clothes.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  addToCart(item: Clothes, quantity: number = 1): void {
    const index = this.cartItems.findIndex(ci => ci.product.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity += quantity;
    } else {
      this.cartItems.push({ product: item, quantity });
    }
    console.log('CartService updating cart:', this.cartItems);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(ci => ci.product.id !== productId);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  clearCart(): void {
    this.cartItems = []; 
    this.cartItemsSubject.next([...this.cartItems]);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }
}
