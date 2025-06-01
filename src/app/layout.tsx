import type { Metadata } from "next";
import "./globals.css";
import { sora } from "./font";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Nordcom Admin",
  description: "Nordcom Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} antialiased`}>
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
