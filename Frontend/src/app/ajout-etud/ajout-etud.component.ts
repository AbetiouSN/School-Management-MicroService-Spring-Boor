import { Component } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-etud',
  templateUrl: './ajout-etud.component.html',
  styleUrls: ['./ajout-etud.component.css']
})
export class AjoutEtudComponent {
  etud = {
    student: {
      codeAppogie: '',
      cin: '',
      niveau: '',
      dateNaissance: '',
      dateInscription: ''
    },
    registerRequest: {
      firstname: '',
      lastname: '',
      email: ''
    }
  };

  constructor(private etudiantService: EtudiantService,private route: ActivatedRoute,private router:Router) {}

  ajouterEtud() {
    console.log("Tentative d'ajout de l'étudiant:", this.etud);

    this.etudiantService.createEtud(this.etud.student, this.etud.registerRequest).subscribe(
      response => {
        console.log('Étudiant ajouté avec succès', response);
        this.router.navigate(['/admin/listEtud'], {
          queryParams: { successMessage: 'Étudiant ajouté avec succès !' }
        });
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        alert('Erreur lors de l\'ajout de l\'étudiant : ' + (error.error || error.message));
      }
    );
  }
}
