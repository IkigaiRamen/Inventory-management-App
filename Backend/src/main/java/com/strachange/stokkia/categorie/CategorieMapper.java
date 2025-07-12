package com.strachange.stokkia.categorie;

import com.strachange.stokkia.categorie.model.Categorie;
import com.strachange.stokkia.categorie.model.CategorieDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategorieMapper {

    Categorie categorieDTOToDCategorie(CategorieDTO categorieDTO);
    CategorieDTO categorieTCategorieDTO(Categorie categorie);
    List<CategorieDTO> categorieListToCategorieDTOList(List<Categorie> categorieList);
}