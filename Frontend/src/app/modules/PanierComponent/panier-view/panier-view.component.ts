import { Component } from '@angular/core';
import { Produit } from '../../../shared/models/produit/Produit'; // Ensure this import path is correct
import { DetailCommande } from '../../../shared/models/detail-commande/detail-commande';
import { Router } from '@angular/router';
import { TypeCommande } from '../../../shared/models/commande/commande';
import { CommandeService } from '../commande.Service';
import { CommandeDetailCreation } from '../../../shared/models/commande/commandeDetailCreation';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-panier-view',
  templateUrl: './panier-view.component.html',
  styleUrls: ['./panier-view.component.scss']
})
export class PanierViewComponent {
  cart: Produit[] = [];
  quantities: { label: string, value: number }[] = [];
  selectedQuantity: { [key: number]: number } = {};
  selectedTypeCommande: TypeCommande | null = null;
  TypeCommande = TypeCommande;  // Expose enum to template

  constructor(
    private router: Router,
    private commandeService: CommandeService,  // Inject CommandeService
    private messageService: MessageService
  ) {
    this.initializeQuantities();
    this.loadCartFromLocalStorage();
  }

  selectOrderType(type: TypeCommande): void {
    this.selectedTypeCommande = type;
    console.log(this.selectedTypeCommande, "type");
  }

  initializeQuantities() {
    for (let i = 1; i <= 10; i++) {
      this.quantities.push({ label: i.toString(), value: i });
    }
  }

  loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
      // Initialize selectedQuantity with default value of 1 for each product
      this.cart.forEach(product => {
        if (!this.selectedQuantity[product.id]) {
          this.selectedQuantity[product.id] = 1;
        }
      });
    } else {
      this.cart = [];
    }
  }

  calculateSubtotal() {
    return this.cart.reduce((acc, product) => {
      const quantity = this.selectedQuantity[product.id] || 1;
      if (this.selectedTypeCommande === TypeCommande.RENTAL) {
        return acc + (product.prixLoc * quantity);
      }
      return acc + (product.prix * quantity);
    }, 0).toFixed(2);
  }
  

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(product => product.id !== productId);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1) newQuantity = 1; // Ensure quantity doesn't go below 1
    const product = this.cart.find(p => p.id === productId); // Find the product in the cart

    if (product) {
      // Ensure newQuantity doesn't exceed the available quantity
      if (newQuantity > product.quantiteDisponible) {
        newQuantity = product.quantiteDisponible;
      }
      this.selectedQuantity[productId] = newQuantity;
    }
    this.updateLocalStorage();
  }

  onTypeCommandeSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTypeCommande = selectElement.value as TypeCommande;
  }

  proceedToCheckout() {
    if (!this.selectedTypeCommande) {
      // Display error toast instead of alert
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez sélectionner un type de commande'
      });
      return;
    }
    // Log cart and selected quantities before creating the order
    console.log('Cart:', this.cart);  // Log cart to see the products
    console.log('Selected Quantity:', this.selectedQuantity);  // Log selected quantities

    const detailCommandeDTOList: DetailCommande[] = this.cart.map(product => ({
      produitId: product.id,
      quantite: this.selectedQuantity[product.id] || 1,
      prixUnitaire: product.prix,
      prixLoc:product.prixLoc
    }));
    console.log('DetailsCommande:', detailCommandeDTOList);  // Debug log

    const commandeData: CommandeDetailCreation = {
      typeCommande: this.selectedTypeCommande,
      detailCommandeDTOList,
    };

    // Call backend to create initial Commande
    this.commandeService.createCommandeWithDetails(commandeData).subscribe(
      response => {
        console.log("commande", response);
        this.router.navigate(['/order-details'], {
          state: {
            commandeId: response.data.commandeId,
            typeCommande: this.selectedTypeCommande,
            detailCommandeDTOList: detailCommandeDTOList
          },
        });
        // Show success toast after order creation
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Commande créée avec succès!'
        });
      },
      error => {
        console.error('Error creating order:', error);

        // Show error toast
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la création de la commande.'
        });
      }
    );
  }

  quantityError: { [key: string]: boolean } = {};

  validateQuantity(product: Produit) {
    const quantity = this.selectedQuantity[product.id];
    if (product.quantiteDisponible !== undefined) {
      this.quantityError[product.id] = quantity > product.quantiteDisponible;
    }
  }
}
