import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../../shared/models/personne/client';
import { ApiResponse } from '../../../shared/models/config/api-response';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/clients'; // Update this with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all clients
  getAllClients(): Observable<ApiResponse<Client[]>> {
    return this.http.get<ApiResponse<Client[]>>(this.apiUrl);
  }

  // Get a client by ID
  getClientById(id: number): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/${id}`);
  }

  // Create a new client
  saveClient(clientDTO: FormData): Observable<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>(`${this.apiUrl}/create`, clientDTO);
  }

  // Update a client
  updateClient(id: number, clientDTO: FormData): Observable<ApiResponse<Client>> {
    console.log(clientDTO);
    return this.http.put<ApiResponse<Client>>(`${this.apiUrl}/update/${id}`, clientDTO);
  }

  // Delete a client
  deleteClient(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
