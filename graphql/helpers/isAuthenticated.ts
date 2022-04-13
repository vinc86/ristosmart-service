import { AuthenticationError } from "apollo-server-errors";

export const isAuthenticated = async (token: string) => {
  if (!token) {
    throw new AuthenticationError("Token missing");
  }
  return true;
};
