import { Component, OnDestroy, OnInit } from "@angular/core";
import { DetailCommande } from "../../shared/models/detail-commande/detail-commande";
import { Router } from "@angular/router";
import { CommandeService } from "../PanierComponent/commande.Service";
import { Client } from "../../shared/models/personne/client";
import { Fournisseur } from "../../shared/models/personne/fourniesseur";
import { ClientService } from "../personneComponents/personne/clientServices";
import { FournisseurService } from "../personneComponents/personne/fournisseurServices";
import { ProduitsService } from "../Produits/produit/produit.service"; // Import the service
import { ConfirmationService, MessageService } from "primeng/api";
import { ListboxChangeEvent } from "primeng/listbox"; // Import the ListboxChangeEvent type
import { CartService } from "../PanierComponent/cartService";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  fournisseurs: Fournisseur[] = [];
  detailsCommande: DetailCommande[] = [];
  selectedPersonneId: number | null = null;
  selectedSens: string | null = null;
  selectedTypeCommande: string | null = null;
  commandeId: number | null = null;
  totalPrix: number = 0;
  dateDebutCommande: Date | null = null;
  dateFinCommande: Date | null = null;
  generateDevis: boolean = false; // Stores the checkbox state
  devisExpirationDate: Date | null = null; // Stores the expiration date
  dateEcheanceFacture: Date | null = null; // Ensure this is initialized properly
  selectedFournisseur: Fournisseur | null = null;
  selectedClient: Client | null = null;
  produitDetails: { [key: number]: any } = {}; // Store product details by produitId
  navigationThroughButton: boolean = false;
  selectedStatutPaiement: string | null = null;
  selectedModePaiement: string | null = null;
  constructor(
    private router: Router,
    private commandeService: CommandeService,
    private clientService: ClientService,
    private produitService: ProduitsService,
    private fournisseurService: FournisseurService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cartService: CartService
  ) {
    const navigation = this.router.getCurrentNavigation();
    console.log("Router state:", navigation?.extras.state);
    this.commandeId = navigation?.extras?.state?.["commandeId"];
    this.selectedTypeCommande =
      navigation?.extras?.state?.["typeCommande"] || null;
    this.detailsCommande =
      navigation?.extras?.state?.["detailCommandeDTOList"] || [];
  }

  ngOnInit(): void {
    console.log("Selected Type Commande:", this.selectedTypeCommande);
    this.loadClients();
    this.loadFournisseurs();
    this.calculateTotal();
    this.fetchProductDetails();
    this.initializeSensBasedOnCommandeType();
    this.updateTotal(); // initial calculation
  }

  ngOnChanges() {
    this.updateTotal(); // recalculate when relevant inputs change
  }
  onDevisChange(): void {
    if (this.generateDevis) {
      console.log(
        "Generating Devis, expiration date selected:",
        this.devisExpirationDate
      );
    } else {
      console.log("Devis generation canceled.");
    }
  }

  statutPaiementOptions = [
    { label: "En cours", value: "IN_PROGRESS" },
    { label: "Payé", value: "PAID" },
    { label: "Non payé", value: "NOT_PAID" },
  ];

  modePaiementOptions = [
    { label: "Carte de Crédit", value: "CREDIT_CARD" },
    { label: "Virement Bancaire", value: "BANK_TRANSFER" },
    { label: "Espèces", value: "CASH" },
  ];

  // This method can be used to submit the data, for example:
  submitDevisData(): void {
    if (this.generateDevis && this.devisExpirationDate) {
      console.log("Devis expiration date:", this.devisExpirationDate);
      // Your logic to handle the creation of the devis
    }
  }
  // Initialize selectedSens based on the selectedTypeCommande
  initializeSensBasedOnCommandeType(): void {
    if (this.selectedTypeCommande === "PURCHASE") {
      this.selectedSens = "DEBIT";
    } else if (
      this.selectedTypeCommande === "RENTAL" ||
      this.selectedTypeCommande === "SALE"
    ) {
      this.selectedSens = "CREDIT";
    }
  }
  calculateRentalPrice(prixLoc: number, quantite: number): number {
    // Ensure both dates are defined before calculating rental price
    if (!this.dateDebutCommande || !this.dateFinCommande) {
      return 0; // Return 0 if dates are not set
    }
    const diffTime = Math.abs(
      new Date(this.dateFinCommande).getTime() -
        new Date(this.dateDebutCommande).getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(
      diffDays * prixLoc * quantite,
      "this is the total in calculate"
    );
    return diffDays * prixLoc * quantite;
  }
  onDateChange(): void {
    // Trigger the total update whenever the dates change
    this.updateTotal();
  }

  updateTotal(): void {
    // Initialize totalPrix to 0 before starting the calculation
    this.totalPrix = 0;

    // Iterate over each detail in the detailsCommande array
    this.detailsCommande.forEach((detail) => {
      let price = 0;

      // Check if the selectedTypeCommande is 'RENTAL'
      if (this.selectedTypeCommande === "RENTAL") {
        // Ensure calculateRentalPrice is working with correct data
        if (detail.prixLoc && detail.quantite) {
          price = this.calculateRentalPrice(detail.prixLoc, detail.quantite);
          console.log(`Rental Price for ${detail.produitId}:`, price); // Check rental price calculation
        } else {
          console.log(
            `Skipping RENTAL for ${detail.produitId}, invalid data. PrixLoc: ${detail.prixLoc}, Quantite: ${detail.quantite}`
          );
        }
      } else {
        // For non-RENTAL types, use standard calculation
        price = (detail.quantite ?? 1) * (detail.prixUnitaire ?? 0);
        console.log(`Regular Price for ${detail.produitId}:`, price); // Check regular price calculation
      }

      // Add the calculated price to the total
      this.totalPrix += price;
      console.log(`Accumulated Total Price:`, this.totalPrix); // Check accumulated total after each item
    });

    // Ensure the totalPrix is formatted to two decimal places
    this.totalPrix = parseFloat(this.totalPrix.toFixed(2));

    console.log("Total Price after calculation:", this.totalPrix); // Check the final total
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe((response) => {
      this.clients = response.data;
    });
  }

  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe((response) => {
      this.fournisseurs = response.data;
    });
  }

  calculateTotal(): void {
    this.totalPrix = this.detailsCommande.reduce(
      (total, item) => total + item.quantite * item.prixUnitaire,
      0
    );
  }

  fetchProductDetails(): void {
    // Fetch product details by produitId for each detail
    this.detailsCommande.forEach((detail) => {
      this.produitService.getProduitById(detail.produitId).subscribe(
        (product) => {
          // Store the product details in the produitDetails object
          this.produitDetails[detail.produitId] = product;
          console.log("Product details:", product);
        },
        (error) => {
          console.error("Error fetching product details:", error);
        }
      );
    });
  }

  onPersonneSelected(event: ListboxChangeEvent, isClient: boolean): void {
    if (isClient) {
      this.selectedClient = event.value;
      this.selectedPersonneId = this.selectedClient?.id ?? null;
    } else {
      this.selectedFournisseur = event.value;
      this.selectedPersonneId = this.selectedFournisseur?.id ?? null;
    }
    // No longer setting selectedSens here
  }

  placeOrder(): void {
    this.navigationThroughButton = true;
    if (
      !this.commandeId ||
      !this.selectedPersonneId ||
      !this.selectedTypeCommande ||
      !this.selectedSens
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Erreur",
        detail: "Veuillez remplir tous les champs.",
      });
      return;
    }
  
    // Define the initial data fields
    const fillData: any = {
      referenceCommande: this.generateReference(),
      dateDebutCommande:
        this.selectedTypeCommande === "RENTAL" || this.selectedTypeCommande === "SALE"
          ? this.dateDebutCommande || undefined
          : undefined,
      dateFinCommande:
        this.selectedTypeCommande === "RENTAL" || this.selectedTypeCommande === "SALE"
          ? this.dateFinCommande || undefined
          : undefined,
      personneId: this.selectedPersonneId,
      sens: this.selectedSens,
    };
  
    // Add rental/sale-specific fields
    if (this.selectedTypeCommande === "RENTAL" || this.selectedTypeCommande === "SALE") {
      fillData.dateExpirationDevis = this.devisExpirationDate;  // Only for RENTAL and SALE types
    }
  
    // Add purchase-specific fields
    if (this.selectedTypeCommande === "PURCHASE") {
      fillData.statutPaiement = this.selectedStatutPaiement;
      fillData.modePaiement = this.selectedModePaiement;
      fillData.dateEcheance = this.dateEcheanceFacture;
    }
  
    console.log("Fill Data:", fillData);
  
    this.commandeService
      .fillAdditionalFields(this.commandeId, fillData)
      .subscribe(
        (response) => {
          this.cartService.clearCart();
          this.messageService.add({
            severity: "success",
            summary: "Succès",
            detail: "Commande confirmée avec succès!",
          });
          this.router.navigate(["/order-summary", this.commandeId]);
        },
        (error) => {
          console.error("Error completing order:", error);
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Une erreur est survenue lors de la confirmation de la commande.",
          });
        }
      );
  }

  

  generateReference(): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    let prefix = "CMD";

    if (
      this.selectedTypeCommande === "SALE" ||
      this.selectedTypeCommande === "RENTAL"
    ) {
      prefix = "CS";
    } else if (this.selectedTypeCommande === "PURCHASE") {
      prefix = "CE";
    }

    return `${prefix}-${dateStr}-${Math.floor(Math.random() * 1000)}`;
  }
  ngOnDestroy(): void {
    // We want to delete the commande when the component is destroyed (if not finalized)
    if (!this.navigationThroughButton) {
      this.deleteCommandeIfExists();
    }
  }

  // Method to delete the commande if it exists
  deleteCommandeIfExists(): void {
    if (this.commandeId) {
      this.commandeService.deleteCommande(this.commandeId).subscribe(
        () => {
          this.messageService.add({
            severity: "info",
            summary: "Commande Discarded",
            detail: "Your order was discarded because you navigated away.",
          });
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to discard your order.",
          });
        }
      );
    }
  }
}
