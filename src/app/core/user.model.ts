import {Role} from "./role.model";

export interface User {
  token: string;
  username?: string;
  email?: string;
  role?: Role;
}
