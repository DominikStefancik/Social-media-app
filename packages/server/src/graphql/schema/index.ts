import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers } from '@local/graphql/resolvers/resolvers';
import { commonSchema } from './common';
import { mutationsSchema } from './mutations';
import { postInputs } from './post/inputs';
import { postTypes } from './post/types';
import { queriesSchema } from './queries';
import { userInputs } from './user/inputs';
import { userTypes } from './user/types';

export default makeExecutableSchema({
  typeDefs: [
    userTypes,
    userInputs,
    postTypes,
    postInputs,
    commonSchema,
    queriesSchema,
    mutationsSchema,
  ],
  resolvers,
});
