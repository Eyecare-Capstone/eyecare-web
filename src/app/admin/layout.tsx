import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <Sidebar />
      <main className="ml-[220px] h-screen">{children}</main>
    </body>
  );
}
