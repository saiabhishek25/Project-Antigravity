import type { Metadata } from 'next';
import { AppShell } from '@/components/shell/AppShell';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevPulse — Engineering Velocity Tracker',
  description: 'Track PR throughput, team velocity, and engineering metrics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-zinc-950 text-zinc-50 font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
