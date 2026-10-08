"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowUp, ArrowDown, Plus, Trash2, Eye, Video } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  ApiError,
  createLesson,
  deleteCourse,
  deleteLesson,
  getCategories,
  getCourseLessons,
  getInstructorCourse,
  reorderLessons,
  updateCourse,
  updateCourseStatus,
  updateLesson,
  type ApiCategory,
  type ApiInstructorCourse,
  type ApiLesson,
  type CourseStatus,
} from "@/lib/api";
import { coverOf } from "@/lib/images";
import Skeleton from "@/components/Skeleton";
import { youtubeId, youtubeThumbnail } from "@/lib/video";

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition";

const statusInfo: Record<CourseStatus, { text: string; hint: string; className: string }> = {
  ACTIVE: {
    text: "Faol",
    hint: "Kurs katalogda ko'rinadi va sotib olinishi mumkin.",
    className: "bg-emerald-50 text-emerald-700",
  },
  DRAFT: {
    text: "Qoralama",
    hint: "Kurs hali talabalarga ko'rinmaydi. Tayyor bo'lgach, nashr qiling.",
    className: "bg-amber-50 text-amber-700",
  },
  HIDDEN: {
    text: "Yashirin",
    hint: "Kurs katalogdan olib tashlangan. Sotib olgan talabalar uni ko'rishda davom etadi.",
    className: "bg-gray-100 text-gray-600",
  },
};

function errorMessage(err: unknown) {
  return err instanceof ApiError ? err.message : "Xatolik yuz berdi";
}

