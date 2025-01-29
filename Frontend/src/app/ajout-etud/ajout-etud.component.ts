import { Component, OnInit } from '@angular/core';
import { Etud } from '../models/etud.model';
import { EtudiantService } from '../services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-etud',
  templateUrl: './ajout-etud.component.html',
  styleUrl: './ajout-etud.component.css'
})
export class AjoutEtudComponent  implements OnInit{

  etud : Etud=new Etud;
  id:string='';

  constructor(private etudservice: EtudiantService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    
    // Si l'id n'est pas 0, on récupère les informations du professeur à modifier
    if (this.id !== '') {
      this.etudservice.etudByCodeApoge(this.id).subscribe(
        (data: Etud) => {
          this.etud = data;  // Remplir l'objet prof avec les données récupérées
        },
        (error) => {
          console.error('Error fetching etud details', error);
        }
      );
    }
  }

  ajouterEtud(): void {
    if (this.id === '') {
      // Ajouter un nouveau professeur
      this.etudservice.createEtud(this.etud).subscribe(
        (response: any) => {
          this.router.navigate(['/admin/listEtud']);
        },
        (error: any) => {
          console.error('Error registering Etud', error);
        }
      );
    } else {
      this.modifierEtud(this.etud.id, this.etud);
    }
  }

  modifierEtud(id: number, etud: Etud): void {
    // Modifier un professeur existant
    this.etudservice.updateEtud(id, etud).subscribe(
      (data: Etud) => {
        this.etud = data;
        this.router.navigate(['/admin/listEtud']);  // Rediriger vers la liste après modification
      },
      (error) => {
        console.error('Error updating Etud', error);
      }
    );
  }
}