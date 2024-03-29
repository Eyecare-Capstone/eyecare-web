import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <Sidebar />
      <main className="ml-[300px]">{children}</main>
    </body>
  );
}
