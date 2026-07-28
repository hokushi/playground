"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { navGroups } from "./nav";

const SIDEBAR_WIDTH_MIN = 180;
const SIDEBAR_WIDTH_MAX = 480;
const SIDEBAR_WIDTH_DEFAULT = 240;
const SIDEBAR_STORAGE_KEY = "playground:sidebar-width";

export default function Sidebar() {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navGroups.map((g) => [g.label, false])),
  );

  const toggle = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  const [width, setWidth] = useState(SIDEBAR_WIDTH_DEFAULT);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved) {
      const w = parseInt(saved, 10);
      if (!Number.isNaN(w) && w >= SIDEBAR_WIDTH_MIN && w <= SIDEBAR_WIDTH_MAX) {
        setWidth(w);
      }
    }
  }, []);

  const onResizeStart = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const clamp = (x: number) =>
      Math.max(SIDEBAR_WIDTH_MIN, Math.min(SIDEBAR_WIDTH_MAX, x));

    const onMove = (ev: PointerEvent) => {
      setWidth(clamp(ev.clientX));
    };
    const onUp = (ev: PointerEvent) => {
      const final = clamp(ev.clientX);
      setWidth(final);
      setIsDragging(false);
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(final));
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  }, []);

  return (
    <aside
      style={{ width: `${width}px` }}
      className="relative shrink-0 overflow-y-auto border-r border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="px-6 py-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Playground
        </h2>
      </div>
      <nav className="px-3">
        <ul className="flex flex-col gap-2">
          {navGroups.map((group) => {
            const isOpen = openGroups[group.label];
            return (
              <li key={group.label}>
                <button
                  type="button"
                  onClick={() => toggle(group.label)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  aria-expanded={isOpen}
                >
                  <span>{group.label}</span>
                  <svg
                    className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4 3l4 3-4 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="mt-1 flex flex-col gap-1 pl-2">
                    {group.items.length === 0 ? (
                      <li className="px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                        準備中
                      </li>
                    ) : (
                      group.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActive
                                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="サイドバーの幅を調整"
        onPointerDown={onResizeStart}
        className={`group absolute right-0 top-0 h-full w-1.5 cursor-col-resize touch-none select-none ${
          isDragging ? "bg-indigo-400/60" : "hover:bg-indigo-300/50"
        }`}
        style={{ transform: "translateX(50%)" }}
      >
        <div
          aria-hidden
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-[2px] rounded-full bg-zinc-300 transition-opacity dark:bg-zinc-600 ${
            isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{ width: 4, height: 32 }}
        />
      </div>
    </aside>
  );
}
