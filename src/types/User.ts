/**
 * Represents a user in the system.
 */
export type User = {
  uid: string;
  email: string;
  name?: string;

  createdAt: string;
  updatedAt: string;
  lastLogin: string;

  userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE';
  answers: string[];
};

export type UserRecord = Pick<
  User,
  | 'uid'
  | 'email'
  | 'name'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLogin'
  | 'userLevel'
>;
