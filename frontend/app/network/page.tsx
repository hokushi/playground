export default function NetworkPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ネットワーク: 有線と無線
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          PC やスマホがインターネットに繋がる「最後の数メートル」の話。LAN ケーブルと Wi-Fi、何が違って何が同じなのかを整理します。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          先に結論
        </h2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            有線と無線は <strong>「物理的な運び方」が違うだけ</strong>。電気/光 か 電波 か
          </li>
          <li>
            その上に乗ってる <strong>IP / TCP / HTTP は全く同じ</strong>。Web ブラウザはどっちで繋がってるか気にしない
          </li>
          <li>
            速度・安定性・セキュリティは <strong>有線が基本的に有利</strong>。代わりにケーブルに縛られる
          </li>
          <li>
            無線は <strong>電波を「みんなで共有」</strong>している。混雑したカフェで Wi-Fi が遅くなるのはこのため
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ざっくり理解: ネットワーク = データの運び方
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ネットワークは、突き詰めると<strong>「離れた機械同士でデータを渡すこと」</strong>です。
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
              道が混まないので速くて安定。ただし<strong>道を引かないと届かない</strong>のでケーブルが必須。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              無線 ＝ 拡声器でみんなに叫ぶ
            </h3>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              空気中に電波として<strong>全方向に飛ばす</strong>。
              聞きたい人(対象機器)だけ拾う仕組み。ケーブル不要だけど<strong>みんなが叫ぶと聞き取りにくい</strong>。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          有線 (Wired)
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ケーブル ─ つまり <strong>銅線</strong> か <strong>光ファイバー</strong> ─ にデータを通します。
          銅線なら<strong>電気のパルス</strong>、光ファイバーなら<strong>光の点滅</strong>として「0 と 1」を運びます。
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

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            有線が強いところ
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/80 dark:text-emerald-300">
            <li>
              ・<strong>速い</strong>: 1 Gbps / 10 Gbps が普通。今は家庭でも 10G が出始め
            </li>
            <li>
              ・<strong>遅延が小さい</strong>: 信号が直線でケーブルを通るだけ。ゲームや音楽制作に有利
            </li>
            <li>
              ・<strong>安定</strong>: ケーブルが繋がってる限り途切れない。電波干渉なし
            </li>
            <li>
              ・<strong>盗聴しにくい</strong>: 物理的にケーブルに繋がないと無理
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          太平洋を渡る: 日米の海底ケーブル
        </h2>
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
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          実例: 米国サーバーから自分のブラウザに動画が届くまで
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          東京の自宅で <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">youtube.com</code> の動画を開いたとします。
          データはどうやって自分の PC まで来るのか、実際の経路を分解してみます。
        </p>

        <DataJourneyDiagram />

        <div className="flex flex-col gap-3">
          <JourneyStep
            num={1}
            title="DNS で住所を引く"
            desc="まずブラウザは「youtube.com の IP アドレスは?」と DNS サーバーに聞きます。これは住所録を引く作業。返ってくるのは例えば 142.250.196.110 のような数字。日本の DNS は近いキャッシュから即返してくれることが多く、ここは数ミリ秒で終わる。"
          />
          <JourneyStep
            num={2}
            title="自宅 → ISP のネットワーク"
            desc="PC → Wi-Fi/LAN → ルーター → ONU (光) → 電柱の光ケーブル → ISP の収容局。ここまではあなたの契約してる ISP (NTT、NURO、au など) のネットワーク内。"
          />
          <JourneyStep
            num={3}
            title="IX (インターネットエクスチェンジ) で他社網と繋がる"
            desc="ISP は東京の JPNAP / NSPIXP / Equinix Tokyo といった「相互接続点」で他社や Google/Meta などの大手と直接繋がっています。YouTube ならここで Google のネットワークに渡る可能性が高い。"
          />
          <JourneyStep
            num={4}
            title="陸揚げ局 (Cable Landing Station) へ"
            desc="国外サーバーに繋ぐ場合は、千葉県千倉/丸山や三重県志摩などの陸揚げ局へ。ここで陸の光ファイバーが海底ケーブルに繋ぎ変えられる。建物自体は海岸沿いの目立たない施設で、警備は厳重。"
          />
          <JourneyStep
            num={5}
            title="海底ケーブルで太平洋を横断 (約 8,000 km)"
            desc="光のパルスとして 50〜100 ミリ秒かけて太平洋の底を渡る。途中、約 80 km おきに「中継器(リピーター)」が海底に沈んでて信号を増幅。電源は陸から数千ボルトの直流をケーブルに流して供給。"
          />
          <JourneyStep
            num={6}
            title="米国西海岸の陸揚げ局に到着"
            desc="Bandon (Oregon)、Hermosa Beach (LA)、Pacific City (Oregon) など。ここから米国の陸上光ファイバー網に渡る。"
          />
          <JourneyStep
            num={7}
            title="米国 ISP / バックボーンを経由"
            desc="Google なら自社バックボーンに乗り、目的の YouTube データセンター (もしくは CDN エッジ) まで運ばれる。"
          />
          <JourneyStep
            num={8}
            title="サーバーが応答 → 同じ道を逆向きに戻る"
            desc="動画ファイルの中身が今度はアメリカ→日本へ流れてくる。実際には経路の選択は BGP というプロトコルで動的に決まっていて、往路と復路で完全に同じとは限らない。"
          />
        </div>

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
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          なぜ混ざらない? ─ 多重化とパケット交換
        </h2>
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

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よくある疑問
          </p>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Q. 別の人のパケットを盗み見できる?</strong>
              <br />
              A. 物理的にはルーターを経由するので、その経路上では「読もうと思えば読めるパケット」が流れている。だから <strong>HTTPS / TLS</strong> で<strong>暗号化</strong>している。中身は鍵を持ってる人(=自分のブラウザと相手のサーバー)以外には文字化けに見える。
            </li>
            <li>
              <strong>Q. 自分宛じゃないパケットが届くことは?</strong>
              <br />
              A. ルーターが宛先 IP を見て正しい方向にだけ送るので、基本届かない。家の Wi-Fi 内では物理的には全員に電波が届くが、宛先 MAC が違うとカーネルが捨てる。
            </li>
            <li>
              <strong>Q. パケットが混ざって順番がバラバラになることは?</strong>
              <br />
              A. <strong>ある</strong>。経路が違うと到着順が前後する。これは <strong>TCP</strong> が「シーケンス番号」で並べ直してくれる。だから上のアプリは順番を気にしなくていい。
            </li>
            <li>
              <strong>Q. パケットが消えることは?</strong>
              <br />
              A. <strong>ある</strong>。ルーターが混雑したら捨てられる。TCP は「届かなかった分を再送して」と頼める仕組みを持ってる。UDP は持ってないので、用途で使い分ける (ゲーム/音声は UDP が多い)。
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          まとめると、混ざらないのは <strong>「色で分けた」+「封筒で分けた」</strong>の二重構造のおかげ。
          1 本のファイバーが世界中の通信を運べるのはこの仕組みあってこそです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          無線 (Wireless)
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          電波 ── つまり<strong>空中を飛ぶ電磁波</strong> ── にデータを乗せます。
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

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            無線で気をつけること
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-amber-900/80 dark:text-amber-300">
            <li>
              ・<strong>共有資源</strong>: 同じ周波数を周りの機器と分け合う。混雑すると遅くなる
            </li>
            <li>
              ・<strong>障害物に弱い</strong>: 壁・金属・水(人体)で減衰する。電子レンジ(2.4 GHz)とも干渉する
            </li>
            <li>
              ・<strong>傍受されうる</strong>: 電波は空中に出てるので物理的には誰でも拾える。だから WPA2/WPA3 で<strong>暗号化</strong>する
            </li>
            <li>
              ・<strong>遅延がばらつく</strong>: 再送が起きやすく、瞬間的に詰まることがある
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          比較
        </h2>
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
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">最大速度</td>
                <td className="px-4 py-2">1 〜 10 Gbps が普通</td>
                <td className="px-4 py-2">理論値は速いが実測は半分以下になりがち</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">安定性</td>
                <td className="px-4 py-2">高い (物理接続)</td>
                <td className="px-4 py-2">距離/障害物で変動</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">遅延</td>
                <td className="px-4 py-2">小さく一定</td>
                <td className="px-4 py-2">大きく、ばらつきがある</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">配線</td>
                <td className="px-4 py-2">必要 (面倒)</td>
                <td className="px-4 py-2">不要 (自由)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">セキュリティ</td>
                <td className="px-4 py-2">物理アクセスが必要で強い</td>
                <td className="px-4 py-2">暗号化に依存 (WPA2/WPA3)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">向いてる用途</td>
                <td className="px-4 py-2">デスクトップ/サーバー/ゲーム/配信</td>
                <td className="px-4 py-2">スマホ/ノート PC/IoT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          実は「上の層」は同じ
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここがネットワークの面白いところ。<strong>有線も無線も、運び方が違うだけで、上に乗ってるルール(プロトコル)は同じ</strong>です。
          HTTP も TCP も IP も、ケーブルか電波かは気にしません。
          だから Wi-Fi で開いてた YouTube を LAN に挿し替えても止まらないし、Zoom もそのまま続きます。
        </p>

        <NetworkLayerDiagram />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          この「層が分かれてて、上の層は下の層の詳細を知らなくていい」という設計が <strong>OSI 参照モデル</strong> や
          <strong> TCP/IP モデル</strong> の核。ここは別ページで深掘りする価値があります。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          どっちを選ぶ?
        </h2>
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
          現実的には<strong>両方を併用</strong>します。家のルーターは光ファイバーで外と繋がっていて、
          そこから先は LAN ケーブルと Wi-Fi の両方を提供している ── というのが普通の構成です。
        </p>
      </section>
    </main>
  );
}

function PostalAnalogyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 220" className="mx-auto w-full max-w-2xl">
        <rect x="20" y="80" width="80" height="60" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="60" y="115" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">PC</text>

        <line x1="100" y1="100" x2="220" y2="100" className="stroke-emerald-500" strokeWidth="3" />
        <text x="160" y="92" textAnchor="middle" className="fill-emerald-700 text-[11px] font-medium dark:fill-emerald-400">有線ケーブル</text>
        <text x="160" y="118" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">電気/光の信号</text>

        <rect x="220" y="80" width="80" height="60" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="260" y="115" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">ルーター</text>

        <g>
          <path d="M 300 100 Q 360 60 420 70" className="fill-none stroke-amber-500" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M 300 100 Q 360 100 420 100" className="fill-none stroke-amber-500" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M 300 100 Q 360 140 420 130" className="fill-none stroke-amber-500" strokeWidth="2" strokeDasharray="4 3" />
        </g>
        <text x="360" y="170" textAnchor="middle" className="fill-amber-700 text-[11px] font-medium dark:fill-amber-400">無線 (電波)</text>
        <text x="360" y="185" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">空中を全方向へ</text>

        <rect x="420" y="40" width="80" height="40" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="460" y="65" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">スマホ</text>

        <rect x="420" y="85" width="80" height="40" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="460" y="110" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">ノート PC</text>

        <rect x="420" y="130" width="80" height="40" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="460" y="155" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">スマート家電</text>
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        ルーターを基準に、片側は <span className="text-emerald-700 dark:text-emerald-400">有線</span> で繋がり、もう片側は <span className="text-amber-700 dark:text-amber-400">無線</span> で繋がる
      </p>
    </div>
  );
}

function WirelessFrequencyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 160" className="mx-auto w-full max-w-2xl">
        <line x1="40" y1="100" x2="560" y2="100" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1" />

        <g>
          <circle cx="120" cy="100" r="6" className="fill-amber-500" />
          <text x="120" y="80" textAnchor="middle" className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200">2.4 GHz</text>
          <text x="120" y="125" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">遠くまで届く</text>
          <text x="120" y="138" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">混雑/遅い</text>
        </g>

        <g>
          <circle cx="280" cy="100" r="6" className="fill-amber-500" />
          <text x="280" y="80" textAnchor="middle" className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200">5 GHz</text>
          <text x="280" y="125" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">速い</text>
          <text x="280" y="138" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">壁に弱い</text>
        </g>

        <g>
          <circle cx="440" cy="100" r="6" className="fill-amber-500" />
          <text x="440" y="80" textAnchor="middle" className="fill-zinc-800 text-[11px] font-medium dark:fill-zinc-200">6 GHz</text>
          <text x="440" y="125" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">さらに速い</text>
          <text x="440" y="138" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">範囲がさらに狭い</text>
        </g>

        <text x="40" y="155" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">低周波数 (遠くまで届く)</text>
        <text x="560" y="155" textAnchor="end" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">高周波数 (速いが届きにくい)</text>
        <polygon points="555,97 565,100 555,103" className="fill-zinc-400 dark:fill-zinc-600" />
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        周波数が高いほど「速いが届きにくい」というトレードオフ。Wi-Fi はこの3帯を使い分ける
      </p>
    </div>
  );
}

function NetworkLayerDiagram() {
  const layers = [
    { name: "アプリケーション", example: "HTTP / WebSocket / SMTP", color: "bg-purple-100 border-purple-300 text-purple-900 dark:bg-purple-950/40 dark:border-purple-900 dark:text-purple-200" },
    { name: "トランスポート", example: "TCP / UDP", color: "bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-200" },
    { name: "ネットワーク", example: "IP", color: "bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200" },
    { name: "データリンク / 物理", example: "Ethernet / Wi-Fi ← ここが違う", color: "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-200" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-2">
        {layers.map((layer, i) => (
          <div key={layer.name} className={`rounded-md border px-4 py-3 ${layer.color}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{i + 1}. {layer.name}</span>
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

function JourneyStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
        {num}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h4>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{desc}</p>
      </div>
    </div>
  );
}
