import { binome } from "./binome.model";
import { groupe } from "./groupe.model";
import { user } from "./user.model";

export class etudiant {
  id: number = 0;
  nom:string='';
  cne:string='';
    prenom:string='';
    niveau : number=0;
    code_apoge:string='';
    id_user:user=new user;

    binome:binome=new binome();
    group:groupe=new groupe();
}
