import { validateRegisterInputFields } from "../helpers/validateRegisterInputFields";
import Dev from "../../models/Devs";
import User from "../../models/User";
import { ApolloError } from "apollo-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TDev } from "../shared/dev";
import { Document } from "mongoose";
import { extractDevDataFromToken } from "../helpers/extractDevDataFromToken";
import { isDeveloper } from "../helpers/isDeveloper";

export default {
  queries: {
    async getDevs(): Promise<Document<TDev>[]> {
      const devs = await Dev.find();
      return devs;
    },
    async getLoggedDev(_: void, _args: any, ctx: any): Promise<TDev> {
      console.log("context", ctx);

      const { dev } = await extractDevDataFromToken(ctx["dev-token"]);
      return {
        _id: dev._id,
        email: dev.email,
        username: dev.username,
        role: dev.role,
      };
    },
  },
  mutations: {
    async registerDev(
      _: void,
      args: { email: string; password: string }
    ): Promise<TDev> {
      const input = JSON.parse(JSON.stringify(args)).input;
      console.log(input);
      const { email, password } = input;

      await validateRegisterInputFields(email, password);

      const dev = await Dev.findOne({ email });
      if (dev) {
        throw new ApolloError(`Developer already registered`);
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = new Dev({
        email: input.email,
        username: "dev",
        password: hash,
      }).save();

      return user;
    },
    async loginDev(
      _: void,
      args: { emailOrUsername: string; password: string }
    ): Promise<{ token: string }> {
      const input = JSON.parse(JSON.stringify(args)).input;
      const { emailOrUsername, password: inputPassword } = input;

      const dev =
        (await Dev.findOne({ email: emailOrUsername })) ||
        (await Dev.findOne({ username: emailOrUsername }));

      if (!dev) {
        throw new ApolloError("Not found");
      }
      console.log("loginDev result:", dev);
      const { _id, role, email, username, password } = dev;

      const passwordMatch = bcrypt.compareSync(
        inputPassword,
        password as string
      );

      if (!passwordMatch) {
        throw new ApolloError("Password wrong");
      }

      const token = jwt.sign(
        { _id, role, username, email },
        process.env.JWT_SECRET as string
      );

      if (!token) {
        throw new ApolloError("Failed to generate the token");
      }

      return { token };
    },
    async deleteOwnerData(_: any, args: any, ctx: any): Promise<boolean> {
      const devCheck = await isDeveloper(ctx["dev-token"]);

      if (!devCheck) {
        return false;
      }

      const deleteQuery = await User.findByIdAndDelete(args._id);
      if (!deleteQuery) {
        throw new ApolloError("Impossible to delete, not found");
      }

      return true;
    },
  },
};
