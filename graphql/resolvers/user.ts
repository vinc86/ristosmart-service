import { ApolloError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../models/User";

import {
  User,
  RegisterInput,
  LoginInput,
  LoginResponse,
  ROLE,
  /* UpdateInput, */
} from "../shared/user";
import { isAdmin } from "../helpers/isAdmin";
import { isAuthenticated } from "../helpers/isAuthenticated";
import { isRegistered } from "../helpers/isRegistered";
import { validateRegisterInputFields } from "../helpers/validateRegisterInputFields";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { sendAccessEmailToUser } from "../helpers/sendAccessEmailToUser";

export default {
  Query: {
    async getUsersList(): Promise<User[]> {
      const users = await UserModel.find();

      if (!users) {
        throw new ApolloError("Users list empty");
      }

      return users;
    },
    async getLoggedUser(_: void, args: any): Promise<User> {
      const userFormToken = JSON.parse(
        JSON.stringify(jwt.verify(args.input, process.env.JWT_SECRET as string))
      );

      const loggedUserData = await UserModel.findById(userFormToken._id);
      if (!loggedUserData) {
        throw new ApolloError(`User not found`);
      }
      return loggedUserData;
    },
    /* async getUserInfo(_: void, args: any): Promise<User> {
      const input = JSON.parse(JSON.stringify(args)).input;
      const user = await UserModel.findById(args.input);
      if (!user) {
        throw new ApolloError(`User not found`);
      }
      return user;
    }, */
  },
  Mutation: {
    async register(
      _: void,
      args: RegisterInput,
      ctx: { token: string }
    ): Promise<User> {
      //const admin = await isAdmin(ctx.token);
      const input = JSON.parse(JSON.stringify(args)).input;
      console.log(input);
      const { email, password, repeatPassword /* firstName  */ } = input;

      await validateRegisterInputFields(email, password, repeatPassword);
      /* if (admin) {
        console.log("admin is registering");

        await sendAccessEmailToUser(email, firstName, password);
      } */
      const element = await UserModel.findOne({ email });
      if (element) {
        throw new ApolloError(`User already registered
        `);
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = new UserModel({ ...input, password: hash }).save();
      console.log(user);
      return user;
    },

    async login(_: void, args: LoginInput): Promise<LoginResponse> {
      const input = JSON.parse(JSON.stringify(args)).input;
      const { email, password: inputPassword } = input;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new ApolloError("Email not registered");
      }

      const {
        _id,
        firstName,
        lastName,
        role,
        email: userEmail,
        restaurantId,
        password,
      } = user;

      const passwordMatch = bcrypt.compareSync(
        inputPassword,
        password as string
      );

      if (!passwordMatch) {
        throw new ApolloError("Password wrong");
      }

      const token = jwt.sign({ _id, role }, process.env.JWT_SECRET as string);

      if (!token) {
        throw new ApolloError("Failed to generate the token");
      }

      /* const data = {
        userData: {
          firstName,
          lastName,
          email: userEmail,
          restaurantId,
        },
        role,
        token,
      }; */

      return { token };
    },
  },
};
