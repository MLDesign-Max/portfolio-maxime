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

export const metadata = {
  title: "Maxime Lussiana — UX/UI & Motion Designer",
  description: "Portfolio de Maxime Lussiana",
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
      <body className="bg-bg-page text-text-default font-satoshi antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}