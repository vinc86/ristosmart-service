import { gql } from "apollo-server";

export default gql`
  type RestaurantContacts {
    email: String
    phone: String
  }

  type SocialMedia {
    facebook: String
    instagram: String
    twitter: String
  }

  type Restaurant {
    _id: ID
    ownerId: ID
    restaurantName: String
    menus: [String]
    contacts: RestaurantContacts
    socialMedia: SocialMedia
  }

  type User {
    _id: ID
    email: String
    role: Role
  }
  input restaurantContactsInput {
    email: String
    phone: String!
  }

  input SocialMediaInput {
    facebook: String
    instagram: String
    twitter: String
  }

  input registerRestaurantInput {
    restaurantName: String!
    ownerId: ID!
    contacts: restaurantContactsInput!
    socialMedia: SocialMediaInput
  }

  type Query {
    getRestaurant(id: String!): Restaurant!
    restaurants(ownerId: String!): [Restaurant]!
  }

  type Mutation {
    registerRestaurant(input: registerRestaurantInput): Restaurant!
    #registerOwner(input: registerInput): User!
  }
`;
