import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const currentUser = this.authService.currentUser();
    if (currentUser && currentUser.role === 'ETUD') {
      return true;
    } else {
      this.router.navigate(['login']); 
      return false;
    }
  }
}
