import { user } from './user.model';

export class Etud {
  id: number =0;
  cin:string='';
  niveau:string='';
  dateInscription:string='';
  dateNaissance:string='';
  codeAppogie:string='';
  user: user = new user(); 
}