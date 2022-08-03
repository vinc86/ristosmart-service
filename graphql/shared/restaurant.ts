import mongoose, { ObjectId } from "mongoose";

type RestaurantContacts = {
  email: string;
  phone: string;
};

type SocialMedia = {
  facebook: string;
  instagram: string;
  twitter: string;
};
export type Restaurant = {
  _id?: string;
  ownerId?: mongoose.Types.ObjectId;
  restaurantName?: string;
  menus?: string[];
  contacts?: RestaurantContacts;
  socialMedia?: SocialMedia;
};

type DishSelection = {
  dishName: string;
  description?: string;
  price: number;
};
type Section = {
  category: string;
  dishes: DishSelection[];
};
export type Menu = {
  _id?: string;
  restaurantId?: ObjectId;
  sections?: Section[];
};
