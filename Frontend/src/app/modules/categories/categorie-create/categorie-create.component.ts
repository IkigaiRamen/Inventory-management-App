import { Component } from '@angular/core';
import { CategoriesService } from '../categoriesList/categories.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-categorie-create',
  templateUrl: './categorie-create.component.html',
  styleUrls: ['./categorie-create.component.scss'],
  providers: [MessageService]  // Ensure MessageService is provided here
})
export class CategorieCreateComponent {
  libelle: string = '';
  description: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  // Check if the 'libelle' (category name) is invalid (empty)
  isLibelleInvalid(): boolean {
    return !this.libelle || this.libelle.trim().length === 0;
  }


  // Create category after validating inputs
  createCategorie() {
    if (this.isLibelleInvalid()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Le nom de la catégorie est requis.'
      });
      return; // Prevent the category creation if the 'libelle' is invalid
    }

    const newCategory = {
      libelle: this.libelle,
      description: this.description
    };

    this.categoriesService.addCategorie(newCategory).subscribe({
      next: (response) => {
        console.log('Category created successfully:', response);

        // Display success toast
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Catégorie ajoutée avec succès'
        });

        // Optionally, reset form fields
        this.libelle = '';
        this.description = '';
      },
      error: (error) => {
        console.error('Error creating category:', error);

        // Display error toast
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de l’ajout de la catégorie'
        });
      }
    });
  }
}