package com.strachange.stokkia.detailcommande.model;

import java.math.BigDecimal;

public class DetailCommandeDTO {
    private Long id;
    private Long produitId;
    private String produitLibelle;
    private String produitImageUrl;
    private int quantite;
    private BigDecimal prixUnitaire;

    private Float prixLoc;
    private String commentaire;
    private BigDecimal remise;
    private Float prixUni;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProduitId() {
        return produitId;
    }

    public void setProduitId(Long produitId) {
        this.produitId = produitId;
    }

    public String getProduitLibelle() {
        return produitLibelle;
    }

    public void setProduitLibelle(String produitLibelle) {
        this.produitLibelle = produitLibelle;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(BigDecimal prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public BigDecimal getRemise() {
        return remise;
    }

    public void setRemise(BigDecimal remise) {
        this.remise = remise;
    }
    public String getProduitImageUrl() {
        return produitImageUrl;
    }

    public void setProduitImageUrl(String produitImageUrl) {
        this.produitImageUrl = produitImageUrl;
    }
    public Float getPrixUni() {
        return prixUni;
    }

    public void setPrixUni(Float prixUni) {
        this.prixUni = prixUni;
    }

    public Float getPrixLoc() {
        return prixLoc;
    }

    public void setPrixLoc(Float prixLoc) {
        this.prixLoc = prixLoc;
    }
}
