import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Commande } from '../../../shared/models/commande/commande';
import { CommandeService } from '../../PanierComponent/commande.Service';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  commandes: Commande[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  rows: number = 10; // Number of records per page
  searchTerm: string = ''; 
  expandedOrders = new Set<number>();

  constructor(private commandeService: CommandeService, private router: Router,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCommandes({ first: 0, rows: this.rows });
  }

  loadCommandes(event: LazyLoadEvent): void { 
    this.loading = true;
    const page = event.first! / event.rows!;
    const size = event.rows!;

    this.commandeService.getPaginatedCommandes(page, size, this.searchTerm).subscribe(
      (response) => {
        console.log("these are the orders" , response);
        this.commandes = response.data;
        this.totalRecords = response.totalRecords;
        this.loading = false;
        
      },
      (error) => {
        console.error('Error fetching commandes', error);
        this.loading = false;
      }
    );
  }
  toggleDetails(commandeId: number): void {
    if (this.expandedOrders.has(commandeId)) {
      this.expandedOrders.delete(commandeId);
    } else {
      this.expandedOrders.add(commandeId);
    }
  }

  isExpanded(commandeId: number): boolean {
    return this.expandedOrders.has(commandeId);
  }
  consulterCommande(commandeId: number): void {
    this.router.navigate(['/order-summary', commandeId]);
  }
  onSearch(): void {
    // Trigger search when the user types
    this.loadCommandes({ first: 0, rows: this.rows });
  }
   // Handle the "Traiter la commande" button click (progressCommande)
   traiterCommande(commandeId: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir traiter cette commande ?',
      header: 'Traiter la commande',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("Requesting to progress commande:", commandeId); // Log before the API call
        this.commandeService.progressCommande(commandeId).subscribe(
          (response) => {
            const updatedCommande = response.data;
            this.updateCommandeInList(updatedCommande);
            this.messageService.add({
              severity: 'success',
              summary: 'Commande Traitée',
              detail: 'La commande a été traitée avec succès.',
            });
          },
          (error) => {
            console.error('Error progressing commande', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Il y a eu une erreur lors du traitement de la commande.',
            });
          }
        );
      }
    });
  }
  

  // Handle the "Valider la commande" button click (validateCommande)
  validerCommande(commandeId: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir valider cette commande ?',
      header: 'Valider la commande',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commandeService.validateCommande(commandeId).subscribe(
          (response) => {
            const updatedCommande = response.data;
            this.updateCommandeInList(updatedCommande);
            this.messageService.add({
              severity: 'success',
              summary: 'Commande Validée',
              detail: 'La commande a été validée avec succès.',
            });
          },
          (error) => {
            console.error('Error validating commande', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Il y a eu une erreur lors de la validation de la commande.',
            });
          }
        );
      }
    });
  }
  // Handle the "Annuler la commande" button click (cancelCommande)
  annulerCommande(commandeId: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir annuler cette commande ?',
      header: 'Annuler la commande',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commandeService.cancelCommande(commandeId).subscribe(
          (response) => {
            const updatedCommande = response.data;
            this.updateCommandeInList(updatedCommande);
            this.messageService.add({
              severity: 'success',
              summary: 'Commande Annulée',
              detail: 'La commande a été annulée avec succès.',
            });
          },
          (error) => {
            console.error('Error cancelling commande', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Il y a eu une erreur lors de l\'annulation de la commande.',
            });
          }
        );
      }
    });
  }
  // Helper method to update the commande in the list
private updateCommandeInList(updatedCommande: Commande): void {
  const index = this.commandes.findIndex(c => c.commandeId === updatedCommande.commandeId);
  if (index > -1) {
    this.commandes[index] = updatedCommande;
  }
  this.changeDetector.detectChanges(); // Manually trigger change detection
}
}
