import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { TripProvider } from "@/components/trip-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Header, Status } from "@/components/ui";
export const metadata: Metadata = {
  title: "YATRA — Make room for the journey",
  description:
    "A considered way to plan a little Goa. A travel-planning portfolio experience by Mitali Giri.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <TripProvider>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Header />
            <Status />
            {children}
          </TripProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
