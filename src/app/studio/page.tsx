import Image from "next/image";
import actionLogo from "../../../public/action.svg";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Image src={actionLogo} width={300} height={300} alt="ok" />
      <h1 className="text-2xl font-bold mt-3 ">Choose your action...</h1>
    </div>
  );
}
