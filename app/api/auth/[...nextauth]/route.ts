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

async function refreshAccessToken(refreshToken: any, accessToken : any) {
  try {
    const url = "https://login.microsoftonline.com/835c9297-ee27-4b71-9146-faba6bf5e2b7/oauth2/v2.0/token"
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token` 
      + `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET}`
      + `&refresh_token=${refreshToken}`
      + `&client_id=${process.env.AZURE_AD_CLIENT_ID}` 
    })

    const refreshedTokens = await req.json();
    return refreshedTokens
    
  } catch (error) {
    console.log(error)

    return {
      ...accessToken,
      error: "RefreshAccessTokenError"
    }
  }
}

export const providerConfig = {

}
export const authOptions = {
  // Configure one or more auth providers
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "email openid profile offline_access User.Read.All"
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
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
      console.log(Date.now() / 1000 )
      console.log(data?.expires_at)
      if (Date.now() / 1000 < data?.expires_at) {
        console.log("Session not expired")
        return session
      }

      console.log(data?.refresh_token)
      console.log(data?.access_token)

      return refreshAccessToken(data?.refresh_token, data?.access_token)
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

