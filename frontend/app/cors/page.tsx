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

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Diagram({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12.5px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      <code>{children}</code>
    </pre>
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

      {/* 結論 (indigo intro) */}
      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          先に結論
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>CORS はブラウザ側のルール</strong>。サーバは
          <strong>「許可するオリジン一覧」を返すだけ</strong>で、それを見て
          <strong>通す / ブロックを決めるのはブラウザ</strong>。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          だから <strong>「サーバが出どころを見て弾く門番」</strong>というイメージを捨てると、一気にスッキリする。
        </p>
      </section>

      {/* 勘違い vs 正しい */}
      <Card title="よくある勘違い（門番モデル）と、正しい姿">
        <P>
          たぶん今こういうイメージのはず 👇
        </P>
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/50 dark:bg-rose-950/30">
          <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
            ❌ 勘違い（門番モデル）
          </p>
          <p className="mt-1 text-sm text-rose-900/80 dark:text-rose-300">
            サーバ（バックエンドや S3）が、来たリクエストの出どころを見て、
            許可リストにあるものだけ通す（＝門番みたいに弾く）
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
            ✅ 正しい（ブラウザが審判モデル）
          </p>
          <p className="mt-1 text-sm text-emerald-900/80 dark:text-emerald-300">
            サーバは「許可するオリジン一覧」を返すだけ。
            その一覧を見て、JS に結果を渡す / 渡さないを決めるのはブラウザ。
          </p>
        </div>
        <Diagram>{`❌ 門番モデル（誤）
   リクエスト → [ サーバが Origin を見て弾く ] → 通った人だけ処理


✅ 審判モデル（正）
   リクエスト → サーバ「許可オリジン一覧はこれだよ」と返すだけ
                          │
                          ▼
                  ［ ブラウザ ］が一覧を見て
                  JS に結果を渡す / 渡さない を判断`}</Diagram>
      </Card>

      {/* Origin は誰が言ってる */}
      <Card title="「どこから来たか（Origin）」は誰が言ってる？">
        <P>
          ここが鍵。<strong>「どこから来たか」= Origin</strong> という情報は、
          <strong>ブラウザが自動で付ける「今表示している Web ページのアドレス」</strong>
          （例: <Code>http://localhost:3000</Code>）。
        </P>
        <ul className="ml-1 flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>Origin は <strong>Web ページが「自己申告」</strong>するもの</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              <strong>ブラウザ以外（Node.js のサーバなど）は Origin を付けない</strong>
            </span>
          </li>
        </ul>
        <Diagram>{`Origin = 「今表示中の Web ページのアドレス」をブラウザが付ける自己申告

ブラウザ発  :  GET /api   Origin: http://localhost:3000   ← 自動で付く
Node.js 発  :  GET /api   （Origin なし）                  ← そもそも付かない`}</Diagram>
        <P>
          この「付く / 付かない」の差が、次の 2 つの通信で決定的に効いてくる。
        </P>
      </Card>

      {/* 2つの通信 */}
      <Card title="だから 2 つの通信はこうなる">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ① ブラウザ → バックエンド（CORS の出番）
          </p>
          <P>
            ブラウザが「私は <Code>localhost:3000</Code> のページです」と Origin を付けて送る。
            → バックエンドが「<Code>localhost:3000</Code> は許可」と返す。
            → ブラウザが「OK、JS に結果を渡そう」と判断。<strong>これが CORS</strong>。
          </P>
          <Diagram>{`ブラウザ「私は localhost:3000 のページ」  ── Origin: http://localhost:3000
       │
       ▼
バックエンド「localhost:3000 は許可するよ」
       │      Access-Control-Allow-Origin: http://localhost:3000
       ▼
ブラウザ「OK、JS に結果を渡す」   ← 通す / ブロックの判断はここ`}</Diagram>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ② バックエンド → S3（CORS は無関係）
          </p>
          <P>
            送り主は Node.js（ブラウザじゃない）。Origin を付けないし、
            そもそも判定するブラウザがいない。
            → だから <strong>CORS は出番なし</strong>。S3 は代わりに
            <strong>「正しい IAM キーで署名されてる？」だけ</strong>見て通す。
          </P>
          <Diagram>{`Node.js（ブラウザじゃない）→ Origin 付けない・審判するブラウザもいない
       │
       ▼
S3 は CORS を見ない。
   見るのは「正しい IAM キーで署名されてる？」だけ  ← 署名OKなら通す`}</Diagram>
        </div>
      </Card>

      {/* 用心棒のたとえ */}
      <Card title="例え話：ブラウザは「あなた専属の用心棒」">
        <P>
          ブラウザは <strong>あなた専属の用心棒</strong>だと思うと腑に落ちる。
        </P>
        <Diagram>{`Web ページの JS :「S3 からデータ取ってきて」
        │ 依頼
        ▼
用心棒（ブラウザ）: S3 へ取りに行く → S3 はデータを渡す（ここでは弾かれない）
        │ 受け取った後に確認する
        ▼
用心棒「S3 さん、このページ（localhost:3000）に見せていいって言ってた？」
        ├─ 許可されてる  → JS に渡す      ✅
        └─ 許可されてない → JS に渡さず拒否 ⛔   ← ブロックはここで起きる`}</Diagram>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900/90 dark:text-amber-200/90">
            一方、<strong>バックエンドは用心棒じゃない</strong>
            （守るべきユーザーがいない、ただのプログラム）。
            だから何も確認せずデータを受け取る。= <strong>CORS 無関係</strong>。
          </p>
        </div>
        <P>
          ポイントは、<strong>S3 はデータを渡す段階では弾いていない</strong>こと。
          ブロックが起きるのは <strong>受け取ったあと、用心棒（ブラウザ）が JS に渡すかどうかを判断する瞬間</strong>。
        </P>
      </Card>

      {/* 直接の答え */}
      <Card title="「S3 に CORS つけてるから、バックエンドの出どころを見て許可される」？">
        <P>
          という疑問への直接の答え：
        </P>
        <ul className="ml-1 flex flex-col gap-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              S3 は <strong>バックエンドからの通信に対しては CORS を見ない</strong>
              （送り主がブラウザじゃないから）。代わりに見るのは <strong>IAM キー</strong>。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              S3 の CORS が効くのは <strong>「ブラウザが直接 S3 を叩いたとき」だけ</strong>。
              そのとき初めて「このページのオリジン許可してる？」をブラウザが確認する。
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              言い換えると：<strong>CORS は「サーバが弾く」んじゃなくて
              「ブラウザが結果を見せていいか判断する」仕組み</strong>。
            </span>
          </li>
        </ul>
      </Card>

      {/* 今の構成 */}
      <section className="flex flex-col gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <h2 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
          いまの自分の構成で起きていること
        </h2>
        <p className="text-[15px] leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
          <Code>localhost:3000</Code>（フロント） → <Code>localhost:3002</Code>（バックエンド）
          の構成で、まさにこれが起きている。
          フロントのページが Origin を付けてバックエンドを叩き、バックエンドが
          「<Code>localhost:3000</Code> 許可」を返し、ブラウザがそれを見て JS に結果を渡している。
        </p>
        <p className="text-[15px] leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
          ここを理解しておくと、次に <strong>署名付き URL</strong>
          （ブラウザが直接 S3 を叩く構成）をやるとき、
          <strong>「なぜ S3 側に CORS 設定が要るのか」</strong>が一発で腑に落ちる。
        </p>
      </section>
    </main>
  );
}
