export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-яёʻʼ\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
}