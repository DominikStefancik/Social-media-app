import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date Scalar Type',
  // Convert outgoing Date to ISO string for JSON
  serialize: (value) => {
    if (!(value instanceof Date)) {
      throw Error('The date value cannot be serialised.');
    }

    return value.toISOString();
  },
  // Convert incoming string to Date
  parseValue: (value) => {
    return new Date(value);
  },
  // Convert hard-coded string to Date
  parseLiteral: (valueNode) => {
    if (valueNode.kind === Kind.STRING) {
      return new Date(valueNode.value);
    }
    return null; // Invalid hard-coded value (not a string)
  },
});
