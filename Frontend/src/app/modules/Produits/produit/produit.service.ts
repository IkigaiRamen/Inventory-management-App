import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigService } from "../../../shared/services/config.service";
import { Produit } from "../../../shared/models/produit/Produit";
import { ApiResponse } from "../../../shared/models/config/api-response";

@Injectable({
    providedIn: 'root'
})
export class ProduitsService {

    constructor(private httpClient: HttpClient, private configService: ConfigService) { }
     // Method to get all paginated products
  getAllProduitsPaginated(page: number, size: number, search: string = ''): Observable<{ data: Produit[], totalRecords: number }> {
    return this.httpClient.get<{ message: string, data: { content: Produit[], page: { totalElements: number } } }>(
      `${this.configService.apiUrl}/produit/paginated?page=${page}&size=${size}&search=${search}`
    ).pipe(
      map(response => ({
        data: response.data.content,  // Accessing 'content' which holds the products array
        totalRecords: response.data.page.totalElements  // Accessing total number of records
      }))
    );
  }

  // Method to get paginated products by category
  getProduitsByCategoryPaginated(categorieId: number, page: number, size: number, search: string = ''): Observable<{ data: Produit[], totalRecords: number }> {
    return this.httpClient.get<{ message: string, data: { content: Produit[], page: { totalElements: number } } }>(
      `${this.configService.apiUrl}/produit/category/${categorieId}/paginated?page=${page}&size=${size}&search=${search}`
    ).pipe(
      map(response => ({
        data: response.data.content,  // Accessing 'content' which holds the products array
        totalRecords: response.data.page.totalElements  // Accessing total number of records
      }))
    );
  }
      


    // Fetch all products
    getAllProduits(): Observable<Produit[]> {
        return this.httpClient.get<ApiResponse<Produit[]>>(`${this.configService.apiUrl}/produit/All`)
            .pipe(map(response => response.data));
    }

    // Fetch all products by category
    getAllProduitsByCategory(categorieId: number): Observable<Produit[]> {
        return this.httpClient.get<ApiResponse<Produit[]>>(`${this.configService.apiUrl}/produit/category1/${categorieId}`)
            .pipe(map(response => response.data));
    }

    // Fetch a product by ID
    getProduitById(id: number): Observable<Produit> {
        return this.httpClient.get<ApiResponse<Produit>>(`${this.configService.apiUrl}/produit/${id}`)
            .pipe(map(response => response.data));
    }

    // Delete a product by ID
    deleteProduit(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.configService.apiUrl}/produit/${id}`);
    }

    // Add a new product
    addProduit(formData: FormData): Observable<Produit> {
        console.log("this is the form data", formData);
        return this.httpClient.post<ApiResponse<Produit>>(`${this.configService.apiUrl}/produit/create`, formData)
            .pipe(map(response => response.data));
    }

    // Update an existing product
    updateProduit(id: number, formData: FormData): Observable<Produit> {
        return this.httpClient.put<ApiResponse<Produit>>(`${this.configService.apiUrl}/produit/update/${id}`, formData)
            .pipe(map(response => response.data));
    }
}
