import { Restaurant } from "../shared/restaurant";
import RestaurantModel from "../../models/Restaurant";
import UserModel from "../../models/User";
export default {
  queries: {
    async restaurants(_: void, { ownerId }: { ownerId: string }) {
      const id = JSON.parse(JSON.stringify(ownerId));

      const restaurants = await RestaurantModel.find({ ownerId: id });
      console.log(restaurants);
      return restaurants;
      /* return [
        {
          _id: "0012",
          restaurantName: "partenope #081",
          menus: [],
          contacts: {
            email: "email@partenope.it",
            phone: +49030123456,
          },
          socialMedia: {
            facebook: "",
            instagram: "https://www.instagram.com/partenope__081/",
          },
          ownerId: "ert4321",
        },
        {
          _id: "0013",
          restaurantName: "partenope bar",
          menus: [],
          contacts: {
            email: "email@partenopebar.it",
            phone: +49030123789,
          },
          socialMedia: {
            facebook: "",
            instagram: "https://www.instagram.com/partenope__081/",
          },
          ownerId: "ert4321",
        },
      ]; */
    },
  },

  mutations: {
    async registerRestaurant(_: void, args: any): Promise<Restaurant> {
      console.log("args", args.input);

      const restaurant = new RestaurantModel({ ...args.input }).save();
      console.log(restaurant);
      await UserModel.findByIdAndUpdate(args.input.ownerId, {
        $push: {
          restaurantId: (await restaurant)._id,
        },
      });

      console.log(restaurant);
      return restaurant;
    },
  },
};
