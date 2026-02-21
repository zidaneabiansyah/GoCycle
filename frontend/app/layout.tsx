import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoCycle - Platform Edukasi Daur Ulang",
  description: "Temukan inspirasi dari karya eco-makers Indonesia. Pelajari cara mengubah sampah menjadi produk bernilai dengan tutorial DIY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
