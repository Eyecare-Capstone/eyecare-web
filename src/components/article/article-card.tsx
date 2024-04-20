import * as React from "react";
import Image from "next/image";
import mata1 from "../../../public/mata1.jpg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { SlClock } from "react-icons/sl";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

// import "@/styles/scroll-table.module.css";

export function ArticleCard() {
  return (
    <Card className="w-96 h-28 sm:w-2/3 sm:h-[280px] flex gap-1 ">
      <Image src={mata1} alt="hero image" className="w-36 sm:w-96 rounded-sm" />
      <div className="w-full flex flex-col gap-1 sm:gap-2 ">
        <CardContent className="m-0 p-0 px-2 sm:px-5 flex flex-col gap-[4px] sm:gap-3 ">
          <div className="mt-2 sm:mt-3 flex justify-start items-center gap-[2px] sm:gap-1 text-[6px] sm:text-sm ">
            <SlClock />
            <p>
              11 Mar 2024 ·{" "}
              <span className="cursor-pointer hover:underline">
                Pengetahuan
              </span>
            </p>
          </div>
          <CardTitle className="font-bold text-xs sm:text-2xl">
            4 Jenis Tipe Kulit Wajah, Kamu Termasuk yang Mana Nih?
          </CardTitle>
          <CardDescription className="m-0 p-0 text-[8px] sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ea
            consequuntur placeat aut iste deserunt quam illum sit earum tempora?
          </CardDescription>
        </CardContent>
        <CardFooter className="m-0 p-0 pr-2 flex justify-end sm:h-full flex-grow">
          <Link
            href=""
            className="text-[7px] sm:text-lg text-blue-600 cursor-pointer flex hover:underline"
          >
            Baca selengkapnya
            <MdOutlineArrowOutward />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
