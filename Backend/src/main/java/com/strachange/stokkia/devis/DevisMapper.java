package com.strachange.stokkia.devis;

import com.strachange.stokkia.devis.model.Devis;
import com.strachange.stokkia.devis.model.DevisDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DevisMapper {
    DevisDTO toDevisDTO(Devis devis);

    Devis toDevis(DevisDTO devisDTO);
}
