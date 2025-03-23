
export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

export interface Patent {
  id: string;
  name: string;
  registrationDate: string;
  uid: string;
  documentUrl?: string;
  status?: PatentStatus;
  type?: PatentType;
  createdAt: string;
  updatedAt: string;
}

export enum PatentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum PatentType {
  TRADEMARK = 'TRADEMARK',
  COPYRIGHT = 'COPYRIGHT',
  PATENT = 'PATENT',
  DESIGN = 'DESIGN',
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
