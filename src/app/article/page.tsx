import * as React from "react";

import { ArticleCard } from "@/components/article/article-card";

export default function ArticlePage() {
  return (
    <div className="mt-1 flex flex-col gap-10 sm:gap-20 items-center justify-center ">
      <h1>halo</h1>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  );
}
