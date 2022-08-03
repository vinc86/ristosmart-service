import { gql } from "apollo-server";

export default gql`
  type Dev {
    _id: ID!
    email: String
    username: String
    password: String
    role: String
  }
  type loginResponse {
    token: String!
  }

  input registerDevInput {
    email: String!
    password: String!
  }
  input loginDevInput {
    emailOrUsername: String!
    password: String!
  }
  type Query {
    getDevs: [Dev!]!
    getLoggedDev: Dev!
  }
  type Mutation {
    registerDev(input: registerDevInput): Dev
    loginDev(input: loginDevInput): loginResponse
    deleteOwnerData(_id: ID!): Boolean!
  }
`;
