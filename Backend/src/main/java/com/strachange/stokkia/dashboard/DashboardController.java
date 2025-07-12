package com.strachange.stokkia.dashboard;

import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.produit.model.Produit;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public record DashboardController(DashboardService dashboardService) {

    @GetMapping("/totalClients")
    public ResponseEntity<Long> getTotalClients() {
        return ResponseEntity.ok(dashboardService.getTotalClients());
    }

    @GetMapping("/totalFournisseurs")
    public ResponseEntity<Long> getTotalFournisseurs() {
        return ResponseEntity.ok(dashboardService.getTotalFournisseurs());
    }

    @GetMapping("/productStats")
    public ResponseEntity<Map<String, Long>> getProductStats() {
        return ResponseEntity.ok(dashboardService.getProductStats());
    }

    @GetMapping("/topSellingProducts")
    public ResponseEntity<List<Produit>> getTopSellingProducts(@RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(dashboardService.getTopSellingProducts(limit));
    }

    @GetMapping("/averageProductPrice")
    public ResponseEntity<Double> getAverageProductPrice() {
        return ResponseEntity.ok(dashboardService.getAverageProductPrice());
    }

    @GetMapping("/totalRevenue")
    public ResponseEntity<Double> getTotalRevenue() {
        return ResponseEntity.ok(dashboardService.getTotalRevenue());
    }

    @GetMapping("/recentOrders")
    public ResponseEntity<List<Commande>> getRecentOrders(@RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(dashboardService.getRecentOrders(limit));
    }

    @GetMapping("/totalQuantitySold")
    public ResponseEntity<Integer> getTotalQuantitySold() {
        return ResponseEntity.ok(dashboardService.getTotalQuantitySold());
    }

    @GetMapping("/averageQuantityAvailable")
    public ResponseEntity<Double> getAverageQuantityAvailable() {
        return ResponseEntity.ok(dashboardService.getAverageQuantityAvailable());
    }

    @GetMapping("/lowStockCount")
    public ResponseEntity<Long> getLowStockCount(@RequestParam(defaultValue = "10") int threshold) {
        return ResponseEntity.ok(dashboardService.getLowStockCount(threshold));
    }

    @GetMapping("/monthlyRevenueGrowth")
    public ResponseEntity<Double> getMonthlyRevenueGrowth() {
        return ResponseEntity.ok(dashboardService.getMonthlyRevenueGrowth());
    }
    @GetMapping("/pending-orders")
    public ResponseEntity<Long> getPendingOrdersCount() {
        return ResponseEntity.ok(dashboardService.getPendingOrdersCount());
    }
    // Endpoint for New Orders Count
    @GetMapping("/new-orders")
    public ResponseEntity<Long> getNewOrdersCount() {
        return ResponseEntity.ok(dashboardService.getNewOrdersCount());
    }
    // Endpoint for Order Status Stats
    @GetMapping("/order-status")
    public ResponseEntity<Map<String, Long>> getOrderStatusStats() {
        return ResponseEntity.ok(dashboardService.getOrderStatusStats());
    }
    // Endpoint for Product Category Breakdown
    @GetMapping("/product-category-stats")
    public ResponseEntity<Map<String, Long>> getProductCategoryStats() {
        Map<String, Long> stats = dashboardService.getProductCategoryStats();
        return ResponseEntity.ok(stats);
    }
    @GetMapping("/top-selling")
    public ResponseEntity<List<Produit>> getTopSellingProductsByDate(
            @RequestParam int limit,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<Produit> topSellingProducts = dashboardService.getTopSellingProductsByDate(limit, startDate, endDate);
        return ResponseEntity.ok(topSellingProducts);
    }
}

