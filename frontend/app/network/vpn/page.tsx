export default function VpnPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          VPN の種類 (IP-VPN / インターネット VPN / 広域イーサ)
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「VPN」と一口に言っても、実は <strong>用途・経路・値段が全然違う 3〜4 種類</strong>があります。
          KDDI の IP-VPN がよく知られていますが、他にも何があって、何が違うのかを整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="basics" num={1}>そもそも VPN って何?</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>VPN = Virtual Private Network</strong> = <strong>仮想的な専用線</strong>。
          物理的には別の場所にあるネットワーク (本社と支社、本社と自宅 PC、本社と AWS など) を、
          <strong>あたかも 1 つの社内 LAN みたいに繋ぐ</strong>仕組みです。
        </p>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            なぜ「Virtual (仮想)」?
          </p>
          <p className="mt-2 text-sm text-emerald-900/90 dark:text-emerald-300">
            本物の <strong>専用線 (= ケーブル 1 本を貸し切る)</strong> は <strong>物理的に占有</strong>するため
            高い・遅い・遠距離は無理。VPN は <strong>すでにある道 (インターネットや閉域網)</strong> を
            <strong>論理的に「自分専用エリア」として切り分けて</strong>使うので、
            「専用線っぽいけど物理的には専用じゃない」= 仮想専用、と呼ぶわけです。
          </p>
        </div>

        <VirtualLineDiagram />
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="path" num={2}>拠点間のデータは、実際どこを通るのか</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          種類の話に入る前に、<strong>そもそも東京と大阪の間をデータがどう運ばれているのか</strong>を
          見ておきます。ここが分かると、3 タイプの違いが
          <strong>「どの道を使うか」の違いでしかない</strong>と分かります。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          公共インターネットを使う場合
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          自社のルータを出た瞬間から、<strong>他社の設備を渡り歩く旅</strong>が始まります。
        </p>

        <PublicInternetPathDiagram />

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              経路は毎回同じとは限らない
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              混雑や障害があると<strong>別のルートに切り替わります</strong>。
              誰も「この道を通る」と決めていないので、
              <strong>遅延が日によってブレる</strong>のはこのため。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              途中の機器は全部他社のもの
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              自社が管理しているのは<strong>最初と最後のルータだけ</strong>。
              間の機器が何をしているかは分かりません。
              <strong>だから暗号化が要る</strong>。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              誰も品質を約束していない
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              間に何社も挟まるので、遅いときに
              <strong>「どこが悪いのか」を誰も特定できません</strong>。
              問い合わせ先すら存在しない。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            自分の PC からでも確認できます。
            <span className="font-mono text-xs"> tracert google.com </span>
            (Mac / Linux は <span className="font-mono text-xs">traceroute</span>) を叩くと、
            <strong>実際に経由している機器が 1 台ずつ表示されます</strong>。
            知らない会社の名前がずらっと並ぶはずです。
          </p>
        </div>

      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="internet-vpn" num={3}>① インターネット VPN</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          3 タイプのうち、いちばん安くて手軽なのがこれです。
          <strong>道は 2 節で見た公共インターネットとまったく同じ</strong>。
          知らない会社のルータを何十台も経由します。
          変えているのは <strong>「中身の運び方」だけ</strong>です。
        </p>

        <InternetVpnPathDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            仕事をしているのは <strong>両端のルータ 2 台だけ</strong>です。
            送る側が<strong>出る直前に暗号化して包み</strong>、
            受け取る側が<strong>入った直後に開けて元に戻す</strong>。
            途中の機器は、いつもどおり
            <strong>「宛先を見て次に渡す」</strong>ことしかしていません。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          パケットの中身はどう変わるのか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          「暗号化する」だけでは足りません。
          <strong>元の宛先 (社内 IP) はインターネットでは使えない</strong>ので、
          <strong>丸ごと包んで、外側に新しい宛先を貼り直します</strong>。
          これをカプセル化と呼びます。
        </p>

        <PacketEncapsulationDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              途中のルータに見えるもの
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>外側の宛先だけ</strong>。
              「東京の A 社のルータから、大阪の A 社のルータ宛の荷物だな」までは分かります。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              見えないもの
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>中身も、本当の宛先も</strong>。
              社内のどの端末宛か、何のデータかは、鍵がなければ読めません。
            </p>
          </div>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          代表的なやり方
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">プロトコル</th>
                <th className="px-3 py-2 text-left font-semibold">用途</th>
                <th className="px-3 py-2 text-left font-semibold">特徴</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">IPsec</td>
                <td className="px-3 py-2 text-xs">拠点間 (本社 ⇔ 支社、AWS ⇔ 本社)</td>
                <td className="px-3 py-2 text-xs">ルータ同士で常時繋ぎっぱなし。上の図はこれ</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">SSL-VPN</td>
                <td className="px-3 py-2 text-xs">個人 → 社内 (リモートワーク)</td>
                <td className="px-3 py-2 text-xs">PC から都度接続。FortiGate などで提供</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">WireGuard</td>
                <td className="px-3 py-2 text-xs">拠点間 / 個人どちらも</td>
                <td className="px-3 py-2 text-xs">新しい世代。設定が単純で速い</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">OpenVPN</td>
                <td className="px-3 py-2 text-xs">個人 / 中小企業</td>
                <td className="px-3 py-2 text-xs">無料の OSS 実装が広く使われている</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Tailscale</td>
                <td className="px-3 py-2 text-xs">個人 / 小規模チーム</td>
                <td className="px-3 py-2 text-xs">WireGuard ベース。アカウント認証だけで繋がる</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">◯ 向いていること</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
              <li>・<strong>安い</strong>。既にある回線とルータで始められる</li>
              <li>・<strong>すぐ開通</strong>。キャリアの工事が要らない</li>
              <li>・<strong>場所を選ばない</strong>。海外拠点も在宅も同じやり方で繋がる</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-red-300 bg-red-50/40 p-4 dark:border-red-800 dark:bg-red-950/30">
            <p className="text-sm font-bold text-red-900 dark:text-red-200">✕ 苦手なこと</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-red-900/90 dark:text-red-300">
              <li>・<strong>速度と遅延がブレる</strong>。道が混めばそのまま遅くなる</li>
              <li>・<strong>ルータの負荷が増える</strong>。暗号化はそれなりに重い処理</li>
              <li>・<strong>SLA がない</strong>。遅いときに文句を言う先がない</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm text-blue-900/90 dark:text-blue-300">
            一言でいうと <strong>「普通の道を、金庫車で運ぶ」</strong>。
            道の混雑はどうにもならないが、中身だけは守れる ── という割り切りです。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="ip-vpn" num={4}>② IP-VPN (閉域網)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ① が<strong>「道は同じまま、荷物を守る」</strong>やり方だったのに対して、
          ② は <strong>「そもそも別の道を借りる」</strong>やり方です。
          KDDI や NTT が持っている、<strong>インターネットとは繋がっていない網</strong>を使わせてもらいます。
        </p>

        <ClosedNetworkPathDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            ① との一番の違いは <strong>経由する会社が 1 社だけ</strong>になること。
            知らない事業者を渡り歩かないので、
            <strong>ホップ数が少なく、経路も毎回同じ</strong>です。
            結果として <strong>遅延が読める</strong>ようになり、
            キャリアが <strong>SLA（品質の約束）</strong>を出せるようになります。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          他社と同じ網なのに、なぜ「閉域」と言えるのか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          キャリアの網は <strong>1 本を多くの会社で共用</strong>しています。
          それでも混ざらないのは、<strong>MPLS</strong> という仕組みで
          <strong>会社ごとにラベルを付けて振り分けている</strong>からです。
        </p>

        <MplsLabelDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              A 社から B 社は
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>見えないし、届きません</strong>。
              経路表そのものが会社ごとに分かれているので、
              宛先を知っていても到達できません。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              インターネットからは
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>そもそも入口がありません</strong>。
              ① のように「攻撃を防ぐ」のではなく、
              <strong>攻撃が物理的に届かない</strong>のがこの方式の強みです。
            </p>
          </div>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          フィルタで弾いているのではなく、そもそも経路が無い
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          「インターネットから入れない」と聞くと、
          <strong>PE ルータが送信元 IP を見て捨てている</strong>ように思えますが、そうではありません。
          <strong>そこへ行く道が経路表に載っていない</strong>だけです。
        </p>

        <NoRouteDiagram />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          日本の主なサービス
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">キャリア</th>
                <th className="px-3 py-2 text-left font-semibold">サービス名</th>
                <th className="px-3 py-2 text-left font-semibold">特徴</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">KDDI</td>
                <td className="px-3 py-2 text-xs">Wide Area Virtual Switch / Powered Ethernet</td>
                <td className="px-3 py-2 text-xs">IP-VPN と広域イーサをまとめて提供。法人で広く普及</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">NTT Com</td>
                <td className="px-3 py-2 text-xs">Arcstar IP-VPN / Universal One</td>
                <td className="px-3 py-2 text-xs">国内最大手。海外拠点との接続にも強い</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">SoftBank</td>
                <td className="px-3 py-2 text-xs">SmartVPN</td>
                <td className="px-3 py-2 text-xs">中小企業向けに価格を抑えたプランあり</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">IIJ など</td>
                <td className="px-3 py-2 text-xs">各種</td>
                <td className="px-3 py-2 text-xs">キャリアの網を借りて提供する事業者もある</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">◯ 向いていること</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
              <li>・<strong>SLA が付く</strong>。遅延・稼働率が契約で決まる</li>
              <li>・<strong>外から到達できない</strong>。届かないものは攻撃されない</li>
              <li>・<strong>ルータが軽い</strong>。暗号化処理をしなくてよい</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-red-300 bg-red-50/40 p-4 dark:border-red-800 dark:bg-red-950/30">
            <p className="text-sm font-bold text-red-900 dark:text-red-200">✕ 苦手なこと</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-red-900/90 dark:text-red-300">
              <li>・<strong>高い</strong>。拠点ごとに月額がかかる</li>
              <li>・<strong>開通が遅い</strong>。キャリアの工事で数週間〜数ヶ月</li>
              <li>・<strong>固定拠点向け</strong>。在宅勤務や海外にはそのまま使えない</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm text-blue-900/90 dark:text-blue-300">
            一言でいうと <strong>「会員制の専用バス路線に乗る」</strong>。
            他の会員も同じ路線を使うけれど、
            <strong>座席は完全に分けられていて、一般の人は乗ってこない</strong>ということです。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="ether" num={5}>③ 広域イーサネット</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>キャリアの閉域網を借りる</strong>ところは ② とまったく同じです。
          違うのは <strong>「網に何をやらせるか」</strong>。
          ② が<strong>ルーティングまで任せる</strong>のに対して、
          ③ は <strong>運ぶことだけ任せて、経路は自社で決めます</strong>。
        </p>

        <L2L3CompareDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            ② では拠点ごとに <strong>別のセグメント</strong>を持ち、
            その間をキャリアの網が繋いでいました。
            ③ では <strong>全拠点を同じセグメントにできます</strong>。
            東京の PC から見ると、大阪のサーバが
            <strong>「同じフロアの隣の島にいる」</strong>ように見える、ということです。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          網が「1 台の巨大なスイッチ」に見える
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          広域イーサを借りると、キャリアの網は
          <strong>「全国に置かれた 1 台のスイッチ」</strong>のように振る舞います。
          各拠点は、そのスイッチのポートに LAN ケーブルを挿しているのと同じ扱いです。
        </p>

        <GiantSwitchDiagram />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          誰が何を担当するか
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">　</th>
                <th className="px-3 py-2 text-left font-semibold">② IP-VPN (L3)</th>
                <th className="px-3 py-2 text-left font-semibold">③ 広域イーサ (L2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">網がやること</td>
                <td className="px-3 py-2 text-xs">拠点間のルーティング</td>
                <td className="px-3 py-2 text-xs text-violet-700 dark:text-violet-400">運ぶことだけ</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">経路を決めるのは</td>
                <td className="px-3 py-2 text-xs">キャリア</td>
                <td className="px-3 py-2 text-xs text-violet-700 dark:text-violet-400">自社</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">セグメント</td>
                <td className="px-3 py-2 text-xs">拠点ごとに別</td>
                <td className="px-3 py-2 text-xs text-violet-700 dark:text-violet-400">全拠点で同じにできる</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">流せるもの</td>
                <td className="px-3 py-2 text-xs">基本は IPv4 だけ</td>
                <td className="px-3 py-2 text-xs text-violet-700 dark:text-violet-400">
                  IPv6・マルチキャスト・独自プロトコルも
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">拠点を増やすとき</td>
                <td className="px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">申し込めば繋がる</td>
                <td className="px-3 py-2 text-xs">自社側の設計もやり直す</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">難易度</td>
                <td className="px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">楽</td>
                <td className="px-3 py-2 text-xs">自由だが、その分むずかしい</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-violet-300 bg-violet-50/40 p-4 dark:border-violet-700 dark:bg-violet-950/30">
            <p className="text-sm font-bold text-violet-900 dark:text-violet-200">
              これが要るときに選ぶ
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-violet-900/90 dark:text-violet-300">
              <li>・データセンター間で<strong>ストレージを同期</strong>したい</li>
              <li>・サーバを<strong>IP を変えずに別拠点へ移設</strong>したい</li>
              <li>・<strong>L2 でしか動かない機器やソフト</strong>がある</li>
              <li>・IPv6 やマルチキャストを拠点間で流したい</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-red-300 bg-red-50/40 p-4 dark:border-red-800 dark:bg-red-950/30">
            <p className="text-sm font-bold text-red-900 dark:text-red-200">
              引き換えに引き受けるリスク
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-red-900/90 dark:text-red-300">
              <li>
                ・<strong>ブロードキャストが全拠点に流れる</strong>。
                拠点が増えるほど無駄な通信が増える
              </li>
              <li>
                ・<strong>ループを作ると全拠点が同時に止まる</strong>。
                事故の影響範囲が社内全体になる
              </li>
              <li>・経路設計の責任が<strong>全部自社に来る</strong></li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm text-blue-900/90 dark:text-blue-300">
            一言でいうと <strong>「拠点間に、長い LAN ケーブルを 1 本通す」</strong>。
            <strong>自由度を取るか、管理の楽さを取るか</strong>で ② と分かれます。
            普通の企業の拠点間接続なら、<strong>② で足りることがほとんど</strong>です。
          </p>
        </div>
      </section>

    </main>
  );
}

