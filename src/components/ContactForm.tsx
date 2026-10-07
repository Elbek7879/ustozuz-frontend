"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ApiError, sendContactMessage } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await sendContactMessage(form);
      toast.success("Xabaringiz qabul qilindi. Tez orada javob beramiz");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Xabarni yuborib bo'lmadi");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ismingiz
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Elektron pochta
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Xabar
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-indigo-700 text-white font-medium py-2.5 rounded-md hover:bg-indigo-800 disabled:opacity-60"
      >
        {sending ? "Yuborilmoqda..." : "Yuborish"}
      </button>
    </form>
  );
}
