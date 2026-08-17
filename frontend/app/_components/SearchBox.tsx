"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Hit = {
  href: string;
  title: string;
  section: string | null;
  anchor: string | null;
  snippet: string;
  marks: [number, number][];
};

type PanelPos = { top: number; left: number; width: number; maxHeight: number };

/** サイドバーが細くても結果は読みたいので、パネルは本文側にはみ出させる */
const PANEL_MIN_WIDTH = 420;

/** marks の位置で snippet を切って <mark> を挟む */
function Highlighted({ text, marks }: { text: string; marks: [number, number][] }) {
  if (marks.length === 0) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  marks.forEach(([start, len], i) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark
        key={i}
        className="rounded bg-amber-200 px-0.5 text-zinc-900 dark:bg-amber-400/30 dark:text-amber-100"
      >
        {text.slice(start, start + len)}
      </mark>,
    );
    cursor = start + len;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export default function SearchBox() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [pos, setPos] = useState<PanelPos | null>(null);
  /** 日本語入力の変換中かどうか。変換確定の Enter を「移動」と誤解しないために見る */
  const [composing, setComposing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  /** サイドバーは幅可変・スクロールするので、開くたびに入力欄の位置を測り直す */
  const measure = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      top: r.bottom + 6,
      left: r.left,
      width: Math.max(r.width, PANEL_MIN_WIDTH),
      maxHeight: Math.max(180, window.innerHeight - r.bottom - 24),
    });
  }, []);

  const closePanel = useCallback(() => setPanelOpen(false), []);

  const clear = () => {
    setQuery("");
    setHits([]);
    setActive(0);
    setPanelOpen(false);
    inputRef.current?.focus();
  };

  // ⌘K / Ctrl+K で入力欄へ飛ぶ
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // パネルの外を触ったら閉じる / サイドバーの幅変更・スクロールに追従する
  useEffect(() => {
    if (!panelOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!wrapRef.current?.contains(target) && !listRef.current?.contains(target)) {
        closePanel();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [panelOpen, measure, closePanel]);

  // 入力が止まってから投げる。変換中の読み（「ふぁいあ」など）では検索しない
  useEffect(() => {
    const q = query.trim();
    if (q.length === 0 || composing) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data: { hits: Hit[] } = await res.json();
        setHits(data.hits);
        setActive(0);
      } catch {
        // 打鍵のたびに前のリクエストを中断するので、その分は無視
      } finally {
        setLoading(false);
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, composing]);

  // 選択行が隠れないように追従させる
  useEffect(() => {
    listRef.current
      ?.querySelectorAll("li[data-hit]")
      [active]?.scrollIntoView({ block: "nearest" });
  }, [active, hits]);

  const go = (hit: Hit) => {
    setPanelOpen(false);
    router.push(hit.anchor ? `${hit.href}#${hit.anchor}` : hit.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // 変換中の Enter は「確定」、↑↓ は「候補選択」。IME に渡して何もしない
    if (composing || (e.nativeEvent as KeyboardEvent).isComposing) return;

    if (e.key === "Escape") {
      if (panelOpen) closePanel();
      else clear();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setPanelOpen(true);
      setActive((i) => (hits.length ? (i + 1) % hits.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (hits.length ? (i - 1 + hits.length) % hits.length : 0));
    } else if (e.key === "Enter" && panelOpen && hits[active]) {
      e.preventDefault();
      go(hits[active]);
    }
  };

  const trimmed = query.trim();

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 focus-within:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-600">
        <svg
          className="h-3.5 w-3.5 shrink-0 text-zinc-400"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10.5 10.5L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            measure();
            setPanelOpen(v.trim().length > 0);
            if (v.trim().length === 0) {
              setHits([]);
              setLoading(false);
            }
          }}
          onFocus={() => {
            measure();
            if (query.trim().length > 0) setPanelOpen(true);
          }}
          onKeyDown={onKeyDown}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          placeholder="検索"
          aria-label="ページ本文を検索"
          className="w-full min-w-0 bg-transparent py-2 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />

        {trimmed ? (
          <button
            type="button"
            onClick={clear}
            aria-label="検索をクリア"
            className="shrink-0 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : (
          <kbd className="hidden shrink-0 rounded border border-zinc-300 px-1 font-sans text-[10px] text-zinc-500 sm:inline dark:border-zinc-700 dark:text-zinc-500">
            ⌘K
          </kbd>
        )}
      </div>

      {panelOpen && pos && (
        <div
          style={{
            top: pos.top,
            left: pos.left,
            width: pos.width,
            maxHeight: pos.maxHeight,
          }}
          className="fixed z-50 flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-1.5 text-[10px] text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
            <span>
              {loading ? "検索中…" : `${hits.length} 件`}
              {hits.length > 0 && " ・ ↑↓ で選択 / Enter で移動"}
            </span>
            <button
              type="button"
              onClick={closePanel}
              className="rounded border border-zinc-200 px-1 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              esc
            </button>
          </div>

          <ul ref={listRef} className="flex-1 overflow-y-auto overscroll-contain">
            {hits.map((hit, i) => (
              <li key={`${hit.href}-${hit.anchor ?? ""}-${i}`} data-hit>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit)}
                  className={`flex w-full flex-col gap-1 border-b border-zinc-100 px-3 py-2.5 text-left dark:border-zinc-900 ${
                    i === active ? "bg-zinc-100 dark:bg-zinc-900" : ""
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {hit.title}
                    </span>
                    {hit.section && (
                      <>
                        <span aria-hidden>›</span>
                        <span className="truncate">{hit.section}</span>
                      </>
                    )}
                  </span>
                  <span className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <Highlighted text={hit.snippet} marks={hit.marks} />
                  </span>
                </button>
              </li>
            ))}

            {!loading && hits.length === 0 && (
              <li className="px-3 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
                「{trimmed}」に一致するページはありません
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
