import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })
  export class BreadcrumbService {
    private baseBreadcrumbs: MenuItem[] = [
      { label: 'Accueil', icon: 'pi pi-home', routerLink: '/accueil' }
    ];
  
    private breadcrumbMap: { [key: string]: string } = {
      'categories': 'Créer une catégorie',
      'categories/list': 'Catégories',
      'produits': 'Produits',
      'produits/list': 'Liste des produits',
      'ordre/history': 'Historique des commandes',
      'order-summary': 'Récapitulatif de la commande',
      'facture': 'Détails de la facture',
      'devis': 'Détails du devis',
      'order-details': 'Passer à la caisse',
      'panier': 'Panier',
      'personne': 'Personnes',
      'personne/list': 'Liste des personnes',
      'chart': 'Graphiques'
    };
  
    private breadcrumbs: MenuItem[] = [...this.baseBreadcrumbs];
  
    getBreadcrumbs(): MenuItem[] {
      return this.breadcrumbs;
    }
  
    addBreadcrumb(route: string, resetToIndex: number | null = null) {
      // Si resetToIndex est passé, coupe les breadcrumbs à partir de cet index
      if (resetToIndex !== null) {
        this.breadcrumbs = this.breadcrumbs.slice(0, resetToIndex + 1);
      }
  
      // Divise la route en parties
      const routeParts = route.split('/');
      let path = '';
  
      // Ajoute chaque partie de la route aux breadcrumbs
      routeParts.forEach((part) => {
        path = path ? `${path}/${part}` : part;
        const breadcrumbLabel = this.breadcrumbMap[path];
        if (breadcrumbLabel) {
          // Évite d'ajouter des doublons
          const existingBreadcrumb = this.breadcrumbs.find(b => b.routerLink === `/${path}`);
          if (!existingBreadcrumb) {
            const breadcrumb: MenuItem = { label: breadcrumbLabel, routerLink: `/${path}` };
            this.breadcrumbs.push(breadcrumb);
          }
        }
      });
    }
  
    clearBreadcrumbs() {
      this.breadcrumbs = [...this.baseBreadcrumbs];
    }
  }
