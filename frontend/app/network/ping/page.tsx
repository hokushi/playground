export default function PingPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ping で疎通を確かめる
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「繋がらない」と言われたとき、最初に叩くコマンド。
          <strong>届くかどうか</strong>と<strong>どれくらい時間がかかるか</strong>の
          2 つだけを調べる、とても単純な道具です。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="what" num={1}>何をしているのか</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          やっていることは <strong>「もしもし」と声をかけて、返事が返ってくるか見る</strong>だけです。
          相手に <strong>Echo Request</strong> という短いパケットを送って、
          <strong>Echo Reply</strong> が返ってくるまでの時間を測ります。
        </p>

        <RoundTripDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              分かること
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>相手まで経路が通っているか</strong></li>
              <li>・<strong>往復にどれくらいかかるか</strong></li>
              <li>・途中でパケットが落ちていないか</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              分からないこと
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>アプリが動いているか</strong></li>
              <li>・<strong>ポートが開いているか</strong></li>
              <li>・HTTP が返ってくるか</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="try" num={2}>実際に試してみる</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          同じ Wi-Fi に繋がっている <strong>別の PC から、この Mac に ping を飛ばした</strong>記録です。
          インターネットを一切通らないので、<strong>ping の素の姿</strong>が見られます。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          準備 1: 相手の IP を調べる
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ping を受ける側 (今回は Mac) の <strong>Wi-Fi の IP アドレス</strong>を調べます。
        </p>
        <div className="overflow-x-auto rounded-lg bg-zinc-900 px-5 py-4">
          <pre className="font-mono text-[12px] leading-relaxed text-zinc-100">
{`$ ipconfig getifaddr en0
192.168.1.8`}
          </pre>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<span className="font-mono text-xs">en0</span> は
              <strong>Wi-Fi のインターフェース名</strong>。有線なら別の名前になる
              (<span className="font-mono text-xs">networksetup -listallhardwareports</span> で確認できる)
            </li>
            <li>
              ・<span className="font-mono text-xs">192.168.</span> で始まるのは
              <strong>家やオフィスの中だけで通じる住所</strong>。インターネット側からは見えない
            </li>
            <li>
              ・Windows 側なら <span className="font-mono text-xs">ipconfig</span> の
              「IPv4 アドレス」が同じもの
            </li>
          </ul>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          準備 2: 返事を返す設定になっているか確認する
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          macOS には <strong>「ステルスモード」</strong>という設定があり、
          これが有効だと <strong>ping に一切応答しなくなります</strong>。先に確認します。
        </p>
        <div className="overflow-x-auto rounded-lg bg-zinc-900 px-5 py-4">
          <pre className="font-mono text-[12px] leading-relaxed text-zinc-100">
{`$ defaults read /Library/Preferences/com.apple.alf globalstate
0                      # 0 = ファイアウォール オフ / 1 = オン / 2 = すべてブロック

$ /usr/libexec/ApplicationFirewall/socketfilterfw --getstealthmode
Stealth mode disabled  # 無効 = ping に応答する`}
          </pre>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900/90 dark:text-amber-300">
            ステルスモードが<strong>有効</strong>だと、Mac は元気に動いていても
            <strong>黙って無視します</strong>。
            <strong>Windows は既定でブロック</strong>する設定なので、
            逆向き (Mac → Windows) は最初から返ってこないことが多いです。
            <strong>「返ってこない = 落ちている」ではない</strong>のは、こういうことです。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          実行する
        </h3>
        <div className="overflow-x-auto rounded-lg bg-zinc-900 px-5 py-4">
          <pre className="font-mono text-[12px] leading-relaxed text-zinc-100">
{`PS C:\\Users\\user> ping -n 4 192.168.1.8

192.168.1.8 に ping を送信しています 32 バイトのデータ:
192.168.1.8 からの応答: バイト数 =32 時間 =95ms TTL=64
192.168.1.8 からの応答: バイト数 =32 時間 =104ms TTL=64
192.168.1.8 からの応答: バイト数 =32 時間 =115ms TTL=64
192.168.1.8 からの応答: バイト数 =32 時間 =3ms TTL=64

192.168.1.8 の ping 統計:
    パケット数: 送信 = 4、受信 = 4、損失 = 0 (0% の損失)、
ラウンド トリップの概算時間 (ミリ秒):
    最小 = 3ms、最大 = 115ms、平均 = 79ms`}
          </pre>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">見えているもの</th>
                <th className="px-3 py-2 text-left font-semibold">意味</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-mono text-xs">-n 4</td>
                <td className="px-3 py-2 text-xs">
                  4 回で止める。<strong>Mac / Linux は</strong>
                  <span className="font-mono"> -c 4</span>。付けないと Windows は 4 回、Mac は無限に続く
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">32 バイト</td>
                <td className="px-3 py-2 text-xs">
                  送ったデータ量。中身は意味のない詰め物。Mac は既定 56 バイトで、
                  <strong>OS が違うだけ</strong>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">TTL=64</td>
                <td className="px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
                  <strong>1 回も減っていない</strong>。ルータを通らず直接届いた証拠
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">損失 = 0</td>
                <td className="px-3 py-2 text-xs">4 発とも返ってきた。経路は健全</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">最小 3 / 最大 115</td>
                <td className="px-3 py-2 text-xs">
                  同じ相手でも回ごとに差が出る。無線では珍しくない
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ルータを越えた先にも届くのか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここまでは<strong>同じ Wi-Fi の中</strong>だけの話でした。
          ping は<strong>経路さえ通っていれば、ルータを何台越えた先にも届きます</strong>。
          むしろ、そちらが本来の使い方です。距離の違う 3 か所に飛ばして比べてみます。
        </p>

        <div className="overflow-x-auto rounded-lg bg-zinc-900 px-5 py-4">
          <pre className="font-mono text-[12px] leading-relaxed text-zinc-100">
{`# ① 自宅のルータ（すぐ隣）
$ ping -c 4 192.168.1.1
64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=3.082 ms
round-trip min/avg/max/stddev = 3.082/5.227/6.921/1.469 ms

# ② Google の DNS（インターネットの向こう）
$ ping -c 4 8.8.8.8
64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=8.313 ms
round-trip min/avg/max/stddev = 8.313/10.057/10.848/1.016 ms

# ③ 名前で指定する
$ ping -c 4 example.com
PING example.com (172.66.147.243): 56 data bytes
64 bytes from 172.66.147.243: icmp_seq=0 ttl=58 time=9.851 ms
round-trip min/avg/max/stddev = 7.884/9.949/11.248/1.295 ms`}
          </pre>
        </div>

        <HopDistanceDiagram />

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">宛先</th>
                <th className="px-3 py-2 text-left font-semibold">TTL</th>
                <th className="px-3 py-2 text-left font-semibold">初期値</th>
                <th className="px-3 py-2 text-left font-semibold">経由したルータ</th>
                <th className="px-3 py-2 text-left font-semibold">往復</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-mono text-xs">192.168.1.1</td>
                <td className="px-3 py-2 font-mono text-xs">64</td>
                <td className="px-3 py-2 font-mono text-xs">64</td>
                <td className="px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">0 台（直接）</td>
                <td className="px-3 py-2 text-xs">約 5 ms</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">8.8.8.8</td>
                <td className="px-3 py-2 font-mono text-xs">118</td>
                <td className="px-3 py-2 font-mono text-xs">128</td>
                <td className="px-3 py-2 text-xs">10 台</td>
                <td className="px-3 py-2 text-xs">約 10 ms</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">172.66.147.243</td>
                <td className="px-3 py-2 font-mono text-xs">58</td>
                <td className="px-3 py-2 font-mono text-xs">64</td>
                <td className="px-3 py-2 text-xs">6 台</td>
                <td className="px-3 py-2 text-xs">約 10 ms</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            台数と時間は比例しない
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            10 台越えた ② と 6 台の ③ が<strong>どちらも約 10 ms</strong>。
            <strong>ルータの数より、物理的な距離と回線の質</strong>が効きます。
            どちらも国内に近いサーバがあるので、この差になりました。
          </p>
        </div>

        <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 px-5 py-4 dark:border-amber-700 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            ただし「届いた = 使える」ではない
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            <span className="font-mono text-xs">8.8.8.8</span> は ping に応答しますが、
            <strong>ブラウザで開いても何も見られません</strong>。DNS 専用のサーバだからです。
            ping が確かめているのは <strong>「そこまでの道が通っているか」だけ</strong>で、
            <strong>その先にどんなサービスがあるかは一切見ていません</strong>。
          </p>
        </div>
      </section>

    </main>
  );
}

function RoundTripDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 250" className="mx-auto w-full max-w-2xl">
        <rect x="30" y="90" width="150" height="70" rx="10" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.8" />
        <text x="105" y="120" textAnchor="middle" className="fill-emerald-900 text-[12px] font-bold dark:fill-emerald-200">自分の PC</text>
        <text x="105" y="140" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">ping を叩いた側</text>

        <rect x="480" y="90" width="150" height="70" rx="10" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.8" />
        <text x="555" y="120" textAnchor="middle" className="fill-blue-900 text-[12px] font-bold dark:fill-blue-200">相手のサーバ</text>
        <text x="555" y="140" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">OS が自動で返事する</text>

        <path d="M 180 108 L 480 108" className="stroke-emerald-500" strokeWidth="2.5" markerEnd="url(#pingArrowGo)" />
        <text x="330" y="98" textAnchor="middle" className="fill-emerald-700 text-[10px] font-bold dark:fill-emerald-400">Echo Request</text>
        <text x="330" y="82" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">「もしもし、いますか?」</text>

        <path d="M 480 142 L 180 142" className="stroke-blue-500" strokeWidth="2.5" markerEnd="url(#pingArrowBack)" />
        <text x="330" y="160" textAnchor="middle" className="fill-blue-700 text-[10px] font-bold dark:fill-blue-400">Echo Reply</text>
        <text x="330" y="176" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">「はい、います」</text>

        <defs>
          <marker id="pingArrowGo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" className="fill-emerald-500" />
          </marker>
          <marker id="pingArrowBack" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" className="fill-blue-500" />
          </marker>
        </defs>

        <line x1="105" y1="196" x2="105" y2="216" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.4" />
        <line x1="105" y1="206" x2="330" y2="206" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="330" y="222" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          この往復にかかった時間が time=12.3 ms
        </text>

        <text x="330" y="244" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          片道ではなく往復。だから「相手が遠い」と素直に大きくなる
        </text>
      </svg>
    </div>
  );
}

