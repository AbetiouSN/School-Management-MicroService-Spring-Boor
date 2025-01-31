// import { Component } from '@angular/core';
// import { Etud } from '../models/etud.model';
// import { EtudiantService } from '../services/etudiant.service';
// import { Router } from '@angular/router';
// import { StudentUser } from '../models/student-user.model';

// @Component({
//   selector: 'app-list-etud',
//   templateUrl: './list-etud.component.html',
//   styleUrl: './list-etud.component.css'
// })
// export class ListEtudComponent {
//  etudiants: Etud[] = [];
//  etudiants1: StudentUser[] = [];
//   searchTerm: string = '';

//   constructor(private etudservice:EtudiantService,private router: Router) {}

//   ngOnInit() {
//     this.etudservice.listEtud().subscribe(
//       data => {
//         this.etudiants1 = data;
//         console.log("Étudiants stockés dans etudiants1 :", this.etudiants1);
//       },
//       error => console.error("Erreur lors de la récupération des étudiants :", error)
//     );
//   }



//   ajouterEtud() {
//     this.router.navigate(['/admin/ajoutEtud']);
//   }

//   modifierEtud(codeApoge: string) {
//     alert(`Modifier etudiant`);
//     this.router.navigate(['/admin/ajoutEtud',codeApoge]);
//   }

//   supprimerEtud(id: number): void {
//       alert(`Vous êtes sûr de supprimer cet etudiant ?`);
//       this.etudservice.deleteEtud(id).subscribe({
//         next: data => {
//           this.etudiants = data;
//           alert(`Etudiant est supprime avec succes `);
//         },
//         error: error => {
//           console.error(`There was an error deleting the Etud with ID ${id}:`, error);
//           alert(`Error deleting Etudiant with ID ${id}: ${error.message}`);
//         }
//       });
//   }

//   // Fonction pour filtrer les professeurs par email
//   filteredEtudiants(): StudentUser[] {
//     if (!this.searchTerm) {
//       return this.etudiants1;
//     }
//     return this.etudiants1.filter(etud =>
//       etud.student.codeAppogie.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }


// }


import { Component } from '@angular/core';
import { Etud } from '../models/etud.model';
import { EtudiantService } from '../services/etudiant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentUser } from '../models/student-user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-etud',
  templateUrl: './list-etud.component.html',
  styleUrls: ['./list-etud.component.css']
})
export class ListEtudComponent {
  etudiants: Etud[] = [];
  etudiants1: StudentUser[] = [];
  searchTerm: string = '';
  successMessage: string | null = null;
  selectedNiveau: string = 'AP1';

  showPopup: boolean = false;
  filteredStudentsByNiveau: any[] = [];

  constructor(private etudservice: EtudiantService, private router: Router, private route: ActivatedRoute,private http: HttpClient) {}

  // ngOnInit() {
  //   this.etudservice.listEtud().subscribe(
  //     data => {
  //       this.etudiants1 = data;
  //       console.log("Étudiants stockés dans etudiants1 :", this.etudiants1);
  //     },
  //     error => console.error("Erreur lors de la récupération des étudiants :", error)
  //   );

  //   // Récupérer le message de succès depuis les queryParams
  //   this.route.queryParams.subscribe(params => {
  //     if (params['successMessage']) {
  //       this.successMessage = params['successMessage'];

  //       // Effacer le message après 3 secondes
  //       setTimeout(() => {
  //         this.successMessage = null;
  //       }, 3000);
  //     }
  //   });
  // }

  ngOnInit() {
    this.etudservice.listEtud().subscribe(
      data => {
        this.etudiants1 = data;
        console.log("Étudiants stockés dans etudiants1 :", this.etudiants1);
      },
      error => console.error("Erreur lors de la récupération des étudiants :", error)
    );

    // Récupérer le message de succès depuis les queryParams
    this.route.queryParams.subscribe(params => {
      if (params['successMessage']) {
        this.successMessage = params['successMessage'];

        // Effacer le message après 3 secondes
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      }
    });
  }


  ajouterEtud() {
    this.router.navigate(['/admin/ajoutEtud']);
  }

  modifierEtud(codeApoge: string) {
    alert(`Modifier etudiant`);
    this.router.navigate(['/admin/ajoutEtud', codeApoge]);
  }

  supprimerEtud(id: number): void {
    const confirmation = confirm("Vous êtes sûr de supprimer cet étudiant ?");

    if (confirmation) {
      this.etudservice.deleteEtud(id).subscribe({
        next: () => {
          // Suppression réussie, redirection vers la liste avec un message de succès
          this.router.navigate(['/admin/listEtud'], {
            queryParams: { successMessage: 'Étudiant supprimé avec succès !' }
          });
        },
        error: error => {
          console.error(`Erreur lors de la suppression de l'étudiant avec ID ${id}:`, error);
          alert(`Erreur lors de la suppression de l'étudiant : ${error.message}`);
        }
      });
    }
  }



  // Fonction pour filtrer les étudiants par code Apogée
  filteredEtudiants(): StudentUser[] {
    if (!this.searchTerm) {
      return this.etudiants1;
    }
    return this.etudiants1.filter(etud =>
      etud.student.codeAppogie.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }




  ouvrirPopupParNiveau() {
    this.http.get<any[]>(`http://localhost:8082/students/allStudentsWithNiveau/${this.selectedNiveau}`)
      .subscribe((response) => {
        this.filteredStudentsByNiveau = response;
        this.showPopup = true;
      }, (error) => {
        console.error('Erreur lors de la récupération des étudiants par niveau :', error);
      });
  }

  fermerPopup() {
    this.showPopup = false;
  }



}
