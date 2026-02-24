import { Sidebar } from "@/components/layout/sidebar";
import "./globals.css";

export const metadata = {
  title: "Admin — Handyman Services",
  description: "Handyman Services administravimo skydas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt">
      <body className="min-h-screen">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-[var(--sidebar-width)] p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
