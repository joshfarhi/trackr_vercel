import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trackr",
  description: "for whales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      elements: {
        footer: "hidden",
      },
    }}>
      <html
        lang="en"
        className="dark"
        style={{
          colorScheme: "dark",
        }}
      >
        <body className={inter.className}>
          <Toaster richColors position="bottom-right" />
          <RootProviders>{children}</RootProviders>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
