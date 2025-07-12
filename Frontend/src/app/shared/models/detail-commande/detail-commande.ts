export interface DetailCommande {
    id?: number;
    produitId: number;
    produitLibelle?: string;
    quantite: number;
    prixUnitaire: number;
    commentaire?: string;
    remise?: number;
    produitImageUrl?: string;
    prixUni?:number;
    prixLoc:number;
  }