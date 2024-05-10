"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(true);
  }, []);

  return (
    <div>
      {iframeLoaded && (
        <iframe
          src={process.env.NEXT_PUBLIC_LANDING_PAGE_URL}
          className="h-screen w-full"
        ></iframe>
      )}
    </div>
  );
}
