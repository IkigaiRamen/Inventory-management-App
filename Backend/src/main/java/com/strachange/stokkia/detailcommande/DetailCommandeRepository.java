package com.strachange.stokkia.detailcommande;


import com.strachange.stokkia.detailcommande.model.DetailCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailCommandeRepository  extends JpaRepository<DetailCommande,Long> {
    }
