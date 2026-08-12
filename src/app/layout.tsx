import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { CustomCursor } from "../components/ui/CustomCursor";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maximelussiana.fr"),
  title: "Maxime Lussiana — UX/UI & Motion Designer Freelance",
  description:
    "Je conçois des interfaces UX/UI, des Design Systems et des animations Motion Design pour vos produits web et contenus visuels. De la structure jusqu'au mouvement.",
  authors: [{ name: "Maxime Lussiana" }],
  keywords: [
    "UX UI Designer",
    "Motion Designer",
    "Design System",
    "Freelance",
    "Paris",
    "After Effects",
    "Lottie",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Maxime Lussiana — UX/UI & Motion Designer Freelance",
    description:
      "Interfaces UX/UI, Design Systems et Motion Design. De la structure jusqu'au mouvement.",
    url: "https://maximelussiana.fr",
    siteName: "Maxime Lussiana",
    images: [
      {
        url: "/og-image.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "Maxime Lussiana — UX/UI & Motion Designer Freelance",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxime Lussiana — UX/UI & Motion Designer Freelance",
    description:
      "Interfaces UX/UI, Design Systems et Motion Design. De la structure jusqu'au mouvement.",
    images: ["/og-image.jpg?v=3"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Maxime Lussiana",
  url: "https://maximelussiana.fr",
  image: "https://maximelussiana.fr/og-image.png",
  jobTitle: "UX/UI & Motion Designer Freelance",
  sameAs: ["https://www.linkedin.com/in/maxime-lussiana/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${satoshi.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-page text-text-default font-satoshi antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}