export default function NetworkInternetPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          ネットワーク
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          インターネットの裏側
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          家のルーターから先、世界中のサーバーに繋がる「地球規模の有線インフラ」。海底ケーブルと、データが実際に渡る道筋を見ていきます。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>先に結論</SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            国際通信の <strong>99% 以上は海底ケーブル</strong>。日米間は太平洋を約 8,000 km 横断
          </li>
          <li>
            データは <strong>パケット</strong> に分割され、ヘッダの宛先 IP を見てルーターが転送する仕組み
          </li>
          <li>
            1 本のファイバーには <strong>「色 (波長) で分けて」+「封筒で分けて」</strong> 世界中の通信が同居している
          </li>
          <li>
            東京 ⇔ LA の物理下限は <strong>片道 40 ms</strong>。実測 RTT は 100〜150 ms 程度
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="submarine" num={2}>太平洋を渡る: 日米の海底ケーブル</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          「アメリカの YouTube を見る」「米国の AWS にアクセスする」── このとき、データは<strong>空を飛んでいません</strong>。
          太平洋の海底に何本も走っている<strong>光ファイバーケーブル</strong>を通って来ます。
          衛星通信もありますが、遅延と帯域の都合で主役にはなれず、国際通信の <strong>99% 以上は海底ケーブル</strong>です。
        </p>

        <SubmarineCableDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          ケーブル 1 本は<strong>髪の毛より細い光ファイバー</strong>を複数本束ねたもので、外側を金属とプラスチックで何重にも保護しています。
          浅い海では鋼鉄の鎧で覆って錨やトロール網から守り、深海では細くなる。
          1 本あたり数 Tbps〜数十 Tbps を運べて、太平洋を一気に横断します。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          日米を繋ぐ主要なケーブル (一部)
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">名前</th>
                <th className="px-4 py-2 text-left font-semibold">開通</th>
                <th className="px-4 py-2 text-left font-semibold">出資企業 (例)</th>
                <th className="px-4 py-2 text-left font-semibold">日本側 → 米国側</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">FASTER</td>
                <td className="px-4 py-2">2016</td>
                <td className="px-4 py-2">Google / KDDI / SingTel ほか</td>
                <td className="px-4 py-2">千倉(千葉)・志摩(三重) → Bandon (Oregon)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">JUPITER</td>
                <td className="px-4 py-2">2020</td>
                <td className="px-4 py-2">NTT / Softbank / Amazon / Meta ほか</td>
                <td className="px-4 py-2">丸山(千葉)・志摩(三重) → Hermosa Beach (LA)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">NCP</td>
                <td className="px-4 py-2">2018</td>
                <td className="px-4 py-2">Microsoft / NTT / Softbank ほか</td>
                <td className="px-4 py-2">南房総(千葉) → Pacific City (Oregon)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">Topaz</td>
                <td className="px-4 py-2">2023</td>
                <td className="px-4 py-2">Google (単独)</td>
                <td className="px-4 py-2">三重 → Port Alberni (カナダ BC)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          実際にはこの他にも 10 本以上が現役 / 計画中。複数本に分散させることで、1 本切れても通信が止まらないようになっています (実際に漁船の錨や地震で切れることがあります)。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="journey" num={3}>米国サーバーから自分のブラウザに動画が届くまで</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          東京の自宅で <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">youtube.com</code> の動画を開いたとします。
          データはどうやって自分の PC まで来るのか、実際の経路を分解してみます。
        </p>

        <DataJourneyDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            気づき: 物理の限界はどこにある?
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・光ファイバー中の光速は約 <strong>20 万 km/s</strong> (真空中の 2/3)。東京〜LA を 8,000 km とすると<strong>片道 40 ms</strong>が物理下限
            </li>
            <li>
              ・実際には経路で遠回りしたり、各国の機器を通るので<strong>RTT (往復) は 100〜150 ms</strong>になる
            </li>
            <li>
              ・YouTube が速く感じるのは、Google が <strong>CDN (キャッシュ)</strong> を日本国内 (東京/大阪のデータセンター) に置いてるから。多くの動画は太平洋を渡らずに国内で完結している
            </li>
            <li>
              ・つまり「アメリカからデータが来る」のは初回や珍しいコンテンツの時だけ ── これが <strong>CDN が重要</strong>な理由
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ターミナルで <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">traceroute google.com</code> や <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">mtr 8.8.8.8</code> を打つと、自分のパケットが実際にどのルーターを経由しているか1ホップずつ見られます。海底ケーブルを渡る瞬間、レイテンシが急に跳ねるのが分かって面白いです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="multiplex" num={4}>なぜ混ざらない? ─ 多重化とパケット交換</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          1 本の光ファイバーには<strong>世界中のあらゆる人</strong>のデータが同時に流れています。
          自分の YouTube、隣の人の Slack、海外の Zoom 会議、誰かのオンラインゲーム ── 全部同じケーブルに乗っている。
          じゃあ<strong>なぜ混ざらないのか</strong>。答えは「<strong>2 段階で混ざらないようにしている</strong>」です。
        </p>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <h3 className="text-base font-semibold text-indigo-900 dark:text-indigo-200">
              ① 物理層: WDM (波長多重)
            </h3>
            <p className="mt-2 text-sm text-indigo-900/80 dark:text-indigo-300">
              1 本のファイバーに<strong>違う「色」の光</strong>を何十本も同時に流す。
              光の色 (波長) ごとに完全に独立したチャンネルになる。赤の光と青の光は同じガラスの中を進んでも干渉しません。
              これを <strong>DWDM (Dense WDM)</strong> と呼び、1 本で 80〜100 波長、各 100〜400 Gbps が普通。
              つまり 1 本のファイバーで <strong>10 Tbps 超</strong>。
            </p>
            <p className="mt-3 text-xs text-indigo-900/70 dark:text-indigo-400">
              たとえると ─ ラジオで AM/FM の各局が違う周波数で同居してるのと同じ。受信側は欲しい周波数だけを拾う。
            </p>
          </div>

          <div className="rounded-lg border border-teal-200 bg-teal-50 p-5 dark:border-teal-900/50 dark:bg-teal-950/30">
            <h3 className="text-base font-semibold text-teal-900 dark:text-teal-200">
              ② 上の層: パケット交換
            </h3>
            <p className="mt-2 text-sm text-teal-900/80 dark:text-teal-300">
              さらに 1 つの波長の中でも、データは<strong>小さなパケット</strong>に分割されて時間で交互に流れる。
              各パケットには <strong>「送信元 IP / 宛先 IP / ポート番号」</strong>が書かれた封筒(ヘッダ)が付いていて、ルーターはそれを見て正しい方向に振り分ける。
            </p>
            <p className="mt-3 text-xs text-teal-900/70 dark:text-teal-400">
              たとえると ─ 高速道路に車がぎっしり走っていても、各車は別々の運転手 + 別々の行き先。ETC ゲートが番号で振り分けるイメージ。
            </p>
          </div>
        </div>

        <WdmDiagram />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よくある疑問 (クリックで展開)
          </p>
          <Faq q="別の人のパケットを盗み見できる?">
            物理的にはルーターを経由するので、その経路上では「読もうと思えば読めるパケット」が流れている。だから <strong>HTTPS / TLS</strong> で<strong>暗号化</strong>している。中身は鍵を持ってる人(=自分のブラウザと相手のサーバー)以外には文字化けに見える。
          </Faq>
          <Faq q="自分宛じゃないパケットが届くことは?">
            ルーターが宛先 IP を見て正しい方向にだけ送るので、基本届かない。家の Wi-Fi 内では物理的には全員に電波が届くが、宛先 MAC が違うとカーネルが捨てる。
          </Faq>
          <Faq q="パケットが混ざって順番がバラバラになることは?">
            <strong>ある</strong>。経路が違うと到着順が前後する。これは <strong>TCP</strong> が「シーケンス番号」で並べ直してくれる。だから上のアプリは順番を気にしなくていい。
          </Faq>
          <Faq q="パケットが消えることは?">
            <strong>ある</strong>。ルーターが混雑したら捨てられる。TCP は「届かなかった分を再送して」と頼める仕組みを持ってる。UDP は持ってないので、用途で使い分ける (ゲーム/音声は UDP が多い)。
          </Faq>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          まとめると、混ざらないのは <strong>「色で分けた」+「封筒で分けた」</strong>の二重構造のおかげ。
          1 本のファイバーが世界中の通信を運べるのはこの仕組みあってこそです。
        </p>
      </section>
    </main>
  );
}

