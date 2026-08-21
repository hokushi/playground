import Link from "next/link";

export default function NetworkPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ネットワーク: 有線と無線
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          家の中の「最後の数メートル」の話。LAN ケーブルと
          Wi-Fi、何が違って何が同じなのかを整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            有線と無線は <strong>「物理的な運び方」が違うだけ</strong>。電気/光
            か 電波 か
          </li>
          <li>
            その上に乗ってる <strong>IP / TCP / HTTP は全く同じ</strong>。Web
            ブラウザはどっちで繋がってるか気にしない
          </li>
          <li>
            速度・安定性・セキュリティは <strong>有線が基本的に有利</strong>
            。代わりにケーブルに縛られる
          </li>
          <li>
            無線は <strong>電波を「みんなで共有」</strong>
            している。混雑したカフェで Wi-Fi が遅くなるのはこのため
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="overview" num={2}>
          ざっくり理解: ネットワーク = データの運び方
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ネットワークは、突き詰めると
          <strong>「離れた機械同士でデータを渡すこと」</strong>です。
          手紙を届けるのに例えると分かりやすい。
        </p>

        <PostalAnalogyDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              有線 ＝ 専用の郵便配達車
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              ケーブルという <strong>自分専用の道</strong>で運ぶ。
              道が混まないので速くて安定。ただし
              <strong>道を引かないと届かない</strong>のでケーブルが必須。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              無線 ＝ 拡声器でみんなに叫ぶ
            </h3>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              空気中に電波として<strong>全方向に飛ばす</strong>。
              聞きたい人(対象機器)だけ拾う仕組み。ケーブル不要だけど
              <strong>みんなが叫ぶと聞き取りにくい</strong>。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="wired" num={3}>
          有線 (Wired)
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ケーブル ─ つまり <strong>銅線</strong> か{" "}
          <strong>光ファイバー</strong> ─ にデータを通します。 銅線なら
          <strong>電気のパルス</strong>、光ファイバーなら
          <strong>光の点滅</strong>として「0 と 1」を運びます。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              LAN ケーブル (Ethernet)
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・身近な RJ45 のカチッと挿すやつ</li>
              <li>・銅線 8 本(4 ペア)に電気信号を流す</li>
              <li>・Cat5e/Cat6/Cat6A など規格でスピードが違う</li>
              <li>・家庭/オフィスの主役</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              光ファイバー
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・髪の毛より細いガラス繊維</li>
              <li>・光を全反射させながら長距離運ぶ</li>
              <li>・電気より速くて減衰が少ない</li>
              <li>・家まで来てる「光回線」がこれ</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            ところで「bps」って何?
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>bps = bits per second</strong>、つまり
            <strong>「1 秒間に何ビット運べるか」</strong>を表す単位です。
            通信の速さはほぼ全てこの単位で表現されます。
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                ビット (bit) とは
              </p>
              <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-300">
                <strong>0 か 1</strong> のたった 1
                個分。コンピュータが扱う最小単位。 これを 8 個束ねたのが{" "}
                <strong>1 バイト (Byte)</strong>。
              </p>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                単位の接頭辞
              </p>
              <ul className="mt-1 flex flex-col gap-0.5 text-xs text-zinc-700 dark:text-zinc-300">
                <li>
                  ・<strong>K</strong>bps = 1,000 bps
                </li>
                <li>
                  ・<strong>M</strong>bps = 100 万 bps
                </li>
                <li>
                  ・<strong>G</strong>bps = 10 億 bps
                </li>
                <li>
                  ・<strong>T</strong>bps = 1 兆 bps
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
            <strong>注意</strong>: 小文字の <strong>b</strong>ps (bit)
            と大文字の <strong>B</strong>ps (Byte) は
            <strong>8 倍違います</strong>。 通信速度の表記はほぼ{" "}
            <strong>小文字 b</strong> (回線業者の「1
            Gbps」など)、ファイルサイズやダウンロード進捗は
            <strong>大文字 B</strong> (「150 MB/s」など) が多い。
          </div>

          <div className="mt-3 rounded-md border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              計算してみよう: 1 Gbps の回線で 1 GB のファイルは何秒?
            </p>
            <pre className="mt-2 overflow-x-auto rounded bg-zinc-50 p-3 font-mono text-[11px] leading-relaxed text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              {`Step 1. ファイルサイズをビットに換算する
   1 GB = 1 × 8 = 8 Gbit       (1 Byte = 8 bit なので ×8)

