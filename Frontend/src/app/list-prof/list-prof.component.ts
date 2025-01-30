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

  constructor(private profservice: ProfService, private router: Router) {}

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

  // Voir Détails - Redirection vers la page de détails du professeur
  voirDetails(id: number) {
    this.router.navigate([`/admin/detailsProf/${id}`]);  // Assurez-vous d'avoir une route définie pour cette page de détails
  }


  // Fonction pour modifier un professeur
  modifierProf(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/admin/ajoutProf', id]);
    } else {
      alert('ID non valide');
    }
  }

  supprimerProf(id: number | undefined): void {
    if (id !== undefined) {
      // Afficher un message de confirmation
      if (confirm('Vous êtes sûr de supprimer ce professeur ?')) {
        // Appeler le service de suppression
        this.profservice.deleteProf(id).subscribe({
          next: () => {
            // Si la suppression est réussie, filtrer la liste locale
            this.professeurs = this.professeurs.filter(prof => prof.id !== id);

            // Afficher un message de succès
            alert('Professeur supprimé avec succès');

            // Rediriger vers la liste des professeurs après suppression
            this.router.navigate(['/admin/profList']); // Redirection vers la liste
          },
          error: (error) => {
            // En cas d'erreur, afficher un message d'erreur
            console.error('Erreur lors de la suppression du professeur:', error);
            alert('Erreur de suppression : ' + error.message);
          }
        });
      }
    } else {
      alert('ID non valide');
    }
  }


  // Fonction pour filtrer les professeurs par email
  filteredProfesseurs(): Prof[] {
    if (!this.searchTerm) {
      return this.professeurs;
    }
    return this.professeurs.filter(prof =>
      prof.user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
