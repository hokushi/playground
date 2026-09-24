export default function RemoteDesktopPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          リモートデスクトップ
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          離れた場所にある PC を、自分の PC から動かす仕組みです。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          ひとことで言うと
        </SectionH2>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <p>
            <strong>遠くにある PC の画面を、自分の PC に映して、自分のマウスとキーボードで動かす</strong>こと。
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            たとえば、家にいながら会社の PC を使う、といった使い方をします。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="how" num={2}>
          何が起きているのか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          やり取りしているのは 2 つだけです。
        </p>

        <ScreenFlowDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              自分 → 会社の PC
            </p>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              「クリックした」「文字を打った」という<strong>操作</strong>を送る
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              会社の PC → 自分
            </p>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              操作した結果の<strong>画面</strong>が返ってくる
            </p>
          </div>
        </div>

        <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 px-5 py-4 dark:border-amber-700 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            大事なポイント
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            アプリが動いているのも、ファイルが置いてあるのも<strong>会社の PC のほう</strong>です。
            自分の PC には画面が映っているだけなので、自分の PC にファイルは残りません。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="when" num={3}>
          どんなときに使うのか
        </SectionH2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { title: "在宅勤務", body: "家から会社の PC を使う" },
            { title: "リモート保守", body: "システム会社が、病院に行かずにサーバを直す" },
            { title: "クラウドのサーバ", body: "AWS に立てた Windows サーバを操作する" },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{c.title}</p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="danger" num={4}>
          気をつけること
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          リモートデスクトップは、<strong>外から PC を自由に動かせる入口</strong>です。
          もし悪い人がこの入口を使えたら、その PC を乗っ取られてしまいます。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          なので、<strong>インターネットの誰からでも入口が見える状態にしてはいけません</strong>。
          家の玄関を鍵だけで大通りに向けて開けておくようなものです。
          鍵 (パスワード) を何万回も試されて、いつか開けられてしまいます。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="safe" num={5}>
          安全な使い方
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          よくあるのは、<strong>先に VPN で会社の中に入ってから</strong>リモートデスクトップを使う方法です。
        </p>

        <SafeVsDangerDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              ✕ 直接つなぐ
            </p>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              入口がインターネットから丸見え。悪い人も同じ入口を叩ける。
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ○ VPN を通してつなぐ
            </p>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              入口は会社の中にしかない。VPN に入れる人だけがたどり着ける。
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ほかに、TeamViewer のような<strong>専用アプリ</strong>を使う方法もあります。
          こちらはアプリの会社のサーバが間を取り持ってくれるので、会社側で入口を開ける必要がありません。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="forti" num={6}>
          FortiClient VPN を使った構成
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          VPN の中でもよく使われるのが、<strong>FortiClient (フォーティクライアント)</strong> と
          <strong>FortiGate (フォーティゲート)</strong> の組み合わせです。
          2 つとも Fortinet という会社の製品で、セットで使います。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              FortiClient = 自分の PC に入れるアプリ
            </p>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              「会社につないで」とボタンを押す側。
            </p>
          </div>
          <div className="rounded-lg border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-200">
              FortiGate = 会社の入口に置く機械
            </p>
            <p className="mt-2 text-sm text-violet-900/80 dark:text-violet-300">
              つないできた人を確かめて、会社の中に通す門番。
            </p>
          </div>
        </div>

        <FortiClientDiagram />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          つなぐまでの流れ
        </h3>
        <ol className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          {[
            { title: "FortiClient を開いて「接続」を押す", body: "ユーザー名とパスワードを入れる (スマホの確認コードも聞かれることがある)" },
            { title: "FortiGate が本人か確かめる", body: "OK なら、自分の PC と会社の間に専用の通り道 (VPN) ができる" },
            { title: "自分の PC が「会社の中にいる」扱いになる", body: "家にいても、会社の PC に手が届くようになる" },
            { title: "リモートデスクトップで会社の PC につなぐ", body: "Windows の「リモート デスクトップ接続」に、会社の PC の名前か IP を入れる" },
            { title: "使い終わったら切る", body: "リモートデスクトップを閉じて、FortiClient も「切断」する" },
          ].map((step, i) => (
            <li
              key={step.title}
              className="flex gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</p>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 px-5 py-4 dark:border-amber-700 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            大事なのは FortiGate の手入れ
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            FortiGate は世界中で使われているので、よく狙われます。
            過去には、<strong>更新されていない FortiGate</strong> から侵入され、
            病院のシステムが止まった事件も起きています。
            アプリが悪いのではなく、<strong>入口の機械を最新にしていなかった</strong>のが原因です。
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">誰が</th>
                <th className="px-3 py-2 text-left font-semibold">やること</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              {[
                { who: "会社 (管理者・業者)", what: "FortiGate をこまめに更新する" },
                { who: "会社 (管理者・業者)", what: "パスワードだけでなく、スマホの確認コードも必要にする (多要素認証)" },
                { who: "自分", what: "FortiClient を最新にしておく" },
                { who: "自分", what: "パスワードを使い回さない・人に教えない" },
                { who: "自分", what: "使い終わったら VPN を切る" },
              ].map((r) => (
                <tr key={r.what}>
                  <td className="whitespace-nowrap px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">{r.who}</td>
                  <td className="px-3 py-2">{r.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="related" num={7}>
          関連ページ
        </SectionH2>
        <ul className="ml-5 flex list-disc flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <li>
            <a
              href="/network/port"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ポートとは何か (443 / 80)
            </a>
            {" "}── 3389 のような「入口の番号」とは何か
          </li>
          <li>
            <a
              href="/network/vpn"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              VPN の種類 (IP-VPN ほか)
            </a>
            {" "}── 会社までの専用の通り道
          </li>
          <li>
            <a
              href="/network/firewall"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ファイアウォール / FortiGate
            </a>
            {" "}── FortiGate がほかに何をしているか
          </li>
        </ul>
      </section>
    </main>
  );
}

function ScreenFlowDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 200" className="mx-auto w-full max-w-2xl">
        <text x="110" y="24" textAnchor="middle" className="fill-zinc-800 text-[12px] font-semibold dark:fill-zinc-200">
          自分の PC (家)
        </text>
        <rect x="40" y="40" width="140" height="90" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <rect x="52" y="52" width="116" height="66" rx="3" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="110" y="82" textAnchor="middle" className="fill-emerald-800 text-[11px] font-semibold dark:fill-emerald-300">
          会社の PC の画面が
        </text>
        <text x="110" y="98" textAnchor="middle" className="fill-emerald-800 text-[11px] font-semibold dark:fill-emerald-300">
          映っている
        </text>

        <text x="550" y="24" textAnchor="middle" className="fill-zinc-800 text-[12px] font-semibold dark:fill-zinc-200">
          会社の PC
        </text>
        <rect x="480" y="40" width="140" height="90" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="550" y="82" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">
          ここで実際に
        </text>
        <text x="550" y="98" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">
          アプリが動いている
        </text>

        <line x1="190" y1="65" x2="470" y2="65" className="stroke-blue-500" strokeWidth="2.5" markerEnd="url(#sf-arrow-blue)" />
        <text x="330" y="55" textAnchor="middle" className="fill-blue-700 text-[12px] font-semibold dark:fill-blue-400">
          ① 操作を送る
        </text>

        <line x1="470" y1="110" x2="190" y2="110" className="stroke-emerald-500" strokeWidth="2.5" markerEnd="url(#sf-arrow-green)" />
        <text x="330" y="132" textAnchor="middle" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-400">
          ② 画面が返ってくる
        </text>

        <text x="330" y="180" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          これをすごい速さでくり返すので、目の前の PC を使っているように感じる
        </text>

        <defs>
          <marker id="sf-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
          </marker>
          <marker id="sf-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function SafeVsDangerDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 300" className="mx-auto w-full max-w-2xl">
        <text x="20" y="24" className="fill-rose-700 text-[12px] font-semibold dark:fill-rose-400">
          ✕ 直接つなぐ
        </text>
        <rect x="30" y="40" width="100" height="36" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
        <text x="80" y="63" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          自分
        </text>
        <rect x="30" y="92" width="100" height="36" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.3" />
        <text x="80" y="115" textAnchor="middle" className="fill-rose-900 text-[11px] font-semibold dark:fill-rose-200">
          悪い人
        </text>
        <line x1="132" y1="58" x2="456" y2="80" className="stroke-zinc-500" strokeWidth="2" markerEnd="url(#sd-arrow)" />
        <line x1="132" y1="110" x2="456" y2="90" className="stroke-rose-500" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#sd-arrow-rose)" />
        <text x="290" y="120" textAnchor="middle" className="fill-rose-600 text-[10px] dark:fill-rose-400">
          同じ入口に来られてしまう
        </text>
        <rect x="460" y="60" width="160" height="50" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="540" y="82" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          会社の PC
        </text>
        <text x="540" y="99" textAnchor="middle" className="fill-rose-600 text-[10px] dark:fill-rose-400">
          入口が外から丸見え
        </text>

        <line x1="20" y1="152" x2="640" y2="152" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="20" y="182" className="fill-emerald-700 text-[12px] font-semibold dark:fill-emerald-400">
          ○ VPN を通してつなぐ
        </text>
        <rect x="30" y="227" width="100" height="36" rx="6" className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700" strokeWidth="1.3" />
        <text x="80" y="250" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          自分
        </text>

        <rect x="300" y="196" width="340" height="84" rx="10" className="fill-emerald-50/60 stroke-emerald-400 dark:fill-emerald-950/20 dark:stroke-emerald-700" strokeWidth="1.3" strokeDasharray="5 3" />
        <text x="470" y="214" textAnchor="middle" className="fill-emerald-800 text-[10px] font-semibold dark:fill-emerald-300">
          会社の中
        </text>
        <rect x="460" y="220" width="160" height="50" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="540" y="242" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          会社の PC
        </text>
        <text x="540" y="259" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          入口は会社の中だけ
        </text>

        <path d="M 132 245 L 300 245" className="stroke-emerald-300 dark:stroke-emerald-800" strokeWidth="14" strokeLinecap="round" />
        <line x1="132" y1="245" x2="456" y2="245" className="stroke-emerald-600" strokeWidth="2" markerEnd="url(#sd-arrow-green)" />
        <text x="216" y="228" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          VPN (専用の通り道)
        </text>

        <defs>
          <marker id="sd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-500" />
          </marker>
          <marker id="sd-arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
          <marker id="sd-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-600" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function FortiClientDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 680 270" className="mx-auto w-full max-w-2xl">
        <text x="85" y="22" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          家
        </text>
        <rect x="20" y="36" width="130" height="80" rx="8" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.5" />
        <text x="85" y="62" textAnchor="middle" className="fill-blue-900 text-[12px] font-semibold dark:fill-blue-200">
          自分の PC
        </text>
        <rect x="35" y="74" width="100" height="18" rx="4" className="fill-white stroke-blue-300 dark:fill-zinc-950 dark:stroke-blue-800" strokeWidth="1" />
        <text x="85" y="87" textAnchor="middle" className="fill-blue-700 text-[9px] font-semibold dark:fill-blue-300">
          FortiClient
        </text>
        <rect x="35" y="94" width="100" height="18" rx="4" className="fill-white stroke-blue-300 dark:fill-zinc-950 dark:stroke-blue-800" strokeWidth="1" />
        <text x="85" y="107" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-300">
          リモートデスクトップ
        </text>

        <ellipse cx="250" cy="76" rx="70" ry="44" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="250" y="30" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          インターネット
        </text>

        <rect x="360" y="30" width="300" height="190" rx="12" className="fill-zinc-50/60 stroke-zinc-300 dark:fill-zinc-900/40 dark:stroke-zinc-700" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="510" y="22" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          会社
        </text>

        <rect x="370" y="46" width="100" height="60" rx="8" className="fill-violet-50 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.5" />
        <text x="420" y="72" textAnchor="middle" className="fill-violet-900 text-[12px] font-semibold dark:fill-violet-200">
          FortiGate
        </text>
        <text x="420" y="90" textAnchor="middle" className="fill-violet-700 text-[9px] dark:fill-violet-400">
          入口の門番
        </text>

        <rect x="540" y="46" width="110" height="60" rx="8" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.4" />
        <text x="595" y="72" textAnchor="middle" className="fill-zinc-800 text-[12px] font-semibold dark:fill-zinc-200">
          会社の PC
        </text>
        <text x="595" y="90" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          画面を送ってくる
        </text>

        <path d="M 152 76 L 368 76" className="stroke-emerald-200 dark:stroke-emerald-900" strokeWidth="26" strokeLinecap="round" />
        <line x1="152" y1="76" x2="364" y2="76" className="stroke-emerald-600" strokeWidth="2" markerEnd="url(#fc-arrow-green)" />
        <text x="260" y="112" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          ① VPN (専用の通り道)
        </text>

        <line x1="472" y1="76" x2="536" y2="76" className="stroke-blue-500" strokeWidth="2" markerEnd="url(#fc-arrow-blue)" />
        <text x="504" y="68" textAnchor="middle" className="fill-blue-700 text-[9px] font-semibold dark:fill-blue-400">
          ② RDP
        </text>

        <rect x="380" y="130" width="270" height="76" rx="8" className="fill-white stroke-zinc-200 dark:fill-zinc-950 dark:stroke-zinc-800" strokeWidth="1" />
        <text x="392" y="150" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
          FortiGate がやっていること
        </text>
        <text x="392" y="170" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          ・パスワード (と確認コード) で本人確認
        </text>
        <text x="392" y="186" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          ・VPN で入ってきた人だけ、会社の PC へ通す
        </text>
        <text x="392" y="202" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          ・それ以外の人は入口で止める
        </text>

        <text x="340" y="252" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          先に ① VPN で会社の中に入り、そのあと ② リモートデスクトップで会社の PC を操作する
        </text>

        <defs>
          <marker id="fc-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-600" />
          </marker>
          <marker id="fc-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
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
    { id: "intro", num: 1, title: "ひとことで言うと" },
    { id: "how", num: 2, title: "何が起きているのか" },
    { id: "when", num: 3, title: "どんなときに使うのか" },
    { id: "danger", num: 4, title: "気をつけること" },
    { id: "safe", num: 5, title: "安全な使い方" },
    { id: "forti", num: 6, title: "FortiClient VPN を使った構成" },
    { id: "related", num: 7, title: "関連ページ" },
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
