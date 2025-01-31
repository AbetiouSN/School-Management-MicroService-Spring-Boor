export interface StudentModule {
  student: {
    id: number;
    codeAppogie: string;
    cin: string;
    dateNaissance: string;
    dateInscription: string;
    niveau: string;
    userId: number;
    moduleIds: number[];
  };
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  };
}
