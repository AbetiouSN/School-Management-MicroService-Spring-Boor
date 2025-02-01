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
import { ModuleListComponent } from './module-list/module-list.component';
import { EtudiantInterfaceComponent } from './etudiant-interface/etudiant-interface.component';
import { ProfInterfaceComponent } from './prof-interface/prof-interface.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: NavbarAdminComponent, children:[
    { path: 'signup', component: SignupProfComponent },
    { path: 'listProf', component: ProfListComponent },
    { path: 'ajoutProf', component: AjoutProfComponent },
    { path: 'listEtud', component: ListEtudComponent },
    { path: 'ajoutEtud', component: AjoutEtudComponent },
    { path: 'detailsProf/:id', component: DetailsProfComponent },
    { path: 'modules', component: ModuleListComponent}
  ]},





  {path:'etudiant',component:NavbarEtudiantComponent,children:[
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'profile',component: EtudiantInterfaceComponent},
  ]},

  { path: 'prof', component: NavbarComponent, children: [
    {path: 'profile', component: ProfInterfaceComponent}

  ]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
