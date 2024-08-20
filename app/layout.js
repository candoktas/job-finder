import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/app/_components/Logo";
import LogInModal from "@/app/_components/LogInModal";
import { Provider } from "react-redux";
import { store } from "@/app/_store/store";
import ReduxProvider from "@/app/_components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Finder",
  description: "Find your dream job",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
