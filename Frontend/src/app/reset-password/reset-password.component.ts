
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const resetPasswordRequest = {
      email: this.resetPasswordForm.get('email')?.value,
      currentPassword: this.resetPasswordForm.get('currentPassword')?.value,
      newPassword: this.resetPasswordForm.get('newPassword')?.value
    };

    this.http.post('http://localhost:8080/Admin/reset', resetPasswordRequest, { responseType: 'text' })
      .subscribe(
        response => {
          this.successMessage = response;
          this.errorMessage = '';
          this.resetPasswordForm.reset();
          this.router.navigate(['/etudiant']);

        },
        error => {
          this.errorMessage = error.error;
          this.successMessage = '';
        }
      );
  }
}
