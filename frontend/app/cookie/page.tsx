import type { ReactNode } from "react";

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  );
}

type Tone = "indigo" | "violet" | "amber" | "emerald" | "sky" | "rose";

/** カードは薄い色の背景 + 左のライン + 見出しの色 */
const cardTone: Record<Tone, { card: string; head: string }> = {
  indigo: {
    card: "border-indigo-100 border-l-indigo-400 bg-indigo-50/40 dark:border-indigo-950 dark:border-l-indigo-600 dark:bg-indigo-950/15",
    head: "text-indigo-800 dark:text-indigo-300",
  },
  violet: {
    card: "border-violet-100 border-l-violet-400 bg-violet-50/40 dark:border-violet-950 dark:border-l-violet-600 dark:bg-violet-950/15",
    head: "text-violet-800 dark:text-violet-300",
  },
  amber: {
    card: "border-amber-100 border-l-amber-400 bg-amber-50/40 dark:border-amber-950 dark:border-l-amber-600 dark:bg-amber-950/15",
    head: "text-amber-800 dark:text-amber-300",
  },
  emerald: {
    card: "border-emerald-100 border-l-emerald-400 bg-emerald-50/40 dark:border-emerald-950 dark:border-l-emerald-600 dark:bg-emerald-950/15",
    head: "text-emerald-800 dark:text-emerald-300",
  },
  sky: {
    card: "border-sky-100 border-l-sky-400 bg-sky-50/40 dark:border-sky-950 dark:border-l-sky-600 dark:bg-sky-950/15",
    head: "text-sky-800 dark:text-sky-300",
  },
  rose: {
    card: "border-rose-100 border-l-rose-400 bg-rose-50/40 dark:border-rose-950 dark:border-l-rose-600 dark:bg-rose-950/15",
    head: "text-rose-800 dark:text-rose-300",
  },
};

function Card({
  tone,
  title,
  children,
}: {
  tone: Tone;
  title: string;
  children: ReactNode;
}) {
  const t = cardTone[tone];
  return (
    <section
      className={`flex flex-col gap-3 rounded-lg border border-l-4 px-5 py-4 ${t.card}`}
    >
      <h2 className={`text-lg font-semibold ${t.head}`}>{title}</h2>
      {children}
    </section>
  );
}

/** フロー図の 1 ブロック。登場人物ごとに薄く色分けする */
function Box({
  actor,
  label,
  sub,
  note,
}: {
  actor: "browser" | "server" | "storage" | "neutral";
  label: string;
  sub?: string;
  note?: string;
}) {
  const style = {
    browser:
      "border-indigo-200 bg-indigo-50/70 dark:border-indigo-900/50 dark:bg-indigo-950/25",
    server:
      "border-violet-200 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/25",
    storage:
      "border-amber-200 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/25",
    neutral: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50",
  }[actor];
  const head = {
    browser: "text-indigo-900 dark:text-indigo-200",
    server: "text-violet-900 dark:text-violet-200",
    storage: "text-amber-900 dark:text-amber-200",
    neutral: "text-zinc-900 dark:text-zinc-100",
  }[actor];
  return (
    <div className={`w-full rounded-lg border px-4 py-2.5 ${style}`}>
      <p className={`text-sm font-semibold ${head}`}>{label}</p>
      {sub && (
        <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{sub}</p>
      )}
      {note && (
        <p className="mt-1 text-[12.5px] text-zinc-500 dark:text-zinc-400">{note}</p>
      )}
    </div>
  );
}

/** ブロック同士をつなぐ矢印。header に HTTP ヘッダを添えられる */
function Arrow({
  text,
  header,
  up,
}: {
  text: string;
  header?: string;
  up?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-1.5">
      <span className="text-lg leading-none text-zinc-400 dark:text-zinc-600">
        {up ? "↑" : "↓"}
      </span>
      <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">{text}</span>
      {header && (
        <span className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {header}
        </span>
      )}
    </div>
  );
}

