import { NextResponse } from "next/server";

import { search } from "../../_lib/searchIndex";

export const dynamic = "force-dynamic";

/** GET /api/search?q=ファイアウォール */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  if (q.trim().length === 0) return NextResponse.json({ hits: [] });

  return NextResponse.json({ hits: await search(q) });
}
