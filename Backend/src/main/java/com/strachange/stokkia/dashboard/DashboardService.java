package com.strachange.stokkia.dashboard;

import com.strachange.stokkia.client.ClientRepository;
import com.strachange.stokkia.commande.CommandeRepository;
import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.StatutCommande;
import com.strachange.stokkia.fournisseur.FournisseurRepository;
import com.strachange.stokkia.produit.ProduitRepository;
import com.strachange.stokkia.produit.model.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final CommandeRepository commandeRepository;
    private final ClientRepository clientRepository;

    private final FournisseurRepository fournisseurRepository;

    private final ProduitRepository produitRepository;

    public DashboardService(CommandeRepository commandeRepository, ClientRepository clientRepository,
                            FournisseurRepository fournisseurRepository, ProduitRepository produitRepository) {
        this.commandeRepository = commandeRepository;
        this.clientRepository = clientRepository;
        this.fournisseurRepository = fournisseurRepository;
        this.produitRepository = produitRepository;
    }

    // Total number of clients
    public long getTotalClients() {
        return clientRepository.count();
    }

    // Total number of suppliers
    public long getTotalFournisseurs() {
        return fournisseurRepository.count();
    }

    // Total products and those currently available
    public Map<String, Long> getProductStats() {
        long totalProducts = produitRepository.count();
        long availableProducts = produitRepository.countByQuantiteDisponibleGreaterThan(0);
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalProducts", totalProducts);
        stats.put("availableProducts", availableProducts);
        return stats;
    }

    // Retrieve top products by quantity sold (in detail command)
    public List<Produit> getTopSellingProducts(int limit) {
        return produitRepository.findTopSellingProducts(PageRequest.of(0, limit));
    }

    // Calculate average price of products
    public double getAverageProductPrice() {
        List<Float> prices = produitRepository.findAllPrices();
        return prices.stream()
                .mapToDouble(Float::doubleValue)
                .average()
                .orElse(0.0);
    }
    // Total revenue from all orders
    public double getTotalRevenue() {
        return commandeRepository.sumTotalRevenue();
    }

    // Recent orders - get last 5 orders
    public List<Commande> getRecentOrders(int limit) {
        return commandeRepository.findTopByOrderByDateCommandeDesc(PageRequest.of(0, limit));
    }

    // Total quantity sold across all products
    public int getTotalQuantitySold() {
        return produitRepository.sumAllQuantiteSold();
    }

    // Average quantity available per product
    public double getAverageQuantityAvailable() {
        List<Integer> quantities = produitRepository.findAllQuantitiesAvailable();
        return quantities.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);
    }

    // Count of low stock products (less than specified threshold)
    public long getLowStockCount(int threshold) {
        return produitRepository.countByQuantiteDisponibleLessThan(threshold);
    }

    // Revenue growth percentage (compared to previous month)
    public double getMonthlyRevenueGrowth() {
        LocalDate now = LocalDate.now();
        YearMonth currentMonth = YearMonth.from(now);
        YearMonth lastMonth = currentMonth.minusMonths(1);
        YearMonth previousMonth = currentMonth.minusMonths(2);

        LocalDateTime lastMonthStart = lastMonth.atDay(1).atStartOfDay();
        LocalDateTime lastMonthEnd = lastMonth.atEndOfMonth().atTime(23, 59, 59);
        LocalDateTime previousMonthStart = previousMonth.atDay(1).atStartOfDay();
        LocalDateTime previousMonthEnd = previousMonth.atEndOfMonth().atTime(23, 59, 59);

        Double lastMonthRevenue = commandeRepository.sumRevenueForLastMonth(lastMonthStart, lastMonthEnd);
        Double previousMonthRevenue = commandeRepository.sumRevenueForPreviousMonth(previousMonthStart, previousMonthEnd);

        lastMonthRevenue = (lastMonthRevenue != null) ? lastMonthRevenue : 0.0;
        previousMonthRevenue = (previousMonthRevenue != null) ? previousMonthRevenue : 0.0;

        if (previousMonthRevenue > 0) {
            return ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
        }
        return 0.0;
    }

    // Product Categories Breakdown
    public Map<String, Long> getProductCategoryStats() {
        List<Object[]> results = produitRepository.countByCategorieLibelleGroupBy();
        Map<String, Long> categoryStats = new HashMap<>();

        for (Object[] result : results) {
            String category = (String) result[0];
            Long count = (Long) result[1];
            categoryStats.put(category, count);
        }

        return categoryStats;
    }
    // Orders Status Overview (e.g. Pending, Delivered, etc.)
    public Map<String, Long> getOrderStatusStats() {
        Map<String, Long> orderStatusStats = new HashMap<>();
        for (StatutCommande statut : StatutCommande.values()) {
            orderStatusStats.put(statut.name(), commandeRepository.countByStatutCommande(statut));
        }
        return orderStatusStats;
    }
    // New Orders in the last 24 hours
    public long getNewOrdersCount() {
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        return commandeRepository.countByDateCommandeAfter(twentyFourHoursAgo);
    }

    // Top 3 Selling Products
    public List<Produit> getTopSellingProductsByDate(int limit, LocalDate startDate, LocalDate endDate) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<Object[]> resultPage = produitRepository.findTopSellingProductsByDate(startDate, endDate, pageable);
        List<Produit> produits = new ArrayList<>();
        for (Object[] result : resultPage.getContent()) {
            Produit produit = (Produit) result[0];
            produits.add(produit);
        }
        return produits;
    }
    // Pending Orders Count
    public long getPendingOrdersCount() {
        return commandeRepository.countByStatutCommande(StatutCommande.IN_PROGRESS);
    }
}
