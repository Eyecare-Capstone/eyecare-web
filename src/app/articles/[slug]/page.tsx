"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { BackButton } from "@/components/common/back-button";
import serverDown from "../../../../public/server_down.svg";
import loadingImg from "../../../../public/loading-yellow.svg";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../../../../sanity/lib/image";
import { deleteCookie } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { TypedObject } from "sanity";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Article {
  title: string;
  articleType: string;
  language: string;
  publishedAt: string;
  titleImage: string;
  description: string;
  content: TypedObject[];
}

export default function DetailArticlePage({
  params,
}: {
  params: { slug: [] };
}) {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const slug = params.slug as any;
  const router = useRouter();
  const [language, setLanguage] = useState("");
  const [article, setArticle] = useState<any>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<Article>({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const res = await axios
          .get(`${baseApi}/articles/${slug}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((res) => res.data.data);

        setLanguage(res.language == "en" ? "English" : "Indonesia");
        return res;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const res = axiosError.response?.data;
          if (res?.status == 401) {
            await deleteCookie("admin_data");
            await deleteCookie("access_token");
            await deleteCookie("refresh_token");
            router.push(`/auth?status=${res?.status}&message=${res?.message}"`);
          }
          return 1;
        } else {
          console.log("Unknown Error:", error);
          return 1;
        }
      }
    },
  });

  useEffect(() => {
    if (
      (data?.title,
      data?.titleImage,
      data?.language,
      data?.publishedAt,
      data?.articleType,
      data?.content,
      data?.description)
    ) {
      setArticle(data);
      setTimeout(() => {}, 2000);
    }
  }, [data]);

  if (isLoading || !article) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <Image
          src={loadingImg}
          alt="loading yellow"
          className="w-56 py-2"
          priority
        />
        <h1 className="text-2xl font-bold mt-3">loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <Image src={serverDown} alt="server down" className="w-56" priority />
        <h1 className="text-2xl font-bold mt-3 ">
          <span className="text-lpYellow">500</span>: Server Error
        </h1>
      </div>
    );
  }

  return (
    <div className="py-20 px-72 flex flex-col items-center justify-center  ">
      {data == null && (
        <h1 className="text-2xl font-bold py-44 text-lpYellow">
          Not Available
        </h1>
      )}
      {article && (
        <>
          <BackButton hrefLink={`/articles?lang=${article?.language}`}>
            Back
          </BackButton>
          <div className="mt-7 md:mt-0 flex flex-col justify-center min-w-[500px] max-w-[800px] ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
              {data?.title}
            </h1>
            <Image
              src={article?.titleImage}
              width={300}
              height={300}
              className="w-[500px] md:w-[600px] lg:w-[800px] h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-md center mb-5"
              priority
              alt="title image"
            />

            <p className="text-base text-center text-lpYellow capitalize">
              {new Date(article?.publishedAt).toDateString()}
            </p>
            <hr className="bg-lpYellow mb-2  h-[4px]" />

            <div className="mt-6 mb-12 text-base md:text-lg lg:text-xl text-white prose prose-headings:font-bold prose-img:m-0 prose-headings:m-0 prose-headings:mb-2 prose-headings:text-white prose-headings:text-xl md:prose-headings:text-2xl lg:prose-headings:text-4xl prose-li:marker:text-lpYellow  prose-li:list-disc prose-li:leading-7 prose-li:ml-4">
              <PortableText
                value={article?.content}
                components={myPortableTextComponents}
              />
            </div>

            <p className="capitalize text-white/60 text-center">
              <Link
                href={`/articles?lang=${article?.language}&type=${article?.articleType}`}
                className="hover:underline hover:text-lpYellow"
              >
                {article?.articleType}
              </Link>
              {" - "}
              <Link
                href={`/articles?lang=${language}`}
                className="hover:underline hover:text-lpYellow"
              >
                {language}
              </Link>
            </p>
            {/* <div> */}
            <hr className="bg-lpYellow mt-2 h-[4px]" />
          </div>
        </>
      )}
    </div>
  );
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value)}
        alt="image"
        width={200}
        height={200}
        className="w-[500px] md:w-[600px] lg:w-[800px] h-[250px] md:h-[300px] lg:h-[350px] object-cover rounded-sm"
      />
    ),
  },
};
