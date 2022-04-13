import { ApolloServer } from "apollo-server";
import express from "express";
import cors from "cors";
import connectApp from "./db";
import typeDefs from "./graphql/schemas/index";
import resolvers from "./graphql/resolvers/index";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

connectApp(server);
