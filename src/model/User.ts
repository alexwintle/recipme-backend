export interface User {
  uid: string;
  username: string;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED'
}