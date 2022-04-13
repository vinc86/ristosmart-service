import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { ROLE, User } from "../graphql/shared/user";

const User = new Schema<User>(
  {
    firstName: {
      type: "String",
      trim: true,
    },
    lastName: {
      type: "String",
      trim: true,
    },
    restaurantId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
      },
    ],
    phone: {
      type: "String",
      trim: true,
    },
    email: {
      type: "String",
      trim: true,
      required: true,
    },
    password: {
      type: "String",
      required: true,
      trim: true,
    },
    role: {
      type: "String",
      required: true,
      enum: ROLE,
      default: ROLE.EMPLOYEE,
    },
  },
  {
    timestamps: true,
  }
);

export default model("user", User, "users");
