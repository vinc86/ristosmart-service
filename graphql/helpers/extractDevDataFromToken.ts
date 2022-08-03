import { ApolloError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { ROLE } from "../shared/user";

export const extractDevDataFromToken = async (devToken: string) => {
  const token = JSON.parse(devToken);

  if (!token) {
    console.error("Token not sent");
    throw new ApolloError("Token not provided");
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET as string);
  console.log("token-verification", verified);
  const dev = JSON.parse(JSON.stringify(verified));
  if (dev.role !== ROLE.DEV) {
    throw new ApolloError("Action cannot be performed, not a developer");
  }
  return { dev };
};
