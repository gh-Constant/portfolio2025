import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import StickyCursor from "./components/StickyCursor";
import LoadingScreen from "./components/LoadingScreen"; // Added import for LoadingScreen
import { LanguageProvider } from "./contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const offBitFont = localFont({
  src: "../../public/fonts/OffBitTrial-DotBold.otf",
  variable: "--font-offbit",
  display: "swap",
});

// Nohemi Font Family with multiple weights
const nohemiFont = localFont({
  src: [
    {
      path: "../../public/fonts/Nohemi/Nohemi-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Nohemi/Nohemi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://constantsuchet.com'), // TODO: Confirm domain
  title: {
    default: "Constant Suchet - Game Developer & Cybersecurity Specialist",
    template: "%s | Constant Suchet"
  },
  description: "Portfolio of Constant Suchet. Explore MMORPG projects, multiplayer architecture, and cybersecurity insights.",
  keywords: ["Constant Suchet", "Game Developer", "Unity", "Cybersecurity", "MMORPG", "FishNet", "Networking"],
  authors: [{ name: "Constant Suchet" }],
  creator: "Constant Suchet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://constantsuchet.com",
    title: "Constant Suchet - Game Developer & Cybersecurity Specialist",
    description: "Portfolio of Constant Suchet. Explore MMORPG projects, multiplayer architecture, and cybersecurity insights.",
    siteName: "Constant Suchet Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // Ensure this image exists or update path
        width: 1200,
        height: 630,
        alt: "Constant Suchet Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Constant Suchet - Game Developer & Cybersecurity Specialist",
    description: "Portfolio of Constant Suchet. Explore MMORPG projects, multiplayer architecture, and cybersecurity insights.",
    images: ["/images/og-image.jpg"],
    creator: "@constantsuchet", // Update if different
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Constant Suchet",
  "jobTitle": "Computer Science Student / Game Developer",
  "url": "https://constantsuchet.com",
  "sameAs": [
    "https://github.com/ConstantSuchet", // Update with actual links
    "https://linkedin.com/in/constant-suchet" // Update with actual links
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Personal",
    "email": "contact@constantsuchet.com" // Update with actual email
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts Preconnect and Import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${offBitFont.variable} ${nohemiFont.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <LoadingScreen /> {/* Added LoadingScreen component */}
          <StickyCursor />
          <Navbar />
          <main className="relative min-h-screen bg-[#F8F5F0]">
            <div className="absolute inset-0 grid grid-cols-3 pointer-events-none z-0">
              <div className="border-r border-gray-300"></div>
              <div className="border-r border-gray-300"></div>
              <div></div>
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
          <BottomBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
