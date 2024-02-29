import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import { ListItems } from "../components/ListItems/ListItems";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function ItemsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      redirect('/api/auth/signin')
    )
  }

  return (
    <div>
      <AddItemForm />
      <ListItems />
    </div>
  );
}
