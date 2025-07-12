import { Injectable } from '@angular/core';
import { Produit } from '../../shared/models/produit/Produit';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Produit[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(product: Produit): void {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      // If product already exists, do nothing (don't modify the quantity)
      console.log(`Le produit ${product.libelle} est déjà dans le panier. Quantité non modifiée.`);
      return; // Exit without modifying cart or quantity
    } else {
      // If product does not exist in the cart, add it with the available quantity
      this.cart.push({ ...product, quantiteDisponible: product.quantiteDisponible });
    }
    this.updateLocalStorage();
    this.updateCartItemCount(); // Update count
  }

  private updateCartItemCount(): void {
    const count = this.cart.reduce((total, item) => total + item.quantiteDisponible, 0);
    this.cartItemCount.next(count); // Emit new count
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCartFromLocalStorage(): void {
    const cartData = localStorage.getItem('cart');
    this.cart = cartData ? JSON.parse(cartData) : [];
    this.updateCartItemCount(); // Initialize cart count
  }
  clearCart(): void {
    this.cart = []; // Empty the cart array
    this.cartItemCount.next(0); // Reset item count
    localStorage.removeItem('cart'); // Remove cart from localStorage
  }
}
