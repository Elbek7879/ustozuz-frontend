import { courses, type Course } from "@/lib/courses";

export type MyCourse = Course & {
  progress: number;
  completedAt?: string;
};

export const studentProfile = {
  name: "Elbek Abduraximov",
  email: "elbek@misol.uz",
  phone: "901234567",
};

export const myCourses: MyCourse[] = [
  { ...courses[0], progress: 65 },
  { ...courses[3], progress: 30 },
  { ...courses[5], progress: 100, completedAt: "18.09.2026" },
];