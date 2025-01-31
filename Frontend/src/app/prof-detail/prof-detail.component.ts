// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProfService } from '../services/prof.service';
// import { ModuleService } from '../services/module.service';
// import { ProfResponse } from '../models/prof-response.model';
// import { ModuleResponse } from '../models/module-response.model';
// import { CourseModule } from '../models/module.model';
// import { Prof } from '../models/prof.model';
// import { RegisterRequest } from '../models/register-request.model';

// @Component({
//   selector: 'app-details-prof',
//   templateUrl: './prof-detail.component.html',
//   styleUrls: ['./prof-detail.component.css']
// })
// export class DetailsProfComponent implements OnInit {
//   profId!: number;
//   prof: Prof | null = null;
//   modules: CourseModule[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private profService: ProfService,
//     private moduleService: ModuleService
//   ) {}

//   ngOnInit(): void {
//     this.profId = +this.route.snapshot.paramMap.get('id')!;

//     // Load professor details
//     this.profService.getProfById1(this.profId).subscribe(
//       (data: ProfResponse) => {
//         console.log('API Professeur Response:', data);
//         this.prof = this.mapApiResponseToProf(data);
//         console.log('Professeur:', this.prof);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération du professeur:', error);
//       }
//     );

//     // Load modules associated with the professor
//     this.moduleService.getModulesByProfId(this.profId).subscribe(
//       (data: CourseModule[]) => {
//         this.modules = data; // Correctly assigning modules here
//         console.log('Modules associés:', this.modules);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des modules:', error);
//       }
//     );
//   }

//   private mapApiResponseToProf(data: ProfResponse): Prof {
//     // Ensure we properly handle potential undefined or null values
//     const profData = data.profDetails?.prof ?? {};  // Using nullish coalescing to handle undefined
//     const userData = data.profDetails?.registerRequest ?? {};  // Same for registerRequest

//     return {
//       id: profData.id || 0,
//       cin: profData.cin || '',
//       userId: profData.userId || 0,
//       user: {
//         firstname: userData.firstname || 'Inconnu',
//         lastname: userData.lastname || 'Inconnu',
//         email: userData.email || 'Inconnu'
//       }
//     };
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProfService } from '../services/prof.service';
// import { ModuleService } from '../services/module.service';
// import { ProfResponse } from '../models/prof-response.model';
// import { ModuleResponse } from '../models/module-response.model';
// import { CourseModule } from '../models/module.model';
// import { Prof } from '../models/prof.model';
// import { RegisterRequest } from '../models/register-request.model';

// @Component({
//   selector: 'app-details-prof',
//   templateUrl: './prof-detail.component.html',
//   styleUrls: ['./prof-detail.component.css']
// })
// export class DetailsProfComponent implements OnInit {
//   profId!: number;
//   prof: Prof | null = null;
//   modules: CourseModule[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private profService: ProfService,
//     private moduleService: ModuleService
//   ) {}

//   ngOnInit(): void {
//     this.profId = +this.route.snapshot.paramMap.get('id')!;

//     // Load professor details
//     this.profService.getProfById1(this.profId).subscribe(
//       (data: ProfResponse) => {
//         console.log('API Professeur Response:', data);
//         this.prof = this.mapApiResponseToProf(data);
//         console.log('Professeur:', this.prof);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération du professeur:', error);
//       }
//     );

//     // Load modules associated with the professor
//     this.moduleService.getModulesByProfId(this.profId).subscribe(
//       (data: CourseModule[]) => {
//         this.modules = data; // Correctly assigning modules here
//         console.log('Modules associés:', this.modules);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des modules:', error);
//       }
//     );
//   }

//   private mapApiResponseToProf(data: ProfResponse): Prof {
//     // Ensure we properly handle potential undefined or null values
//     const profData = data.profDetails?.prof ?? {};  // Using nullish coalescing to handle undefined
//     const userData = data.profDetails?.registerRequest ?? {};  // Same for registerRequest

//     return {
//       id: profData.id || 0,
//       cin: profData.cin || '',
//       userId: profData.userId || 0,
//       user: {
//         firstname: userData.firstname || 'Inconnu',
//         lastname: userData.lastname || 'Inconnu',
//         email: userData.email || 'Inconnu'
//       }
//     };
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProfService } from '../services/prof.service';
// import { ProfModulesResponse } from '../models/prof-modules-response.model';
// import { Prof } from '../models/prof.model';
// import { CourseModule } from '../models/module.model';

