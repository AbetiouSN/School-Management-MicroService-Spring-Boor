import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { ProfUpdateRequest } from '../models/prof-update-request.model';


interface ProfApiResponse {
  prof: {
    id: number;
    cin: string;
    userId: number;
  };
  registerRequest: {
    firstname: string;
    lastname: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  private apiUrl = 'http://localhost:8083/professor';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createProf(profData: Prof): Observable<any> {
    const headers = this.authService.getHeaders(); // Assurez-vous que les headers contiennent l'Authorization

    const requestBody = {
      prof: {
        cin: profData.cin
      },
      registerRequest: {
        firstname: profData.user.firstname,
        lastname: profData.user.lastname,
        email: profData.user.email,
        role: "PROF"
      }
    };

    return this.http.post(`${this.apiUrl}/create`, requestBody, { headers });
  }


  // deleteProf(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
  deleteProf(id: number) {
    return this.http.delete<any>(`http://localhost:8083/professor/${id}`);
  }


  UpdateProf(id: number, prof: Prof): Observable<Prof> {
    if (!id) {
      throw new Error("L'ID du professeur est invalide");
    }
    return this.http.put<Prof>(`${this.apiUrl}/${id}`, prof);
  }


  // listProf(): Observable<Prof[]> {
  //   return this.http.get<Prof[]>(`${this.apiUrl}/list`);
  // }

  listProf(): Observable<Prof[]> {
    return this.http.get<ProfApiResponse[]>(`${this.apiUrl}/list`).pipe(
      map((response: ProfApiResponse[]) =>
        response.map(prof => ({
          id: prof.prof.id,
          cin: prof.prof.cin,
          userId: prof.prof.userId,
          user: {
            firstname: prof.registerRequest.firstname,
            lastname: prof.registerRequest.lastname,
            email: prof.registerRequest.email
          }
        }))
      )
    );
  }


  ProfById(id: number): Observable<Prof> {
    return this.http.get<Prof>(`${this.apiUrl}/${id}`);
  }


  // getProfById(id: number): Observable<Prof> {
  //   return this.http.get<Prof>(`${this.apiUrl}/${id}`);
  // }

// Récupérer un professeur par son ID
getProfById(id: number): Observable<ProfUpdateRequest> {
  return this.http.get<ProfUpdateRequest>(`${this.apiUrl}/${id}`);
}

// Méthode pour mettre à jour un professeur
// updateProf(id: number, updatedProf: Prof): Observable<Prof> {
//   return this.http.put<Prof>(`${this.apiUrl}/${id}`, updatedProf);
// }

updateProf(profId: number, updatedProf: any) {
  return this.http.put(`http://localhost:8083/professor/${profId}`, updatedProf);
}


  // Mettre à jour un professeur
  // updateProf(id: number, prof: Prof): Observable<Prof> {
  //   const requestPayload = {
  //     prof: {
  //       cin: prof.cin,
  //     },
  //     registerRequest: {
  //       firstname: prof.user.firstname,
  //       lastname: prof.user.lastname,
  //       email: prof.user.email,
  //       role: 'PROF',  // Le rôle est 'PROF' par défaut
  //     }
  //   };

  //   return this.http.put<Prof>(`${this.apiUrl}/${id}`, requestPayload);
  // }



   // Mettre à jour un professeur
  //  updateProf(id: number, updatedProf: Prof): Observable<Prof> {
  //   return this.http.put<Prof>(`${this.apiUrl}/${id}`, updatedProf);
  // }

}
