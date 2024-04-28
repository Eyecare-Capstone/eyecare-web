import { Sidebar } from "@/components/dashboard/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      <main className="ml-[220px] h-screen">{children}</main>
    </div>
  );
}
