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
import { ProfListComponent } from './list-prof/list-prof.component';
import { AjoutProfComponent } from './ajout-prof/ajout-prof.component';
import { ListEtudComponent } from './list-etud/list-etud.component';
import { AjoutEtudComponent } from './ajout-etud/ajout-etud.component';
import { ModifierProfComponent } from './modifier-prof/modifier-prof.component';
import { DetailsProfComponent } from './prof-detail/prof-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: NavbarAdminComponent,canActivate:[AdminGuard], children:[
    { path: 'signup', component: SignupProfComponent },
    { path: 'listProf', component: ProfListComponent },
    { path: 'ajoutProf', component: AjoutProfComponent },
    { path: 'listEtud', component: ListEtudComponent },
    { path: 'ajoutEtud', component: AjoutEtudComponent },
  ]},

  { path: 'admin/detailsProf/:id', component: DetailsProfComponent },



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
