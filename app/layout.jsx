import { Montserrat } from 'next/font/google';
import './globals.css';
import NextAuthProvider from './Provider';

const monserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Preducation',
  description: 'Preducation online course',
  icons: { apple: '/img/iconPreducation.png', icon: '/img/iconPreducation.png' },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      id="theme"
    >
      <body
        className={`${monserrat.className} no-scrollbar dark:bg-dark-backgroud`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
