import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";

import packageJson from '../package.json';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?version=' + packageJson.version);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
