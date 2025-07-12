import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProduitsService } from "../produit/produit.service";
import { Produit } from "../../../shared/models/produit/Produit";
import { CartService } from "../../PanierComponent/cartService";
import { LazyLoadEvent, MessageService } from "primeng/api";
import { debounceTime, Subject, switchMap } from "rxjs";

@Component({
  selector: "app-produits-list",
  templateUrl: "./produits-list.component.html",
  styleUrls: ["./produits-list.component.scss"],
})
export class ProduitsListComponent implements OnInit {
  produits: Produit[] = [];
  loading: boolean = true;
  categoryId: string | null = null;
  totalRecords: number = 0;  // To store the total number of products for pagination
  searchQuery: string = '';   // For search input
  page: number = 0;           // Current page number
  size: number = 10;          // Page size
  searchSubject: Subject<string> = new Subject<string>();  // RxJS subject for debouncing search input
  showRentalOnly: boolean = false;

  constructor(
    private produitService: ProduitsService,
    private cartService: CartService, 
    private route: ActivatedRoute,
    private messageService: MessageService 
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId'); // Get category ID from route

    // Set up debounce for search input
    this.searchSubject.pipe(
      debounceTime(500),  // Wait for 500ms after the user stops typing
      switchMap(searchQuery => {
        this.page = 0;  // Reset to first page on search
        return this.categoryId 
          ? this.produitService.getProduitsByCategoryPaginated(+this.categoryId, this.page, this.size, searchQuery) 
          : this.produitService.getAllProduitsPaginated(this.page, this.size, searchQuery);
      })
    ).subscribe({
      next: (response) => {
        this.produits = response.data;
        this.totalRecords = response.totalRecords;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading = false;
      }
    });

    // Trigger the initial load of products
    this.loadProduits();
  }

  // Fetch all products or products by category
  loadProduits(): void {
    this.loading = true;
    if (this.categoryId) {
      this.getProduitsByCategory(+this.categoryId); // Convert category ID from string to number
    } else {
      this.getAllProduits();
    }
  }

  // Fetch products by category with pagination and search
  getProduitsByCategory(categorieId: number): void {
    this.produitService.getProduitsByCategoryPaginated(categorieId, this.page, this.size, this.searchQuery).subscribe({
      next: (response) => {
        this.produits = response.data;
        this.totalRecords = response.totalRecords;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products by category', err);
        this.loading = false;
      }
    });
  }

  // Fetch all products with pagination and search
  getAllProduits(): void {
    this.produitService.getAllProduitsPaginated(this.page, this.size, this.searchQuery).subscribe({
      next: (response) => {
        console.log("this is all of the products",response);
        this.produits = response.data;
        this.totalRecords = response.totalRecords;
        this.loading = false;
      },
      error: (err) => { 
        console.error('Error fetching all products', err);
        this.loading = false;
      }
    });
  }

  // Search products, triggered on user input
  onSearch(): void {
    this.searchSubject.next(this.searchQuery);  // Trigger search with current query
  }

  // Handle page change for pagination
  onPageChange(event: LazyLoadEvent): void {
    this.page = event.first! / event.rows!;
    this.loadProduits();
  }

  addToCart(produit: Produit): void {
    this.cartService.addToCart(produit); // Add product to cart
    console.log(produit);
    // Show a success message using the MessageService
    this.messageService.add({
      severity: 'success',
      summary: 'Ajouté au Panier',
      detail: `${produit.libelle} a été ajouté au panier.`,
    });
  }

  getBackgroundColor(quantiteDisponible: number, quantiteTotale: number): string {
    const percentage = (quantiteDisponible / quantiteTotale) * 100;
    if (percentage <= 20) {
      return 'linear-gradient(135deg, #ff5c5c, #ff6b6b)'; // Red for low stock
    } else if (percentage <= 50) {
      return 'linear-gradient(135deg, #f9c74f, #f9d56e)'; // Yellow for medium stock
    } else {
      return 'linear-gradient(135deg, #6ab04c, #4cd137)'; // Green for sufficient stock
    }
  }
}
