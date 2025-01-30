export class Prof {
  id?: number;
  cin: string = '';
  userId?: number;
  user: {
    firstname: string;
    lastname: string;
    email: string;
  };

  constructor() {
    this.user = {
      firstname: '',
      lastname: '',
      email: ''
    };
  }
}
