export type InputValidationErrors = { [error: string]: string };

export class UserValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserValidationError';
  }
}

export class UserAuthorisationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserAuthorisationError';
  }
}

export class InputError extends Error {
  input: string;

  constructor(input: string, message: string) {
    super(message);
    this.name = 'InputError';
    this.input = input;
  }
}
