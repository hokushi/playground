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

type Tone = "indigo" | "violet" | "amber" | "emerald" | "sky";

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
    browser: "border-indigo-200 bg-indigo-50/70 dark:border-indigo-900/50 dark:bg-indigo-950/25",
    server: "border-violet-200 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/25",
    storage: "border-amber-200 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/25",
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
      {sub && <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{sub}</p>}
      {note && (
        <p className="mt-1 text-[12.5px] text-zinc-500 dark:text-zinc-400">{note}</p>
      )}
    </div>
  );
}

/** ブロック同士をつなぐ矢印。header に HTTP ヘッダを添えられる */
function Arrow({ text, header, up }: { text: string; header?: string; up?: boolean }) {
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
      {sub && <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{sub}</p>}
    </div>
  );
}

export default function CorsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          CORS は「ブラウザのルール」
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          サーバが門番として弾く仕組み…ではない。通す / ブロックを決めているのは実はブラウザ
        </p>
      </header>

      {/* 結論 */}
      <section className="flex flex-col gap-3 rounded-lg border border-l-4 border-indigo-100 border-l-indigo-400 bg-indigo-50/40 px-5 py-4 dark:border-indigo-950 dark:border-l-indigo-600 dark:bg-indigo-950/15">
        <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">
          先に結論
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              サーバがやること
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              「許可するオリジン一覧」を返すだけ
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ブラウザがやること
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              その一覧を見て 通す / ブロック を判断
            </p>
          </div>
        </div>
        <P>
          だから <strong>「サーバが出どころを見て弾く門番」</strong>
          というイメージを捨てると、一気にスッキリする。
        </P>
      </section>

      {/* 勘違い vs 正しい */}
      <Card tone="sky" title="よくある勘違い（門番モデル）と、正しい姿">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/50 dark:bg-rose-950/30">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              ❌ 勘違い（門番モデル）
            </p>
            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              サーバが来たリクエストの出どころを見て、許可リストにあるものだけ通す
            </p>
            <div className="mt-1 flex flex-col items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 py-3 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
              <span className="text-[12px] text-zinc-600 dark:text-zinc-400">リクエスト</span>
              <span className="text-base leading-none text-zinc-400 dark:text-zinc-600">↓</span>
              <span className="rounded border border-rose-200 bg-rose-50 px-2 py-0.5 text-[12px] font-semibold text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
                サーバが弾く
              </span>
              <span className="text-base leading-none text-zinc-400 dark:text-zinc-600">↓</span>
              <span className="text-[12px] text-zinc-600 dark:text-zinc-400">
                通った人だけ処理
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ✅ 正しい（ブラウザが審判モデル）
            </p>
            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              サーバは一覧を返すだけ。JS に結果を渡す / 渡さないを決めるのはブラウザ
            </p>
            <div className="mt-1 flex flex-col items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 py-3 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
              <span className="text-[12px] text-zinc-600 dark:text-zinc-400">
                サーバ「許可一覧はこれ」
              </span>
              <span className="text-base leading-none text-zinc-400 dark:text-zinc-600">↓</span>
              <span className="rounded border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[12px] font-semibold text-indigo-900 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-200">
                ブラウザが判断
              </span>
              <span className="text-base leading-none text-zinc-400 dark:text-zinc-600">↓</span>
              <span className="text-[12px] text-zinc-600 dark:text-zinc-400">
                JS に渡す / 渡さない
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 3パターン */}
      <Card tone="violet" title="だから通信は 3 パターンに分かれる">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ① ブラウザ → バックエンド（CORS の出番）
          </p>
          <P>
            ブラウザが「私は <Code>localhost:3000</Code> のページです」と Origin を付けて送る。
            → バックエンドが「<Code>localhost:3000</Code> は許可」と返す。 → ブラウザが
            「OK、JS に結果を渡そう」と判断。<strong>これが CORS</strong>。
          </P>
          <Flow caption="送り主がブラウザ → CORS が効く">
            <Box actor="browser" label="ブラウザ" sub="localhost:3000 のページを表示中" />
            <Arrow
              text="リクエスト（Origin が自動で付く）"
              header="Origin: http://localhost:3000"
            />
            <Box
              actor="server"
              label="バックエンド（localhost:3002）"
              sub="「localhost:3000 は許可するよ」と返すだけ"
            />
            <Arrow
              text="レスポンス（許可オリジン一覧）"
              up
              header="Access-Control-Allow-Origin: http://localhost:3000"
            />
            <Verdict
              kind="ok"
              label="ブラウザが判定 → JS に結果を渡す"
              sub="通す / ブロックの判断はここ"
            />
          </Flow>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ② バックエンド → S3（CORS は無関係）
          </p>
          <P>
            送り主は Node.js（ブラウザじゃない）。Origin を付けないし、そもそも判定するブラウザがいない。
            → だから <strong>CORS は出番なし</strong>。S3 は代わりに
            <strong>「正しい IAM キーで署名されてる？」だけ</strong>見て通す。
          </P>
          <Flow caption="送り主がサーバ → CORS は登場しない">
            <Box
              actor="server"
              label="バックエンド（Node.js）"
              sub="ブラウザじゃない = 判定する人がいない"
            />
            <Arrow text="リクエスト（Origin は付かない）" header="IAM キーで署名" />
            <Box
              actor="storage"
              label="S3"
              sub="CORS は見ない"
              note="見るのは「正しい IAM キーで署名されてる？」だけ"
            />
            <Arrow text="署名 OK ならデータを返す" up />
            <Verdict
              kind="ok"
              label="そのまま受け取る"
              sub="誰も判定しないのでブロックも起きない"
            />
          </Flow>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ③ ブラウザ → 同じオリジンのバックエンド（CORS が発動しない）
          </p>
          <P>
            送り主はブラウザだけど、<strong>宛先が自分と同じオリジン</strong>。
            この場合ブラウザは「別のところから来たか？」の判定自体をしないので、
            <strong>CORS は最初から出番なし</strong>。サーバが
            <Code>Access-Control-Allow-Origin</Code> を返さなくても普通に動く。
          </P>
          <Flow caption="送り主も宛先も同じオリジン → 判定をスキップ">
            <Box actor="browser" label="ブラウザ" sub="localhost:3000 のページを表示中" />
            <Arrow text="リクエスト（宛先も localhost:3000）" header="/api/... へ" />
            <Box
              actor="server"
              label="バックエンド（同じ localhost:3000）"
              sub="許可オリジン一覧を返す必要なし"
            />
            <Arrow text="レスポンス" up />
            <Verdict
              kind="ok"
              label="ブラウザは判定せず JS に結果を渡す"
              sub="用心棒は「自分の家の中の話」なので呼ばれない"
            />
          </Flow>
        </div>
      </Card>

      {/* same-origin の定義 */}
      <Card tone="emerald" title="そもそも「同じオリジン」とは">
        <P>
          <strong>スキーム / ホスト / ポート</strong> の 3 つが
          <strong>すべて一致</strong>したときだけ同一オリジン。1 つでも違えば別オリジン扱いで
          CORS の対象になる。
        </P>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium">ページ</th>
                <th className="py-2 pr-3 font-medium">リクエスト先</th>
                <th className="py-2 font-medium">判定</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost:3000</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost:3000/api</td>
                <td className="py-2 text-emerald-700 dark:text-emerald-400">✅ 同一オリジン</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost:3000</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://localhost:3002</td>
                <td className="py-2 text-rose-700 dark:text-rose-400">
                  ❌ ポート違い（今の構成）
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3 font-mono text-[12.5px]">http://example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">https://example.com</td>
                <td className="py-2 text-rose-700 dark:text-rose-400">❌ スキーム違い</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-mono text-[12.5px]">https://app.example.com</td>
                <td className="py-2 pr-3 font-mono text-[12.5px]">https://api.example.com</td>
                <td className="py-2 text-rose-700 dark:text-rose-400">❌ ホスト違い</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
          ※ ポートが違うだけでも別オリジン。「同じ localhost なんだから同じでは？」と思いがちなポイント。
        </p>
      </Card>

      {/* same-origin だと何が消えるか */}
      <Card tone="indigo" title="同一オリジンにすると、何が要らなくなる？">
        <ul className="ml-1 flex flex-col gap-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              サーバ側の <Code>Access-Control-Allow-Origin</Code> が不要
              （返してもブラウザは見ない）
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              <strong>プリフライト（OPTIONS）が飛ばない</strong>。
              カスタムヘッダや <Code>PUT</Code> / <Code>DELETE</Code> でも往復が増えない
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              Cookie がそのまま乗る。<Code>credentials: &quot;include&quot;</Code> や
              <Code>SameSite</Code> で悩むポイントが消える
            </span>
          </li>
        </ul>
        <P>
          いまの <Code>3000 → 3002</Code> を同一オリジンに寄せたいなら、方法は主に 3 つ。
        </P>
        <div className="flex flex-col gap-2">
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ① Next.js の rewrites でプロキシ
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <Code>/api/*</Code> を <Code>localhost:3002</Code> に転送。ブラウザから見た宛先は
              <Code>localhost:3000</Code> のままなので同一オリジン扱いになり、CORS 設定が丸ごと不要に
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ② Route Handler（BFF）を挟む
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <Code>app/api/xxx/route.ts</Code> からバックエンドを叩く。サーバ同士の通信になるので、
              こちらも CORS 無関係（＝ ② のパターンと同じ形）
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ③ 本番なら ALB / CloudFront のパスルーティング
            </p>
            <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <Code>/api/*</Code> だけバックエンドに振り分け、同一ドメインに揃える
            </p>
          </div>
        </div>
      </Card>

      {/* 用心棒のたとえ */}
      <Card tone="amber" title="例え話：ブラウザは「あなた専属の用心棒」">
        <P>
          ブラウザは <strong>あなた専属の用心棒</strong>だと思うと腑に落ちる。
        </P>
        <Flow caption="取りに行くのは自由。渡すかどうかを後でチェックする">
          <Box actor="neutral" label="Web ページの JS" sub="「S3 からデータ取ってきて」" />
          <Arrow text="依頼" />
          <Box
            actor="browser"
            label="用心棒（ブラウザ）が S3 へ取りに行く"
            sub="S3 はデータを渡す（ここでは弾かれない）"
          />
          <Arrow text="受け取った後に確認する" />
          <Box
            actor="browser"
            label="用心棒「このページ（localhost:3000）に見せていいって言ってた？」"
          />
          <div className="grid w-full gap-2 pt-2 sm:grid-cols-2">
            <Verdict kind="ok" label="✅ 許可されてる" sub="JS に渡す" />
            <Verdict kind="ng" label="⛔ 許可されてない" sub="JS に渡さず拒否 ← ブロックはここ" />
          </div>
        </Flow>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900/90 dark:text-amber-200/90">
            一方、<strong>バックエンドは用心棒じゃない</strong>
            （守るべきユーザーがいない、ただのプログラム）。 だから何も確認せずデータを受け取る。=
            <strong>CORS 無関係</strong>。
          </p>
        </div>
        <P>
          ポイントは、<strong>S3 はデータを渡す段階では弾いていない</strong>こと。 ブロックが起きるのは
          <strong>受け取ったあと、用心棒（ブラウザ）が JS に渡すかどうかを判断する瞬間</strong>。
        </P>
      </Card>
    </main>
  );
}
