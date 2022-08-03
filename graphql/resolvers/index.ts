import restaurant from "./restaurant";
import users from "./user";
import devs from "./dev";

export default {
  Query: {
    ...devs.queries,
    ...restaurant.queries,
    ...users.Query,
  },
  Mutation: {
    ...devs.mutations,
    ...restaurant.mutations,
    ...users.Mutation,
  },
};