function PublicInternetPathDiagram() {
  const N: Record<string, [number, number]> = {
    a1: [208, 90], a2: [250, 62], a3: [215, 140], a4: [262, 118],
    a5: [225, 195], a6: [268, 172], a7: [240, 240],
    b1: [310, 78], b2: [355, 105], b3: [320, 160], b4: [368, 62],
    b5: [330, 215], b6: [378, 180], b7: [350, 255], b8: [400, 130],
    c1: [432, 95], c2: [472, 68], c3: [440, 155], c4: [486, 130],
    c5: [450, 210], c6: [492, 185], c7: [462, 250],
  };
  const edges: [string, string][] = [
    ["a1", "a2"], ["a1", "a3"], ["a2", "a4"], ["a3", "a4"], ["a3", "a5"],
    ["a4", "a6"], ["a5", "a6"], ["a5", "a7"], ["a6", "a7"],
    ["a2", "b4"], ["a4", "b1"], ["a4", "b3"], ["a6", "b5"], ["a7", "b7"],
    ["b1", "b2"], ["b2", "b4"], ["b2", "b3"], ["b3", "b5"], ["b3", "b6"],
    ["b5", "b7"], ["b6", "b8"], ["b2", "b8"], ["b6", "b7"],
    ["b8", "c1"], ["b4", "c2"], ["b6", "c4"], ["b7", "c7"],
    ["c1", "c2"], ["c1", "c3"], ["c3", "c4"], ["c3", "c5"],
    ["c4", "c6"], ["c5", "c6"], ["c5", "c7"], ["c6", "c7"],
  ];
  const groupOf = (k: string) => k[0];
  const nodeCls: Record<string, string> = {
    a: "fill-zinc-200 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600",
    b: "fill-red-100 stroke-red-400 dark:fill-red-950/60 dark:stroke-red-700",
    c: "fill-zinc-200 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600",
  };
  const today = ["a3", "a4", "b3", "b6", "c3", "c4"];
  const otherDay = ["a5", "a6", "b5", "b7", "c5", "c6"];
  const line = (keys: string[]) =>
    [[172, 167], ...keys.map((k) => N[k]), [528, 167]]
      .map(([x, y]) => `${x},${y}`)
      .join(" ");

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 360" className="mx-auto w-full">
        <text x="350" y="22" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          東京の PC から大阪のサーバへ、公共インターネット経由で送る場合
        </text>

        <rect x="186" y="38" width="328" height="268" rx="16" className="fill-zinc-50/60 stroke-zinc-300 dark:fill-zinc-900/40 dark:stroke-zinc-700" strokeWidth="1.3" strokeDasharray="7 5" />
        <text x="200" y="58" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">公共インターネット</text>

        {edges.map(([p1, p2]) => (
          <line
            key={`${p1}-${p2}`}
            x1={N[p1][0]} y1={N[p1][1]} x2={N[p2][0]} y2={N[p2][1]}
            className="stroke-zinc-200 dark:stroke-zinc-800"
            strokeWidth="1.2"
          />
        ))}

        <polyline points={line(otherDay)} fill="none" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" strokeDasharray="6 4" />
        <polyline points={line(today)} fill="none" className="stroke-blue-500" strokeWidth="3" />

        {Object.entries(N).map(([k, [x, y]]) => (
          <circle key={k} cx={x} cy={y} r={8} className={nodeCls[groupOf(k)]} strokeWidth="1.4" />
        ))}

        <text x="243" y="288" textAnchor="middle" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">ISP A の設備</text>
        <text x="355" y="288" textAnchor="middle" className="fill-red-600 text-[9px] font-semibold dark:fill-red-400">中継事業者 / IX</text>
        <text x="466" y="288" textAnchor="middle" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">ISP B の設備</text>

        <rect x="10" y="140" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="48" y="164" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 A</text>
        <text x="48" y="180" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">東京本社</text>

        <rect x="96" y="140" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="134" y="164" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">社内ルータ</text>
        <text x="134" y="180" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">出口</text>
        <line x1="86" y1="167" x2="96" y2="167" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />
        <text x="91" y="216" textAnchor="middle" className="fill-emerald-700 text-[8px] font-semibold dark:fill-emerald-400">自社が管理できるのはここまで</text>

        <rect x="528" y="140" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="566" y="164" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">社内ルータ</text>
        <text x="566" y="180" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">入口</text>

        <rect x="614" y="140" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="652" y="164" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 B</text>
        <text x="652" y="180" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">大阪支社</text>
        <line x1="604" y1="167" x2="614" y2="167" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />
        <text x="609" y="216" textAnchor="middle" className="fill-emerald-700 text-[8px] font-semibold dark:fill-emerald-400">ここから先が相手先</text>

        <line x1="196" y1="326" x2="226" y2="326" className="stroke-blue-500" strokeWidth="3" />
        <text x="234" y="330" className="fill-zinc-700 text-[9px] dark:fill-zinc-300">今日通った経路</text>
        <line x1="336" y1="326" x2="366" y2="326" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" strokeDasharray="6 4" />
        <text x="374" y="330" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">別の日に通る経路</text>

        <text x="350" y="352" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          どの機器を通るかは自分では選べない ── だから出る前に自分で暗号化する
        </text>
      </svg>
    </div>
  );
}

