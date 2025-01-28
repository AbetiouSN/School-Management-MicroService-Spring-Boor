import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProfService {
  private apiUrl = 'http://localhost:8080/professor/create';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createProf(data: any): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(this.apiUrl, data);
  }
}
