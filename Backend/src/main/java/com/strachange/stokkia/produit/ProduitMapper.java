package com.strachange.stokkia.produit;

import com.strachange.stokkia.produit.model.Produit;
import com.strachange.stokkia.produit.model.ProduitDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProduitMapper {

    @Mapping(source = "categorie.id", target = "categorieId")
    @Mapping(source = "categorie.libelle", target = "categorieLibelle")
    ProduitDTO produitToProduitDTO(Produit produit);
    Produit produitDTOToproduit(ProduitDTO produitDTO);
    List<Produit> produitDTOListToProduitList(List<ProduitDTO> produitDTOList);
    List<ProduitDTO> produitListToProduitDTOList(List<Produit> produitList);
}
