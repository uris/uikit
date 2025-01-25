export function setSizeStyle(size: string | number | undefined): string {
  if (!size) return "auto";
  if (typeof size === "string") return size;
  return size + "px";
}