// @Component({
//   selector: 'app-details-prof',
//   templateUrl: './prof-detail.component.html',
//   styleUrls: ['./prof-detail.component.css']
// })
// export class DetailsProfComponent implements OnInit {
//   profId!: number;
//   prof: Prof | null = null;
//   modules: CourseModule[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private profService: ProfService
//   ) {}

//   ngOnInit(): void {
//     this.profId = +this.route.snapshot.paramMap.get('id')!;

//     // Charger les données combinées (professeur + modules)
//     this.profService.getProfAndModules(this.profId).subscribe(
//       (data: ProfModulesResponse) => {
//         console.log('API Response:', data);
//         this.prof = this.mapApiResponseToProf(data);
//         this.modules = data.modules; // Assignation correcte des modules
//         console.log('Professeur:', this.prof);
//         console.log('Modules:', this.modules);
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des données:', error);
//       }
//     );
//   }

//   private mapApiResponseToProf(data: ProfModulesResponse): Prof {
//     const profData = data.profDetails?.prof ?? {};
//     const userData = data.profDetails?.registerRequest ?? {};

//     return {
//       id: profData.id || 0,
//       cin: profData.cin || '',
//       userId: profData.userId || 0,
//       user: {
//         firstname: userData.firstname || 'Inconnu',
//         lastname: userData.lastname || 'Inconnu',
//         email: userData.email || 'Inconnu'
//       }
//     };
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfService } from '../services/prof.service';
import { ModuleService } from '../services/module.service';
import { ProfModulesResponse } from '../models/prof-modules-response.model';
import { Prof } from '../models/prof.model';
import { CourseModule } from '../models/module.model';

@Component({
  selector: 'app-details-prof',
  templateUrl: './prof-detail.component.html',
  styleUrls: ['./prof-detail.component.css']
})
export class DetailsProfComponent implements OnInit {
  profId!: number;
  prof: Prof | null = null;
  modules: CourseModule[] = [];
  showModuleForm: boolean = false;

  newModule = {
    moduleName: '',
    nombreHeures: 0,
    semestre: '',
    profId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private profService: ProfService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.profId = +this.route.snapshot.paramMap.get('id')!;
    this.newModule.profId = this.profId; // Initialiser l'ID du prof pour le module

    this.profService.getProfAndModules(this.profId).subscribe(
      (data: ProfModulesResponse) => {
        console.log('API Response:', data);
        this.prof = this.mapApiResponseToProf(data);
        this.modules = data.modules;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }

  toggleModuleForm() {
    this.showModuleForm = !this.showModuleForm;
  }

  onSubmitModule() {
    this.moduleService.createModule(this.newModule).subscribe(
      (createdModule) => {
        console.log('Module créé:', createdModule);
        this.modules.push(createdModule); // Ajouter le module à la liste
        this.showModuleForm = false; // Masquer le formulaire après ajout
        this.newModule = { moduleName: '', nombreHeures: 0, semestre: '', profId: this.profId }; // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de la création du module:', error);
      }
    );
  }

  private mapApiResponseToProf(data: ProfModulesResponse): Prof {
    const profData = data.profDetails?.prof ?? {};
    const userData = data.profDetails?.registerRequest ?? {};

    return {
      id: profData.id || 0,
      cin: profData.cin || '',
      userId: profData.userId || 0,
      user: {
        firstname: userData.firstname || 'Inconnu',
        lastname: userData.lastname || 'Inconnu',
        email: userData.email || 'Inconnu'
      }
    };
  }


  removeModule(moduleId: number) {
    if (confirm('Êtes-vous sûr de vouloir retirer ce module ?')) {
      this.moduleService.deleteModuleByProf(this.profId, moduleId).subscribe(
        () => {
          console.log(`Module ${moduleId} supprimé avec succès.`);
          this.modules = this.modules.filter(module => module.id !== moduleId); // Update the UI
        },
        (error) => {
          console.error('Erreur lors de la suppression du module:', error);
        }
      );
    }
  }

  
}
