
export interface Client {
    id?: number; // Optional for creation (matches Long id in Java)
    prenom: string;
    nom: string;
    type: string; // Use the TypePersonne enum or type
    cinRecto?: string; // Optional field for CIN recto
    cinVerso?: string; // Optional field for CIN verso
    numero?: string; // Optional field for numero
    numeroCin?: string; // Optional field for numeroCin
}
