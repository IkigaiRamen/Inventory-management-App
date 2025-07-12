package com.strachange.stokkia.client.model;

import com.strachange.stokkia.personne.Model.Personne;
import com.strachange.stokkia.personne.TypePersonne;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "clients")
public class Client extends Personne {

    public Client() {
        super();
    this.setType(TypePersonne.CUSTOMER);
    }
}