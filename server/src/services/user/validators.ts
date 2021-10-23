import { CreateUserData, LoginUserData } from '@local/graphql/types/user';
import * as express from 'express';
import { getAppConfig } from '@local/config';
import * as jwt from 'jsonwebtoken';
import { User } from '@local/db-store/user/model';

type UserInputErrors = { [error: string]: string };

export const validateCreateUserData = (data: CreateUserData): UserInputErrors => {
  const { username, password, confirmedPassword, email } = data;
  const errors = {} as UserInputErrors;

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.username = 'Password must not be empty';
  } else if (password !== confirmedPassword) {
    errors.username = 'Confirmed password has to be exactly the same as password';
  }

  if (email.trim() === '') {
    errors.username = 'Email must not be empty';
  } else {
    const emailRegex =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  return errors;
};

export const validateUserLoginData = (data: LoginUserData): UserInputErrors => {
  const { username, password } = data;
  const errors = {} as UserInputErrors;

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.username = 'Password must not be empty';
  }

  return errors;
};

export const validateUserAuthorisation = (request: express.Request): User => {
  const { jwtTokenSecret } = getAppConfig();
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, jwtTokenSecret);

        return user as User;
      } catch (error) {
        throw Error('Invalid/Expired token');
      }
    }
    throw new Error('Authentication token must be in the format "Bearer [token]"');
  }
  throw new Error('Authorisation header must be provided');
};
