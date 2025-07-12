package com.strachange.stokkia.client;

import com.strachange.stokkia.client.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.function.Function;
import java.util.function.UnaryOperator;

@Repository
public interface ClientRepository  extends JpaRepository<Client, Long> {

}
