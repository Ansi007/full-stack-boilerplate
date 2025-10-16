import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BE: Tech Stack",
  description: "Powered by TurboRepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
