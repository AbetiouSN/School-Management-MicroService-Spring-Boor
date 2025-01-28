import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  public isMenuCollapsed = true;
  constructor(private authService:AuthService,private router:Router){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
