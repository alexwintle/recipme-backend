export interface User {
  uid: string;
  username: string;
  status: 'active' | 'deleted'
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}