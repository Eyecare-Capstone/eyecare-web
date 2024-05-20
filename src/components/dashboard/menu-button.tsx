import Link from "next/link";
import { Button } from "@/components/ui/button";

import { FaRegUser } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { BiClinic } from "react-icons/bi";

export const MenuButton = () => {
  const menuList = [
    {
      link: "/dashboard/users",
      icon: <FaRegUser size={20} />,
      text: "Users",
    },
    {
      link: "/dashboard/admins",
      icon: <GrUserAdmin size={20} />,
      text: "Admins",
    },
    {
      link: "/dashboard/clinics",
      icon: <BiClinic size={20} />,
      text: "Clinics",
    },
    {
      link: "/dashboard/articles",
      icon: <GrArticle size={20} />,
      text: "Articles",
    },
    // {
    //   link: "/dashboard/maps",
    //   icon: <GrMapLocation size={20} />,
    //   text: "Maps",
    // },
  ];

  return (
    <div className="flex flex-col gap-1 max-w-full my-7">
      {menuList.map((menu, i) => (
        <Link key={i} href={menu.link} className="w-full">
          <Button variant="ghost" className="gap-2 justify-start w-full">
            <span>{menu.icon}</span> {menu.text}
          </Button>
        </Link>
      ))}
    </div>
  );
};
