"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { pageLabel } from "../_components/nav";
import {
  fetchReadLog,
  formatDate,
  toDateKey,
  todayKey,
  type ReadLog,
} from "../_components/readLog";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/** 日付 → その日に読んだページのパス一覧 */
function byDate(log: ReadLog): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const [path, dates] of Object.entries(log)) {
    for (const date of dates) {
      const paths = map.get(date);
      if (paths) {
        paths.push(path);
      } else {
        map.set(date, [path]);
      }
    }
  }
  return map;
}

/** 読んだページ数に応じた濃さ。0 は色なし */
function cellTone(count: number): string {
  if (count === 0) {
    return "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-300";
  }
  if (count === 1) {
    return "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200";
  }
  if (count === 2) {
    return "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-900/40 dark:text-emerald-100";
  }
  return "border-emerald-400 bg-emerald-200 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-800/60 dark:text-emerald-50";
}

export default function ReadsPage() {
  const [log, setLog] = useState<ReadLog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchReadLog()
      .then(setLog)
      .catch(() => setError("記録の読み込みに失敗しました"));
  }, []);

  const dateMap = useMemo(() => byDate(log ?? {}), [log]);

  /** 月初の曜日ぶんの空セル + 各日 */
  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const blanks: (string | null)[] = Array(first.getDay()).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) =>
      toDateKey(new Date(cursor.year, cursor.month, i + 1)),
    );
    return [...blanks, ...days];
  }, [cursor]);

  const monthReadDays = useMemo(
    () => cells.filter((key) => key !== null && dateMap.has(key)).length,
    [cells, dateMap],
  );

  const totalDays = dateMap.size;
  const today = todayKey();

  const shiftMonth = (delta: number) =>
    setCursor(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  /** ページごとの最後に読んだ日（新しい順） */
  const lastReadByPage = useMemo(() => {
    return Object.entries(log ?? {})
      .map(([path, dates]) => ({ path, last: dates[0], count: dates.length }))
      .sort((a, b) => b.last.localeCompare(a.last));
  }, [log]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          読んだ日カレンダー
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          各ページ下部の「今日読んだ」を押すと、ここに色が付く
        </p>
      </header>

      {error && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      )}

      <section className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            ← 前の月
          </button>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {cursor.year} 年 {cursor.month + 1} 月
          </h2>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            次の月 →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className={`pb-1 text-center text-[11.5px] font-medium ${
                i === 0
                  ? "text-rose-500 dark:text-rose-400"
                  : i === 6
                    ? "text-sky-500 dark:text-sky-400"
                    : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {w}
            </div>
          ))}

          {cells.map((key, i) => {
            if (key === null) return <div key={`blank-${i}`} />;

            const paths = dateMap.get(key) ?? [];
            const isToday = key === today;
            const isSelected = key === selected;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(isSelected ? null : key)}
                className={`flex h-14 flex-col items-center justify-center gap-0.5 rounded-md border text-[13px] transition-colors ${cellTone(
                  paths.length,
                )} ${isSelected ? "ring-2 ring-indigo-400" : ""} ${
                  isToday ? "font-bold underline underline-offset-2" : ""
                }`}
              >
                <span>{Number(key.slice(8, 10))}</span>
                {paths.length > 0 && (
                  <span className="text-[10px] opacity-70">{paths.length} ページ</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 pt-3 text-[12.5px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span>
            {log === null
              ? "読み込み中…"
              : `この月に読んだ日 ${monthReadDays} 日 / 累計 ${totalDays} 日`}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[11.5px]">少ない</span>
            {[0, 1, 2, 3].map((n) => (
              <span
                key={n}
                className={`inline-block h-3.5 w-3.5 rounded-sm border ${cellTone(n)}`}
              />
            ))}
            <span className="text-[11.5px]">多い</span>
          </span>
        </div>
      </section>

      {selected && (
        <section className="flex flex-col gap-2 rounded-lg border border-l-4 border-indigo-100 border-l-indigo-400 bg-indigo-50/40 px-5 py-4 dark:border-indigo-950 dark:border-l-indigo-600 dark:bg-indigo-950/15">
          <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">
            {formatDate(selected)} に読んだページ
          </h2>
          {(dateMap.get(selected) ?? []).length === 0 ? (
            <p className="text-[15px] text-zinc-600 dark:text-zinc-400">
              この日は記録がない
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {(dateMap.get(selected) ?? []).sort().map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-[15px] text-indigo-700 underline underline-offset-2 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
                  >
                    {pageLabel(path)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          ページ別の最後に読んだ日
        </h2>
        {log === null ? (
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400">読み込み中…</p>
        ) : lastReadByPage.length === 0 ? (
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400">
            まだ記録がない。各ページ下部の「今日読んだ」を押すとここに並ぶ。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3 font-medium">ページ</th>
                  <th className="py-2 pr-3 font-medium">最後に読んだ日</th>
                  <th className="py-2 font-medium">回数</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                {lastReadByPage.map(({ path, last, count }) => (
                  <tr key={path} className="border-b border-zinc-100 dark:border-zinc-900">
                    <td className="py-2 pr-3">
                      <Link
                        href={path}
                        className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
                      >
                        {pageLabel(path)}
                      </Link>
                    </td>
                    <td className="py-2 pr-3 font-mono text-[12.5px]">
                      {formatDate(last)}
                    </td>
                    <td className="py-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
