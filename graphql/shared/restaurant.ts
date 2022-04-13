import mongoose from "mongoose";

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
  _id: string;
  ownerId: mongoose.Types.ObjectId;
  restaurantName: string;
  menus: String[];
  contacts: RestaurantContacts;
  socialMedia: SocialMedia;
};