Step 2. ビット数 ÷ 回線速度 で秒数が出る
   8 Gbit ÷ 1 Gbps = 8 秒`}
            </pre>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">
                    回線速度
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">
                    1 GB のファイル DL (理論値)
                  </th>
                  <th className="px-3 py-2 text-left font-semibold">用途感</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">10 Mbps</td>
                  <td className="px-3 py-2">約 13 分</td>
                  <td className="px-3 py-2">古い ADSL / 弱い Wi-Fi</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">100 Mbps</td>
                  <td className="px-3 py-2">約 80 秒</td>
                  <td className="px-3 py-2">マンション標準</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">1 Gbps</td>
                  <td className="px-3 py-2">約 8 秒</td>
                  <td className="px-3 py-2">戸建光・現代の標準</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">10 Gbps</td>
                  <td className="px-3 py-2">約 0.8 秒</td>
                  <td className="px-3 py-2">上位プラン (NURO 等)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            ※ 1 GB = 8 Gbit で換算した理論値。実際はオーバーヘッドや経路の影響で
            6〜8 割程度に落ちます。
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            有線が強いところ
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/80 dark:text-emerald-300">
            <li>
              ・<strong>速い</strong>: 1 Gbps / 10 Gbps が普通。今は家庭でも 10G
              が出始め
            </li>
            <li>
              ・<strong>遅延が小さい</strong>:
              信号が直線でケーブルを通るだけ。ゲームや音楽制作に有利
            </li>
            <li>
              ・<strong>安定</strong>:
              ケーブルが繋がってる限り途切れない。電波干渉なし
            </li>
            <li>
              ・<strong>盗聴しにくい</strong>: 物理的にケーブルに繋がないと無理
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="wireless" num={4}>
          無線 (Wireless)
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          電波 ── つまり<strong>空中を飛ぶ電磁波</strong> ──
          にデータを乗せます。
          電波は光と同じ仲間で、ただ「目に見えない波長」になっただけ。
          周波数(2.4 GHz、5 GHz など)を変えると「色」を変えるようなものです。
        </p>

        <WirelessFrequencyDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Wi-Fi
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・室内向けの近距離無線</li>
              <li>・2.4 / 5 / 6 GHz 帯</li>
              <li>・到達距離: 数 m 〜 数十 m</li>
              <li>・規格: Wi-Fi 5 / 6 / 6E / 7</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              モバイル (4G / 5G)
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・基地局までの長距離無線</li>
              <li>・キャリア契約が必要</li>
              <li>・到達距離: 数百 m 〜 数 km</li>
              <li>・外でスマホが使えるのはこれ</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Bluetooth
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・超近距離 (~10 m)</li>
              <li>・低消費電力</li>
              <li>・イヤホン/キーボードなど周辺機器</li>
              <li>・インターネットには使わない</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よくある誤解: 「無線の方が自由だから速いのでは?」
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            実は<strong>逆</strong>です。<strong>有線(特に光ファイバー)の方が帯域が圧倒的に広い</strong>。
            ここで言う<strong>帯域 (bandwidth)</strong> とは<strong>「使える周波数の幅」</strong>のこと。
            広いほどたくさんビットを乗せられる ── というのは物理法則 (シャノンの定理) で決まっています。
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                光ファイバーの帯域
              </p>
              <p className="mt-1 text-xs text-emerald-900/80 dark:text-emerald-300">
                光の周波数(数百 <strong>THz</strong>)を使える。
                色を変えれば 80〜100 チャンネル同居可能。1 本で <strong>100 Tbps 超</strong> も商用化済み。
              </p>
            </div>
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                Wi-Fi の帯域
              </p>
              <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-300">
                法律で割り当てられた <strong>2.4 / 5 / 6 GHz</strong> 帯のごく一部のみ (合計 ~1 GHz)。
                さらに周囲の機器と<strong>共有</strong>するので実効はもっと狭い。
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-zinc-700 dark:text-zinc-300">
            帯域が狭いだけでなく、無線は<strong>共有・干渉・再送</strong>のロスも乗ります。
            同じ Wi-Fi に繋がる家族と分け合い、隣家の Wi-Fi や電子レンジと干渉し、エラーで再送 ── これらが積み重なって理論値の半分以下になるのが普通です。
          </p>

          <div className="mt-3 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">規格</th>
                  <th className="px-3 py-2 text-left font-semibold">理論最大</th>
                  <th className="px-3 py-2 text-left font-semibold">実測の体感</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">LAN ケーブル (Cat6A)</td>
                  <td className="px-3 py-2">10 Gbps</td>
                  <td className="px-3 py-2">ほぼ理論通り出る</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">光ファイバー (商用バックボーン)</td>
                  <td className="px-3 py-2">100 Tbps 超</td>
                  <td className="px-3 py-2">桁違いに余裕</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Wi-Fi 6</td>
                  <td className="px-3 py-2">~9.6 Gbps</td>
                  <td className="px-3 py-2">数百 Mbps 〜 2 Gbps</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Wi-Fi 7</td>
                  <td className="px-3 py-2">~46 Gbps</td>
                  <td className="px-3 py-2">出始め、まだ理論値は遠い</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">4G LTE</td>
                  <td className="px-3 py-2">~150 Mbps</td>
                  <td className="px-3 py-2">数十 Mbps</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">5G</td>
                  <td className="px-3 py-2">数 Gbps</td>
                  <td className="px-3 py-2">場所による</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-zinc-700 dark:text-zinc-300">
            つまり「大容量を高速に流す」用途 (データセンター間、海底ケーブル、配信元のサーバー) は<strong>必ず有線</strong>。
            無線は「自由に動ける」「配線できない場所」が価値で、速度では基本的に有線に勝てません。
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            無線で気をつけること
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-amber-900/80 dark:text-amber-300">
            <li>
              ・<strong>共有資源</strong>:
              同じ周波数を周りの機器と分け合う。混雑すると遅くなる
            </li>
            <li>
              ・<strong>障害物に弱い</strong>:
              壁・金属・水(人体)で減衰する。電子レンジ(2.4 GHz)とも干渉する
            </li>
            <li>
              ・<strong>傍受されうる</strong>:
              電波は空中に出てるので物理的には誰でも拾える。だから WPA2/WPA3 で
              <strong>暗号化</strong>する
            </li>
            <li>
              ・<strong>遅延がばらつく</strong>:
              再送が起きやすく、瞬間的に詰まることがある
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="compare" num={5}>
          比較
        </SectionH2>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">観点</th>
                <th className="px-4 py-2 text-left font-semibold">有線</th>
                <th className="px-4 py-2 text-left font-semibold">無線</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  最大速度
                </td>
                <td className="px-4 py-2">1 〜 10 Gbps が普通</td>
                <td className="px-4 py-2">
                  理論値は速いが実測は半分以下になりがち
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  安定性
                </td>
                <td className="px-4 py-2">高い (物理接続)</td>
                <td className="px-4 py-2">距離/障害物で変動</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  遅延
                </td>
                <td className="px-4 py-2">小さく一定</td>
                <td className="px-4 py-2">大きく、ばらつきがある</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  配線
                </td>
                <td className="px-4 py-2">必要 (面倒)</td>
                <td className="px-4 py-2">不要 (自由)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  セキュリティ
                </td>
                <td className="px-4 py-2">物理アクセスが必要で強い</td>
                <td className="px-4 py-2">暗号化に依存 (WPA2/WPA3)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  向いてる用途
                </td>
                <td className="px-4 py-2">デスクトップ/サーバー/ゲーム/配信</td>
                <td className="px-4 py-2">スマホ/ノート PC/IoT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            帯域は両方にある。違いは「専有」か「共有」か
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            <strong>有線はケーブル 1 本がその機器の専用</strong>です。
            1Gbps のポートに挿した PC は、隣の PC が何をしていても 1Gbps を使えます。
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            <strong>無線は電波という 1 つの場所を全員で分け合います</strong>。
            同じアクセスポイントに 10 人ぶら下がれば、1 人あたりはその分だけ細くなります。
            「昼休みだけ遅い」が起きるのはこのためです。
          </p>
          <SharedVsDedicatedDiagram />
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            有線の速度は「ケーブル」と「両端のポート」で決まる
          </p>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            どちらか一方ではありません。
            <strong>3 つのうち、いちばん遅いものに合わせて</strong>自動的に決まります
            (電源を入れたときに両端の機器が「お互い何が出せるか」を相談する ──
            <strong>オートネゴシエーション</strong>と呼びます)。
          </p>

          <LinkSpeedDiagram />

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">
            ケーブル側の規格
          </p>
          <div className="mt-2 overflow-hidden rounded-md border border-blue-200 dark:border-blue-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold">種類</th>
                  <th className="px-2 py-1.5 text-left font-semibold">速度</th>
                  <th className="px-2 py-1.5 text-left font-semibold">備考</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 bg-white text-blue-900/90 dark:divide-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
                <tr>
                  <td className="px-2 py-1.5 font-mono">Cat5</td>
                  <td className="px-2 py-1.5">100Mbps</td>
                  <td className="px-2 py-1.5">古い。これが混ざっていると 100 で頭打ちになる</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono font-semibold">Cat5e</td>
                  <td className="px-2 py-1.5 font-semibold">1Gbps</td>
                  <td className="px-2 py-1.5">いま一番よく使われている</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">Cat6</td>
                  <td className="px-2 py-1.5">1Gbps</td>
                  <td className="px-2 py-1.5">10Gbps は 55m まで</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">Cat6A</td>
                  <td className="px-2 py-1.5">10Gbps</td>
                  <td className="px-2 py-1.5">100m まで。10G を引くならこれ以上</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-blue-900/70 dark:text-blue-400">
            見た目はほぼ同じなので、<strong>ケーブルの側面の印字</strong>
            (<span className="font-mono">CAT5E</span> など) を見るしかありません。
          </p>

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">
            機器のポート側の規格
          </p>
          <ul className="mt-1 flex flex-col gap-1 text-sm text-blue-900/80 dark:text-blue-300">
            <li>
              ・<strong>100BASE-TX</strong> … 100Mbps まで
            </li>
            <li>
              ・<strong>1000BASE-T</strong> … 1Gbps まで (いまの標準)
            </li>
            <li>
              ・<strong>10GBASE-T</strong> … 10Gbps まで
            </li>
          </ul>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            安いハブや古い機器は 100BASE-TX のことがあり、
            その場合は <strong>Cat6 を挿しても 100Mbps</strong> です。
          </p>

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">
            「1 台だけ妙に遅い」の定番原因
          </p>
          <p className="mt-1 text-sm text-blue-900/80 dark:text-blue-300">
            <strong>その席だけ古い Cat5 が使われている</strong>ケースです。
            壁の中の配線は更新されないまま残りがちなので、
            机の下のケーブルを新しくしても改善しません。確認はここを見ます。
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-blue-900/80 dark:text-blue-300">
            <li>
              ・<strong>Windows</strong>: 設定 → ネットワーク → イーサネット の
              <strong>「リンク速度」</strong>
            </li>
            <li>
              ・<strong>スイッチ側</strong>:{" "}
              <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-blue-950/50">
                show interface status
              </code>{" "}
              で <span className="font-mono">a-100</span> /{" "}
              <span className="font-mono">a-1000</span> と表示される
            </li>
          </ul>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            ここが <strong>100</strong> になっていれば、
            <strong>ケーブルか、どちらかのポートが 100Mbps 止まり</strong>ということです。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            速度を決めるのは「いちばん細いところ」
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            経路の途中に 1 か所でも細い区間があれば、そこが上限になります。
            院内をいくら速くしても、外に出る回線が細ければ体感は変わりません。
          </p>
          <BottleneckDiagram />
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            なので「動画が遅い」ときに<strong>まず疑うべきは院内の配線ではなく、外向きの回線と無線</strong>です。
            有線区間はたいてい十分に太く、犯人であることは多くありません。
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            家庭の場合: ブロードバンドルーターが全部やっている
          </p>
          <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
            会社では <strong>ファイアウォール・L3 スイッチ・L2 スイッチ・無線 AP</strong> と
            別々の箱に分かれている役割が、家庭では
            <strong>ブロードバンドルーター (Wi-Fi ルーター) 1 台に全部入っています</strong>。
            やっていることは同じです。
          </p>

          <HomeNetworkDiagram />

        </div>

      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="layers" num={6}>
          実は「上の層」は同じ
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここがネットワークの面白いところ。
          <strong>
            有線も無線も、運び方が違うだけで、上に乗ってるルール(プロトコル)は同じ
          </strong>
          です。 HTTP も TCP も IP も、ケーブルか電波かは気にしません。 だから
          Wi-Fi で開いてた YouTube を LAN に挿し替えても止まらないし、Zoom
          もそのまま続きます。
        </p>

        <NetworkLayerDiagram />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          この「層が分かれてて、上の層は下の層の詳細を知らなくていい」という設計が{" "}
          <strong>OSI 参照モデル</strong> や<strong> TCP/IP モデル</strong>{" "}
          の核。ここは別ページで深掘りする価値があります。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="choose" num={7}>
          どっちを選ぶ?
        </SectionH2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              有線が向くケース
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/80 dark:text-emerald-300">
              <li>・オンラインゲーム / 配信</li>
              <li>・大きいファイルのアップロード</li>
              <li>・自宅サーバー / NAS</li>
              <li>・移動しないデスクトップ PC</li>
              <li>・会議中の安定性が大事な時</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              無線が向くケース
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-amber-900/80 dark:text-amber-300">
              <li>・スマホ / タブレット</li>
              <li>・カフェなど移動先での作業</li>
              <li>・IoT (スマート家電/センサー)</li>
              <li>・配線できない場所</li>
              <li>・とりあえず繋ぎたい時</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          現実的には<strong>両方を併用</strong>
          します。家のルーターは光ファイバーで外と繋がっていて、 そこから先は
          LAN ケーブルと Wi-Fi の両方を提供している ──
          というのが普通の構成です。
        </p>
      </section>

      <Link
        href="/network/internet"
        className="group flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-6 py-5 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            次のページ
          </p>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            インターネットの裏側
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            家から先、海底ケーブルを渡って地球の反対側まで届く仕組み。
          </p>
        </div>
        <span className="text-2xl text-zinc-400 transition-transform group-hover:translate-x-1 dark:text-zinc-600">
          →
        </span>
      </Link>
    </main>
  );
}

function PostalAnalogyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 220" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="80"
          width="80"
          height="60"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="60"
          y="115"
          textAnchor="middle"
          className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300"
        >
          PC
        </text>

        <line
          x1="100"
          y1="100"
          x2="220"
          y2="100"
          className="stroke-emerald-500"
          strokeWidth="3"
        />
        <text
          x="160"
          y="92"
          textAnchor="middle"
          className="fill-emerald-700 text-[11px] font-medium dark:fill-emerald-400"
        >
          有線ケーブル
        </text>
        <text
          x="160"
          y="118"
          textAnchor="middle"
          className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
        >
          電気/光の信号
        </text>

        <rect
          x="220"
          y="80"
          width="80"
          height="60"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="260"
          y="115"
          textAnchor="middle"
          className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300"
        >
          ルーター
        </text>

        <g>
          <path
            d="M 300 100 Q 360 60 420 70"
            className="fill-none stroke-amber-500"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path
            d="M 300 100 Q 360 100 420 100"
            className="fill-none stroke-amber-500"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <path
            d="M 300 100 Q 360 140 420 130"
            className="fill-none stroke-amber-500"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        </g>
        <text
          x="360"
          y="170"
          textAnchor="middle"
          className="fill-amber-700 text-[11px] font-medium dark:fill-amber-400"
        >
          無線 (電波)
        </text>
        <text
          x="360"
          y="185"
          textAnchor="middle"
          className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
        >
          空中を全方向へ
        </text>

        <rect
          x="420"
          y="40"
          width="80"
          height="40"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="460"
          y="65"
          textAnchor="middle"
          className="fill-zinc-700 text-[11px] dark:fill-zinc-300"
        >
          スマホ
        </text>

        <rect
          x="420"
          y="85"
          width="80"
          height="40"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="460"
          y="110"
          textAnchor="middle"
          className="fill-zinc-700 text-[11px] dark:fill-zinc-300"
        >
          ノート PC
        </text>

        <rect
          x="420"
          y="130"
          width="80"
          height="40"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="460"
          y="155"
          textAnchor="middle"
          className="fill-zinc-700 text-[11px] dark:fill-zinc-300"
        >
          スマート家電
        </text>
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        ルーターを基準に、片側は{" "}
        <span className="text-emerald-700 dark:text-emerald-400">有線</span>{" "}
        で繋がり、もう片側は{" "}
        <span className="text-amber-700 dark:text-amber-400">無線</span>{" "}
        で繋がる
      </p>
    </div>
  );
}

function WirelessFrequencyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 160" className="mx-auto w-full max-w-2xl">
        <line
          x1="40"
          y1="100"
          x2="560"
          y2="100"
          className="stroke-zinc-400 dark:stroke-zinc-600"
          strokeWidth="1"
        />

        <g>
          <circle cx="120" cy="100" r="6" className="fill-amber-500" />
          <text
            x="120"
            y="80"
            textAnchor="middle"
            className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200"
          >
            2.4 GHz
          </text>
          <text
            x="120"
            y="125"
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
          >
            遠くまで届く
          </text>
          <text
            x="120"
            y="138"
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
          >
            混雑/遅い
          </text>
        </g>

        <g>
          <circle cx="280" cy="100" r="6" className="fill-amber-500" />
          <text
            x="280"
            y="80"
            textAnchor="middle"
            className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200"
          >
            5 GHz
          </text>
          <text
            x="280"
            y="125"
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
          >
            速い
          </text>
          <text
            x="280"
            y="138"
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
          >
            壁に弱い
          </text>
        </g>

        <g>
          <circle cx="440" cy="100" r="6" className="fill-amber-500" />
          <text
            x="440"
            y="80"
            textAnchor="middle"
            className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200"
          >
            6 GHz
          </text>
          <text
            x="440"
            y="125"
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
          >
            さらに速い
          </text>
          <text
            x="440"
            y="138"
            textAnchor="middle"
            className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
          >
            範囲がさらに狭い
          </text>
        </g>

        <text
          x="40"
          y="155"
          className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
        >
          低周波数 (遠くまで届く)
        </text>
        <text
          x="560"
          y="155"
          textAnchor="end"
          className="fill-zinc-500 text-[10px] dark:fill-zinc-500"
        >
          高周波数 (速いが届きにくい)
        </text>
        <polygon
          points="555,97 565,100 555,103"
          className="fill-zinc-400 dark:fill-zinc-600"
        />
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        周波数が高いほど「速いが届きにくい」というトレードオフ。Wi-Fi
        はこの3帯を使い分ける
      </p>
    </div>
  );
}

function NetworkLayerDiagram() {
  const layers = [
    {
      name: "アプリケーション",
      example: "HTTP / WebSocket / SMTP",
      color:
        "bg-purple-100 border-purple-300 text-purple-900 dark:bg-purple-950/40 dark:border-purple-900 dark:text-purple-200",
    },
    {
      name: "トランスポート",
      example: "TCP / UDP",
      color:
        "bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-200",
    },
    {
      name: "ネットワーク",
      example: "IP",
      color:
        "bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200",
    },
    {
      name: "データリンク / 物理",
      example: "Ethernet / Wi-Fi ← ここが違う",
      color:
        "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-200",
    },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-2">
        {layers.map((layer, i) => (
          <div
            key={layer.name}
            className={`rounded-md border px-4 py-3 ${layer.color}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">
                {i + 1}. {layer.name}
              </span>
              <span className="text-xs opacity-80">{layer.example}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        差は一番下だけ。上の3層は有線でも無線でも同じものが動いている
      </p>
    </div>
  );
}

