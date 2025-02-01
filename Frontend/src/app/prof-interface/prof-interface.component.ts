// // In ProfInterfaceComponent
// import { Component, OnInit } from '@angular/core';
// import { ProfService } from '../services/prof.service';
// import { ProfUpdateRequest } from '../models/prof-update-request.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-prof-interface',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './prof-interface.component.html',
//   styleUrls: ['./prof-interface.component.css']
// })
// export class ProfInterfaceComponent implements OnInit {
//   prof: ProfUpdateRequest | null = null;

//   constructor(private profService: ProfService) {}

//   ngOnInit(): void {
//     this.profService.getAuthenticatedProf().subscribe(
//       (profData) => {
//         this.prof = profData;
//       },
//       (error) => {
//         console.error('Error fetching authenticated professor:', error);
//       }
//     );
//   }


// }


import { Component, OnInit } from '@angular/core';
import { ProfService } from '../services/prof.service';
import { ProfUpdateRequest } from '../models/prof-update-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prof-interface',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prof-interface.component.html',
  styleUrls: ['./prof-interface.component.css']
})
export class ProfInterfaceComponent implements OnInit {
  prof: ProfUpdateRequest | null = null;
  modules: any[] = []; // To hold the modules for the authenticated professor

  constructor(private profService: ProfService) {}

  ngOnInit(): void {
    this.profService.getAuthenticatedProf().subscribe(
      (profData) => {
        this.prof = profData;
        if (this.prof && this.prof.prof) {
          this.loadModulesForProf(this.prof.prof.id); // Safe access to the professor's ID
        }
      },
      (error) => {
        console.error('Error fetching authenticated professor:', error);
      }
    );
  }

  loadModulesForProf(profId: number): void {
    this.profService.getProfAndModules1(profId).subscribe(
      (response) => {
        this.modules = response.modules; // Store the modules
        console.log("Modules récupérés pour le professeur :", this.modules);
      },
      (error) => {
        console.error('Erreur lors de la récupération des modules :', error);
      }
    );
  }
}
