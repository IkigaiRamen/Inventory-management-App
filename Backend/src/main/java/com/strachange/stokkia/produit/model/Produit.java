package com.strachange.stokkia.produit.model;


import com.strachange.stokkia.categorie.model.Categorie;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;
    private String description;
    private Integer quantiteTotale;
    private Integer quantiteDisponible;
    private String imageurl;
    private Float prix;
    private Float prixLoc;

    @Nullable
    @Column(unique=true)
    private String barcode;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "categorie_id", nullable = false)
    private Categorie categorie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }

    public Integer getQuantiteDisponible() {
        return quantiteDisponible;
    }

    public void setQuantiteDisponible(Integer quantiteDisponible) {
        this.quantiteDisponible = quantiteDisponible;
    }

    public Integer getQuantiteTotale() {
        return quantiteTotale;
    }

    public void setQuantiteTotale(Integer quantiteTotale) {
        this.quantiteTotale = quantiteTotale;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Float getPrix() {
        return prix;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public Float getPrixLoc() {
        return prixLoc;
    }

    public void setPrixLoc(Float prixLoc) {
        this.prixLoc = prixLoc;
    }
    @Nullable
    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(@Nullable String barcode) {
        this.barcode = barcode;
    }

}