function SharedVsDedicatedDiagram() {
  return (
    <div className="mt-3 rounded-md border border-emerald-200 bg-white p-4 dark:border-emerald-800 dark:bg-zinc-950">
      <svg viewBox="0 0 560 190" className="mx-auto w-full max-w-xl">
        <text x="140" y="18" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          有線 = 1 台に 1 本ずつ
        </text>
        <g className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.2">
          <rect x="20" y="36" width="60" height="26" rx="4" />
          <rect x="20" y="76" width="60" height="26" rx="4" />
          <rect x="20" y="116" width="60" height="26" rx="4" />
        </g>
        <g className="fill-zinc-700 text-[10px] dark:fill-zinc-300" textAnchor="middle">
          <text x="50" y="53">PC</text>
          <text x="50" y="93">PC</text>
          <text x="50" y="133">PC</text>
        </g>
        <line x1="82" y1="49" x2="196" y2="72" className="stroke-emerald-500" strokeWidth="3" />
        <line x1="82" y1="89" x2="196" y2="89" className="stroke-emerald-500" strokeWidth="3" />
        <line x1="82" y1="129" x2="196" y2="106" className="stroke-emerald-500" strokeWidth="3" />
        <rect x="198" y="62" width="70" height="54" rx="5" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="233" y="94" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          スイッチ
        </text>
        <text x="140" y="166" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          それぞれ 1Gbps を専有
        </text>

        <line x1="290" y1="20" x2="290" y2="175" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="425" y="18" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          無線 = 全員で 1 本を分け合う
        </text>
        <g className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.2">
          <rect x="320" y="36" width="60" height="26" rx="4" />
          <rect x="320" y="76" width="60" height="26" rx="4" />
          <rect x="320" y="116" width="60" height="26" rx="4" />
        </g>
        <g className="fill-zinc-700 text-[10px] dark:fill-zinc-300" textAnchor="middle">
          <text x="350" y="53">PC</text>
          <text x="350" y="93">PC</text>
          <text x="350" y="133">PC</text>
        </g>
        <line x1="382" y1="49" x2="452" y2="82" className="stroke-sky-400" strokeWidth="1.4" strokeDasharray="4 3" />
        <line x1="382" y1="89" x2="452" y2="89" className="stroke-sky-400" strokeWidth="1.4" strokeDasharray="4 3" />
        <line x1="382" y1="129" x2="452" y2="96" className="stroke-sky-400" strokeWidth="1.4" strokeDasharray="4 3" />
        <rect x="455" y="62" width="70" height="54" rx="5" className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/30 dark:stroke-sky-700" strokeWidth="1.3" />
        <text x="490" y="88" textAnchor="middle" className="fill-sky-900 text-[10px] font-semibold dark:fill-sky-200">
          AP
        </text>
        <text x="490" y="103" textAnchor="middle" className="fill-sky-700 text-[9px] dark:fill-sky-400">
          電波 1 本ぶん
        </text>
        <text x="425" y="166" textAnchor="middle" className="fill-sky-700 text-[10px] font-semibold dark:fill-sky-400">
          人数で割り算になる
        </text>
      </svg>
    </div>
  );
}

