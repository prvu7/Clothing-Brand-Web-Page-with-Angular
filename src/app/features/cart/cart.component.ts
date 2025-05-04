import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/cart/cart.service';
import { CartItem } from '../../core/cart/cart.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;

  discountCode: string = '';
  discountPercent: number = 0;

  paymentNotification: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getTotal(items: CartItem[]): number {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return this.discountPercent > 0 ? total * (1 - this.discountPercent / 100) : total;
  }

  applyDiscount(): void {
    if (this.discountCode.trim().toLowerCase() === 'flashsale') {
      this.discountPercent = 15;
    } else {
      this.discountPercent = 0;
    }
  }

  pay(): void {
    this.cartService.clearCart();
    this.discountCode = '';
    this.discountPercent = 0;
    this.paymentNotification = 'Payment successful';
    setTimeout(() => {
      this.paymentNotification = '';
    }, 3000);
  }
}
