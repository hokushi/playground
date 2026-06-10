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
        <SectionH2 id="intro" num={1}>先に結論</SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            VPN = <strong>「仮想的な専用線」</strong>。離れた拠点を「自社の中」みたいに繋ぐ仕組み
          </li>
          <li>
            <strong>道のレベルで違う</strong> 3 タイプがある: <strong>① インターネット VPN</strong> /
            <strong>② IP-VPN (閉域網)</strong> / <strong>③ 広域イーサネット</strong>
          </li>
          <li>
            KDDI の閉域 VPN は <strong>② IP-VPN</strong>。
            ほかに NTT Com の <strong>Arcstar IP-VPN</strong>、ソフトバンクの <strong>SmartVPN</strong> など、各キャリアが同じ系統で出している
          </li>
          <li>
            個人や中小企業がよく使う「Tailscale」「OpenVPN」「会社の SSL-VPN」は <strong>① インターネット VPN</strong> の仲間
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="basics" num={2}>そもそも VPN って何?</SectionH2>
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

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          → 「VPN」と聞いたら <strong>「離れた拠点を 1 つに見せる仕組み」</strong>と覚えれば OK。
          そこから先 (どんな道を使うか / どう仮想化するか) で種類が分かれます。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="types" num={3}>VPN の 3 タイプ (道の違い)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          「どの道を通って繋ぐか」で大きく 3 つに分かれます。
          上ほど安くて手軽、下ほど高くて品質が良い、というイメージ。
        </p>

        <VpnTypesOverview />

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ① 安い・手軽
            </p>
            <h3 className="mt-1 text-sm font-bold text-emerald-900 dark:text-emerald-200">
              インターネット VPN
            </h3>
            <p className="mt-2 text-sm text-emerald-900/90 dark:text-emerald-300">
              <strong>公共のインターネットを暗号化して通す</strong>。
              道は他人と共用だが、中身を読まれないように暗号化で守る。
            </p>
            <p className="mt-2 text-xs text-emerald-900/70 dark:text-emerald-300/80">
              代表: IPsec-VPN / SSL-VPN / WireGuard / OpenVPN / Tailscale
            </p>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 p-4 dark:border-amber-700 dark:bg-amber-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              ② バランス
            </p>
            <h3 className="mt-1 text-sm font-bold text-amber-900 dark:text-amber-200">
              IP-VPN (閉域網)
            </h3>
            <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
              <strong>キャリアの「インターネットじゃない」閉じた網</strong>を借りる。
              他人と物理的には共用だが、論理的に切り分け済みで品質保証あり。
            </p>
            <p className="mt-2 text-xs text-amber-900/70 dark:text-amber-300/80">
              代表: KDDI / NTT Com Arcstar / SoftBank SmartVPN
            </p>
          </div>
          <div className="rounded-lg border-2 border-violet-300 bg-violet-50/40 p-4 dark:border-violet-700 dark:bg-violet-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400">
              ③ 高品質
            </p>
            <h3 className="mt-1 text-sm font-bold text-violet-900 dark:text-violet-200">
              広域イーサネット
            </h3>
            <p className="mt-2 text-sm text-violet-900/90 dark:text-violet-300">
              <strong>キャリアの閉域網だが、もっと「生の LAN」に近い</strong>形で借りる。
              拠点間を「同じスイッチに繋いだみたい」に扱える。
            </p>
            <p className="mt-2 text-xs text-violet-900/70 dark:text-violet-300/80">
              代表: KDDI Powered Ethernet / NTT Com Arcstar Universal One
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            一行で言うと
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>① <strong>インターネット VPN</strong> = 普通の道を <strong>金庫車</strong>で運ぶ (道は混雑)</li>
            <li>② <strong>IP-VPN</strong> = <strong>会員制の専用バス路線</strong>に乗る (道は会員専用)</li>
            <li>③ <strong>広域イーサ</strong> = <strong>各拠点を直結する社内通路</strong>を借りる (もっと生に近い)</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="internet-vpn" num={4}>① インターネット VPN を深掘り</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>「インターネットを使う」</strong>のが最大の特徴。
          安いし、回線さえあればすぐに開通できるが、品質はインターネットの混み具合次第。
        </p>

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
                <td className="px-3 py-2 font-mono text-xs">IPsec</td>
                <td className="px-3 py-2">拠点間 (本社 ⇔ 支社、AWS と本社 など)</td>
                <td className="px-3 py-2">L3 で暗号化、ルータ同士で常時繋ぎっぱなし</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">SSL-VPN</td>
                <td className="px-3 py-2">個人 → 社内 (リモートワーク)</td>
                <td className="px-3 py-2">ブラウザや専用アプリで都度接続。FortiGate などで提供</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">WireGuard</td>
                <td className="px-3 py-2">拠点間 / 個人どちらも</td>
                <td className="px-3 py-2">2020 年代の新世代、設定が単純で速い</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">OpenVPN</td>
                <td className="px-3 py-2">個人 / 中小企業</td>
                <td className="px-3 py-2">SSL ベース、無料の OSS 実装が広く使われている</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs">Tailscale</td>
                <td className="px-3 py-2">個人 / 小規模チーム</td>
                <td className="px-3 py-2">WireGuard ベース。アカウント認証だけで P2P に繋がる</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            ◯ メリット
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
            <li>・<strong>安い</strong> (インターネット回線 + ルータがあれば OK)</li>
            <li>・<strong>すぐ開通</strong>できる (キャリアの工事不要)</li>
            <li>・<strong>世界中どこからでも</strong>繋がる (海外拠点・在宅ワークと相性◎)</li>
          </ul>
          <p className="mt-3 text-sm font-medium text-emerald-900 dark:text-emerald-200">
            ✕ デメリット
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
            <li>・<strong>速度・遅延が安定しない</strong> (インターネットの混雑に左右される)</li>
            <li>・<strong>暗号化処理</strong>でルータの負荷が増える</li>
            <li>・SLA (品質保証) は基本なし</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="ip-vpn" num={5}>② IP-VPN (閉域網) を深掘り — KDDI / NTT が出してるアレ</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>「キャリアが用意した、インターネットとは別の閉じた網」</strong>を借りる方式。
          いわゆる <strong>閉域網 VPN</strong>。中身は <strong>MPLS</strong> という技術で
          「お客さんごとに論理的に切り分け」されています。
        </p>

        <ClosedNetworkDiagram />

        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            ポイント: なぜ「閉域」と言えるのか
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            物理的にはキャリアの 1 本の網を <strong>多くの会社が共用</strong>しているけど、
            <strong>MPLS</strong> という技術で <strong>会社ごとにラベルを付けて</strong>振り分けるので、
            他社のトラフィックが自社のネットワークに混ざることはありません。
            <strong>インターネット (全世界に開かれた網)</strong>とは
            <strong>物理的に別の網</strong>になっているため、外部からのアクセス自体が物理的に届かない、というのが安心ポイント。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          日本の主要 IP-VPN サービス
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
                <td className="px-3 py-2 font-mono text-xs">KDDI Wide Area Virtual Switch / Powered Ethernet</td>
                <td className="px-3 py-2">IP-VPN と広域イーサを統合的に提供。法人で広く普及</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">NTT Com</td>
                <td className="px-3 py-2 font-mono text-xs">Arcstar IP-VPN / Arcstar Universal One</td>
                <td className="px-3 py-2">国内最大手。海外拠点との接続にも強い</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">SoftBank</td>
                <td className="px-3 py-2 font-mono text-xs">SmartVPN</td>
                <td className="px-3 py-2">中小企業向けに価格を抑えたプランあり</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">楽天 / IIJ など</td>
                <td className="px-3 py-2 font-mono text-xs">各種</td>
                <td className="px-3 py-2">2 次キャリア / プロバイダ系もあり</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            ◯ メリット
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
            <li>・<strong>SLA (品質保証)</strong> が付く (速度・遅延・稼働率)</li>
            <li>・<strong>外からインターネット越しに到達できない</strong> → セキュリティ高い</li>
            <li>・暗号化処理不要 → ルータの負荷が軽い</li>
          </ul>
          <p className="mt-3 text-sm font-medium text-emerald-900 dark:text-emerald-200">
            ✕ デメリット
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-300">
            <li>・<strong>高い</strong> (月額数万円〜十数万円 / 拠点)</li>
            <li>・<strong>開通までキャリアの工事</strong>が必要 (数週間〜数ヶ月)</li>
            <li>・原則 <strong>国内の固定拠点</strong>向け (在宅勤務には不向き)</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="ether" num={6}>③ 広域イーサネット との違い</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>「閉域網を借りる」ところは IP-VPN と同じ</strong>。
          違うのは「<strong>どのレイヤで繋がっているか</strong>」。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 p-4 dark:border-amber-700 dark:bg-amber-950/30">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              IP-VPN は L3 (IP) でつなぐ
            </h3>
            <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
              キャリアの網側がルーティングをやる。<strong>IPv4 のみ</strong>などプロトコルに制約あり。
              <strong>シンプルで管理しやすい</strong>。
            </p>
            <p className="mt-2 text-xs text-amber-900/70 dark:text-amber-300/80">
              → 普通の企業の拠点間接続はだいたいこれで十分
            </p>
          </div>
          <div className="rounded-lg border-2 border-violet-300 bg-violet-50/40 p-4 dark:border-violet-700 dark:bg-violet-950/30">
            <h3 className="text-sm font-bold text-violet-900 dark:text-violet-200">
              広域イーサは L2 (Ethernet) でつなぐ
            </h3>
            <p className="mt-2 text-sm text-violet-900/90 dark:text-violet-300">
              <strong>各拠点を 1 つのスイッチに繋いだ</strong>みたいに見える。
              IPv6 / マルチキャストなど <strong>何でも流せる</strong>。自由度が高い。
            </p>
            <p className="mt-2 text-xs text-violet-900/70 dark:text-violet-300/80">
              → データセンター間や、独自プロトコルを使う特殊用途
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            一言で言うと、<strong>「IP-VPN ≒ 拠点間ルーティング込み」「広域イーサ ≒ 拠点間に長いケーブル 1 本」</strong>。
            自由度を取るか、管理の楽さを取るか、の違いです。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="aws" num={7}>AWS との関係</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          AWS にもオンプレ (社内ネットワーク) と繋ぐ手段が用意されていて、
          上の 3 タイプとほぼ <strong>同じ思想</strong>のサービスが並んでいます。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              ① と同じ思想
            </p>
            <h3 className="mt-1 text-sm font-bold text-emerald-900 dark:text-emerald-200">
              Site-to-Site VPN (IPsec)
            </h3>
            <p className="mt-2 text-sm text-emerald-900/90 dark:text-emerald-300">
              社内ルータと AWS の VGW を <strong>インターネット越しに IPsec で繋ぐ</strong>。
              安い・すぐ開通・回線品質はインターネット次第。
            </p>
          </div>
          <div className="rounded-lg border-2 border-violet-300 bg-violet-50/40 p-4 dark:border-violet-700 dark:bg-violet-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-400">
              ②③ と同じ思想
            </p>
            <h3 className="mt-1 text-sm font-bold text-violet-900 dark:text-violet-200">
              Direct Connect (専用接続)
            </h3>
            <p className="mt-2 text-sm text-violet-900/90 dark:text-violet-300">
              データセンターから AWS まで <strong>専用回線</strong>を引く。
              高品質・低遅延・大容量。KDDI / NTT Com 経由で申し込むのが普通。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            よくある構成: ハイブリッド
          </p>
          <p className="mt-2 text-sm text-blue-900/90 dark:text-blue-300">
            実務では <strong>「メインは Direct Connect、バックアップに Site-to-Site VPN」</strong>という
            冗長構成が定番。Direct Connect は工事が長く、切れた時に止まると痛いので、
            <strong>すぐに張れる IPsec VPN を予備に</strong>持っておく ── という発想です。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="usecase" num={8}>使い分けのまとめ</SectionH2>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">シーン</th>
                <th className="px-3 py-2 text-left font-semibold">推奨</th>
                <th className="px-3 py-2 text-left font-semibold">理由</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2">在宅勤務 (個人 → 会社)</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">SSL-VPN (① の仲間)</td>
                <td className="px-3 py-2 text-xs">PC からブラウザ / アプリで都度接続</td>
              </tr>
              <tr>
                <td className="px-3 py-2">小規模オフィス (2〜3 拠点)</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">インターネット VPN (IPsec)</td>
                <td className="px-3 py-2 text-xs">コスト最優先、品質は気にしないなら十分</td>
              </tr>
              <tr>
                <td className="px-3 py-2">本社 + 全国支社 (品質重視)</td>
                <td className="px-3 py-2 text-amber-700 dark:text-amber-400">IP-VPN</td>
                <td className="px-3 py-2 text-xs">SLA あり、業務システムが安定する</td>
              </tr>
              <tr>
                <td className="px-3 py-2">データセンター間 (大量データ)</td>
                <td className="px-3 py-2 text-violet-700 dark:text-violet-400">広域イーサ / 専用線</td>
                <td className="px-3 py-2 text-xs">L2 接続・帯域占有が必要なケース</td>
              </tr>
              <tr>
                <td className="px-3 py-2">AWS と社内システム連携</td>
                <td className="px-3 py-2 text-blue-700 dark:text-blue-400">Direct Connect + VPN 冗長</td>
                <td className="px-3 py-2 text-xs">本線専用、バックアップに IPsec</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            判断軸 (3 つだけ)
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>① <strong>コスト</strong> → 安いのは ①インターネット VPN、高いのは ③ 専用線</li>
            <li>② <strong>品質 (SLA / 遅延)</strong> → ②③ が強い、① は不安定</li>
            <li>③ <strong>柔軟性</strong> → 在宅 / 海外なら ①、固定拠点なら ②③</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="related" num={9}>関連</SectionH2>
        <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            ・<a href="/network/firewall" className="text-indigo-600 underline hover:text-indigo-700 dark:text-indigo-400">
              ファイアウォール / FortiGate
            </a>{" "}
            — VPN ルータとファイアウォールは UTM 機器に統合されることが多い
          </li>
          <li>
            ・<a href="/network/layers" className="text-indigo-600 underline hover:text-indigo-700 dark:text-indigo-400">
              ネットワークの 7 層 (OSI)
            </a>{" "}
            — IP-VPN は L3、広域イーサは L2 で繋ぐ。レイヤの理解があると違いが分かりやすい
          </li>
          <li>
            ・<a href="/network/internet" className="text-indigo-600 underline hover:text-indigo-700 dark:text-indigo-400">
              インターネットの裏側
            </a>{" "}
            — そもそも「インターネット」と「閉域網」が何で違うのか
          </li>
        </ul>
      </section>
    </main>
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

