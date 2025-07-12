package com.strachange.stokkia.personne;

import com.strachange.stokkia.personne.Model.Personne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PersonneRepository extends JpaRepository<Personne,Long> {
}
