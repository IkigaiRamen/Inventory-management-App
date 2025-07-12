import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppConfigComponent } from './app.config.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SidebarModule,
        RadioButtonModule,
        ButtonModule,
        InputSwitchModule,
        ZXingScannerModule,
    ],
    declarations: [
        AppConfigComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        AppConfigComponent
    ]
})
export class AppConfigModule { }
