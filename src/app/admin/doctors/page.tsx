import { useState } from "react";
import { Doctor, columns } from "./columns";
import { DataTable } from "@/components/common/data-table";
import { AddDoctorDialog } from "@/components/doctors/add-doctor-dialog";

async function getData(): Promise<Doctor[]> {
  const baseUrl = process.env.FAKE_API;
  const res = await fetch(`${baseUrl}/doctors`).then((res) => res.json());
  return res;
}

export default async function UsersPage() {
  // const [openAddDialog, setOpenAddDialog] = useState;

  const data = await getData();

  return (
    <div className="container mx-auto py-3 h-screen ">
      <DataTable columns={columns} data={data} addLabel="Add Doctor" />
      <AddDoctorDialog />
    </div>
  );
}
