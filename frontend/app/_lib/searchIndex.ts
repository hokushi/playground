import { promises as fs } from "fs";
import path from "path";

import { pageLabel } from "../_components/nav";

/**
 * app/**\/page.tsx のソースを直接読んで全文検索する。
 * ローカルで next dev を動かす前提（readLogFile.ts と同じスタンス）。
 * ビルド時にインデックスを吐くのではなく毎回ソースを見るので、
 * ページを書き換えたら即座に検索結果へ反映される。mtime が変わったファイルだけ読み直す。
 */

const APP_DIR = path.join(process.cwd(), "app");

export type SearchHit = {
  href: string;
  title: string;
  /** 見出し（セクション）名。ページ冒頭など見出しの外なら null */
  section: string | null;
  /** 見出しの id。あれば #anchor 付きで飛べる */
  anchor: string | null;
  snippet: string;
  /** snippet 内でハイライトする [開始位置, 長さ] */
  marks: [number, number][];
  score: number;
};

type Entry = { heading: string | null; anchor: string | null; text: string };
type PageDoc = { href: string; title: string; titleText: string; entries: Entry[] };

/** <h1>〜<h6> と、各ページが自前で持っている <SectionH2> を見出しとして扱う */
const HEADING_RE = /<(h[1-6]|SectionH2)\b([^>]*)>([\s\S]*?)<\/\1>/g;
/** JSX のテキストノード（タグとタグの間）だけを拾う。属性や JS コードは自然に除外される */
const TEXT_NODE_RE = />([^<>]*)</g;
/** <Code>{`...`}</Code> のようなコードブロック。${} を含むものは className 等なので除外 */
const CODE_BLOCK_RE = /\{`([^`$]*)`\}/g;
const ID_RE = /\bid="([^"]+)"/;
/** 記号だけの断片を捨てるための判定（英数字・かな・漢字・全角） */
const MEANINGFUL = /[A-Za-z0-9぀-ヿ㐀-鿿＀-￯]/;

function clean(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePage(src: string, href: string): PageDoc {
  const headings: {
    start: number;
    end: number;
    tag: string;
    id: string | null;
    text: string;
  }[] = [];
  for (const m of src.matchAll(HEADING_RE)) {
    const text = clean(m[3]);
    if (!text) continue;
    headings.push({
      start: m.index,
      end: m.index + m[0].length,
      tag: m[1],
      id: ID_RE.exec(m[2])?.[1] ?? null,
      text,
    });
  }

  const insideHeading = (i: number) =>
    headings.some((h) => i >= h.start && i < h.end);

  const nodes: { index: number; text: string }[] = [];
  for (const m of src.matchAll(TEXT_NODE_RE)) {
    const index = m.index + 1;
    if (insideHeading(index)) continue;
    const text = clean(m[1]);
    if (text.length >= 2 && MEANINGFUL.test(text)) nodes.push({ index, text });
  }
  for (const m of src.matchAll(CODE_BLOCK_RE)) {
    if (insideHeading(m.index)) continue;
    const text = m[1].replace(/\s+/g, " ").trim();
    if (text.length >= 2 && MEANINGFUL.test(text)) {
      nodes.push({ index: m.index, text });
    }
  }
  nodes.sort((a, b) => a.index - b.index);

  // 見出しごとに本文をまとめて 1 エントリにする
  const entries: Entry[] = [];
  let current: Entry = { heading: null, anchor: null, text: "" };
  let anchor: string | null = null;
  let hi = 0;

  const flush = () => {
    if (current.text) entries.push(current);
  };

  for (const node of nodes) {
    while (hi < headings.length && headings[hi].start < node.index) {
      const h = headings[hi];
      hi++;
      if (h.tag === "h1") continue; // h1 はページタイトル扱い。セクションの区切りにはしない
      if (h.id) anchor = h.id;
      flush();
      current = { heading: h.text, anchor: h.id ?? anchor, text: "" };
    }
    current.text += (current.text ? " " : "") + node.text;
  }
  flush();

  const navLabel = pageLabel(href);
  const h1 = headings.find((h) => h.tag === "h1")?.text;
  const title = navLabel !== href ? navLabel : (h1 ?? href);

  return { href, title, titleText: `${title} ${h1 ?? ""}`, entries };
}

function hrefOf(file: string): string {
  const rel = path.relative(APP_DIR, path.dirname(file));
  const segs = rel
    .split(path.sep)
    .filter((s) => s && !s.startsWith("(")); // ルートグループは URL に出ない
  return "/" + segs.join("/");
}

async function collectPageFiles(dir: string, out: string[] = []): Promise<string[]> {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "api" || e.name === "node_modules") {
      continue;
    }
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await collectPageFiles(p, out);
    else if (e.name === "page.tsx") out.push(p);
  }
  return out;
}

const cache = new Map<string, { mtimeMs: number; doc: PageDoc }>();

async function loadDocs(): Promise<PageDoc[]> {
  const files = await collectPageFiles(APP_DIR);
  const docs = await Promise.all(
    files.map(async (file) => {
      const { mtimeMs } = await fs.stat(file);
      const cached = cache.get(file);
      if (cached && cached.mtimeMs === mtimeMs) return cached.doc;

      const src = await fs.readFile(file, "utf8");
      const doc = parsePage(src, hrefOf(file));
      cache.set(file, { mtimeMs, doc });
      return doc;
    }),
  );
  return docs;
}

function countOf(hay: string, needle: string): number {
  let n = 0;
  let i = hay.indexOf(needle);
  while (i >= 0) {
    n++;
    i = hay.indexOf(needle, i + needle.length);
  }
  return n;
}

/** 重なった範囲をつぶす（<mark> の入れ子を避ける） */
function mergeMarks(marks: [number, number][]): [number, number][] {
  const sorted = [...marks].sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const [start, len] of sorted) {
    const last = out[out.length - 1];
    if (last && start <= last[0] + last[1]) {
      last[1] = Math.max(last[1], start + len - last[0]);
    } else {
      out.push([start, len]);
    }
  }
  return out;
}

const SNIPPET_LEN = 120;

function makeSnippet(text: string, terms: string[]) {
  const lc = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lc.indexOf(t);
    if (i >= 0 && (at < 0 || i < at)) at = i;
  }
  if (at < 0) at = 0;

  let start = Math.max(0, at - 40);
  const end = Math.min(text.length, start + SNIPPET_LEN);
  if (end - start < SNIPPET_LEN) start = Math.max(0, end - SNIPPET_LEN);

  const prefix = start > 0 ? "…" : "";
  const body = text.slice(start, end);
  const bodyLc = body.toLowerCase();

  const marks: [number, number][] = [];
  for (const t of terms) {
    let i = bodyLc.indexOf(t);
    while (i >= 0) {
      marks.push([i + prefix.length, t.length]);
      i = bodyLc.indexOf(t, i + t.length);
    }
  }

  return {
    snippet: prefix + body + (end < text.length ? "…" : ""),
    marks: mergeMarks(marks),
  };
}

const MAX_PER_PAGE = 3;

/** スペース区切りの語をすべて含むセクションを返す（AND 検索） */
export async function search(query: string, limit = 24): Promise<SearchHit[]> {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5);
  if (terms.length === 0) return [];

  const docs = await loadDocs();
  const hits: SearchHit[] = [];

  for (const doc of docs) {
    const titleLc = doc.titleText.toLowerCase();
    const perPage: SearchHit[] = [];

    for (const entry of doc.entries) {
      const textLc = entry.text.toLowerCase();
      const headingLc = (entry.heading ?? "").toLowerCase();
      if (!terms.every((t) => textLc.includes(t) || headingLc.includes(t))) {
        continue;
      }

      let score = 0;
      for (const t of terms) {
        score += countOf(textLc, t);
        if (headingLc.includes(t)) score += 8;
        if (titleLc.includes(t)) score += 5;
      }

      const { snippet, marks } = makeSnippet(entry.text, terms);
      perPage.push({
        href: doc.href,
        title: doc.title,
        section: entry.heading,
        anchor: entry.anchor,
        snippet,
        marks,
        score,
      });
    }

    // 本文には無いがページタイトルに含まれる場合も 1 件だけ拾う
    if (perPage.length === 0 && terms.every((t) => titleLc.includes(t))) {
      perPage.push({
        href: doc.href,
        title: doc.title,
        section: null,
        anchor: null,
        snippet: doc.entries[0]?.text.slice(0, SNIPPET_LEN) ?? "",
        marks: [],
        score: 6,
      });
    }

    perPage.sort((a, b) => b.score - a.score);
    hits.push(...perPage.slice(0, MAX_PER_PAGE));
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}
