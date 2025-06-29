import "@/css/satoshi.css";
import "@/css/style.css";

import '../../../styles/style.css'
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body>
        <Head>
             <meta name="description" content="change app description" />
             <link rel="icon" href="/favicon.ico" />
             <link rel="preconnect" href="https://fonts.googleapis.com" />
             <link rel="preconnect" href="https://fonts.gstatic.com" />
             <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500&family=Roboto&display=swap" rel="stylesheet"></link>
           </Head>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
         <Footer />
        </Providers>
         
      </body>
      
    </html>
  );
}
