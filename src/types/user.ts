export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  groupId: number | null;
  createdAt: string;
  updatedAt: string;
};