function BottleneckDiagram() {
  return (
    <div className="mt-3 rounded-md border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 560 130" className="mx-auto w-full max-w-xl">
        <g className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.2">
          <rect x="14" y="40" width="66" height="30" rx="5" />
          <rect x="130" y="40" width="76" height="30" rx="5" />
          <rect x="256" y="40" width="66" height="30" rx="5" />
        </g>
        <g className="fill-zinc-700 text-[10px] dark:fill-zinc-300" textAnchor="middle">
          <text x="47" y="60">PC</text>
          <text x="168" y="60">スイッチ</text>
          <text x="289" y="60">FW</text>
        </g>
        <line x1="82" y1="55" x2="128" y2="55" className="stroke-emerald-500" strokeWidth="6" />
        <line x1="208" y1="55" x2="254" y2="55" className="stroke-emerald-500" strokeWidth="6" />
        <text x="105" y="42" textAnchor="middle" className="fill-emerald-700 font-mono text-[9px] dark:fill-emerald-400">
          1Gbps
        </text>
        <text x="231" y="42" textAnchor="middle" className="fill-emerald-700 font-mono text-[9px] dark:fill-emerald-400">
          1Gbps
        </text>

        <line x1="324" y1="55" x2="430" y2="55" className="stroke-rose-500" strokeWidth="1.6" />
        <text x="377" y="42" textAnchor="middle" className="fill-rose-700 font-mono text-[10px] font-semibold dark:fill-rose-400">
          10Mbps
        </text>
        <text x="377" y="80" textAnchor="middle" className="fill-rose-600 text-[9px] font-semibold dark:fill-rose-400">
          ここが上限を決める
        </text>

        <rect x="432" y="40" width="112" height="30" rx="5" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.2" />
        <text x="488" y="60" textAnchor="middle" className="fill-amber-900 text-[10px] dark:fill-amber-200">
          インターネット
        </text>

        <text x="280" y="116" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          院内をどれだけ太くしても、外向きが細ければ体感は変わらない
        </text>
      </svg>
    </div>
  );
}

