"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { BackButton } from "@/components/common/back-button";
import serverDown from "../../../../public/server_down.svg";
import loadingImg from "../../../../public/loading-yellow.svg";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../../../../sanity/lib/image";

export default function ArticlePage({ params }: { params: { slug: [] } }) {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const slug = params.slug;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const res = await axios
          .get(`${baseApi}/articles/${slug}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((res) => res.data);
        console.log(res);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response);
          return 1;
        } else {
          console.log("Unknown Error:", error);
          return 1;
        }
      }
    },
  });

  if (isLoading) {
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
    <div className="py-28 px-72 flex flex-col items-center justify-center ">
      <BackButton hrefLink={`/articles/lang=${data?.language}`}>
        Back
      </BackButton>
      {data == null && (
        <h1 className="text-2xl font-bold py-44 text-lpYellow">
          Not Available
        </h1>
      )}
      {/* {isSuccess && } */}
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-5 text-center">{data?.title}</h1>
        <Image
          width={500}
          height={500}
          className="w-[500px] self-center"
          src={data?.titleImage}
          alt="title image"
        />
        <hr className="bg-lpYellow my-5 h-1" />
        <p className="text-base text-center text-lpYellow capitalize">
          {data?.publishedAt}
        </p>
        <p>{data?.articleType}</p>

        <div className={richText}>
          <PortableText
            value={data?.content}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlForImage(value)} alt="image" width={700} height={700} />
    ),
  },
};

const richText = `
text-2xl 
text-justify
prose-heading:my-5 
prose-heading:text-2xl
prose-p:mb-5
porse-:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
