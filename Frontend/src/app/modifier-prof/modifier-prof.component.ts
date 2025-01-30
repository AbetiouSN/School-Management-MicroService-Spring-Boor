import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfService } from '../services/prof.service';
import { ProfUpdateRequest } from '../models/prof-update-request.model';

@Component({
  selector: 'app-modifier-prof',
  templateUrl: './modifier-prof.component.html',
  styleUrls: ['./modifier-prof.component.css']
})
export class ModifierProfComponent implements OnInit {
  profForm!: FormGroup;
  profId!: number;
  userId!: number;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private profService: ProfService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du professeur
    this.profId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProfData();
  }

  loadProfData() {
    // Récupérer les données du professeur par ID
    this.profService.getProfById(this.profId).subscribe(
      (profUpdateRequest: ProfUpdateRequest) => {
        // Vérifier si 'prof' et 'registerRequest' existent avant d'essayer de les utiliser
        if (profUpdateRequest.prof && profUpdateRequest.registerRequest) {
          const prof = profUpdateRequest.prof;
          const registerRequest = profUpdateRequest.registerRequest;

          this.userId = prof.userId;  // Conserver le userId

          // Initialiser le formulaire avec les données du professeur et du user
          this.profForm = this.fb.group({
            cin: [prof.cin, Validators.required],
            prenom: [registerRequest.firstname, Validators.required],
            nom: [registerRequest.lastname, Validators.required],
            email: [registerRequest.email, [Validators.required, Validators.email]]
          });
        } else {
          this.errorMessage = 'Données du professeur non valides';
        }
      },
      error => {
        console.error('Erreur lors de la récupération des données du professeur:', error);
        this.errorMessage = 'Impossible de récupérer les données du professeur';
      }
    );
  }


  onSubmit() {
    if (this.profForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const formValues = this.profForm.value;

    const updatedProf = {
      prof: {
        cin: formValues.cin
      },
      registerRequest: {
        firstname: formValues.prenom,
        lastname: formValues.nom,
        email: formValues.email,
        role: 'PROF'  // Spécifier le rôle ici
      }
    };

    // Appeler le service pour mettre à jour les données du professeur
    this.profService.updateProf(this.profId, updatedProf).subscribe({
      next: () => {
        alert('Professeur mis à jour avec succès');
        this.router.navigate(['/admin/professeurs']); // Rediriger vers la liste des professeurs
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du professeur:', error);
        this.errorMessage = 'Impossible de mettre à jour le professeur';
      }
    });
  }

}
