

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { user } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: user | undefined;
  headers:HttpHeaders=new HttpHeaders();
  token:string='';
  private apiUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {
   this.headers=this.getHeaders();
   this.token=this.getToken();
  }

  upload(formData: FormData, niveau: number): Observable<any> {

    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.token} `
    });


    return this.http.post(`http://localhost:8080/Admin/upload/${niveau}`, formData,{headers});
  }
  // resetPassword(email:string): Observable<any> {
  //   return this.http.post(`http://localhost:8080/Admin/resetPassword`, email);
  // }
  resetPassword(email: string): Observable<any> {
    const emailPayload = { email: email };
    return this.http.post('http://localhost:8080/Admin/resetPassword', emailPayload);
  }


  modifierPassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.token}`
    // });
    return this.http.post('http://localhost:8080/Admin/reset', { email, currentPassword, newPassword });
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/authenticate`;

    return this.http.post<any>(loginUrl, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('JwtToken', JSON.stringify(response.token));
        }
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('JwtToken');
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('JwtToken') || 'null');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUser();
    return !!currentUser && currentUser.role === role;
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  currentUser(): user | null {
    if (this.getToken()) {
      const tokenPayload: any = jwtDecode(this.getToken());
      if (tokenPayload) {
        const user: user = {
          role: tokenPayload.role[0].authority,
          email: tokenPayload.sub,
          password: '',
          firstname:'',
          lastname:'',
          id:0
        };
        return user;
      }
    }
    return null;
  }

  autoLogout(dateExpiration: number): void {
    setTimeout(() => {
      this.logout();
    }, dateExpiration);
  }
}
