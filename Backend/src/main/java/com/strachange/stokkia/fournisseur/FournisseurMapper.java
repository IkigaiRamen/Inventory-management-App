package com.strachange.stokkia.fournisseur;

import com.strachange.stokkia.fournisseur.model.Fournisseur;
import com.strachange.stokkia.fournisseur.model.FournisseurDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface FournisseurMapper {

    FournisseurDTO toDTO(Fournisseur fournisseur);
    Fournisseur toEntity(FournisseurDTO fournisseurDTO);
}