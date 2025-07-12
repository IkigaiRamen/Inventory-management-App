package com.strachange.stokkia.commandelocation;


import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.TypeCommande;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
public class CommandeLocation extends Commande {
    private LocalDate dateFin;

    public CommandeLocation() {
        this.setTypeCommande(TypeCommande.RENTAL);
    }
}
