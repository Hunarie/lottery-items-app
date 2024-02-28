"use client";

import { useSession, getSession, SessionProvider } from "next-auth/react";
export default function SignInPage() {
  const { data: session, status } = useSession();
  return <div>Test</div>;
}
