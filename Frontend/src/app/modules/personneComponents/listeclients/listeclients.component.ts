import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { ClientService } from '../personne/clientServices';
import { Client } from '../../../shared/models/personne/client';
import { ApiResponse } from '../../../shared/models/config/api-response';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-clients',
  templateUrl: './listeclients.component.html',
  styleUrls: ['./listeclients.component.scss'],
})
export class ListeclientsComponent implements OnInit {
  loading: boolean = true;
  clients: Client[] = [];
  selectedClient: Client | null = null;
  currentClientAffichage: Client | null = null;
  displayEditClientModal: boolean = false;
  submitted: boolean = false;
  isConfirmingDelete = false;
  selectedFile: File | null = null;
  isInvalidNumero: boolean = false;
  isInvalidNumeroCin: boolean = false;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  validateNumero(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isInvalidNumero = isNaN(Number(input.value));
  }

  validateNumeroCin(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isInvalidNumeroCin = isNaN(Number(input.value));
  }
  
  ngOnInit(): void {
    this.fetchData();
  }

  onCinRectoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.currentClientAffichage) {
          this.currentClientAffichage.cinRecto = reader.result as string;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  onCinVersoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.currentClientAffichage) {
          this.currentClientAffichage.cinVerso = reader.result as string;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  fetchData(): void {
    this.clientService.getAllClients().subscribe(
      (response: ApiResponse<Client[]>) => {
        this.clients = response.data;
        this.loading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la récupération des clients',
        });
        this.loading = false;
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

  confirmDeleteClient(clientId: number): void {
    if (this.isConfirmingDelete) return;
    this.isConfirmingDelete = true;
    
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce client ?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.deleteClient(clientId);
      },
      reject: () => {
        this.isConfirmingDelete = false;
      }
    });
  }
  
  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(
      () => {
        this.clients = this.clients.filter(client => client.id !== clientId);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Client supprimé avec succès',
        });
        this.isConfirmingDelete = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la suppression du client',
        });
        this.isConfirmingDelete = false;
      }
    );
  }

  editClient(client: Client): void {
    this.selectedClient = { ...client };
    this.currentClientAffichage = { ...client };
    this.displayEditClientModal = true;
  }

  closeEditClientModal(): void {
    this.selectedClient = null;
    this.currentClientAffichage = null;
    this.displayEditClientModal = false;
  }

  saveClient(): void {
    this.submitted = true;
    if (this.currentClientAffichage && this.currentClientAffichage.nom && this.currentClientAffichage.prenom
      && this.currentClientAffichage.numero && this.currentClientAffichage.numeroCin && !this.isInvalidNumero && !this.isInvalidNumeroCin
    ) {
      const formData = new FormData();
      
      // Add client data
      const clientDTOJson = JSON.stringify({
        nom: this.currentClientAffichage.nom,
        prenom: this.currentClientAffichage.prenom,
        cinRecto: this.currentClientAffichage.cinRecto,
        cinVerso: this.currentClientAffichage.cinVerso,
        numero: this.currentClientAffichage.numero,
        numeroCin: this.currentClientAffichage.numeroCin,
      });
      formData.append('clientDTO', clientDTOJson);
  
      // Add the image files if they exist
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
  
      // Update existing client
      if (this.currentClientAffichage.id !== undefined) {
        this.clientService.updateClient(this.currentClientAffichage.id, formData).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Client mis à jour avec succès',
            });
            this.displayEditClientModal = false;
            this.fetchData();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la mise à jour du client',
            });
          }
        );
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Veuillez remplir les champs requis',
      });
    }
  }
  
  
}
