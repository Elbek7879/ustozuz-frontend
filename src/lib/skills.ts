export type SkillGroup = "Dasturlash" | "Dizayn" | "Biznes" | "Shaxsiy o'sish";

export type Skill = {
  name: string;
  group: SkillGroup;
  topic: string;
  students: number;
};

export const skillGroups: SkillGroup[] = [
  "Dasturlash",
  "Dizayn",
  "Biznes",
  "Shaxsiy o'sish",
];

export function formatNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const skills: Skill[] = [
  { name: "Python", group: "Dasturlash", topic: "Dasturlash tillari", students: 12480 },
  { name: "Veb-dasturlash", group: "Dasturlash", topic: "Veb-ishlab chiqish", students: 9320 },
  { name: "Sun'iy intellekt", group: "Dasturlash", topic: "Sun'iy intellekt", students: 8750 },
  { name: "JavaScript", group: "Dasturlash", topic: "Dasturlash tillari", students: 7640 },
  { name: "Ma'lumotlar tahlili", group: "Dasturlash", topic: "Ma'lumotlar fani", students: 6980 },
  { name: "Java", group: "Dasturlash", topic: "Dasturlash tillari", students: 5210 },
  { name: "Mobil ilovalar (Flutter)", group: "Dasturlash", topic: "Mobil dasturlash", students: 4390 },
  { name: "SQL va ma'lumotlar bazasi", group: "Dasturlash", topic: "Ma'lumotlar bazasi", students: 3820 },
  { name: "Kiberxavfsizlik", group: "Dasturlash", topic: "IT xavfsizlik", students: 3150 },
  { name: "Git va GitHub", group: "Dasturlash", topic: "Dasturchi vositalari", students: 2470 },

  { name: "UI/UX dizayn", group: "Dizayn", topic: "Veb-dizayn", students: 6120 },
  { name: "Photoshop", group: "Dizayn", topic: "Dizayn vositalari", students: 5480 },
  { name: "Figma", group: "Dizayn", topic: "Dizayn vositalari", students: 4210 },
  { name: "Grafik dizayn", group: "Dizayn", topic: "Grafik dizayn", students: 3960 },
  { name: "Video montaj", group: "Dizayn", topic: "Video ishlab chiqarish", students: 2870 },
  { name: "3D modellashtirish", group: "Dizayn", topic: "3D va animatsiya", students: 1940 },

  { name: "Microsoft Excel", group: "Biznes", topic: "Ofis dasturlari", students: 8890 },
  { name: "Raqamli marketing", group: "Biznes", topic: "Marketing", students: 7350 },
  { name: "SMM", group: "Biznes", topic: "Ijtimoiy tarmoq marketingi", students: 5730 },
  { name: "Loyihalarni boshqarish", group: "Biznes", topic: "Loyiha boshqaruvi", students: 4680 },
  { name: "Moliyaviy savodxonlik", group: "Biznes", topic: "Moliya", students: 4120 },
  { name: "Buxgalteriya hisobi", group: "Biznes", topic: "Buxgalteriya", students: 3540 },
  { name: "Savdo ko'nikmalari", group: "Biznes", topic: "Sotuv", students: 2960 },
  { name: "Startap asoslari", group: "Biznes", topic: "Tadbirkorlik", students: 2280 },

  { name: "Ingliz tili", group: "Shaxsiy o'sish", topic: "Chet tillari", students: 11250 },
  { name: "Rus tili", group: "Shaxsiy o'sish", topic: "Chet tillari", students: 6470 },
  { name: "Vaqtni boshqarish", group: "Shaxsiy o'sish", topic: "Samaradorlik", students: 3390 },
  { name: "Ommaviy nutq", group: "Shaxsiy o'sish", topic: "Muloqot", students: 3010 },
  { name: "Liderlik", group: "Shaxsiy o'sish", topic: "Rahbarlik", students: 2650 },
  { name: "Tez o'qish", group: "Shaxsiy o'sish", topic: "O'rganish usullari", students: 1820 },
];