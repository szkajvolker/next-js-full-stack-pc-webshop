export function generateSlug(name: string): string {
  if (!name || typeof name !== "string") {
    throw new Error("Name must be a non-empty string");
  }
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!slug) {
    throw new Error("Generated slug is empty. Please provide a valid name.");
  }
  return slug;
}
