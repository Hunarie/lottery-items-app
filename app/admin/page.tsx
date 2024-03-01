import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreateForm from "../components/CreateForm/CreateForm";

export default async function FormCreationPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      redirect('sign-in')
    )
  }

  return (
    <div>
        <CreateForm />
    </div>
  );
}
