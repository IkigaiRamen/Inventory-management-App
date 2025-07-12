import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccueilComponent } from "./modules/accueil/accueil.component";
import { CategoriesComponent } from "./modules/categories/categoriesList/categories.component";
import { ProduitComponent } from "./modules/Produits/produit/produit.component";
import { ChartpageComponent } from "./modules/chart/chart.component";
import { DashboardComponent } from "./shared/dashboard/dashboard.component";
import { BodyComponent } from "./modules/body/body.component";
import { AppLayoutComponent } from "./layout/app.layout.component";
import { PersonneComponent } from "./modules/personneComponents/personne/personne.component";
import { ListPersonneComponent } from "./modules/personneComponents/list-personne/list-personne.component";
import { PanierViewComponent } from "./modules/PanierComponent/panier-view/panier-view.component";
import { OrderSummaryComponent } from "./modules/ordre/order-summary/order-summary.component";
import { OrderHistoryComponent } from "./modules/ordre/order-history/order-history.component";
import { FactureDetailsComponent } from "./modules/facture/facture-details/facture-details.component";
import { ProduitsListComponent } from "./modules/Produits/produits-list/produits-list.component";
import { CategorieCreateComponent } from "./modules/categories/categorie-create/categorie-create.component";
import { DevisDetailsComponent } from "./modules/facture/devis-details/devis-details.component";
import { CheckoutComponent } from "./modules/checkout/checkout.component";
import { CanDeactivateCheckoutGuard } from "./modules/checkout/canDeactivateCheckoutGuard";
const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent, // Main dashboard component
    children: [
      { path: "accueil", component: AccueilComponent },
      { path: "categories/list", component: CategoriesComponent },
      { path: "categories", component: CategorieCreateComponent},
      { path: "produits", component: ProduitComponent },
      { path: "produits/list", component: ProduitsListComponent },
      { path: "produits/:categoryId", component: ProduitsListComponent },
      { path: "chart", component: ChartpageComponent },
      { path: "personne", component: PersonneComponent },
      { path: "personne/list", component: ListPersonneComponent },
      { path: "panier", component: PanierViewComponent },
      { path: "ordre/history", component: OrderHistoryComponent },
      { path: "order-summary/:id", component: OrderSummaryComponent },
      { path: "facture/:id", component: FactureDetailsComponent },
      { path: "devis/:id", component: DevisDetailsComponent },
      { path: "order-details", component: CheckoutComponent ,canDeactivate: [CanDeactivateCheckoutGuard],},
      { path: "", redirectTo: "accueil", pathMatch: "full" }, // Redirect to accueil by default
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
