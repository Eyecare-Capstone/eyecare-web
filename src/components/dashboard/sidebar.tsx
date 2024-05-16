import { MenuButton } from "./menu-button";

// import { GiCyberEye } from "react-icons/gi";
import Eye1 from "../../../public/eye1.png";
import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <aside className="w-[220px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        {/* <GiCyberEye className="ml-2" size={100} /> */}
        <Image
          src={Eye1}
          alt="eye image"
          width={150}
          height={150}
          className="w-auto h-auto"
        />
        <h3 className="mx-3 my-7 te xt-lg font-semibold text-foreground">
          Admin Page
        </h3>
        <MenuButton />

        <Button className="w-full justify-center text-white" variant="default">
          <Link href="/"> Go to landing-page</Link>
        </Button>
        <UserMenu />
      </div>
    </aside>
  );
};
