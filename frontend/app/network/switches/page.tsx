export default function SwitchesPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          L2 スイッチ と L3 スイッチ
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          社内 LAN の配線が集まる箱。<strong>何を見て仕分けているか</strong>で L2 と L3 に分かれます。
          あわせて、スイッチの<strong>ポート (ケーブルを挿す穴)</strong> の種類と役割を整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>L2 スイッチ</strong> = <strong>MAC アドレス</strong>を見て、
            <strong>同じネットワークの中</strong>で荷物を正しい口に出す
          </li>
          <li>
            <strong>L3 スイッチ</strong> = L2 スイッチの仕事 ＋ <strong>IP アドレス</strong>を見て
            <strong>別のネットワーク (VLAN) へ中継する</strong>
          </li>
          <li>
            スイッチのポートは<strong>物理的な穴</strong> (<span className="font-mono text-sm">gi0/1</span> など)。
            443 のような<strong>ポート番号とは別物</strong>
          </li>
          <li>
            ポートの役割で一番大事なのは
            <strong>アクセスポート (VLAN 1 つ・端末向け)</strong> と
            <strong>トランクポート (VLAN 複数・スイッチ間)</strong> の違い
          </li>
        </ul>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold">見ているもの</th>
                <th className="px-3 py-2 text-left font-semibold">できること</th>
                <th className="px-3 py-2 text-left font-semibold">たとえ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">L2 スイッチ</td>
                <td className="px-3 py-2">MAC アドレス</td>
                <td className="px-3 py-2">同じネットワーク内の仕分け</td>
                <td className="px-3 py-2">フロア内の仕分け係</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">L3 スイッチ</td>
                <td className="px-3 py-2">MAC ＋ <strong>IP アドレス</strong></td>
                <td className="px-3 py-2">上に加えて、<strong>ネットワーク間の中継</strong></td>
                <td className="px-3 py-2">建物全体の仕分け係</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="switch" num={2}>
          そもそもスイッチとは
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          LAN ケーブルをたくさん挿せる箱です。届いたデータを見て、
          <strong>宛先がつながっている口にだけ</strong>出します。
          昔の<strong>ハブ</strong>は、届いたデータを<strong>全部の口にそのまま流していました</strong>。
        </p>

        <HubVsSwitchDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          スイッチは宛先を見分けるので、<strong>無駄な通信が減り、関係ない人に見られにくく</strong>なります。
          今の社内 LAN で使われているのはスイッチです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="l2" num={3}>
          L2 スイッチ: MAC アドレスで仕分ける
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>MAC アドレス</strong>は、PC やプリンタのネットワーク部品に
          <strong>工場出荷時から付いている番号</strong>です
          (<span className="font-mono text-sm">a4:83:e7:12:34:56</span> など)。
          L2 スイッチは<strong>「どのポートの先に、どの MAC がいるか」</strong>の表を自分で作ります。
        </p>

        <MacTableDiagram />

        <ol className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>1.</strong> データが届いたら、<strong>送信元の MAC と、それが来たポート</strong>を表に書き込む
            (自動で覚える。設定は要らない)
          </li>
          <li>
            <strong>2.</strong> <strong>宛先の MAC</strong> を表で探し、見つかればそのポートにだけ出す
          </li>
          <li>
            <strong>3.</strong> 表にない宛先や、全員あての通信 (ブロードキャスト) は
            <strong>全ポートに</strong>出す
          </li>
        </ol>

        <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 px-5 py-4 dark:border-amber-700 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            L2 スイッチは IP アドレスを見ていない
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            表にあるのは<strong>ポートと MAC だけ</strong>です。
            だから L2 スイッチだけでは<strong>別のネットワークには行けません</strong>。
            それをやるのが次の L3 スイッチです。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="l3" num={4}>
          L3 スイッチ: IP を見て別のネットワークへ
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          L3 スイッチは <strong>L2 スイッチの機能 ＋ ルーティング</strong>です。
          宛先が同じネットワークなら L2 スイッチと同じく MAC で仕分け、
          <strong>別のネットワークなら IP を見て中継します</strong>。
        </p>
        <ul className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            ・VLAN ごとに<strong>ゲートウェイの IP</strong> を持つ
            (例: VLAN 10 は <span className="font-mono">192.168.10.1</span>、VLAN 20 は{" "}
            <span className="font-mono">192.168.20.1</span>)
          </li>
          <li>
            ・PC の設定にある<strong>「デフォルトゲートウェイ」</strong>が、この IP
          </li>
          <li>
            ・1 台で IP を複数持てる仕組み (SVI) は{" "}
            <a
              href="/network/two-sites"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              2 拠点の構成
            </a>
            で詳しく扱っています
          </li>
        </ul>

        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          ルーターとの違い
        </p>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold">L3 スイッチ</th>
                <th className="px-3 py-2 text-left font-semibold">ルーター / FortiGate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">置き場所</td>
                <td className="px-3 py-2">社内 LAN の中心</td>
                <td className="px-3 py-2">インターネットとの出入口</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">得意なこと</td>
                <td className="px-3 py-2">社内 VLAN 同士の<strong>大量の中継を高速に</strong></td>
                <td className="px-3 py-2">NAT、VPN、プロバイダとの接続、細かい通信制御</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">ポート数</td>
                <td className="px-3 py-2">多い (24 口 / 48 口)</td>
                <td className="px-3 py-2">少なめ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <strong>「社内の中継は L3 スイッチ、外との出入口はルーターやファイアウォール」</strong>
          と役割を分けるのが一般的です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="mac-ip" num={5}>
          MAC と IP の役割分担
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          データには <strong>MAC と IP の両方</strong>が書かれています。
          役割が違うので、<strong>ネットワークを越えるときの扱いも違います</strong>。
        </p>

        <MacIpRelayDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              MAC = 次に手渡す相手 (L2)
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              <strong>区間ごとに付け替えます</strong>。
              同じネットワークの中で「隣の誰に渡すか」だけを表します。
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              IP = 最終的な宛先の住所 (L3)
            </p>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              <strong>最後まで変わりません</strong>。
              L3 スイッチはこれを見て、次にどのネットワークへ出すかを決めます。
            </p>
          </div>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          同じネットワークの中は L2 (MAC) だけで届き、
          <strong>ネットワークをまたぐときだけ L3 (IP) の出番</strong>になります。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="vlan" num={6}>
          VLAN: 1 台のスイッチを仮想的に分ける
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          1 台のスイッチを「VLAN 10 = 事務」「VLAN 20 = サーバ」のように、
          <strong>別々のネットワークとして扱う設定</strong>です。
          ケーブルを分けなくても、ポートごとに番号を付けるだけで分けられます。
        </p>

        <VlanSplitDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              同じ VLAN どうし
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>L2 だけで直接</strong>通信できる。L3 スイッチまで上がらない。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              違う VLAN どうし
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              L2 ではつながらない。<strong>必ず L3 スイッチを経由</strong>する。
            </p>
          </div>
        </div>
        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          なぜわざわざ分けるのか
        </h3>

        <VlanWhyDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              ① 全員あての通信が届く範囲を狭くできる
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              PC は「この IP の人いますか?」のような<strong>全員あての通信 (ブロードキャスト)</strong> を
              よく出します。分けないと<strong>全台に届き</strong>、台数が増えるほど混雑します。
              VLAN で分ければ<strong>同じ VLAN の中にしか届きません</strong>。
            </p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              ② VLAN をまたぐ通信を L3 スイッチで選別できる
            </p>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              違う VLAN どうしは<strong>必ず L3 スイッチを通る</strong>ので、
              そこに<strong>「事務 → サーバは通す、来客 Wi-Fi → サーバは止める」</strong>
              というルールを置けます。関所が 1 か所にまとまるイメージです。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="ports" num={7}>
          スイッチのポートの種類
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここでいうポートは<strong>ケーブルを挿す物理的な穴</strong>です。
          443 や 3000 のような<strong>ポート番号 (通信につける番号) とは別物</strong>で、
          「<strong>ケーブルを挿せるなら物理ポート</strong>」と覚えると迷いません。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          アクセスポート と トランクポート
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ポートの設定で一番大事なのがこの 2 つです。
          <strong>何をつなぐか</strong>で決まります。
        </p>

        <TrunkDiagram />

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold">アクセスポート</th>
                <th className="px-3 py-2 text-left font-semibold">トランクポート</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">通す VLAN</td>
                <td className="px-3 py-2"><strong>1 つだけ</strong></td>
                <td className="px-3 py-2"><strong>複数</strong></td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">つなぐ相手</td>
                <td className="px-3 py-2">PC・プリンタ・無線 AP などの<strong>端末</strong></td>
                <td className="px-3 py-2"><strong>スイッチどうし</strong> (L2 ↔ L3 など)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">VLAN のタグ</td>
                <td className="px-3 py-2">付けない (端末は VLAN を知らない)</td>
                <td className="px-3 py-2"><strong>付ける</strong> (802.1Q タグ)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            タグ = 「私は VLAN 10 です」という付箋
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            スイッチ間は<strong>1 本のケーブルで複数の VLAN を運ぶ</strong>ので、
            データに付箋を付けて区別します。端末に渡すときは付箋を外すので、
            <strong>PC は自分がどの VLAN にいるかを知りません</strong>。
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            なお、トランクで<strong>タグを付けずに流す VLAN</strong> を
            <strong>ネイティブ VLAN</strong> と呼びます。
            両側のスイッチで設定が食い違うとトラブルの元になるので、そろえておくのが基本です。
          </p>
        </div>

      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="flow" num={8}>
          通信の流れ: 同じ VLAN と違う VLAN
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここまでの話を、実際の通信 2 パターンで通して見ます。
        </p>

        <VlanFlowDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ① PC-A → プリンタ (同じ VLAN 10)
            </p>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              L2 スイッチが MAC を見て渡すだけ。
              <strong>L3 スイッチまで上がりません</strong>。
            </p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              ② PC-A → サーバ (VLAN 10 → 20)
            </p>
            <ol className="mt-2 flex flex-col gap-1 text-sm text-rose-900/80 dark:text-rose-300">
              <li>
                1. PC-A が「宛先は別のネットワーク」と判断し、
                ゲートウェイ <span className="font-mono text-xs">192.168.10.1</span> (L3 スイッチ) に送る
              </li>
              <li>2. L3 スイッチが宛先 IP を見て、VLAN 20 側へ中継する</li>
              <li>3. VLAN 20 の L2 スイッチを通って、サーバに届く</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="related" num={9}>
          関連ページ
        </SectionH2>
        <ul className="ml-5 flex list-disc flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <li>
            <a
              href="/network/layers"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ネットワークの 7 層 (OSI)
            </a>
            {" "}── L2 と L3 が何を担当しているか
          </li>
          <li>
            <a
              href="/network/two-sites"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              2 拠点・セグメント分割と共通 L3
            </a>
            {" "}── SVI と、ポート・VLAN・IP の関係を実際の構成で
          </li>
          <li>
            <a
              href="/network/firewall"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ファイアウォール / FortiGate
            </a>
            {" "}── L3 スイッチの上に立つ出入口
          </li>
          <li>
            <a
              href="/network/ping"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ping で疎通を確かめる
            </a>
            {" "}── 繋がらないときの最初の確認
          </li>
        </ul>
      </section>
    </main>
  );
}

