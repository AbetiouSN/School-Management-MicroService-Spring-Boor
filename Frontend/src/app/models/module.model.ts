export class CourseModule {
  id!: number;  // ID du module
  moduleName!: string;  // Nom du module
  nombreHeures!: number;  // Nombre d'heures du module
  semestre!: string;  // Semestre du module
  profId!: number;  // ID du professeur
  studentIds!: number[];  // Liste des IDs des étudiants affectés à ce module
  selectedNiveau: string=''; // Ajout de la propriété selectedNiveau

}
