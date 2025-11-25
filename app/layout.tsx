import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "IT Lines - Digital Solutions & IT Consultancy",
  description: "Connecting your business to digital success. Expert IT consulting, web development, cloud solutions, and cybersecurity services that draw the path to growth.",
  keywords: ["IT Lines", "IT consultancy", "web development", "digital solutions", "cloud services", "cybersecurity", "software development", "business connectivity"],
  authors: [{ name: "IT Lines" }],
  openGraph: {
    title: "IT Lines - Digital Solutions & IT Consultancy",
    description: "Drawing the lines to your digital success with cutting-edge technology solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

