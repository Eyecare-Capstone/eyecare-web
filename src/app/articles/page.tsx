"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArticleCard } from "@/components/articles/article-card";
import { BackButton } from "@/components/common/back-button";
import serverDown from "../../../public/server_down.svg";
import loadingImg from "../../../public/loading-yellow.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SelectLangButton } from "@/components/articles/select-lang-button";
import { deleteCookie } from "@/lib/actions";

export default function ArticlesPage() {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();
  const [lang, setLang] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [isEnable, setIsEnable] = useState(false);
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.clear();

    const searchParams = new URLSearchParams(window.location.search);
    const langParam = searchParams.get("lang") || "en";
    const typeParam = searchParams.get("type") || "";

    if ((langParam as string) !== "en" && (langParam as string) !== "id") {
      router.push("/articles?lang=en");
      return;
    }

    setLang(langParam);
    setType(
      typeParam === "nutritional"
        ? "nutritional"
        : type === "educational"
        ? "educational"
        : ""
    );

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
          .get(`${baseApi}/articles?lang=${lang}&type=${type}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          })
          .then((res) => res.data);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const res = axiosError.response?.data;
          console.log(res);
          if (res?.status == 401) {
            await deleteCookie("admin_data");
            await deleteCookie("access_token");
            await deleteCookie("refresh_token");
            router.push(`/auth?status=${res?.status}&message=${res?.message}"`);
          }
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
    <div className="py-10 sm:py-10 md:py-12 lg:py-16 flex flex-col items-center justify-center">
      <div>
        <BackButton hrefLink={`/`}>Back</BackButton>
        <SelectLangButton changeLanguage={changeLanguage} lang={lang} />
      </div>

      <h1 className="mt-10 lg:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold pb-3">
        Articles on Eye Care
      </h1>
      <p className="text-[10px] sm:text-xs md:text-base lg:text-lg brightness-50 mb-2 lg:mb-8">
        Discover interesting and beneficial articles to accompany your eye care
        routine.
      </p>
      {isSuccess && (
        <>
          {data?.length === 0 ? (
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold py-44  text-lpYellow">
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
