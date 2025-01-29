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
    if (this.id === 0) {
      // Ajouter un nouveau professeur
      this.profservice.createProf(this.prof).subscribe(
        (response: any) => {
          this.router.navigate(['/admin/listProf']);
        },
        (error: any) => {
          console.error('Error registering Prof', error);
        }
      );
    } else {
      this.modifierProf(this.id, this.prof);
    }
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


