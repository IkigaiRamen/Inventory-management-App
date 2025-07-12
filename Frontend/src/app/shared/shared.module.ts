import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {RouterModule} from "@angular/router";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from "primeng/autocomplete";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {TableComponent} from "./components/table/table.component";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {TranslateModule} from "@ngx-translate/core";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { FooterComponent } from './dashboard/footer/footer.component';

@NgModule({ declarations: [
        TableComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        MultiSelectModule,
        RouterModule,
        TooltipModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        TableComponent,
        TranslateModule,
        DashboardComponent

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        MultiSelectModule,
        RouterModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        TooltipModule,
        DialogModule,
        DividerModule,
        AutoCompleteModule,
        Button,
        ButtonDirective,
        Ripple,
        IconFieldModule,
        InputIconModule,
        BreadcrumbModule,
        TranslateModule,
        ConfirmDialogModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        ConfirmationService,
        MessageService
    ]
})
export class SharedModule {
}