function SectionH2({ id, num, children }: { id: string; num: number; children: string }) {
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
    { id: "submarine", num: 2, title: "海底ケーブル" },
    { id: "journey", num: 3, title: "米サーバーから届くまで" },
    { id: "multiplex", num: 4, title: "なぜ混ざらない?" },
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

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-lg border border-zinc-200 bg-white open:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:open:bg-zinc-900">
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
        <span>Q. {q}</span>
        <span className="text-xs text-zinc-400 transition-transform group-open:rotate-90 dark:text-zinc-600">
          ▶
        </span>
      </summary>
      <div className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        {children}
      </div>
    </details>
  );
}

function SubmarineCableDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 800 340" className="mx-auto w-full max-w-3xl">
        <rect x="0" y="0" width="800" height="340" className="fill-sky-50 dark:fill-sky-950/30" />

        <path
          d="M 90 90 Q 105 100 115 130 L 130 170 Q 140 200 150 220 L 160 250"
          className="fill-emerald-100 stroke-emerald-700 dark:fill-emerald-900/40 dark:stroke-emerald-500"
          strokeWidth="1.5"
        />
        <text x="100" y="75" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">日本</text>

        <circle cx="140" cy="155" r="4" className="fill-rose-600" />
        <text x="65" y="158" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">千倉</text>

        <circle cx="138" cy="180" r="4" className="fill-rose-600" />
        <text x="60" y="183" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">丸山</text>

        <circle cx="148" cy="220" r="4" className="fill-rose-600" />
        <text x="115" y="237" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">志摩</text>

        <path
          d="M 670 60 Q 680 100 685 140 Q 690 180 695 230 Q 700 270 720 290"
          className="fill-amber-50 stroke-amber-700 dark:fill-amber-900/30 dark:stroke-amber-500"
          strokeWidth="1.5"
        />
        <text x="700" y="50" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">米国 西海岸</text>

        <circle cx="680" cy="115" r="4" className="fill-sky-700" />
        <text x="695" y="118" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">Bandon (OR)</text>

        <circle cx="683" cy="145" r="4" className="fill-sky-700" />
        <text x="700" y="148" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">Pacific City (OR)</text>

        <circle cx="688" cy="200" r="4" className="fill-sky-700" />
        <text x="705" y="203" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">Hermosa Beach (LA)</text>

        <path d="M 140 155 Q 410 80 680 115" className="fill-none stroke-yellow-500" strokeWidth="2" />
        <text x="380" y="95" className="fill-yellow-700 text-[10px] font-semibold dark:fill-yellow-400">FASTER (2016)</text>

        <path d="M 138 180 Q 410 175 688 200" className="fill-none stroke-emerald-500" strokeWidth="2" />
        <text x="380" y="170" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">JUPITER (2020)</text>

        <path d="M 138 180 Q 410 215 683 145" className="fill-none stroke-rose-500" strokeWidth="2" />
        <text x="380" y="225" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-400">NCP (2018)</text>

        <path d="M 148 220 Q 410 270 688 200" className="fill-none stroke-purple-500" strokeWidth="2" />
        <text x="380" y="278" className="fill-purple-700 text-[10px] font-semibold dark:fill-purple-400">Topaz (2023)</text>

        <text x="400" y="320" textAnchor="middle" className="fill-zinc-600 text-[11px] font-medium dark:fill-zinc-400">太平洋 ─ 約 8,000 km</text>
      </svg>
      <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-500">
        実際の経路はもっと曲がりくねっています (海溝/プレート境界を避けて敷設するため)。図は概念図
      </p>
    </div>
  );
}

