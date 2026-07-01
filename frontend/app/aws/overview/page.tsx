import type { ReactNode } from "react";
import Link from "next/link";

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

type Tone = "sky" | "violet" | "amber" | "emerald" | "rose" | "indigo";

const toneMap: Record<Tone, { card: string; head: string; chip: string; dot: string }> = {
  sky: {
    card: "border-sky-300 bg-sky-50/60 dark:border-sky-800/60 dark:bg-sky-950/20",
    head: "text-sky-900 dark:text-sky-200",
    chip: "bg-sky-500 text-white",
    dot: "bg-sky-500",
  },
  violet: {
    card: "border-violet-300 bg-violet-50/60 dark:border-violet-800/60 dark:bg-violet-950/20",
    head: "text-violet-900 dark:text-violet-200",
    chip: "bg-violet-500 text-white",
    dot: "bg-violet-500",
  },
  amber: {
    card: "border-amber-300 bg-amber-50/60 dark:border-amber-800/60 dark:bg-amber-950/20",
    head: "text-amber-900 dark:text-amber-200",
    chip: "bg-amber-500 text-white",
    dot: "bg-amber-500",
  },
  emerald: {
    card: "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800/60 dark:bg-emerald-950/20",
    head: "text-emerald-900 dark:text-emerald-200",
    chip: "bg-emerald-500 text-white",
    dot: "bg-emerald-500",
  },
  rose: {
    card: "border-rose-300 bg-rose-50/60 dark:border-rose-800/60 dark:bg-rose-950/20",
    head: "text-rose-900 dark:text-rose-200",
    chip: "bg-rose-500 text-white",
    dot: "bg-rose-500",
  },
  indigo: {
    card: "border-indigo-300 bg-indigo-50/60 dark:border-indigo-800/60 dark:bg-indigo-950/20",
    head: "text-indigo-900 dark:text-indigo-200",
    chip: "bg-indigo-500 text-white",
    dot: "bg-indigo-500",
  },
};

function Section({
  tone,
  badge,
  title,
  children,
}: {
  tone: Tone;
  badge: string;
  title: string;
  children: ReactNode;
}) {
  const t = toneMap[tone];
  return (
    <section className={`flex flex-col gap-3 rounded-xl border-2 px-5 py-4 ${t.card}`}>
      <h2 className={`flex items-center gap-2.5 text-lg font-semibold ${t.head}`}>
        <span
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-base ${t.chip}`}
          aria-hidden
        >
          {badge}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullet({ tone, children }: { tone: Tone; children: ReactNode }) {
  const t = toneMap[tone];
  return (
    <li className="flex gap-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      <span className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${t.dot}`} />
      <span>{children}</span>
    </li>
  );
}

/** 全体図の 1 ブロック（色付きカード） */
function FlowBox({
  tone,
  label,
  sub,
  store,
}: {
  tone: Tone;
  label: string;
  sub: string;
  store: string;
}) {
  const t = toneMap[tone];
  return (
    <div className={`w-full rounded-xl border-2 px-4 py-3 ${t.card}`}>
      <p className={`text-sm font-bold ${t.head}`}>{label}</p>
      <p className="mt-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">{sub}</p>
      <p className={`mt-1 text-[12px] font-medium ${t.head}`}>{store}</p>
    </div>
  );
}

function Arrow({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{text}</span>
      <span className="text-lg leading-none text-zinc-400 dark:text-zinc-500">↓</span>
    </div>
  );
}

