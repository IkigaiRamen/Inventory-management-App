export interface Devis {
    id: number;
    numeroDevis: string;
    dateCreation: Date;
    dateExpiration: Date;
    totalAmount: number;
    taxAmount: number;
}