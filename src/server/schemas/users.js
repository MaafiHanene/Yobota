import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';
import dummyData from '../data/data';

// import axios from 'axios';

const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    industry: { type: GraphQLString },
    years_of_experience: { type: GraphQLFloat },
    salary: { type: GraphQLFloat },
    date_of_birth: { type: GraphQLString },
  },
});

// const baseURL = process.env.BACKEND_SERVICES_URL;

const activityResolver = async ({ type, id, lang }) => {
  // let result = await axios.get(`${baseURL}/user?lang=${lng}`);
  // const lng = lang || 'en';
  let result = dummyData;
  if (id) {
    result = result.filter((activity) => activity.id === id);
    return result[0];
  }
  if (type !== undefined) {
    result = result.filter((activity) => activity.type === type);
  }
  return result;
};

const LanguageEnumType = new GraphQLEnumType({
  name: 'LanguageType',
  values: {
    EN: { value: 'en' },
    FR: { value: 'fr' },
    ES: { value: 'es' },
  },
});

const UserSchema = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
    lang: { type: LanguageEnumType },
  },
  // eslint-disable-next-line no-undef
  resolve: (_, { id, lang }) => activityResolver({ id, lang }),
};

const UsersSchema = {
  type: new GraphQLList(UserType),
  args: {
    // type: { type: ActivityEnumType },
    lang: { type: LanguageEnumType },
  },
  // eslint-disable-next-line no-undef
  resolve: (_, { type, lang }) => activityResolver({ type, lang }),
};

export {
  activityResolver,
  UserType,
  LanguageEnumType,
  UserSchema,
  UsersSchema,
};
