import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ProductInterface } from "../../interfaces/interface";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private $cartItems = new BehaviorSubject<ProductInterface[]>([]);
  cartItems$ = this.$cartItems.asObservable();
  private isCartVisibleSubject = new BehaviorSubject<boolean>(false);
  isCartVisible$ = this.isCartVisibleSubject.asObservable();

  constructor() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.$cartItems.next(JSON.parse(storedCartItems));
    }
  }

  addToCart(product: ProductInterface, selectedColor: string, selectedSize: string): void {
    const currentCartItems = this.$cartItems.value;
    const existingItem = currentCartItems.find(
      (item) => item.id === product.id && item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      this.$cartItems.next([
        ...currentCartItems,
        { ...product, quantity: 1, selectedColor, selectedSize },
      ]);
    }
    this.updateLocalStorage();
  }

  totalItemsQuantity$ = this.$cartItems.pipe(
    map(items => this.calculateTotalItemsQuantity())
  );

  removeItem(productId: number, selectedColor: string, selectedSize: string): void {
    const updatedCartItems = this.$cartItems.value.filter((item) => {
      if (item.id === productId) {
        return item.selectedColor !== selectedColor || item.selectedSize !== selectedSize;
      }
      return true;
    });
    this.$cartItems.next(updatedCartItems);
    this.updateLocalStorage();
  }

  cartVisibility(): void {
    this.isCartVisibleSubject.next(!this.isCartVisibleSubject.value);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.$cartItems.value));
  }

  incrementQuantity(item: ProductInterface): void {
    const updatedCartItems = this.$cartItems.value.map(cartItem => {
      if (cartItem.id === item.id && cartItem.selectedColor === item.selectedColor && cartItem.selectedSize === item.selectedSize) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });
    this.$cartItems.next(updatedCartItems);
    this.updateLocalStorage();
  }

  decrementQuantity(item: ProductInterface): void {
    const updatedCartItems = this.$cartItems.value.map(cartItem => {
      if (cartItem.id === item.id && cartItem.selectedColor === item.selectedColor && cartItem.selectedSize === item.selectedSize) {
        const newQuantity = (cartItem.quantity || 0) > 1 ? (cartItem.quantity || 0) - 1 : 1;
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    this.$cartItems.next(updatedCartItems);
    this.updateLocalStorage();
  }

  getSubtotalOne(item: ProductInterface): number {
    return Math.round((item.price || 0) * (item.quantity || 0));
  }

  private calculateTotalItemsQuantity(): number {
    return this.$cartItems.value.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }
  proceedToCheckoutService(): void {
       const orderData = this.$cartItems.value;
      this.updateLocalStorage();
      console.log('Proceeding to checkout...', orderData);
  }
}
