import { Component } from "@angular/core";
import { ClientService } from "./clientServices";
import { FournisseurService } from "./fournisseurServices";
import { Client } from "../../../shared/models/personne/client";
import { Fournisseur } from "../../../shared/models/personne/fourniesseur";
import { MessageService } from 'primeng/api'; // Import MessageService
import { ConfirmationService } from 'primeng/api'; // Import ConfirmationService

@Component({
  selector: "app-personne",
  templateUrl: "./personne.component.html",
  styleUrls: ["./personne.component.scss"],
  providers: [MessageService, ConfirmationService] // Provide MessageService and ConfirmationService
})
export class PersonneComponent {
  selectedType: string | undefined; // Holds the selected type
  nom: string = "";
  prenom: string = "";
  siren: string = ""; // Only for Fournisseur
  numero: string = ""; 
  numeroCin: string = ""; // Only for Client
  societe: string = ""; // Only for Fournisseur
  selectedImageFile: File | null = null; // Holds selected file for Client
  selectedImageFile2: File | null = null; // Holds selected file for Client
  isInvalidNumero: boolean = false;
  isInvalidNumeroCin: boolean = false;
  submitted: boolean = false;
  constructor(
    private clientService: ClientService,
    private fournisseurService: FournisseurService,
    private messageService: MessageService, // Inject MessageService
    private confirmationService: ConfirmationService // Inject ConfirmationService
  ) {}
  validateNumero(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isInvalidNumero = isNaN(Number(input.value));
  }

  validateNumeroCin(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isInvalidNumeroCin = isNaN(Number(input.value));
  }
  // File selection methods
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.selectedImageFile = fileInput.files[0];
    }
  }
  onFileSelected2(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      this.selectedImageFile2 = fileInput.files[0];
    }
  }

  // Input validation method
  validateInputs(): boolean {
    if (!this.nom || !this.prenom || !this.numero || !this.numeroCin) {
      this.messageService.add({
        severity: 'warn', 
        summary: 'Validation Error', 
        detail: 'Veuillez remplir tous les champs requis.'
      });
      return false;
    }

    // Validate numero and numeroCin to ensure they contain only numbers
    if (!this.isNumeric(this.numero) || !this.isNumeric(this.numeroCin)) {
      this.messageService.add({
        severity: 'warn', 
        summary: 'Validation Error', 
        detail: 'Le numéro et le numéro CIN doivent être des chiffres uniquement.'
      });
      return false;
    }

    return true;
  }

  // Helper function to check if a string is numeric
  isNumeric(value: string): boolean {
    return /^\d+$/.test(value);
  }

  addPersonne() {
    this.submitted = true;
    // Validate inputs
    if (!this.validateInputs()) {
      return; // Don't proceed if validation fails
    }

    // Confirmation dialog
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir ajouter cette personne ?',
      accept: () => {
        const commonData = {
          nom: this.nom,
          prenom: this.prenom,
          numero: this.numero,
          numeroCin: this.numeroCin,
          type: "CUSTOMER" // Set type for client
        };

        if (this.selectedType === "C") {
          // Handle Client
          const formData = new FormData();
          formData.append("nom", this.nom);
          formData.append("prenom", this.prenom);
          formData.append("type", commonData.type);
          formData.append("numero", this.numero);
          formData.append("numeroCin", this.numeroCin);

          // Create the JSON string from the commonData object
          formData.append("clientDTO", JSON.stringify(commonData));

          if (this.selectedImageFile) {
            formData.append("file", this.selectedImageFile);
          }
          if (this.selectedImageFile2) {
            formData.append("file2", this.selectedImageFile2);
          }

          console.log("Client data:", formData);
          this.clientService.saveClient(formData).subscribe(
            (response) => {
              console.log("Client added:", response);
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Client ajouté avec succès !' });
              this.resetForm();
            },
            (error) => {
              console.error("Error adding client:", error);
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'ajout du client.' });
            }
          );
        } else if (this.selectedType === "F") {
          // Handle Fournisseur
          const fournisseurData = {
            nom: this.nom,
            prenom: this.prenom,
            type: "SUPPLIER",
            societe: this.societe,
            siren: this.siren,
            numero: this.numero,
          };

          this.fournisseurService.saveFournisseur(fournisseurData).subscribe(
            (response) => {
              console.log("Fournisseur added:", response);
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Fournisseur ajouté avec succès !' });
              this.resetForm();
            },
            (error) => {
              console.error("Error adding fournisseur:", error);
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'ajout du fournisseur.' });
            }
          );
        } else {
          console.error("Please select a type. Current value:", this.selectedType);
          this.messageService.add({ severity: 'warn', summary: 'Avertissement', detail: 'Veuillez sélectionner un type.' });
        }
      },
      reject: () => {
        // Handle rejection
        this.messageService.add({ severity: 'info', summary: 'Annulé', detail: 'L\'ajout a été annulé.' });
      }
    });
  }

  resetForm() {
    this.nom = '';
    this.prenom = '';
    this.societe = '';
    this.selectedImageFile = null;
    this.selectedImageFile2 = null;
    this.selectedType = undefined;
  }
}
