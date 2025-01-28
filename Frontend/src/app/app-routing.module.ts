import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './gards/adminGuard';
import { ProfGuard } from './gards/profGuard';
import { EtudiantGuard } from './gards/etudiantGuard';
import { SignupProfComponent } from "./signup-prof/signup-prof.component";

import { NiveauGuard } from './gards/niveauGuard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarEtudiantComponent } from './navbar-etudiant/navbar-etudiant.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: NavbarAdminComponent,canActivate:[AdminGuard], children:[
    { path: 'signup', component: SignupProfComponent },
  ]},


  {path:'etudiant',component:NavbarEtudiantComponent,canActivate: [EtudiantGuard],children:[
    { path: 'resetPassword', component: ResetPasswordComponent },
  ]},



  { path: 'prof', component: NavbarComponent,canActivate: [ProfGuard], children: [

  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
