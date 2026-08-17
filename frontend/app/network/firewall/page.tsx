export default function FirewallPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ファイアウォール と FortiGate
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「外から変なやつ入ってくるな」「中から変なところに繋ぐな」を実現する装置。
          一般論としてのファイアウォールと、現場でよく見る <strong>FortiGate (フォーティゲート)</strong> の正体を整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            ファイアウォール = <strong>「通信パケットを 1 個ずつ見て、ルールに合わなければ捨てる門番」</strong>
          </li>
          <li>
            判定材料は <strong>送信元 IP / 宛先 IP / ポート / プロトコル</strong>。
            通信の中身ではなく <strong>「宛先のドアの番号」</strong>を見ている、というイメージ
          </li>
          <li>
            最近主流の <strong>NGFW (次世代ファイアウォール)</strong> は、それに加えて
            <strong>「中身もちょっと開けて」</strong>アプリ判別・侵入検知・アンチウイルスまでやる
          </li>
          <li>
            <strong>FortiGate</strong> = <strong>Fortinet 社の NGFW アプライアンス (専用機)</strong>。日本企業のオフィスではよく見かける鉄板
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="basics" num={2}>
          ファイアウォール = 通信の門番
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ネットワークでは何でも <strong>パケット</strong>という小包に分割して運ばれます。
          ファイアウォールは <strong>ネットワークの境目に立って</strong>、
          通り抜けようとするパケット 1 個ずつに <strong>「お前は通っていいか?」</strong> と判定するだけの装置です。
        </p>

        <GatekeeperDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          パケットには宛名のような情報 (ヘッダ) が付いています。ファイアウォールはここを見て判定する。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">見る項目</th>
                <th className="px-4 py-2 text-left font-semibold">例</th>
                <th className="px-4 py-2 text-left font-semibold">何の情報か</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  送信元 IP
                </td>
                <td className="px-4 py-2 font-mono text-xs">192.168.1.42</td>
                <td className="px-4 py-2">誰から来たパケットか</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  宛先 IP
                </td>
                <td className="px-4 py-2 font-mono text-xs">142.250.207.78</td>
                <td className="px-4 py-2">どこ宛か (例: Google のサーバ)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  プロトコル
                </td>
                <td className="px-4 py-2 font-mono text-xs">TCP / UDP / ICMP</td>
                <td className="px-4 py-2">運び方の種類</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  宛先ポート
                </td>
                <td className="px-4 py-2 font-mono text-xs">443 (HTTPS)</td>
                <td className="px-4 py-2">宛先サーバの「どのドア」を叩くか</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  送信元ポート
                </td>
                <td className="px-4 py-2 font-mono text-xs">51234</td>
                <td className="px-4 py-2">差出人側の口 (ランダム)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よくある用語: インバウンド / アウトバウンド
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>インバウンド</strong> = 外 (インターネット) から内 (社内 LAN) へ来る通信
            </li>
            <li>
              ・<strong>アウトバウンド</strong> = 内から外へ出ていく通信
            </li>
            <li>
              ・通常はそれぞれに対して別々のルールを書く
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="rules" num={3}>
          ルール: 何を許可して何を弾くか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          門番 (= ファイアウォール) には <strong>「許可リスト」</strong>が渡されています。
          パケットが来るたびに、そのリストを <strong>上から 1 行ずつ照らし合わせて</strong>、
          <strong>当てはまる行が 1 つでも見つかれば通す</strong>。<br />
          <strong>最後まで 1 つも当てはまらなければ → 通さない</strong>。これがファイアウォールの全部です。
        </p>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            会社の門番に例えると
          </p>
          <p className="mt-2 text-sm text-emerald-900/90 dark:text-emerald-300">
            会社の入口に立っている警備員に、こういうリストを渡しているイメージです:
          </p>
          <ol className="mt-3 ml-5 flex list-decimal flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
            <li>「社員証を持ってる人 → 通して」</li>
            <li>「アポありの来客 → 通して」</li>
            <li>「宅配業者 → 通して」</li>
            <li>(リストの最後) <strong>上のどれにも当てはまらない人 → 通すな</strong></li>
          </ol>
          <p className="mt-3 text-sm text-emerald-900/90 dark:text-emerald-300">
            → 「許可する人」だけリストに書いて、<strong>書いてない人は全員ブロック</strong>。
            これがファイアウォールの考え方そのもの。
          </p>
        </div>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ルールの中身は 3 つだけ覚えれば OK
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">項目</th>
                <th className="px-3 py-2 text-left font-semibold">意味</th>
                <th className="px-3 py-2 text-left font-semibold">例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">どこから?</td>
                <td className="px-3 py-2">送信元 (= パケットの差出人)</td>
                <td className="px-3 py-2 font-mono text-xs">社内 PC</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">どこへ?</td>
                <td className="px-3 py-2">宛先 (= 行き先)</td>
                <td className="px-3 py-2 font-mono text-xs">インターネット</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">何を?</td>
                <td className="px-3 py-2">ポート / プロトコル (= 用途)</td>
                <td className="px-3 py-2 font-mono text-xs">443 (HTTPS = ウェブ閲覧)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          → 「<strong>どこから</strong>、<strong>どこへ</strong>、<strong>何を</strong>」の組み合わせが
          リストの行と一致すれば <strong>許可</strong>、一致しなければ次の行へ。
        </p>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          オフィスの実例: たった 3 行のリスト
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">#</th>
                <th className="px-3 py-2 text-left font-semibold">どこから</th>
                <th className="px-3 py-2 text-left font-semibold">どこへ</th>
                <th className="px-3 py-2 text-left font-semibold">何を</th>
                <th className="px-3 py-2 text-left font-semibold">許可?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">社内 PC</td>
                <td className="px-3 py-2">インターネット</td>
                <td className="px-3 py-2 font-mono text-xs">443 (ウェブ閲覧)</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">✓ 通す</td>
              </tr>
              <tr>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">インターネット</td>
                <td className="px-3 py-2">自社の Web サーバ</td>
                <td className="px-3 py-2 font-mono text-xs">443 (お客さんがサイトを見る)</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">✓ 通す</td>
              </tr>
              <tr>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">自宅 (VPN 経由)</td>
                <td className="px-3 py-2">社内 LAN</td>
                <td className="px-3 py-2 font-mono text-xs">全部</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">✓ 通す</td>
              </tr>
              <tr className="bg-rose-50 dark:bg-rose-950/20">
                <td className="px-3 py-2 font-mono text-xs text-rose-700 dark:text-rose-400">最後</td>
                <td className="px-3 py-2">それ以外</td>
                <td className="px-3 py-2">それ以外</td>
                <td className="px-3 py-2">それ以外</td>
                <td className="px-3 py-2 text-rose-700 dark:text-rose-400">✕ ブロック</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          実際にパケットが来たときの流れ
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
              ✓ ケース A: 社員が Google を見る
            </p>
            <p className="mt-2 text-xs text-emerald-900/80 dark:text-emerald-300">
              パケット = 社内 PC → インターネット → 443
            </p>
            <ol className="mt-3 ml-4 flex list-decimal flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
              <li>1 行目を見る → <strong>当たる! → 即「通す」で終了</strong></li>
            </ol>
            <p className="mt-2 text-xs text-emerald-900/70 dark:text-emerald-300/80">
              ※ 当たったら 2 行目以降は見ない (即決)
            </p>
          </div>
          <div className="rounded-lg border-2 border-rose-300 bg-rose-50/40 p-4 dark:border-rose-700 dark:bg-rose-950/30">
            <p className="text-sm font-bold text-rose-900 dark:text-rose-200">
              ✕ ケース B: 知らない誰かが社内の DB を直接叩こうとする
            </p>
            <p className="mt-2 text-xs text-rose-900/80 dark:text-rose-300">
              パケット = インターネット → 社内の DB → 3306
            </p>
            <ol className="mt-3 ml-4 flex list-decimal flex-col gap-1 text-sm text-rose-900/90 dark:text-rose-300">
              <li>1 行目 → 当たらない</li>
              <li>2 行目 → 当たらない (宛先が違う)</li>
              <li>3 行目 → 当たらない (VPN 経由じゃない)</li>
              <li><strong>最後 → ブロック</strong></li>
            </ol>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            一番大事なポイント (これだけ覚えれば OK)
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>① <strong>許可することだけ書く</strong> (拒否する理由は書かない)</li>
            <li>② <strong>書かれていないものは全部ブロック</strong> (= デフォルト deny)</li>
            <li>③ <strong>上から順</strong>に見て、<strong>当たった瞬間に決定</strong>する</li>
          </ul>
        </div>

        <details className="group mt-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <summary className="flex cursor-pointer items-center gap-2 px-5 py-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            <svg
              className="h-3 w-3 transition-transform group-open:rotate-90"
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
            「特定の IP からだけ通す」もできるの? → はい、これがど真ん中の使い方
          </summary>
          <div className="flex flex-col gap-4 px-5 pb-5">
            <p className="text-zinc-700 dark:text-zinc-300">
              ファイアウォールのルールには <strong>送信元 IP / 宛先 IP</strong>を書く欄があり、ここに
              <strong>「この範囲からの通信だけ通す」</strong>と指定できます。むしろ
              ファイアウォールはこれをやるための装置と言っていいくらいの基本機能です。
            </p>

            <div className="rounded-lg border border-violet-200 bg-violet-50/60 px-5 py-4 dark:border-violet-900/50 dark:bg-violet-950/30">
              <p className="text-sm font-medium text-violet-900 dark:text-violet-200">
                書き方: CIDR 表記 (「IP 範囲」をコンパクトに書く記法)
              </p>
              <div className="mt-3 overflow-hidden rounded-md border border-violet-200 dark:border-violet-800">
                <table className="w-full text-xs">
                  <thead className="bg-white text-violet-900 dark:bg-violet-950/60 dark:text-violet-200">
                    <tr>
                      <th className="px-3 py-1.5 text-left font-semibold">書き方</th>
                      <th className="px-3 py-1.5 text-left font-semibold">意味</th>
                      <th className="px-3 py-1.5 text-left font-semibold">カバー数</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-violet-200 bg-white text-violet-900/90 dark:divide-violet-800 dark:bg-violet-950/40 dark:text-violet-200">
                    <tr>
                      <td className="px-3 py-1.5 font-mono">203.0.113.42/32</td>
                      <td className="px-3 py-1.5">この 1 個の IP だけ</td>
                      <td className="px-3 py-1.5 font-mono text-violet-700 dark:text-violet-400">1</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-mono">203.0.113.0/24</td>
                      <td className="px-3 py-1.5">203.0.113.0 〜 255</td>
                      <td className="px-3 py-1.5 font-mono text-violet-700 dark:text-violet-400">256</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-mono">192.168.0.0/16</td>
                      <td className="px-3 py-1.5">192.168.0.0 〜 192.168.255.255 (社内 LAN 全体とか)</td>
                      <td className="px-3 py-1.5 font-mono text-violet-700 dark:text-violet-400">65,536</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-mono">0.0.0.0/0</td>
                      <td className="px-3 py-1.5">どこからでも (= any)</td>
                      <td className="px-3 py-1.5 font-mono text-violet-700 dark:text-violet-400">全 IP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-violet-900/80 dark:text-violet-300">
                <code className="rounded bg-white/60 px-1 font-mono dark:bg-violet-950/50">/数字</code>{" "}
                の部分は「ネットワーク部分のビット数」を表していて、
                <strong>数字が大きいほど範囲は狭い</strong> (/32 が 1 個、/0 が全部) と覚えれば OK。
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
                実用例: 「IP で絞る」が効くシーン
              </p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-emerald-900/90 dark:text-emerald-300">
                <li>
                  ・<strong>管理画面 (admin)</strong> は <strong>会社の固定回線</strong> (例:{" "}
                  <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-emerald-950/50">203.0.113.0/24</code>) からのみ許可
                </li>
                <li>
                  ・<strong>SSH (port 22)</strong> は <strong>VPN サブネット</strong> (例:{" "}
                  <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-emerald-950/50">10.8.0.0/24</code>) からのみ
                </li>
                <li>
                  ・<strong>取引先 API への接続</strong>は <strong>その会社の公開 IP リスト</strong>だけ許可
                  (相手から「うちの送信元 IP はこれです」と通知される)
                </li>
                <li>
                  ・<strong>DB サーバ (3306)</strong> は <strong>同じ VPC 内の Web サーバの IP</strong> からだけ受け付ける
                </li>
                <li>
                  ・<strong>特定の国・地域からのアクセスを丸ごとブロック</strong> (海外からの攻撃が多い場合)
                </li>
              </ul>
              <p className="mt-3 text-xs text-emerald-900/80 dark:text-emerald-300">
                → これが効くと、SSH ブルートフォースのような攻撃は <strong>そもそも届かなくなる</strong>。
                「攻撃を検知して防ぐ」より <strong>「物理的に届かなくする」</strong>方が圧倒的に強い。
              </p>
            </div>
          </div>
        </details>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="fortigate" num={4}>
          FortiGate (フォーティゲート) とは
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>FortiGate</strong> は <strong>Fortinet 社</strong>が出している
          <strong>NGFW のハードウェアアプライアンス</strong> (専用機)。
          日本のオフィスの「インターネットに出る境目」に置かれている黒い箱は、
          だいたい FortiGate か Cisco ASA か Palo Alto Networks のどれかです。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              実体は何か
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>
                ・<strong>専用ハードウェア (1U サイズの箱)</strong>。家庭用ルータの強力版に近い見た目
              </li>
              <li>
                ・OS は独自の <strong>FortiOS</strong>
              </li>
              <li>
                ・<strong>ASIC (専用チップ)</strong>で暗号処理を高速化しているのが売り
              </li>
              <li>
                ・<strong>FortiGate-VM</strong> (ソフト版・クラウド版) もある
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              なぜ「ゲート (gate)」?
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              社内 LAN とインターネットの <strong>境目に立つ「門」</strong>として置かれるから。
              通常 <strong>1 拠点に 1 台 (冗長化なら 2 台)</strong> 設置され、
              ここを通らないと外に出られない・中に入れない構造を作る。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            FortiGate が <strong>1 台で</strong> やってくれること (UTM 機能)
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            FortiGate は <strong>UTM (Unified Threat Management)</strong> という分類で、
            これ 1 台で多数のセキュリティ機能を兼ねます ── これが選ばれる最大の理由。
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-1 text-sm text-emerald-900/80 sm:grid-cols-2 dark:text-emerald-300">
            <li>・<strong>ファイアウォール</strong> (ルールベース)</li>
            <li>・<strong>VPN</strong> (IPSec / SSL-VPN で拠点間や在宅接続)</li>
            <li>・<strong>IPS</strong> (侵入防止: 既知の攻撃パターンを遮断)</li>
            <li>・<strong>アンチウイルス</strong> (通信中のファイルをスキャン)</li>
            <li>・<strong>Web フィルタ</strong> (カテゴリ別にサイトを制限)</li>
            <li>・<strong>アプリ制御</strong> (Facebook 禁止、Teams は許可、等)</li>
            <li>・<strong>SSL 復号</strong> (中身検査のため一時復号)</li>
            <li>・<strong>ルーティング・NAT</strong> (基本のルータ機能も兼ねる)</li>
          </ul>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            ルールはどこに書く? → FortiGate <strong>本体に直接</strong>
          </p>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            インバウンド / アウトバウンドのルール (FortiGate では <strong>「ポリシー (Policy)」</strong>と呼ぶ) は、
            <strong>FortiGate の箱そのものにログインして書き込み</strong>ます。
            設定はその箱の中に保存され、そこを通る全パケットに適用される ── という単純な構造です。
          </p>

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">アクセス方法は 3 つ</p>
          <ul className="mt-1 flex flex-col gap-1 text-sm text-blue-900/80 dark:text-blue-300">
            <li>
              ・<strong>GUI (Web)</strong>: ブラウザで <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-blue-950/50">https://&lt;FortiGate の IP&gt;</code> にアクセス。
              日常運用で一番使われる管理画面
            </li>
            <li>
              ・<strong>CLI</strong>: SSH 接続 or コンソールケーブル。設定の自動化・テンプレ化に
            </li>
            <li>
              ・<strong>FortiManager</strong>: 複数台ある時の集中管理画面。各拠点の FortiGate を 1 か所から
            </li>
          </ul>

          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-300">
            GUI を開くと <strong>「ポリシー &amp; オブジェクト → ファイアウォールポリシー」</strong>に一覧があり、
            各行が 1 ルールです。実際の画面はおおむねこんな構造:
          </p>

          <div className="mt-3 overflow-hidden rounded-md border border-blue-200 dark:border-blue-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold">Name</th>
                  <th className="px-2 py-1.5 text-left font-semibold">From</th>
                  <th className="px-2 py-1.5 text-left font-semibold">To</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Source</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Dest</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Service</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 bg-white text-blue-900/90 dark:divide-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
                <tr>
                  <td className="px-2 py-1.5 font-mono">allow-web-out</td>
                  <td className="px-2 py-1.5 font-mono">internal</td>
                  <td className="px-2 py-1.5 font-mono">wan1</td>
                  <td className="px-2 py-1.5 font-mono">LAN_subnet</td>
                  <td className="px-2 py-1.5 font-mono">all</td>
                  <td className="px-2 py-1.5 font-mono">HTTPS</td>
                  <td className="px-2 py-1.5 text-emerald-700 dark:text-emerald-400">Accept</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">allow-web-srv-in</td>
                  <td className="px-2 py-1.5 font-mono">wan1</td>
                  <td className="px-2 py-1.5 font-mono">dmz</td>
                  <td className="px-2 py-1.5 font-mono">all</td>
                  <td className="px-2 py-1.5 font-mono">Web_srv</td>
                  <td className="px-2 py-1.5 font-mono">HTTPS</td>
                  <td className="px-2 py-1.5 text-emerald-700 dark:text-emerald-400">Accept</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">allow-vpn</td>
                  <td className="px-2 py-1.5 font-mono">vpn-tun</td>
                  <td className="px-2 py-1.5 font-mono">internal</td>
                  <td className="px-2 py-1.5 font-mono">VPN_users</td>
                  <td className="px-2 py-1.5 font-mono">LAN_subnet</td>
                  <td className="px-2 py-1.5 font-mono">ALL</td>
                  <td className="px-2 py-1.5 text-emerald-700 dark:text-emerald-400">Accept</td>
                </tr>
                <tr className="bg-rose-50 dark:bg-rose-950/30">
                  <td className="px-2 py-1.5 font-mono text-rose-900 dark:text-rose-200">implicit-deny</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 text-rose-700 dark:text-rose-400">Deny</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">
            ポイント: インバウンド / アウトバウンドは <strong>「From → To のインターフェース」</strong>で表現される
          </p>
          <ul className="mt-1 flex flex-col gap-1 text-sm text-blue-900/80 dark:text-blue-300">
            <li>
              ・<strong>wan1 → internal</strong> = <strong>インバウンド</strong> (外から社内へ来る通信)
            </li>
            <li>
              ・<strong>internal → wan1</strong> = <strong>アウトバウンド</strong> (社内から外へ出る通信)
            </li>
            <li>
              ・<strong>internal → dmz</strong>、<strong>vpn-tun → internal</strong> など、ゾーン間の通信も同じ書き方で表現
            </li>
          </ul>

          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-300">
            つまり「インバウンド」「アウトバウンド」というのは <strong>概念上の呼び方</strong>であって、
            FortiGate 上では <strong>「どのインターフェースから入って、どのインターフェースへ出るか」</strong>として
            機械的に定義される、というのが実体です。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            周辺製品: Fortinet 製品はファミリーで揃えるのが普通
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>FortiManager</strong> = 複数の FortiGate を <strong>集中管理</strong>するサーバ
            </li>
            <li>
              ・<strong>FortiAnalyzer</strong> = ログを集めて <strong>レポート・分析</strong>するサーバ
            </li>
            <li>
              ・<strong>FortiSwitch / FortiAP</strong> = スイッチ / 無線 AP。FortiGate から一元管理できる
            </li>
            <li>
              ・<strong>FortiClient</strong> = 端末側に入れる VPN クライアント + EPP
            </li>
          </ul>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            これらをまとめて <strong>「Security Fabric」</strong>と呼んでいて、
            「全部 Fortinet で揃えると統合管理できる」というのが営業メッセージ。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="topology" num={5}>
          配置例: オフィスでの位置
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          典型的な中小企業の構成だと、FortiGate は <strong>「インターネット回線とオフィス内 LAN の間」</strong>に
          鎮座します。社員の PC から外部へのアクセスも、外部からの応答も <strong>必ずここを通る</strong>。
        </p>

        <TopologyDiagram />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          公開する Web サーバなどは <strong>DMZ (非武装地帯)</strong> という別ゾーンに置き、
          「外から DMZ までは許可するが DMZ から社内 LAN への侵入は厳しく制限」という構成にするのが定石です。
          FortiGate のような UTM は <strong>このゾーン分割と各ゾーン間のルール</strong>を 1 台で全部管理できます。
        </p>
      </section>
    </main>
  );
}

function GatekeeperDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 320" className="mx-auto w-full max-w-2xl">
        <rect
          x="10"
          y="50"
          width="240"
          height="240"
          rx="10"
          className="fill-amber-50/60 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="130" y="42" textAnchor="middle" className="fill-amber-800 text-xs font-semibold dark:fill-amber-300">
          ネットワーク A: インターネット (信頼できない)
        </text>

        <g>
          <circle cx="55" cy="120" r="14" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600" strokeWidth="1.2" />
          <text x="55" y="124" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">PC</text>
          <circle cx="55" cy="200" r="14" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600" strokeWidth="1.2" />
          <text x="55" y="204" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">サーバ</text>
          <circle cx="55" cy="260" r="14" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600" strokeWidth="1.2" />
          <text x="55" y="264" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">攻撃者</text>
        </g>

        <rect x="280" y="100" width="60" height="160" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="310" y="175" textAnchor="middle" className="fill-zinc-50 text-xs font-semibold dark:fill-zinc-900">FW</text>
        <text x="310" y="192" textAnchor="middle" className="fill-zinc-300 text-[9px] dark:fill-zinc-600">門番</text>

        <rect
          x="370"
          y="50"
          width="220"
          height="240"
          rx="10"
          className="fill-emerald-50/60 stroke-emerald-400 dark:fill-emerald-950/20 dark:stroke-emerald-700"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="480" y="42" textAnchor="middle" className="fill-emerald-800 text-xs font-semibold dark:fill-emerald-300">
          ネットワーク B: 社内 LAN (信頼)
        </text>

        <g>
          <circle cx="555" cy="120" r="14" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950/40 dark:stroke-emerald-600" strokeWidth="1.2" />
          <text x="555" y="124" textAnchor="middle" className="fill-emerald-800 text-[9px] dark:fill-emerald-300">PC</text>
          <circle cx="555" cy="200" r="14" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950/40 dark:stroke-emerald-600" strokeWidth="1.2" />
          <text x="555" y="204" textAnchor="middle" className="fill-emerald-800 text-[9px] dark:fill-emerald-300">Web</text>
          <circle cx="555" cy="260" r="14" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950/40 dark:stroke-emerald-600" strokeWidth="1.2" />
          <text x="555" y="264" textAnchor="middle" className="fill-emerald-800 text-[9px] dark:fill-emerald-300">DB</text>
        </g>

        <rect x="90" y="105" width="120" height="32" rx="4" className="fill-white stroke-emerald-500 dark:fill-zinc-900 dark:stroke-emerald-500" strokeWidth="1.4" />
        <text x="150" y="117" textAnchor="middle" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">パケット A</text>
        <text x="150" y="130" textAnchor="middle" className="fill-zinc-700 font-mono text-[8px] dark:fill-zinc-300">dst:443 (HTTPS)</text>

        <line x1="210" y1="121" x2="278" y2="121" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#gk-arrow-ok)" />
        <line x1="342" y1="121" x2="410" y2="121" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#gk-arrow-ok)" />

        <rect x="420" y="105" width="120" height="32" rx="4" className="fill-white stroke-emerald-500 dark:fill-zinc-900 dark:stroke-emerald-500" strokeWidth="1.4" />
        <text x="480" y="117" textAnchor="middle" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">パケット A</text>
        <text x="480" y="130" textAnchor="middle" className="fill-zinc-700 font-mono text-[8px] dark:fill-zinc-300">✓ 通過</text>

        <rect x="90" y="225" width="120" height="32" rx="4" className="fill-white stroke-rose-500 dark:fill-zinc-900 dark:stroke-rose-500" strokeWidth="1.4" />
        <text x="150" y="237" textAnchor="middle" className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-400">パケット B</text>
        <text x="150" y="250" textAnchor="middle" className="fill-zinc-700 font-mono text-[8px] dark:fill-zinc-300">dst:22 (SSH)</text>

        <line x1="210" y1="241" x2="272" y2="241" className="stroke-rose-500" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#gk-arrow-ng)" />
        <text x="305" y="246" textAnchor="middle" className="fill-rose-600 text-base font-bold dark:fill-rose-400">✕</text>
        <text x="240" y="275" textAnchor="middle" className="fill-rose-700 text-[9px] dark:fill-rose-400">
          ルールに合わない → ここで破棄
        </text>

        <text x="300" y="312" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          2 つのネットワークの境目に FW が立ち、流れてくる<tspan className="font-semibold">パケット 1 個ずつ</tspan>を判定する
        </text>

        <defs>
          <marker id="gk-arrow-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="gk-arrow-ng" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function TopologyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 320" className="mx-auto w-full max-w-2xl">
        <rect x="240" y="20" width="120" height="40" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="300" y="45" textAnchor="middle" className="fill-amber-900 text-xs font-semibold dark:fill-amber-200">
          インターネット
        </text>

        <line x1="300" y1="60" x2="300" y2="90" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="220" y="90" width="160" height="50" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="300" y="113" textAnchor="middle" className="fill-zinc-50 text-sm font-semibold dark:fill-zinc-900">
          FortiGate
        </text>
        <text x="300" y="130" textAnchor="middle" className="fill-zinc-300 text-[10px] dark:fill-zinc-600">
          境界ファイアウォール
        </text>

        <line x1="220" y1="140" x2="120" y2="180" className="stroke-zinc-400" strokeWidth="1.5" />
        <rect x="40" y="180" width="160" height="50" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="120" y="203" textAnchor="middle" className="fill-rose-900 text-xs font-semibold dark:fill-rose-200">
          DMZ
        </text>
        <text x="120" y="220" textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-400">
          公開 Web サーバ等
        </text>

        <line x1="380" y1="140" x2="480" y2="180" className="stroke-zinc-400" strokeWidth="1.5" />
        <rect x="400" y="180" width="160" height="50" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="480" y="203" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">
          社内 LAN
        </text>
        <text x="480" y="220" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          社員 PC / ファイルサーバ
        </text>

        <line x1="480" y1="230" x2="480" y2="260" className="stroke-zinc-300" strokeWidth="1" />
        <g className="fill-zinc-700 text-[10px] dark:fill-zinc-300" textAnchor="middle">
          <text x="420" y="275">スイッチ</text>
          <text x="540" y="275">無線 AP</text>
        </g>
        <g className="fill-zinc-500 text-[9px] dark:fill-zinc-500" textAnchor="middle">
          <text x="420" y="290">(FortiSwitch)</text>
          <text x="540" y="290">(FortiAP)</text>
        </g>

        <text x="300" y="315" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          インターネットと社内の間に 1 台。DMZ・社内 LAN を別ゾーンに分けて、ゾーン間のルールも FortiGate が制御する
        </text>
      </svg>
    </div>
  );
}

function SectionH2({
  id,
  num,
  children,
}: {
  id: string;
  num: number;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="flex scroll-mt-6 items-center gap-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
        {num}
      </span>
      <span>{children}</span>
    </h2>
  );
}

function TableOfContents() {
  const items = [
    { id: "intro", num: 1, title: "先に結論" },
    { id: "basics", num: 2, title: "通信の門番" },
    { id: "rules", num: 3, title: "ルール" },
    { id: "fortigate", num: 4, title: "FortiGate とは" },
    { id: "topology", num: 5, title: "配置例" },
  ];
  return (
    <nav className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        目次
      </p>
      <ol className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="flex items-center gap-2 text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                {it.num.toString().padStart(2, "0")}
              </span>
              <span>{it.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
