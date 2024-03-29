import Link from "next/link";
import { Button } from "@/components/ui/button";

import { FaRegUser } from "react-icons/fa";
import { GrArticle } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
export const MenuButton = () => {
  const menuList = [
    {
      link: "/admin/users",
      icon: <FaRegUser size={20} />,
      text: "Users",
    },
    {
      link: "/admin/articles",
      icon: <GrArticle size={20} />,
      text: "Articles",
    },
    {
      link: "/admin/doctors",
      icon: <FaUserDoctor size={20} />,
      text: "Doctors",
    },
    {
      link: "/admin/maps",
      icon: <GrMapLocation size={20} />,
      text: "Maps",
    },
    {
      link: "/admin/admins",
      icon: <GrUserAdmin size={20} />,
      text: "Admins",
    },
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
