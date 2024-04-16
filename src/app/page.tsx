import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World</h1>
      <Button>
        <Link href="/studio">Go to admin</Link>
      </Button>
      <Button>
        <Link href="/article">Go to Articles</Link>
      </Button>
    </main>

    // footer
  );
}
