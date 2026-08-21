export default function PortPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ポートとは何か
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          <strong>443</strong> や <strong>80</strong> のような番号のこと。
          IP アドレスが<strong>建物の住所</strong>だとすると、ポートは
          <strong>その中の部屋番号</strong>にあたります。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="pair" num={1}>
          原則: 宛先は「IP とポート」のセット
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          通信の宛先は<strong>必ず 2 つで 1 組</strong>です。
          どちらか片方だけでは届きません。
        </p>

        <PairDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              IP だけだと
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>どのコンピューターかは分かる</strong>が、
              その中の誰に渡せばいいか分からない。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ポートだけだと
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>どの部屋かは分かる</strong>が、
              どの建物の話なのか分からない。
            </p>
          </div>
        </div>

      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="aws" num={2}>
          AWS だとどう見えるか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          VPC を <span className="font-mono">/16</span> で切ると、
          <strong>約 65,000 個の IP が入るスペース</strong>ができます。
          そこに RDS や EC2 を置くと、<strong>IP が 1 つずつ使われます</strong>。
          <strong>IP 1 つ = パソコン 1 台</strong>と思って構いません。
        </p>

        <AwsPortDiagram />

      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="localhost" num={3}>
          localhost:3000 で見てみる
        </SectionH2>


        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          localhost の正体は 127.0.0.1
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          <span className="font-mono">localhost</span> は IP そのものではなく、
          <strong>IP のあだ名</strong>です。指している番号は{" "}
          <span className="font-mono">127.0.0.1</span>。
          そして<strong>パソコンは IP を 2 つ以上持っています</strong>。
        </p>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">IP</th>
                <th className="px-3 py-2 text-left font-semibold">意味</th>
                <th className="px-3 py-2 text-left font-semibold">誰から呼べるか</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr className="bg-rose-50/60 dark:bg-rose-950/20">
                <td className="px-3 py-2 font-mono text-xs font-semibold">
                  127.0.0.1
                </td>
                <td className="px-3 py-2">
                  <strong>自分専用</strong> (= <span className="font-mono">localhost</span>)
                </td>
                <td className="px-3 py-2">
                  <strong>自分だけ</strong>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-mono text-xs font-semibold">192.168.1.11</td>
                <td className="px-3 py-2">LAN での住所</td>
                <td className="px-3 py-2">同じ Wi-Fi にいる人</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>
            <span className="font-mono">127.0.0.1</span> は配られたものではありません。
          </strong>
          どのパソコンにも最初から入っている固定の番号で、
          <strong>「自分」を意味する予約番号</strong>です。
          誰のパソコンでも <span className="font-mono">127.0.0.1</span> はその人自身を指します。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          もう一方の <span className="font-mono">192.168.1.11</span> は
          <strong>ルーターから配られた住所</strong>で、
          家やオフィスの中で重複しないよう管理されています。
        </p>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            試すと違いが分かります
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            同じ Wi-Fi にいるスマホから{" "}
            <span className="font-mono">http://192.168.1.11:3000</span> を開くと、
            <strong>パソコンで動かしているサイトがスマホでも見えます</strong>。
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            一方、そのスマホで <span className="font-mono">localhost:3000</span> と打つと
            <strong>スマホ自身</strong>を見に行くので、何も出ません。
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            <strong>
              localhost は「自分」という意味なので、打った人によって指す先が変わります。
            </strong>
            ここが普通の IP との一番の違いです。
          </p>
          <p className="mt-2 text-xs text-emerald-900/70 dark:text-emerald-400">
            ※ 自分の LAN 側の IP は、Mac なら{" "}
            <span className="font-mono">ipconfig getifaddr en0</span>、
            Windows なら <span className="font-mono">ipconfig</span> で確認できます。
          </p>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          <span className="font-mono">google.com</span> と打つと通信は
          <strong>ケーブルや Wi-Fi を通って外へ出ていきます</strong>が、
          <span className="font-mono">localhost</span> と打つと
          <strong>この筐体の中で折り返して終わり</strong>です。
          LAN ケーブルを抜いても、Wi-Fi を切っても{" "}
          <span className="font-mono">localhost:3000</span> は動きます。
        </p>

        <p className="text-zinc-700 dark:text-zinc-300">
          その前提で、<span className="font-mono">localhost:3000</span> を 2 つに分けて読みます。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              localhost
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              = <strong>自分の PC 自身</strong>。「この建物」という意味です。
              外のどこにも出ません。
            </p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
            <p className="font-mono text-sm font-semibold text-rose-900 dark:text-rose-200">
              :3000
            </p>
            <p className="mt-2 text-sm text-rose-900/90 dark:text-rose-300">
              = <strong>その中の部屋番号</strong>。これがポートです。
            </p>
          </div>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          <span className="font-mono">npm run dev</span> を実行すると、
          自分の PC の中でプログラムが動き出し、
          <strong>「3000 番の部屋で待っています」</strong>と名乗ります。
          ブラウザに <span className="font-mono">localhost:3000</span> と打つのは、
          <strong>「この PC の 3000 番の部屋にいる人に用がある」</strong>という意味です。
        </p>

        <LocalhostDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            なぜ番号が要るのか
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>1 台の PC で、アプリを何個も同時に動かせるから</strong>です。
            番号が無いと、ブラウザは「どのアプリに話しかければいいのか」が分かりません。
            部屋番号があるから、同じ PC の中でも
            <span className="font-mono">3000</span> と{" "}
            <span className="font-mono">3001</span> を開き分けられます。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            部屋は何個あるのか
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>65535 個</strong>です (1〜65535)。
            ただし自由に使えるのは、そのうちの一部です。
          </p>
          <div className="mt-3 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold">範囲</th>
                  <th className="px-2 py-1.5 text-left font-semibold">名前</th>
                  <th className="px-2 py-1.5 text-left font-semibold">扱い</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-2 py-1.5 font-mono">0〜1023</td>
                  <td className="px-2 py-1.5">ウェルノウンポート</td>
                  <td className="px-2 py-1.5">
                    80 や 443 など<strong>用途が決まっている</strong>。使うには管理者権限が必要
                  </td>
                </tr>
                <tr className="bg-emerald-50/60 dark:bg-emerald-950/20">
                  <td className="px-2 py-1.5 font-mono font-semibold">1024〜49151</td>
                  <td className="px-2 py-1.5">登録済みポート</td>
                  <td className="px-2 py-1.5">
                    3000 や 8080 など。<strong>開発で自由に使うのはここ</strong>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">49152〜65535</td>
                  <td className="px-2 py-1.5">動的ポート</td>
                  <td className="px-2 py-1.5">
                    パソコンが<strong>自動で使う</strong>ので避ける
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
            開発で使うぶんには<strong>事実上いくらでも作れます</strong>。
            3000、3001、8000、8080 … と好きな番号を指定できます。制限は 2 つだけです。
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>1 つの番号に入れるのは 1 つのプログラムだけ</strong>
              (だから 3000 が埋まっていると 3001 になる)
            </li>
            <li>
              ・<strong>1024 未満は管理者権限が必要</strong>
              (<span className="font-mono">sudo</span> が要る。開発で 3000 番台を使う慣習はこのため)
            </li>
          </ul>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            普通の開発で番号が足りなくなることは、まずありません。
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            「3000 が使用中なので 3001 で起動しました」の意味
          </p>
          <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
            <strong>1 つの部屋に入れるのは 1 つのアプリだけ</strong>です。
            すでに別のアプリが 3000 番にいると、後から来たアプリは入れないので、
            <strong>空いている 3001 番に入ります</strong>。
            開発中にこのメッセージが出るのはそのためです。
          </p>
        </div>
      </section>


      <section className="flex flex-col gap-4">
        <SectionH2 id="dns" num={4}>
          https://hoge.com と打つと何が起きるか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          打っているのは名前だけなのに、最終的には
          <strong>「IP : ポート」の形</strong>になって届きます。
          <strong>ポートはブラウザが補い、IP は DNS が教えてくれる</strong> ── その 2 つが揃って宛先が完成します。
        </p>

        <DnsFlowDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            2 つは別々に埋まる
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>ポート</strong> …{" "}
              <span className="font-mono">https://</span> と書いた時点で決まる (443)。
              DNS は関係ない
            </li>
            <li>
              ・<strong>IP</strong> … 名前だけでは分からないので、
              <strong>DNS に問い合わせて</strong>もらう
            </li>
          </ul>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>DNS が教えてくれるのは IP だけ</strong>で、ポートは教えてくれません。
            ポートは名前ではなく<strong>プロトコル (https / http) で決まる</strong>からです。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="two-meanings" num={5}>
          紛らわしい: もう 1 つの「ポート」
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ネットワークの話には<strong>「ポート」と呼ばれるものが 2 つ</strong>出てきます。
          同じ言葉ですが、まったく別物です。
        </p>

        <TwoPortsDiagram />

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold">物理ポート</th>
                <th className="px-3 py-2 text-left font-semibold">ポート番号 (このページの主役)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">正体</td>
                <td className="px-3 py-2">ケーブルを挿す<strong>穴</strong></td>
                <td className="px-3 py-2">通信につける<strong>番号</strong></td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">どこにある</td>
                <td className="px-3 py-2">スイッチや PC の背面</td>
                <td className="px-3 py-2">パケットの中 (目に見えない)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">数</td>
                <td className="px-3 py-2">24 口 / 48 口など</td>
                <td className="px-3 py-2">0〜65535</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">例</td>
                <td className="px-3 py-2 font-mono text-xs">gi0/1 に VLAN 10 を設定</td>
                <td className="px-3 py-2 font-mono text-xs">443 を許可</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          見分け方は簡単で、<strong>「ケーブルを挿せるか」</strong>です。
          挿せるなら物理ポート、番号で呼ばれているならポート番号。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="firewall" num={6}>
          「ポートを開ける」とは
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ファイアウォールは<strong>建物の入口に立つ門番</strong>です。
          「443 を開ける」は、<strong>443 号室宛の荷物だけ通す</strong>という指示になります。
        </p>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            なぜ全部開けないのか
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            部屋の数だけ<strong>侵入口がある</strong>からです。
            使っていない部屋の扉を開けたままにしておくと、そこから入られます。
            とくに <strong>22 番 (SSH)</strong> や <strong>3389 番 (RDP)</strong> は
            <strong>サーバを直接操作できる部屋</strong>なので、
            インターネットに向けて開けると総当たり攻撃の的になります。
          </p>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          逆に「<strong>弊社への通信は HTTPS (TCP/443) のみです</strong>」という説明は、
          <strong>443 番の部屋しか使いません</strong>という宣言です。
          受け取った側は、その 1 つだけを開けたルールを書けば済みます。
        </p>
      </section>

    </main>
  );
}

function PairDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 190" className="mx-auto w-full max-w-xl">
        <text x="300" y="66" textAnchor="middle" className="fill-zinc-900 font-mono text-[26px] font-semibold dark:fill-zinc-100">
          203.0.113.10 : 443
        </text>

        <line x1="200" y1="82" x2="200" y2="112" className="stroke-blue-500" strokeWidth="1.6" />
        <line x1="420" y1="82" x2="420" y2="112" className="stroke-rose-500" strokeWidth="1.6" />

        <rect x="80" y="112" width="240" height="52" rx="8" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
        <text x="200" y="134" textAnchor="middle" className="fill-blue-900 text-[12px] font-semibold dark:fill-blue-200">
          IP
        </text>
        <text x="200" y="152" textAnchor="middle" className="fill-blue-700 text-[10px] dark:fill-blue-400">
          どのコンピューターか
        </text>

        <rect x="340" y="112" width="240" height="52" rx="8" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.4" />
        <text x="460" y="134" textAnchor="middle" className="fill-rose-900 text-[12px] font-semibold dark:fill-rose-200">
          ポート
        </text>
        <text x="460" y="152" textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-400">
          その中のどのプログラムか
        </text>

        <text x="300" y="24" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          通信の宛先は、この 2 つで 1 組
        </text>
      </svg>
    </div>
  );
}

function LocalhostDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 260" className="mx-auto w-full max-w-2xl">
        <rect x="14" y="96" width="110" height="48" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="69" y="118" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          ブラウザ
        </text>
        <text x="69" y="134" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          Chrome など
        </text>

        <line x1="126" y1="120" x2="196" y2="86" className="stroke-rose-500" strokeWidth="2.2" markerEnd="url(#lh-arrow)" />
        <text x="163" y="76" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] font-semibold dark:fill-rose-400">
          localhost:3000
        </text>

        <rect
          x="180"
          y="24"
          width="400"
          height="196"
          rx="12"
          className="fill-zinc-50/60 stroke-zinc-400 dark:fill-zinc-900/40 dark:stroke-zinc-600"
          strokeWidth="1.5"
          strokeDasharray="7 4"
        />
        <text x="196" y="46" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">
          あなたの PC (= localhost)
        </text>

        <rect x="200" y="60" width="360" height="42" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="228" y="86" className="fill-rose-800 font-mono text-[14px] font-semibold dark:fill-rose-300">
          3000
        </text>
        <text x="292" y="80" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          Next.js (このサイト)
        </text>
        <text x="292" y="94" className="fill-rose-700 text-[9px] dark:fill-rose-400">
          ← ここが応える
        </text>

        <rect x="200" y="112" width="360" height="42" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
        <text x="228" y="138" className="fill-zinc-500 font-mono text-[14px] font-semibold dark:fill-zinc-400">
          3001
        </text>
        <text x="292" y="138" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">
          別のアプリ
        </text>

        <rect x="200" y="164" width="360" height="34" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="380" y="185" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          … 他の番号は空き部屋
        </text>

        <text x="300" y="244" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          この通信は PC の外に出ない。自分の中の部屋をノックしているだけ
        </text>

        <defs>
          <marker id="lh-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function DnsFlowDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 480" className="mx-auto w-full max-w-2xl">
        <rect x="40" y="28" width="240" height="52" rx="7" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="54" y="48" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          ① ブラウザに入力
        </text>
        <text x="54" y="68" className="fill-zinc-700 font-mono text-[12px] dark:fill-zinc-300">
          https://hoge.com
        </text>
        <line x1="160" y1="80" x2="160" y2="100" className="stroke-zinc-500" strokeWidth="1.6" markerEnd="url(#dns-arrow)" />

        <rect x="40" y="100" width="240" height="70" rx="7" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.4" />
        <text x="54" y="120" className="fill-rose-900 text-[10px] font-semibold dark:fill-rose-200">
          ② ブラウザがポートを補う
        </text>
        <text x="54" y="142" className="fill-rose-800 font-mono text-[12px] font-semibold dark:fill-rose-300">
          hoge.com : 443
        </text>
        <text x="54" y="160" className="fill-rose-700 text-[9px] dark:fill-rose-400">
          https だから 443。IP はまだ不明
        </text>

        <line x1="284" y1="122" x2="352" y2="116" className="stroke-blue-500" strokeWidth="1.6" markerEnd="url(#dns-arrow-blue)" />
        <text x="318" y="104" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">
          IP を聞く
        </text>
        <line x1="352" y1="152" x2="284" y2="160" className="stroke-blue-500" strokeWidth="1.6" markerEnd="url(#dns-arrow-blue)" />
        <text x="318" y="180" textAnchor="middle" className="fill-blue-700 font-mono text-[9px] dark:fill-blue-400">
          203.0.113.10 です
        </text>

        <rect x="356" y="96" width="224" height="76" rx="7" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.4" />
        <text x="370" y="116" className="fill-blue-900 text-[10px] font-semibold dark:fill-blue-200">
          ③ DNS サーバ
        </text>
        <text x="370" y="134" className="fill-blue-700 text-[9px] dark:fill-blue-400">
          名前 → IP の電話帳
        </text>
        <text x="370" y="156" className="fill-blue-800 font-mono text-[10px] dark:fill-blue-300">
          hoge.com → 203.0.113.10
        </text>

        <line x1="160" y1="170" x2="160" y2="206" className="stroke-zinc-500" strokeWidth="1.6" markerEnd="url(#dns-arrow)" />

        <rect x="40" y="206" width="540" height="76" rx="7" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="54" y="226" className="fill-emerald-900 text-[10px] font-semibold dark:fill-emerald-200">
          ④ 宛先が完成
        </text>
        <text x="310" y="254" textAnchor="middle" className="fill-emerald-900 font-mono text-[18px] font-semibold dark:fill-emerald-200">
          203.0.113.10 : 443
        </text>
        <text x="215" y="272" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">
          IP は DNS が教えた
        </text>
        <text x="410" y="272" textAnchor="middle" className="fill-rose-700 text-[9px] dark:fill-rose-400">
          ポートは https だから
        </text>

        <line x1="310" y1="282" x2="310" y2="308" className="stroke-zinc-500" strokeWidth="1.6" markerEnd="url(#dns-arrow)" />

        <rect x="150" y="308" width="320" height="140" rx="8" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="310" y="328" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          ⑤ サーバに届く
        </text>
        <text x="310" y="345" textAnchor="middle" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">
          203.0.113.10
        </text>
        <rect x="170" y="356" width="280" height="26" rx="4" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.2" />
        <text x="184" y="373" className="fill-rose-800 font-mono text-[10px] font-semibold dark:fill-rose-300">
          443
        </text>
        <text x="230" y="373" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          Web サーバ ← ここに配達される
        </text>
        <rect x="170" y="388" width="280" height="22" rx="4" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.1" />
        <text x="184" y="403" className="fill-zinc-500 font-mono text-[10px] dark:fill-zinc-400">
          22
        </text>
        <text x="230" y="403" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          SSH
        </text>
        <rect x="170" y="414" width="280" height="22" rx="4" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.1" />
        <text x="184" y="429" className="fill-zinc-500 font-mono text-[10px] dark:fill-zinc-400">
          25
        </text>
        <text x="230" y="429" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          メールサーバ
        </text>

        <text x="310" y="470" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          DNS が教えるのは IP だけ。ポートはブラウザが https から補っている
        </text>

        <defs>
          <marker id="dns-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-500" />
          </marker>
          <marker id="dns-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function TwoPortsDiagram() {
  const holes = Array.from({ length: 6 }, (_, i) => 60 + i * 34);
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 250" className="mx-auto w-full max-w-2xl">
        <text x="160" y="24" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          ① 物理ポート = ケーブルを挿す穴
        </text>
        <rect x="35" y="44" width="250" height="70" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        {holes.map((x) => (
          <rect
            key={x}
            x={x}
            y="60"
            width="24"
            height="18"
            rx="2"
            className="fill-zinc-300 stroke-zinc-500 dark:fill-zinc-700 dark:stroke-zinc-500"
            strokeWidth="1"
          />
        ))}
        {holes.map((x) => (
          <rect
            key={`b-${x}`}
            x={x}
            y="84"
            width="24"
            height="18"
            rx="2"
            className="fill-zinc-300 stroke-zinc-500 dark:fill-zinc-700 dark:stroke-zinc-500"
            strokeWidth="1"
          />
        ))}
        <text x="160" y="134" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          スイッチや PC の背面にある
        </text>
        <text x="160" y="150" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          触れる ・ 24 口 / 48 口
        </text>
        <text x="160" y="172" textAnchor="middle" className="fill-zinc-500 font-mono text-[9px] dark:fill-zinc-500">
          gi0/1 に VLAN 10 を設定
        </text>

        <line x1="310" y1="40" x2="310" y2="210" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="460" y="24" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          ② ポート番号 = 通信につける番号
        </text>
        <rect x="340" y="44" width="240" height="70" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.4" />
        <text x="460" y="72" textAnchor="middle" className="fill-rose-800 font-mono text-[13px] font-semibold dark:fill-rose-300">
          203.0.113.10:443
        </text>
        <text x="460" y="95" textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-400">
          パケットの中に書かれている
        </text>
        <text x="460" y="134" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          目に見えない ・ 0〜65535
        </text>
        <text x="460" y="150" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          ケーブルは挿せない
        </text>
        <text x="460" y="172" textAnchor="middle" className="fill-zinc-500 font-mono text-[9px] dark:fill-zinc-500">
          443 を許可
        </text>

        <text x="310" y="228" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          見分け方: ケーブルを挿せるなら ①、番号で呼ばれているなら ②
        </text>
      </svg>
    </div>
  );
}

function AwsPortDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 380" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="44"
          width="580"
          height="272"
          rx="12"
          className="fill-zinc-50/70 stroke-zinc-400 dark:fill-zinc-900/40 dark:stroke-zinc-600"
          strokeWidth="1.5"
          strokeDasharray="7 4"
        />
        <text x="36" y="68" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          VPC  10.0.0.0/16
        </text>
        <text x="36" y="84" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          約 65,000 個の IP が入るスペース
        </text>

        <rect x="50" y="100" width="230" height="150" rx="8" className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="165" y="124" textAnchor="middle" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          ECS タスク (1 台目)
        </text>
        <text x="165" y="143" textAnchor="middle" className="fill-blue-700 font-mono text-[11px] font-semibold dark:fill-blue-400">
          IP 10.0.1.5
        </text>
        <rect x="70" y="156" width="190" height="26" rx="4" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.2" />
        <text x="84" y="173" className="fill-rose-800 font-mono text-[10px] font-semibold dark:fill-rose-300">
          3000
        </text>
        <text x="134" y="173" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          API (このサービス)
        </text>
        <text x="165" y="206" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          タスクごとに IP が 1 つ付く
        </text>
        <text x="165" y="220" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          中で動くアプリは 1 つ
        </text>

        <rect x="340" y="100" width="230" height="150" rx="8" className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="455" y="124" textAnchor="middle" className="fill-zinc-900 text-[11px] font-semibold dark:fill-zinc-100">
          RDS (2 台目)
        </text>
        <text x="455" y="143" textAnchor="middle" className="fill-blue-700 font-mono text-[11px] font-semibold dark:fill-blue-400">
          IP 10.0.32.10
        </text>
        <rect x="360" y="154" width="190" height="26" rx="4" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.2" />
        <text x="374" y="171" className="fill-rose-800 font-mono text-[10px] font-semibold dark:fill-rose-300">
          5432
        </text>
        <text x="424" y="171" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          データベース
        </text>
        <text x="455" y="204" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          PostgreSQL なので
        </text>
        <text x="455" y="218" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          最初から 5432 で待っている
        </text>

        <path d="M 165 250 L 165 276 L 455 276 L 455 250" className="fill-none stroke-emerald-500" strokeWidth="1.8" markerEnd="url(#aws-arrow)" />
        <text x="310" y="296" textAnchor="middle" className="fill-emerald-700 font-mono text-[10px] font-semibold dark:fill-emerald-400">
          10.0.32.10:5432 へ接続
        </text>
        <text x="310" y="310" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          セキュリティグループで 5432 を許可しておく
        </text>

        <rect x="60" y="334" width="12" height="12" rx="3" className="fill-blue-500" />
        <text x="80" y="344" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          IP … こちらが振り分ける (1 台に 1 つ)
        </text>
        <rect x="330" y="334" width="12" height="12" rx="3" className="fill-rose-500" />
        <text x="350" y="344" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          ポート … プログラムが元から持っている
        </text>

        <defs>
          <marker id="aws-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
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
    { id: "pair", num: 1, title: "IP とポートはセット" },
    { id: "aws", num: 2, title: "AWS だとどう見えるか" },
    { id: "localhost", num: 3, title: "localhost:3000 で見る" },
    { id: "dns", num: 4, title: "https://hoge.com と打つと" },
    { id: "two-meanings", num: 5, title: "もう 1 つの「ポート」" },
    { id: "firewall", num: 6, title: "「ポートを開ける」とは" },
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
