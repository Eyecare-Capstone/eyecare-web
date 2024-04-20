import { Sidebar } from "@/components/studio/sidebar";
import TanstackProvider from "@/lib/TanstackProvider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <Sidebar />
      <TanstackProvider>
        <main className="ml-[220px] h-screen">{children}</main>
      </TanstackProvider>
    </body>
  );
}
