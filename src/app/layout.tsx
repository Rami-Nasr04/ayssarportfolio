
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../../components/header";
import Intro from "../../components/intro";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rami | Personal Portfolio",
  description: "Rami is a full-stack developer with 2 years of experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-white text-gray-950 pt-28 sm:pt-36 dark:bg-white dark:text-gray-950 relative h-[3000px]`}
      >
        {/* Brighter pink blob */}
        <div className="bg-[#ffd6db] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>

        {/* Brighter purple blob */}
        <div className="bg-[#dcd6ff] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>

        <Header />
         <Intro /> {/* the intro component is called here to display the intro section */}
        {/* the header is called since it is common across all pages from the components/header.tsx file */}
        {children}

      </body>
    </html>
  );
}
