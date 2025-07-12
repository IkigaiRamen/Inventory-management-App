import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "../../../shared/services/config.service";
import { Categorie } from "../../../shared/models/categorie/categorie";
import { CreateCategorie } from "../../../shared/models/categorie/create-categorie";
import { ApiResponse } from "../../../shared/models/config/api-response";
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    constructor(private httpClient: HttpClient, private configService: ConfigService) {}

    // Fetch all categories
    getAllCategories(): Observable<ApiResponse<Categorie[]>> {
        return this.httpClient.get<ApiResponse<Categorie[]>>(this.configService.apiUrl + '/categorie');
    }

    // Delete a category by ID
    deleteCategorie(id: number): Observable<ApiResponse<void>> {
        return this.httpClient.delete<ApiResponse<void>>(`${this.configService.apiUrl}/categorie/${id}`);
    }

    // Add a new category
    addCategorie(categorie: CreateCategorie): Observable<ApiResponse<Categorie>> {
        return this.httpClient.post<ApiResponse<Categorie>>(this.configService.apiUrl + '/categorie/create', categorie);
    }

    // Update an existing category
    updateCategorie(idCategorie: number, categorie: CreateCategorie): Observable<ApiResponse<Categorie>> {
        return this.httpClient.put<ApiResponse<Categorie>>(this.configService.apiUrl + '/categorie/update/' + idCategorie, categorie);
    }
}