function HopDistanceDiagram() {
  const tracks = [
    { y: 55, dots: 0, name: "自宅のルータ", addr: "192.168.1.1", ttl: "ttl=64 → 0 台", ms: "約 5 ms", tone: "near" },
    { y: 155, dots: 10, name: "Google の DNS", addr: "8.8.8.8", ttl: "ttl=118 → 10 台", ms: "約 10 ms", tone: "far" },
    { y: 255, dots: 6, name: "example.com", addr: "172.66.147.243", ttl: "ttl=58 → 6 台", ms: "約 10 ms", tone: "far" },
  ];
  const box = {
    near: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700",
    far: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700",
  } as const;
  const label = {
    near: "fill-emerald-900 dark:fill-emerald-200",
    far: "fill-blue-900 dark:fill-blue-200",
  } as const;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 320" className="mx-auto w-full">
        <rect x="14" y="120" width="96" height="70" rx="10" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.8" />
        <text x="62" y="150" textAnchor="middle" className="fill-zinc-700 text-[11px] font-bold dark:fill-zinc-300">自分の Mac</text>
        <text x="62" y="168" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">192.168.1.8</text>

        {tracks.map((t) => (
          <g key={t.addr}>
            <line x1="110" y1="155" x2="140" y2={t.y} className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />
            <line x1="140" y1={t.y} x2="500" y2={t.y} className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.8" />

            {t.dots === 0 ? (
              <text x="320" y={t.y - 12} textAnchor="middle" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">
                間に何もない（直接）
              </text>
            ) : (
              <text x="320" y={t.y - 16} textAnchor="middle" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">
                {`この間にルータが ${t.dots} 台`}
              </text>
            )}

            {Array.from({ length: t.dots }).map((_, i) => (
              <circle
                key={i}
                cx={165 + (i * 320) / Math.max(t.dots - 1, 1)}
                cy={t.y}
                r={6}
                className="fill-zinc-200 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
                strokeWidth="1.2"
              />
            ))}

            <rect x="500" y={t.y - 22} width="150" height="44" rx="8" className={box[t.tone as keyof typeof box]} strokeWidth="1.6" />
            <text x="575" y={t.y - 4} textAnchor="middle" className={`${label[t.tone as keyof typeof label]} text-[10px] font-bold`}>
              {t.name}
            </text>
            <text x="575" y={t.y + 12} textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">
              {t.addr}
            </text>

            <text x="575" y={t.y + 38} textAnchor="middle" className="fill-amber-700 text-[9px] font-bold dark:fill-amber-400">
              {t.ttl}
            </text>
            <text x="575" y={t.y + 52} textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
              {t.ms}
            </text>
          </g>
        ))}

        <text x="330" y="314" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          経路さえ通っていれば、何台越えた先でも届く。TTL の減り方でその台数が分かる
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
    { id: "what", num: 1, title: "何をしているのか" },
    { id: "try", num: 2, title: "実際に試してみる" },
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
