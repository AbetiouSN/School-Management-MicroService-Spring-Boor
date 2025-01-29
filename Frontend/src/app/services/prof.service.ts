import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProfService {
  private apiUrl = 'http://localhost:8080/professor';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createProf(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  deleteProf(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  UpdateProf(id: number,prof:Prof): Observable<Prof> {
    return this.http.put<Prof>(`${this.apiUrl}/${id}`,prof);
  }

  listProf(): Observable<Prof[]> {
    return this.http.get<Prof[]>(`${this.apiUrl}/list`);
  }

  ProfById(id:number): Observable<Prof> {
    return this.http.get<Prof>(`${this.apiUrl}${id}`);
  }
}
