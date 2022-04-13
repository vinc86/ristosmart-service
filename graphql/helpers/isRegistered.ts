import { ApolloError } from "apollo-server-errors";
import { Model } from "mongoose";
import { User } from "../../shared/user";

export const isRegistered = async (
  name: String,
  model: Model<User, {}, {}, {}>
): Promise<boolean> => {
  const element = await model.findOne(name);
  console.log(name);
  if (element) {
    throw new ApolloError(`${name} esiste in database
    `);
  }
  return false;
};
