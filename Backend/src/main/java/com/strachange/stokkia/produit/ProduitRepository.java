package com.strachange.stokkia.produit;

import com.strachange.stokkia.produit.model.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit,Long> {
    Page<Produit> findByLibelleContainingIgnoreCase(String libelle, Pageable pageable);
    Page<Produit> findByLibelleContainingIgnoreCaseOrBarcodeContainingIgnoreCase(String libelle, String barcode, Pageable pageable);
    Page<Produit> findByCategorieId(Long categorieId, Pageable pageable);
    List<Produit> findByCategorieId(Long categorieId);
    Page<Produit> findByCategorieIdAndLibelleContainingIgnoreCase(Long categorieId, String libelle, Pageable pageable);
    long countByQuantiteDisponibleGreaterThan(int value);
    @Query("SELECT p FROM Produit p ORDER BY (SELECT SUM(d.quantite) FROM DetailCommande d WHERE d.produit = p) DESC")
    List<Produit> findTopSellingProducts(Pageable pageable);
    @Query("SELECT p.prix FROM Produit p")
    List<Float> findAllPrices();
    long countByQuantiteDisponibleLessThan(int value);
    @Query("SELECT SUM(p.quantiteDisponible) FROM Produit p")
    int sumAllQuantiteSold();
    @Query("SELECT p.quantiteDisponible FROM Produit p")
    List<Integer> findAllQuantitiesAvailable();
    @Query("SELECT p.categorie.libelle, COUNT(p) FROM Produit p GROUP BY p.categorie.libelle")
    List<Object[]> countByCategorieLibelleGroupBy();

    // Method to get top selling products by date range (e.g., based on sales quantity or revenue)
    @Query("SELECT d.produit, SUM(d.quantite) FROM DetailCommande d WHERE d.commande.dateCommande BETWEEN :startDate AND :endDate GROUP BY d.produit ORDER BY SUM(d.quantite) DESC")
    Page<Object[]> findTopSellingProductsByDate(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, Pageable pageable);

}