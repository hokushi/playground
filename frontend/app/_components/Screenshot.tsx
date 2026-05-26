"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export function Screenshot({ src, alt, width, height, caption }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <figure className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group block overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
          aria-label="スクショを拡大表示"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full cursor-zoom-in transition-opacity group-hover:opacity-90"
            unoptimized
          />
        </button>
        {caption && (
          <figcaption className="text-xs text-zinc-500 dark:text-zinc-500">
            {caption}
          </figcaption>
        )}
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
          クリックで拡大
        </p>
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[95vh] max-w-[95vw] cursor-default object-contain"
            unoptimized
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="閉じる"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ×
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
            Esc または背景クリックで閉じる
          </p>
        </div>
      )}
    </>
  );
}
