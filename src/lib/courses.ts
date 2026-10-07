export type Course = {
  title: string;
  instructor: string;
  category: string;
  rating: number;
  students: number;
  price: string;
  image: string;
};

export const courses: Course[] = [
  { title: "Frontend dasturlash: noldan mutaxassisgacha", instructor: "Aziz Karimov", category: "Dasturlash", rating: 4.8, students: 1240, price: "249,000 so'm", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
  { title: "UI/UX dizayn asoslari", instructor: "Nilufar Yusupova", category: "Dizayn", rating: 4.7, students: 860, price: "199,000 so'm", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
  { title: "Raqamli marketing va SMM", instructor: "Jasur Rahimov", category: "Biznes", rating: 4.9, students: 2100, price: "179,000 so'm", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80" },
  { title: "Python bilan sun'iy intellekt", instructor: "Dilnoza Saidova", category: "Dasturlash", rating: 4.8, students: 1560, price: "299,000 so'm", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80" },
  { title: "Backend dasturlash: Java asoslari", instructor: "Sardor Tojiyev", category: "Dasturlash", rating: 4.6, students: 940, price: "279,000 so'm", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" },
  { title: "Ingliz tili: nutq va grammatika", instructor: "Malika Nazarova", category: "Tillar", rating: 4.9, students: 3200, price: "149,000 so'm", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80" },
  { title: "Portret fotografiya siri", instructor: "Bekzod Umarov", category: "Fotografiya", rating: 4.7, students: 540, price: "229,000 so'm", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
  { title: "Shaxsiy moliyani boshqarish", instructor: "Zarina Qodirova", category: "Moliya", rating: 4.6, students: 780, price: "189,000 so'm", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80" },
  { title: "Uy sharoitida fitnes dasturi", instructor: "Otabek Yo'ldoshev", category: "Sog'liq", rating: 4.8, students: 1100, price: "159,000 so'm", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
  { title: "Gitarada chalishni o'rganish", instructor: "Kamola Rashidova", category: "Musiqa", rating: 4.9, students: 670, price: "169,000 so'm", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80" },
];