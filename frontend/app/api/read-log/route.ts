import { NextResponse } from "next/server";

import {
  isValidDate,
  isValidPath,
  loadReadLog,
  saveReadLog,
} from "../../_lib/readLogFile";

export const dynamic = "force-dynamic";

async function readBody(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return null;
  }
  if (typeof body !== "object" || body === null) return null;

  const { path: p, date } = body as { path?: unknown; date?: unknown };
  if (!isValidPath(p) || !isValidDate(date)) return null;
  return { path: p, date };
}

function badRequest() {
  return NextResponse.json(
    { error: "path と date（YYYY-MM-DD）が必要です" },
    { status: 400 },
  );
}

export async function GET() {
  return NextResponse.json(await loadReadLog());
}

/** 読んだ日を追加する */
export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body) return badRequest();

  const log = await loadReadLog();
  log[body.path] = [...new Set([...(log[body.path] ?? []), body.date])];
  await saveReadLog(log);

  return NextResponse.json(await loadReadLog());
}

/** 押し間違えたときに取り消す */
export async function DELETE(request: Request) {
  const body = await readBody(request);
  if (!body) return badRequest();

  const log = await loadReadLog();
  const dates = (log[body.path] ?? []).filter((d) => d !== body.date);
  if (dates.length > 0) {
    log[body.path] = dates;
  } else {
    delete log[body.path];
  }
  await saveReadLog(log);

  return NextResponse.json(await loadReadLog());
}
