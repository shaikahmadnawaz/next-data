import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/common/header";
import { Providers } from "@/redux/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextData",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
