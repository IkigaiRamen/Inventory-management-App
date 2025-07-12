import { Component } from "@angular/core";
import { CreateProduit } from "../../../shared/models/produit/create-produit";
import { Produit } from "../../../shared/models/produit/Produit";
import { Column } from "../../../shared/models/table/column";
import { ConfirmationService, MessageService } from "primeng/api";
import { ProduitsService } from "./produit.service";
import { HEADERS_PRODUITS } from "../../../shared/constants/headers-produits-constants";
import { Categorie } from "../../../shared/models/categorie/categorie";
import { CategoriesService } from "../../categories/categoriesList/categories.service";
import { ActivatedRoute } from "@angular/router";
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: "app-produit",
  templateUrl: "./produit.component.html",
  styleUrls: ["./produit.component.scss"],
})
export class ProduitComponent {
  produits: Produit[] = [];
  headersProduits: Column[] = [];
  nombreResultatsProduits: number = 0;
  resultPerPageProduits: number = 10;
  isEditableProduits: boolean = true;
  isDeletableProduits: boolean = true;
  displayProduitsModal: boolean = false;
  editing: boolean = false;
  editingId: number | null = null; 
  categoriesList: Categorie[] = [];
  selectedCategoryId: number | null = null;
  selectedImageFile: File | null = null; 
  showScanner = false;
  allowedFormats =[BarcodeFormat.EAN_13]
  currentProduitAffichage: CreateProduit = {
    libelle: "",
    description: "",
    quantiteTotale: 0,
    quantiteDisponible: 0,
    imageurl: "",
    categorieId: 0,
    prix:0,
    prixLoc:0,
  };

  expandedRows: { [key: string]: boolean } = {};
  isExpanded = false;
  submitted: boolean = false;

