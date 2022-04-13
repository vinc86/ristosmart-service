import restaurant from "./restaurant";
import users from "./user";

export default {
  Query: {
    ...restaurant.queries,
    ...users.Query,
  },
  Mutation: {
    ...restaurant.mutations,
    ...users.Mutation,
  },
};
