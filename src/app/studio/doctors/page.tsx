import { Doctor, columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { AddDoctorDialog } from "@/components/doctors/add-doctor-dialog";

// async function getData(): Promise<Doctor[]> {
//   const baseUrl = process.env.FAKE_API;
//   const res = await fetch(`${baseUrl}/doctors`).then((res) => res.json());
//   return res;
// }

export default async function UsersPage() {
  // const data = await getData();

  return (
    <div className="container mx-auto py-3 h-screen ">
      {/* <DataTable
        columns={columns}
        data={data}
        addDialog={<AddDoctorDialog />}
      /> */}
      <h1>hello</h1>
    </div>
  );
}
