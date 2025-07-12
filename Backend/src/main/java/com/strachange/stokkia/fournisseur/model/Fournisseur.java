package com.strachange.stokkia.fournisseur.model;


import com.strachange.stokkia.personne.Model.Personne;
import com.strachange.stokkia.personne.TypePersonne;
import jakarta.persistence.Entity;

@Entity
public class Fournisseur extends Personne {

    public Fournisseur() {
        super();
        this.setType(TypePersonne.SUPPLIER);
    }
}
