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

  // Créer un étudiant
  createEtud(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}`, data, { headers });
  }

  // Supprimer un étudiant par ID
  deleteEtud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un étudiant par ID
  updateEtud(id: number, etud: Etud): Observable<Etud> {
    return this.http.put<Etud>(`${this.apiUrl}/${id}`, etud);
  }

  // Récupérer tous les étudiants
  listEtud(): Observable<Etud[]> {
    return this.http.get<Etud[]>(`${this.apiUrl}/students`);
  }

  // Récupérer un étudiant par Code Apogée
  etudByCodeApoge(codeApoge: string): Observable<Etud> {
    return this.http.get<Etud>(`${this.apiUrl}/students/codeAppogie/${codeApoge}`);
  }

  // Récupérer un étudiant par CIN
  etudByCin(cin: string): Observable<Etud> {
    return this.http.get<Etud>(`${this.apiUrl}/students/cin/${cin}`);
  }

  // Récupérer tous les étudiants par niveau
  getStudentsByNiveau(niveau: string): Observable<Etud[]> {
    return this.http.get<Etud[]>(`${this.apiUrl}/allStudentsWithNiveau/${niveau}`);
  }

  // Assigner un module à un étudiant par son niveau
  assignModuleToStudents(moduleId: number, niveau: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/assignModuleToStudent`, null, {
      params: { moduleId: moduleId.toString(), niveau }
    });
  }

  // Ajouter un module à un étudiant
  addModuleToStudent(studentId: number, moduleId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${studentId}/modules/${moduleId}`, null);
  }

  // Retirer un module d'un étudiant
  removeModuleFromStudent(studentId: number, moduleId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${studentId}/modules/${moduleId}`);
  }

  // Récupérer les étudiants d'un module spécifique
  getStudentsByModule(moduleId: number): Observable<Etud[]> {
    return this.http.get<Etud[]>(`${this.apiUrl}/by-module/${moduleId}`);
  }
}