  currentProduit: Produit | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private produitService: ProduitsService,
    private messageService: MessageService,
    private categorieService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedCategoryId = +params["categoryId"];
    });
    
    if (this.selectedCategoryId) {
      this.filterProduitsByCategory(this.selectedCategoryId);
    } else {
      this.getAllProduits();
    }

    this.headersProduits = HEADERS_PRODUITS;
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categorieService.getAllCategories().subscribe(response => {
        if (response && response.data) {
            this.categoriesList = response.data; // Load categories from the response data
        } else {
            // Handle the case where there are no categories or response is empty
            this.categoriesList = []; // Or handle it as appropriate
            console.warn('No categories found or invalid response:', response);
        }
    }, error => {
        // Handle error case if needed
        console.error('Failed to fetch categories', error);
    });
}

  getAllProduits(): void {
    this.produitService.getAllProduits().subscribe((result) => {
      if (result) {
        this.produits = result;
        this.nombreResultatsProduits = this.produits.length;
      }
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.selectedImageFile = fileInput.files[0];
    }
    console.log(this.selectedImageFile,"Image");
  }

  deleteProduit(produit: Produit) {
    this.produits = this.produits.filter((row) => row !== produit);
    this.produitService.deleteProduit(produit.id).subscribe((result) => {
      this.messageService.add({
        severity: "success",
        summary: "Succès",
        detail: "Produit supprimé",
      });
    });
  }

  confirmDelete(rowData: any) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      accept: () => {
        this.deleteProduit(rowData);
      },
    });
  }

  openAddProduitModal() {
    this.editing = false;
    this.showScanner = false; // Reset scanner visibility when opening the modal
    this.currentProduitAffichage = {
      libelle: "",
      description: "",
      quantiteTotale: 0,
      quantiteDisponible: 0,
      imageurl: "",
      categorieId: 0,
      prix:0,
      prixLoc:0,
      barcode: "",
    }; // Clear form
    this.selectedImageFile = null; // Reset selected file
    this.displayProduitsModal = true;
  }
  onScanSuccess(barcode: string): void {
    this.showScanner = false;
    this.currentProduitAffichage.barcode = barcode;
  }
  submitProduit() {
    this.submitted = true;
     // Check if required fields are empty
  if (
    !this.currentProduitAffichage.libelle ||
    !this.currentProduitAffichage.description ||
    !this.currentProduitAffichage.quantiteTotale ||
    !this.currentProduitAffichage.prix ||
    !this.currentProduitAffichage.prixLoc ||
    this.currentProduitAffichage.categorieId === 0 // Assuming 0 means no category selected
  ) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Veuillez remplir tous les champs obligatoires.',
    });
    return; // Don't proceed with the submit if validation fails
  }
    const formData = new FormData();
    
    // Create an object to hold the product data
    const produitData = {
        libelle: this.currentProduitAffichage.libelle,
        description: this.currentProduitAffichage.description,
        quantiteTotale: this.currentProduitAffichage.quantiteTotale,
        quantiteDisponible: this.currentProduitAffichage.quantiteTotale,
        categorieId: this.currentProduitAffichage.categorieId,
        prix:this.currentProduitAffichage.prix,
        prixLoc:this.currentProduitAffichage.prixLoc,
        imageurl: this.currentProduitAffichage.imageurl, // Retain existing image URL
        barcode:this.currentProduitAffichage.barcode,
    };

    // Append the produitData as JSON string
    formData.append("produit", JSON.stringify(produitData));

    // Append the selected image file with the key 'file'
    if (this.selectedImageFile) {
        formData.append("file", this.selectedImageFile); 
    }

    if (this.editing && this.currentProduit?.id !== undefined) {
        this.produitService.updateProduit(this.currentProduit.id, formData).subscribe((result) => {
            const index = this.produits.findIndex((p) => p.id === result.id);
            if (index !== -1) {
                this.produits[index] = result;
            }
            this.closeProduitsModal();
            this.messageService.add({
                severity: "success",
                summary: "Succès",
                detail: "Produit modifié avec succès",
            });
        }, (error) => {
            console.error("Update Error: ", error);
        });
    } else {
        this.produitService.addProduit(formData).subscribe((result) => {
            this.produits.push(result);
            this.closeProduitsModal();
            this.messageService.add({
                severity: "success",
                summary: "Succès",
                detail: "Produit ajouté avec succès",
            });
        }, (error) => {
            console.error("Add Error: ", error);
        });
    }
}



  // Method to start editing, setting editingId and currentProduitAffichage
  startEditing(produit: Produit) {
    this.editing = true;
    this.editingId = produit.id;
    this.currentProduitAffichage = {
      libelle: produit.libelle,
      description: produit.description,
      quantiteTotale: produit.quantiteTotale,
      quantiteDisponible: produit.quantiteDisponible,
      imageurl: produit.imageurl,
      categorieId: produit.categorieId,
      prix: produit.prix,
      prixLoc: produit.prixLoc,
      barcode: produit.barcode,
    };
    this.selectedImageFile = null; // Reset selected file to use imageurl for preview
    this.displayProduitsModal = true;
  }

  confirmEdit(produit: Produit) {
    this.editing = true;
    this.currentProduitAffichage = { ...produit };
    this.currentProduit = produit;
    this.selectedImageFile = null; // Reset file so imageurl can show in the preview
    console.log("this is the current product", this.currentProduit);
    this.displayProduitsModal = true;
  }

  closeProduitsModal() {
    this.displayProduitsModal = false;
    this.currentProduitAffichage = {
      libelle: "",
      description: "",
      quantiteTotale: 0,
      quantiteDisponible: 0,
      imageurl: "",
      categorieId: 0,
      prix:0,
      prixLoc:0,
      barcode: "",
    }; // Reset form
    this.selectedImageFile = null; // Reset selected file
  }

  // Filter products by category
  filterProduitsByCategory(categorieId: number): void {
    this.produitService.getAllProduitsByCategory(categorieId).subscribe((result) => {
      if (result) {
        this.produits = result;
        this.nombreResultatsProduits = this.produits.length;
      }
    });
  }

  expandAll() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      // Expand all rows
      this.produits.forEach((produit) => {
        this.expandedRows[produit.libelle] = true;
      });
    } else {
      // Collapse all rows
      this.expandedRows = {};
    }
  }
}