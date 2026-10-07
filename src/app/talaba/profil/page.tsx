"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import { studentProfile } from "@/lib/student";

const inputClass =
  "w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500";

const mockNotice =
  "Namuna rejim: o'zgarishlar hali saqlanmaydi (backend ulanmagan)";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(studentProfile);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Profil:", profile);
    toast(mockNotice, { icon: "ℹ️" });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      toast.error("Yangi parollar bir-biriga mos kelmadi");
      return;
    }
    toast(mockNotice, { icon: "ℹ️" });
    setPasswords({ current: "", next: "", confirm: "" });
  }

  function handleDelete() {
    if (
      confirm(
        "Hisobingizni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."
      )
    ) {
      toast(mockNotice, { icon: "ℹ️" });
    }
  }

  return (
    <main>
      <Header />
      <StudentNav />

      <section className="max-w-2xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profil</h1>
          <p className="text-gray-500 text-sm">
            Shaxsiy ma&apos;lumotlaringiz va hisob sozlamalari.
          </p>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xl font-semibold flex items-center justify-center">
              {initials(profile.name)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{profile.name}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ism va familiya
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Elektron pochta
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon raqam
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-sm text-gray-600">
                +998
              </span>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                required
                inputMode="numeric"
                pattern="[0-9]{9}"
                maxLength={9}
                className="w-full border border-gray-300 rounded-r-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-md hover:bg-indigo-800"
          >
            Saqlash
          </button>
        </form>

        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-5 border-t border-gray-200 pt-10"
        >
          <h2 className="font-semibold text-gray-900">Parolni o&apos;zgartirish</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Joriy parol
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              required
              className={inputClass}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yangi parol
              </label>
              <input
                type="password"
                name="next"
                value={passwords.next}
                onChange={handlePasswordChange}
                required
                minLength={6}
                placeholder="Kamida 6 ta belgi"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yangi parolni takrorlang
              </label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                required
                minLength={6}
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            className="border border-indigo-700 text-indigo-700 font-medium px-6 py-2.5 rounded-md hover:bg-indigo-50"
          >
            Parolni yangilash
          </button>
        </form>

        <div className="border border-red-200 bg-red-50/50 rounded-xl p-5">
          <h2 className="font-semibold text-red-700 text-sm">Xavfli hudud</h2>
          <p className="text-sm text-gray-600 mt-1">
            Hisobingiz o&apos;chirilsa, barcha kurslaringiz va sertifikatlaringiz
            yo&apos;qoladi.
          </p>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-3 text-sm font-medium text-red-600 border border-red-300 px-4 py-2 rounded-md hover:bg-red-50"
          >
            Hisobni o&apos;chirish
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Namuna rejim: o&apos;zgarishlar hozircha saqlanmaydi, backend ulangandan
          keyin ishlaydi.
        </p>
      </section>

      <Footer />
    </main>
  );
}