import { SignInPage } from "../components/SignInPage/SignInPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignInPagee() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }
  return (
    <div>
      <SignInPage />
    </div>
  );
}
