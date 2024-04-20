import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/common/navbar";
import { HeroSection } from "@/components/common/hero-section";

export default function Home() {
  return (
    <main className="bg-lpPurple h-screen w-full">
      <Navbar />

      <HeroSection />
    </main>
  );
}
