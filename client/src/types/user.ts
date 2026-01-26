export type UserRole = "SUPERADMIN" | "ADMIN" | "DONOR";

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
}
