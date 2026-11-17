// Tiny class-name joiner. Replaces the `cn` helper from "@/lib/utils" that the uploaded components import.
export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(" ");
}
