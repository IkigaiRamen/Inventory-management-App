import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { FournisseurService } from '../personne/fournisseurServices';
import { Fournisseur } from '../../../shared/models/personne/fourniesseur';
import { ApiResponse } from '../../../shared/models/config/api-response';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-liste-fournisseurs',
  templateUrl: './listefournisseurs.component.html',
  styleUrls: ['./listefournisseurs.component.scss'],
})
export class ListefournisseursComponent implements OnInit {
  loading: boolean = true;
  fournisseurs: Fournisseur[] = [];
  selectedFournisseur: Fournisseur | null = null;
  currentFournisseurAffichage: Fournisseur | null = null;
  displayFournisseurModal: boolean = false;
  submitted: boolean = false;
  isInvalidNumero: boolean = false;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private fournisseurService: FournisseurService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  validateNumero(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isInvalidNumero = isNaN(Number(input.value));
  }


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(
      (response: ApiResponse<Fournisseur[]>) => {
        this.fournisseurs = response.data;
        this.loading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération des fournisseurs',
        });
        this.loading = false; // Stop loading in case of error
      }
    );
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table): void {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  confirmDeleteFournisseur(fournisseurId: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce fournisseur ?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.deleteFournisseur(fournisseurId);
      },
    });
  }

  deleteFournisseur(fournisseurId: number): void {
    this.fournisseurService.deleteFournisseur(fournisseurId).subscribe(
      () => {
        this.fournisseurs = this.fournisseurs.filter(fournisseur => fournisseur.id !== fournisseurId);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Fournisseur supprimé avec succès',
        });
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la suppression du fournisseur',
        });
      }
    );
  }

  editFournisseur(fournisseur: Fournisseur): void {
    this.selectedFournisseur = { ...fournisseur };
    this.currentFournisseurAffichage = { ...fournisseur };
    this.displayFournisseurModal = true;
  }

  closeFournisseurModal(): void {
    this.selectedFournisseur = null;
    this.currentFournisseurAffichage = null;
    this.displayFournisseurModal = false;
  }

  saveFournisseur(): void {
    if (this.currentFournisseurAffichage && this.currentFournisseurAffichage.id !== undefined && this.currentFournisseurAffichage.nom &&
        this.currentFournisseurAffichage.prenom && this.currentFournisseurAffichage.numero && !this.isInvalidNumero
    ) {
      this.fournisseurService.updateFournisseur(this.currentFournisseurAffichage.id, this.currentFournisseurAffichage).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Fournisseur mis à jour avec succès',
          });
          this.displayFournisseurModal = false;
          this.fetchData();
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la mise à jour du fournisseur',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Veuillez remplir les champs requis',
      });
    }
  }
}
