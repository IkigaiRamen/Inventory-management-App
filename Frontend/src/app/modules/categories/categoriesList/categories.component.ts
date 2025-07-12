import {Component, OnInit} from '@angular/core';
import {Column} from "../../../shared/models/table/column";
import {Categorie} from "../../../shared/models/categorie/categorie";
import {HEADERS_CATEGORIES} from "../../../shared/constants/headers-categories-constants";
import {CategoriesService} from "./categories.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CreateCategorie} from "../../../shared/models/categorie/create-categorie";
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie.ts',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [MessageService]
})
export class CategoriesComponent implements OnInit {

  categories: Categorie[] = [];
    headersCategories: TableColumn[] = [
        { field: 'libelle', header: 'Name' },
        { field: 'description', header: 'Description' }
    ];
    nombreResultatsCategories: number = 0;
    resultPerPageCategories: number = 10;
    isEditableCategorie: boolean = true;
    isDeletableCategorie: boolean = true;
    displayCategorieModal: boolean = false;
    editing: boolean = false;
    submitted: boolean = false;
    selectedCategories: Categorie[] = [];
    currentCategorieAffichage: CreateCategorie = { libelle: '', description: '' };
    currentCategorie: Categorie | undefined;

    constructor(
        private confirmationService: ConfirmationService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getAllCategories();
    }

    getAllCategories(): void {
        this.categoriesService.getAllCategories().subscribe(response => {
            if (response && response.data) {
                this.categories = response.data; // Access categories from the response
                this.nombreResultatsCategories = this.categories.length; // Count the number of categories
            }
        }, error => {
            // Handle error case if needed
            console.error('Failed to fetch categories', error);
        });
    }
    

    deleteCategorie(categorie: Categorie) {
        this.categories = this.categories.filter(row => row !== categorie);
        this.categoriesService.deleteCategorie(categorie.id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
        });
    }

    deleteSelectedCategories() {
        // Confirmer la suppression de plusieurs catégories
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les catégories sélectionnées ?',
            header: 'Confirmer la suppression multiple',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // Si confirmé, supprimer chaque catégorie sélectionnée
                this.selectedCategories.forEach(categorie => this.deleteCategorie(categorie));
                this.selectedCategories = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Catégories sélectionnées supprimées avec succès',
                });
            }
        });
    }
    

    confirmDelete(categorie: Categorie) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this category?',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: () => this.deleteCategorie(categorie)
        });
    }

    openAddCategoryModal() {
        this.editing = false;
        this.currentCategorieAffichage = { libelle: '', description: '' };
        this.displayCategorieModal = true;
    }

    addNewCategorie(newCategorie: CreateCategorie) {
        this.submitted = true;
    
        // Validate required fields
        if (!newCategorie.libelle || !newCategorie.description) return;
    
        // Call the service to add the new category
        this.categoriesService.addCategorie(newCategorie).subscribe(response => {
            const addedCat = response.data; // Access the new category from the response
    
            // Add the new category to the front of the categories array
            this.categories = [addedCat, ...this.categories];
    
            // Close the modal and show a success message
            this.displayCategorieModal = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added successfully' });
        }, error => {
            // Handle error case if needed
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add category' });
        });
    }
    

    confirmEdit(categorie: Categorie) {
        this.editing = true;
        this.currentCategorieAffichage = { ...categorie };
        this.currentCategorie = categorie;
        this.displayCategorieModal = true;
    }

    updateCategorie(updatedCategorie: CreateCategorie) {
        this.submitted = true;
        
        // Check if required fields are present
        if (!updatedCategorie.libelle || !updatedCategorie.description) return;
    
        // Check if there is a current category to update
        if (this.currentCategorie) {
            this.categoriesService.updateCategorie(this.currentCategorie.id, updatedCategorie).subscribe(response => {
                const updatedCat = response.data; // Access the updated category from the response
    
                // Find the index of the current category and update it
                const index = this.categories.findIndex(cat => cat.id === updatedCat.id);
                if (index !== -1) {
                    this.categories[index] = updatedCat; // Update the category in the array
                }
    
                // Close the modal and show success message
                this.displayCategorieModal = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully' });
            });
        }
    }
    

    closeCategorieModal() {
        this.displayCategorieModal = false;
        this.submitted = false;
    }

    onGlobalFilter(dt: any, event: Event) {
        dt.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
interface TableColumn {
  field: string;
  header: string;
}