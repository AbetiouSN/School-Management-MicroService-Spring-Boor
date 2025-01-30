import { Component, OnInit } from '@angular/core';
import { Prof } from '../models/prof.model';
import { ProfService } from '../services/prof.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-prof',
  templateUrl: './ajout-prof.component.html',
  styleUrl: './ajout-prof.component.css'
})
export class AjoutProfComponent implements OnInit{

  prof : Prof = new Prof;
  id:number=0;

  constructor(private profservice: ProfService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    // Si l'id n'est pas 0, on récupère les informations du professeur à modifier
    if (this.id !== 0) {
      this.profservice.ProfById(this.id).subscribe(
        (data: Prof) => {
          this.prof = data;  // Remplir l'objet prof avec les données récupérées
        },
        (error) => {
          console.error('Error fetching prof details', error);
        }
      );
    }
  }

  ajouterProf(): void {
    // Ajouter un nouveau professeur sans vérifier l'id (ajout pur)
    const newProf: Prof = {
      cin: this.prof.cin,
      user: {
        firstname: this.prof.user.firstname,
        lastname: this.prof.user.lastname,
        email: this.prof.user.email
      }
    };

    // Appel pour créer un professeur (ajout uniquement)
    this.profservice.createProf(newProf).subscribe(
      (response: any) => {
        console.log('Professeur ajouté avec succès', response);
        this.router.navigate(['/admin/listProf']);  // Rediriger vers la liste des professeurs après ajout
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du professeur', error);
      }
    );
  }




  modifierProf(id: number, prof: Prof): void {
    // Modifier un professeur existant
    this.profservice.UpdateProf(id, prof).subscribe(
      (data: Prof) => {
        this.prof = data;
        this.router.navigate(['/admin/listProf']);  // Rediriger vers la liste après modification
      },
      (error) => {
        console.error('Error updating Prof', error);
      }
    );
  }
}


