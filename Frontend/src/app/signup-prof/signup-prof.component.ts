import { Component } from '@angular/core';
import { ProfService } from '../services/prof.service';
import { Prof } from '../models/prof.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-prof',
  templateUrl: './signup-prof.component.html',
  styleUrls: ['./signup-prof.component.css']
})
export class SignupProfComponent {
  signupForm!: FormGroup;

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
      return;
    }

    const formValues = this.signupForm.value;

    const requestPayload = {
      prof: {
        cin: formValues.cin,
      },
      registerRequest: {
        firstname: formValues.prenom,
        lastname: formValues.nom,
        email: formValues.email,
        password: 'password123', // Default for the example
        role: 'PROF',
      },
    };

    this.profService.createProf(requestPayload).subscribe({
      next: () => alert('Professeur ajouté avec succès'),
      error: (error) => {
        console.error(error);
        alert('Une erreur est survenue');
      },
    });
  }
}
