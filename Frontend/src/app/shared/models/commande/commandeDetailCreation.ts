import { DetailCommande } from "../detail-commande/detail-commande";
import { TypeCommande } from "./commande";

export interface CommandeDetailCreation {
    typeCommande: TypeCommande;
    detailCommandeDTOList: DetailCommande[];
  }