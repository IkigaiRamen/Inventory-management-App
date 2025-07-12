package com.strachange.stokkia.commande.model;

import com.strachange.stokkia.facture.model.ModePaiement;
import com.strachange.stokkia.facture.model.StatutPaiement;

import java.time.LocalDate;

public class CommandeAdditionalDetails {

    private String referenceCommande;
    private LocalDate dateDebutCommande;
    private LocalDate dateFinCommande;
    private LocalDate dateExpirationDevis;
    private Long personneId;
    private Sens sens;
    private StatutPaiement statutPaiement;  // New field for payment status
    private ModePaiement modePaiement;      // New field for payment mode

    public LocalDate getDateEcheanceFacture() {
        return dateEcheanceFacture;
    }

    public void setDateEcheanceFacture(LocalDate dateEcheanceFacture) {
        this.dateEcheanceFacture = dateEcheanceFacture;
    }

    private LocalDate dateEcheanceFacture;
    public String getReferenceCommande() {
        return referenceCommande;
    }

    public void setReferenceCommande(String referenceCommande) {
        this.referenceCommande = referenceCommande;
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

    public LocalDate getDateExpirationDevis() {
        return dateExpirationDevis;
    }

    public void setDateExpirationDevis(LocalDate dateExpirationDevis) {
        this.dateExpirationDevis = dateExpirationDevis;
    }

    public Long getPersonneId() {
        return personneId;
    }

    public void setPersonneId(Long personneId) {
        this.personneId = personneId;
    }

    public Sens getSens() {
        return sens;
    }

    public void setSens(Sens sens) {
        this.sens = sens;
    }

    // Getter and Setter for statutPaiement
    public StatutPaiement getStatutPaiement() {
        return statutPaiement;
    }

    public void setStatutPaiement(StatutPaiement statutPaiement) {
        this.statutPaiement = statutPaiement;
    }

    // Getter and Setter for modePaiement
    public ModePaiement getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(ModePaiement modePaiement) {
        this.modePaiement = modePaiement;
    }
}
