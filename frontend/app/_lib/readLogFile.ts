import { promises as fs } from "fs";
import path from "path";

import type { ReadLog } from "../_components/readLog";

/**
 * 読んだ日の記録は data/read-log.json に持つ。
 * ローカルで next dev を動かす前提（サーバレスにデプロイすると fs が読み取り専用で書き込めない）。
 */

const FILE = path.join(process.cwd(), "data", "read-log.json");

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidPath(v: unknown): v is string {
  return typeof v === "string" && v.startsWith("/") && !v.includes("..");
}

export function isValidDate(v: unknown): v is string {
  if (typeof v !== "string" || !DATE_RE.test(v)) return false;
  // 2026-02-31 のような「形式は合うが存在しない日」を弾く
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

export async function loadReadLog(): Promise<ReadLog> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch {
    return {};
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return {};
  }

  const log: ReadLog = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (!isValidPath(key) || !Array.isArray(value)) continue;
    const dates = value.filter(isValidDate);
    if (dates.length > 0) log[key] = dates;
  }
  return log;
}

export async function saveReadLog(log: ReadLog): Promise<void> {
  // キーとファイル内の並びを安定させて、git の差分を読みやすくする
  const sorted: ReadLog = {};
  for (const key of Object.keys(log).sort()) {
    const dates = [...new Set(log[key])].sort().reverse();
    if (dates.length > 0) sorted[key] = dates;
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}
