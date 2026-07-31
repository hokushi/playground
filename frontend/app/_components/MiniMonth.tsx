"use client";

import { toDateKey } from "./readLog";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * 1 か月ぶんの小さいカレンダー。読んだ日だけ色を付ける。
 * 「このページ、当分読んでないな」が一目で分かることを狙った表示。
 */
export default function MiniMonth({
  year,
  month,
  readDates,
  today,
}: {
  year: number;
  /** 0 始まり */
  month: number;
  readDates: Set<string>;
  today: string;
}) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (string | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      toDateKey(new Date(year, month, i + 1)),
    ),
  ];

  return (
    <div className="flex flex-col gap-1">
      <p className="text-center text-[11.5px] font-medium text-zinc-500 dark:text-zinc-400">
        {year} / {month + 1}
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            className="text-center text-[9px] leading-4 text-zinc-400 dark:text-zinc-600"
          >
            {w}
          </div>
        ))}
        {cells.map((key, i) => {
          if (key === null) return <div key={`blank-${i}`} />;

          const isRead = readDates.has(key);
          const isToday = key === today;

          return (
            <div
              key={key}
              title={isRead ? `${key} に読んだ` : key}
              className={`flex aspect-square items-center justify-center rounded-[3px] text-[10px] leading-none ${
                isRead
                  ? "bg-emerald-400 font-semibold text-white dark:bg-emerald-600"
                  : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800/70 dark:text-zinc-600"
              } ${isToday ? "ring-1 ring-indigo-400" : ""}`}
            >
              {Number(key.slice(8, 10))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
