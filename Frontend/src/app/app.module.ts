import {
  APP_INITIALIZER,
  importProvidersFrom,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AccueilComponent } from "./modules/accueil/accueil.component";
import { CategoriesComponent } from "./modules/categories/categoriesList/categories.component";
import { MenubarModule } from "primeng/menubar";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from "@ngx-translate/core";
import { ConfigService } from "./shared/services/config.service";
import { HttpLoaderFactory } from "../main";
import { HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastModule } from "primeng/toast";
import { ButtonDirective } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ProduitComponent } from "./modules/Produits/produit/produit.component";
import { DropdownModule } from "primeng/dropdown";
import { ChartpageComponent } from "./modules/chart/chart.component";
import { BodyComponent } from "./modules/body/body.component";
import { AppLayoutModule } from "./layout/app.layout.module";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToolbarModule } from "primeng/toolbar";
import { PersonneComponent } from "./modules/personneComponents/personne/personne.component";
import { ListPersonneComponent } from "./modules/personneComponents/list-personne/list-personne.component";
import { PanierViewComponent } from "./modules/PanierComponent/panier-view/panier-view.component";
import { OrderSummaryComponent } from "./modules/ordre/order-summary/order-summary.component";
import { OrderHistoryComponent } from "./modules/ordre/order-history/order-history.component";
import { FactureDetailsComponent } from "./modules/facture/facture-details/facture-details.component";
import { ProduitsListComponent } from "./modules/Produits/produits-list/produits-list.component";
import { CategorieCreateComponent } from "./modules/categories/categorie-create/categorie-create.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DevisDetailsComponent } from "./modules/facture/devis-details/devis-details.component";
import { RadioButtonModule } from "primeng/radiobutton";
import { ListefournisseursComponent } from "./modules/personneComponents/listefournisseurs/listefournisseurs.component";
import { ListeclientsComponent } from "./modules/personneComponents/listeclients/listeclients.component";
import { AppConfigModule } from "./layout/config/config.module";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./modules/checkout/checkout.component";
import { PaginatorModule } from "primeng/paginator";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CalendarModule } from "primeng/calendar";
import { ListboxModule } from "primeng/listbox";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TooltipModule } from "primeng/tooltip";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { InputSwitchModule } from "primeng/inputswitch";
import { ChartModule } from 'primeng/chart';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CategoriesComponent,
    ProduitComponent,
    ChartpageComponent,
    BodyComponent,
    PersonneComponent,
    ListPersonneComponent,
    PanierViewComponent,
    OrderSummaryComponent,
    OrderHistoryComponent,
    FactureDetailsComponent,
    ProduitsListComponent,
    CategorieCreateComponent,
    DevisDetailsComponent,
    ListefournisseursComponent,
    ListeclientsComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    BrowserAnimationsModule,
    ToastModule,
    CommonModule,
    ButtonDirective,
    InputTextModule,
    DropdownModule,
    AppLayoutModule,
    InputNumberModule,
    InputTextareaModule,
    ToolbarModule,
    ConfirmDialogModule,
    RadioButtonModule,
    AppConfigModule,
    PaginatorModule,
    BreadcrumbModule,
    InputNumberModule,
    CalendarModule,
    ListboxModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TooltipModule,
    ZXingScannerModule,
    InputSwitchModule,
    ChartModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => () =>
        configService.loadAppConfig(),
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: "fr",
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }, // required for translation
      })
    ),
    TranslatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
