import { Schema } from "mongoose";

const DishSelection = new Schema({
  dishName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
});

DishSelection.path("price").get((num: number) => (num / 100).toFixed(2));
DishSelection.path("price").set((num: number) => num * 100);

export default DishSelection;
