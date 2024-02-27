import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodbtemp";
import { Adapter } from "next-auth/adapters";

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
      async jwt({ token, account }: any) {
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token}: any) {
        session.accessToken = token.accessToken
        return session
      }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }