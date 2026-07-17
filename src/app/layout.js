import "./globals.css";
import { MusicPlayerProvider } from "@/contexts/music-player-context";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/mobile-nav";
import BottomPlayer from "@/components/music/bottom-player";
import { Toaster } from "sonner";

export const metadata = {
  title: "ராக வானம் — Tamil Music Streaming",
  description:
    "Stream Tamil music — albums, artists, playlists and more. Your personal Tamil music experience.",
  keywords: "tamil music, tamil songs, kollywood, anirudh, arr rahman, yuvan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ta">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Tamil:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <MusicPlayerProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Desktop */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-hidden">
              {/* Content area (scrollable) */}
              <div className="flex-1 overflow-y-auto pb-28 md:pb-24">
                {children}
              </div>
            </main>
          </div>

          {/* Bottom Player - Fixed */}
          <BottomPlayer />

          {/* Mobile Bottom Nav */}
          <MobileNav />

          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              },
            }}
          />
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
