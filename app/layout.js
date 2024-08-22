import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/app/_components/ReduxProvider";
import LoadToken from "@/app/_components/LoadToken";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Finder",
  description: "Find your dream job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <LoadToken />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
