import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/Components/main/Header";
import { Sidebar } from "@/Components/main/Sidebar"; // Ensure correct import path

export const metadata: Metadata = {
  title: "ShopSphere",
  description:
    "ShopSphere is a full-featured e-commerce application built with Next.js 15, Sanity, and Stripe. It offers a seamless shopping experience with robust content management and secure payment processing. Developed to provide both developers and users with a powerful, intuitive, and scalable online shopping platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          <main className="flex flex-col">
            {/* Full-width Header */}
            <header className="w-full">
              <Header />
            </header>

            <div className="flex flex-1">
              {/* Sidebar occupying 1/3 of the width */}
              <aside
                className="w-30
               p-4 border-r border-gray-200 bg-white shadow-md"
              >
                <Sidebar />
              </aside>

              {/* Main content area occupying remaining 2/3 of the width */}
              <div className="flex-1 p-4">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
