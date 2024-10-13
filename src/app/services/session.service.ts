import { Injectable } from '@angular/core';
import { Product } from '../classes/Product';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  key : string = 'ShoptrekCart';
  constructor() { }

  // Set cart data in session storage
  setCart(value: Product[]): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  // Get cart data from session storage
  getCart(): any {
    const data = sessionStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }

  // On checkout clear cart
  clearCart(): void {
    sessionStorage.removeItem(this.key);
  }
}
