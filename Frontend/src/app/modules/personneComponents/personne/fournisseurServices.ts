// Fournisseur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from '../../../shared/models/personne/fourniesseur';
import { ApiResponse } from '../../../shared/models/config/api-response';
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private apiUrl = 'http://localhost:8080/fournisseurs'; // Update this with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all Fournisseurs
  getAllFournisseurs(): Observable<ApiResponse<Fournisseur[]>> {
    return this.http.get<ApiResponse<Fournisseur[]>>(this.apiUrl);
  }

  // Get a Fournisseur by ID
  getFournisseurById(id: number): Observable<ApiResponse<Fournisseur>> {
    return this.http.get<ApiResponse<Fournisseur>>(`${this.apiUrl}/${id}`);
  }

  // Create a new Fournisseur
  saveFournisseur(FournisseurDTO: Fournisseur): Observable<ApiResponse<Fournisseur>> {
    return this.http.post<ApiResponse<Fournisseur>>(`${this.apiUrl}/create`, FournisseurDTO);
  }

  // Update a Fournisseur
  updateFournisseur(id: number, FournisseurDTO: Fournisseur): Observable<ApiResponse<Fournisseur>> {
    return this.http.put<ApiResponse<Fournisseur>>(`${this.apiUrl}/${id}`, FournisseurDTO);
  }

  // Delete a Fournisseur
  deleteFournisseur(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
