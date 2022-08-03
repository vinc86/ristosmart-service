import { Schema, model } from "mongoose";
import { TDev } from "../graphql/shared/dev";
import { ROLE } from "../graphql/shared/user";

const DevSchema = new Schema<TDev>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: "String",
      required: true,
      enum: ROLE,
      default: ROLE.DEV,
    },
  },
  {
    timestamps: true,
  }
);

export default model("dev", DevSchema, "devs");
