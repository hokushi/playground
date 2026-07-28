"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import MiniMonth from "./MiniMonth";
import { EXCLUDED_PATHS } from "./nav";
import {
  daysSince,
  fetchReadLog,
  formatDate,
  todayKey,
  updateReadLog,
  type ReadLog,
} from "./readLog";

/** カレンダーに出す月数（今月を含めて過去 N か月） */
const MONTHS = 3;

/** 経過日数に応じて色を変える。放置しているほど強い色になる */
function staleTone(days: number) {
  if (days <= 7) {
    return "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200";
  }
  if (days <= 30) {
    return "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200";
  }
  return "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200";
}

function staleText(days: number): string {
  if (days === 0) return "今日読んだ";
  if (days === 1) return "昨日読んだ";
  return `最後に読んでから ${days} 日`;
}

/** 各ページの一番下に出す、そのページの読書記録 */
export default function ReadLogSection({ initialLog }: { initialLog: ReadLog }) {
  const pathname = usePathname();
  if (EXCLUDED_PATHS.has(pathname)) return null;

  // key を付けてページごとに作り直す。state のリセットを effect でやらずに済む
  return (
    <ReadLogSectionInner
      key={pathname}
      pathname={pathname}
      initialDates={initialLog[pathname] ?? []}
    />
  );
}

function ReadLogSectionInner({
  pathname,
  initialDates,
}: {
  pathname: string;
  initialDates: string[];
}) {
  // サーバから初期値をもらうので「読み込み中」を出さずに済む
  const [dates, setDates] = useState<string[]>(initialDates);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // クライアント遷移でページを行き来したときのために、裏で最新を取り直す
  useEffect(() => {
    let cancelled = false;

    fetchReadLog()
      .then((log) => {
        if (!cancelled) setDates(log[pathname] ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("読み込みに失敗しました");
      });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const toggle = useCallback(async () => {
    if (saving) return;

    const today = todayKey();
    const method = dates.includes(today) ? "DELETE" : "POST";

    setSaving(true);
    setError(null);
    try {
      const log = await updateReadLog(method, pathname, today);
      setDates(log[pathname] ?? []);
    } catch {
      setError("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }, [dates, saving, pathname]);

  const readDates = useMemo(() => new Set(dates), [dates]);

  /** 今月を右端にして、過去 MONTHS か月ぶん */
  const months = useMemo(() => {
    const now = new Date();
    return Array.from({ length: MONTHS }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (MONTHS - 1 - i), 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }, []);

  const today = todayKey();
  const readToday = dates.includes(today);
  const lastRead = dates[0] ?? null;

  return (
    <div className="mx-auto w-full max-w-3xl px-8 pb-12">
      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white px-5 py-5 dark:border-zinc-800 dark:bg-zinc-950/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            このページを読んだ日
          </h2>
          {lastRead && (
            <span className="text-[12.5px] text-zinc-500 dark:text-zinc-400">
              計 {dates.length} 回 / 最後は {formatDate(lastRead)}
            </span>
          )}
        </div>

        {/* 放置ぐあいを一番目立たせる */}
        {lastRead === null ? (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13.5px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
            まだ一度も読んでいない
          </div>
        ) : (
          <div
            className={`rounded-md border px-4 py-2.5 text-[13.5px] font-semibold ${staleTone(
              daysSince(lastRead),
            )}`}
          >
            {staleText(daysSince(lastRead))}
          </div>
        )}

        {/* そのページだけのカレンダー */}
        <div className="grid gap-4 sm:grid-cols-3">
          {months.map((m) => (
            <MiniMonth
              key={`${m.year}-${m.month}`}
              year={m.year}
              month={m.month}
              readDates={readDates}
              today={today}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={toggle}
            disabled={saving}
            title={readToday ? "クリックで今日の記録を取り消す" : undefined}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              readToday
                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            {saving ? "保存中…" : readToday ? "✓ 今日読んだ" : "今日読んだ"}
          </button>

          <Link
            href="/reads"
            className="text-[12.5px] text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            全ページの記録を見る
          </Link>
        </div>

        {error && (
          <p className="text-[12.5px] text-rose-600 dark:text-rose-400">{error}</p>
        )}
      </section>
    </div>
  );
}
