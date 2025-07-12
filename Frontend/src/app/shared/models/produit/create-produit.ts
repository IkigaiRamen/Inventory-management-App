export interface CreateProduit {
  libelle : string;
  description : string;
  prix :number;
  quantiteTotale : number;
  quantiteDisponible : number;
  imageurl : string;
  categorieId : number;
  prixLoc: number;
  barcode?: string;
}