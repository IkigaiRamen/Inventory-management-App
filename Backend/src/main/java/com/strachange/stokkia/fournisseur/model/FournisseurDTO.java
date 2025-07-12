package com.strachange.stokkia.fournisseur.model;

import com.strachange.stokkia.personne.TypePersonne;

public class FournisseurDTO {

    private Long id;
    private String prenom;
    private String nom;
    private String societe;
    private String siren;

    private String numero;


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

    public String getSociete() {
        return societe;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }

    public TypePersonne getType() {
        return type;
    }

    public void setType(TypePersonne type) {
        this.type = type;
    }

    public String getSiren() {
        return siren;
    }

    public void setSiren(String siren) {
        this.siren = siren;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
