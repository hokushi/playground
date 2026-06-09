import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsRoute53Page() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Route 53 でドメインを取って HTTPS 化する
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          独自ドメインを取得して、ALB を <code>https://your-domain.com</code> でアクセスできるようにする
        </p>
      </header>

      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          なぜこのページがあるか
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ALB を作って <code>http://hokushi-alb-1911912584.ap-northeast-1.elb.amazonaws.com/</code> で
          動くようになった。でも本番運用には <strong>2 つの問題</strong>がある:
        </p>
        <ul className="ml-1 flex flex-col gap-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>① <strong>DNS 名がダサい</strong> ── 長くて覚えられない、ブランド感ゼロ</li>
          <li>② <strong>HTTPS 化されてない</strong> ── ブラウザに「保護されてない通信」と警告される</li>
        </ul>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          このページでは <strong>Route 53 でドメインを取得 → ACM で証明書 → ALB に HTTPS リスナー追加</strong>{" "}
          までを通して、<Code>https://your-domain.com</Code> で繋がる状態を作る。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          目指す構成
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ALB ページで作った構成の <strong>前段にドメイン と HTTPS</strong> を足す:
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`ユーザー: https://your-domain.com
       ↓ DNS 解決 (Route 53)
       ↓
[Route 53]: your-domain.com → hokushi-alb-XXXX.elb.amazonaws.com (Alias)
       ↓ さらに DNS 解決
       ↓
[AWS の DNS]: hokushi-alb-XXXX → 52.x.x.x, 13.x.x.x
       ↓ HTTPS 443 接続
       ↓
[ALB] ──── 証明書 (ACM) で TLS 終端 ────→ HTTP 80 (平文)
       ↓ ターゲットグループ
       ↓
[EC2 1a] [EC2 1c]`}</code>
        </pre>
        <ul className="ml-1 flex flex-col gap-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>・<strong>Route 53</strong>: ドメイン取得 + DNS 管理</li>
          <li>・<strong>ACM</strong>: 無料の SSL 証明書を発行 + 自動更新</li>
          <li>・<strong>ALB</strong> (既存): HTTPS リスナーを追加して TLS 終端</li>
          <li>・<strong>EC2</strong> (既存): いじらない (HTTP 80 のまま)</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50/40 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          使うサービス (3 つ)
        </h2>

        <div className="flex flex-col gap-3">
          <div className="rounded-md border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              ① Route 53 (DNS)
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              AWS の DNS サービス。ドメインの「住所録」を管理する。今回は
              <strong>「ドメインの取得」「Hosted Zone での DNS レコード管理」</strong>の
              2 役で使う
            </p>
          </div>

          <div className="rounded-md border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              ② ACM (AWS Certificate Manager)
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              SSL/TLS 証明書を発行・管理する AWS のサービス。
              ALB と組み合わせる限り <strong>完全無料</strong>。更新も AWS が自動でやってくれる
            </p>
          </div>

          <div className="rounded-md border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              ③ ALB (既存)
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <a
                href="/aws/alb"
                className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                ALB ページ
              </a>{" "}
              で作った <Code>hokushi-alb</Code> をそのまま使う。
              <strong>HTTPS リスナー</strong>を追加して、ACM の証明書を紐づける
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          料金
        </h2>
        <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">サービス</th>
                <th className="px-3 py-2 text-left font-semibold">料金</th>
                <th className="px-3 py-2 text-left font-semibold">備考</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2">ドメイン登録</td>
                <td className="px-3 py-2 font-mono">$3〜$13 / 年</td>
                <td className="px-3 py-2">TLD による (.click は安い、.com は普通)</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Hosted Zone</td>
                <td className="px-3 py-2 font-mono">$0.50 / 月</td>
                <td className="px-3 py-2">ドメインごと</td>
              </tr>
              <tr>
                <td className="px-3 py-2">ACM 証明書</td>
                <td className="px-3 py-2 font-mono">$0</td>
                <td className="px-3 py-2">ALB と組み合わせる限り無料</td>
              </tr>
              <tr>
                <td className="px-3 py-2">ALB HTTPS リスナー追加</td>
                <td className="px-3 py-2 font-mono">$0 (追加料金なし)</td>
                <td className="px-3 py-2">既存の ALB 料金に含まれる</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          → ドメイン代 + 月 $0.50 ≈ 年 ¥2,500〜 で運用可能
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          手順
        </h2>

        <Step n="01" title="ドメインを決める / 取得する (Route 53)">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            AWS の <strong>Route 53</strong> でドメインを買う。ドメイン代だけ前払いの一括請求
            (例: <Code>.click</Code> なら年 $3、<Code>.com</Code> なら年 $13)。
          </p>

          <Details summary="ドメインを買うってどういうこと?">
            <p>
              ドメイン (例: <Code>your-app.com</Code>) は <strong>世界で 1 つだけ</strong>の住所。
              これを使うには <strong>レジストラ</strong> (ドメイン販売業者) からお金を払って借りる必要がある。
            </p>
            <p>
              Route 53 は AWS が運営するレジストラ。お名前.com やムームードメイン と同じ役割。
              AWS で買う最大のメリットは <strong>他の AWS サービス (ALB / ACM / Hosted Zone) との連携がボタン 1 つで済む</strong>こと。
            </p>
            <p>
              買ったら <strong>1 年間はあなたのもの</strong>。途中解約や返金はできない (これは業界共通ルール)。
              使い続けたければ毎年更新料を払う。要らなくなったら自動更新を OFF にして放置すれば 1 年後に自然失効する
            </p>
          </Details>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ① Route 53 ダッシュボードを開く
          </h4>
          <Li>
            AWS コンソール上部の検索バーで <Code>Route 53</Code> → サービスへ
          </Li>
          <Li>
            ダッシュボードに「DNS 管理」「可用性のモニタリング」「トラフィック管理」「ドメインの登録」の 4 つのカードが並ぶ
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 14.26.22.png"
            alt="Route 53 ダッシュボード - 4 つのサービスカード"
            width={2560}
            height={1440}
          />

          <Note>
            Route 53 は <strong>グローバルサービス</strong>。右上のリージョン表示が「グローバル」になっているのが正常 (東京/バージニアの選択肢がない)
          </Note>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ② 登録済みドメイン画面へ
          </h4>
          <Li>
            左メニュー <strong>「ドメイン」 → 「登録済みドメイン」</strong>(英語だと "Registered domains") を開く
          </Li>
          <Li>
            まだドメインを持っていないので <strong>一覧は空</strong>。右上のオレンジボタン <strong>「ドメインを登録」</strong>(英語だと "Register domain") をクリック
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 14.26.44.png"
            alt="登録済みドメイン画面 - 一覧は空、右上「ドメインを登録」ボタン"
            width={2560}
            height={1440}
          />

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ③ ドメイン検索画面に到着
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            「ドメインを登録」画面に着いた。左側の <strong>「ドメインの検索」</strong>欄に
            希望のドメイン名を入れて、空き状況と料金を確認する流れ。
          </p>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 14.27.19.png"
            alt="ドメインを登録画面 - ドメイン検索欄と TLD 別標準価格表"
            width={2560}
            height={1440}
          />

          <Details summary="画面下に出ている「標準価格」テーブルって何?">
            <p>
              <strong>TLD (Top-Level Domain) ごとの年額料金一覧</strong>。
              ドメインの末尾 (<Code>.com</Code> / <Code>.dev</Code> / <Code>.click</Code> 等) によって値段が全然違うので、ここで確認できる。
            </p>
            <p>例として:</p>
            <ul className="ml-1 flex flex-col gap-0.5">
              <li>・<Code>.ac</Code> = $99 ← 高い (アセンション島)</li>
              <li>・<Code>.academy</Code> = $13</li>
              <li>・<Code>.ai</Code> = $129 ← 超高い (AI ブーム影響)</li>
              <li>・<Code>.app</Code> = $20</li>
              <li>・<Code>.click</Code> = ~$3 ← 最安級 (学習用に最適)</li>
              <li>・<Code>.com</Code> = $13</li>
              <li>・<Code>.dev</Code> = $13</li>
              <li>・<Code>.xyz</Code> = ~$10</li>
            </ul>
            <p>40 ページ分の TLD があるので、検索欄で絞り込みも可能。料金はレジストリ (TLD 管理組織) が決めるので AWS の都合では変えられない</p>
          </Details>

          <Note>
            画面上部に <strong>「新規 .app / .dev / .ai / .bot ...」</strong>と新 TLD のプロモーション。
            学習用なら気にせず安い <Code>.click</Code> や <Code>.xyz</Code> でも十分
          </Note>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ④ ここから: ドメインを検索 (次)
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            「ドメイン名を入力」欄に希望の名前 (例: <Code>hokushi-aws</Code>) を入れて <strong>「検索」</strong> ボタン。
            右側に「選択されたドメイン (0/7)」と空のカートが見える ── ここに使用可能なドメインを追加していく。
          </p>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            次は <strong>ドメイン名を検索して、空き + 安い組み合わせを選ぶ</strong>。
          </div>
        </Step>

        <Step n="02" title="Hosted Zone を確認する">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            (実際に進めながら手順を埋めていく)
          </p>
        </Step>

        <Step n="03" title="ACM で SSL 証明書を発行する">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            (実際に進めながら手順を埋めていく)
          </p>
        </Step>

        <Step n="04" title="ALB に HTTPS リスナーを追加する">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            (実際に進めながら手順を埋めていく)
          </p>
        </Step>

        <Step n="05" title="Route 53 で Alias レコードを作成する">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            (実際に進めながら手順を埋めていく)
          </p>
        </Step>

        <Step n="06" title="動作確認 — https://your-domain.com で繋がる">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            (実際に進めながら手順を埋めていく)
          </p>
        </Step>
      </section>
    </main>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline gap-4 border-b-2 border-indigo-200 pb-2 dark:border-indigo-900/60">
        <span className="font-mono text-2xl font-bold text-indigo-500 dark:text-indigo-400">
          {n}
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-3 pl-1">{children}</div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
      <span>{children}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="ml-3.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
      ※ {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function Details({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-md border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">
        <svg
          className="h-3 w-3 shrink-0 transition-transform group-open:rotate-90"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 3l4 3-4 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{summary}</span>
      </summary>
      <div className="flex flex-col gap-2 px-5 pb-3 pt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </details>
  );
}
