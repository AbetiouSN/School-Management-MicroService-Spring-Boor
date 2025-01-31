import { Prof } from "./prof.model";
import { RegisterRequest } from "./register-request.model";  // Adjust path as needed

export interface ProfResponse {
  profDetails: {
    prof: Prof;
    registerRequest: RegisterRequest;  // Use the specific interface
  };
}
