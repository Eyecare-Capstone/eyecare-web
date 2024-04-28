import Image from "next/image";
import actionLogo from "../../../public/action.svg";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Image
        src={actionLogo}
        width={100}
        height={100}
        alt="ok"
        priority
        className="w-64 h-auto"
      />
      <h1 className="text-2xl font-bold mt-3 ">Choose your action...</h1>
    </div>
  );
}
