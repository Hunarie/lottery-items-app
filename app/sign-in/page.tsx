"use client";

import { useSession, signIn } from "next-auth/react";
export default function SignInPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if ( status === "unauthenticated") {
    signIn("azure-ad")
  }

  return <div>User is logged in as {session?.user.email}</div>;
}
