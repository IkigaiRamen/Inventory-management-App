package com.strachange.stokkia.commandevente;


import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.TypeCommande;
import jakarta.persistence.Entity;

@Entity
public class CommandeVente extends Commande {

    public CommandeVente() {
        this.setTypeCommande(TypeCommande.SALE);
    }
}
