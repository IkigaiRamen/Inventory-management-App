package com.strachange.stokkia.client;


import com.strachange.stokkia.client.model.Client;
import com.strachange.stokkia.client.model.ClientDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ClientMapper {

    @Mapping(target = "type", source = "type")
    ClientDTO toDTO(Client client);
    Client toEntity(ClientDTO clientDTO);
}
