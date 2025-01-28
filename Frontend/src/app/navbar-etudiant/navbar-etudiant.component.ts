import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-etudiant',
  templateUrl: './navbar-etudiant.component.html',
  styleUrl: './navbar-etudiant.component.css'
})
export class NavbarEtudiantComponent {
  constructor(private authService:AuthService,private router:Router){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
