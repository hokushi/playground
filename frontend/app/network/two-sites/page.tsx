export default function TwoSitesPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          2 拠点が同じネットワークにいる構成
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          <strong>「セグメントは別だが、ゲートウェイの L3 スイッチは共通」</strong>という、
          1 つの建物・敷地に 2 つの組織が入っているときの定番構成。
          その IP が<strong>誰の手で、どう割り当てられるのか</strong>を整理します。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <SectionH2 id="who" num={1}>
          そもそも誰が IP を決めるのか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          IP は自動で降ってくるものではありません。
          <strong>人が「この機器はこの番号」と決めて、1 台ずつ設定画面に打ち込みます。</strong>
          決める人は 3 種類だけです。
        </p>

        <AssignerDiagram />

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">誰が決める</th>
                <th className="px-3 py-2 text-left font-semibold">何に対して</th>
                <th className="px-3 py-2 text-left font-semibold">どうやって</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  ① 回線事業者
                </td>
                <td className="px-3 py-2">インターネット側の口だけ</td>
                <td className="px-3 py-2">契約すると向こうが決めて通知してくる</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  ② 管理者 (人間)
                </td>
                <td className="px-3 py-2">FW・L3・サーバ・複合機</td>
                <td className="px-3 py-2">
                  台帳を決めて、機器の設定画面に手で入力する
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  ③ DHCP
                </td>
                <td className="px-3 py-2">PC・スマホなど台数の多い端末</td>
                <td className="px-3 py-2">
                  空いている番号を自動で貸す (貸す範囲は②が決める)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          この 3 者が決めた結果、ネットワーク全体はこうなります。
          <strong>色がそのまま「誰が決めたか」</strong>です。
        </p>

        <AssignedOverviewDiagram />

        <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
            図の「SVI vlan100」って何?
          </p>
          <p className="mt-2 text-sm text-indigo-900/80 dark:text-indigo-300">
            <strong>L3 スイッチは 1 台なのに、IP を 3 つ持てます。</strong>
            つながっている区画 (セグメント) ごとに、住所を 1 つずつ持つからです。
            その住所を載せるための<strong>仮想的な口</strong>を <strong>SVI</strong> と呼び、
            <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-indigo-950/50">vlan100</code>{" "}
            などの番号は<strong>どの区画向けの口か</strong>を表しています。
          </p>

          <div className="mt-3 rounded-md border border-indigo-200 bg-white px-4 py-3 dark:border-indigo-800 dark:bg-zinc-950">
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              L3 スイッチ (1 台)
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400">├</span>
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200">
                  vlan100
                </span>
                <span>の口 →</span>
                <span className="font-mono">192.168.0.253</span>
                <span className="text-zinc-500 dark:text-zinc-400">(FW とつながる区画)</span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400">├</span>
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200">
                  vlan10
                </span>
                <span>の口 →</span>
                <span className="font-mono">192.168.10.1</span>
                <span className="text-zinc-500 dark:text-zinc-400">(拠点 A の区画)</span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400">└</span>
                <span className="rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200">
                  vlan20
                </span>
                <span>の口 →</span>
                <span className="font-mono">192.168.20.1</span>
                <span className="text-zinc-500 dark:text-zinc-400">(拠点 B の区画)</span>
              </li>
            </ul>
          </div>

          <p className="mt-3 text-sm text-indigo-900/80 dark:text-indigo-300">
            <strong>受付を 3 部屋ぶん兼務している人</strong>だと思うと分かりやすいです。
            体は 1 つでも、部屋ごとに別の内線番号を持っている。
            拠点 A の端末は「192.168.10.1 の窓口」に用事を持っていき、
            拠点 B の端末は「192.168.20.1 の窓口」に持っていく ── 中身は同じ 1 台です。
          </p>
          <p className="mt-2 text-sm text-indigo-900/80 dark:text-indigo-300">
            PC が IP を 1 つしか持たないのは、<strong>1 つの区画にしかいない</strong>から。
            <strong>IP の数 = 足を置いている区画の数</strong>、という単純な話です。
          </p>

          <p className="mt-4 text-sm font-medium text-indigo-900 dark:text-indigo-200">
            SVI = Switch Virtual Interface (仮想の口)
          </p>
          <p className="mt-2 text-sm text-indigo-900/80 dark:text-indigo-300">
            ルータなら「このポートに IP を振る」で済みます。
            でも L3 スイッチは<strong>物理ポートが全部ケーブルを挿す穴</strong>で、
            そこに直接 IP を振る作りになっていません。
            そこで <strong>VLAN 1 つにつき 1 つ、ソフトウェア上の口を作って IP を持たせます</strong>。
            それが SVI です。
          </p>

          <div className="mt-3 rounded-md border border-indigo-200 bg-white px-4 py-3 dark:border-indigo-800 dark:bg-zinc-950">
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              L3 スイッチ (1 台)
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400">├</span>
                <span>物理ポート 1〜24</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  … ケーブルを挿す穴。IP は持たない
                </span>
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400">└</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">SVI</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  … 仮想の口。IP はここが持つ
                </span>
              </li>
              <li className="flex flex-wrap items-center gap-2 pl-5">
                <span className="text-zinc-400">├</span>
                <span className="font-mono">SVI vlan10 → 192.168.10.1</span>
              </li>
              <li className="flex flex-wrap items-center gap-2 pl-5">
                <span className="text-zinc-400">└</span>
                <span className="font-mono">SVI vlan20 → 192.168.20.1</span>
              </li>
            </ul>
          </div>

          <p className="mt-3 text-sm text-indigo-900/80 dark:text-indigo-300">
            <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-indigo-950/50">
              interface vlan 10
            </code>{" "}
            と打つと「10 番グループ向けの仮想の口」ができ、そこに IP を振ると
            <strong>その VLAN のゲートウェイ</strong>になります。
            拠点 A の端末が「外に出たい」と持ち込む窓口が、これです。
          </p>
          <p className="mt-2 text-sm text-indigo-900/80 dark:text-indigo-300">
            なお <strong>L2 スイッチにも同じ書き方で作れます</strong>が、
            そちらは<strong>管理画面に入るための IP 専用</strong>で、ゲートウェイにはなりません
            (ルーティング機能が無いため)。同じ
            <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-indigo-950/50">
              interface vlan 10
            </code>{" "}
            でも役割が違う、という点だけ注意です。
          </p>
        </div>


      </section>


      <section className="flex flex-col gap-4">
        <SectionH2 id="wired" num={2}>
          どこまでが有線で、どこから無線か
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          結論から言うと、<strong>FW・L3 スイッチ・L2 スイッチ・無線 AP まではすべて有線</strong>です。
          無線になるのは<strong>AP から先の端末だけ</strong>。
          「途中から無線でネットワークが繋がっている」ということは基本的にありません。
        </p>

        <WiredWirelessDiagram />

        <div className="rounded-lg border border-sky-200 bg-sky-50 px-5 py-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <p className="text-sm font-medium text-sky-900 dark:text-sky-200">
            無線 AP は「電波 ↔ ケーブル」の変換役
          </p>
          <p className="mt-2 text-sm text-sky-900/80 dark:text-sky-300">
            AP は電波を出す箱ですが、<strong>AP 自身は L2 スイッチに LAN ケーブルで挿さっています</strong>。
            光ファイバを LAN ケーブルに変える ONU と同じ発想で、
            <strong>電波を LAN ケーブルに変える箱</strong>だと思うと分かりやすいです。
          </p>
          <p className="mt-2 text-sm text-sky-900/80 dark:text-sky-300">
            天井に付いている AP に電源ケーブルが見当たらないのは、
            <strong>LAN ケーブル 1 本で通信と電源を兼ねている</strong>から (PoE と言います)。
            だから AP を増やすのに電源工事が要りません。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            なぜ基幹は必ず有線なのか
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>速度と安定性</strong>。全員の通信が集まる場所なので、
              電波の混み合いや干渉に左右されると全体が遅くなる
            </li>
            <li>
              ・<strong>止まると影響が大きい</strong>。FW や L3 が繋がらなくなると全端末が巻き添えになる
            </li>
            <li>
              ・<strong>そもそも動かない機械</strong>。ラックに固定されていて、無線にする理由がない
            </li>
          </ul>
        </div>

      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="tree" num={3}>
          拠点の中はどう集約されているか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>拠点 A と拠点 B は別々の建物</strong>という前提で描いています。
          端末はどこかの L2 スイッチに刺さり、そのスイッチが<strong>上へ 1 本だけ</strong>伸ばして
          建物の親スイッチへ、そこからさらに 1 本で L3 スイッチへ集まる ── <strong>ツリー構造</strong>です。
          上りの 1 本を<strong>アップリンク</strong>と呼びます。
          建物ごとに VLAN が 1 つなので、<strong>建物の中はどのポートも同じ VLAN</strong>。
          2 つの VLAN を持つのは L3 スイッチだけで、
          そこで<strong>「左の口の先は 10 番、右の口の先は 20 番」</strong>と区別しています。
        </p>

        <SiteTreeDiagram />


      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="port-ip" num={4}>
          ポートと IP の関係
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>ポートは穴、VLAN は名札、IP は住所</strong>で、3 つとも別物です。
          ただし<strong>穴の設定が住所を決める</strong>ので、順番に見ると繋がります。
        </p>

        <PortIpDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>VLAN 20 は IP の範囲ではない</strong>。
              「20 番グループ」という<strong>名札</strong>で、住所の話はまだしていない
            </li>
            <li>
              ・<strong>ポートの設定が先、IP は後</strong>。
              穴に挿す → その穴の VLAN が決まっている → その VLAN 用の帯から住所を借りる
            </li>
            <li>
              ・<strong>同じ PC でも、挿す穴が変われば住所が変わる</strong>。
              PC 側の設定は一切触っていないのに、建物 A の穴なら 192.168.10.x、
              建物 B の穴なら 192.168.20.x になる
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            VLAN は「設定」。ポートが 1 つずつ持っている
          </p>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            VLAN は物理的な何かではなく、<strong>スイッチの中の設定</strong>です。
            各ポートが<strong>「自分は何番」という値を 1 つ</strong>持っていて、
            スイッチの中にはこういう対応表があります。
          </p>
          <div className="mt-3 overflow-hidden rounded-md border border-blue-200 dark:border-blue-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold">ポート</th>
                  <th className="px-2 py-1.5 text-left font-semibold">VLAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 bg-white font-mono text-blue-900/90 dark:divide-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
                <tr>
                  <td className="px-2 py-1.5">1 番</td>
                  <td className="px-2 py-1.5">10</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5">2 番</td>
                  <td className="px-2 py-1.5">10</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5">…</td>
                  <td className="px-2 py-1.5">…</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5">47 番 (上り)</td>
                  <td className="px-2 py-1.5">10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-300">
            買ってきたままのスイッチは<strong>全ポートが VLAN 1</strong> (初期値) で、
            どこに挿しても互いに通信できる状態です。
            そこから番号を付け替えていくのが VLAN の設定作業になります。
          </p>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            そして<strong>ポートが持っているのは VLAN 番号だけ</strong>。
            「VLAN 10 = 192.168.10.0/24」という紐付けを知っているのは
            <strong>L3 スイッチの SVI だけ</strong>です。
          </p>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          ただし<strong>穴が IP を配っているわけではありません</strong>。
          穴が決めるのは<strong>「使うべき帯」まで</strong>で、
          実際の番号を入れるのは DHCP か人です。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
              DHCP を使う機器 (PC・スマホ)
            </p>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              <strong>挿すだけで完了</strong>。その帯の中から空いている番号を自動で借ります。
              人は何も入力しません。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              固定 IP の機器 (サーバ・複合機)
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              <strong>人が手で入力</strong>します。このとき
              <strong>その穴の帯に合った番号を入れないと通信できません</strong>。
            </p>
          </div>
        </div>

        <BandMismatchDiagram />

      </section>
    </main>
  );
}

function AssignerDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 360" className="mx-auto w-full max-w-2xl">
        <text x="105" y="12" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          誰が決める
        </text>
        <text x="440" y="12" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          どの機器の IP か
        </text>

        <rect x="20" y="24" width="170" height="56" rx="8" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="105" y="46" textAnchor="middle" className="fill-amber-900 text-xs font-semibold dark:fill-amber-200">
          ① 回線事業者
        </text>
        <text x="105" y="64" textAnchor="middle" className="fill-amber-700 text-[9px] dark:fill-amber-400">
          契約すると渡される
        </text>
        <line x1="190" y1="52" x2="274" y2="52" className="stroke-amber-500" strokeWidth="2" markerEnd="url(#who-arrow-a)" />

        <rect x="280" y="24" width="320" height="56" rx="8" className="fill-white stroke-amber-400 dark:fill-zinc-900 dark:stroke-amber-700" strokeWidth="1.4" />
        <text x="296" y="46" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          ファイアウォールの外側の口 (WAN)
        </text>
        <text x="296" y="64" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          203.0.113.10
        </text>

        <rect x="20" y="100" width="170" height="96" rx="8" className="fill-indigo-50 stroke-indigo-400 dark:fill-indigo-950/30 dark:stroke-indigo-700" strokeWidth="1.5" />
        <text x="105" y="134" textAnchor="middle" className="fill-indigo-900 text-xs font-semibold dark:fill-indigo-200">
          ② 管理者 (人間)
        </text>
        <text x="105" y="152" textAnchor="middle" className="fill-indigo-700 text-[9px] dark:fill-indigo-400">
          台帳を決めて
        </text>
        <text x="105" y="166" textAnchor="middle" className="fill-indigo-700 text-[9px] dark:fill-indigo-400">
          手で 1 台ずつ入力
        </text>
        <line x1="190" y1="148" x2="274" y2="148" className="stroke-indigo-500" strokeWidth="2" markerEnd="url(#who-arrow-i)" />

        <rect x="280" y="100" width="320" height="96" rx="8" className="fill-white stroke-indigo-400 dark:fill-zinc-900 dark:stroke-indigo-700" strokeWidth="1.4" />
        <text x="296" y="120" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          ネットワーク機器と、動かない機械
        </text>
        <text x="296" y="139" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          FW の内側    192.168.0.254
        </text>
        <text x="296" y="156" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          L3 スイッチ  192.168.10.1 / 192.168.20.1
        </text>
        <text x="296" y="173" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          サーバ       192.168.10.10
        </text>
        <text x="296" y="190" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          複合機       192.168.20.50
        </text>

        <rect x="20" y="216" width="170" height="80" rx="8" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="105" y="244" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">
          ③ DHCP
        </text>
        <text x="105" y="262" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">
          空き番号を自動で貸す
        </text>
        <text x="105" y="278" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">
          (貸す範囲は②が決める)
        </text>
        <line x1="190" y1="256" x2="274" y2="256" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#who-arrow-e)" />

        <rect x="280" y="216" width="320" height="80" rx="8" className="fill-white stroke-emerald-400 dark:fill-zinc-900 dark:stroke-emerald-700" strokeWidth="1.4" />
        <text x="296" y="240" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          PC・スマホなど、数が多い端末
        </text>
        <text x="296" y="260" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          192.168.10.101 / .102 / .103 …
        </text>
        <text x="296" y="280" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
          電源を入れると勝手に決まる
        </text>

        <text x="310" y="326" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          自動なのは ③ だけ。その ③ のルールも ② が決めている
        </text>
        <text x="310" y="346" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-400">
          L2 スイッチ・HUB は、そもそも IP を持たない
        </text>

        <defs>
          <marker id="who-arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-amber-500" />
          </marker>
          <marker id="who-arrow-i" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-indigo-500" />
          </marker>
          <marker id="who-arrow-e" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function AssignedOverviewDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 610" className="mx-auto w-full max-w-2xl">
        <rect x="120" y="4" width="10" height="10" rx="2" className="fill-amber-400" />
        <text x="136" y="13" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          ① 回線事業者が決めた
        </text>
        <rect x="270" y="4" width="10" height="10" rx="2" className="fill-indigo-500" />
        <text x="286" y="13" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          ② 管理者が決めた
        </text>
        <rect x="410" y="4" width="10" height="10" rx="2" className="fill-emerald-500" />
        <text x="426" y="13" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          ③ DHCP が貸した
        </text>

        <rect
          x="10"
          y="128"
          width="600"
          height="442"
          rx="14"
          className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900/40 dark:stroke-zinc-600"
          strokeWidth="1.5"
          strokeDasharray="8 5"
        />
        <text x="24" y="148" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">
          共通ネットワーク
        </text>
        <text x="24" y="162" className="fill-zinc-500 font-mono text-[9px] dark:fill-zinc-400">
          192.168.0.0/16
        </text>
        <text x="24" y="175" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          この枠から切り出して配る
        </text>

        <rect x="215" y="28" width="190" height="42" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="310" y="48" textAnchor="middle" className="fill-zinc-700 text-xs font-semibold dark:fill-zinc-300">
          インターネット
        </text>
        <text x="310" y="62" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          グローバル IP の世界
        </text>
        <line x1="310" y1="70" x2="310" y2="150" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="325" y="76" width="275" height="42" rx="4" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.2" />
        <text x="336" y="93" className="fill-amber-900 text-[9px] font-semibold dark:fill-amber-200">
          WAN 側 ・ 共通ネットワークの外
        </text>
        <text x="336" y="109" className="fill-amber-900 font-mono text-[10px] dark:fill-amber-200">
          ① 203.0.113.8/29 → FW は .10
        </text>

        <rect x="215" y="150" width="190" height="56" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="310" y="172" textAnchor="middle" className="fill-zinc-50 text-xs font-semibold dark:fill-zinc-900">
          ファイアウォール
        </text>
        <text x="310" y="190" textAnchor="middle" className="fill-zinc-300 text-[9px] dark:fill-zinc-600">
          外と内で口が 2 つ
        </text>

        <rect x="425" y="166" width="175" height="24" rx="4" className="fill-indigo-50 stroke-indigo-400 dark:fill-indigo-950/30 dark:stroke-indigo-700" strokeWidth="1.2" />
        <text x="435" y="182" className="fill-indigo-900 font-mono text-[10px] dark:fill-indigo-200">
          ② lan 192.168.0.254
        </text>

        <line x1="310" y1="206" x2="310" y2="252" className="stroke-zinc-400" strokeWidth="1.5" />
        <text x="298" y="224" textAnchor="end" className="fill-zinc-700 text-[9px] font-semibold dark:fill-zinc-300">
          中継セグメント
        </text>
        <text x="298" y="238" textAnchor="end" className="fill-zinc-500 font-mono text-[9px] dark:fill-zinc-400">
          192.168.0.0/24
        </text>

        <rect x="150" y="252" width="320" height="90" rx="8" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="310" y="274" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          L3 スイッチ (共通ゲートウェイ)
        </text>
        <text x="310" y="296" textAnchor="middle" className="fill-indigo-800 font-mono text-[10px] dark:fill-indigo-300">
          ② SVI vlan100: 192.168.0.253 ← 上流向け
        </text>
        <text x="310" y="314" textAnchor="middle" className="fill-indigo-800 font-mono text-[10px] dark:fill-indigo-300">
          ② SVI vlan10: 192.168.10.1 ← 拠点 A 向け
        </text>
        <text x="310" y="332" textAnchor="middle" className="fill-indigo-800 font-mono text-[10px] dark:fill-indigo-300">
          ② SVI vlan20: 192.168.20.1 ← 拠点 B 向け
        </text>

        <line x1="210" y1="342" x2="160" y2="382" className="stroke-zinc-400" strokeWidth="1.5" />
        <line x1="410" y1="342" x2="460" y2="382" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="20" y="382" width="270" height="168" rx="8" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="34" y="404" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          拠点 A (VLAN 10)
        </text>
        <text x="34" y="420" className="fill-zinc-500 font-mono text-[10px] dark:fill-zinc-400">
          192.168.10.0/24
        </text>
        <g>
          <rect x="34" y="437" width="9" height="9" rx="2" className="fill-indigo-500" />
          <text x="50" y="446" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            ゲートウェイ
          </text>
          <text x="150" y="446" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.10.1
          </text>

          <rect x="34" y="463" width="9" height="9" rx="2" className="fill-indigo-500" />
          <text x="50" y="472" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            サーバ
          </text>
          <text x="150" y="472" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.10.10
          </text>

          <rect x="34" y="489" width="9" height="9" rx="2" className="fill-emerald-500" />
          <text x="50" y="498" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            PC
          </text>
          <text x="150" y="498" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.10.101
          </text>

          <rect x="34" y="515" width="9" height="9" rx="2" className="fill-emerald-500" />
          <text x="50" y="524" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            PC
          </text>
          <text x="150" y="524" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.10.102
          </text>
        </g>

        <rect x="330" y="382" width="270" height="168" rx="8" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="344" y="404" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          拠点 B (VLAN 20)
        </text>
        <text x="344" y="420" className="fill-zinc-500 font-mono text-[10px] dark:fill-zinc-400">
          192.168.20.0/24
        </text>
        <g>
          <rect x="344" y="437" width="9" height="9" rx="2" className="fill-indigo-500" />
          <text x="360" y="446" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            ゲートウェイ
          </text>
          <text x="460" y="446" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.20.1
          </text>

          <rect x="344" y="463" width="9" height="9" rx="2" className="fill-indigo-500" />
          <text x="360" y="472" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            複合機
          </text>
          <text x="460" y="472" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.20.50
          </text>

          <rect x="344" y="489" width="9" height="9" rx="2" className="fill-emerald-500" />
          <text x="360" y="498" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            PC
          </text>
          <text x="460" y="498" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.20.101
          </text>

          <rect x="344" y="515" width="9" height="9" rx="2" className="fill-emerald-500" />
          <text x="360" y="524" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
            PC
          </text>
          <text x="460" y="524" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
            192.168.20.102
          </text>
        </g>

        <text x="310" y="588" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          破線の内側が共通ネットワーク。青 (②) が人の手で決めた分で、緑 (③) の PC だけ自動で貸し出されている
        </text>
      </svg>
    </div>
  );
}

function WiredWirelessDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 480" className="mx-auto w-full max-w-2xl">
        <line x1="150" y1="12" x2="185" y2="12" className="stroke-zinc-500" strokeWidth="2.5" />
        <text x="192" y="16" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          有線 (LAN ケーブル)
        </text>
        <path d="M 340 12 q 8 -6 16 0 q 8 6 16 0 q 8 -6 16 0" className="fill-none stroke-sky-500" strokeWidth="2" />
        <text x="396" y="16" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          無線 (電波)
        </text>

        <rect x="230" y="32" width="160" height="42" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="310" y="58" textAnchor="middle" className="fill-zinc-50 text-xs font-semibold dark:fill-zinc-900">
          ファイアウォール
        </text>
        <line x1="310" y1="74" x2="310" y2="112" className="stroke-zinc-500" strokeWidth="2.5" />

        <rect x="215" y="112" width="190" height="50" rx="6" className="fill-indigo-50 stroke-indigo-400 dark:fill-indigo-950/30 dark:stroke-indigo-700" strokeWidth="1.5" />
        <text x="310" y="133" textAnchor="middle" className="fill-indigo-900 text-xs font-semibold dark:fill-indigo-200">
          L3 スイッチ
        </text>
        <text x="310" y="150" textAnchor="middle" className="fill-indigo-700 text-[9px] dark:fill-indigo-400">
          共通ゲートウェイ
        </text>
        <line x1="310" y1="162" x2="310" y2="200" className="stroke-zinc-500" strokeWidth="2.5" />

        <rect x="220" y="200" width="180" height="46" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="310" y="221" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          L2 スイッチ
        </text>
        <text x="310" y="237" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          各フロア・各部屋に置く
        </text>

        <line x1="270" y1="246" x2="70" y2="296" className="stroke-zinc-500" strokeWidth="2.5" />
        <line x1="290" y1="246" x2="185" y2="296" className="stroke-zinc-500" strokeWidth="2.5" />
        <line x1="320" y1="246" x2="300" y2="296" className="stroke-zinc-500" strokeWidth="2.5" />
        <line x1="350" y1="246" x2="470" y2="296" className="stroke-zinc-500" strokeWidth="2.5" />

        <g className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.4">
          <rect x="20" y="296" width="100" height="44" rx="6" />
          <rect x="135" y="296" width="100" height="44" rx="6" />
          <rect x="250" y="296" width="100" height="44" rx="6" />
        </g>
        <g className="fill-zinc-800 text-[10px] dark:fill-zinc-200" textAnchor="middle">
          <text x="70" y="318">デスクトップ PC</text>
          <text x="185" y="318">サーバ</text>
          <text x="300" y="318">複合機</text>
        </g>
        <g className="fill-zinc-500 text-[9px] dark:fill-zinc-400" textAnchor="middle">
          <text x="70" y="332">有線</text>
          <text x="185" y="332">有線</text>
          <text x="300" y="332">有線</text>
        </g>

        <rect x="400" y="296" width="140" height="52" rx="6" className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/30 dark:stroke-sky-700" strokeWidth="1.5" />
        <text x="470" y="316" textAnchor="middle" className="fill-sky-900 text-[11px] font-semibold dark:fill-sky-200">
          無線 AP
        </text>
        <text x="470" y="332" textAnchor="middle" className="fill-sky-700 text-[9px] dark:fill-sky-400">
          ここまでは有線でぶら下がる
        </text>
        <text x="470" y="344" textAnchor="middle" className="fill-sky-700 text-[9px] dark:fill-sky-400">
          電波 ↔ ケーブルの変換役
        </text>

        <path d="M 430 366 q 10 -8 20 0 q 10 8 20 0 q 10 -8 20 0 q 10 8 20 0" className="fill-none stroke-sky-500" strokeWidth="2" />

        <path d="M 470 350 C 430 380, 390 380, 370 402" className="fill-none stroke-sky-500" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M 470 350 C 470 380, 470 380, 470 402" className="fill-none stroke-sky-500" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M 470 350 C 510 380, 550 380, 570 402" className="fill-none stroke-sky-500" strokeWidth="2" strokeDasharray="5 4" />

        <g className="fill-white stroke-sky-400 dark:fill-zinc-950 dark:stroke-sky-700" strokeWidth="1.4">
          <rect x="325" y="402" width="90" height="40" rx="6" />
          <rect x="425" y="402" width="90" height="40" rx="6" />
          <rect x="525" y="402" width="80" height="40" rx="6" />
        </g>
        <g className="fill-zinc-800 text-[10px] dark:fill-zinc-200" textAnchor="middle">
          <text x="370" y="421">ノート PC</text>
          <text x="470" y="421">スマホ</text>
          <text x="565" y="421">タブレット</text>
        </g>
        <g className="fill-sky-600 text-[9px] dark:fill-sky-400" textAnchor="middle">
          <text x="370" y="434">無線</text>
          <text x="470" y="434">無線</text>
          <text x="565" y="434">無線</text>
        </g>

        <text x="310" y="468" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          FW から AP までは全部ケーブル。無線になるのは AP から先の端末だけ
        </text>
      </svg>
    </div>
  );
}

function SiteTreeDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 465" className="mx-auto w-full max-w-2xl">
        <rect x="180" y="20" width="260" height="74" rx="8" className="fill-indigo-50 stroke-indigo-400 dark:fill-indigo-950/30 dark:stroke-indigo-700" strokeWidth="1.6" />
        <text x="310" y="42" textAnchor="middle" className="fill-indigo-900 text-xs font-semibold dark:fill-indigo-200">
          L3 スイッチ (共通ゲートウェイ)
        </text>
        <text x="310" y="63" textAnchor="middle" className="fill-emerald-700 font-mono text-[10px] dark:fill-emerald-400">
          VLAN 10 → 192.168.10.1
        </text>
        <text x="310" y="81" textAnchor="middle" className="fill-blue-700 font-mono text-[10px] dark:fill-blue-400">
          VLAN 20 → 192.168.20.1
        </text>

        <line x1="250" y1="94" x2="155" y2="150" className="stroke-emerald-500" strokeWidth="2" />
        <line x1="370" y1="94" x2="465" y2="150" className="stroke-blue-500" strokeWidth="2" />
        <text x="80" y="126" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          VLAN 10 の道
        </text>
        <text x="545" y="120" textAnchor="middle" className="fill-blue-700 text-[10px] font-semibold dark:fill-blue-400">
          VLAN 20 の道
        </text>
        <text x="545" y="134" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          建物間は光ファイバ 1 本
        </text>

        <rect
          x="20"
          y="150"
          width="270"
          height="270"
          rx="10"
          className="fill-emerald-50/50 stroke-emerald-400 dark:fill-emerald-950/20 dark:stroke-emerald-700"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="155" y="172" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">
          建物 A (拠点 A)
        </text>
        <text x="155" y="189" textAnchor="middle" className="fill-emerald-700 font-mono text-[10px] dark:fill-emerald-400">
          VLAN 10 / 192.168.10.0/24
        </text>

        <rect x="75" y="200" width="160" height="32" rx="5" className="fill-white stroke-emerald-500 dark:fill-zinc-950 dark:stroke-emerald-600" strokeWidth="1.3" />
        <text x="155" y="221" textAnchor="middle" className="fill-emerald-900 text-[10px] font-semibold dark:fill-emerald-200">
          L2 (建物 A の親)
        </text>
        <line x1="120" y1="232" x2="95" y2="262" className="stroke-emerald-400" strokeWidth="1.4" />
        <line x1="190" y1="232" x2="215" y2="262" className="stroke-emerald-400" strokeWidth="1.4" />

        <g className="fill-white stroke-emerald-400 dark:fill-zinc-950 dark:stroke-emerald-700" strokeWidth="1.3">
          <rect x="45" y="262" width="100" height="32" rx="5" />
          <rect x="165" y="262" width="100" height="32" rx="5" />
        </g>
        <g className="fill-emerald-900 text-[10px] dark:fill-emerald-200" textAnchor="middle">
          <text x="95" y="283">L2 (1 階)</text>
          <text x="215" y="283">L2 (2 階)</text>
        </g>

        <line x1="75" y1="294" x2="55" y2="330" className="stroke-emerald-300" strokeWidth="1.2" />
        <line x1="115" y1="294" x2="120" y2="330" className="stroke-emerald-300" strokeWidth="1.2" />
        <line x1="195" y1="294" x2="185" y2="330" className="stroke-emerald-300" strokeWidth="1.2" />
        <line x1="235" y1="294" x2="250" y2="330" className="stroke-emerald-300" strokeWidth="1.2" />

        <g className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/40 dark:stroke-emerald-700" strokeWidth="1.2">
          <rect x="30" y="330" width="50" height="30" rx="4" />
          <rect x="95" y="330" width="50" height="30" rx="4" />
          <rect x="160" y="330" width="50" height="30" rx="4" />
          <rect x="225" y="330" width="50" height="30" rx="4" />
        </g>
        <g className="fill-emerald-900 text-[9px] dark:fill-emerald-200" textAnchor="middle">
          <text x="55" y="349">PC</text>
          <text x="120" y="349">PC</text>
          <text x="185" y="349">PC</text>
          <text x="250" y="349">複合機</text>
        </g>

        <text x="155" y="388" textAnchor="middle" className="fill-emerald-800 text-[10px] font-semibold dark:fill-emerald-300">
          この建物のポートは全部 VLAN 10
        </text>
        <text x="155" y="404" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">
          端末の IP は 192.168.10.x
        </text>

        <rect
          x="330"
          y="150"
          width="270"
          height="270"
          rx="10"
          className="fill-blue-50/50 stroke-blue-400 dark:fill-blue-950/20 dark:stroke-blue-700"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="465" y="172" textAnchor="middle" className="fill-blue-900 text-xs font-semibold dark:fill-blue-200">
          建物 B (拠点 B)
        </text>
        <text x="465" y="189" textAnchor="middle" className="fill-blue-700 font-mono text-[10px] dark:fill-blue-400">
          VLAN 20 / 192.168.20.0/24
        </text>

        <rect x="385" y="200" width="160" height="32" rx="5" className="fill-white stroke-blue-500 dark:fill-zinc-950 dark:stroke-blue-600" strokeWidth="1.3" />
        <text x="465" y="221" textAnchor="middle" className="fill-blue-900 text-[10px] font-semibold dark:fill-blue-200">
          L2 (建物 B の親)
        </text>
        <line x1="430" y1="232" x2="405" y2="262" className="stroke-blue-400" strokeWidth="1.4" />
        <line x1="500" y1="232" x2="525" y2="262" className="stroke-blue-400" strokeWidth="1.4" />

        <g className="fill-white stroke-blue-400 dark:fill-zinc-950 dark:stroke-blue-700" strokeWidth="1.3">
          <rect x="355" y="262" width="100" height="32" rx="5" />
          <rect x="475" y="262" width="100" height="32" rx="5" />
        </g>
        <g className="fill-blue-900 text-[10px] dark:fill-blue-200" textAnchor="middle">
          <text x="405" y="283">L2 (1 階)</text>
          <text x="525" y="283">L2 (2 階)</text>
        </g>

        <line x1="385" y1="294" x2="365" y2="330" className="stroke-blue-300" strokeWidth="1.2" />
        <line x1="425" y1="294" x2="430" y2="330" className="stroke-blue-300" strokeWidth="1.2" />
        <line x1="505" y1="294" x2="495" y2="330" className="stroke-blue-300" strokeWidth="1.2" />
        <line x1="545" y1="294" x2="560" y2="330" className="stroke-blue-300" strokeWidth="1.2" />

        <g className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/40 dark:stroke-blue-700" strokeWidth="1.2">
          <rect x="340" y="330" width="50" height="30" rx="4" />
          <rect x="405" y="330" width="50" height="30" rx="4" />
          <rect x="470" y="330" width="50" height="30" rx="4" />
          <rect x="535" y="330" width="50" height="30" rx="4" />
        </g>
        <g className="fill-blue-900 text-[9px] dark:fill-blue-200" textAnchor="middle">
          <text x="365" y="349">PC</text>
          <text x="430" y="349">PC</text>
          <text x="495" y="349">サーバ</text>
          <text x="560" y="349">AP</text>
        </g>

        <text x="465" y="388" textAnchor="middle" className="fill-blue-800 text-[10px] font-semibold dark:fill-blue-300">
          この建物のポートは全部 VLAN 20
        </text>
        <text x="465" y="404" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">
          端末の IP は 192.168.20.x
        </text>

        <text x="310" y="446" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          両方の VLAN を持つのは L3 スイッチだけ。建物の中は 1 つの VLAN で統一される
        </text>
      </svg>
    </div>
  );
}

