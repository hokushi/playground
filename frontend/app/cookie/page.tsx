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

      {/* 結論 */}
      <section className="flex flex-col gap-3 rounded-lg border border-l-4 border-indigo-100 border-l-indigo-400 bg-indigo-50/40 px-5 py-4 dark:border-indigo-950 dark:border-l-indigo-600 dark:bg-indigo-950/15">
        <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">
          先に結論
        </h2>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              サーバがやること
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <Code>Set-Cookie</Code> で「これ持っといて」と渡す
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ブラウザがやること
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              保存して、条件に合うリクエストに自動で付ける
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              条件を決めるもの
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <Code>Domain</Code> / <Code>Path</Code> / <Code>Secure</Code> /{" "}
              <Code>SameSite</Code>
            </p>
          </div>
        </div>
        <P>
          CORS と同じで、<strong>判断しているのはブラウザ</strong>。 サーバは「こういう条件で持っておいて」と
          お願いするだけで、実際にどのリクエストへ Cookie を付けるかはブラウザが決める。
        </P>
      </section>

      {/* Cookie とは */}
      <Card tone="sky" title="そもそも Cookie とは？">
        <P>
          HTTP は <strong>1 回ごとに関係が切れる（ステートレス）</strong>。
          サーバから見ると、さっきログインした人と今リクエストしてきた人が同じかどうか分からない。
          そこで <strong>ブラウザ側に小さなメモを預けておいて、毎回それを見せてもらう</strong>
          のが Cookie。
        </P>
        <Flow caption="ログイン 1 回 → 以降のリクエストに自動で付く">
          <Box actor="browser" label="ブラウザ" sub="ログインフォームを送信" />
          <Arrow text="① ログインリクエスト" header="POST /login" />
          <Box actor="server" label="サーバ" sub="本人確認 OK → セッション ID を発行" />
          <Arrow
            text="② 「これ持っといて」"
            up
            header="Set-Cookie: session=abc123; HttpOnly"
          />
          <Box
            actor="storage"
            label="ブラウザの Cookie 置き場に保存"
            sub="ドメインごとに整理して保管される"
            note="DevTools → Application → Cookies で中身が見られる"
          />
          <Arrow text="③ 次のリクエスト（何もしなくても勝手に付く）" header="Cookie: session=abc123" />
          <Verdict
            kind="ok"
            label="サーバ「abc123 = さっきの人だ」と分かる"
            sub="これでログイン状態が保てる"
          />
        </Flow>
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

      {/* localStorage との違い */}
      <Card tone="violet" title="localStorage との一番の違いは「勝手に送られる」こと">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium"></th>
                <th className="py-2 pr-3 font-medium">Cookie</th>
                <th className="py-2 font-medium">localStorage</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">リクエストへの添付</td>
                <td className="py-2 pr-3">
                  <Mark ok>ブラウザが自動で付ける</Mark>
                </td>
                <td className="py-2">
                  <Mark ok={false}>自分で付けるコードが必要</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">スコープ</td>
                <td className="py-2 pr-3">ドメイン単位（サブドメインに広げられる）</td>
                <td className="py-2">オリジン単位（スキーム + ホスト + ポート）</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">JS から読めるか</td>
                <td className="py-2 pr-3">
                  <Code>HttpOnly</Code> を付ければ読めない
                </td>
                <td className="py-2">常に読める（XSS で盗まれ得る）</td>
              </tr>
              <tr>
                <td className="py-2 pr-3">有効期限</td>
                <td className="py-2 pr-3">
                  <Code>Expires</Code> / <Code>Max-Age</Code> で指定できる
                </td>
                <td className="py-2">消すまで残る</td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          認証トークンを <Code>HttpOnly</Code> Cookie に置くのは、
          <strong>JS から触れない = XSS で盗まれにくい</strong>から。 代わりに「勝手に送られる」性質が
          CSRF の入口になるので、<Code>SameSite</Code> とセットで考える。
        </P>
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
          Cookie の一番ややこしいところ。ポイントは 2 つだけ。
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

        <Flow caption="app.example.com が発行した Cookie が、どこに付くか">
          <Box
            actor="server"
            label="app.example.com がログイン成功時に Set-Cookie"
            sub="Domain をどう書くかで、届く範囲が変わる"
          />
          <div className="grid w-full gap-3 pt-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/40">
              <p className="font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
                Set-Cookie: s=1
              </p>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                Domain 省略 → host-only
              </p>
              <div className="flex flex-col gap-1 text-[12.5px]">
                <Mark ok>app.example.com</Mark>
                <Mark ok={false}>api.example.com</Mark>
                <Mark ok={false}>example.com</Mark>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/40">
              <p className="font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
                Set-Cookie: s=1; Domain=example.com
              </p>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400">
                親ドメイン指定 → 配下ぜんぶ
              </p>
              <div className="flex flex-col gap-1 text-[12.5px]">
                <Mark ok>app.example.com</Mark>
                <Mark ok>api.example.com</Mark>
                <Mark ok>example.com</Mark>
              </div>
            </div>
          </div>
        </Flow>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium">発行元</th>
                <th className="py-2 pr-3 font-medium">Set-Cookie の Domain</th>
                <th className="py-2 pr-3 font-medium">送信先</th>
                <th className="py-2 font-medium">結果</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">（省略）</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2">
                  <Mark ok>付く</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">（省略）</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">api.example.com</td>
                <td className="py-2">
                  <Mark ok={false}>付かない</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">api.example.com</td>
                <td className="py-2">
                  <Mark ok>付く（サブドメイン共有）</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">—</td>
                <td className="py-2">
                  <Mark ok={false}>Cookie 自体が拒否される（子ドメインは指定不可）</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">other.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">—</td>
                <td className="py-2">
                  <Mark ok={false}>拒否（他人のドメインには書けない）</Mark>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">api.example.com</td>
                <td className="py-2">
                  <Mark ok>付く（先頭の . は無視され example.com と同じ）</Mark>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-mono text-[12.5px]">app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">—</td>
                <td className="py-2">
                  <Mark ok={false}>拒否（公開サフィックスは指定不可）</Mark>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900/90 dark:text-amber-200/90">
            ルールを一言でまとめると <strong>「自分自身か、自分の親ドメインしか指定できない」</strong>。
            さらに <Code>.com</Code> や <Code>.co.jp</Code> のような
            <strong>公開サフィックス</strong>は指定できない（できたら全 .com サイトに Cookie を撒けてしまう）。
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

      {/* SameSite */}
      <Card tone="violet" title="SameSite：別サイトからのリクエストに付けるか">
        <P>
          「Cookie が勝手に送られる」性質を悪用するのが CSRF。
          <Code>SameSite</Code> は<strong>他サイトが起点のリクエストに Cookie を付けない</strong>
          ことでそれを防ぐ。
        </P>
        <div className="flex flex-col gap-2">
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              SameSite=Lax（多くのブラウザの既定）
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              他サイトからの <strong>普通のリンク遷移（GET）だけ</strong>付く。
              画像・fetch・form POST には付かない。バランス型
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              SameSite=Strict
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              他サイト起点なら<strong>リンク遷移でも付かない</strong>。
              安全だが「メールのリンクから開いたらログアウト状態」になりがち
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              SameSite=None; Secure
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              他サイトからでも付く。<strong>Secure が必須</strong>（付け忘れると Cookie ごと拒否）。
              フロントと API のドメインが別のときはこれが必要になる
            </p>
          </div>
        </div>
        <P>
          ここで言う「サイト」は <strong>eTLD+1</strong>、つまり{" "}
          <Code>example.com</Code> レベルの単位。
          <Code>app.example.com</Code> と <Code>api.example.com</Code> は
          <strong>同じサイト（same-site）</strong>なので、サブドメインをまたぐだけなら
          <Code>SameSite=None</Code> は要らない。
        </P>
      </Card>

      {/* 実務パターン */}
      <Card tone="emerald" title="実務での構成パターン">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ① 同じドメインに揃える（いちばん楽）
          </p>
          <P>
            <Code>app.example.com</Code> の <Code>/api/*</Code> をバックエンドに振り分ける構成。
            Cookie は host-only のままでよく、<Code>SameSite=Lax</Code> で足りる。CORS も発生しない。
          </P>
          <Snippet lines={["Set-Cookie: session=abc; Path=/; Secure; HttpOnly; SameSite=Lax"]} />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ② サブドメインで分ける（app / api）
          </p>
          <P>
            <Code>Domain=example.com</Code> を付けて共有する。同じサイト扱いなので
            <Code>SameSite=Lax</Code> のままでいける。ただし
            <strong>配下の全サブドメインに Cookie が届く</strong>点は意識しておく。
          </P>
          <Snippet
            lines={[
              "Set-Cookie: session=abc; Domain=example.com; Path=/;",
              "            Secure; HttpOnly; SameSite=Lax",
            ]}
          />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ③ ドメインごと別（front.com → api.other.com）
          </p>
          <P>
            クロスサイトなので <Code>SameSite=None; Secure</Code> が必須。 加えてフロント側は
            <Code>credentials: &quot;include&quot;</Code>、サーバ側は
            <Code>Access-Control-Allow-Credentials: true</Code> と
            <strong>ワイルドカードでない具体的なオリジン</strong>が必要。いちばん事故りやすい構成。
          </P>
          <Snippet
            lines={[
              "// フロント",
              'fetch("https://api.other.com/me", { credentials: "include" })',
              "",
              "// サーバ",
              "Access-Control-Allow-Origin: https://front.com   // * は不可",
              "Access-Control-Allow-Credentials: true",
              "Set-Cookie: session=abc; Path=/; Secure; HttpOnly; SameSite=None",
            ]}
          />
        </div>
      </Card>

      {/* チェックリスト */}
      <Card tone="indigo" title="Cookie が付かないときの確認手順">
        <ul className="ml-1 flex flex-col gap-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {[
            <>
              <strong>そもそも保存されているか</strong>を DevTools → Application → Cookies
              で確認。無ければ <Code>Set-Cookie</Code> がブラウザに拒否されている
            </>,
            <>
              Network タブでレスポンスの <Code>Set-Cookie</Code> を見る。 拒否された行には
              <strong>警告アイコン</strong>が付き、理由まで表示される
            </>,
            <>
              <Code>Secure</Code> なのに http でアクセスしていないか（localhost は例外）
            </>,
            <>
              クロスサイトなのに <Code>SameSite</Code> が <Code>Lax</Code> のままになっていないか
            </>,
            <>
              <Code>Domain</Code> にポートやスキームを書いていないか（
              <Code>Domain=localhost:3000</Code> は無効）
            </>,
            <>
              fetch に <Code>credentials: &quot;include&quot;</Code> を付け忘れていないか
              （クロスオリジンでは既定で送られない）
            </>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}
