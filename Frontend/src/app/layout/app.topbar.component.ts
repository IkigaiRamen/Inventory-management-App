import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { LayoutService } from "./service/app.layout.service";
import { CartService } from "../modules/PanierComponent/cartService";
import { BarcodeFormat } from "@zxing/library";
import { ProduitsService } from "../modules/Produits/produit/produit.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];
  cartItemCount: number = 0; // Variable to hold the count of cart items
  showScanner: boolean = false;
  scannedResult: string = "";
  allowedFormats = [BarcodeFormat.EAN_13];
  loading: boolean = false; // Variable to track loading state
  produit: any; // To hold the product details after fetching it
  confirmationMessage: string = ''; // Message to show after product is added to the cart

  @ViewChild("menubutton") menuButton!: ElementRef;
  @ViewChild("topbarmenubutton") topbarMenuButton!: ElementRef;
  @ViewChild("topbarmenu") menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private cartService: CartService,
    private produitsService: ProduitsService // Inject the ProduitsService
  ) {}

  ngOnInit() {
    // Subscribe to the cart item count observable for real-time updates
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
      console.log("cartItemCount updated:", this.cartItemCount);
    });
  }

  openScanner() {
    this.showScanner = !this.showScanner;  // Toggle the scanner
  }

  handleScanResult(result: string) {
    this.scannedResult = result;
    console.log("Scanned Product:", result);
    this.showScanner = false;
    this.searchProductByBarcode(result); // Search for the product based on barcode
  }

  // Method to search for the product by barcode and add it to the cart
  searchProductByBarcode(barcode: string): void {
    this.loading = true;
    this.produitsService.getAllProduitsPaginated(1, 10, barcode).subscribe({
      next: (response) => {
        console.log("Product found:", response);
        if (response.data && response.data.length > 0) {
          this.produit = response.data[0]; // Assuming we get the product
          this.addToCart(this.produit); // Add product to cart
        } else {
          console.log("Product not found");
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching product", err);
        this.loading = false;
      }
    });
  }

  // Method to add the product to the cart and show a confirmation message
  addToCart(product: any): void {
    this.cartService.addToCart(product); // Add product to cart service
    this.cartItemCount++; // Update the cart item count
    this.confirmationMessage = `Product ${product.name} added to the cart!`; // Show confirmation message
    setTimeout(() => {
      this.confirmationMessage = ''; // Clear the confirmation message after 3 seconds
    }, 3000);
  }

  onScanSuccess(result: any): void {
    console.log('Scanned result:', result); // Log or process the scanned barcode
    this.scannedResult = result;  // Optionally store the scanned result
  }
}
