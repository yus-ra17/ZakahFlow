export interface MosqueAdmin {
  id: string;
  name?: string; // name is optional
  email: string;
  mosqueId?: string; // optional foreign key to Mosque
  createdAt: string; // Date string from API
}
