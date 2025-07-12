import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Produit } from "../../shared/models/produit/Produit";
import { Commande } from "../../shared/models/commande/commande";

@Injectable({
    providedIn: 'root'
  })
  export class DashboardService {
  
    private apiUrl = `http://localhost:8080/dashboard`; // Adjust based on your API base URL
  
    constructor(private http: HttpClient) {}
  
    getTotalClients(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalClients`);
    }

    getTotalFournisseurs(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalFournisseurs`);
    }

    getProductStats(): Observable<Map<string, number>> {
        return this.http.get<Map<string, number>>(`${this.apiUrl}/productStats`);
    }

    getTopSellingProducts(limit: number = 5): Observable<Produit[]> {
        return this.http.get<Produit[]>(`${this.apiUrl}/topSellingProducts?limit=${limit}`);
    }

    getAverageProductPrice(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/averageProductPrice`);
    }

    getTotalRevenue(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalRevenue`);
    }

    getRecentOrders(limit: number = 5): Observable<Commande[]> {
        return this.http.get<Commande[]>(`${this.apiUrl}/recentOrders?limit=${limit}`);
    }

    getTotalQuantitySold(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/totalQuantitySold`);
    }

    getAverageQuantityAvailable(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/averageQuantityAvailable`);
    }

    getLowStockCount(threshold: number = 10): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/lowStockCount?threshold=${threshold}`);
    }

    getMonthlyRevenueGrowth(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/monthlyRevenueGrowth`);
    }

    getPendingOrdersCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/pending-orders`);
    }

    getNewOrdersCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/new-orders`);
    }

    getOrderStatusStats(): Observable<Map<string, number>> {
        return this.http.get<Map<string, number>>(`${this.apiUrl}/order-status`);
    }

    getProductCategoryStats(): Observable<Map<string, number>> {
        return this.http.get<Map<string, number>>(`${this.apiUrl}/product-category-stats`);
    }

    getTopSellingProductsByDate(limit: number, startDate: string, endDate: string): Observable<Produit[]> {
        return this.http.get<Produit[]>(`${this.apiUrl}/top-selling?limit=${limit}&startDate=${startDate}&endDate=${endDate}`);
    }
}