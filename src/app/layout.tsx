import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rowform — Every row, one record",
    template: "%s — Rowform",
  },
  description:
    "A universal indoor rowing platform for tracking workouts across machines.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
