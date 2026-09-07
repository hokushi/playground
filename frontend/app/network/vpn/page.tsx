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

        <p className="text-zinc-700 dark:text-zinc-300">
          図の例で言うと、攻撃者が{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">198.51.100.77</code>{" "}
          から A 社のサーバー{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.0.5</code>{" "}
          の SSH (22 番) を狙ってパケットを投げたとします。
          PE ルータはそれを受け取り、<strong>インターネット用の経路表で 10.0.0.5 を探します</strong>。
          そこに載っているのは{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">0.0.0.0/0</code>{" "}
          や{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">203.0.113.0/24</code>{" "}
          といったインターネット側の経路だけで、<strong>10.0.0.5 に行く道はどこにも書いていません</strong>。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          隣の A 社用の経路表 (VRF) には{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.0.0/16 → 東京</code>{" "}
          と載っているので、<strong>物理的には同じ 1 台の中に行き方が存在します</strong>。
          それでも届かないのは、<strong>インターネット用の表からその表を参照しないから</strong>です。
          結果、パケットは弾かれたのではなく<strong>行き先不明でそこで終わり</strong>ます。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          では、どの経路表を使うかは何で決まるのか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここで気になるのが「PE は誰から来たパケットかを確認しているのか?」という点です。
          実は<strong>パケットごとに送信元を検査しているわけではありません</strong>。
          決め手は<strong>どの入口 (ポート) から入ってきたか</strong>です。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          PE の各ポートには、あらかじめ「このポートは A 社の VRF」という紐づけが設定されています。
          パケットが来たら、まず<strong>入口を見て引くべき経路表を選び</strong>、それから宛先を探します。
        </p>

        <VrfEntranceDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          同じ{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.0.5</code>{" "}
          宛でも、<strong>A 社の回線から入れば東京へ転送され、インターネット側から入れば該当なしで終わる</strong>。
          宛先が同じなのに結果が変わるのは、<strong>入口によって見る地図が違う</strong>からです。
        </p>

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
          一言でいうと{" "}
          <strong>「離れた拠点を、まるごと 1 つの同じネットワークに入れてしまう」</strong>
          サービスです。東京と大阪が<strong>同じオフィスの中</strong>にあるかのように扱えるようになります。
        </p>

        <SameSegmentDiagram />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          同じセグメントの中では、IP ではなく MAC で届いている
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          「直接届ける」と言いましたが、そのとき使われるのは<strong>IP ではありません</strong>。
          パケットには宛先の札が<strong>2 枚</strong>ついていて、使い分けられています。
        </p>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">
{`┌──────────────────────────────────────────────┐
│ MAC ヘッダ   宛先 aa:bb:cc:dd:ee:ff          │ ← 隣の機器へ渡すための札
├──────────────────────────────────────────────┤
│ IP ヘッダ    宛先 10.0.1.6                   │ ← 最終的な目的地
├──────────────────────────────────────────────┤
│ データ                                       │
└──────────────────────────────────────────────┘`}
          </pre>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            IP の札は<strong>端から端まで変わりません</strong>。
            対して MAC の札は<strong>隣に渡すたびに書き換えられます</strong>。
          </p>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          では MAC の札はどこから手に入るのか。
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.1.5</code>{" "}
          が{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.1.6</code>{" "}
          に送るときの実際の動きです。
        </p>
        <ol className="ml-5 flex list-decimal flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li>
            「10.0.1.6 は<strong>同じ帯だ</strong>」と判定する
          </li>
          <li>
            「<strong>10.0.1.6 さん、MAC アドレスを教えて</strong>」と<strong>セグメント全体に呼びかける</strong> (ARP)
          </li>
          <li>
            本人が「私です、
            <code className="rounded bg-zinc-100 px-1 font-mono text-xs dark:bg-zinc-800">aa:bb:cc:dd:ee:ff</code>{" "}
            です」と返す
          </li>
          <li>
            以降は<strong>その MAC を宛先に書いて</strong>送る。スイッチはその MAC を見て届ける
          </li>
        </ol>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          広域イーサ = そのセグメントを、拠点をまたいで引き伸ばす
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここまで来ると、広域イーサが何をしているかは一言で済みます。
          <strong>1 拠点の中で閉じていたセグメントを、キャリアの回線を使って東京と大阪にまたがらせる</strong>。それだけです。
        </p>

        <GiantSwitchDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          こうすると東京の{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.1.5</code>{" "}
          と大阪の{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">10.0.1.6</code>{" "}
          が<strong>同じ帯の住人</strong>になります。さっきの判定で「同じ帯」と出るので、
          <strong>ルータを通さず、MAC で直接届けにいきます</strong>。
          東京の PC から見ると、大阪のサーバは<strong>隣の席の PC と区別がつきません</strong>。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          他社の MAC が分かれば、そこに送りつけられるのでは?
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          MAC だけで届く世界だと聞くと、<strong>他社の MAC を知っていれば入り込めるのでは</strong>と思えます。
          結論から言うと<strong>できません</strong>。理由は、前に出てきた
          <strong>VRF の話とまったく同じ構図</strong>です。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          キャリアのスイッチは MAC を学習して表を作りますが、
          その表は<strong>契約者ごとに完全に分かれています</strong>。
          そして<strong>どの表を使うかは入口のポートで決まります</strong>。
          A 社の回線から入ってきたフレームは、<strong>A 社の表しか参照されません</strong>。
        </p>

        <PerCustomerMacDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          実際に A 社の拠点から B 社の PC{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">bb:bb:bb:bb:bb:bb</code>{" "}
          宛のフレームを流すと、こうなります。
        </p>
        <ol className="ml-5 flex list-decimal flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li>PE が <strong>A 社の MAC テーブル</strong>でその MAC を探す</li>
          <li><strong>載っていない</strong> (B 社の表にしかないので)</li>
          <li>知らない MAC 宛なので、<strong>A 社のドメインの中だけに</strong>流す</li>
          <li>
            <strong>B 社のポートにはそもそも出て行かない</strong>。返事も来ないので永久に学習されない
          </li>
        </ol>
        <p className="text-zinc-700 dark:text-zinc-300">
          前に出てきた「攻撃パケットは PE まで届くが、行き先が経路表に無いのでそこで終わる」と同じで、
          <strong>弾かれるのではなく、行き先が分からず終わる</strong>という挙動です。
        </p>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            そもそも MAC は秘密の値ではない
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            同じセグメントにいれば ARP で誰でも取れますし、機器のラベルに書いてあることもあります。
            なので<strong>「MAC を知られたら危ない」という設計にはそもそもなっていません</strong>。
            分離しているのは<strong>入口</strong>であって、アドレスの秘匿ではない
            ── という点も VRF と共通です。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          裏返し: 自社の中は素通りになる
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          他社からは届かない一方で、<strong>同じセグメントに入れた相手には自由に送りつけられます</strong>。
          東京の PC から大阪のサーバへ、<strong>ルータもファイアウォールも通らずに直接届く</strong>。
          隣の席のように使えるということは、<strong>間に何も挟まっていない</strong>ということでもあります。
        </p>

        <FlatSegmentRiskDiagram />

        <div className="rounded-lg border border-red-200 bg-red-50/50 px-5 py-4 dark:border-red-900/50 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-900 dark:text-red-200">
            L2 を全国に広げる = 事故も全国に広がる
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-red-900/90 dark:text-red-300">
            <li>
              ・<strong>止める場所が無い</strong>。拠点間の通信を絞りたくなっても、
              間にフィルタをかける機器が存在しない
            </li>
            <li>
              ・<strong>呼びかけが全拠点に届く</strong>。
              東京の PC が「10.0.1.6 さんいますか?」と叫べば、その声は大阪にも流れる
            </li>
            <li>
              ・<strong>ループを作ると全拠点が同時に止まる</strong>。
              1 拠点の配線ミスが社内全体の障害になる
            </li>
          </ul>
          <p className="mt-3 text-sm text-red-900/90 dark:text-red-300">
            ② の IP-VPN なら拠点間にルータが挟まるので、<strong>そこでフィルタをかけられます</strong>。
            止めたいときに止められる場所があるかどうかが、両者のいちばん実務的な差です。
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

function VrfEntranceDiagram() {
  const ports = [
    { port: "1 番ポート", from: "A 社の CE と繋がる回線", table: "A 社用の経路表 (VRF)", color: "emerald" as const, y: 62 },
    { port: "2 番ポート", from: "B 社の CE と繋がる回線", table: "B 社用の経路表 (VRF)", color: "blue" as const, y: 122 },
    { port: "9 番ポート", from: "上流のインターネット", table: "インターネット用の経路表", color: "zinc" as const, y: 182 },
  ];

  const colors: Record<string, { box: string; text: string; sub: string; line: string }> = {
    emerald: {
      box: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700",
      text: "fill-emerald-900 dark:fill-emerald-200",
      sub: "fill-emerald-700 dark:fill-emerald-400",
      line: "stroke-emerald-500",
    },
    blue: {
      box: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700",
      text: "fill-blue-900 dark:fill-blue-200",
      sub: "fill-blue-700 dark:fill-blue-400",
      line: "stroke-blue-500",
    },
    zinc: {
      box: "fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700",
      text: "fill-zinc-700 dark:fill-zinc-300",
      sub: "fill-zinc-500 dark:fill-zinc-500",
      line: "stroke-zinc-400 dark:stroke-zinc-600",
    },
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 268" className="mx-auto w-full">
        <text x="130" y="34" textAnchor="middle" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">
          どこから入ってきたか
        </text>
        <text x="530" y="34" textAnchor="middle" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">
          引かれる経路表
        </text>

        <rect x="288" y="46" width="84" height="176" rx="8" className="fill-amber-50/60 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="330" y="122" textAnchor="middle" className="fill-amber-800 text-[9px] font-bold dark:fill-amber-300">PE</text>
        <text x="330" y="138" textAnchor="middle" className="fill-amber-700 text-[8px] dark:fill-amber-400">ルータ</text>

        {ports.map((p) => {
          const c = colors[p.color];
          return (
            <g key={p.port}>
              <rect x="16" y={p.y} width="200" height="44" rx="7" className={c.box} strokeWidth="1.4" />
              <text x="116" y={p.y + 19} textAnchor="middle" className={`${c.text} text-[10px] font-bold`}>
                {p.port}
              </text>
              <text x="116" y={p.y + 34} textAnchor="middle" className={`${c.sub} text-[8px]`}>
                {p.from}
              </text>

              <line x1="216" y1={p.y + 22} x2="286" y2={p.y + 22} className={c.line} strokeWidth="2" />
              <line x1="374" y1={p.y + 22} x2="440" y2={p.y + 22} className={c.line} strokeWidth="2" />

              <rect x="442" y={p.y} width="242" height="44" rx="7" className={c.box} strokeWidth="1.4" />
              <text x="563" y={p.y + 27} textAnchor="middle" className={`${c.text} text-[10px] font-bold`}>
                {p.table}
              </text>
            </g>
          );
        })}

        <text x="350" y="252" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          入口とテーブルは設定で 1 対 1 に紐づいている。送信元 IP は見ていない
        </text>
      </svg>
    </div>
  );
}

function NoRouteDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 300" className="mx-auto w-full">
        <rect x="190" y="44" width="320" height="196" rx="12" className="fill-amber-50/50 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="350" y="66" textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
          キャリアの PE ルータ（物理的には 1 台）
        </text>

        <rect x="206" y="80" width="130" height="148" rx="7" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
        <text x="271" y="98" textAnchor="middle" className="fill-zinc-700 text-[9px] font-bold dark:fill-zinc-300">インターネット用</text>
        <text x="271" y="111" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">の経路表</text>
        <text x="271" y="132" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">0.0.0.0/0 → 上流へ</text>
        <text x="271" y="147" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">203.0.113.0/24 → …</text>
        <line x1="216" y1="158" x2="326" y2="158" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />
        <text x="271" y="175" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.0.5 を検索</text>
        <text x="271" y="192" textAnchor="middle" className="fill-red-600 text-[9px] font-bold dark:fill-red-400">→ 該当なし</text>
        <text x="271" y="208" textAnchor="middle" className="fill-red-500 text-[8px] dark:fill-red-400">A 社の経路が無い</text>

        <line x1="350" y1="80" x2="350" y2="228" className="stroke-amber-500" strokeWidth="1.6" strokeDasharray="5 3" />

        <rect x="364" y="80" width="130" height="148" rx="7" className="fill-white stroke-emerald-400 dark:fill-zinc-950 dark:stroke-emerald-700" strokeWidth="1.3" />
        <text x="429" y="98" textAnchor="middle" className="fill-emerald-800 text-[9px] font-bold dark:fill-emerald-300">A 社用の経路表</text>
        <text x="429" y="111" textAnchor="middle" className="fill-emerald-600 text-[8px] dark:fill-emerald-400">(VRF)</text>
        <text x="429" y="132" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.0.0/16 → 東京</text>
        <text x="429" y="147" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.1.0/24 → 大阪</text>
        <line x1="374" y1="158" x2="484" y2="158" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />
        <text x="429" y="175" textAnchor="middle" className="fill-emerald-700 font-mono text-[8px] dark:fill-emerald-400">10.0.0.5 はここに載る</text>
        <text x="429" y="192" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">でも左の表からは</text>
        <text x="429" y="206" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">この表は見えない</text>

        <text x="350" y="236" textAnchor="middle" className="fill-amber-700 text-[8px] font-semibold dark:fill-amber-400">
          この 2 つは互いに参照しない
        </text>

        <rect x="10" y="96" width="168" height="84" rx="8" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="94" y="118" textAnchor="middle" className="fill-zinc-700 text-[10px] font-bold dark:fill-zinc-300">インターネット</text>
        <text x="94" y="133" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">誰かの攻撃パケット</text>
        <text x="94" y="152" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">送信元 198.51.100.77</text>
        <text x="94" y="167" textAnchor="middle" className="fill-zinc-800 font-mono text-[8px] font-bold dark:fill-zinc-200">宛先 10.0.0.5:22</text>
        <line x1="178" y1="138" x2="206" y2="138" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />

        <line x1="341" y1="129" x2="359" y2="147" className="stroke-red-500" strokeWidth="2.6" />
        <line x1="359" y1="129" x2="341" y2="147" className="stroke-red-500" strokeWidth="2.6" />

        <rect x="534" y="96" width="156" height="84" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="612" y="120" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">A 社の拠点</text>
        <text x="612" y="138" textAnchor="middle" className="fill-emerald-700 font-mono text-[8px] dark:fill-emerald-400">10.0.0.0/16</text>
        <text x="612" y="158" textAnchor="middle" className="fill-emerald-800 font-mono text-[8px] font-bold dark:fill-emerald-300">10.0.0.5</text>
        <text x="612" y="171" textAnchor="middle" className="fill-emerald-600 text-[8px] dark:fill-emerald-500">狙われたサーバー</text>
        <line x1="494" y1="138" x2="534" y2="138" className="stroke-emerald-500" strokeWidth="2.5" />

        <text x="350" y="264" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          攻撃パケットは PE まで届く。でも「10.0.0.5 に行くにはどこへ送るか」が経路表に無い
        </text>
        <text x="350" y="284" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          捨てているのではなく、行き先が分からずそこで終わる
        </text>
      </svg>
    </div>
  );
}

function SameSegmentDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 292" className="mx-auto w-full">
        <rect x="14" y="52" width="290" height="180" rx="10" className="fill-emerald-50/50 stroke-emerald-400 dark:fill-emerald-950/20 dark:stroke-emerald-700" strokeWidth="1.6" />
        <text x="159" y="76" textAnchor="middle" className="fill-emerald-800 text-[10px] font-bold dark:fill-emerald-300">
          同じセグメント
        </text>
        <text x="159" y="92" textAnchor="middle" className="fill-emerald-700 font-mono text-[9px] dark:fill-emerald-400">
          10.0.1.0/24
        </text>

        <rect x="34" y="112" width="96" height="48" rx="7" className="fill-white stroke-emerald-400 dark:fill-zinc-950 dark:stroke-emerald-700" strokeWidth="1.3" />
        <text x="82" y="132" textAnchor="middle" className="fill-zinc-800 text-[10px] font-bold dark:fill-zinc-200">自分の PC</text>
        <text x="82" y="148" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">10.0.1.5</text>

        <rect x="188" y="112" width="96" height="48" rx="7" className="fill-white stroke-emerald-400 dark:fill-zinc-950 dark:stroke-emerald-700" strokeWidth="1.3" />
        <text x="236" y="132" textAnchor="middle" className="fill-zinc-800 text-[10px] font-bold dark:fill-zinc-200">同僚の PC</text>
        <text x="236" y="148" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">10.0.1.6</text>

        <line x1="130" y1="136" x2="186" y2="136" className="stroke-emerald-500" strokeWidth="2.4" />
        <text x="158" y="180" textAnchor="middle" className="fill-emerald-700 text-[9px] font-bold dark:fill-emerald-400">
          ① そのまま直接届く
        </text>
        <text x="158" y="196" textAnchor="middle" className="fill-emerald-600 text-[8px] dark:fill-emerald-500">
          ルータを通らない
        </text>
        <text x="158" y="216" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">
          宛先の指定に使うのは MAC
        </text>

        <line x1="304" y1="136" x2="336" y2="136" className="stroke-amber-500" strokeWidth="2.4" />
        <rect x="338" y="112" width="78" height="48" rx="7" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="377" y="132" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">ルータ</text>
        <text x="377" y="148" textAnchor="middle" className="fill-amber-700 text-[8px] dark:fill-amber-400">出口</text>
        <line x1="416" y1="136" x2="448" y2="136" className="stroke-amber-500" strokeWidth="2.4" />

        <text x="377" y="180" textAnchor="middle" className="fill-amber-700 text-[9px] font-bold dark:fill-amber-400">
          ② 違う帯なので
        </text>
        <text x="377" y="196" textAnchor="middle" className="fill-amber-700 text-[9px] font-bold dark:fill-amber-400">
          ルータに渡す
        </text>

        <rect x="450" y="52" width="236" height="180" rx="10" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900/60 dark:stroke-zinc-700" strokeWidth="1.6" />
        <text x="568" y="76" textAnchor="middle" className="fill-zinc-700 text-[10px] font-bold dark:fill-zinc-300">
          別のセグメント
        </text>
        <text x="568" y="92" textAnchor="middle" className="fill-zinc-500 font-mono text-[9px] dark:fill-zinc-400">
          10.0.2.0/24
        </text>
        <rect x="490" y="112" width="156" height="48" rx="7" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
        <text x="568" y="132" textAnchor="middle" className="fill-zinc-800 text-[10px] font-bold dark:fill-zinc-200">別拠点のサーバ</text>
        <text x="568" y="148" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">10.0.2.7</text>
        <text x="568" y="196" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">
          直接は届けられない相手
        </text>

        <text x="350" y="266" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          「同じセグメント」＝ ルータを通らずに直接やり取りできる範囲
        </text>
        <text x="350" y="284" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          送る前に毎回、宛先が同じ帯かどうかを判定している
        </text>
      </svg>
    </div>
  );
}

function PerCustomerMacDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 300" className="mx-auto w-full">
        <rect x="190" y="44" width="320" height="196" rx="12" className="fill-amber-50/50 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="350" y="66" textAnchor="middle" className="fill-amber-800 text-[10px] font-semibold dark:fill-amber-300">
          キャリアのスイッチ（物理的には 1 台）
        </text>

        <rect x="206" y="80" width="130" height="148" rx="7" className="fill-white stroke-emerald-400 dark:fill-zinc-950 dark:stroke-emerald-700" strokeWidth="1.3" />
        <text x="271" y="98" textAnchor="middle" className="fill-emerald-800 text-[9px] font-bold dark:fill-emerald-300">A 社用の</text>
        <text x="271" y="111" textAnchor="middle" className="fill-emerald-800 text-[9px] font-bold dark:fill-emerald-300">MAC テーブル</text>
        <text x="271" y="132" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">aa:…:11 → 東京</text>
        <text x="271" y="147" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">aa:…:22 → 大阪</text>
        <line x1="216" y1="158" x2="326" y2="158" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />
        <text x="271" y="175" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">bb:…:ff を検索</text>
        <text x="271" y="192" textAnchor="middle" className="fill-red-600 text-[9px] font-bold dark:fill-red-400">→ 該当なし</text>
        <text x="271" y="208" textAnchor="middle" className="fill-red-500 text-[8px] dark:fill-red-400">B 社の MAC は無い</text>

        <line x1="350" y1="80" x2="350" y2="228" className="stroke-amber-500" strokeWidth="1.6" strokeDasharray="5 3" />

        <rect x="364" y="80" width="130" height="148" rx="7" className="fill-white stroke-blue-400 dark:fill-zinc-950 dark:stroke-blue-700" strokeWidth="1.3" />
        <text x="429" y="98" textAnchor="middle" className="fill-blue-800 text-[9px] font-bold dark:fill-blue-300">B 社用の</text>
        <text x="429" y="111" textAnchor="middle" className="fill-blue-800 text-[9px] font-bold dark:fill-blue-300">MAC テーブル</text>
        <text x="429" y="132" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">bb:…:ff → B 社の拠点</text>
        <line x1="374" y1="158" x2="484" y2="158" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />
        <text x="429" y="177" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">ここには載っている</text>
        <text x="429" y="194" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">でも A 社側からは</text>
        <text x="429" y="208" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">この表を参照しない</text>

        <text x="350" y="236" textAnchor="middle" className="fill-amber-700 text-[8px] font-semibold dark:fill-amber-400">
          入口が A 社の回線なら、見るのは左の表だけ
        </text>

        <rect x="10" y="70" width="168" height="76" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.4" />
        <text x="94" y="92" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">A 社の拠点</text>
        <text x="94" y="108" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">送りたいフレーム</text>
        <text x="94" y="128" textAnchor="middle" className="fill-zinc-800 font-mono text-[8px] font-bold dark:fill-zinc-200">宛先 bb:bb:bb:bb:bb:bb</text>
        <line x1="178" y1="112" x2="206" y2="112" className="stroke-emerald-500" strokeWidth="2" />

        <rect x="10" y="176" width="168" height="60" rx="8" className="fill-emerald-50/60 stroke-emerald-300 dark:fill-emerald-950/20 dark:stroke-emerald-800" strokeWidth="1.3" />
        <text x="94" y="199" textAnchor="middle" className="fill-emerald-800 text-[9px] font-bold dark:fill-emerald-300">A 社の他拠点</text>
        <text x="94" y="216" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">ここにだけ流される</text>
        <line x1="206" y1="206" x2="178" y2="206" className="stroke-emerald-500" strokeWidth="2" strokeDasharray="4 3" />

        <line x1="341" y1="103" x2="359" y2="121" className="stroke-red-500" strokeWidth="2.6" />
        <line x1="359" y1="103" x2="341" y2="121" className="stroke-red-500" strokeWidth="2.6" />

        <rect x="534" y="82" width="156" height="76" rx="8" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.5" />
        <text x="612" y="106" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">B 社の拠点</text>
        <text x="612" y="124" textAnchor="middle" className="fill-blue-700 font-mono text-[8px] dark:fill-blue-400">bb:bb:bb:bb:bb:bb</text>
        <text x="612" y="142" textAnchor="middle" className="fill-red-600 text-[8px] font-bold dark:fill-red-400">ここには出て行かない</text>
        <line x1="494" y1="120" x2="534" y2="120" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="2" strokeDasharray="4 4" />

        <text x="350" y="266" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          知らない MAC 宛なので、A 社のドメインの中にだけ流される
        </text>
        <text x="350" y="284" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          B 社のポートには出て行かず、返事も来ないので永久に学習されない
        </text>
      </svg>
    </div>
  );
}

function FlatSegmentRiskDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 250" className="mx-auto w-full">
        <text x="350" y="24" textAnchor="middle" className="fill-violet-800 text-[11px] font-bold dark:fill-violet-300">
          ③ 広域イーサ — 同じセグメントなので、間に何も無い
        </text>

        <rect x="46" y="40" width="150" height="48" rx="8" className="fill-violet-50 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.5" />
        <text x="121" y="60" textAnchor="middle" className="fill-violet-900 text-[10px] font-bold dark:fill-violet-200">東京の PC</text>
        <text x="121" y="76" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.1.5</text>

        <rect x="504" y="40" width="150" height="48" rx="8" className="fill-violet-50 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.5" />
        <text x="579" y="60" textAnchor="middle" className="fill-violet-900 text-[10px] font-bold dark:fill-violet-200">大阪のサーバ</text>
        <text x="579" y="76" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.1.6</text>

        <line x1="196" y1="64" x2="504" y2="64" className="stroke-red-500" strokeWidth="2.4" />
        <text x="350" y="56" textAnchor="middle" className="fill-red-600 text-[9px] font-bold dark:fill-red-400">
          そのまま直接届く
        </text>
        <text x="350" y="84" textAnchor="middle" className="fill-red-500 text-[9px] font-semibold dark:fill-red-400">
          止める場所が存在しない
        </text>

        <line x1="40" y1="118" x2="660" y2="118" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="350" y="148" textAnchor="middle" className="fill-amber-800 text-[11px] font-bold dark:fill-amber-300">
          ② IP-VPN — 別セグメントなので、必ずルータを通る
        </text>

        <rect x="46" y="164" width="150" height="48" rx="8" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="121" y="184" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">東京の PC</text>
        <text x="121" y="200" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.1.5</text>

        <rect x="308" y="164" width="84" height="48" rx="8" className="fill-emerald-50 stroke-emerald-500 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.7" />
        <text x="350" y="184" textAnchor="middle" className="fill-emerald-900 text-[10px] font-bold dark:fill-emerald-200">ルータ</text>
        <text x="350" y="200" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">/ FW</text>

        <rect x="504" y="164" width="150" height="48" rx="8" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="579" y="184" textAnchor="middle" className="fill-amber-900 text-[10px] font-bold dark:fill-amber-200">大阪のサーバ</text>
        <text x="579" y="200" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.2.7</text>

        <line x1="196" y1="188" x2="306" y2="188" className="stroke-amber-500" strokeWidth="2.4" />
        <line x1="394" y1="188" x2="504" y2="188" className="stroke-amber-500" strokeWidth="2.4" />

        <text x="350" y="234" textAnchor="middle" className="fill-emerald-700 text-[9px] font-bold dark:fill-emerald-400">
          ここでフィルタをかけられる
        </text>
      </svg>
    </div>
  );
}

function GiantSwitchDiagram() {
  const sites = [
    { x: 60, port: 210, name: "東京本社", ip: "10.0.1.5" },
    { x: 265, port: 350, name: "大阪支社", ip: "10.0.1.6" },
    { x: 470, port: 490, name: "名古屋支社", ip: "10.0.1.7" },
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
          3 拠点とも同じ 10.0.1.0/24。呼びかけ (ブロードキャスト) も 3 拠点すべてに届く
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