function HubVsSwitchDiagram() {
  const sides = [
    { dx: 0, title: "ハブ (昔): 全員に流す", box: "ハブ", caption: "関係ない PC にも届いてしまう", flood: true },
    { dx: 330, title: "スイッチ: 宛先にだけ出す", box: "スイッチ", caption: "宛先を覚えているので無駄がない", flood: false },
  ];
  const pcs = [
    { cx: 60, name: "PC-A", sub: "送信" },
    { cx: 130, name: "PC-B", sub: "" },
    { cx: 200, name: "PC-C", sub: "宛先" },
    { cx: 270, name: "PC-D", sub: "" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 240" className="mx-auto w-full max-w-2xl">
        <line x1="330" y1="16" x2="330" y2="220" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />
        {sides.map((s) => (
          <g key={s.box} transform={`translate(${s.dx} 0)`}>
            <text x="165" y="26" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
              {s.title}
            </text>
            <rect x="95" y="48" width="140" height="40" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
            <text x="165" y="73" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
              {s.box}
            </text>

            <line x1="60" y1="150" x2="118" y2="92" className="stroke-blue-500" strokeWidth="2" markerEnd="url(#hs-arrow-blue)" />

            {pcs.slice(1).map((pc, i) => {
              const hit = pc.name === "PC-C";
              if (!s.flood && !hit) return null;
              return (
                <line
                  key={pc.name}
                  x1={150 + i * 25}
                  y1="88"
                  x2={pc.cx}
                  y2="146"
                  className={hit ? "stroke-emerald-500" : "stroke-rose-400"}
                  strokeWidth="2"
                  strokeDasharray={hit ? undefined : "5 3"}
                  markerEnd={hit ? "url(#hs-arrow-green)" : "url(#hs-arrow-rose)"}
                />
              );
            })}

            {pcs.map((pc) => (
              <g key={pc.name}>
                <rect
                  x={pc.cx - 30}
                  y="150"
                  width="60"
                  height="38"
                  rx="5"
                  className={
                    pc.name === "PC-C"
                      ? "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
                      : "fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700"
                  }
                  strokeWidth="1.3"
                />
                <text x={pc.cx} y={pc.sub ? 166 : 173} textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
                  {pc.name}
                </text>
                {pc.sub && (
                  <text x={pc.cx} y="180" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-400">
                    {pc.sub}
                  </text>
                )}
              </g>
            ))}

            <text
              x="165"
              y="214"
              textAnchor="middle"
              className={`text-[10px] font-semibold ${s.flood ? "fill-rose-700 dark:fill-rose-400" : "fill-emerald-700 dark:fill-emerald-400"}`}
            >
              {s.caption}
            </text>
          </g>
        ))}

        <defs>
          <marker id="hs-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
          </marker>
          <marker id="hs-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="hs-arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-400" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function MacTableDiagram() {
  const rows = [
    { port: "gi0/1", mac: "a4:83:e7:12:34:56", name: "PC-A", cx: 85 },
    { port: "gi0/2", mac: "3c:22:fb:aa:bb:cc", name: "プリンタ", cx: 180 },
    { port: "gi0/3", mac: "5e:10:9a:00:00:01", name: "PC-B", cx: 275 },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 250" className="mx-auto w-full max-w-2xl">
        <rect x="25" y="30" width="310" height="70" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="40" y="50" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          L2 スイッチ
        </text>

        {rows.map((r) => (
          <g key={r.port}>
            <rect x={r.cx - 28} y="64" width="56" height="22" rx="3" className="fill-white stroke-zinc-500 dark:fill-zinc-950 dark:stroke-zinc-500" strokeWidth="1.1" />
            <text x={r.cx} y="79" textAnchor="middle" className="fill-zinc-700 font-mono text-[9px] dark:fill-zinc-300">
              {r.port}
            </text>
            <line x1={r.cx} y1="86" x2={r.cx} y2="150" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
            <rect x={r.cx - 45} y="150" width="90" height="48" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
            <text x={r.cx} y="170" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
              {r.name}
            </text>
            <text x={r.cx} y="188" textAnchor="middle" className="fill-amber-700 font-mono text-[8px] dark:fill-amber-400">
              {r.mac}
            </text>
          </g>
        ))}

        <line x1="337" y1="65" x2="372" y2="65" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#mt-arrow)" />

        <rect x="375" y="30" width="265" height="168" rx="8" className="fill-amber-50/60 stroke-amber-300 dark:fill-amber-950/20 dark:stroke-amber-800" strokeWidth="1.3" />
        <text x="507" y="52" textAnchor="middle" className="fill-amber-900 text-[11px] font-semibold dark:fill-amber-200">
          MAC アドレステーブル
        </text>
        <text x="507" y="67" textAnchor="middle" className="fill-amber-700 text-[9px] dark:fill-amber-400">
          届いたデータから自動で覚える
        </text>
        <text x="390" y="92" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">
          ポート
        </text>
        <text x="440" y="92" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-400">
          MAC アドレス
        </text>
        <text x="585" y="92" className="fill-zinc-400 text-[8px] dark:fill-zinc-500">
          (説明用)
        </text>
        <text x="390" y="190" className="fill-zinc-500 text-[8px] dark:fill-zinc-400">
          ※ 右端の名前は説明のために書いたもの。スイッチは名前を知らない
        </text>
        {rows.map((r, i) => {
          const y = 114 + i * 24;
          return (
            <g key={`t-${r.port}`}>
              <line x1="385" y1={y - 16} x2="630" y2={y - 16} className="stroke-amber-200 dark:stroke-amber-900" strokeWidth="1" />
              <text x="390" y={y} className="fill-zinc-700 font-mono text-[9px] dark:fill-zinc-300">
                {r.port}
              </text>
              <text x="440" y={y} className="fill-amber-800 font-mono text-[9px] dark:fill-amber-300">
                {r.mac}
              </text>
              <text x="585" y={y} className="fill-zinc-400 text-[9px] dark:fill-zinc-500">
                {`= ${r.name}`}
              </text>
            </g>
          );
        })}

        <text x="330" y="236" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          表にあるのはポートと MAC だけ。IP アドレスは見ていない
        </text>

        <defs>
          <marker id="mt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function MacIpRelayDiagram() {
  const nodes = [
    { cx: 70, name: "PC-A", sub: "192.168.10.11", tone: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" },
    { cx: 350, name: "L3 スイッチ", sub: "ゲートウェイ", tone: "fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" },
    { cx: 630, name: "サーバ", sub: "192.168.20.5", tone: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" },
  ];
  const hops = [
    { x: 130, title: "区間 1 (VLAN 10)", mac: "L3 スイッチ" },
    { x: 410, title: "区間 2 (VLAN 20)", mac: "サーバ" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 262" className="mx-auto w-full max-w-2xl">
        {nodes.map((n) => (
          <g key={n.name}>
            <rect x={n.cx - 55} y="40" width="110" height="56" rx="8" className={n.tone} strokeWidth="1.5" />
            <text x={n.cx} y="64" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
              {n.name}
            </text>
            <text x={n.cx} y="82" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">
              {n.sub}
            </text>
          </g>
        ))}

        <line x1="127" y1="68" x2="291" y2="68" className="stroke-zinc-500" strokeWidth="2" markerEnd="url(#mi-arrow)" />
        <line x1="407" y1="68" x2="571" y2="68" className="stroke-zinc-500" strokeWidth="2" markerEnd="url(#mi-arrow)" />

        {hops.map((h) => (
          <g key={h.title}>
            <rect x={h.x} y="112" width="160" height="80" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.2" />
            <text x={h.x + 12} y="132" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
              {h.title}
            </text>
            <text x={h.x + 12} y="154" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-400">
              {`宛先 MAC: ${h.mac}`}
            </text>
            <text x={h.x + 12} y="176" className="fill-blue-700 text-[10px] font-semibold dark:fill-blue-400">
              宛先 IP: 192.168.20.5
            </text>
          </g>
        ))}

        <text x="350" y="222" textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-400">
          MAC (次に手渡す相手) は区間ごとに付け替える
        </text>
        <text x="350" y="242" textAnchor="middle" className="fill-blue-700 text-[10px] dark:fill-blue-400">
          IP (最終的な宛先) は最後まで同じ
        </text>

        <defs>
          <marker id="mi-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function VlanSplitDiagram() {
  const ports = Array.from({ length: 8 }, (_, i) => ({ x: 36 + i * 31, vlan: (i < 4 ? 10 : 20) as 10 | 20 }));
  const tone = {
    10: {
      box: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700",
      port: "fill-blue-200 stroke-blue-500 dark:fill-blue-900 dark:stroke-blue-500",
      text: "fill-blue-800 dark:fill-blue-300",
      line: "stroke-blue-400 dark:stroke-blue-600",
    },
    20: {
      box: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700",
      port: "fill-emerald-200 stroke-emerald-500 dark:fill-emerald-900 dark:stroke-emerald-500",
      text: "fill-emerald-800 dark:fill-emerald-300",
      line: "stroke-emerald-400 dark:stroke-emerald-600",
    },
  } as const;
  const groups = [
    { vlan: 10, cx: 425, name: "VLAN 10 のスイッチ", devices: ["事務 PC", "事務 PC"] },
    { vlan: 20, cx: 585, name: "VLAN 20 のスイッチ", devices: ["サーバ", "サーバ"] },
  ] as const;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 300" className="mx-auto w-full max-w-2xl">
        <text x="155" y="24" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          見た目: スイッチは 1 台
        </text>
        <rect x="20" y="84" width="270" height="72" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="34" y="104" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          物理スイッチ
        </text>
        {ports.map((p, i) => (
          <g key={p.x}>
            <rect x={p.x} y="120" width="24" height="20" rx="2" className={tone[p.vlan].port} strokeWidth="1" />
            <text x={p.x + 12} y="134" textAnchor="middle" className="fill-zinc-700 text-[8px] dark:fill-zinc-200">
              {i + 1}
            </text>
          </g>
        ))}
        <line x1="36" y1="170" x2="129" y2="170" className={tone[10].line} strokeWidth="3" />
        <line x1="160" y1="170" x2="253" y2="170" className={tone[20].line} strokeWidth="3" />
        <text x="82" y="188" textAnchor="middle" className={`${tone[10].text} text-[10px] font-semibold`}>
          VLAN 10 (事務)
        </text>
        <text x="206" y="188" textAnchor="middle" className={`${tone[20].text} text-[10px] font-semibold`}>
          VLAN 20 (サーバ)
        </text>
        <text x="155" y="220" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          ポートに VLAN 番号を付けるだけ
        </text>
        <text x="155" y="236" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          (配線は 1 台に全部挿したまま)
        </text>

        <line x1="300" y1="120" x2="344" y2="120" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" markerEnd="url(#vs-arrow)" />
        <text x="322" y="110" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          中身は
        </text>

        <text x="505" y="24" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          中身: 別々のスイッチが 2 台あるのと同じ
        </text>

        {groups.map((g) => (
          <g key={g.vlan}>
            {g.devices.map((d, i) => {
              const cx = g.cx - 30 + i * 60;
              return (
                <g key={i}>
                  <rect x={cx - 26} y="42" width="52" height="30" rx="4" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.2" />
                  <text x={cx} y="61" textAnchor="middle" className="fill-zinc-700 text-[9px] dark:fill-zinc-300">
                    {d}
                  </text>
                  <line x1={cx} y1="72" x2={cx} y2="108" className={tone[g.vlan].line} strokeWidth="1.8" />
                </g>
              );
            })}
            <rect x={g.cx - 68} y="108" width="136" height="48" rx="8" className={tone[g.vlan].box} strokeWidth="1.5" />
            <text x={g.cx} y="136" textAnchor="middle" className={`${tone[g.vlan].text} text-[10px] font-semibold`}>
              {g.name}
            </text>
          </g>
        ))}

        <path d="M 400 76 Q 425 98 450 76" fill="none" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#vs-arrow-green)" />

        <line x1="505" y1="98" x2="505" y2="166" className="stroke-rose-400" strokeWidth="2" strokeDasharray="5 4" />
        <text x="505" y="186" textAnchor="middle" className="fill-rose-600 text-[9px] font-semibold dark:fill-rose-400">
          直接はつながらない
        </text>

        <rect x="445" y="220" width="120" height="38" rx="8" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="505" y="244" textAnchor="middle" className="fill-rose-900 text-[10px] font-semibold dark:fill-rose-200">
          L3 スイッチ
        </text>
        <line x1="425" y1="156" x2="470" y2="218" className="stroke-rose-400" strokeWidth="2" />
        <line x1="585" y1="156" x2="540" y2="218" className="stroke-rose-400" strokeWidth="2" />

        <text x="360" y="280" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">
          同じ VLAN: スイッチの中だけで届く
        </text>
        <text x="360" y="294" className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-400">
          違う VLAN: 下の L3 スイッチを経由する
        </text>

        <defs>
          <marker id="vs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400" />
          </marker>
          <marker id="vs-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function VlanWhyDiagram() {
  const pcs = Array.from({ length: 8 }, (_, i) => 30 + i * 35);
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 268" className="mx-auto w-full max-w-2xl">
        <line x1="330" y1="10" x2="330" y2="258" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="165" y="22" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          ① 全員あての通信が届く範囲
        </text>

        <text x="30" y="52" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          分けない場合
        </text>
        {pcs.map((x, i) => (
          <g key={`a-${x}`}>
            <rect
              x={x}
              y="60"
              width="26"
              height="22"
              rx="3"
              className={
                i === 0
                  ? "fill-amber-400 stroke-amber-600 dark:fill-amber-600 dark:stroke-amber-400"
                  : "fill-amber-100 stroke-amber-400 dark:fill-amber-950/60 dark:stroke-amber-700"
              }
              strokeWidth="1.2"
            />
            {i === 0 && (
              <text x={x + 13} y="75" textAnchor="middle" className="fill-white text-[8px] font-bold">
                送
              </text>
            )}
          </g>
        ))}
        <text x="30" y="100" className="fill-amber-700 text-[9px] dark:fill-amber-400">
          1 台の全員あて → 8 台全部に届く
        </text>

        <text x="30" y="136" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          VLAN で分けた場合
        </text>
        {pcs.map((x, i) => (
          <g key={`b-${x}`}>
            <rect
              x={x}
              y="144"
              width="26"
              height="22"
              rx="3"
              className={
                i === 0
                  ? "fill-amber-400 stroke-amber-600 dark:fill-amber-600 dark:stroke-amber-400"
                  : i < 4
                    ? "fill-amber-100 stroke-amber-400 dark:fill-amber-950/60 dark:stroke-amber-700"
                    : "fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700"
              }
              strokeWidth="1.2"
            />
            {i === 0 && (
              <text x={x + 13} y="159" textAnchor="middle" className="fill-white text-[8px] font-bold">
                送
              </text>
            )}
          </g>
        ))}
        <line x1="30" y1="176" x2="161" y2="176" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="3" />
        <line x1="170" y1="176" x2="301" y2="176" className="stroke-emerald-400 dark:stroke-emerald-600" strokeWidth="3" />
        <text x="95" y="192" textAnchor="middle" className="fill-blue-800 text-[9px] font-semibold dark:fill-blue-300">
          VLAN 10
        </text>
        <text x="235" y="192" textAnchor="middle" className="fill-emerald-800 text-[9px] font-semibold dark:fill-emerald-300">
          VLAN 20 (届かない)
        </text>
        <text x="30" y="214" className="fill-amber-700 text-[9px] dark:fill-amber-400">
          同じ VLAN 10 の 4 台にだけ届く
        </text>

        <text x="495" y="22" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          ② L3 スイッチで通す / 止める
        </text>

        <rect x="345" y="40" width="92" height="40" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
        <text x="391" y="57" textAnchor="middle" className="fill-blue-900 text-[10px] font-semibold dark:fill-blue-200">
          事務 PC
        </text>
        <text x="391" y="72" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">
          VLAN 10
        </text>

        <rect x="345" y="170" width="92" height="40" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.4" />
        <text x="391" y="187" textAnchor="middle" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-200">
          来客 Wi-Fi
        </text>
        <text x="391" y="202" textAnchor="middle" className="fill-amber-700 text-[8px] dark:fill-amber-400">
          VLAN 30
        </text>

        <rect x="466" y="104" width="84" height="44" rx="8" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="508" y="124" textAnchor="middle" className="fill-rose-900 text-[10px] font-semibold dark:fill-rose-200">
          L3 スイッチ
        </text>
        <text x="508" y="139" textAnchor="middle" className="fill-rose-700 text-[8px] dark:fill-rose-400">
          ルールで選別
        </text>

        <rect x="578" y="106" width="70" height="40" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.4" />
        <text x="613" y="123" textAnchor="middle" className="fill-emerald-900 text-[10px] font-semibold dark:fill-emerald-200">
          サーバ
        </text>
        <text x="613" y="138" textAnchor="middle" className="fill-emerald-700 text-[8px] dark:fill-emerald-400">
          VLAN 20
        </text>

        <line x1="437" y1="62" x2="478" y2="102" className="stroke-emerald-500" strokeWidth="2.2" markerEnd="url(#vw-arrow-green)" />
        <line x1="550" y1="126" x2="575" y2="126" className="stroke-emerald-500" strokeWidth="2.2" markerEnd="url(#vw-arrow-green)" />
        <text x="468" y="72" className="fill-emerald-700 text-[12px] font-bold dark:fill-emerald-400">
          ✓
        </text>

        <line x1="437" y1="188" x2="478" y2="150" className="stroke-rose-500" strokeWidth="2.2" strokeDasharray="5 3" markerEnd="url(#vw-arrow-rose)" />
        <text x="482" y="172" className="fill-rose-600 text-[12px] font-bold dark:fill-rose-400">
          ✕
        </text>
        <text x="498" y="171" className="fill-rose-600 text-[9px] font-semibold dark:fill-rose-400">
          ここで止める
        </text>

        <text x="345" y="238" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">
          ✓ 事務 → サーバ: 許可 (通す)
        </text>
        <text x="345" y="254" className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-400">
          ✕ 来客 Wi-Fi → サーバ: 拒否 (L3 スイッチで止める)
        </text>

        <defs>
          <marker id="vw-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="vw-arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function TrunkDiagram() {
  const ports = [
    { cx: 190, port: "gi0/1", vlan: 10, name: "PC-A" },
    { cx: 330, port: "gi0/2", vlan: 10, name: "プリンタ" },
    { cx: 470, port: "gi0/3", vlan: 20, name: "サーバ" },
  ];
  const vlanTone = {
    10: {
      box: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700",
      line: "stroke-blue-500",
      text: "fill-blue-700 dark:fill-blue-400",
    },
    20: {
      box: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700",
      line: "stroke-emerald-500",
      text: "fill-emerald-700 dark:fill-emerald-400",
    },
  } as const;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 330" className="mx-auto w-full max-w-2xl">
        <rect x="230" y="16" width="200" height="44" rx="8" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="330" y="43" textAnchor="middle" className="fill-rose-900 text-[11px] font-semibold dark:fill-rose-200">
          L3 スイッチ
        </text>

        <line x1="324" y1="60" x2="324" y2="130" className="stroke-blue-500" strokeWidth="3" />
        <line x1="336" y1="60" x2="336" y2="130" className="stroke-emerald-500" strokeWidth="3" />
        <text x="352" y="86" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          gi0/24 トランクポート
        </text>
        <text x="352" y="102" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          VLAN 10 と 20 を 1 本のケーブルで運ぶ
        </text>
        <text x="352" y="116" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          (データに VLAN 番号のタグを付けて区別)
        </text>
        <rect x="236" y="80" width="76" height="16" rx="3" className="fill-blue-100 stroke-blue-400 dark:fill-blue-950/60 dark:stroke-blue-700" strokeWidth="1" />
        <text x="274" y="92" textAnchor="middle" className="fill-blue-800 text-[8px] font-semibold dark:fill-blue-300">
          タグ: VLAN 10
        </text>
        <rect x="236" y="102" width="76" height="16" rx="3" className="fill-emerald-100 stroke-emerald-400 dark:fill-emerald-950/60 dark:stroke-emerald-700" strokeWidth="1" />
        <text x="274" y="114" textAnchor="middle" className="fill-emerald-800 text-[8px] font-semibold dark:fill-emerald-300">
          タグ: VLAN 20
        </text>

        <rect x="120" y="130" width="420" height="62" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="134" y="150" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          L2 スイッチ
        </text>

        {ports.map((p) => {
          const t = vlanTone[p.vlan as keyof typeof vlanTone];
          return (
            <g key={p.port}>
              <rect x={p.cx - 30} y="162" width="60" height="22" rx="3" className={t.box} strokeWidth="1.2" />
              <text x={p.cx} y="177" textAnchor="middle" className="fill-zinc-800 font-mono text-[9px] dark:fill-zinc-200">
                {p.port}
              </text>
              <line x1={p.cx} y1="184" x2={p.cx} y2="244" className={t.line} strokeWidth="2.5" />
              <text x={p.cx + 8} y="210" className={`${t.text} text-[9px] font-semibold`}>
                アクセス
              </text>
              <text x={p.cx + 8} y="223" className={`${t.text} text-[9px]`}>
                {`VLAN ${p.vlan}`}
              </text>
              <rect x={p.cx - 50} y="244" width="100" height="40" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
              <text x={p.cx} y="268" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
                {p.name}
              </text>
            </g>
          );
        })}

        <text x="330" y="312" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          端末向けは VLAN 1 つでタグなし (アクセス)、スイッチ間は VLAN 複数でタグ付き (トランク)
        </text>
      </svg>
    </div>
  );
}

function VlanFlowDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 330" className="mx-auto w-full max-w-2xl">
        <rect x="220" y="16" width="220" height="64" rx="8" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="330" y="36" textAnchor="middle" className="fill-rose-900 text-[11px] font-semibold dark:fill-rose-200">
          L3 スイッチ
        </text>
        <text x="330" y="72" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] dark:fill-rose-400">
          GW 192.168.10.1 / 192.168.20.1
        </text>

        <line x1="280" y1="80" x2="170" y2="130" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
        <line x1="380" y1="80" x2="490" y2="130" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
        <text x="196" y="96" textAnchor="end" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          トランク
        </text>
        <text x="464" y="96" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          トランク
        </text>

        <rect x="60" y="130" width="220" height="40" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="170" y="155" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          L2 スイッチ (VLAN 10)
        </text>
        <rect x="380" y="130" width="220" height="40" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="490" y="155" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          L2 スイッチ (VLAN 20)
        </text>

        <line x1="110" y1="170" x2="110" y2="220" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
        <line x1="230" y1="170" x2="230" y2="220" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
        <line x1="490" y1="170" x2="490" y2="220" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />

        {[
          { cx: 110, name: "PC-A", ip: "192.168.10.11", tone: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" },
          { cx: 230, name: "プリンタ", ip: "192.168.10.20", tone: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" },
          { cx: 490, name: "サーバ", ip: "192.168.20.5", tone: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" },
        ].map((d) => (
          <g key={d.name}>
            <rect x={d.cx - 50} y="220" width="100" height="46" rx="6" className={d.tone} strokeWidth="1.4" />
            <text x={d.cx} y="239" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
              {d.name}
            </text>
            <text x={d.cx} y="255" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">
              {d.ip}
            </text>
          </g>
        ))}

        <path
          d="M 124 218 L 124 184 L 216 184 L 216 216"
          fill="none"
          className="stroke-emerald-500"
          strokeWidth="2.5"
          strokeDasharray="6 3"
          markerEnd="url(#vf-arrow-green)"
        />
        <path
          d="M 96 218 L 96 118 L 222 52 L 438 52 L 590 118 L 590 243 L 546 243"
          fill="none"
          className="stroke-rose-500"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          markerEnd="url(#vf-arrow-rose)"
        />

        <text x="170" y="292" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          ① 同じ VLAN: L2 スイッチだけで届く
        </text>
        <text x="490" y="292" textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-400">
          ② 違う VLAN: L3 スイッチを経由する
        </text>
        <text x="330" y="318" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          VLAN をまたぐときだけ、L3 スイッチまで上がる
        </text>

        <defs>
          <marker id="vf-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="vf-arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
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
    { id: "switch", num: 2, title: "そもそもスイッチとは" },
    { id: "l2", num: 3, title: "L2 スイッチ" },
    { id: "l3", num: 4, title: "L3 スイッチ" },
    { id: "mac-ip", num: 5, title: "MAC と IP の役割分担" },
    { id: "vlan", num: 6, title: "VLAN" },
    { id: "ports", num: 7, title: "スイッチのポートの種類" },
    { id: "flow", num: 8, title: "通信の流れ" },
    { id: "related", num: 9, title: "関連ページ" },
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
