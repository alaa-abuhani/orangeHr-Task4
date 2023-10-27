export interface ICreateUserPayload {
user: {
  username: string;
  password: string;
  status: boolean;
  userRoleId: number;
  empNumber: number;
  };
}
