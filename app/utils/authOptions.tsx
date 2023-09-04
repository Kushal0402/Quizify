import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "./databaseConnection";
import User from "../models/User";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectToDb();

      try {
        const signedInUser = await User.findOne({
          email: user?.email,
        });

        if (signedInUser) {
          return true;
        } else {
          const newUser = new User({
            name: user?.name,
            email: user?.email,
            image: user?.image,
          });

          await newUser.save();
          return true;
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    async session({ session }) {
      const signedInUser = await User.findOne({
        email: session?.user?.email,
      });

      const newSession = {
        ...session,
          user: {
            ...session.user,
            id: signedInUser._id.toString(),
          },
      };

      return newSession;
    },
  },
};

export default authOptions;
