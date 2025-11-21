/**
 * Avatar utility functions for @histweety/ui
 */

export function getBucket(name: string | undefined): number {
  let bucket = 0;
  if (name && name.trim() !== "") {
    const safeName = name.trim();
    const firstChar = safeName[0]?.toLowerCase() ?? "u";
    const isAlpha = firstChar >= "a" && firstChar <= "z";
    const alphaIndex = isAlpha ? firstChar.charCodeAt(0) - 97 : firstChar.charCodeAt(0) % 26;
    bucket = ((alphaIndex % 26) + 26) % 8;
  }
  return bucket;
}

export function getInitial(name: string | undefined): string {
  let initials = "";
  if (name && name.trim() !== "") {
    const safeName = name.trim();
    const words = safeName.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      initials = `${words[0][0] ?? ""}${words[1][0] ?? ""}`;
    } else {
      const lettersOnly = safeName.replace(/[^A-Za-z]/g, "");
      initials = lettersOnly.slice(0, 2) || safeName.slice(0, 2);
    }
    initials = initials.toUpperCase();
  }
  return initials;
}