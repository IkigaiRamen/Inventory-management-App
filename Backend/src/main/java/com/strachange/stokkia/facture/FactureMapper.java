package com.strachange.stokkia.facture;

import com.strachange.stokkia.facture.model.Facture;
import com.strachange.stokkia.facture.model.FactureDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FactureMapper {
    FactureDTO facturetoFactureDTO(Facture facture);

    Facture factureDTOtoFacture(FactureDTO factureDTO);
}