function PortIpDiagram() {
  const portsA = Array.from({ length: 8 }, (_, i) => 46 + i * 24);
  const portsB = Array.from({ length: 8 }, (_, i) => 356 + i * 24);
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 480" className="mx-auto w-full max-w-2xl">
        <text x="20" y="18" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">
          ① スイッチの前面 = ケーブルを挿す穴 (ポート) が並んでいる
        </text>

        <text x="155" y="38" textAnchor="middle" className="fill-emerald-800 text-[10px] font-semibold dark:fill-emerald-300">
          建物 A の L2 スイッチ
        </text>
        <rect x="30" y="46" width="250" height="62" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        {portsA.map((x) => (
          <rect
            key={`a1-${x}`}
            x={x}
            y="56"
            width="20"
            height="16"
            rx="2"
            className="fill-emerald-200 stroke-emerald-600 dark:fill-emerald-900/60 dark:stroke-emerald-500"
            strokeWidth="1"
          />
        ))}
        {portsA.map((x) => (
          <rect
            key={`a2-${x}`}
            x={x}
            y="80"
            width="20"
            height="16"
            rx="2"
            className="fill-emerald-200 stroke-emerald-600 dark:fill-emerald-900/60 dark:stroke-emerald-500"
            strokeWidth="1"
          />
        ))}
        <text x="155" y="126" textAnchor="middle" className="fill-emerald-800 font-mono text-[9px] dark:fill-emerald-300">
          全ポート VLAN 10 に設定
        </text>

        <text x="465" y="38" textAnchor="middle" className="fill-blue-800 text-[10px] font-semibold dark:fill-blue-300">
          建物 B の L2 スイッチ
        </text>
        <rect x="340" y="46" width="250" height="62" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        {portsB.map((x) => (
          <rect
            key={`b1-${x}`}
            x={x}
            y="56"
            width="20"
            height="16"
            rx="2"
            className="fill-blue-200 stroke-blue-600 dark:fill-blue-900/60 dark:stroke-blue-500"
            strokeWidth="1"
          />
        ))}
        {portsB.map((x) => (
          <rect
            key={`b2-${x}`}
            x={x}
            y="80"
            width="20"
            height="16"
            rx="2"
            className="fill-blue-200 stroke-blue-600 dark:fill-blue-900/60 dark:stroke-blue-500"
            strokeWidth="1"
          />
        ))}
        <text x="465" y="126" textAnchor="middle" className="fill-blue-800 font-mono text-[9px] dark:fill-blue-300">
          全ポート VLAN 20 に設定
        </text>

        <line x1="155" y1="134" x2="155" y2="158" className="stroke-zinc-400" strokeWidth="1.5" markerEnd="url(#pi-arrow)" />
        <line x1="465" y1="134" x2="465" y2="158" className="stroke-zinc-400" strokeWidth="1.5" markerEnd="url(#pi-arrow)" />

        <rect x="60" y="160" width="190" height="32" rx="5" className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="155" y="180" textAnchor="middle" className="fill-zinc-800 text-[10px] dark:fill-zinc-200">
          ノート PC を挿す
        </text>
        <rect x="370" y="160" width="190" height="32" rx="5" className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="465" y="180" textAnchor="middle" className="fill-zinc-800 text-[10px] dark:fill-zinc-200">
          同じノート PC を挿す
        </text>

        <text x="310" y="180" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          ← 同じ PC →
        </text>

        <line x1="155" y1="192" x2="155" y2="216" className="stroke-zinc-400" strokeWidth="1.5" markerEnd="url(#pi-arrow)" />
        <line x1="465" y1="192" x2="465" y2="216" className="stroke-zinc-400" strokeWidth="1.5" markerEnd="url(#pi-arrow)" />

        <rect x="45" y="216" width="220" height="44" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.4" />
        <text x="155" y="234" textAnchor="middle" className="fill-emerald-900 font-mono text-[11px] font-semibold dark:fill-emerald-200">
          192.168.10.101
        </text>
        <text x="155" y="250" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">
          をもらう ・ GW は 192.168.10.1
        </text>

        <rect x="355" y="216" width="220" height="44" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
        <text x="465" y="234" textAnchor="middle" className="fill-blue-900 font-mono text-[11px] font-semibold dark:fill-blue-200">
          192.168.20.101
        </text>
        <text x="465" y="250" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">
          をもらう ・ GW は 192.168.20.1
        </text>

        <text x="310" y="282" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          PC 側は何も設定していない。挿した穴の設定が住所を決めている
        </text>

        <line x1="20" y1="300" x2="600" y2="300" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="20" y="322" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">
          ② 決まる順番は「穴 → グループ → 住所」
        </text>

        <rect x="30" y="336" width="160" height="62" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="110" y="358" textAnchor="middle" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          ① ポート (穴)
        </text>
        <text x="110" y="376" textAnchor="middle" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          スイッチの物理的な口
        </text>
        <text x="110" y="390" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
          例: 5 番の穴に挿した
        </text>

        <line x1="190" y1="367" x2="222" y2="367" className="stroke-zinc-500" strokeWidth="2" markerEnd="url(#pi-arrow)" />

        <rect x="230" y="336" width="160" height="62" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
        <text x="310" y="358" textAnchor="middle" className="fill-blue-900 text-[11px] font-semibold dark:fill-blue-200">
          ② VLAN (グループ)
        </text>
        <text x="310" y="376" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">
          その穴の所属ラベル
        </text>
        <text x="310" y="390" textAnchor="middle" className="fill-blue-600 text-[9px] dark:fill-blue-500">
          例: 5 番は 20 番グループ
        </text>

        <line x1="390" y1="367" x2="422" y2="367" className="stroke-zinc-500" strokeWidth="2" markerEnd="url(#pi-arrow)" />

        <rect x="430" y="336" width="160" height="62" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.4" />
        <text x="510" y="358" textAnchor="middle" className="fill-amber-900 text-[11px] font-semibold dark:fill-amber-200">
          ③ IP (住所)
        </text>
        <text x="510" y="376" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">
          そのグループの帯から借りる
        </text>
        <text x="510" y="390" textAnchor="middle" className="fill-amber-700 font-mono text-[9px] dark:fill-amber-400">
          192.168.20.101
        </text>

        <text x="310" y="428" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          VLAN 20 は IP の範囲ではなく<tspan className="font-semibold">グループの名札</tspan>。
        </text>
        <text x="310" y="444" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          「20 番グループには 192.168.20.x を使う」と人が紐付けた結果、住所が決まる
        </text>
        <text x="310" y="464" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          番号を揃えているのは覚えやすさのため。VLAN 20 に 192.168.99.x を割り当てても動く
        </text>

        <defs>
          <marker id="pi-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function BandMismatchDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 270" className="mx-auto w-full max-w-2xl">
        <rect x="20" y="50" width="190" height="120" rx="8" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="115" y="72" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          L2 スイッチのポート
        </text>
        <rect x="95" y="86" width="40" height="26" rx="3" className="fill-blue-200 stroke-blue-600 dark:fill-blue-900/60 dark:stroke-blue-500" strokeWidth="1.2" />
        <text x="115" y="132" textAnchor="middle" className="fill-blue-800 text-[10px] font-semibold dark:fill-blue-300">
          VLAN 20 に設定
        </text>
        <text x="115" y="152" textAnchor="middle" className="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-400">
          使うべき帯: 192.168.20.x
        </text>

        <line x1="212" y1="95" x2="248" y2="82" className="stroke-zinc-400" strokeWidth="1.6" markerEnd="url(#bm-arrow)" />
        <line x1="212" y1="140" x2="248" y2="168" className="stroke-zinc-400" strokeWidth="1.6" markerEnd="url(#bm-arrow)" />

        <rect x="255" y="50" width="345" height="74" rx="8" className="fill-emerald-50/60 stroke-emerald-400 dark:fill-emerald-950/20 dark:stroke-emerald-700" strokeWidth="1.4" />
        <text x="270" y="70" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          ① 帯に合った番号を入れた場合
        </text>
        <text x="270" y="90" className="fill-zinc-700 font-mono text-[10px] dark:fill-zinc-300">
          IP 192.168.20.50 / GW 192.168.20.1
        </text>
        <text x="270" y="112" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          ✓ 通信できる
        </text>

        <rect x="255" y="140" width="345" height="84" rx="8" className="fill-rose-50/60 stroke-rose-400 dark:fill-rose-950/20 dark:stroke-rose-700" strokeWidth="1.4" />
        <text x="270" y="160" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          ② 間違えて別の帯を入れた場合
        </text>
        <text x="270" y="180" className="fill-zinc-700 font-mono text-[10px] dark:fill-zinc-300">
          IP 192.168.10.50 / GW 192.168.10.1
        </text>
        <text x="270" y="200" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-400">
          ✗ ケーブルは繋がっているのに通信できない
        </text>
        <text x="270" y="215" className="fill-zinc-600 text-[9px] dark:fill-zinc-400">
          周りは全員 20 番台なので、住所が噛み合わない
        </text>

        <text x="310" y="254" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          穴が決めるのは「使うべき帯」まで。実際の番号は DHCP が配るか、人が入れる
        </text>

        <defs>
          <marker id="bm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-500" />
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
