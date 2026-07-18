import { Inter, Noto_Sans_Tamil } from 'next/font/google';
import './globals.css';
import { MusicPlayerProvider } from '@/contexts/music-player-context';
import LayoutWrapper from '@/components/layout/layout-wrapper';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const tamil = Noto_Sans_Tamil({ subsets: ['tamil'], variable: '--font-tamil' });

export const metadata = { title: 'ராக வானம் — Raga Vaanam', description: 'Tamil music streaming' };

export default function RootLayout({ children }) {
  return (
    <html lang="ta" className={`${inter.variable} ${tamil.variable}`}>
      <body className="bg-neutral-950 text-white font-sans antialiased">
        <MusicPlayerProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
