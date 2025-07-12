package com.strachange.stokkia.personne.Model;

import com.strachange.stokkia.personne.TypePersonne;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Personne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This will auto-generate IDs
    private Long id;
    private String prenom;
    private String nom;
    @Nullable
    private String societe;
    private String numero;
    @Nullable
    private String numeroCin;
    @Nullable
    private String cinRecto;
    @Nullable
    private String cinVerso;
    @Nullable
    private String siren;

    @Enumerated(EnumType.STRING)
    private TypePersonne type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public TypePersonne getType() {
        return type;
    }

    public void setType(TypePersonne type) {
        this.type = type;
    }


   @Nullable
   public String getSociete() {
        return societe;
    }

    public void setSociete(@Nullable String societe) {
        this.societe = societe;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    @Nullable
    public String getNumeroCin() {
        return numeroCin;
    }

    public void setNumeroCin(@Nullable String numeroCin) {
        this.numeroCin = numeroCin;
    }

    @Nullable
    public String getCinRecto() {
        return cinRecto;
    }

    public void setCinRecto(@Nullable String cinRecto) {
        this.cinRecto = cinRecto;
    }

    @Nullable
    public String getCinVerso() {
        return cinVerso;
    }

    public void setCinVerso(@Nullable String cinVerso) {
        this.cinVerso = cinVerso;
    }

    @Nullable
    public String getSiren() {
        return siren;
    }

    public void setSiren(@Nullable String siren) {
        this.siren = siren;
    }
}
