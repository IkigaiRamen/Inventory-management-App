export interface FillAdditionalFieldsRequest {

    referenceCommande: string;
    dateDebutCommande?: Date; // Optional and applicable only for 'Rental' type
    dateFinCommande?: Date; // Optional and applicable only for 'Rental' type
    personneId?: number; // Optional association with Personne
    dateExpirationDevis?:number;
    dateEcheanceFacture?:number;
    statutPaiement?:string;
    modePaiement?:string;
  } 