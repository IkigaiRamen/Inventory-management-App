import { Categorie } from "../categorie/categorie";

export interface Produit {
    id: number;
    libelle : string;
    description : string;
    prix: number;
    quantiteTotale : number;
    quantiteDisponible : number;
    imageurl : string;
    categorieId : number;
    categorie : Categorie;
    categorieLibelle : string;
    prixLoc: number;
    barcode?: string;
  }