function VpnTypesOverview() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 320" className="mx-auto w-full max-w-2xl">
        <rect x="40" y="20" width="220" height="50" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="150" y="42" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">公共インターネット</text>
        <text x="150" y="58" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">(誰でも使う)</text>

        <rect x="340" y="20" width="220" height="50" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="450" y="42" textAnchor="middle" className="fill-amber-900 text-xs font-semibold dark:fill-amber-200">キャリアの閉域網</text>
        <text x="450" y="58" textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-400">(契約者専用)</text>

        <text x="150" y="105" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">① インターネット VPN</text>
        <line x1="40" y1="120" x2="260" y2="120" className="stroke-emerald-500" strokeWidth="3" />
        <text x="150" y="138" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">暗号化トンネル</text>
        <text x="150" y="153" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">混雑する道を暗号化で守る</text>

        <text x="450" y="180" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">② IP-VPN (L3)</text>
        <line x1="340" y1="195" x2="560" y2="195" className="stroke-amber-500" strokeWidth="3" />
        <text x="450" y="213" textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-400">MPLS で論理分離</text>
        <text x="450" y="228" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">L3 (IP) で拠点間ルーティング</text>

        <text x="450" y="255" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">③ 広域イーサ (L2)</text>
        <line x1="340" y1="270" x2="560" y2="270" className="stroke-violet-500" strokeWidth="3" />
        <text x="450" y="288" textAnchor="middle" className="fill-violet-700 text-[10px] dark:fill-violet-400">L2 (Ethernet) で直結</text>
        <text x="450" y="303" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">何でも流せる / 自由度高</text>

        <text x="300" y="318" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          ① は公共インターネット、②③ はキャリアの閉域網を借りる
        </text>
      </svg>
    </div>
  );
}

function ClosedNetworkDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 280" className="mx-auto w-full max-w-2xl">
        <rect x="180" y="20" width="240" height="120" rx="10" className="fill-amber-50/60 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700" strokeWidth="1.5" strokeDasharray="6 4" />
        <text x="300" y="40" textAnchor="middle" className="fill-amber-900 text-xs font-semibold dark:fill-amber-200">キャリアの閉域網 (MPLS)</text>

        <circle cx="240" cy="80" r="14" className="fill-amber-200 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.2" />
        <text x="240" y="84" textAnchor="middle" className="fill-amber-900 text-[9px] font-bold dark:fill-amber-200">PE</text>
        <circle cx="300" cy="105" r="14" className="fill-amber-200 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.2" />
        <text x="300" y="109" textAnchor="middle" className="fill-amber-900 text-[9px] font-bold dark:fill-amber-200">P</text>
        <circle cx="360" cy="80" r="14" className="fill-amber-200 stroke-amber-500 dark:fill-amber-900/40 dark:stroke-amber-600" strokeWidth="1.2" />
        <text x="360" y="84" textAnchor="middle" className="fill-amber-900 text-[9px] font-bold dark:fill-amber-200">PE</text>

        <line x1="252" y1="86" x2="290" y2="100" className="stroke-amber-500" strokeWidth="1.5" />
        <line x1="310" y1="100" x2="350" y2="86" className="stroke-amber-500" strokeWidth="1.5" />

        <text x="300" y="135" textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-400">ラベルで会社ごとに振り分け</text>

        <g>
          <rect x="20" y="170" width="100" height="50" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.4" />
          <text x="70" y="192" textAnchor="middle" className="fill-emerald-900 text-[11px] font-semibold dark:fill-emerald-200">A 社 本社</text>
          <text x="70" y="208" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">東京</text>
        </g>
        <line x1="120" y1="195" x2="226" y2="92" className="stroke-emerald-500" strokeWidth="2" />

        <g>
          <rect x="160" y="220" width="100" height="50" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.4" />
          <text x="210" y="242" textAnchor="middle" className="fill-emerald-900 text-[11px] font-semibold dark:fill-emerald-200">A 社 支社</text>
          <text x="210" y="258" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">大阪</text>
        </g>
        <line x1="240" y1="220" x2="296" y2="119" className="stroke-emerald-500" strokeWidth="2" />

        <g>
          <rect x="340" y="220" width="100" height="50" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
          <text x="390" y="242" textAnchor="middle" className="fill-blue-900 text-[11px] font-semibold dark:fill-blue-200">B 社 本社</text>
          <text x="390" y="258" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">名古屋</text>
        </g>
        <line x1="370" y1="220" x2="306" y2="119" className="stroke-blue-500" strokeWidth="2" />

        <g>
          <rect x="480" y="170" width="100" height="50" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
          <text x="530" y="192" textAnchor="middle" className="fill-blue-900 text-[11px] font-semibold dark:fill-blue-200">B 社 支社</text>
          <text x="530" y="208" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">福岡</text>
        </g>
        <line x1="480" y1="195" x2="374" y2="92" className="stroke-blue-500" strokeWidth="2" />

        <text x="100" y="170" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">A 社の通信</text>
        <text x="450" y="170" textAnchor="end" className="fill-blue-700 text-[10px] font-semibold dark:fill-blue-400">B 社の通信</text>
      </svg>
      <p className="mt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
        同じ閉域網だが、A 社と B 社は <strong>論理的に完全分離</strong>。お互いの通信は見えない
      </p>
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
    { id: "basics", num: 2, title: "そもそも VPN って?" },
    { id: "types", num: 3, title: "VPN の 3 タイプ" },
    { id: "internet-vpn", num: 4, title: "① インターネット VPN" },
    { id: "ip-vpn", num: 5, title: "② IP-VPN (閉域網)" },
    { id: "ether", num: 6, title: "③ 広域イーサとの違い" },
    { id: "aws", num: 7, title: "AWS との関係" },
    { id: "usecase", num: 8, title: "使い分けまとめ" },
    { id: "related", num: 9, title: "関連" },
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
