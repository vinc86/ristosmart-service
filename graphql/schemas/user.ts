import { gql } from "apollo-server";

export default gql`
  enum Role {
    OWNER
    ADMIN
    EMPLOYEE
    DEV
  }

  type User {
    _id: ID!
    restaurantId: [ID]
    firstName: String
    lastName: String
    email: String
    role: Role
    phone: String
    createdAt: String
    updatedAt: String
  }

  input registerInput {
    email: String!
    password: String!
    repeatPassword: String!
    role: Role!
  }
  type LoggedUserData {
    email: String!
    restaurantId: [ID!]!
    firstName: String!
    lastName: String!
  }

  type LoginResponse {
    #userData: LoggedUserData
    #role: Role!
    token: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsersList: [User!]!
    #getUserInfo(input: String!): User!
    getLoggedUser(input: String!): User!
  }

  type Mutation {
    register(input: registerInput): User!
    login(input: loginInput): LoginResponse!
  }
`;
