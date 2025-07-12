import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    private appConfig: any;
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    async loadAppConfig() {
        this.appConfig = await firstValueFrom(this.http.get('/assets/config.json'));
    }

    get apiUrl(): string {
        return this.appConfig.apiUrl;
    }
}
