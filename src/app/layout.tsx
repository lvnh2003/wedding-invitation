import './globals.css';
import localFont from 'next/font/local';
import { Roboto } from "next/font/google";

const motherlandSignature = localFont({
  src: './fonts/NVN-Motherland-Signature.ttf',
  variable: '--font-motherland-signature',
  display: 'swap',
});

const roboto = localFont({
  src: './fonts/Roboto-VariableFont.ttf',
  variable: "--font-roboto",
  display: "swap",
});

const quicksand = localFont({
  src: './fonts/Quicksand-Regular.ttf',
  variable: '--font-quicksand',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${motherlandSignature.variable} ${roboto.variable} ${quicksand.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
