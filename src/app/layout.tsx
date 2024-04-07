import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@uploadthing/react/styles.css";
import ReduxProvider from "@/redux/ReduxProvider";
import CreateListingModal from "@/components/modal/CreateListingModal";
import AuthModal from "@/components/modal/AuthModal";
import { Suspense } from "react";
import FilterModal from "@/components/modal/FilterModal";


export const metadata: Metadata = {
  title: "Otel",
  description: "List your Property",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" >
      <body className="md:px-[90px]">
        <ReduxProvider>
          <Suspense fallback={<p>Loading....</p>}  >
            <Navbar  />
          </Suspense>
          <AuthModal />
          <FilterModal />
          <CreateListingModal />
          <div className=" w-full py-3">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