export default function CourseEditForm({ courseId }: { courseId: number }) {
  const router = useRouter();
  const { token } = useAuth();

  const [course, setCourse] = useState<ApiInstructorCourse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [lessons, setLessons] = useState<ApiLesson[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [newLesson, setNewLesson] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      getInstructorCourse(token, courseId),
      getCourseLessons(token, courseId),
      getCategories(),
    ])
      .then(([c, l, cats]) => {
        setCourse(c);
        setLessons(l);
        setCategories(cats);
        setForm({
          title: c.title,
          category: c.category,
          description: c.description ?? "",
          price: String(c.price),
          imageUrl: c.imageUrl ?? "",
        });
      })
      .catch((err) => {
        if (err instanceof ApiError && [403, 404].includes(err.status)) {
          setNotFound(true);
        } else {
          toast.error(errorMessage(err));
        }
      });
  }, [token, courseId]);

  if (notFound) {
    return (
      <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
        <p className="text-gray-500 mb-4">Kurs topilmadi yoki u sizga tegishli emas.</p>
        <Link href="/ustoz/panel" className="text-indigo-700 font-medium hover:underline">
          Ustoz paneliga qaytish →
        </Link>
      </div>
    );
  }

  if (!course || !token) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-40" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const status = statusInfo[course.status];

  function handleChange(e: React.ChangeEvent<FieldElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const updated = await updateCourse(token, courseId, {
        title: form.title,
        category: form.category,
        description: form.description,
        price: Number(form.price),
        imageUrl: form.imageUrl.trim() || undefined,
      });
      setCourse(updated);
      setForm((f) => ({ ...f, imageUrl: updated.imageUrl }));
      toast.success("O'zgarishlar saqlandi");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(next: CourseStatus) {
    if (!token) return;
    if (next === "ACTIVE" && lessons.length === 0) {
      toast.error("Nashr qilishdan oldin kamida bitta dars qo'shing");
      return;
    }
    setBusy(true);
    try {
      setCourse(await updateCourseStatus(token, courseId, next));
      toast.success(next === "ACTIVE" ? "Kurs nashr qilindi" : "Kurs holati o'zgartirildi");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function addLesson() {
    if (!token || !newLesson.trim()) return;
    setBusy(true);
    try {
      const lesson = await createLesson(token, courseId, newLesson.trim(), newVideo.trim());
      setLessons((prev) => [...prev, lesson]);
      setNewLesson("");
      setNewVideo("");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function renameLesson(lesson: ApiLesson, title: string) {
    if (!token) return;
    const trimmed = title.trim();
    if (!trimmed || trimmed === lesson.title) return;
    try {
      const updated = await updateLesson(token, courseId, lesson.id, trimmed, lesson.videoUrl);
      setLessons((prev) => prev.map((l) => (l.id === lesson.id ? updated : l)));
      toast.success("Dars nomi saqlandi");
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  async function saveVideo(lesson: ApiLesson, value: string) {
    if (!token) return;
    const trimmed = value.trim();
    if (trimmed === (lesson.videoUrl ?? "")) return;
    try {
      const updated = await updateLesson(token, courseId, lesson.id, lesson.title, trimmed || null);
      setLessons((prev) => prev.map((l) => (l.id === lesson.id ? updated : l)));
      toast.success(trimmed ? "Video saqlandi" : "Video olib tashlandi");
    } catch (err) {
      toast.error(errorMessage(err));
    }
  }

  async function removeLesson(lesson: ApiLesson) {
    if (!token) return;
    if (!confirm(`"${lesson.title}" darsini o'chirmoqchimisiz?`)) return;
    setBusy(true);
    try {
      await deleteLesson(token, courseId, lesson.id);
      setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function moveLesson(index: number, dir: -1 | 1) {
    if (!token) return;
    const target = index + dir;
    if (target < 0 || target >= lessons.length) return;

    const previous = lessons;
    const reordered = [...lessons];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setLessons(reordered);

    try {
      await reorderLessons(token, courseId, reordered.map((l) => l.id));
    } catch (err) {
      setLessons(previous);
      toast.error(errorMessage(err));
    }
  }

  async function handleDelete() {
    if (!token) return;
    if (!confirm("Bu kursni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.")) return;
    setBusy(true);
    try {
      await deleteCourse(token, courseId);
      toast.success("Kurs o'chirildi");
      router.push("/ustoz/panel");
    } catch (err) {
      toast.error(errorMessage(err));
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10">
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Holati:</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.className}`}>
              {status.text}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {course.status !== "ACTIVE" && (
              <button
                type="button"
                onClick={() => changeStatus("ACTIVE")}
                disabled={busy}
                className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 disabled:opacity-60"
              >
                Nashr qilish
              </button>
            )}
            {course.status === "ACTIVE" && (
              <>
                <Link
                  href={`/kurslar/${course.slug}`}
                  className="flex items-center gap-1.5 text-sm font-medium border border-gray-300 text-gray-700 px-3 py-2 rounded-xl hover:border-indigo-400 hover:text-indigo-700"
                >
                  <Eye className="w-4 h-4" />
                  Ko&apos;rish
                </Link>
                <button
                  type="button"
                  onClick={() => changeStatus("HIDDEN")}
                  disabled={busy}
                  className="text-sm font-medium border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 disabled:opacity-60"
                >
                  Yashirish
                </button>
              </>
            )}
            {course.status === "HIDDEN" && (
              <button
                type="button"
                onClick={() => changeStatus("DRAFT")}
                disabled={busy}
                className="text-sm font-medium border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 disabled:opacity-60"
              >
                Qoralamaga qaytarish
              </button>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">{status.hint}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="font-semibold text-gray-900">Asosiy ma&apos;lumotlar</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kurs nomi</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Narx (so&apos;m)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min={0}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kurs tavsifi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Muqova rasmi havolasi
          </label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="relative w-full sm:w-48 h-28 rounded-lg overflow-hidden shrink-0 bg-gray-100">
              <Image
                src={coverOf(form.imageUrl)}
                alt={form.title || "Muqova"}
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 w-full">
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1">
                https:// bilan boshlanadigan rasm havolasini kiriting. Bo&apos;sh qolsa, standart
                muqova ishlatiladi.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-indigo-700 text-white font-medium py-3 rounded-xl hover:bg-indigo-800 disabled:opacity-60"
        >
          {saving ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">Darslar dasturi ({lessons.length})</h2>

        {lessons.length === 0 && (
          <p className="text-sm text-gray-500">
            Hali dars yo&apos;q. Kursni nashr qilish uchun kamida bitta dars qo&apos;shing.
          </p>
        )}

        <div className="space-y-3">
          {lessons.map((lesson, i) => {
            const videoId = youtubeId(lesson.videoUrl);
            return (
              <div key={lesson.id} className="rounded-2xl ring-1 ring-gray-200 bg-white p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    defaultValue={lesson.title}
                    onBlur={(e) => renameLesson(lesson, e.target.value)}
                    aria-label="Dars nomi"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => moveLesson(i, -1)}
                    disabled={i === 0 || busy}
                    aria-label="Yuqoriga"
                    className="p-1.5 text-gray-400 hover:text-indigo-700 disabled:opacity-30 disabled:hover:text-gray-400"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLesson(i, 1)}
                    disabled={i === lessons.length - 1 || busy}
                    aria-label="Pastga"
                    className="p-1.5 text-gray-400 hover:text-indigo-700 disabled:opacity-30 disabled:hover:text-gray-400"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeLesson(lesson)}
                    disabled={busy}
                    aria-label="O'chirish"
                    className="p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 sm:pl-9">
                  {videoId ? (
                    <Image
                      src={youtubeThumbnail(videoId)}
                      alt=""
                      width={64}
                      height={36}
                      className="w-16 h-9 rounded-xl object-cover shrink-0 ring-1 ring-gray-200"
                    />
                  ) : (
                    <span className="w-16 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4 text-gray-400" />
                    </span>
                  )}
                  <input
                    type="url"
                    defaultValue={lesson.videoUrl ?? ""}
                    onBlur={(e) => saveVideo(lesson, e.target.value)}
                    placeholder="YouTube havolasi: https://youtu.be/..."
                    aria-label="Dars videosi (YouTube havolasi)"
                    className={`${inputClass} text-xs py-2`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newLesson}
            onChange={(e) => setNewLesson(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLesson();
              }
            }}
            placeholder="Yangi dars nomi"
            className={inputClass}
          />
          <input
            type="url"
            value={newVideo}
            onChange={(e) => setNewVideo(e.target.value)}
            placeholder="YouTube havolasi (ixtiyoriy)"
            aria-label="Yangi dars videosi"
            className={`${inputClass} hidden sm:block`}
          />
          <button
            type="button"
            onClick={addLesson}
            disabled={busy || !newLesson.trim()}
            className="flex items-center gap-1.5 text-sm font-medium bg-indigo-700 text-white px-4 rounded-xl hover:bg-indigo-800 disabled:opacity-60 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Qo&apos;shish
          </button>
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-indigo-50/60 ring-1 ring-indigo-100 p-4 text-sm text-gray-600">
          <Video className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            Videoni YouTube&apos;ga <b>Unlisted</b> (ro&apos;yxatda yo&apos;q) qilib yuklang va havolasini dars ostiga
            qo&apos;ying — talabalar uni saytning o&apos;zida ko&apos;radi. <b>Birinchi darsning videosi</b> kurs
            sahifasida hamma uchun bepul ko&apos;rsatiladi.
          </p>
        </div>
      </div>

      <div className="border border-red-200 bg-red-50/50 rounded-xl p-5">
        <h2 className="font-semibold text-red-700 text-sm">Xavfli hudud</h2>
        <p className="text-sm text-gray-600 mt-1">
          Kurs o&apos;chirilsa, uni qayta tiklab bo&apos;lmaydi. Sotib olingan kursni o&apos;chirib
          bo&apos;lmaydi — uni yashiring.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          disabled={busy}
          className="mt-3 text-sm font-medium text-red-600 border border-red-300 px-4 py-2 rounded-xl hover:bg-red-50 disabled:opacity-60"
        >
          Kursni o&apos;chirish
        </button>
      </div>
    </div>
  );
}
