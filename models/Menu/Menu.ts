import { model, Schema, SchemaType } from "mongoose";
import { Menu } from "../../graphql/shared/restaurant";
import MenuSection from "./Section";

const MenuSchema = new Schema<Menu>(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    sections: [MenuSection],
  },
  {
    timestamps: true,
  }
);

export default model("menu", MenuSchema, "menus");
