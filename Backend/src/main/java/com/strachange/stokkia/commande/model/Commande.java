package com.strachange.stokkia.commande.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.strachange.stokkia.detailcommande.model.DetailCommande;
import com.strachange.stokkia.devis.model.Devis;
import com.strachange.stokkia.facture.model.Facture;
import com.strachange.stokkia.personne.Model.Personne;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String referenceCommande ;
    private BigDecimal prixCommandeHT ;
    private BigDecimal prixCommande;
    private LocalDate dateDebutCommande;
    private LocalDate dateFinCommande;
    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    private Sens sens;
    @Enumerated(EnumType.STRING)
    private TypeCommande typeCommande;
    @Enumerated(EnumType.STRING)
    private StatutCommande statutCommande ;
    @ManyToOne
    @JoinColumn(name = "personne_id")
    private Personne personne;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<DetailCommande> detailsCommande;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "facture_id")
    private Facture facture;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "devis_id")
    private Devis devis;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferenceCommande() {
        return referenceCommande;
    }

    public void setReferenceCommande(String referenceCommande) {
        this.referenceCommande = referenceCommande;
    }

    public Sens getSens() {
        return sens;
    }

    public void setSens(Sens sens) {
        this.sens = sens;
    }

    public BigDecimal getPrixCommandeHT() {
        return prixCommandeHT;
    }

    public void setPrixCommandeHT(BigDecimal prixCommandeHT) {
        this.prixCommandeHT = prixCommandeHT;
    }

    public BigDecimal getPrixCommande() {
        return prixCommande;
    }

    public void setPrixCommande(BigDecimal prixCommande) {
        this.prixCommande = prixCommande;
    }

    public TypeCommande getTypeCommande() {
        return typeCommande;
    }

    public void setTypeCommande(TypeCommande typeCommande) {
        this.typeCommande = typeCommande;
    }

    public StatutCommande getStatutCommande() {
        return statutCommande;
    }

    public void setStatutCommande(StatutCommande statutCommande) {
        this.statutCommande = statutCommande;
    }

    public LocalDate getDateDebutCommande() {
        return dateDebutCommande;
    }

    public void setDateDebutCommande(LocalDate dateDebutCommande) {
        this.dateDebutCommande = dateDebutCommande;
    }

    public LocalDate getDateFinCommande() {
        return dateFinCommande;
    }

    public void setDateFinCommande(LocalDate dateFinCommande) {
        this.dateFinCommande = dateFinCommande;
    }

    public LocalDateTime getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDateTime dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Personne getPersonne() {
        return personne;
    }

    public void setPersonne(Personne personne) {
        this.personne = personne;
    }

    public List<DetailCommande> getDetailsCommande() {
        return detailsCommande;
    }

    public void setDetailsCommande(List<DetailCommande> detailsCommande) {
        this.detailsCommande = detailsCommande;
    }

    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }
    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }
}