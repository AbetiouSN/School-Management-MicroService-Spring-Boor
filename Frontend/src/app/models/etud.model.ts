import { user } from './user.model';

export class Etud {
    id: number = 0;
    cin: string = '';  // Vérifie que c'est bien là
    niveau: string = '';  // Vérifie que c'est bien là
    dateInscription: string = '';  // Vérifie que c'est bien là
    dateNaissance: string = '';
    codeAppogie: string = '';
    user: user = new user();
  }
