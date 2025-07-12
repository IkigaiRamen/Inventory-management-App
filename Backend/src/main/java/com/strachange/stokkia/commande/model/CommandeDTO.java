package com.strachange.stokkia.commande.model;

import com.strachange.stokkia.detailcommande.model.DetailCommandeDTO;
import com.strachange.stokkia.devis.model.Devis;
import com.strachange.stokkia.facture.model.Facture;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class CommandeDTO {

    private Long commandeId;
    private String referenceCommande;
    private BigDecimal prixCommandeHT;
    private BigDecimal prixCommande;
    private LocalDateTime dateCommande;
    private LocalDate dateDebutCommande;
    private LocalDate dateFinCommande;
    private TypeCommande typeCommande;
    private StatutCommande statutCommande ;
    private Sens sens;
    private Long personneId;
    private List<DetailCommandeDTO> detailsCommande;
    private Devis devis;
    private Facture facture;

    public Long getCommandeId() {
        return commandeId;
    }

    public void setCommandeId(Long commandeId) {
        this.commandeId = commandeId;
    }
    public String getReferenceCommande() { return referenceCommande; }
    public void setReferenceCommande(String referenceCommande) { this.referenceCommande = referenceCommande; }

    public BigDecimal getPrixCommandeHT() { return prixCommandeHT; }
    public void setPrixCommandeHT(BigDecimal prixCommandeHT) { this.prixCommandeHT = prixCommandeHT; }

    public BigDecimal getPrixCommande() { return prixCommande; }
    public void setPrixCommande(BigDecimal prixCommande) { this.prixCommande = prixCommande; }

    public LocalDate getDateDebutCommande() { return dateDebutCommande; }
    public void setDateDebutCommande(LocalDate dateDebutCommande) { this.dateDebutCommande = dateDebutCommande; }

    public LocalDate getDateFinCommande() { return dateFinCommande; }
    public void setDateFinCommande(LocalDate dateFinCommande) { this.dateFinCommande = dateFinCommande; }

    public TypeCommande getTypeCommande() { return typeCommande; }
    public void setTypeCommande(TypeCommande typeCommande) { this.typeCommande = typeCommande; }

    public Long getPersonneId() { return personneId; }
    public void setPersonneId(Long personneId) { this.personneId = personneId; }

    public List<DetailCommandeDTO> getDetailsCommande() {
        return detailsCommande;
    }

    public void setDetailsCommande(List<DetailCommandeDTO> detailsCommande) {
        this.detailsCommande = detailsCommande;
    }
    public LocalDateTime getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDateTime dateCommande) {
        this.dateCommande = dateCommande;
    }
    public StatutCommande getStatutCommande() {
        return statutCommande;
    }

    public void setStatutCommande(StatutCommande statutCommande) {
        this.statutCommande = statutCommande;
    }

    public Sens getSens() {
        return sens;
    }

    public void setSens(Sens sens) {
        this.sens = sens;
    }
    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }
    public Facture getFacture() {
        return facture;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }
}
