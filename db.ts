import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

const devDbUri =
  "mongodb+srv://vincenzo:test@cluster0.uostm.mongodb.net/restaurant-app?retryWrites=true&w=majority";
const URI = process.env.MONGO_URI || devDbUri;

export default async (server: ApolloServer) => {
  const { connection } = await mongoose.connect(URI);
  console.log(`Db connection for ${connection.name} established`);

  try {
    server.listen(4000, () => {
      console.log("Server ready at http://localhost:4000");
    });
  } catch (error) {
    console.error(error);
  }
};
