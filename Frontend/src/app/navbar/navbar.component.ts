import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isMenuCollapsed = true;
  constructor(private authService:AuthService,private router:Router){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