export default function AwsOverviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          全体像 — フロント / バック / インフラ
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          そもそも Web サービスは何でできてる？ フロントエンド・バックエンドって何？
          そして AWS のような「インフラ」はどこにいる？を最初に整理する
        </p>
      </header>

      {/* 結論 */}
      <Section tone="indigo" badge="🎯" title="Web サービスは「3 + 1」の登場人物でできている">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-sky-300 bg-sky-50/60 px-3 py-2 dark:border-sky-800/60 dark:bg-sky-950/20">
            <p className="text-sm font-bold text-sky-900 dark:text-sky-200">① フロントエンド 🖥️</p>
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">画面・見た目（客席）</p>
          </div>
          <div className="rounded-lg border-2 border-violet-300 bg-violet-50/60 px-3 py-2 dark:border-violet-800/60 dark:bg-violet-950/20">
            <p className="text-sm font-bold text-violet-900 dark:text-violet-200">② バックエンド ⚙️</p>
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">裏方の処理（厨房）</p>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50/60 px-3 py-2 dark:border-amber-800/60 dark:bg-amber-950/20">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-200">③ データベース 🗄️</p>
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">データの保管庫（倉庫）</p>
          </div>
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/60 px-3 py-2 dark:border-emerald-800/60 dark:bg-emerald-950/20">
            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">＋ インフラ / AWS 🏗️</p>
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">全部を動かす土台（土地・建物）</p>
          </div>
        </div>
        <P>
          お店で例えると <strong className="text-sky-700 dark:text-sky-300">客席（フロント）</strong>／
          <strong className="text-violet-700 dark:text-violet-300">厨房（バック）</strong>／
          <strong className="text-amber-700 dark:text-amber-300">倉庫（DB）</strong>、そして
          <strong className="text-emerald-700 dark:text-emerald-300">土地・建物・電気・水道（インフラ）</strong>。
          この対応さえ掴めば、あとの AWS の各サービスは「土台側の部品」として一気に読める。
        </P>
      </Section>

      {/* 全体図（色付きボックス） */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">まず全体図</h2>
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/20">
          <p className="mb-3 text-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
            🏗️ ぜんぶ インフラ（AWS）の上で動いている
          </p>
          <div className="flex flex-col items-center gap-0 rounded-xl border border-dashed border-emerald-400/60 bg-white/60 p-4 dark:border-emerald-700/60 dark:bg-zinc-950/40">
            <div className="rounded-lg bg-zinc-800 px-4 py-2 text-center text-sm font-bold text-white dark:bg-zinc-200 dark:text-zinc-900">
              🧑 あなた（ユーザー）
            </div>
            <Arrow text="スマホ / PC で開く" />
            <FlowBox
              tone="sky"
              label="① フロントエンド 🖥️"
              sub="React / Next.js（ブラウザで動く）"
              store="= お店の「客席・メニュー」"
            />
            <Arrow text="HTTP でデータをやり取り（API）" />
            <FlowBox
              tone="violet"
              label="② バックエンド ⚙️"
              sub="Node.js / Go …（サーバで動く）"
              store="= お店の「厨房」"
            />
            <Arrow text="保存・取り出し" />
            <FlowBox
              tone="amber"
              label="③ データベース 🗄️"
              sub="PostgreSQL …"
              store="= お店の「倉庫」"
            />
          </div>
        </div>
        <P>
          上の 3 段が「アプリそのもの」、外側の緑の枠が「インフラ」。
          <strong>アプリは土台の上でしか動けない</strong>——ここが AWS を学ぶ理由。
        </P>
      </section>

      {/* フロントエンド */}
      <Section tone="sky" badge="①" title="フロントエンドとは — ユーザーが直接さわる「表側」">
        <P>
          <strong>ユーザーの画面に見えている部分ぜんぶ</strong>。ボタン・文字・レイアウト・
          「クリックしたら色が変わる」みたいな動き。
          <strong>ブラウザ（Chrome など）の中で動く</strong>のが最大の特徴。
        </P>
        <ul className="ml-1 flex flex-col gap-1.5">
          <Bullet tone="sky">作るもの: <strong>HTML（骨組み）/ CSS（見た目）/ JavaScript（動き）</strong></Bullet>
          <Bullet tone="sky">よく使う道具: <strong>React / Next.js</strong>（この Playground も Next.js 製）</Bullet>
          <Bullet tone="sky">役割: 見せる・入力を受け取る・<strong>裏方（バック）にデータを頼む</strong></Bullet>
        </ul>
        <div className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 dark:border-rose-800/60 dark:bg-rose-950/30">
          <p className="text-sm text-rose-900/90 dark:text-rose-200/90">
            ⚠️ ポイント: フロントは <strong>ユーザーの手元（ブラウザ）で動く</strong>。
            だから「秘密の鍵」や「DB のパスワード」を置いてはいけない（全部見えてしまう）。
            秘密が要る処理は次のバックエンドに任せる。
          </p>
        </div>
      </Section>

      {/* バックエンド */}
      <Section tone="violet" badge="②" title="バックエンドとは — 見えない「裏側」の処理係">
        <P>
          <strong>ユーザーには見えないサーバ側の処理</strong>。フロントから
          「ログインさせて」「一覧をちょうだい」と頼まれて、
          <strong>計算したり・DB を読み書きしたり・結果を返したり</strong>する。
          = お店の <strong>厨房</strong>。
        </P>
        <ul className="ml-1 flex flex-col gap-1.5">
          <Bullet tone="violet">よく使う言語: <strong>Node.js / Go / Python / Java</strong> など</Bullet>
          <Bullet tone="violet">役割: <strong>業務ロジック</strong>・認証・DB とのやり取り・秘密の鍵の管理</Bullet>
          <Bullet tone="violet"><strong>サーバ（ずっと動きっぱなしのコンピュータ）</strong>の上で動く ← ここで AWS が要る</Bullet>
        </ul>
      </Section>

      {/* フロントとバックの通信 */}
      <Section tone="indigo" badge="🔁" title="フロント と バック は「HTTP でお願いする」関係">
        <P>
          この 2 つは <strong>別々のプログラム</strong>で、
          <strong>HTTP というルールで会話</strong>する。フロントが「リクエスト（お願い）」を送り、
          バックが「レスポンス（返事）」を返す。この窓口を <strong>API</strong> と呼ぶ。
        </P>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <div className="flex-1 rounded-lg border-2 border-sky-300 bg-sky-50/60 px-4 py-3 text-center dark:border-sky-800/60 dark:bg-sky-950/20">
            <p className="text-sm font-bold text-sky-900 dark:text-sky-200">フロント 🖥️</p>
            <p className="font-mono text-[12px] text-zinc-600 dark:text-zinc-400">localhost:3000</p>
          </div>
          <div className="flex flex-col items-center px-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            <span>① お願い →</span>
            <span>← ② JSON で返事</span>
          </div>
          <div className="flex-1 rounded-lg border-2 border-violet-300 bg-violet-50/60 px-4 py-3 text-center dark:border-violet-800/60 dark:bg-violet-950/20">
            <p className="text-sm font-bold text-violet-900 dark:text-violet-200">バック ⚙️</p>
            <p className="font-mono text-[12px] text-zinc-600 dark:text-zinc-400">localhost:3002</p>
          </div>
        </div>
        <P>
          開発中は <strong>自分の PC の中</strong>にフロント（<Code>localhost:3000</Code>）と
          バック（<Code>localhost:3002</Code>）を並べて動かす。
          この「別オリジン同士の通信」で出てくるのが{" "}
          <Link
            href="/cors"
            className="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            CORS
          </Link>
          の話。
        </P>
      </Section>

      {/* データベース */}
      <Section tone="amber" badge="③" title="データベースとは — 消えては困るデータの「倉庫」">
        <P>
          ユーザー情報・投稿・注文履歴など、<strong>ずっと残しておきたいデータの保管庫</strong>。
          バックエンドが読み書きする。代表格が <strong>PostgreSQL / MySQL</strong>。
          ローカルでは{" "}
          <Link
            href="/docker"
            className="font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-200"
          >
            Docker
          </Link>{" "}
          で手軽に立てられる。
        </P>
      </Section>

      {/* インフラ */}
      <Section tone="emerald" badge="🏗️" title="インフラ（AWS）とは — 全部を動かす「土台」そのもの">
        <P>
          ここまでの ①〜③ は <strong>「動かすコンピュータ」がないと動かない</strong>。
          その <strong>コンピュータ・ネットワーク・電源・保管場所…をまとめて用意するのがインフラ</strong>。
          = お店の <strong>土地・建物・電気・水道</strong>。
        </P>
        <P>
          昔は自分でサーバ機を買って、電源を入れて、ネットワークを配線して…と大変だった。
          <strong>AWS はそれを「必要なぶんだけ借りる」形にしたサービス</strong>
          （クラウド）。物理的な機械を持たずに、画面の操作だけでサーバや保管庫を用意できる。
        </P>
        <div className="rounded-lg border border-emerald-300 bg-white px-4 py-3 dark:border-emerald-800/60 dark:bg-zinc-950/40">
          <p className="text-sm text-emerald-900/90 dark:text-emerald-200/90">
            💡 一言で: <strong>アプリ = 中身、インフラ = 中身を載せる土台</strong>。
            AWS を学ぶ = 「土台をどう組むか」を学ぶこと。
          </p>
        </div>
      </Section>

      {/* AWS サービスの当てはめ */}
      <Section tone="rose" badge="🧩" title="AWS の主要サービスを全体像に当てはめる">
        <P>
          「土台」は 1 個の箱ではなく、役割ごとに部品が分かれている。
          さっきのお店の例に AWS を重ねるとこうなる 👇
        </P>
        <div className="overflow-hidden rounded-lg border-2 border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-orange-100 to-amber-100 text-zinc-800 dark:from-orange-950/40 dark:to-amber-950/40 dark:text-zinc-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">AWS サービス</th>
                <th className="px-3 py-2 text-left font-semibold">役割</th>
                <th className="px-3 py-2 text-left font-semibold">お店で言うと</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-mono font-semibold text-emerald-700 dark:text-emerald-300">VPC</td>
                <td className="px-3 py-2">自分専用のネットワーク（区画）</td>
                <td className="px-3 py-2">土地・敷地</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-semibold text-violet-700 dark:text-violet-300">EC2</td>
                <td className="px-3 py-2">サーバ（バックエンドを動かす箱）</td>
                <td className="px-3 py-2">厨房の建物</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-semibold text-orange-600 dark:text-orange-300">ALB</td>
                <td className="px-3 py-2">入口で振り分ける受付</td>
                <td className="px-3 py-2">受付・案内係</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-semibold text-amber-700 dark:text-amber-300">S3</td>
                <td className="px-3 py-2">ファイル置き場（画像など）</td>
                <td className="px-3 py-2">倉庫</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-semibold text-sky-700 dark:text-sky-300">Route 53</td>
                <td className="px-3 py-2">ドメイン / 住所の案内（DNS）</td>
                <td className="px-3 py-2">看板・住所</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono font-semibold text-rose-700 dark:text-rose-300">RDS ほか</td>
                <td className="px-3 py-2">マネージドなデータベース</td>
                <td className="px-3 py-2">倉庫（食材棚）</td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          それぞれの詳しい作り方は各ページへ:{" "}
          <Link href="/aws/vpc" className="font-semibold text-emerald-700 underline underline-offset-2 dark:text-emerald-300">VPC</Link>
          {" · "}
          <Link href="/aws/ec2" className="font-semibold text-violet-700 underline underline-offset-2 dark:text-violet-300">EC2</Link>
          {" · "}
          <Link href="/aws/alb" className="font-semibold text-orange-600 underline underline-offset-2 dark:text-orange-300">ALB</Link>
          {" · "}
          <Link href="/aws/route53" className="font-semibold text-sky-700 underline underline-offset-2 dark:text-sky-300">Route 53</Link>
          {" · "}
          <Link href="/aws/s3" className="font-semibold text-amber-700 underline underline-offset-2 dark:text-amber-300">S3</Link>
        </P>
      </Section>

      {/* ローカル vs 本番 */}
      <Section tone="indigo" badge="🌍" title="開発（自分の PC）と 本番（AWS）の違い">
        <P>
          同じアプリでも、<strong>動かす土台</strong>が違うだけ。
          最初は自分の PC で動かし、完成したら AWS に載せて世界に公開する。
        </P>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-zinc-300 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/60">
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">💻 開発（自分の PC の中だけ）</p>
            <ul className="mt-1.5 flex flex-col gap-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <li>フロント : <span className="font-mono">localhost:3000</span></li>
              <li>バック : <span className="font-mono">localhost:3002</span></li>
              <li>DB : Docker の PostgreSQL</li>
              <li className="text-zinc-500">→ 自分だけがアクセスできる</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/60 px-4 py-3 dark:border-emerald-800/60 dark:bg-emerald-950/20">
            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">🌍 本番（AWS の上で世界に公開）</p>
            <ul className="mt-1.5 flex flex-col gap-0.5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <li>フロント : <span className="font-mono">https://your-app.com</span></li>
              <li>バック : EC2 / コンテナ</li>
              <li>DB : RDS</li>
              <li className="text-emerald-700 dark:text-emerald-300">→ 誰でもアクセスできる</li>
            </ul>
          </div>
        </div>
        <P>
          「ローカルで動いた → AWS に載せる」の道のりが、そのまま
          VPC → EC2 → ALB → Route 53 → S3 … と各ページで作っていく流れになっている。
        </P>
      </Section>

      {/* 次に読む */}
      <section className="flex flex-col gap-3 rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-sky-50 px-5 py-4 dark:border-emerald-800/60 dark:from-emerald-950/20 dark:to-sky-950/20">
        <h2 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
          🚀 次に読むなら
        </h2>
        <ul className="ml-1 flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>
            まず土台の地面 →{" "}
            <Link href="/aws/vpc" className="font-semibold text-emerald-700 underline underline-offset-2 dark:text-emerald-300">VPC と サブネット</Link>
          </li>
          <li>
            そこにサーバを建てる →{" "}
            <Link href="/aws/ec2" className="font-semibold text-violet-700 underline underline-offset-2 dark:text-violet-300">EC2 を立てる</Link>
          </li>
          <li>
            フロントとバックの会話の裏側 →{" "}
            <Link href="/cors" className="font-semibold text-indigo-700 underline underline-offset-2 dark:text-indigo-300">CORS はブラウザのルール</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