function LinkSpeedDiagram() {
  return (
    <div className="mt-3 rounded-md border border-blue-200 bg-white p-4 dark:border-blue-800 dark:bg-zinc-950">
      <svg viewBox="0 0 560 160" className="mx-auto w-full max-w-xl">
        <rect x="20" y="40" width="120" height="44" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="80" y="60" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          PC のポート
        </text>
        <text x="80" y="75" textAnchor="middle" className="fill-emerald-700 font-mono text-[10px] dark:fill-emerald-400">
          1Gbps 対応
        </text>

        <line x1="142" y1="62" x2="278" y2="62" className="stroke-rose-500" strokeWidth="2" />
        <rect x="170" y="14" width="120" height="40" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.4" />
        <text x="230" y="31" textAnchor="middle" className="fill-rose-900 text-[10px] font-semibold dark:fill-rose-200">
          ケーブル Cat5
        </text>
        <text x="230" y="45" textAnchor="middle" className="fill-rose-700 font-mono text-[10px] dark:fill-rose-400">
          100Mbps まで
        </text>
        <line x1="230" y1="54" x2="230" y2="60" className="stroke-rose-400" strokeWidth="1.2" />

        <rect x="280" y="40" width="130" height="44" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="345" y="60" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          スイッチのポート
        </text>
        <text x="345" y="75" textAnchor="middle" className="fill-emerald-700 font-mono text-[10px] dark:fill-emerald-400">
          1Gbps 対応
        </text>

        <line x1="412" y1="62" x2="440" y2="62" className="stroke-zinc-400" strokeWidth="1.5" />
        <rect x="442" y="40" width="106" height="44" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.4" />
        <text x="495" y="60" textAnchor="middle" className="fill-rose-900 text-[10px] font-semibold dark:fill-rose-200">
          実際の速度
        </text>
        <text x="495" y="75" textAnchor="middle" className="fill-rose-700 font-mono text-[11px] font-semibold dark:fill-rose-300">
          100Mbps
        </text>

        <text x="280" y="118" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          両端が 1Gbps 対応でも、ケーブルが Cat5 なら 100Mbps になる
        </text>
        <text x="280" y="136" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-400">
          3 つのうち、いちばん遅いものに合わせて自動で決まる
        </text>
      </svg>
    </div>
  );
}

