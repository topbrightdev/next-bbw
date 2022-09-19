export default interface AuthServiceType {
  email: string;
  password: string;
}

export interface CreateUserType {
  email: string;
}

export interface DeleteUserType {
  uid: string;
}
