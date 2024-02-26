import NextAuth, { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodbtemp";
import { Adapter } from "next-auth/adapters";

const authOptions = {
    // Configure one or more auth providers
    providers: [
        AzureADProvider({
          clientId: process.env.AZURE_AD_CLIENT_ID!,
          clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
          tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    callbacks: {
      async session({ session, token }: any) {
        session.user.accessToken = token.accessToken
        return session
      }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }