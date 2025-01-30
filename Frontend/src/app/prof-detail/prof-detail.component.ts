import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfService } from '../services/prof.service';
import { ModuleService } from '../services/module.service';  // Ajoutez un service pour récupérer les modules
import { Prof } from '../models/prof.model';
import { CourseModule } from '../models/module.model';

@Component({
  selector: 'app-details-prof',
  templateUrl: './prof-detail.component.html',
  styleUrls: ['./prof-detail.component.css']
})
export class DetailsProfComponent implements OnInit {
  profId!: number;
  prof!: Prof;
  modules: CourseModule[] = [];  // Liste des modules du professeur

  constructor(
    private route: ActivatedRoute,
    private profService: ProfService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du professeur depuis la route
    this.profId = +this.route.snapshot.paramMap.get('id')!;

    // Charger les données du professeur
    this.profService.getProfById(this.profId).subscribe(
      (data) => {
        // Convertir ProfUpdateRequest en Prof
        this.prof = this.mapProfUpdateRequestToProf(data);  // Assurez-vous d'avoir une fonction pour cela
        console.log('Professeur:', this.prof);
      },
      (error) => {
        console.error('Erreur lors de la récupération du professeur:', error);
      }
    );

    // Charger les modules associés au professeur
    this.moduleService.getModulesByProfId(this.profId).subscribe(
      (data) => {
        this.modules = data;
        console.log('Modules associés:', this.modules);
      },
      (error) => {
        console.error('Erreur lors de la récupération des modules:', error);
      }
    );
  }

  // Fonction pour mapper ProfUpdateRequest à Prof
  private mapProfUpdateRequestToProf(data: any): Prof {
    const prof: Prof = {
      id: data.id,
      cin: data.cin,
      userId: data.userId,
      user: {
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        email: data.user.email,
      }
    };

    return prof;
  }
}
