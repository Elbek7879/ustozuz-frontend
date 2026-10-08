"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, SearchX } from "lucide-react";
import { getCourses, type ApiCourseCard } from "@/lib/api";
import { coverOf } from "@/lib/images";
import { formatPrice } from "@/lib/format";

// Topilgan so'zni qalin qilib ko'rsatadi
function Highlight({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-indigo-100 text-indigo-900 rounded-sm">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

// Yozish paytida kurslarni darhol ko'rsatadigan qidiruv (header uchun)
export default function LiveSearch({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const router = useRouter();
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  // Natija qaysi so'rovga tegishli ekanini ham saqlaymiz — eski javoblar yangisining ustiga yozilmaydi
  const [data, setData] = useState<{ q: string; items: ApiCourseCard[] } | null>(null);

  const q = query.trim();
  const ready = q.length >= 2;
  const items = ready && data?.q === q ? data.items : null;
  const loading = ready && data?.q !== q;
  const showBox = open && ready;

  useEffect(() => {
    if (q.length < 2) return;
    let cancelled = false;
    const t = setTimeout(() => {
      getCourses({ q, size: 5 })
        .then((page) => !cancelled && setData({ q, items: page.items }))
        .catch(() => !cancelled && setData({ q, items: [] }));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  // Tashqariga bosilganda yopiladi
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function go(href: string) {
    setOpen(false);
    setActive(-1);
    setQuery("");
    onNavigate?.();
    router.push(href);
  }

  function searchAll() {
    if (q) go(`/kurslar?qidiruv=${encodeURIComponent(q)}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const count = items?.length ?? 0;
    if (e.key === "ArrowDown" && count) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % count);
    } else if (e.key === "ArrowUp" && count) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? count - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items && active >= 0 && items[active]) go(`/kurslar/${items[active].slug}`);
    else searchAll();
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <form onSubmit={onSubmit} role="search" className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Kurs, ustoz yoki kategoriya qidiring"
          aria-label="Qidiruv"
          role="combobox"
          aria-expanded={showBox}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          className={
            mobile
              ? "w-full border border-gray-300 rounded-full py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-indigo-500"
              : "w-full bg-gray-100/80 border border-transparent rounded-full py-2.5 pl-10 pr-10 text-sm placeholder:text-gray-500 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition"
          }
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-indigo-100 border-t-indigo-600 animate-spin" />
        )}
      </form>

      {showBox && (
        <div
          id={listId}
          role="listbox"
          className={`${
            mobile ? "mt-2" : "absolute left-0 right-0 top-full mt-2 shadow-2xl shadow-gray-300/40"
          } z-50 rounded-2xl bg-white ring-1 ring-gray-200 overflow-hidden`}
        >
          {items === null ? (
            <div className="p-3 space-y-2">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-3/4 rounded bg-gray-100 animate-pulse" />
                    <div className="h-2.5 w-1/2 rounded bg-gray-100 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="px-5 py-6 text-center">
              <SearchX className="w-7 h-7 text-gray-300 mx-auto" />
              <p className="mt-2 text-sm font-medium text-gray-700">&ldquo;{q}&rdquo; bo&apos;yicha kurs topilmadi</p>
              <p className="mt-1 text-xs text-gray-500">Boshqa so&apos;z bilan urinib ko&apos;ring: Python, dizayn, ingliz tili…</p>
            </div>
          ) : (
            <>
              <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Kurslar</p>
              <ul className="pb-1">
                {items.map((c, i) => (
                  <li key={c.id} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(`/kurslar/${c.slug}`)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition ${
                        i === active ? "bg-indigo-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image src={coverOf(c.imageUrl)} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 truncate">
                          <Highlight text={c.title} query={q} />
                        </span>
                        <span className="block text-xs text-gray-500 truncate">
                          {c.instructorName} · {c.category}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-bold text-gray-900">{formatPrice(c.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button
            type="button"
            onClick={searchAll}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition"
          >
            <span className="truncate">&ldquo;{q}&rdquo; bo&apos;yicha barcha natijalar</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
}
