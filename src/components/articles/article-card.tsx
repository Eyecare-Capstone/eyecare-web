import * as React from "react";
import Image from "next/image";

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

export function ArticleCard({
  publishedAt,
  articleType,
  title,
  titleImage,
  description,
  slug,
  changeType,
}: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <Card className="mt-16 w-96 h-28 sm:w-2/3 sm:h-[280px] flex gap-1 border-2  border-lpYellow/75">
      <Image
        src={titleImage}
        width={450}
        height={450}
        alt="hero image"
        className="w-36 sm:w-[400px] rounded-sm  object-cover"
        priority
      />
      <div className="w-full flex flex-col gap-1 sm:gap-2 justify-between">
        <CardContent className=" m-0 p-0 px-2 sm:px-5 flex flex-col gap-[4px] sm:gap-3 ">
          <div className="mt-2 sm:mt-3 flex justify-start items-center gap-[2px] sm:gap-1 text-[6px] sm:text-sm ">
            <SlClock />
            <p>
              {new Date(publishedAt).toDateString()} ·{" "}
              <span
                className="cursor-pointer hover:underline"
                onClick={() => changeType(articleType)}
              >
                {articleType}
              </span>
            </p>
          </div>
          <CardTitle className="font-bold text-xs sm:text-2xl">
            {title}
          </CardTitle>
          <CardDescription className="m-0 p-0 text-[8px] sm:text-base">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="group m-0 p-0 pb-2 pr-3 flex justify-end sm:h-8">
          <Link
            href={`${baseUrl}/articles/${slug}`}
            className="text-[7px] sm:text-sm text-blue-600 cursor-pointer flex hover:underline"
          >
            Baca selengkapnya
            <MdOutlineArrowOutward className="group-hover:scale-110 " />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
