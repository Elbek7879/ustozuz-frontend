// Kursda rasm bo'lmasa ko'rsatiladigan muqova (backend'dagi DEFAULT_IMAGE_URL bilan bir xil)
export const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80";

export function coverOf(imageUrl: string | null | undefined) {
  return imageUrl && imageUrl.startsWith("https://") ? imageUrl : DEFAULT_COVER;
}
