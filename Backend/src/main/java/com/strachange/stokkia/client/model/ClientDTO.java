package com.strachange.stokkia.client.model;

import com.strachange.stokkia.personne.TypePersonne;

public class ClientDTO {
    private Long id;
    private String prenom;
    private String nom;

    private String cinRecto;
    private String cinVerso;
    private String numero;
    private String numeroCin;

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

    public String getCinRecto() {
        return cinRecto;
    }

    public void setCinRecto(String cinRecto) {
        this.cinRecto = cinRecto;
    }

    public String getCinVerso() {
        return cinVerso;
    }

    public void setCinVerso(String cinVerso) {
        this.cinVerso = cinVerso;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getNumeroCin() {
        return numeroCin;
    }

    public void setNumeroCin(String numeroCin) {
        this.numeroCin = numeroCin;
    }
}
