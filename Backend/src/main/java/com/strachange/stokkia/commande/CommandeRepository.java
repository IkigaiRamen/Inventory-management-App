package com.strachange.stokkia.commande;

import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.StatutCommande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CommandeRepository  extends JpaRepository<Commande,Long> {
    Page<Commande> findAll(Pageable pageable);
    Page<Commande> findByReferenceCommandeContainingIgnoreCase(String referenceCommande, Pageable pageable);
    @Query("SELECT SUM(c.prixCommande) FROM Commande c")
    double sumTotalRevenue();
    @Query("SELECT c FROM Commande c ORDER BY c.dateCommande DESC")
    List<Commande> findTopByOrderByDateCommandeDesc(Pageable pageable);
    @Query("SELECT SUM(c.prixCommande) FROM Commande c WHERE c.dateCommande >= :previousMonthStart AND c.dateCommande <= :previousMonthEnd")
    Double sumRevenueForPreviousMonth(@Param("previousMonthStart") LocalDateTime previousMonthStart,
                                      @Param("previousMonthEnd") LocalDateTime previousMonthEnd);

    @Query("SELECT SUM(c.prixCommande) FROM Commande c WHERE c.dateCommande >= :lastMonthStart AND c.dateCommande <= :lastMonthEnd")
    Double sumRevenueForLastMonth(@Param("lastMonthStart") LocalDateTime lastMonthStart,
                                  @Param("lastMonthEnd") LocalDateTime lastMonthEnd);
    // Method to count orders by statutCommande
    long countByStatutCommande(StatutCommande statutCommande);
    // Method to count orders placed after a specific date
    long countByDateCommandeAfter(LocalDateTime date);
}