function HomeNetworkDiagram() {
  return (
    <div className="mt-3 rounded-md border border-amber-200 bg-white p-4 dark:border-amber-800 dark:bg-zinc-950">
      <svg viewBox="0 0 560 190" className="mx-auto w-full max-w-xl">
        <rect x="14" y="86" width="86" height="40" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/40 dark:stroke-amber-700" strokeWidth="1.3" />
        <text x="57" y="111" textAnchor="middle" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-200">
          インターネット
        </text>

        <line x1="102" y1="106" x2="146" y2="106" className="stroke-zinc-500" strokeWidth="2" />
        <text x="124" y="82" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">
          光 1Gbps
        </text>
        <text x="124" y="130" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">
          ベストエフォート
        </text>

        <rect x="148" y="86" width="70" height="40" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="183" y="111" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          ONU
        </text>

        <line x1="220" y1="106" x2="262" y2="106" className="stroke-zinc-500" strokeWidth="2" />
        <text x="241" y="98" textAnchor="middle" className="fill-rose-600 text-[8px] dark:fill-rose-400">
          Cat5 だと
        </text>
        <text x="241" y="124" textAnchor="middle" className="fill-rose-600 text-[8px] dark:fill-rose-400">
          100M 止まり
        </text>

        <rect x="264" y="76" width="140" height="60" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="334" y="100" textAnchor="middle" className="fill-zinc-50 text-[11px] font-semibold dark:fill-zinc-900">
          ブロードバンドルーター
        </text>
        <text x="334" y="118" textAnchor="middle" className="fill-zinc-300 text-[9px] dark:fill-zinc-600">
          (家庭にあるルーター)
        </text>

        <line x1="406" y1="92" x2="446" y2="66" className="stroke-emerald-500" strokeWidth="2.5" />
        <rect x="448" y="46" width="100" height="40" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.3" />
        <text x="498" y="63" textAnchor="middle" className="fill-emerald-900 text-[10px] font-semibold dark:fill-emerald-200">
          有線の PC
        </text>
        <text x="498" y="77" textAnchor="middle" className="fill-emerald-700 font-mono text-[8px] dark:fill-emerald-400">
          LAN ポート次第
        </text>

        <line x1="406" y1="122" x2="446" y2="152" className="stroke-sky-400" strokeWidth="1.6" strokeDasharray="4 3" />
        <rect x="448" y="134" width="100" height="40" rx="6" className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/30 dark:stroke-sky-700" strokeWidth="1.3" />
        <text x="498" y="151" textAnchor="middle" className="fill-sky-900 text-[10px] font-semibold dark:fill-sky-200">
          スマホ・TV
        </text>
        <text x="498" y="165" textAnchor="middle" className="fill-sky-700 font-mono text-[8px] dark:fill-sky-400">
          Wi-Fi の規格次第
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
    { id: "overview", num: 2, title: "ざっくり理解" },
    { id: "wired", num: 3, title: "有線" },
    { id: "wireless", num: 4, title: "無線" },
    { id: "compare", num: 5, title: "比較" },
    { id: "layers", num: 6, title: "上の層は同じ" },
    { id: "choose", num: 7, title: "どっちを選ぶ?" },
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
