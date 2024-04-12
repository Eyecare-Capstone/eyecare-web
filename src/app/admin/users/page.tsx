import { User, columns } from "./columns";
import { DataTable } from "@/components/common/data-table";

async function getData(): Promise<User[]> {
  const baseUrl = process.env.FAKE_API;
  const res = await fetch(`${baseUrl}/users`).then((res) => res.json());
  return res;
}

export default async function UsersPage() {
  const data = await getData();
  return (
    <div className="container mx-auto py-3 h-screen ">
      <DataTable columns={columns} data={data} addLabel="Add User" />
    </div>
  );
}
