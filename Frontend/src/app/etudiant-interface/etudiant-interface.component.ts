// import { Component, OnInit } from '@angular/core';
// import { EtudiantService } from '../services/etudiant.service';
// import { CommonModule } from '@angular/common'; // Import du CommonModule


// @Component({
//   selector: 'app-etudiant-interface',
//   standalone: true,
//   imports: [CommonModule], // Ajout de CommonModule ici
//   templateUrl: './etudiant-interface.component.html',
//   styleUrls: ['./etudiant-interface.component.css']
// })
// export class EtudiantInterfaceComponent implements OnInit {
//   studentData: any;

//   constructor(private etudiantService: EtudiantService) {}

//   ngOnInit(): void {
//     this.loadStudentData();
//   }

//   loadStudentData() {
//     this.etudiantService.getStudentByToken().subscribe(
//       (data) => {
//         this.studentData = data;
//         console.log("Données étudiant récupérées :", this.studentData);
//       },
//       (error) => {
//         console.error("Erreur lors de la récupération des données :", error);
//       }
//     );
//   }

// } 


import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant-interface',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etudiant-interface.component.html',
  styleUrls: ['./etudiant-interface.component.css']
})
export class EtudiantInterfaceComponent implements OnInit {
  studentData: any;
  modules: any[] = []; // Liste des modules pour l'étudiant

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData() {
    this.etudiantService.getStudentByToken().subscribe(
      (data) => {
        this.studentData = data;
        console.log("Données étudiant récupérées :", this.studentData);
        this.loadModulesForNiveau(this.studentData.student.niveau); // Appel pour récupérer les modules
      },
      (error) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
  }

  loadModulesForNiveau(niveau: string) {
    this.etudiantService.getModulesByNiveau(niveau).subscribe(
      (modules) => {
        this.modules = modules;
        console.log("Modules récupérés :", this.modules);
      },
      (error) => {
        console.error("Erreur lors de la récupération des modules :", error);
      }
    );
  }
}
