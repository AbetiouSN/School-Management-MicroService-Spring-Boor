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
  signupForm: FormGroup;
  formInvalid: boolean = false;

  constructor(private profService: ProfService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      departement: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
