export interface UserSelector {
  id?: string;
  username?: string;
}

export interface UserFilter {
  id_in?: string[];
  username_in?: string[];
}

export interface CreateUserData {
  username: string;
  password: string;
  confirmedPassword: string;
  email: string;
}

export interface LoginUserData {
  username: string;
  password: string;
}
