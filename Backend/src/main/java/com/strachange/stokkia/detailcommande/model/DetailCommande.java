package com.strachange.stokkia.detailcommande.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.produit.model.Produit;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "detail_commandes")
public class DetailCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "commande_id")
    @JsonBackReference
    private Commande commande;
    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;
    private int quantite;

    private BigDecimal prixUnitaire;

    private String Commentaire ;

    private BigDecimal remise ;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    public Produit getProduit() {
        return produit;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }


}
