package com.strachange.stokkia.commande;

import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.CommandeDTO;
import com.strachange.stokkia.commandeachat.CommandeAchat;
import com.strachange.stokkia.commandelocation.CommandeLocation;
import com.strachange.stokkia.commandevente.CommandeVente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;



@Mapper(componentModel = "spring")
public interface CommandeMapper {


    @Mapping(source = "personne.id", target = "personneId")
    @Mapping(source = "id", target = "commandeId")
    @Mapping(source = "dateCommande", target = "dateCommande")
    @Mapping(source = "statutCommande", target="statutCommande")
    @Mapping(source = "sens", target = "sens")
    @Mapping(source = "facture", target = "facture")
    CommandeDTO commandeToCommandeDTO(Commande commande);

    @Mapping(source = "personne.id", target = "personneId")
    CommandeDTO commandeAchatToCommandeDTO(CommandeAchat commandeAchat);

    @Mapping(source = "personne.id", target = "personneId")
    CommandeDTO commandeVenteToCommandeDTO(CommandeVente commandeVente);
    @Mapping(source = "personne.id", target = "personneId")
    CommandeDTO commandeLocationToCommandeDTO(CommandeLocation commandeLocation);

    default  CommandeDTO getCommandeDTOFromCommande(Commande commande) {
        if (commande instanceof CommandeAchat) {
            return this.commandeAchatToCommandeDTO((CommandeAchat) commande);
        } else if (commande instanceof CommandeVente) {
            return this.commandeVenteToCommandeDTO((CommandeVente) commande);
        } else if (commande instanceof CommandeLocation) {
            return this.commandeLocationToCommandeDTO((CommandeLocation) commande);
        } else {
            throw new RuntimeException("Type de commande non pris en charge.");
        }
    }


}
