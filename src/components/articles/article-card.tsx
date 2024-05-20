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
    <Card className="mt-6 sm:mt-8 lg:mt-10 w-8/12 sm:w-8/12 md:w-8/12 lg:w-8/12 max-w-[800px] h-40 sm:h-44 md:h-60 lg:h-64 flex gap-1 border-2 border-lpYellow/75">
      <Image
        src={titleImage}
        width={500}
        height={450}
        alt="hero image"
        className="w-5/12 h-auto rounded-l-sm object-cover"
        priority
      />
      <div className="w-full flex flex-col gap-1  justify-between">
        <CardContent className=" m-0 p-0 px-2 md:px-3 lg:px-5 flex flex-col gap-3 ">
          <div className="mt-3 flex justify-start items-center gap-1 text-[6px] sm:text-xs md:text-sm lg:text-sm">
            <SlClock />
            <p>
              {new Date(publishedAt).toDateString()} ·{" "}
              <span
                className="cursor-pointer hover:underline capitalize"
                onClick={() => changeType(articleType)}
              >
                {articleType}
              </span>
            </p>
          </div>
          <CardTitle className="font-bold text-xs md:text-lg lg:text-2xl">
            {title}
          </CardTitle>
          <CardDescription className="m-0 p-0  text-[8px] md:text-xs lg:text-sm">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="group m-0 p-0 pb-2 pr-3 flex justify-end md:h-5 lg:h-8">
          <Link
            href={`${baseUrl}/articles/${slug}`}
            className="text-[7px] md:text-xs lg:text-sm text-blue-600 cursor-pointer flex hover:underline"
          >
            Baca selengkapnya
            <MdOutlineArrowOutward className="group-hover:scale-110 " />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
