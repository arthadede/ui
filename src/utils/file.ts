/**
 * File utility functions for @histweety/ui
 */

export function bytesToString(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Convert a list of accept strings (MIME types or extensions) into
 * a unique list of uppercase dot-prefixed file extensions for display.
 *
 * Examples:
 *  - ["image/jpeg", "image/png"] => [".JPEG", ".PNG"]
 *  - [".jpg", ".png"] => [".JPG", ".PNG"]
 *  - ["image/svg+xml"] => [".SVG"]
 */
export function acceptsToExtensions(accepts: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  for (const raw of accepts) {
    if (!raw) continue;
    const s = raw.trim();
    if (!s) continue;

    let ext = "";

    if (s.startsWith(".")) {
      // Already an extension
      ext = s.toUpperCase();
    } else if (s.includes("/")) {
      // Likely a MIME type like "image/jpeg" or "image/svg+xml"
      const subtype = s.split("/")[1] || "";
      // Remove parameters (e.g., ";charset=utf-8")
      const subtypeNoParams = subtype.split(";")[0];
      // For structured suffixes like "svg+xml" -> take part before "+"
      const base = subtypeNoParams.split("+")[0];
      if (base) {
        ext = "." + base.toLowerCase();
      }
    }

    if (ext && !seen.has(ext)) {
      seen.add(ext);
      out.push(ext);
    }
  }

  return out;
}