import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iloilo Jeepney Routes",
  description:
    "Find jeepney route suggestions across Iloilo City. Search places, view routes on the map, and plan your commute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
