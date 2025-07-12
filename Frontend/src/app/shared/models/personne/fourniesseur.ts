
export interface Fournisseur {
    id?: number; // Optional for creation (matches Long id in Java)
    prenom: string;
    nom: string;
    societe: string;
    siren: string; // Added siren field
    numero: string; // Added numero field
    type: string; // Use the TypePersonne enum or type
}
