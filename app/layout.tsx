import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import Header from "@/components/Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-Sanskriti - Home of Indian Culture",
  // its a indian store for hindu in america
  description: " e-Sanskriti is a store for Indian culture and heritage, offering a wide range of products that celebrate the rich traditions of India.",
  openGraph: {
    title: "e-Sanskriti - Home of Indian Culture",
    description: "e-Sanskriti is a store for Indian culture and heritage, offering a wide range of products that celebrate the rich traditions of India.",
    url: "https://e-sanskriti.com",
    siteName: "e-Sanskriti",
    images: [
      {
        url: "https://e-sanskriti.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "e-Sanskriti - Home of Indian Culture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "e-Sanskriti - Home of Indian Culture",
    description: "e-Sanskriti is a store for Indian culture and heritage, offering a wide range of products that celebrate the rich traditions of India.",
    images: ["https://e-sanskriti.com/og-image.png"],
    creator: "@e_sanskriti",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: "#ffffff"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
        {children}
      </body>
    </html>
  </ClerkProvider>
  );
}
