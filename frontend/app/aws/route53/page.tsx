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

          {/* === Phase A: 入口を開く === */}
          <details open className="group mt-2 rounded-lg border-2 border-indigo-300 bg-indigo-50/30 dark:border-indigo-700 dark:bg-indigo-950/20">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3 text-base font-bold text-indigo-900 transition-colors hover:bg-indigo-100/30 dark:text-indigo-100 dark:hover:bg-indigo-900/30">
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>🚪 Phase A — 入口を開く (① 〜 ③)</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-indigo-200 px-5 pb-5 pt-4 dark:border-indigo-900/50">

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
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
            </div>
          </details>

          {/* === Phase B: 検索 → カート → 罠回避 === */}
          <details open className="group mt-3 rounded-lg border-2 border-amber-300 bg-amber-50/30 dark:border-amber-700 dark:bg-amber-950/20">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3 text-base font-bold text-amber-900 transition-colors hover:bg-amber-100/30 dark:text-amber-100 dark:hover:bg-amber-900/30">
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>🔍 Phase B — 検索 → カート → 罠回避 (④ 〜 ⑥)</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-amber-200 px-5 pb-5 pt-4 dark:border-amber-900/50">

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ④ ドメインを検索 → 安いのを選ぶ
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            検索欄に <strong>ドメイン名 + TLD</strong> をフルで打つと、その候補の空き状況が出る。
            学習用なら最安の <Code>.click</Code> ($3/年) で探す。
          </p>
          <Li>
            検索欄に <Code>hokushi-aws.click</Code> と入力 → <strong>「検索」</strong>
          </Li>
          <Li>
            「検索結果」に <strong>「使用可能」</strong>が緑で出れば取れる
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.05.30.png"
            alt="hokushi-aws.click の検索結果 - 使用可能、$3/年"
            width={2560}
            height={1440}
          />

          <Note>
            <strong>更新時料金が同じ ($3) か要確認</strong>。一部の TLD は「1 年目だけ安くて翌年から値上げ」のパターンあり。
            <Code>.click</Code> はその罠なし
          </Note>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑤ カートに追加 → チェックアウトへ
          </h4>
          <Li>
            検索結果の右にある <strong>「選択」</strong> をクリック →
            右側の「選択されたドメイン (1/7)」に追加される
          </Li>
          <Li>
            右下のオレンジ <strong>「チェックアウトに進む」</strong>をクリック
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.06.41.png"
            alt="カートに hokushi-aws.click が入った状態 - 小計 $3.00"
            width={2560}
            height={1440}
          />

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑥ ⚠️ アップセル罠を回避: 「Skip」
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            チェックアウトの直前に <strong>「Secure your brand across other extensions」</strong>{" "}
            というポップアップが出る。これは AWS の<strong>アップセル</strong>で、
            「他の TLD でも同じ名前を押さえませんか?」と勧めてくる。
          </p>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.07.27.png"
            alt="アップセルポップアップ - 他 TLD の追加候補が並ぶ"
            width={2560}
            height={1440}
          />

          <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              ⚠️ 候補に <Code>.ai</Code> $158 が紛れてる
            </p>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              「ブランド保護」を口実に高額 TLD (<Code>.ai</Code> 年 $158、更新 $129!) が並んでいる。
              学習用には完全に不要。<strong>「Skip」をクリック</strong>して何も追加せず次へ
            </p>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              ⚠️ 「Add and proceed to checkout」を絶対に押さない (チェックされたドメインが追加で買われる)
            </p>
          </div>
            </div>
          </details>

          {/* === Phase C: チェックアウト 3 ステップ === */}
          <details open className="group mt-3 rounded-lg border-2 border-violet-300 bg-violet-50/30 dark:border-violet-700 dark:bg-violet-950/20">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3 text-base font-bold text-violet-900 transition-colors hover:bg-violet-100/30 dark:text-violet-100 dark:hover:bg-violet-900/30">
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>💳 Phase C — チェックアウト 3 ステップ (⑦ 〜 ⑨)</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-violet-200 px-5 pb-5 pt-4 dark:border-violet-900/50">

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑦ チェックアウト Step 1: 料金 + 自動更新 OFF ⭐
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            チェックアウトは 3 ステップ。最初は <strong>料金</strong>の確認。
            ここで <strong>自動更新を OFF</strong> にしておくのが超重要。
          </p>
          <Li>
            期間: <strong>1 年 ($3.00 USD)</strong> を確認
          </Li>
          <Li>
            <strong>自動更新</strong>: <strong>オフ</strong> ⭐ (デフォルトでオフになっていることが多い)
          </Li>
          <Li>
            青いインフォバナー「<strong>このドメインでは自動更新がオフになっているため、登録は選択した登録期間後に失効します</strong>」が出ていれば正しい状態
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.08.28.png"
            alt="チェックアウト Step 1 - 料金 $3.00 + 自動更新オフ確認"
            width={2560}
            height={1440}
          />

          <Note>
            自動更新を OFF にすると <strong>1 年後にドメインが自然失効</strong>する。
            来年勝手にカード請求されない安心。「やっぱり継続したい」なら有効期限前に手動で更新可能
          </Note>

          <Li>
            右下オレンジ <strong>「次へ」</strong>
          </Li>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑧ チェックアウト Step 2: 連絡先情報入力
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ICANN ルールで <strong>連絡先情報の入力が必須</strong>。下記を埋める:
          </p>
          <Li>
            <strong>連絡先タイプ</strong>: 個人
          </Li>
          <Li>
            <strong>名・姓</strong> / <strong>E メール</strong>(更新通知が来るので生きてるアドレス) / <strong>電話</strong>
          </Li>
          <Li>
            <strong>住所・国 (日本)・州 (東京等)・郵便番号</strong>
          </Li>
          <Li>
            <strong>管理者 / 技術者 / 請求の連絡先</strong>: 全て「登録者の連絡先と同じ」(青トグル ON)
          </Li>
          <Li>
            <strong>プライバシー保護</strong>: ✅ 自動 ON ⭐ (これで WHOIS に個人情報が出ない)
          </Li>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              💡 電話番号の形式に注意
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              国コード欄に <Code>81</Code> (日本)、電話番号本体は <strong>先頭の <Code>0</Code> を削った形式</strong>{" "}
              で入れる。<br />
              ❌ <Code>+ (空) 08019414600</Code> → 検証エラー or 海外番号扱い
              <br />
              ✅ <Code>+ 81  8019414600</Code> ← 国際表記の作法 (先頭 0 を消す)
            </p>
          </div>

          <Li>
            「次へ」で Step 3 へ
          </Li>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑨ チェックアウト Step 3: 確認 → 送信
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            最終確認画面。全項目の見直し:
          </p>
          <Li>
            ドメイン / 期間 / 自動更新 (= いいえ ⭐) / 小計
          </Li>
          <Li>
            4 つの連絡先 (登録者・管理者・技術者・請求) すべてに <strong>「プライバシー保護 (オン)」</strong>表示
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.30.44.png"
            alt="チェックアウト Step 3 - 全項目の最終確認画面"
            width={2560}
            height={1440}
          />

          <Li>
            画面下の「利用規約」セクションで <strong>同意のチェックボックスにチェック</strong>
          </Li>
          <Li>
            右下オレンジ <strong>「送信」</strong> (= 「注文」と同じ意味) をクリック →
            クレジットカードに $3.00 即時請求
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.34.24.png"
            alt="利用規約への同意 + 送信ボタン"
            width={2560}
            height={1440}
          />
            </div>
          </details>

          {/* === Phase D: 反映を待つ + メール認証 === */}
          <details open className="group mt-3 rounded-lg border-2 border-emerald-300 bg-emerald-50/30 dark:border-emerald-700 dark:bg-emerald-950/20">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3 text-base font-bold text-emerald-900 transition-colors hover:bg-emerald-100/30 dark:text-emerald-100 dark:hover:bg-emerald-900/30">
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>⏳ Phase D — 反映を待つ + メール認証 (⑩ 〜 ⑪)</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-emerald-200 px-5 pb-5 pt-4 dark:border-emerald-900/50">

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑩ 進行中 → 成功 (5〜15 分)
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            送信直後は <strong>「登録済みドメイン」一覧には何も表示されない</strong> (登録完了したものだけ並ぶ)。
            進行中のリクエストは <strong>左メニュー「リクエスト」</strong> 側で確認できる。
          </p>
          <Li>
            左メニュー <strong>「リクエスト」</strong>(Routes 53 → ドメイン → リクエスト) を開く
          </Li>
          <Li>
            <Code>hokushi-aws.click</Code> が <strong>⏳ 進行中</strong>として表示
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.44.01.png"
            alt="リクエスト - hokushi-aws.click が進行中ステータス"
            width={2560}
            height={1440}
          />

          <Li>
            5〜15 分待つ → リロード → <strong>🟢 成功</strong>に変わる
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 16.01.30.png"
            alt="リクエスト - hokushi-aws.click が成功ステータス"
            width={2560}
            height={1440}
          />

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑪ ⭐ メール認証 (15 日以内に必須)
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            登録と並行して、入力したメールアドレス宛に <strong>Amazon Registrar からメール確認のリンク</strong>が届く。
            <strong>15 日以内にクリックしないとドメインが停止</strong>される (ICANN ルール)。
          </p>
          <Li>
            登録メールアドレス (例: <Code>hokushi97@gmail.com</Code>) を確認
          </Li>
          <Li>
            件名は英語のこともある (例: <Code>Domain Contact Information Verification</Code>)。
            差出人: <Code>noreply@registrar.amazon.com</Code>
          </Li>
          <Li>
            メール内の <strong>「Verify」リンクをクリック</strong>
          </Li>
          <Li>
            ブラウザで <Code>registrar.amazon/verify-contact?token=...</Code> が開き、
            <strong>「Email verified」</strong>と緑バナーで表示されれば完了
          </Li>

          <Screenshot
            src="/aws/route53/スクリーンショット 2026-06-09 15.58.03.png"
            alt="メール認証完了画面 - Email verified の緑バナー"
            width={2560}
            height={1440}
          />

          <Note>
            これでドメイン停止リスクなし。次にドメインを買う時もこのメール認証は毎回必要 (一度メアドが認証済みなら以降は省略されることもある)
          </Note>
            </div>
          </details>

          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              🎉 Step 01 完了
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-emerald-900/80 dark:text-emerald-300">
              <li>ドメイン <Code>hokushi-aws.click</Code> を $3 で取得</li>
              <li>自動更新 OFF (来年の請求なし)</li>
              <li>プライバシー保護 ON (個人情報は WHOIS に出ない)</li>
              <li>メール認証完了 (ドメイン停止リスクなし)</li>
            </ul>
            <p className="mt-3 text-sm text-emerald-900/80 dark:text-emerald-300">
              次は <strong>Hosted Zone (DNS の管理場所)</strong> を確認 → 後の Step で ACM・ALB と繋いでいく
            </p>
          </div>
        </Step>

        <Step n="02" title="Hosted Zone を確認する">

          {/* 一言で言うと (indigo intro) */}
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              💡 一言で言うと
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <strong>Hosted Zone = そのドメインの「DNS 設定をまとめて入れる箱」</strong>。
              ドメインを買うと自動で作られていて、ここに <strong>「この名前で来たらこの IP に転送して」</strong>
              みたいな指示を後でいろいろ書き込む。
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              詳しい仕組み (権威 DNS との関係) は{" "}
              <a
                href="/network/domain-url"
                className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                ドメイン と URL
              </a>{" "}
              ページの「権威 DNS」セクション参照
            </p>
          </div>

          {/* === Phase A: ホストゾーン一覧を見る === */}
          <details open className="group mt-3 rounded-lg border-2 border-indigo-300 bg-indigo-50/30 dark:border-indigo-700 dark:bg-indigo-950/20">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3 text-base font-bold text-indigo-900 transition-colors hover:bg-indigo-100/30 dark:text-indigo-100 dark:hover:bg-indigo-900/30">
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>📂 Phase A — ホストゾーン一覧を見る</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-indigo-200 px-5 pb-5 pt-4 dark:border-indigo-900/50">

              <Li>
                Route 53 → 左メニュー <strong>「ホストゾーン」</strong>(英語: Hosted zones) をクリック
              </Li>
              <Li>
                一覧に <Code>hokushi-aws.click</Code> が <strong>1 件</strong>並ぶ
              </Li>

              <Screenshot
                src="/aws/route53/スクリーンショット 2026-06-09 17.07.25.png"
                alt="ホストゾーン一覧 - hokushi-aws.click が自動作成されてる"
                width={2560}
                height={1440}
              />

              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                確認できる項目
              </h4>
              <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">項目</th>
                      <th className="px-3 py-2 text-left font-semibold">値</th>
                      <th className="px-3 py-2 text-left font-semibold">意味</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                    <tr>
                      <td className="px-3 py-2">ホストゾーン名</td>
                      <td className="px-3 py-2 font-mono">hokushi-aws.click</td>
                      <td className="px-3 py-2">買ったドメインと同じ名前 ✓</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">タイプ</td>
                      <td className="px-3 py-2">パブリック</td>
                      <td className="px-3 py-2">インターネットから見える DNS</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">作成者</td>
                      <td className="px-3 py-2">Route 53</td>
                      <td className="px-3 py-2">自分じゃなく AWS が自動で作った証拠</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">レコード数</td>
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2">NS と SOA がデフォルトで入ってる</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Note>
                <strong>「パブリック」</strong>は「インターネットの DNS から見える」の意味。プライベートホストゾーンというのもあるが、それは VPC 内専用 (社内 DNS 的な用途)。今回はパブリックで正解
              </Note>
            </div>
          </details>

          {/* === Phase B: 中を覗く === */}
          <details open className="group mt-3 rounded-lg border-2 border-emerald-300 bg-emerald-50/30 dark:border-emerald-700 dark:bg-emerald-950/20">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3 text-base font-bold text-emerald-900 transition-colors hover:bg-emerald-100/30 dark:text-emerald-100 dark:hover:bg-emerald-900/30">
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>📚 Phase B — 中の「レコード」を見学</span>
            </summary>
            <div className="flex flex-col gap-3 border-t border-emerald-200 px-5 pb-5 pt-4 dark:border-emerald-900/50">

              <Li>
                一覧の <Code>hokushi-aws.click</Code> をクリック → ホストゾーンの詳細画面に入る
              </Li>
              <Li>
                上半分: <strong>ホストゾーンの詳細</strong> (名前/ID/ネームサーバー)
              </Li>
              <Li>
                下半分: <strong>「レコード」タブ</strong>に NS と SOA の 2 行が並ぶ
              </Li>

              <Screenshot
                src="/aws/route53/スクリーンショット 2026-06-09 17.07.41.png"
                alt="hokushi-aws.click の中 - ネームサーバー 4 つ + NS/SOA レコード"
                width={2560}
                height={1440}
              />

              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                自動で入っている 2 種類のレコード
              </h4>
              <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">タイプ</th>
                      <th className="px-3 py-2 text-left font-semibold">意味</th>
                      <th className="px-3 py-2 text-left font-semibold">触る?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                    <tr>
                      <td className="px-3 py-2 font-mono">NS</td>
                      <td className="px-3 py-2">
                        「このドメインの DNS は Route 53 が管理してるよ」を世界に宣言するレコード。
                        4 つのネームサーバー名が入る
                      </td>
                      <td className="px-3 py-2">❌ 触らない (消すと DNS が壊れる)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">SOA</td>
                      <td className="px-3 py-2">
                        ドメインのメタ情報 (管理者メール / 更新間隔)。内部的に使う
                      </td>
                      <td className="px-3 py-2">❌ 触らない</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                ⭐ 4 つのネームサーバーが「別々の TLD」になってる理由
              </h4>
              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                NS レコードを見ると 4 つのネームサーバーが並んでて、よく見ると <strong>末尾が全部違う TLD</strong>:
              </p>
              <pre className="overflow-x-auto rounded-md bg-zinc-900 px-4 py-3 text-[12px] leading-relaxed text-zinc-100">
                <code>{`ns-2003.awsdns-58.co.uk    ← .co.uk
ns-1465.awsdns-55.org      ← .org
ns-188.awsdns-23.com       ← .com
ns-905.awsdns-48.net       ← .net`}</code>
              </pre>
              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                これは <strong>耐障害性のため</strong>。もし <Code>.com</Code> 全体が大規模障害で
                ダウンしても、<Code>.org</Code> や <Code>.net</Code> や <Code>.co.uk</Code> の
                ネームサーバーが生きてればドメインは引き続き名前解決できる。
                <strong>AWS の細やかな設計</strong>がここに見える。
              </p>

              <details className="group rounded-md border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
                <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">
                  <svg className="h-3 w-3 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>TTL の値も気になる人へ</span>
                </summary>
                <div className="flex flex-col gap-2 px-5 pb-3 pt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <p>
                    <strong>TTL (Time To Live)</strong> = 「このレコードは何秒キャッシュしていいか」。
                  </p>
                  <ul className="ml-4 list-disc">
                    <li>NS の TTL <strong>172800</strong> 秒 = <strong>2 日</strong> (滅多に変えないので長め)</li>
                    <li>SOA の TTL <strong>900</strong> 秒 = <strong>15 分</strong> (変更時の伝播は速め)</li>
                  </ul>
                </div>
              </details>
            </div>
          </details>

          {/* 完了サマリー */}
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ✅ Step 02 完了
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-emerald-900/80 dark:text-emerald-300">
              <li>Hosted Zone <Code>hokushi-aws.click</Code> が自動作成されてた ✓</li>
              <li>中に NS (4 ネームサーバー) と SOA が入ってる ✓</li>
              <li>4 つの NS は <Code>.com/.org/.net/.co.uk</Code> に分散 (耐障害性)</li>
              <li>後の Step (ACM 検証 / Alias) で <strong>ここにレコードを追加していく</strong>場所</li>
            </ul>
            <p className="mt-3 text-sm text-emerald-900/80 dark:text-emerald-300">
              次は <strong>ACM で SSL 証明書を発行</strong> (Step 03)。発行時に「あなたが本当にこのドメインの持ち主?」を確認するため、ここに TXT レコードを 1 個追加することになる
            </p>
          </div>
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
