"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { href: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "並行処理",
    items: [
      { href: "/web-worker", label: "Web Worker" },
      { href: "/threads", label: "Threads & Memory" },
    ],
  },
  {
    label: "ネットワーク",
    items: [
      { href: "/network", label: "有線と無線" },
      { href: "/network/internet", label: "インターネットの裏側" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      navGroups.map((g) => [
        g.label,
        g.items.some((i) => i.href === pathname) || g.items.length > 0,
      ]),
    ),
  );

  const toggle = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="w-60 shrink-0 border-r border-black/10 bg-white dark:border-white/10 dark:bg-black">
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
    </aside>
  );
}
