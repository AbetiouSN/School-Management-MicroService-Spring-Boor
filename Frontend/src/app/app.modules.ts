import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarEtudiantComponent } from './navbar-etudiant/navbar-etudiant.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupProfComponent } from './signup-prof/signup-prof.component';
import { CommonModule } from '@angular/common';
import { ProfListComponent } from './list-prof/list-prof.component';
import { AjoutProfComponent } from './ajout-prof/ajout-prof.component';
import { ListEtudComponent } from './list-etud/list-etud.component';
import { AjoutEtudComponent } from './ajout-etud/ajout-etud.component';
import { ModifierProfComponent } from './modifier-prof/modifier-prof.component';
import { DetailsProfComponent } from './prof-detail/prof-detail.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { EtudiantInterfaceComponent } from './etudiant-interface/etudiant-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    NavbarAdminComponent,
    SignupProfComponent,
    NavbarEtudiantComponent,
    ResetPasswordComponent,
    ProfListComponent,
    AjoutProfComponent,
    ListEtudComponent,
    AjoutEtudComponent,
    ModifierProfComponent,
    DetailsProfComponent,
    ModuleListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,// Assurez-vous que NgbModule est ajouté ici
    BrowserModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    CommonModule,
    CommonModule


  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
