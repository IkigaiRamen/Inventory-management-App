import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Commande } from "../../shared/models/commande/commande";
import { Observable } from "rxjs";
import { ApiResponse } from "../../shared/models/config/api-response";
import { DetailCommande } from "../../shared/models/detail-commande/detail-commande";
import { CreateCommande } from "../../shared/models/commande/createCommande";
import { CommandeDetailCreation } from "../../shared/models/commande/commandeDetailCreation";
import { FillAdditionalFieldsRequest } from "../../shared/models/commande/fillAdditionalFieldsRequest";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8080/commandes';

  constructor(private http: HttpClient) {}


  // Method to create a new commande with details
  createCommandeWithDetails(commandeDetailCreation: CommandeDetailCreation): Observable<ApiResponse<CreateCommande>> {
    return this.http.post<ApiResponse<CreateCommande>>(`${this.baseUrl}/create`, commandeDetailCreation);
  }
  // Method to fill additional fields for the Commande
  fillAdditionalFields(commandeId: number,fillData: FillAdditionalFieldsRequest): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.baseUrl}/fillAdditionalFields/${commandeId}`, fillData);
  }
   
  // Method to get a commande by ID
  getCommandeById(id: number): Observable<ApiResponse<Commande>> {
    return this.http.get<ApiResponse<Commande>>(`${this.baseUrl}/${id}`);
  }

  // Method to get all commandes
  getPaginatedCommandes(page: number, size: number, searchTerm: string): Observable<{ data: Commande[], totalRecords: number }> {
    return this.http.get<{ _embedded: { commandeDTOList: Commande[] }, page: { totalElements: number } }>(
      `${this.baseUrl}/commandes?page=${page}&size=${size}&search=${searchTerm}`
    ).pipe(
      map(response => ( console.log("these are the orders" , response),{
        data: response._embedded.commandeDTOList,
        totalRecords: response.page.totalElements
      }))
    );

  } 
  // Method to progress a commande from START to IN_PROGRESS
  progressCommande(commandeId: number): Observable<ApiResponse<Commande>> {
    return this.http.put<ApiResponse<Commande>>(`${this.baseUrl}/progresser/${commandeId}`, {});
  }
  // Method to validate an existing commande
  validateCommande(commandeId: number): Observable<ApiResponse<Commande>> {
    return this.http.put<ApiResponse<Commande>>(`${this.baseUrl}/valider/${commandeId}`, {});
  }
  // Method to cancel an existing commande
  cancelCommande(commandeId: number): Observable<ApiResponse<Commande>> {
    return this.http.put<ApiResponse<Commande>>(`${this.baseUrl}/cancel/${commandeId}`, {});
  }

  // Method to delete a commande
  deleteCommande(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/${id}`);
  }
}