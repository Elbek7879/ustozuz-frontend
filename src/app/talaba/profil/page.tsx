"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";
import RequireRole from "@/components/RequireRole";
import { useAuth } from "@/lib/auth/AuthContext";
import { ApiError, changePassword, updateProfile } from "@/lib/api";

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition";

const roleLabels = { STUDENT: "Talaba", INSTRUCTOR: "Ustoz", ADMIN: "Admin" } as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function errorMessage(err: unknown) {
  return err instanceof ApiError ? err.message : "Xatolik yuz berdi";
}

function ProfileContent() {
  const { user, token, updateUser } = useAuth();
  const [profile, setProfile] = useState({ name: "", phone: "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) setProfile({ name: user.name, phone: user.phone ?? "" });
  }, [user]);

  if (!user || !token) return null;

  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSavingProfile(true);
    try {
      updateUser(await updateProfile(token, profile));
      toast.success("Profil saqlandi");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSavingProfile(false);
    }
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (passwords.next !== passwords.confirm) {
      toast.error("Yangi parollar bir-biriga mos kelmadi");
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword(token, { currentPassword: passwords.current, newPassword: passwords.next });
      toast.success("Parol yangilandi");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-6">
      <div>
        <h1 className="text-lg md:text-xl font-bold text-gray-900">Profil</h1>
        <p className="mt-1 text-gray-500 text-sm">Shaxsiy ma&apos;lumotlaringiz va hisob sozlamalari.</p>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-5 rounded-3xl bg-white ring-1 ring-gray-200 p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xl font-semibold flex items-center justify-center">
            {initials(user.name)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">
              {user.email} • {roleLabels[user.role]}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ism va familiya</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Elektron pochta</label>
          <input
            type="email"
            value={user.email}
            disabled
            className={`${inputClass} bg-gray-50 text-gray-500`}
          />
          <p className="text-xs text-gray-400 mt-1">Email hisobingizga kirish uchun ishlatiladi va o&apos;zgarmaydi.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefon raqam</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-xl bg-gray-50 text-sm text-gray-600">
              +998
            </span>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              inputMode="numeric"
              pattern="[0-9]{9}"
              maxLength={9}
              placeholder="901234567"
              className="w-full border border-gray-300 rounded-r-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={savingProfile}
          className="bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-800 transition disabled:opacity-60"
        >
          {savingProfile ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="space-y-5 rounded-3xl bg-white ring-1 ring-gray-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900">Parolni o&apos;zgartirish</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Joriy parol</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parolni takrorlang</label>
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
          disabled={savingPassword}
          className="border border-indigo-600 text-indigo-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-50 disabled:opacity-60 transition"
        >
          {savingPassword ? "Yangilanmoqda..." : "Parolni yangilash"}
        </button>
      </form>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <RequireRole>
      <main>
        <Header />
        <StudentNav />
        <ProfileContent />
        <Footer />
      </main>
    </RequireRole>
  );
}
