import { CourseModule } from "./module.model";
import { Prof } from "./prof.model";

export interface ProfModulesResponse {
  modules: CourseModule[];
  profDetails: {
    prof: Prof;
    registerRequest: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      role: string;
    };
  };
}
