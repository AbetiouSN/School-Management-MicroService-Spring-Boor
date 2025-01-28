import { user } from './user.model';

export class Prof {
  id: string = '';
  nom: string = '';
  prenom: string = '';
  departement: string = '';
  user: user = new user(); 
}
