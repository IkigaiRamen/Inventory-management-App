package com.strachange.stokkia.detailcommande;


import com.strachange.stokkia.detailcommande.model.DetailCommande;
import com.strachange.stokkia.detailcommande.model.DetailCommandeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DetailCommandeMapper {

    @Mapping(source = "produit.id", target = "produitId")
    @Mapping(source = "produit.libelle", target = "produitLibelle")
    @Mapping(source = "produit.imageurl", target = "produitImageUrl")
    @Mapping(source = "produit.prix",target="prixUni")
    @Mapping(source = "produit.prixLoc",target = "prixLoc")
    DetailCommandeDTO detailCommandeToDetailCommandeDTO(DetailCommande detailCommande);

    List<DetailCommandeDTO> detailCommandesToDetailCommandeDTOs(List<DetailCommande> detailCommandes);
}
