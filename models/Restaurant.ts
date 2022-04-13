import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { Restaurant } from "../graphql/shared/restaurant";

const Restaurant = new Schema<Restaurant>(
  {
    restaurantName: {
      type: "String",
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
      },
    ],
    contacts: {
      email: { type: "String", required: true, trim: true },
      phone: { type: "String", required: true, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

export default model("restaurant", Restaurant, "restaurants");
