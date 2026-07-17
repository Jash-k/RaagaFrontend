import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function truncate(str, maxLen = 30) {
  if (!str) return "";
  return str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
}

export function getImageUrl(images, quality = "medium") {
  if (!images) return "/images/placeholder.svg";
  if (typeof images === "string") return images;
  // Handle JioSaavn format: array of {quality, url}
  if (Array.isArray(images)) {
    const q = images.find(i => i.quality === "500x500") || 
              images.find(i => i.quality === "150x150") || 
              images.find(i => i.quality === "50x50") ||
              images[images.length - 1];
    return q?.url || "/images/placeholder.svg";
  }
  // Handle object format
  return images[quality] || images.large || images.medium || images.small || "/images/placeholder.svg";
}
