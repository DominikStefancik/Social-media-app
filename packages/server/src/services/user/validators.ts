import { CreateUserData, LoginUserData } from '@local/graphql/types/user';
import * as express from 'express';
import { getAppConfig } from '@local/config';
import * as jwt from 'jsonwebtoken';
import { User } from '@local/db-store/user/model';
import { InputValidationErrors, UserValidationError } from '@local/errors/types';

export const validateCreateUserData = (data: CreateUserData): InputValidationErrors => {
  const { username, password, confirmedPassword, email } = data;
  const errors = {} as InputValidationErrors;

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmedPassword) {
    errors.password = 'Confirmed password has to be exactly the same as password';
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

export const validateUserLoginData = (data: LoginUserData): InputValidationErrors => {
  const { username, password } = data;
  const errors = {} as InputValidationErrors;

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
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
        throw new UserValidationError('Invalid/Expired token');
      }
    }
    throw new UserValidationError('Authentication token must be in the format "Bearer [token]"');
  }
  throw new UserValidationError('Authorisation header must be provided');
};
