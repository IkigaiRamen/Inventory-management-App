export interface Facture {
    id: number ;
    numeroFacture: string;
    description: string;
    dateEmission: Date;
    dateEcheance: Date;
    statutPaiement: StatutPaiement;  // You would need to define the StatutPaiement enum
    modePaiement: ModePaiement;      // You would need to define the ModePaiement enum
    totalAmount: number;
    taxAmount: number;

}


export enum StatutPaiement {
    PENDING = 'PENDING',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE'
}

export enum ModePaiement {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    TRANSFER = 'TRANSFER'
}
