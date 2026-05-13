import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Ming | Focus with your Puspin",
  description: "Gamified study tracker with a Filipino twist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} bg-[#F1F5F9] text-slate-900 antialiased`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}