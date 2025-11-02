import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";

export const metadata = {
  title: "Localo - Your Local Marketplace",
  description: "Find shops, restaurants, groceries, and more nearby.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
