import { ApolloError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { ROLE } from "../shared/user";

export const isDeveloper = async (token: string) => {
  const signedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  const { role } = JSON.parse(JSON.stringify(signedToken));

  if (role !== ROLE.DEV) {
    throw new ApolloError("Request denied, not a Developer");
  }
  return true;
};
