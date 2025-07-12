import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Produit } from '../../shared/models/produit/Produit';
import { Commande, StatutCommande } from '../../shared/models/commande/commande';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  totalClients?: number;
  totalFournisseurs?: number;
  topSellingProducts: Produit[] = [];

  averageProductPrice?: number;
  totalRevenue?: number;
  recentOrders: Commande[] = [];
  totalQuantitySold?: number;
  averageQuantityAvailable?: number;
  lowStockCount?: number;
  monthlyRevenueGrowth?: number;
  pendingOrdersCount?: number;
  newOrdersCount?: number;
  clientSupplierChartData: any;
  // Données pour les graphiques
  productCategoryChartData: any;
  orderStatusChartData: any;














  // Options pour les graphiques
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as 'top' | 'center' | 'left' | 'right' | 'bottom' | 'chartArea',
      },
      datalabels: {
        color: '#ffffff',
        formatter: (value: number) => value,
        anchor: 'center',
        align: 'center',
        font: {
          weight: 'bold',
        },
      } as any, // Explicitly casting datalabels to 'any' as a workaround
    },
  };
  

  constructor(private dashboardService: DashboardService) {}
  statutCommandeTranslations: { [key: string]: string } = {
    'START': 'Démarré',
    'IN_PROGRESS': 'En Cours',
    'VALIDATED': 'Validé',
    'COMPLETED': 'Terminé',
    'CANCELLED': 'Annulé'
  };
  translateStatus(statut: string): string {
    return this.statutCommandeTranslations[statut] || statut;
  }  
  ngOnInit(): void {
    // Fetching data from the DashboardService
    this.dashboardService.getTotalClients().subscribe(data => {
      this.totalClients = data;
      this.updateClientSupplierChart();
    });

    this.dashboardService.getTotalFournisseurs().subscribe(data => {
      this.totalFournisseurs = data;
      this.updateClientSupplierChart();
    });

    // Fetching product statistics and preparing for Pie chart
    this.dashboardService.getProductStats().subscribe(data => {
      this.productCategoryChartData = this.createPieChartData(data);
    });

    // Fetching top selling products and preparing for Bar chart
    this.dashboardService.getTopSellingProducts().subscribe(data => {
      this.topSellingProducts = data;
      this.createTopSellingBarChart();  // Prepare bar chart for top selling products
    });

    // Fetching average product price and other stats
    this.dashboardService.getAverageProductPrice().subscribe(data => {
      this.averageProductPrice = data;
      this.createProductStatsChart();  // Create line chart for price and quantity
    });

    // Fetching additional stats
    this.dashboardService.getTotalRevenue().subscribe(data => {
      this.totalRevenue = data;
    });





    this.dashboardService.getTotalQuantitySold().subscribe(data => {
      this.totalQuantitySold = data;
    });

    this.dashboardService.getAverageQuantityAvailable().subscribe(data => {
      this.averageQuantityAvailable = data;
    });

    this.dashboardService.getLowStockCount().subscribe(data => {
      this.lowStockCount = data;
    });

    this.dashboardService.getMonthlyRevenueGrowth().subscribe(data => {
      this.monthlyRevenueGrowth = data;
    });

    this.dashboardService.getPendingOrdersCount().subscribe(data => {
      this.pendingOrdersCount = data;
    });

    this.dashboardService.getNewOrdersCount().subscribe(data => {
      this.newOrdersCount = data;
    });

    this.dashboardService.getOrderStatusStats().subscribe(data => {
      this.orderStatusChartData = this.createBarChartData(data);
    });
    this.dashboardService.getRecentOrders().subscribe(data => {
      this.recentOrders = data;
    });
  }

  createPieChartData(data: any) {
    let labels: string[] = [];
    let values: number[] = [];
  
    if (data instanceof Map) {
      labels = Array.from(data.keys());
      values = Array.from(data.values());
    } else if (typeof data === 'object') {
      labels = Object.keys(data);
      values = Object.values(data);
    } else {
      console.error('Format de données inattendu:', data);
    }
  
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043', '#26A69A']
        }
      ]
    };
  }

  updateClientSupplierChart() {
    if (this.totalClients !== undefined && this.totalFournisseurs !== undefined) {
      this.clientSupplierChartData = {
        labels: ['Clients', 'Fournisseurs'],
        datasets: [
          {
            data: [this.totalClients, this.totalFournisseurs],
            backgroundColor: ['#42A5F5', '#66BB6A']
          }
        ]
      };
    }
  }

  createBarChartData(data: any) {
    // Map to translate English labels to French
    const statutCommandeTranslations: { [key in StatutCommande]: string } = {
      [StatutCommande.START]: 'Démarré',
      [StatutCommande.IN_PROGRESS]: 'En Cours',
      [StatutCommande.VALIDATED]: 'Validé',
      [StatutCommande.COMPLETED]: 'Terminé',
      [StatutCommande.CANCELLED]: 'Annulé'
    };
  
    let labels: string[] = [];
    let values: number[] = [];
  
    if (data instanceof Map) {
      labels = Array.from(data.keys()).map(key => statutCommandeTranslations[key as StatutCommande] || key);
      values = Array.from(data.values());
    } else if (typeof data === 'object') {
      labels = Object.keys(data).map(key => statutCommandeTranslations[key as StatutCommande] || key);
      values = Object.values(data);
    } else {
      console.error('Format de données inattendu:', data);
    }
  
    return {
      labels,
      datasets: [
        {
          label: 'Statut des Commandes',
          data: values,
          backgroundColor: '#42A5F5'
        }
      ]
    };
  }

  createProductStatsChart(): void {
    const ctx = <HTMLCanvasElement>document.getElementById('productStatsChart');
    ctx.height = 300; // Définir explicitement la hauteur
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Prix Moyen', 'Quantité Totale Vendue'],
        datasets: [
          {
            label: 'Statistiques des Produits',
            data: [this.averageProductPrice ?? 0, this.totalQuantitySold ?? 0],
            borderColor: '#42A5F5',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1, // Contrôler le ratio d'aspect
        plugins: {
          legend: {
            position: 'top'
          },
          datalabels: {
            color: 'white', // Changer la couleur en blanc
            formatter: (value: number) => value,
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    });
  }
  
  createTopSellingBarChart(): void {
    // Get the canvas element
    const ctx = <HTMLCanvasElement>document.getElementById('topSellingChart');
    ctx.height = 300; // Set height explicitly
  
    // Prepare dynamic data
    const labels = this.topSellingProducts.map(product => product.libelle); // Get product names
    const quantities = this.topSellingProducts.map(product => product.quantiteTotale); // Get sold quantities
    const revenues = this.topSellingProducts.map(product => product.prix * product.quantiteTotale); // Calculate revenue (price * quantity sold)
  
    // Create the chart with dynamic data
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Dynamic labels
        datasets: [
          {
            label: 'Quantité Vendue', // Label for quantities
            data: quantities, // Dynamic data for quantities
            backgroundColor: '#66BB6A',
            borderColor: '#388E3C',
            borderWidth: 1
          },
          {
            label: 'Revenu (TND)', // Label for revenue
            data: revenues, // Dynamic data for revenue
            backgroundColor: '#FF7043',
            borderColor: '#D32F2F',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1, // Control aspect ratio
        plugins: {
          legend: {
            position: 'top'
          },
          datalabels: {
            color: 'white', // Change color to white
            formatter: (value: number) => value,
            anchor: 'end',
            align: 'top',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    });
  }
  
  

}