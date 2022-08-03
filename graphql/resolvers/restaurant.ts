import { Restaurant, Menu } from "../shared/restaurant";
import RestaurantModel from "../../models/Restaurant";
import UserModel from "../../models/User";
import MenuModel from "../../models/Menu/Menu";
import { ApolloError } from "apollo-server";

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
    async getRestaurant(_: void, { id }: { id: string }): Promise<Restaurant> {
      return { menus: [""] };
    },
    async getMenu(
      _: void,
      { restaurantId }: { restaurantId: string }
    ): Promise<Menu> {
      const id = JSON.parse(JSON.stringify(restaurantId));
      const menu = await MenuModel.findOne({ restaurantId: id });
      if (!menu) {
        throw new ApolloError("Could not get menu");
      }
      console.log("menu", menu);
      return menu;
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
    async addMenu(_: void, args: any): Promise<Menu> {
      const { restaurantId, category, description, dishName, price } =
        args.input;

      const RestaurantMenu = new MenuModel({
        restaurantId,
        sections: [
          { category, dishSelections: [{ dishName, description, price }] },
        ],
      }).save();

      await RestaurantModel.findByIdAndUpdate(restaurantId, {
        $push: {
          menus: (await RestaurantMenu)._id,
        },
      });

      return RestaurantMenu;
    },
  },
};
