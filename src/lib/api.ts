const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export type ApiCategory = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type ApiCourseCard = {
  id: number;
  title: string;
  slug: string;
  instructorName: string;
  category: string;
  rating: number;
  studentsCount: number;
  price: number;
  imageUrl: string;
};

export type ApiCourseDetail = ApiCourseCard & {
  description: string;
  ratingCount: number;
};

export type ApiPage<T> = {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};

export type ApiStats = {
  totalCourses: number;
  totalStudents: number;
  totalInstructors: number;
  avgRating: number;
};

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
};

export type ApiAuthResponse = {
  token: string;
  user: ApiUser;
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(
  path: string,
  options?: { method?: string; body?: unknown; token?: string }
): Promise<T> {
  const headers: Record<string, string> = {};
  if (options?.body) headers["Content-Type"] = "application/json";
  if (options?.token) headers["Authorization"] = `Bearer ${options.token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method: options?.method ?? "GET",
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    let message = `Xatolik: ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // javob JSON emas, standart xabar qoladi
    }
    throw new ApiError(res.status, message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

// --- Ochiq ma'lumotlar ---

export function getCategories() {
  return apiFetch<ApiCategory[]>("/categories");
}

export function getCourses(params?: { category?: string; q?: string }) {
  const search = new URLSearchParams();
  if (params?.category) search.set("category", params.category);
  if (params?.q) search.set("q", params.q);
  const query = search.toString();
  return apiFetch<ApiPage<ApiCourseCard>>(`/courses${query ? `?${query}` : ""}`);
}

export function getCourseBySlug(slug: string) {
  return apiFetch<ApiCourseDetail>(`/courses/${slug}`);
}

export function getPublicStats() {
  return apiFetch<ApiStats>("/stats/public");
}

// --- Autentifikatsiya ---

export function registerRequest(data: { name: string; email: string; password: string }) {
  return apiFetch<ApiAuthResponse>("/auth/register", { method: "POST", body: data });
}

export function loginRequest(data: { email: string; password: string }) {
  return apiFetch<ApiAuthResponse>("/auth/login", { method: "POST", body: data });
}

export function forgotPasswordRequest(email: string) {
  return apiFetch<void>("/auth/forgot-password", { method: "POST", body: { email } });
}

export function resetPasswordRequest(token: string, newPassword: string) {
  return apiFetch<void>("/auth/reset-password", {
    method: "POST",
    body: { token, newPassword },
  });
}

export function getMe(token: string) {
  return apiFetch<ApiUser>("/me", { token });
}

// --- Ustoz paneli ---

export type ApiInstructorCourse = {
  id: number;
  title: string;
  slug: string;
  category: string;
  price: number;
  status: "DRAFT" | "ACTIVE" | "HIDDEN";
  rating: number;
  studentsCount: number;
  createdAt: string;
};

export type ApiLesson = {
  id: number;
  title: string;
  orderIndex: number;
  videoUrl: string | null;
};

export function getMyCourses(token: string) {
  return apiFetch<ApiInstructorCourse[]>("/instructor/courses", { token });
}

export function createCourse(
  token: string,
  data: { title: string; category: string; description: string; price: number; imageUrl?: string }
) {
  return apiFetch<ApiInstructorCourse>("/instructor/courses", {
    method: "POST",
    body: data,
    token,
  });
}

export function updateCourse(
  token: string,
  courseId: number,
  data: { title: string; category: string; description: string; price: number; imageUrl?: string }
) {
  return apiFetch<ApiInstructorCourse>(`/instructor/courses/${courseId}`, {
    method: "PUT",
    body: data,
    token,
  });
}

export function updateCourseStatus(token: string, courseId: number, status: string) {
  return apiFetch<ApiInstructorCourse>(`/instructor/courses/${courseId}/status`, {
    method: "PUT",
    body: { status },
    token,
  });
}

export function deleteCourse(token: string, courseId: number) {
  return apiFetch<void>(`/instructor/courses/${courseId}`, { method: "DELETE", token });
}

export function getCourseLessons(token: string, courseId: number) {
  return apiFetch<ApiLesson[]>(`/instructor/courses/${courseId}/lessons`, { token });
}

export function createLesson(token: string, courseId: number, title: string) {
  return apiFetch<ApiLesson>(`/instructor/courses/${courseId}/lessons`, {
    method: "POST",
    body: { title },
    token,
  });
}

export function updateLesson(token: string, courseId: number, lessonId: number, title: string) {
  return apiFetch<ApiLesson>(`/instructor/courses/${courseId}/lessons/${lessonId}`, {
    method: "PUT",
    body: { title },
    token,
  });
}

export function deleteLesson(token: string, courseId: number, lessonId: number) {
  return apiFetch<void>(`/instructor/courses/${courseId}/lessons/${lessonId}`, {
    method: "DELETE",
    token,
  });
}

export function reorderLessons(token: string, courseId: number, lessonIds: number[]) {
  return apiFetch<void>(`/instructor/courses/${courseId}/lessons/reorder`, {
    method: "PUT",
    body: { lessonIds },
    token,
  });
}