import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserSchema, UsersSchema, /* UserMutationSchema */ } from './users';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: UserSchema,
      users: UsersSchema,
    },
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'RootMutationType',
  //   fields: {
  //     newUsers: UserMutationSchema,
  //   },
  // }),
});

export default schema;
