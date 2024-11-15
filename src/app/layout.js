import localFont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from '../components/NextAuthProvider'
import Header from '../components/Header';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: 'LaoLang',
    template: '%s | LaoLang'
  },
  description: 'LaoLang - Your gateway to Lao language',
  keywords: ['Lao', 'Lao Language', 'Lao Courses'],
  authors: [{ name: 'Tou' }],
  creator: 'Tou',
  publisher: 'Tou',
  openGraph: {
    title: 'LaoLang',
    description: 'Your gateway to Lao education',
    url: 'https://laolang.com',
    siteName: 'LaoLang',
    images: [
      {
        url: 'https://laolang.com/static/icons/logo.png',
        width: 512,
        height: 512,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaoLang',
    description: 'Your gateway to Lao education',
    creator: '@tou1990',
    images: ['https://laolang.com/static/icons/logo.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/static/icons/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/static/icons/icon-192x192.png" />
      <meta name="theme-color" content="#0d6efd" />
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
