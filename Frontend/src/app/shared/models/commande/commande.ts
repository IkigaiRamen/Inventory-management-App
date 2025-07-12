import { DetailCommande } from "../detail-commande/detail-commande";
import { Devis } from "../Devis/devis";
import { Facture } from "../facture/facture";
export interface Commande {
    commandeId: number;
    referenceCommande: string;
    prixCommandeHT: number;
    prixCommande: number;
    dateDebutCommande: Date;
    dateFinCommande: Date;
    dateCommande : Date;
    sens: Sens;
    typeCommande: TypeCommande;
    personneId: number;
    statutCommande?: StatutCommande;
    detailsCommande?: DetailCommande[];
    devis?:Devis;
    facture?:Facture;
  }
  export enum Sens {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT'
  }
  
  export enum StatutCommande {
    START = 'START',
    IN_PROGRESS = 'IN_PROGRESS',
    VALIDATED = 'VALIDATED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export enum TypeCommande {
    PURCHASE = 'PURCHASE',
    SALE = 'SALE',
    RENTAL = 'RENTAL'
  }