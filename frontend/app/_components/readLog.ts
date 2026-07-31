/** { "/cookie": ["2026-07-28", "2026-07-25"] } */
export type ReadLog = Record<string, string[]>;

const pad = (n: number) => String(n).padStart(2, "0");

/** ローカル時間の YYYY-MM-DD。UTC に寄せると日付がずれるので toISOString は使わない */
export function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayKey(): string {
  return toDateKey(new Date());
}

/** 2026-07-28 → 2026/07/28 */
export function formatDate(key: string): string {
  return key.replaceAll("-", "/");
}

/** その日から今日までの経過日数。今日なら 0 */
export function daysSince(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  const then = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today.getTime() - then.getTime()) / 86_400_000);
}

export async function fetchReadLog(): Promise<ReadLog> {
  const res = await fetch("/api/read-log", { cache: "no-store" });
  if (!res.ok) throw new Error(`read-log の取得に失敗しました (${res.status})`);
  return res.json();
}

export async function updateReadLog(
  method: "POST" | "DELETE",
  path: string,
  date: string,
): Promise<ReadLog> {
  const res = await fetch("/api/read-log", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, date }),
  });
  if (!res.ok) throw new Error(`read-log の更新に失敗しました (${res.status})`);
  return res.json();
}
