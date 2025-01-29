import { Component, OnInit } from '@angular/core';
import { Prof } from '../models/prof.model';
import { ProfService } from '../services/prof.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prof-list',
  templateUrl: './list-prof.component.html',
  styleUrls: ['./list-prof.component.css']
})
export class ProfListComponent implements OnInit {
  professeurs: Prof[] = [];
  searchTerm: string = '';

  constructor(private profservice:ProfService,private router: Router) {}

  ngOnInit() {
    this.profservice.listProf().subscribe(
      data => {
        this.professeurs = data;
        console.log(this.professeurs);
      },
      error => console.log(error)
    );
  }

  ajouterProf() {
    this.router.navigate(['/admin/ajoutProf']);
  }

  modifierProf(id: number) {
    alert(`Modifier professeur`);
    this.router.navigate(['/admin/ajoutProf',id]);
  }

  supprimerProf(id: number): void {
      alert(`Vous êtes sûr de supprimer ce professeur ?`);
      this.profservice.deleteProf(id).subscribe({
        next: data => {
          this.professeurs = data;
          alert(`Professeur est supprime avec succes `);
        },
        error: error => {
          console.error(`There was an error deleting the Prof with ID ${id}:`, error);
          alert(`Error deleting Prof with ID ${id}: ${error.message}`);
        }
      });
  }

  // Fonction pour filtrer les professeurs par email
  filteredProfesseurs(): Prof[] {
    if (!this.searchTerm) {
      return this.professeurs;  // Si aucun terme de recherche, retourner tous les professeurs
    }
    return this.professeurs.filter(prof => 
      prof.user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  
}
