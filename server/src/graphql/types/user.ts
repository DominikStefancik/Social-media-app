export interface UserSelector {
  id?: string;
  username?: string;
}

export interface CreateUserData {
  username: string;
  password: string;
  confirmedPassword: string;
  email: string;
}
