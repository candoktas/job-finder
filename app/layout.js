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
        <ReduxProvider>
          {children}
          <footer>
            <div className="flex flex-col sm:flex-row p-6 sm:p-14">
              <div className="w-full sm:w-1/2 flex flex-col sm:flex-row">
                <Logo />
                <div className="pr-10">
                  <p className="font-semibold mb-4">Ready to get started?</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                  </p>
                </div>
              </div>
              <div className="hidden sm:block min-h-full border-l border-gray-300 mx-4"></div>
              <div className="w-full sm:w-1/2 pl-0 sm:pl-10 flex flex-col justify-end">
                <p>&copy; 2010 &mdash; 2024 Privacy &mdash; Terms</p>
              </div>
            </div>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
