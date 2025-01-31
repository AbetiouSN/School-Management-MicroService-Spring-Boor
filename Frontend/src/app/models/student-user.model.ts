export class Student {
  id: number = 0;
  cin: string = '';
  codeAppogie: string = '';
  dateInscription: string = '';
  dateNaissance: string | null = null;
  niveau: string = '';
  moduleIds: number[] = [];
  userId: number = 0;
}

export class User {
  id: number = 0;
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  role: string = '';
}

export class StudentUser {
  student: Student = new Student();
  user: User = new User();
}
