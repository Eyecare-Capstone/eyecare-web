"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArticleCard } from "@/components/articles/article-card";
import { BackButton } from "@/components/common/back-button";
import serverDown from "../../../public/server_down.svg";
import loadingImg from "../../../public/loading-yellow.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SelectLangButton } from "@/components/articles/select-lang-button";

export default function ArticlesPage() {
  const baseAPI = process.env.NEXT_PUBLIC_BASE_API;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();
  const [lang, setLang] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [isEnable, setIsEnable] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const lang = searchParams.get("lang");
    const type = searchParams.get("type");

    if (!lang) {
      router.push("/articles?lang=en");
    }

    if (lang == "en") {
      setLang("en");
    } else if (lang == "id") {
      setLang("id");
    } else {
      router.push("/articles?lang=en");
    }

    if (type == "nutritional") {
      setType("nutritional");
    } else if (type == "educational") {
      setType("educational");
    } else {
      setType("");
    }

    setTimeout(() => {
      setIsEnable(true);
    }, 500);
  }, []);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles"],
    enabled: isEnable,
    queryFn: async () => {
      try {
        const res = await axios
          .get(
            `${baseAPI}/articles?lang=${lang ? lang : "en"}&type=${
              type ? type : ""
            }`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          )
          .then((res) => res.data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log(axiosError.response);
          return [];
        } else {
          console.log("Unknown Error:", error);
          return [];
        }
      }
    },
  });

  const changeLanguage = (newLang: string) => {
    const url = new URL(window.location.href); // Parse current URL
    const searchParams = new URLSearchParams(url.search); // Extract query params
    searchParams.set("lang", newLang); // Update lang parameter
    const newURL = `${pathname}?${searchParams.toString()}`;
    router.push(newURL);

    setTimeout(() => {
      location.reload();
    }, 300);
  };

  const changeType = (newType: string) => {
    const url = new URL(window.location.href); // Parse current URL
    const searchParams = new URLSearchParams(url.search); // Extract query params
    searchParams.set("type", newType); // Update lang parameter
    const newURL = `${pathname}?${searchParams.toString()}`;
    router.push(newURL);
    setTimeout(() => {
      location.reload();
    }, 300);
  };

  if (isLoading || !isEnable) {
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
    <div className="py-16 flex flex-col  items-center justify-center">
      <div>
        <BackButton hrefLink={`/`}>Back</BackButton>
        <SelectLangButton changeLanguage={changeLanguage} lang={lang} />
      </div>

      <h1 className="text-5xl font-bold pb-3">Articles on Eye Care</h1>
      <p className="text-lg brightness-50">
        Discover interesting and beneficial articles to accompany your eye care
        routine.
      </p>
      {isSuccess && (
        <>
          {data?.length === 0 ? (
            <h1 className="text-2xl font-bold py-44 text-lpYellow">
              No articles available
            </h1>
          ) : (
            data?.map((article: any, index: any) => (
              <ArticleCard
                key={index}
                publishedAt={article.publishedAt}
                articleType={article.articleType}
                language={article.language}
                title={article.title}
                description={article.description}
                slug={article.slug}
                titleImage={article.titleImage}
                changeType={changeType}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
