import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Commande } from '../../../shared/models/commande/commande';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from '../../PanierComponent/commande.Service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnInit {
  commande: any;
  progressBarWidth: string = '0%';  // Default progress bar width
  progressBarValue: number = 0;  // Default progress bar value
  progressBarClass: string = ''; // Class to determine progress bar color
  progressBarLabel: string = '';
  statusClass: { [key: string]: boolean } = {};  // To store active status

  // Define translation maps for StatutPaiement and ModePaiement
  statutPaiementTranslation = {
    'PENDING': 'En Attente',
    'PAID': 'Payé',
    'OVERDUE': 'En Retard'
  };

  modePaiementTranslation = {
    'CASH': 'Espèces',
    'CREDIT_CARD': 'Carte de Crédit',
    'BANK_TRANSFER': 'Virement Bancaire'
  };

  constructor(private route: ActivatedRoute, private commandeService: CommandeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.commandeService.getCommandeById(id).subscribe((response) => {
        console.log("this is commande", response);
        this.commande = response.data;
        this.updateProgressBar();
        this.checkStatus();
      });
    }
  }

  // Update the progress bar width based on the commande status
  updateProgressBar(): void {
    const status = this.commande.statutCommande;
    console.log('Current status:', status);
    if (status === 'START') {
      this.progressBarValue = 25;
      this.progressBarClass = 'progress-bar-start';
      this.progressBarLabel = '25%';
    } else if (status === 'IN_PROGRESS') {
      this.progressBarValue = 50;
      this.progressBarClass = 'progress-bar-in-progress';
      this.progressBarLabel = '50%';
    } else if (status === 'VALIDATED') {
      this.progressBarValue = 75;
      this.progressBarClass = 'progress-bar-validated';
      this.progressBarLabel = '75%';
    } else if (status === 'COMPLETED') {
      this.progressBarValue = 100;
      this.progressBarClass = 'progress-bar-completed';
      this.progressBarLabel = '100%';
    } else if (status === 'CANCELLED') {
      this.progressBarValue = 100; // Ensure the bar is full
      this.progressBarClass = 'progress-bar-cancelled';
      this.progressBarLabel = 'Cancelled'; // Custom label for CANCELLED
    }
    console.log('Progress bar value:', this.progressBarValue);
    this.cdr.detectChanges();
  }

  // Set the active status class based on the current status of the commande
  checkStatus(): void {
    const statusOrder = ['START', 'IN_PROGRESS', 'VALIDATED', 'COMPLETED', 'CANCELLED'];
    const currentStatusIndex = statusOrder.indexOf(this.commande.statutCommande);
    console.log('Status class being assigned:', currentStatusIndex);

    this.statusClass = {
      'START': currentStatusIndex >= 0,
      'IN_PROGRESS': currentStatusIndex >= 1,
      'VALIDATED': currentStatusIndex >= 2,
      'COMPLETED': currentStatusIndex >= 3,
      'CANCELLED': currentStatusIndex >= 4,
    };
  }

 // Method to get translated statutPaiement
getStatutPaiementTranslation(status: string): string {
  return this.statutPaiementTranslation[status as keyof typeof this.statutPaiementTranslation] || status;
}

// Method to get translated modePaiement
getModePaiementTranslation(mode: string): string {
  return this.modePaiementTranslation[mode as keyof typeof this.modePaiementTranslation] || mode;
}
}