function InternetVpnPathDiagram() {
  const V: [number, number][] = [
    [230, 120], [290, 145], [350, 110], [410, 150], [470, 125],
  ];
  const others: [number, number][] = [
    [212, 78], [270, 68], [328, 62], [388, 82], [452, 70],
    [222, 190], [284, 206], [346, 186], [406, 208], [466, 190], [496, 158],
  ];
  const tunnel = [[182, 157] as [number, number], ...V, [518, 157] as [number, number]]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 330" className="mx-auto w-full">
        <text x="350" y="22" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          道は公共インターネットのまま。両端のルータだけが仕事を増やす
        </text>

        <rect x="196" y="38" width="308" height="230" rx="16" className="fill-zinc-50/60 stroke-zinc-300 dark:fill-zinc-900/40 dark:stroke-zinc-700" strokeWidth="1.3" strokeDasharray="7 5" />
        <text x="208" y="58" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">公共インターネット</text>

        {others.map(([x, y]) => (
          <circle key={`o${x}-${y}`} cx={x} cy={y} r={7} className="fill-zinc-200 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.2" />
        ))}

        <polyline points={tunnel} fill="none" className="stroke-blue-200 dark:stroke-blue-900" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={tunnel} fill="none" className="stroke-blue-500" strokeWidth="2.5" />

        {V.map(([x, y]) => (
          <circle key={`v${x}`} cx={x} cy={y} r={7} className="fill-zinc-200 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.2" />
        ))}

        <text x="350" y="88" textAnchor="middle" className="fill-blue-700 text-[10px] font-bold dark:fill-blue-400">
          暗号化トンネル
        </text>

        <rect x="10" y="130" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="48" y="154" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 A</text>
        <text x="48" y="170" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">東京本社</text>

        <rect x="96" y="130" width="86" height="54" rx="8" className="fill-blue-50 stroke-blue-500 dark:fill-blue-950/40 dark:stroke-blue-600" strokeWidth="2" />
        <text x="139" y="152" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">VPN ルータ</text>
        <text x="139" y="168" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">ここで暗号化</text>
        <line x1="86" y1="157" x2="96" y2="157" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />

        <rect x="518" y="130" width="86" height="54" rx="8" className="fill-blue-50 stroke-blue-500 dark:fill-blue-950/40 dark:stroke-blue-600" strokeWidth="2" />
        <text x="561" y="152" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">VPN ルータ</text>
        <text x="561" y="168" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">ここで元に戻す</text>

        <rect x="614" y="130" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="652" y="154" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 B</text>
        <text x="652" y="170" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">大阪支社</text>
        <line x1="604" y1="157" x2="614" y2="157" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />

        <line x1="410" y1="150" x2="430" y2="234" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" />
        <rect x="300" y="234" width="270" height="30" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.2" />
        <text x="435" y="253" textAnchor="middle" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          途中のルータに見えるのは「読めない荷物」だけ
        </text>

        <text x="350" y="296" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          経路が毎回変わるのも、遅延がブレるのも、2 節とまったく同じ
        </text>
        <text x="350" y="316" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          VPN が解決するのは「盗み見」だけで、「速さ」は解決しない
        </text>
      </svg>
    </div>
  );
}

function PacketEncapsulationDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 240" className="mx-auto w-full">
        <text x="350" y="30" textAnchor="middle" className="fill-zinc-600 text-[10px] font-semibold dark:fill-zinc-400">
          ① 社内を流れているとき
        </text>

        <rect x="120" y="42" width="180" height="44" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="210" y="62" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">宛先 192.168.2.10</text>
        <text x="210" y="77" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">大阪支社の PC</text>

        <rect x="300" y="42" width="260" height="44" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.5" />
        <text x="430" y="68" textAnchor="middle" className="fill-zinc-700 text-[10px] font-bold dark:fill-zinc-300">データ（そのまま読める）</text>

        <line x1="350" y1="94" x2="350" y2="118" className="stroke-blue-500" strokeWidth="2" />
        <text x="362" y="112" className="fill-blue-600 text-[9px] font-semibold dark:fill-blue-400">VPN ルータが丸ごと包む</text>

        <text x="350" y="140" textAnchor="middle" className="fill-zinc-600 text-[10px] font-semibold dark:fill-zinc-400">
          ② インターネットに出るとき
        </text>

        <rect x="60" y="152" width="210" height="48" rx="6" className="fill-blue-50 stroke-blue-500 dark:fill-blue-950/40 dark:stroke-blue-600" strokeWidth="1.8" />
        <text x="165" y="172" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">新しい宛先</text>
        <text x="165" y="188" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">相手ルータのグローバル IP</text>

        <rect x="270" y="152" width="80" height="48" rx="6" className="fill-blue-50 stroke-blue-500 dark:fill-blue-950/40 dark:stroke-blue-600" strokeWidth="1.8" />
        <text x="310" y="172" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">ESP</text>
        <text x="310" y="188" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">VPN の目印</text>

        <rect x="350" y="152" width="290" height="48" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.8" />
        <text x="495" y="172" textAnchor="middle" className="fill-zinc-700 text-[10px] font-bold dark:fill-zinc-300">暗号化された ① のパケット</text>
        <text x="495" y="188" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-400">宛先もデータも、この中に隠れている</text>

        <text x="350" y="226" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          途中のルータが見るのは左端の新しい宛先だけ。右側は鍵がないと開けられない
        </text>
      </svg>
    </div>
  );
}

function ClosedNetworkPathDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 340" className="mx-auto w-full">
        <text x="350" y="22" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          同じ 2 拠点を、キャリアの閉域網で結ぶ場合
        </text>

        <rect x="196" y="44" width="308" height="194" rx="16" className="fill-amber-50/60 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" strokeDasharray="7 5" />
        <text x="208" y="66" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">KDDI の閉域網</text>

        <text x="350" y="104" textAnchor="middle" className="fill-amber-700 text-[9px] font-semibold dark:fill-amber-400">
          経路は契約時に決まっていて、毎回同じ道を通る
        </text>

        <line x1="182" y1="147" x2="518" y2="147" className="stroke-amber-500" strokeWidth="3.5" />

        <rect x="225" y="127" width="56" height="40" rx="6" className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.4" />
        <text x="253" y="152" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">PE</text>

        <rect x="335" y="127" width="56" height="40" rx="6" className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.4" />
        <text x="363" y="152" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">P</text>

        <rect x="445" y="127" width="56" height="40" rx="6" className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.4" />
        <text x="473" y="152" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">PE</text>

        <text x="350" y="196" textAnchor="middle" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          経由するのはこの数台だけ。遅延もほぼ一定
        </text>
        <text x="350" y="218" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">
          PE = 網の出入口のルータ / P = 網の内側のルータ
        </text>

        <rect x="10" y="120" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="48" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 A</text>
        <text x="48" y="160" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">東京本社</text>

        <rect x="96" y="120" width="86" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="139" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">CE ルータ</text>
        <text x="139" y="160" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">暗号化はしない</text>
        <line x1="86" y1="147" x2="96" y2="147" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />

        <rect x="518" y="120" width="86" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="561" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">CE ルータ</text>
        <text x="561" y="160" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">そのまま受け取る</text>

        <rect x="614" y="120" width="76" height="54" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="652" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 B</text>
        <text x="652" y="160" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">大阪支社</text>
        <line x1="604" y1="147" x2="614" y2="147" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />

        <rect x="280" y="272" width="140" height="42" rx="8" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="350" y="298" textAnchor="middle" className="fill-zinc-600 text-[10px] font-bold dark:fill-zinc-400">インターネット</text>

        <line x1="350" y1="238" x2="350" y2="272" className="stroke-red-400 dark:stroke-red-700" strokeWidth="1.6" strokeDasharray="5 3" />
        <line x1="341" y1="246" x2="359" y2="264" className="stroke-red-500" strokeWidth="2.4" />
        <line x1="359" y1="246" x2="341" y2="264" className="stroke-red-500" strokeWidth="2.4" />
        <text x="372" y="260" className="fill-red-600 text-[9px] font-semibold dark:fill-red-400">繋がっていない</text>

        <text x="350" y="332" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          外から届く経路が物理的に存在しない ── これが「閉域」の意味
        </text>
      </svg>
    </div>
  );
}

