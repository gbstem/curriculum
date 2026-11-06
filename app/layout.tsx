import type { Metadata } from 'next';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css';
import AuthGate from './components/AuthGate';
import { SessionProvider } from '@/lib/useSession';

export const metadata: Metadata = {
  title: 'gbSTEM Curriculum',
  description: 'gbSTEM Curriculum Management and Lesson Hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <SessionProvider>
          <AuthGate>{children}</AuthGate>
        </SessionProvider>
      </body>
    </html>
  );
}