/** フロー図の外枠 */
function Flow({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950/30">
      <p className="mb-3 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
        {caption}
      </p>
      <div className="flex flex-col items-center gap-0">{children}</div>
    </div>
  );
}

/** 判断が起きる場所を示すブロック */
function Verdict({
  kind,
  label,
  sub,
}: {
  kind: "ok" | "ng";
  label: string;
  sub?: string;
}) {
  const style =
    kind === "ok"
      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"
      : "border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/30";
  const head =
    kind === "ok"
      ? "text-emerald-900 dark:text-emerald-200"
      : "text-rose-900 dark:text-rose-200";
  return (
    <div className={`w-full rounded-lg border px-4 py-2.5 ${style}`}>
      <p className={`text-sm font-semibold ${head}`}>{label}</p>
      {sub && (
        <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{sub}</p>
      )}
    </div>
  );
}

/** Set-Cookie / Cookie ヘッダの実物を見せるブロック */
function Snippet({ title, lines }: { title?: string; lines: string[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
      {title && (
        <p className="mb-1.5 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
      )}
      <pre className="whitespace-pre font-mono text-[12.5px] leading-6 text-zinc-700 dark:text-zinc-300">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

/** 「送られる / 送られない」を色付きで表す小さいバッジ */
function Mark({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <span
      className={
        ok
          ? "text-emerald-700 dark:text-emerald-400"
          : "text-rose-700 dark:text-rose-400"
      }
    >
      {ok ? "✅ " : "❌ "}
      {children}
    </span>
  );
}

/** Domain の書き方 1 パターンぶん。保存されるか → どう保存されるか → どこに送られるか の順で見せる */
function DomainCase({
  header,
  caption,
  stored,
  record,
  sends,
}: {
  header: string;
  caption: string;
  stored: { ok: boolean; text: string };
  record: { field: string; value: string; note?: string }[] | null;
  sends: { host: string; ok: boolean; note: string }[];
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-lg border px-4 py-3 ${
        stored.ok
          ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/40"
          : "border-rose-200 bg-rose-50/60 dark:border-rose-900/50 dark:bg-rose-950/20"
      }`}
    >
      <div>
        <p className="break-all font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
          {header}
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">{caption}</p>
      </div>

      <div className="flex flex-col gap-2 border-t border-zinc-200 pt-2.5 dark:border-zinc-800">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="w-40 shrink-0 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
            ブラウザに保存される？
          </span>
          <span className="text-[12.5px]">
            <Mark ok={stored.ok}>{stored.text}</Mark>
          </span>
        </div>

        {record ? (
          <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <p className="mb-1.5 text-[11.5px] text-zinc-500 dark:text-zinc-400">
              DevTools → Application → Cookies での見え方
            </p>
            <div className="flex flex-col gap-1">
              {record.map((r) => (
                <div key={r.field} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="w-16 shrink-0 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                    {r.field}
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                    {r.value}
                  </span>
                  {r.note && (
                    <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                      ← {r.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2.5 dark:border-rose-900/50 dark:bg-rose-950/30">
            <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
              DevTools → Application → Cookies での見え方
            </p>
            <p className="mt-1 text-[12.5px] text-rose-900 dark:text-rose-200">
              一覧に<strong>行そのものが作られない</strong>
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 pt-2.5 dark:border-zinc-800">
        <p className="mb-1.5 text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
          この URL を呼ぶとき、Cookie は付く？
        </p>
        <div className="flex flex-col gap-1">
          {sends.map((s) => (
            <div key={s.host} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="w-52 shrink-0 font-mono text-[12px] text-zinc-600 dark:text-zinc-400">
                {s.host}
              </span>
              <span className="text-[12.5px]">
                <Mark ok={s.ok}>{s.note}</Mark>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CookiePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Cookie は「ブラウザが預かるメモ」
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          サーバが渡したメモをブラウザが保管し、条件が合うリクエストに勝手に付けて返す。その「条件」の中心が
          Domain
        </p>
      </header>

      {/* Cookie とは */}
      <Card tone="sky" title="そもそも Cookie とは？">
        <P>
          HTTP は <strong>1 回ごとに関係が切れる（ステートレス）</strong>。
          サーバから見ると、さっきログインした人と今リクエストしてきた人が同じかどうか分からない。
          そこで <strong>ブラウザ側に小さなメモを預けておいて、毎回それを見せてもらう</strong>
          のが Cookie。
        </P>
        <P>
          ここでは <strong>フロントとバックエンドの URL が違う</strong>ケースで見ていく。
          実際の構成でよくある形で、Cookie が「どっちに紐づくのか」が分かりやすい。
        </P>

        {/* 登場人物 */}
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 px-4 py-3 dark:border-indigo-900/50 dark:bg-indigo-950/25">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              フロント（画面）
            </p>
            <p className="mt-1 font-mono text-[12.5px] text-zinc-700 dark:text-zinc-300">
              https://app.example.com
            </p>
            <p className="mt-1 text-[12.5px] text-zinc-600 dark:text-zinc-400">
              ページを表示している側
            </p>
          </div>
          <div className="rounded-lg border border-violet-200 bg-violet-50/70 px-4 py-3 dark:border-violet-900/50 dark:bg-violet-950/25">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-200">
              バックエンド（API）
            </p>
            <p className="mt-1 font-mono text-[12.5px] text-zinc-700 dark:text-zinc-300">
              https://api.example.com
            </p>
            <p className="mt-1 text-[12.5px] text-zinc-600 dark:text-zinc-400">
              Cookie を発行する側
            </p>
          </div>
        </div>

        <Flow caption="ログイン 1 回 → 以降 api.example.com へのリクエストに自動で付く">
          <Box
            actor="browser"
            label="ブラウザ（app.example.com のページを表示中）"
            sub="ログインフォームを送信"
          />
          <Arrow
            text="① ログインリクエスト（宛先はバックエンド）"
            header="POST https://api.example.com/login"
          />
          <Box
            actor="server"
            label="バックエンド api.example.com"
            sub="本人確認 OK → セッション ID を発行"
          />
          <Arrow
            text="② 「これ持っといて」（Domain に共通の親ドメインを指定）"
            up
            header="Set-Cookie: session=abc123; Domain=example.com; HttpOnly"
          />
          <Box
            actor="storage"
            label="ブラウザの Cookie 置き場に保存"
            sub="「example.com 用の Cookie」として保管される"
            note="Domain=example.com なので、example.com 配下のホストすべてに紐づく"
          />
          <Arrow
            text="③ 次のリクエスト（何もしなくても勝手に付く）"
            header="GET https://api.example.com/me + Cookie: session=abc123"
          />
          <Verdict
            kind="ok"
            label="バックエンド「abc123 = さっきの人だ」と分かる"
            sub="これでログイン状態が保てる"
          />
        </Flow>

        <div>
          <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            この Cookie（<Code>Domain=example.com</Code>）は、どこを叩いたときに付く？
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3 font-medium">リクエスト先</th>
                  <th className="py-2 pr-3 font-medium">誰？</th>
                  <th className="py-2 font-medium">Cookie は付く？</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2 pr-3 font-mono text-[12.5px]">
                    https://api.example.com/me
                  </td>
                  <td className="py-2 pr-3">バックエンド（くれた本人）</td>
                  <td className="py-2">
                    <Mark ok>付く</Mark>
                  </td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2 pr-3 font-mono text-[12.5px]">
                    https://app.example.com/...
                  </td>
                  <td className="py-2 pr-3">フロント（同じ example.com 配下）</td>
                  <td className="py-2">
                    <Mark ok>付く</Mark>
                  </td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2 pr-3 font-mono text-[12.5px]">
                    https://admin.example.com/...
                  </td>
                  <td className="py-2 pr-3">別のサブドメイン</td>
                  <td className="py-2">
                    <Mark ok>付く（意図しなくても届く）</Mark>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-mono text-[12.5px]">
                    https://other.com/...
                  </td>
                  <td className="py-2 pr-3">無関係な他人</td>
                  <td className="py-2">
                    <Mark ok={false}>付かない</Mark>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              よく入っているもの
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              セッション ID / 認証トークン / 言語・テーマ設定 / 同意フラグ
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              サイズは小さい
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              1 個あたり 4KB 程度が上限。毎回リクエストに乗るので、大きいデータを入れる場所ではない
            </p>
          </div>
        </div>
      </Card>

      {/* Set-Cookie の属性 */}
      <Card tone="emerald" title="Set-Cookie に付ける属性">
        <Snippet
          title="サーバが返すヘッダの例"
          lines={[
            "Set-Cookie: session=abc123; Domain=example.com; Path=/;",
            "            Max-Age=3600; Secure; HttpOnly; SameSite=Lax",
          ]}
        />
        <div className="flex flex-col gap-2">
          {[
            {
              name: "Domain",
              desc: "どのホストに送るか。省略すると「発行したホストだけ」。指定するとサブドメインにも広がる（次のセクションで詳しく）",
            },
            {
              name: "Path",
              desc: "どのパス以下に送るか。省略時は Set-Cookie を返した URL のディレクトリ。実務では Path=/ にすることが多い",
            },
            {
              name: "Expires / Max-Age",
              desc: "有効期限。どちらも無いと「セッション Cookie」= ブラウザを閉じたら消える（復元機能で残ることもある）",
            },
            {
              name: "Secure",
              desc: "HTTPS のときだけ送る。localhost は例外的に http でも Secure Cookie が使える",
            },
            {
              name: "HttpOnly",
              desc: "document.cookie から読めなくする。XSS 対策の基本。認証系なら基本付ける",
            },
            {
              name: "SameSite",
              desc: "別サイトからのリクエストに付けるか。Lax / Strict / None の 3 択",
            },
          ].map((a) => (
            <div
              key={a.name}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <p className="font-mono text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                {a.name}
              </p>
              <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Domain 本題 */}
      <Card tone="amber" title="本題：Domain の書き方でどう変わる？">
        <P>
          Cookie の一番ややこしいところ。書ける値のルールは 2 つだけで、
          それ以外は<strong>そもそも書けない（保存されない）</strong>。
        </P>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              ① Domain 省略 = そのホスト限定
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              「host-only cookie」と呼ばれる。発行したホストにだけ送られ、
              <strong>サブドメインには送られない</strong>
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              ② Domain 指定 = そこ + 全サブドメイン
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <Code>Domain=example.com</Code> と書くと、
              <strong>example.com とその配下すべて</strong>に送られる。範囲は狭まらず必ず広がる
            </p>
          </div>
        </div>
        <P>
          直感に反しやすいのが ②。<Code>Domain=example.com</Code> は「example.com だけ」ではなく
          「<strong>example.com 以下ぜんぶ</strong>」という意味になる。
        </P>

        {/* 保存先はページごとではない */}
        <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            前提：Cookie は「ページごと」に保存されるわけではない
          </p>
          <P>
            <Code>app.example.com</Code> の引き出しに入る、というイメージだと混乱する。 実際は
            <strong>ブラウザに Cookie 置き場が 1 つ</strong>あって、そこに 1 行ずつ入るだけ。
            その行に <Code>Domain</Code> というラベルが付いている。
          </P>
          <Snippet
            title="ブラウザの Cookie 置き場（1 つ）"
            lines={[
              "Domain: api.example.com    s=1",
              "Domain: .example.com       t=2",
              "Domain: google.com         ...",
            ]}
          />
          <P>
            受理するかどうかを決める材料は
            <strong>「その Set-Cookie を返してきたのは誰か」だけ</strong>。 今回返したのは
            <Code>api.example.com</Code> なので、ブラウザはこう判定する。
          </P>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <th className="py-2 pr-3 font-medium">書いた Domain</th>
                  <th className="py-2 pr-3 font-medium">api.example.com から見て</th>
                  <th className="py-2 font-medium">結果</th>
                </tr>
              </thead>
              <tbody className="text-zinc-700 dark:text-zinc-300">
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2 pr-3 font-mono text-[12.5px]">api.example.com</td>
                  <td className="py-2 pr-3">
                    <strong>自分自身</strong>
                  </td>
                  <td className="py-2">
                    <Mark ok>受理</Mark>
                  </td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-2 pr-3 font-mono text-[12.5px]">example.com</td>
                  <td className="py-2 pr-3">
                    <strong>自分の親</strong>
                  </td>
                  <td className="py-2">
                    <Mark ok>受理</Mark>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-mono text-[12.5px]">hoge.com</td>
                  <td className="py-2 pr-3">無関係な他人</td>
                  <td className="py-2">
                    <Mark ok={false}>破棄</Mark>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
            ※ ページの <Code>app.example.com</Code> は、この判定に
            <strong>一度も登場しない</strong>。 「api の Cookie が app に保存できるのはなぜ？」ではなく、
            <strong>「api.example.com が自分の名前で 1 行書いた」</strong>だけ。
            ページはたまたま app を開いていた、という関係でしかない。
          </p>
        </div>

        <Flow caption="api.example.com が発行した Cookie が、保存されるか / どこに付くか">
          <Box
            actor="server"
            label="バックエンド api.example.com がログイン成功時に Set-Cookie"
            sub="ページを表示しているフロントは app.example.com（判定には関係しない）"
            note="Domain をどう書くかで、保存されるかどうかから変わる"
          />
          <div className="flex w-full flex-col gap-3 pt-3">
            <DomainCase
              header="Set-Cookie: s=1"
              caption="Domain 省略 → host-only（くれた本人だけ）"
              stored={{ ok: true, text: "保存される" }}
              record={[
                { field: "Name", value: "s" },
                { field: "Value", value: "1" },
                {
                  field: "Domain",
                  value: "api.example.com",
                  note: "先頭に . が付かない = このホスト限定の印",
                },
                { field: "Path", value: "/", note: "Set-Cookie を返した URL から決まる" },
              ]}
              sends={[
                { host: "api.example.com（API）", ok: true, note: "発行元そのものなので付く" },
                { host: "app.example.com（フロント）", ok: false, note: "別ホストなので付かない" },
                { host: "example.com", ok: false, note: "親でも付かない" },
              ]}
            />
            <DomainCase
              header="Set-Cookie: s=1; Domain=example.com"
              caption="親ドメイン指定 → example.com 配下ぜんぶ"
              stored={{ ok: true, text: "保存される" }}
              record={[
                { field: "Name", value: "s" },
                { field: "Value", value: "1" },
                {
                  field: "Domain",
                  value: ".example.com",
                  note: "先頭に . が付く = 配下すべてに送る印",
                },
                { field: "Path", value: "/" },
              ]}
              sends={[
                { host: "api.example.com（API）", ok: true, note: "配下なので付く" },
                { host: "app.example.com（フロント）", ok: true, note: "配下なので付く" },
                { host: "example.com", ok: true, note: "本体にも付く" },
              ]}
            />
            <DomainCase
              header="Set-Cookie: s=1; Domain=hoge.com"
              caption="他人のドメイン → そもそも書けない"
              stored={{ ok: false, text: "保存されない（受信した瞬間に破棄）" }}
              record={null}
              sends={[
                { host: "api.example.com（API）", ok: false, note: "Cookie が存在しないので付けようがない" },
                { host: "app.example.com（フロント）", ok: false, note: "同上" },
                { host: "hoge.com", ok: false, note: "同上" },
              ]}
            />
          </div>
        </Flow>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900/90 dark:text-amber-200/90">
            <Code>Domain=hoge.com</Code> のポイントは、
            <strong>「API を呼ぶときに付かない」のではなく「そもそも保存されていない」</strong>こと。
            ブラウザは <Code>Set-Cookie</Code> を受け取った瞬間に
            「返してきた <Code>api.example.com</Code> は <Code>hoge.com</Code> 自身か、その子孫か？」を判定し、
            違うので Cookie ごと捨てる。 DevTools → Application → Cookies を見ても
            <strong>行自体が無い</strong>（Network タブの <Code>Set-Cookie</Code> には警告アイコンが付く）。
          </p>
        </div>
      </Card>

      {/* ポートとスキーム */}
      <Card tone="rose" title="ハマりどころ：Cookie は「オリジン」単位ではない">
        <P>
          CORS は <strong>スキーム + ホスト + ポート</strong> の 3 点一致で判定するが、
          Cookie のスコープは<strong>ホスト（+ Path）だけ</strong>。
          <strong>ポートは一切見ない</strong>。
        </P>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium">発行元</th>
                <th className="py-2 pr-3 font-medium">送信先</th>
                <th className="py-2 font-medium">Cookie は付く？</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost:3000</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost:3002</td>
                <td className="py-2">
                  <Mark ok>付く（ポートは無視されるので同じ localhost 扱い）</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">https://example.com</td>
                <td className="py-2">
                  <Mark ok>付く（Secure が無ければスキームも問わない）</Mark>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://127.0.0.1</td>
                <td className="py-2">
                  <Mark ok={false}>付かない（文字列として別ホスト）</Mark>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          つまり <Code>localhost:3000</Code> と <Code>localhost:3002</Code> は
          <strong>CORS 的には別オリジンだが、Cookie 的には同じホスト</strong>。
          「CORS で怒られるのに Cookie は共有されている」という一見矛盾した状況は、この差から来ている。
        </P>
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/50 dark:bg-rose-950/30">
          <p className="text-sm text-rose-900/90 dark:text-rose-200/90">
            ちなみに <Code>localhost</Code> は <Code>Domain=localhost</Code> と書ける。
            ただし <Code>Domain=localhost:3000</Code> のように
            <strong>ポートを書くと無効</strong>になり、Cookie ごと捨てられる。
          </p>
        </div>
      </Card>

      {/* Path */}
      <Card tone="sky" title="Path はどのパス以下に送るか">
        <P>
          <Code>Path</Code> は<strong>前方一致</strong>で判定される。
          <Code>Path=/admin</Code> なら <Code>/admin</Code> と <Code>/admin/users</Code> には付くが、
          <Code>/</Code> や <Code>/login</Code> には付かない。
        </P>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium">Path</th>
                <th className="py-2 pr-3 font-medium">リクエスト先</th>
                <th className="py-2 font-medium">結果</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">/</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">/api/users</td>
                <td className="py-2">
                  <Mark ok>付く</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">/admin</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">/admin/users</td>
                <td className="py-2">
                  <Mark ok>付く</Mark>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-mono text-[12.5px]">/admin</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">/api/users</td>
                <td className="py-2">
                  <Mark ok={false}>付かない</Mark>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
          ※ Path はセキュリティ境界ではない（同じサイトの JS からは回避できる）。
          アクセス制御の代わりに使わないこと。実務では <Code>Path=/</Code> が基本。
        </p>
      </Card>

      {/* TODO */}
      <section className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-5 py-4 dark:border-zinc-700 dark:bg-zinc-900/40">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          TODO
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          SameSite について余裕あらば学ぶ
          <span className="ml-2 text-[13px] text-zinc-500 dark:text-zinc-400">
            （2026/7/27）
          </span>
        </p>
      </section>
    </main>
  );
}
