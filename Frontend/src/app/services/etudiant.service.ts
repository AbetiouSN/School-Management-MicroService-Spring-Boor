import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Etud } from '../models/etud.model';
import { StudentUser } from '../models/student-user.model';
import { catchError, map, tap } from 'rxjs/operators';


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
  private apiUrl = 'http://localhost:8082/students';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // createEtud(data: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}`, data);
  // }
  createEtud(student: any, registerRequest: any): Observable<any> {
    const headers = this.authService.getHeaders();

    const requestBody = {
      student: {
        codeAppogie: student.codeAppogie,
        cin: student.cin,
        niveau: student.niveau,
        dateNaissance: student.dateNaissance,
        dateInscription: student.dateInscription
      },
      registerRequest: {
        firstname: registerRequest.firstname,
        lastname: registerRequest.lastname,
        email: registerRequest.email,
        role: "STUDENT" // Assurez-vous que ce rôle est bien envoyé
      }
    };

    console.log("Envoi de la requête avec le body:", requestBody);

    return this.http.post(`${this.apiUrl}`, requestBody, { headers });
  }

  // deleteEtud(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }

  deleteEtud(id: number) {
    return this.http.delete(`http://localhost:8082/students/${id}`, { observe: 'response' }).pipe(
      map(response => {
        // Si on reçoit un statut 200 OK, la suppression a réussi
        if (response.status === 200) {
          return null; // Retourner null car il n'y a pas de corps dans la réponse
        }
        throw new Error('Erreur lors de la suppression');
      }),
      catchError(error => {
        // Gérer l'erreur ici si besoin
        return throwError(error);
      })
    );
  }


  updateEtud(id: number, etud: Etud): Observable<Etud> {
    return this.http.put<Etud>(`${this.apiUrl}/${id}`, etud);
  }

  // listEtud(): Observable<Etud[]> {
  //   return this.http.get<Etud[]>(`${this.apiUrl}/students`);
  // }

  listEtud(): Observable<StudentUser[]> {
    return this.http.get<StudentUser[]>(`${this.apiUrl}/students`).pipe(
      tap((data) => console.log("Données récupérées depuis l'API :", data))
    );
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
