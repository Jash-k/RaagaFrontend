"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Library,
  ListMusic,
  Heart,
  Radio,
  Disc3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home", labelTa: "முகப்பு" },
  { href: "/search", icon: Search, label: "Search", labelTa: "தேடு" },
  { href: "/library", icon: Library, label: "Library", labelTa: "நூலகம்" },
];

const discoverItems = [
  { href: "/library/liked", icon: Heart, label: "Liked Songs" },
  { href: "/library/playlists", icon: ListMusic, label: "Playlists" },
  { href: "/discover/charts", icon: Disc3, label: "Tamil Charts" },
  { href: "/discover/radio", icon: Radio, label: "Radio" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-bg-secondary border-r border-border shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-gold flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
            ர
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary leading-tight">
              ராக வானம்
            </h1>
            <p className="text-[10px] text-text-muted uppercase tracking-widest">
              Raga Vaanam
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-accent/15 text-accent-light"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-6 my-4 border-t border-border" />

      {/* Discover */}
      <div className="px-3">
        <p className="px-4 mb-2 text-[10px] font-semibold text-text-muted uppercase tracking-widest">
          Discover
        </p>
        <div className="space-y-1">
          {discoverItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all",
                  isActive
                    ? "bg-accent/15 text-accent-light font-medium"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4">
        <div className="px-4 py-3 rounded-lg bg-bg-card border border-border">
          <p className="text-xs text-text-muted tamil-text">
            இசை கேட்போம் 🎶
          </p>
          <p className="text-[10px] text-text-muted mt-1">
            Personal Tamil Music
          </p>
        </div>
      </div>
    </aside>
  );
}
