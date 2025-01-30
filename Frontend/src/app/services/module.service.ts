import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModule } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = 'http://localhost:8084/modules';  // L'URL de base pour les modules

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les modules par ID du professeur
  getModulesByProfId(profId: number): Observable<CourseModule[]> {
    return this.http.get<CourseModule[]>(`${this.baseUrl}/prof/${profId}`);
  }
}
