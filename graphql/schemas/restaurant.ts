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

  type MenuSelection {
    _id: ID
    dishName: String!
    description: String
    price: Float!
  }
  type MenuSection {
    _id: ID
    category: String!
    dishSelections: [MenuSelection]
  }
  type Menu {
    _id: ID!
    sections: [MenuSection]
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

  input AddMenuInput {
    restaurantId: ID!
    category: String!
    dishName: String!
    description: String
    price: Int!
  }
  type Query {
    getRestaurant(id: String!): Restaurant!
    restaurants(ownerId: String!): [Restaurant]!
    getMenu(restaurantId: String!): Menu!
  }

  type Mutation {
    registerRestaurant(input: registerRestaurantInput): Restaurant!
    addMenu(input: AddMenuInput!): Menu!
    #registerOwner(input: registerInput): User!
  }
`;