function DataJourneyDiagram() {
  const stops = [
    { label: "自宅 PC", sub: "東京" },
    { label: "ISP", sub: "NTT 等" },
    { label: "IX", sub: "JPNAP 等" },
    { label: "陸揚げ局", sub: "千倉/志摩" },
    { label: "海底ケーブル", sub: "~8,000 km", highlight: true },
    { label: "陸揚げ局", sub: "Bandon 等" },
    { label: "米 ISP", sub: "Google 網" },
    { label: "サーバー", sub: "DC" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {stops.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className={`flex min-w-[80px] flex-col items-center rounded-md border px-2 py-2 text-center ${
                s.highlight
                  ? "border-sky-400 bg-sky-50 dark:border-sky-700 dark:bg-sky-950/40"
                  : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
              }`}
            >
              <span className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                {s.label}
              </span>
              <span className="text-[9px] text-zinc-500 dark:text-zinc-500">{s.sub}</span>
            </div>
            {i < stops.length - 1 && (
              <span className="text-zinc-400 dark:text-zinc-600">→</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        往復で約 100〜150 ms。物理下限は約 80 ms (光速 × 距離)
      </p>
    </div>
  );
}

function WdmDiagram() {
  const wavelengths = [
    { color: "#ef4444", label: "λ1", user: "ユーザー A の動画" },
    { color: "#f97316", label: "λ2", user: "ユーザー B の Slack" },
    { color: "#eab308", label: "λ3", user: "ユーザー C の Zoom" },
    { color: "#22c55e", label: "λ4", user: "ユーザー D のゲーム" },
    { color: "#06b6d4", label: "λ5", user: "ユーザー E の DL" },
    { color: "#8b5cf6", label: "λ6", user: "..." },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 260" className="mx-auto w-full max-w-2xl">
        <text x="60" y="20" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">入力 (色別)</text>
        {wavelengths.map((w, i) => (
          <g key={i}>
            <circle cx="60" cy={50 + i * 30} r="6" fill={w.color} />
            <text x="80" y={54 + i * 30} className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
              {w.label} : {w.user}
            </text>
          </g>
        ))}

        <path d="M 200 50 Q 250 50 290 130" className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 200 80 Q 250 80 290 130" className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 200 110 Q 250 110 290 130" className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 200 140 Q 250 140 290 130" className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 200 170 Q 250 170 290 130" className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M 200 200 Q 250 200 290 130" className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />

        <rect x="270" y="105" width="50" height="50" rx="4" className="fill-zinc-100 stroke-zinc-500 dark:fill-zinc-800 dark:stroke-zinc-500" strokeWidth="1" />
        <text x="295" y="128" textAnchor="middle" className="fill-zinc-700 text-[9px] font-semibold dark:fill-zinc-300">合波器</text>
        <text x="295" y="142" textAnchor="middle" className="fill-zinc-700 text-[8px] dark:fill-zinc-300">(MUX)</text>

        <rect x="330" y="115" width="220" height="30" rx="15" className="fill-zinc-200 stroke-zinc-500 dark:fill-zinc-700 dark:stroke-zinc-500" strokeWidth="1.5" />
        {wavelengths.map((w, i) => (
          <line
            key={i}
            x1="335"
            y1={120 + i * 4}
            x2="545"
            y2={120 + i * 4}
            stroke={w.color}
            strokeWidth="1.5"
          />
        ))}
        <text x="440" y="105" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">1 本の光ファイバー</text>
        <text x="440" y="160" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">何十色もの光が同時に走る</text>

        <rect x="555" y="105" width="50" height="50" rx="4" className="fill-zinc-100 stroke-zinc-500 dark:fill-zinc-800 dark:stroke-zinc-500" strokeWidth="1" />
        <text x="580" y="128" textAnchor="middle" className="fill-zinc-700 text-[9px] font-semibold dark:fill-zinc-300">分波器</text>
        <text x="580" y="142" textAnchor="middle" className="fill-zinc-700 text-[8px] dark:fill-zinc-300">(DEMUX)</text>

        {wavelengths.map((w, i) => (
          <g key={i}>
            <path d={`M 605 130 Q 625 130 650 ${50 + i * 30}`} className="fill-none stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="660" cy={50 + i * 30} r="6" fill={w.color} />
          </g>
        ))}
        <text x="660" y="20" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">出力 (色別に戻す)</text>

        <text x="350" y="240" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          色が違えば干渉しないので、1 本のガラス繊維に何十チャンネルもまとめて流せる
        </text>
      </svg>
    </div>
  );
}
