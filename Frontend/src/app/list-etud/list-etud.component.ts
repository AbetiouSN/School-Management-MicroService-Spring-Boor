import { Component } from '@angular/core';
import { Etud } from '../models/etud.model';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-etud',
  templateUrl: './list-etud.component.html',
  styleUrl: './list-etud.component.css'
})
export class ListEtudComponent {
 etudiants: Etud[] = [];
  searchTerm: string = '';

  constructor(private etudservice:EtudiantService,private router: Router) {}

  ngOnInit() {
    this.etudservice.listEtud().subscribe(
      data => {
        this.etudiants = data;
        console.log(this.etudiants);
      },
      error => console.log(error)
    );
  }

  ajouterEtud() {
    this.router.navigate(['/admin/ajoutEtud']);
  }

  modifierEtud(codeApoge: string) {
    alert(`Modifier etudiant`);
    this.router.navigate(['/admin/ajoutEtud',codeApoge]);
  }

  supprimerEtud(id: number): void {
      alert(`Vous êtes sûr de supprimer cet etudiant ?`);
      this.etudservice.deleteEtud(id).subscribe({
        next: data => {
          this.etudiants = data;
          alert(`Etudiant est supprime avec succes `);
        },
        error: error => {
          console.error(`There was an error deleting the Etud with ID ${id}:`, error);
          alert(`Error deleting Etudiant with ID ${id}: ${error.message}`);
        }
      });
  }

  // Fonction pour filtrer les professeurs par email
  filteredEtudiants(): Etud[] {
    if (!this.searchTerm) {
      return this.etudiants;  // Si aucun terme de recherche, retourner tous les professeurs
    }
    return this.etudiants.filter(etud => 
      etud.codeAppogie.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  
}

