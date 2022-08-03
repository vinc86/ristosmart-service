import { Schema } from "mongoose";
import DishSelection from "./DishSelection";

const MenuSection = new Schema({
  category: {
    type: "String",
    required: true,
    trim: true,
  },
  dishSelections: [DishSelection],
});

export default MenuSection;
