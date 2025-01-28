import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  headers:HttpHeaders=new HttpHeaders();

  private apiUrl = 'http://localhost:8080/Prof';

  constructor(private http: HttpClient,private authService:AuthService) {

    this.headers=this.authService.getHeaders();
  }

  // registerProf(prof: Prof): Observable<Prof> {
  //   return this.http.post<Prof>(`${this.apiUrl}/registerProf`, prof,{headers:this.headers});
  // }
}
