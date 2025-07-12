import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../../shared/models/personne/fourniesseur';
import { CommandeService } from '../../PanierComponent/commande.Service';
import { FournisseurService } from '../../personneComponents/personne/fournisseurServices';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../shared/models/config/api-response';
import { Commande } from '../../../shared/models/commande/commande';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrl: './facture-details.component.scss'
})
export class FactureDetailsComponent implements OnInit {
  commande: Commande | null = null;  // Store the fetched commande details
  loading: boolean = true;           // Loading flag to show a loading spinner
  commandeId: number = 0;           // Default value, will be updated based on the route
  errorMessage: string = '';        // Error message to display if the request fails
  fournisseur: Fournisseur | null = null;     // Store client details
  constructor(
    private commandeService: CommandeService,
    private fournisseurService: FournisseurService,  // Assuming you have a ClientService for fetching clients
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Fetch the 'commandeId' from the route parameters and update the component state
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');  // Get the 'id' from the URL
      console.log('Route ID:', id); // Log the ID to verify it is being extracted
      if (id) {
        this.commandeId = +id;  // Convert to number
        console.log('Commande ID:', this.commandeId); // Log the commandeId
        this.getCommandeDetails(this.commandeId);  // Fetch the details
      } else {
        console.log('No ID found in the route parameters');
      }
    });
  }

  getCommandeDetails(commandeId: number): void {
    this.loading = true;  // Show loading spinner
    console.log('Fetching details for commandeId:', commandeId); // Log the ID before API call

    this.commandeService.getCommandeById(commandeId).subscribe(
      (response: ApiResponse<Commande>) => {
        console.log('API response:', response); // Log the API response for debugging
        if (response.data) {
          this.commande = response.data;  // Access the data field of ApiResponse
          this.loading = false;  // Hide loading spinner
          console.log('Commande details:', this.commande); // Log the received commande details

          // After fetching the commande details, get the client details
          if (this.commande.personneId) {
            this.getClientDetails(this.commande.personneId);  // Fetch client based on personneId
          } else {
            this.loading = false;  // Hide loading spinner if no personneId is available
            console.log('No personneId found in commande');
          }

        } else {
          this.loading = false;  // Hide loading spinner
          this.errorMessage = 'No data found for the provided commande ID.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMessage
          });
          console.log(this.errorMessage); // Log the error message if no data
        }
      },
      (error) => {
        console.error('Error fetching commande details:', error);
        this.loading = false;  // Hide loading spinner
        this.errorMessage = 'Error fetching commande details.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMessage
        });
      }
    );
  }

  getClientDetails(personneId: number): void {
    console.log('Fetching client details for personneId:', personneId);
    this.fournisseurService.getFournisseurById(personneId).subscribe(
      (response: ApiResponse<Fournisseur>) => {
        console.log('Client details:', response);
        if (response.data) {
          this.fournisseur = response.data;  // Assign the client data
        } else {
          console.log('No client found for the provided personneId');
          this.errorMessage = 'No client found for the provided personneId.';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.errorMessage
          });
        }
      },
      (error: any) => {
        console.error('Error fetching client details:', error);
        this.errorMessage = 'Error fetching client details.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorMessage
        });
      }
    );
  }
  backToOrders(): void {
    this.router.navigate(['/order-history']);  // Adjust based on your routing setup
  }

}
