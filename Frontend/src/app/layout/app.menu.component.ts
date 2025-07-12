import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { LayoutService } from "./service/app.layout.service";

@Component({
  selector: "app-menu",
  templateUrl: "./app.menu.component.html",
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: "Accueil",
        items: [
          { label: "Tableau de bord", icon: "pi pi-fw pi-home", routerLink: ["/"] },
        ],
      },
    
      {
        label: "Composants UI",
        items: [
          {
            label: "Catégories",
            icon: "pi pi-fw pi-th-large",
            items:[
              {
                label: "Ajouter catégorie",
                icon: "pi pi-fw pi-plus-circle",
                routerLink: ["/categories"]
              },
              {
                label: "Liste des catégories",
                icon: "pi pi-fw pi-list",
                routerLink: ["/categories/list"]
              }
            ]
          },
          {
            label: "Produits",
            icon: "pi pi-fw pi-shopping-bag",
            items:[
              {
                label: "Ajouter Produit",
                icon: "pi pi-fw pi-plus-circle",
                routerLink: ["/produits"]
              },
              {
                label: "Listes des produits",
                icon: "pi pi-fw pi-list",
                routerLink: ["/produits/list"]
              }
            ]
          },
          {
            label: "Panier",
            icon: "pi pi-fw pi-shopping-cart",
            routerLink: ["/panier"],
          },
          {
            label: "Personnes",
            icon: "pi pi-fw pi-users",
            items: [
                {
                    label: "Ajouter Personne",
                    icon: "pi pi-fw pi-user-plus",
                    routerLink: ["/personne"]
                },
                {
                    label: "Liste de Personnes",
                    icon: "pi pi-fw pi-list",
                    routerLink: ["/personne/list"]
                }
            ],
          },
          {
            label: "Commandes",
            icon: "pi pi-fw pi-file",
            items: [
                {
                    label: "Historique",
                    icon: "pi pi-fw pi-list",
                    routerLink: ["/ordre/history"]
                },
                {
                    label: "Détails",
                    icon: "pi pi-fw pi-file",
                    routerLink: ["/ordre/1"]
                }
            ],
          },
      
        ],
      },
    ];
  }
}
