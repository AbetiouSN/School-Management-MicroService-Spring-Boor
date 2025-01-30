import { Component, OnInit } from '@angular/core';
import { ProfService } from '../services/prof.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-prof',
  templateUrl: './signup-prof.component.html',
  styleUrls: ['./signup-prof.component.css']
})
export class SignupProfComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitting = false;  // Pour gérer l'état de soumission
  errorMessage: string | null = null;  // Pour gérer les messages d'erreur

  constructor(private fb: FormBuilder, private profService: ProfService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      cin: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.isSubmitting = true;  // Démarrer la soumission

    const formValues = this.signupForm.value;

    const requestPayload = {
      cin: formValues.cin,
      user: {
        firstname: formValues.prenom,
        lastname: formValues.nom,
        email: formValues.email,
      },
      userId: undefined,  // Remplacer null par undefined
    };

    this.profService.createProf(requestPayload).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Professeur ajouté avec succès');
        this.signupForm.reset();  // Réinitialiser le formulaire
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error(error);
        this.errorMessage = 'Une erreur est survenue lors de l\'ajout du professeur.';
      },
    });
  }

  // Fonction pour récupérer les erreurs de validation
  get formControls() {
    return this.signupForm.controls;
  }
}
