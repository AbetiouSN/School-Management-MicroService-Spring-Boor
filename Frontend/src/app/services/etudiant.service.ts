import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Etud } from '../models/etud.model';

export interface EtudiantNote {
  codeApoge: string;
  cne: string;
  nom: string;
  prenom: string;
  niveau: number;
  groupe: string;
  noteTotale: number;
}

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  headers: HttpHeaders = new HttpHeaders();
  private apiUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createEtud(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteEtud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateEtud(id: number, etud: Etud): Observable<Etud> {
    return this.http.put<Etud>(`${this.apiUrl}/${id}`, etud);
  }

  listEtud(): Observable<Etud[]> {
    return this.http.get<Etud[]>(`${this.apiUrl}/students`);
  }

  etudByCodeApoge(codeApoge: string): Observable<Etud> {
    return this.http.get<Etud>(`${this.apiUrl}/students/codeAppogie/${codeApoge}`);
  }

  etudByCin(cin: string): Observable<Etud> {
    return this.http.get<Etud>(`${this.apiUrl}/students/cin/${cin}`);
  }

  getStudentsByNiveau(niveau: string): Observable<Etud[]> {
    return this.http.get<Etud[]>(`${this.apiUrl}/allStudentsWithNiveau/${niveau}`);
  }


  assignModuleToStudents(moduleId: number, niveau: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/assignModuleToStudent`, null, {
      params: { moduleId: moduleId.toString(), niveau }
    });
  }

  addModuleToStudent(studentId: number, moduleId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${studentId}/modules/${moduleId}`, null);
  }


  removeModuleFromStudent(studentId: number, moduleId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${studentId}/modules/${moduleId}`);
  }

  getStudentsByModule(moduleId: number): Observable<Etud[]> {
    return this.http.get<Etud[]>(`${this.apiUrl}/by-module/${moduleId}`);
  }
}