function MplsLabelDiagram() {
  const devices = [
    { x: 215, label: "PE" },
    { x: 320, label: "P" },
    { x: 425, label: "PE" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 300" className="mx-auto w-full">
        <rect x="190" y="62" width="320" height="182" rx="14" className="fill-amber-50/60 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" strokeDasharray="6 4" />
        <text x="350" y="84" textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
          キャリアの閉域網（機器は 1 セットだけ）
        </text>

        {devices.map((d, i) => (
          <g key={`${d.label}-${i}`}>
            <rect x={d.x} y={96} width={50} height={124} rx={6} className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.4" />
            <text x={d.x + 25} y={118} textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">
              {d.label}
            </text>
          </g>
        ))}

        <line x1="150" y1="145" x2="550" y2="145" className="stroke-emerald-500" strokeWidth="2.5" />
        <line x1="150" y1="195" x2="550" y2="195" className="stroke-blue-500" strokeWidth="2.5" />

        <rect x="268" y="134" width="50" height="22" rx="4" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-900/70 dark:stroke-emerald-600" strokeWidth="1.2" />
        <text x="293" y="149" textAnchor="middle" className="fill-emerald-800 text-[8px] font-bold dark:fill-emerald-300">ラベル A</text>

        <rect x="268" y="184" width="50" height="22" rx="4" className="fill-blue-100 stroke-blue-500 dark:fill-blue-900/70 dark:stroke-blue-600" strokeWidth="1.2" />
        <text x="293" y="199" textAnchor="middle" className="fill-blue-800 text-[8px] font-bold dark:fill-blue-300">ラベル B</text>

        <rect x="14" y="121" width="136" height="48" rx="7" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="82" y="141" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">A 社 本社</text>
        <text x="82" y="157" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">東京</text>

        <rect x="14" y="171" width="136" height="48" rx="7" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.5" />
        <text x="82" y="191" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">B 社 本社</text>
        <text x="82" y="207" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">名古屋</text>

        <rect x="550" y="121" width="136" height="48" rx="7" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="618" y="141" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">A 社 支社</text>
        <text x="618" y="157" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">大阪</text>

        <rect x="550" y="171" width="136" height="48" rx="7" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.5" />
        <text x="618" y="191" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">B 社 支社</text>
        <text x="618" y="207" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">福岡</text>

        <text x="350" y="238" textAnchor="middle" className="fill-zinc-600 text-[9px] font-semibold dark:fill-zinc-400">
          同じ機器の中を通るが、ラベルが違うので別々の線として扱われる
        </text>

        <text x="350" y="270" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          A 社の通信が B 社に混ざることはない。経路表そのものが会社ごとに別
        </text>
        <text x="350" y="290" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          同じ理屈で、インターネットからの通信もこの中には入ってこない
        </text>
      </svg>
    </div>
  );
}

function NoRouteDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 280" className="mx-auto w-full">
        <rect x="190" y="52" width="320" height="176" rx="12" className="fill-amber-50/50 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="350" y="74" textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
          キャリアの PE ルータ（物理的には 1 台）
        </text>

        <rect x="206" y="88" width="130" height="124" rx="7" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
        <text x="271" y="108" textAnchor="middle" className="fill-zinc-700 text-[9px] font-bold dark:fill-zinc-300">インターネット用</text>
        <text x="271" y="122" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">の経路表</text>
        <text x="271" y="146" textAnchor="middle" className="fill-zinc-600 text-[8px] dark:fill-zinc-400">0.0.0.0/0 → 上流へ</text>
        <text x="271" y="162" textAnchor="middle" className="fill-zinc-600 text-[8px] dark:fill-zinc-400">203.0.113.0/24 → …</text>
        <text x="271" y="186" textAnchor="middle" className="fill-red-600 text-[8px] font-bold dark:fill-red-400">A 社への経路</text>
        <text x="271" y="200" textAnchor="middle" className="fill-red-600 text-[8px] font-bold dark:fill-red-400">→ 載っていない</text>

        <line x1="350" y1="88" x2="350" y2="212" className="stroke-amber-500" strokeWidth="1.6" strokeDasharray="5 3" />

        <rect x="364" y="88" width="130" height="124" rx="7" className="fill-white stroke-emerald-400 dark:fill-zinc-950 dark:stroke-emerald-700" strokeWidth="1.3" />
        <text x="429" y="108" textAnchor="middle" className="fill-emerald-800 text-[9px] font-bold dark:fill-emerald-300">A 社用の経路表</text>
        <text x="429" y="122" textAnchor="middle" className="fill-emerald-600 text-[8px] dark:fill-emerald-400">(VRF)</text>
        <text x="429" y="150" textAnchor="middle" className="fill-zinc-600 text-[8px] dark:fill-zinc-400">10.0.0.0/16 → 東京</text>
        <text x="429" y="168" textAnchor="middle" className="fill-zinc-600 text-[8px] dark:fill-zinc-400">10.0.1.0/24 → 大阪</text>
        <text x="429" y="194" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">A 社の経路だけが載る</text>

        <text x="350" y="224" textAnchor="middle" className="fill-amber-700 text-[8px] font-semibold dark:fill-amber-400">
          この 2 つは互いに参照しない
        </text>

        <rect x="20" y="112" width="140" height="56" rx="8" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="90" y="136" textAnchor="middle" className="fill-zinc-700 text-[10px] font-bold dark:fill-zinc-300">インターネット</text>
        <text x="90" y="152" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">誰かの攻撃パケット</text>
        <line x1="160" y1="140" x2="206" y2="140" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />

        <line x1="341" y1="131" x2="359" y2="149" className="stroke-red-500" strokeWidth="2.6" />
        <line x1="359" y1="131" x2="341" y2="149" className="stroke-red-500" strokeWidth="2.6" />

        <rect x="540" y="112" width="140" height="56" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="610" y="136" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">A 社の拠点</text>
        <text x="610" y="152" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">10.0.0.0/16</text>
        <line x1="494" y1="140" x2="540" y2="140" className="stroke-emerald-500" strokeWidth="2.5" />

        <text x="350" y="252" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          攻撃パケットは PE まで届く。でも「次にどこへ送るか」が経路表に無い
        </text>
        <text x="350" y="272" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          捨てているのではなく、行き先が分からずそこで終わる
        </text>
      </svg>
    </div>
  );
}

function L2L3CompareDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 300" className="mx-auto w-full">
        <line x1="350" y1="30" x2="350" y2="270" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1.2" />

        <text x="175" y="34" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold dark:fill-amber-300">
          ② IP-VPN = L3 (IP) でつなぐ
        </text>

        <rect x="16" y="120" width="76" height="56" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="54" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 A</text>
        <text x="54" y="161" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.1.0/24</text>

        <rect x="104" y="98" width="142" height="100" rx="10" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.6" />
        <text x="175" y="122" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">キャリアの網</text>
        <rect x="140" y="134" width="70" height="30" rx="5" className="fill-amber-100 stroke-amber-500 dark:fill-amber-900/50 dark:stroke-amber-600" strokeWidth="1.3" />
        <text x="175" y="154" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">ルータ</text>
        <text x="175" y="184" textAnchor="middle" className="fill-amber-700 text-[8px] dark:fill-amber-400">経路はキャリアが持つ</text>

        <rect x="258" y="120" width="76" height="56" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="296" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 B</text>
        <text x="296" y="161" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.2.0/24</text>

        <line x1="92" y1="148" x2="104" y2="148" className="stroke-amber-500" strokeWidth="2.2" />
        <line x1="246" y1="148" x2="258" y2="148" className="stroke-amber-500" strokeWidth="2.2" />

        <text x="175" y="232" textAnchor="middle" className="fill-zinc-700 text-[9px] font-semibold dark:fill-zinc-300">
          セグメントは拠点ごとに別
        </text>
        <text x="175" y="250" textAnchor="middle" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          拠点をまたぐ配送はキャリアがやる
        </text>

        <text x="525" y="34" textAnchor="middle" className="fill-violet-800 text-[11px] font-bold dark:fill-violet-300">
          ③ 広域イーサ = L2 (Ethernet) でつなぐ
        </text>

        <rect x="366" y="120" width="76" height="56" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="404" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 A</text>
        <text x="404" y="161" textAnchor="middle" className="fill-violet-700 font-mono text-[8px] dark:fill-violet-400">10.0.0.0/24</text>

        <rect x="454" y="98" width="142" height="100" rx="10" className="fill-violet-50 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.6" />
        <text x="525" y="122" textAnchor="middle" className="fill-violet-900 text-[10px] font-bold dark:fill-violet-200">キャリアの網</text>
        <rect x="484" y="134" width="82" height="30" rx="5" className="fill-violet-100 stroke-violet-500 dark:fill-violet-900/50 dark:stroke-violet-600" strokeWidth="1.3" />
        <text x="525" y="154" textAnchor="middle" className="fill-violet-900 text-[10px] font-bold dark:fill-violet-200">スイッチ</text>
        <text x="525" y="184" textAnchor="middle" className="fill-violet-700 text-[8px] dark:fill-violet-400">運ぶだけ。経路は持たない</text>

        <rect x="608" y="120" width="76" height="56" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="646" y="144" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">拠点 B</text>
        <text x="646" y="161" textAnchor="middle" className="fill-violet-700 font-mono text-[8px] dark:fill-violet-400">10.0.0.0/24</text>

        <line x1="442" y1="148" x2="454" y2="148" className="stroke-violet-500" strokeWidth="2.2" />
        <line x1="596" y1="148" x2="608" y2="148" className="stroke-violet-500" strokeWidth="2.2" />

        <text x="525" y="232" textAnchor="middle" className="fill-violet-700 text-[9px] font-semibold dark:fill-violet-400">
          全拠点が同じセグメント
        </text>
        <text x="525" y="250" textAnchor="middle" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          ルーティングは自社の機器でやる
        </text>

        <text x="350" y="286" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          同じ「閉域網を借りる」でも、網に何をやらせるかが違う
        </text>
      </svg>
    </div>
  );
}

