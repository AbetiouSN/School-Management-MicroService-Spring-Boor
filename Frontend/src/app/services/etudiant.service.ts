
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { etudiant } from '../models/etudiant.model';
import * as XLSX from 'xlsx';
import { AuthService } from './auth.service';


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
  headers:HttpHeaders=new HttpHeaders();

  private apiUrl = 'http://localhost:8080/Etudiant';
  private apiNotesUrl = 'http://localhost:8080/api/notes/etudiants'; // URL de l'API

  constructor(private http: HttpClient,private authService:AuthService) {
    this.headers=this.authService.getHeaders();
  }

  //etudnats non active
  // getEtudiantsInactifs(): Observable<etudiant[]> {
  //   return this.http.get<etudiant[]>(`${this.apiUrl}/inactifs`,{headers:this.headers});
  // }



  // setAbsence(id_etudiant: number, id_tp: number, status: string): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/setAbsence/${id_etudiant}/${id_tp}`, status ,{headers:this.headers});
  // }



}

