// import { Component, OnInit } from '@angular/core';
// import { ModuleService } from '../services/module.service';
// import { CourseModule } from '../models/module.model';

// @Component({
//   selector: 'app-module-list',
//   templateUrl: './module-list.component.html',
//   styleUrls: ['./module-list.component.css']

// })
// export class ModuleListComponent implements OnInit {
//   modules: CourseModule[] = [];
//   loading: boolean = true;
//   errorMessage: string = '';

//   constructor(private moduleService: ModuleService) {}

//   ngOnInit(): void {
//     this.fetchModules();
//   }

//   fetchModules(): void {
//     this.moduleService.getAllModules().subscribe(
//       (data: CourseModule[]) => {
//         this.modules = data;
//         this.loading = false;

//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des modules:', error);
//         this.errorMessage = 'Impossible de charger les modules.';
//         this.loading = false;
//       }
//     );
//   }


//   assignStudentsToModule(moduleId: number, niveau: string): void {
//     this.moduleService.assignStudentsToModule(moduleId, niveau).subscribe(
//       (updatedModule) => {
//         console.log('Module mis à jour:', updatedModule);
//         // Optionnel : Rafraîchir la liste des modules ou afficher un message de succès
//       },
//       (error) => {
//         console.error('Erreur lors de l\'affectation des étudiants:', error);
//       }
//     );
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { CourseModule } from '../models/module.model';
import { StudentModule } from '../models/student-module.model';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  modules: CourseModule[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  selectedStudents: StudentModule[] = []; // Liste des étudiants sélectionnés
  showStudentModal: boolean = false; // Contrôle l'affichage de la modal

  selectedModuleId: number | null = null;


  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.fetchModules(); // Récupérer les modules au démarrage
  }

  // Méthode pour récupérer les modules depuis le service
  fetchModules(): void {
    this.moduleService.getAllModules().subscribe(
      (data: CourseModule[]) => {
        // Ajouter la propriété selectedNiveau à chaque module
        this.modules = data.map(module => ({
          ...module,
          selectedNiveau: module.selectedNiveau || "AP1" // Initialiser selectedNiveau pour chaque module
        }));
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des modules:', error);
        this.errorMessage = 'Impossible de charger les modules.';
        this.loading = false;
      }
    );
  }

  // Méthode pour assigner les étudiants à un module avec le niveau sélectionné
  assignStudentsToModule(moduleId: number, niveau: string): void {
    this.moduleService.assignStudentsToModule(moduleId, niveau).subscribe(
      (updatedModule) => {
        console.log('Module mis à jour:', updatedModule);
        // Rafraîchir les modules ou afficher un message de succès
        this.fetchModules(); // Facultatif : recharger les modules après modification
      },
      (error) => {
        console.error('Erreur lors de l\'affectation des étudiants:', error);
      }
    );
  }


  // Récupérer les étudiants inscrits à un module
  getStudentsByModule(moduleId: number): void {
    this.selectedModuleId = moduleId; // Stocker l'ID du module sélectionné
    this.moduleService.getStudentsByModule(moduleId).subscribe(
      (students) => {
        this.selectedStudents = students;
        this.showStudentModal = true; // Afficher la modal
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants:', error);
      }
    );
  }

  // Fermer la modal
  closeStudentModal(): void {
    this.showStudentModal = false;
  }

  removeStudentFromModule(studentId: number): void {
    if (!this.selectedModuleId) {
      console.error("Aucun module sélectionné !");
      return;
    }

    console.log("Appel à removeModuleFromStudent avec :", studentId, this.selectedModuleId);

    if (confirm("Voulez-vous vraiment retirer cet étudiant de ce module ?")) {
      this.moduleService.removeModuleFromStudent(studentId, this.selectedModuleId).subscribe(
        () => {
          console.log("Étudiant supprimé avec succès !");
          this.selectedStudents = this.selectedStudents.filter(student => student.student.id !== studentId);
        },
        (error) => {
          console.error("Erreur lors de la suppression :", error);
        }
      );
    }
  }




}
