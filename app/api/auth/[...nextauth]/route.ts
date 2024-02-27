import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodbtemp";
import { Adapter } from "next-auth/adapters";
import { connectToDB } from "../../../lib/connectDB";
import { ObjectId } from "mongodb";

// Need tenant enviroment variable
const MICROSOFT_AUTHORIZATION_URL =
  "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

export const authOptions = {
  // Configure one or more auth providers
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async session({ session, token, user }: any) {
      const account = await connectToDB();
      const userIDAsObject = new ObjectId(user.id);
      const data = await account.findOne({ userId: userIDAsObject });

      let accessToken;
      if (data) {
        accessToken = data.access_token;
      }

      if (session) {
        session.user._id = user.id;
        session.user.accessToken = accessToken;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// DO THIS FOR REFRESH ACCESS ACCORDING TO MS OAUTh2 SPEC https://next-auth.js.org/v3/tutorials/refresh-token-rotation
