import { CreateUserData } from '@local/graphql/types/user';

type UserInputErrors = { [error: string]: string };

export const validateCreateUserData = (data: CreateUserData): UserInputErrors => {
  const { username, password, confirmedPassword, email } = data;
  const errors = {} as UserInputErrors;

  if (username.trim() === '') {
    errors.username = 'Username cannot be an empty string';
  }

  if (password.trim() === '') {
    errors.username = 'Password cannot be an empty string';
  } else if (password !== confirmedPassword) {
    errors.username = 'Confirmed password has to be exactly the same as password';
  }

  if (email.trim() === '') {
    errors.username = 'Email cannot be an empty string';
  } else {
    const emailRegex =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  return errors;
};
