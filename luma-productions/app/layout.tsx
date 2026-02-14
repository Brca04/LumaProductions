import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vasadomena.hr'),
  title: {
    default: 'Foto Studio - Profesionalna Fotografija | Vjenčanja, Maturalne Večeri, Krštenja',
    template: '%s | Foto Studio'
  },
  description: 'Profesionalna fotografija za vjenčanja, maturalne večeri, krštenja i reklame. Vrhunska kvaliteta i pristupačne cijene.',
  keywords: ['fotografija', 'vjenčanja', 'maturalne večeri', 'krštenja', 'reklame', 'foto studio', 'profesionalni fotograf'],
  authors: [{ name: 'Foto Studio' }],
  creator: 'Foto Studio',
  publisher: 'Foto Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://www.vasadomena.hr',
    siteName: 'Foto Studio',
    title: 'Foto Studio - Profesionalna Fotografija',
    description: 'Profesionalna fotografija za vjenčanja, maturalne večeri, krštenja i reklame.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foto Studio - Profesionalna Fotografija',
    description: 'Profesionalna fotografija za vjenčanja, maturalne večeri, krštenja i reklame.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className="antialiased">
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
