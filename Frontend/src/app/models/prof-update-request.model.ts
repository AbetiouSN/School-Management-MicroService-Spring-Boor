export class ProfUpdateRequest {
  prof?: {
    id: number;
    cin: string;
    userId: number;
    moduleIds: number[];
  };
  registerRequest?: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  };
}