function GiantSwitchDiagram() {
  const sites = [
    { x: 60, port: 210, name: "東京本社", ip: "10.0.0.10" },
    { x: 265, port: 350, name: "大阪支社", ip: "10.0.0.20" },
    { x: 470, port: 490, name: "名古屋支社", ip: "10.0.0.30" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 290" className="mx-auto w-full">
        <rect x="150" y="50" width="400" height="76" rx="10" className="fill-violet-50 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.8" />
        <text x="350" y="78" textAnchor="middle" className="fill-violet-900 text-[11px] font-bold dark:fill-violet-200">
          キャリアの広域イーサ網
        </text>
        <text x="350" y="97" textAnchor="middle" className="fill-violet-700 text-[9px] dark:fill-violet-400">
          = 全国に置かれた 1 台のスイッチ
        </text>

        {sites.map((st) => (
          <g key={st.name}>
            <rect x={st.port - 10} y={118} width={20} height={16} rx={3} className="fill-violet-200 stroke-violet-500 dark:fill-violet-900/60 dark:stroke-violet-600" strokeWidth="1.2" />
            <line x1={st.port} y1={134} x2={st.x + 85} y2={196} className="stroke-violet-500" strokeWidth="2" />
            <rect x={st.x} y={196} width={170} height={54} rx={8} className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
            <text x={st.x + 85} y={219} textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">
              {st.name}
            </text>
            <text x={st.x + 85} y={236} textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">
              {st.ip}
            </text>
          </g>
        ))}

        <text x="350" y="160" textAnchor="middle" className="fill-violet-700 text-[9px] font-semibold dark:fill-violet-400">
          各拠点は「このスイッチのポートに挿した」だけの扱い
        </text>

        <text x="350" y="272" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          3 拠点とも同じ 10.0.0.0/24。ブロードキャストも 3 拠点すべてに届く
        </text>
      </svg>
    </div>
  );
}

function VirtualLineDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 220" className="mx-auto w-full max-w-2xl">
        <rect x="20" y="60" width="140" height="100" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="90" y="90" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">本社 LAN</text>
        <text x="90" y="108" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">東京</text>
        <text x="90" y="130" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">192.168.1.0/24</text>

        <rect x="440" y="60" width="140" height="100" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="510" y="90" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">支社 LAN</text>
        <text x="510" y="108" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">大阪</text>
        <text x="510" y="130" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">192.168.2.0/24</text>

        <rect x="180" y="50" width="240" height="120" rx="10" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1" strokeDasharray="6 4" />
        <text x="300" y="42" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">何らかの「道」(インターネット or 閉域網)</text>

        <line x1="160" y1="110" x2="440" y2="110" className="stroke-indigo-500" strokeWidth="3" />
        <text x="300" y="100" textAnchor="middle" className="fill-indigo-700 text-xs font-semibold dark:fill-indigo-400">VPN トンネル (仮想専用線)</text>
        <text x="300" y="135" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">→ 両拠点が同じ社内ネットワークみたいに振る舞う</text>

        <text x="300" y="200" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          物理的に離れた 2 拠点を、論理的に「1 つの社内 LAN」のように繋ぐ ── これが VPN
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
    { id: "basics", num: 1, title: "そもそも VPN って?" },
    { id: "path", num: 2, title: "データはどこを通る?" },
    { id: "internet-vpn", num: 3, title: "① インターネット VPN" },
    { id: "ip-vpn", num: 4, title: "② IP-VPN (閉域網)" },
    { id: "ether", num: 5, title: "③ 広域イーサネット" },
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
