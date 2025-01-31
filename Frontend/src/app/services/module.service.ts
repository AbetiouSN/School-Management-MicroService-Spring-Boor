import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseModule } from '../models/module.model';
import { StudentModule } from '../models/student-module.model';

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


  createModule(moduleData: { moduleName: string; nombreHeures: number; semestre: string; profId: number }): Observable<CourseModule> {
    const params = new URLSearchParams();
    params.set('moduleName', moduleData.moduleName);
    params.set('nombreHeures', moduleData.nombreHeures.toString());
    params.set('semestre', moduleData.semestre);
    params.set('profId', moduleData.profId.toString());

    return this.http.post<CourseModule>(`${this.baseUrl}/create?${params.toString()}`, {});
  }


  getAllModules(): Observable<CourseModule[]> {
    return this.http.get<CourseModule[]>(`${this.baseUrl}/allmodules`);
  }

   // Affecter des étudiants à un module
   // Affecter des étudiants à un module
   assignStudentsToModule(moduleId: number, niveau: string): Observable<CourseModule> {
    return this.http.put<CourseModule>(`${this.baseUrl}/${moduleId}/assign-students`, null, {
      params: { niveau }
    });
  }

  getStudentsByModule(moduleId: number): Observable<StudentModule[]> {
    return this.http.get<StudentModule[]>(`http://localhost:8082/students/by-module/${moduleId}`);
  }

  removeModuleFromStudent(studentId: number, moduleId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8082/students/${studentId}/modules/${moduleId}`);
  }


  deleteModuleByProf(profId: number, moduleId: number) {
    const url = `http://localhost:8084/modules/delete?moduleId=${moduleId}&profId=${profId}`;
    return this.http.delete<any>(url);
  }





}
