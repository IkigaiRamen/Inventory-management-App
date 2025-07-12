import { DetailCommande } from "../detail-commande/detail-commande";
import { Sens, TypeCommande } from "./commande";

export interface CreateCommande {
    commandeId: number;
    referenceCommande: string;
    prixCommandeHT: number;
    prixCommande: number;
    dateDebutCommande: Date;
    dateFinCommande: Date;
    sens: Sens;
    typeCommande: TypeCommande;
    personneId: number;
    detailsCommande?: DetailCommande[];
}