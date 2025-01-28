import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { user } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authenticatedUser!: user | null;
  errorMessage: string = '';
  role: string | undefined = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenticatedUser = this.authService.currentUser();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful', response);
          this.role = this.authService.currentUser()?.role;
          console.log(this.role);
          if (this.role == 'ADMIN') {
            this.router.navigate(['admin/signup']);
          } else if (this.role == 'PROF') {
            this.router.navigate(['/prof/tps/1']);
          } else if (this.role == 'ETUD') {
            console.log(this.role);
            this.router.navigate(['etudiant']);
          }
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Email ou mot de passe incorrect.';
        }
      );
    } else {
      console.log('Form is invalid'); // Debugging: log form invalidity
    }
  }

  onResetPassword(): void {
    const email = this.loginForm.get('email')!.value;
    if (email) {
      this.authService.resetPassword(email).subscribe(
        response => {
          alert("Un email de réinitialisation de mot de passe a été envoyé.");
        },
        error => {
          alert("Adresse email non valide.");
        }
      );
    } else {
      alert("Veuillez entrer une adresse email valide.");
    }
  }
}
