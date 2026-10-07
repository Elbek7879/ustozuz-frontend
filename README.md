# UstozUz — frontend

O'zbekiston uchun onlayn ta'lim platformasi: talabalar kurs sotib oladi va o'qiydi,
ustozlar kurs yaratadi, admin platformani boshqaradi.

Next.js 16 (App Router), TypeScript, Tailwind CSS. Backend — alohida repo (`ustozuz-backend`, Spring Boot).

## Imkoniyatlar

- **Katalog**: kategoriyalar, qidiruv, kurs sahifasi va darslar dasturi
- **Talaba**: ro'yxatdan o'tish, savat, to'lov (sinov rejimi: Payme / Click / karta),
  "Mening kurslarim", darslarni tugatish va progress, avtomatik sertifikat (PDF qilib saqlash mumkin), profil
- **Ustoz**: kurs yaratish va tahrirlash, darslarni qo'shish/tartiblash, nashr qilish yoki yashirish
- **Admin**: statistika va daromad, foydalanuvchilarni boshqarish (rol, bloklash), kurslarni boshqarish,
  aloqa xabarlari

## Lokal ishga tushirish

1. `.env.local` fayli:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
2. Backend ishlab turgan bo'lsin (localhost:8080).
3. ```bash
   npm install
   npm run dev
   ```
   → http://localhost:3000

## Tuzilma

- `src/app` — sahifalar (`/kurslar`, `/savat`, `/tolov`, `/talaba/*`, `/ustoz/*`, `/admin/*` ...)
- `src/components` — qayta ishlatiladigan qismlar
- `src/lib/api.ts` — backend bilan ishlash
- `src/lib/auth`, `src/lib/cart`, `src/lib/enrollments` — sessiya, savat va sotib olingan kurslar holati
