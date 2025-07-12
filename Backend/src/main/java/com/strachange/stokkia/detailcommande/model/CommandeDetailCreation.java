package com.strachange.stokkia.detailcommande.model;

import com.strachange.stokkia.commande.model.TypeCommande;
import com.strachange.stokkia.produit.model.ProduitDTOCommande;

import java.math.BigDecimal;
import java.util.List;

public class CommandeDetailCreation {

    private TypeCommande typeCommande;
    private List<ProduitDTOCommande> detailCommandeDTOList;


    public List<ProduitDTOCommande> getDetailCommandeDTOList() {
        return detailCommandeDTOList;
    }

    public void setDetailCommandeDTOList(List<ProduitDTOCommande> detailCommandeDTOList) {
        this.detailCommandeDTOList = detailCommandeDTOList;
    }

    public TypeCommande getTypeCommande() {
        return typeCommande;
    }

    public void setTypeCommande(TypeCommande typeCommande) {
        this.typeCommande = typeCommande;
    }

}
