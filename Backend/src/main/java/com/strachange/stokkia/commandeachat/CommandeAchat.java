package com.strachange.stokkia.commandeachat;


import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.TypeCommande;
import jakarta.persistence.Entity;

@Entity
public class CommandeAchat extends Commande {

    public CommandeAchat() {
        this.setTypeCommande(TypeCommande.PURCHASE);
    }
}
