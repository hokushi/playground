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
    { id: "changes", num: 1, title: "言語で変わること・変わらないこと" },
    { id: "list", num: 2, title: "よく使われる言語と得意分野" },
    { id: "typing", num: 3, title: "型があるか、ないか" },
    { id: "concurrency", num: 4, title: "並行処理の得意・不得意" },
    { id: "choose", num: 5, title: "実際どう選ぶか" },
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

export default function LanguagesPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          言語ごとの得意・不得意
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「この案件は何で書くか」を聞かれたときの判断材料。
          結論から言うと、<strong>多くの業務システムでは言語で性能は決まりません</strong>。
          変わるのは書きやすさと、5 年後に直せるかどうかです。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="changes" num={1}>言語で変わること・変わらないこと</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          言語選定の議論は「どれが速いか」に流れがちですが、
          普通の業務システムではそこで差がつきません。
          社内向けで<strong>同時 500 人</strong>という規模でも、
          人が数分に一度画面を開く使い方なら<strong>ピークで数十 req/s</strong> 程度です。
          この負荷はどの言語でも捌けます。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              言語で変わらないこと
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>動くかどうか</strong>（大抵どれでも動く）</li>
              <li>・検索や集計の速さ（<strong>DB と索引</strong>の仕事）</li>
              <li>・可用性（<strong>インフラ構成</strong>の話）</li>
              <li>・外部 API を叩けるか（どれにもライブラリがある）</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              言語で変わること
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>間違いをいつ見つけられるか</strong>（型）</li>
              <li>・<strong>CPU を使う処理</strong>の書きやすさ</li>
              <li>・そのライブラリが揃っているか</li>
              <li>・<strong>保守する人を集められるか</strong></li>
            </ul>
          </div>
        </div>

        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
          遅い業務システムの原因は、ほぼ <strong>DB のクエリと索引</strong>です。
          言語を速いものに替えても直りません。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="list" num={2}>よく使われる言語と得意分野</SectionH2>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">言語</th>
                <th className="px-3 py-2 text-left font-semibold">よく使われる場所</th>
                <th className="px-3 py-2 text-left font-semibold">強み</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">TypeScript</td>
                <td className="px-3 py-2 text-xs">Web 画面、Node の API、React Native</td>
                <td className="px-3 py-2 text-xs">
                  <strong>画面（ブラウザ側）の事実上の標準</strong>。同じ言語でサーバーも書ける
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Python</td>
                <td className="px-3 py-2 text-xs">AI・データ処理、社内スクリプト</td>
                <td className="px-3 py-2 text-xs">
                  <strong>ライブラリが圧倒的</strong>。書く量が少なく、試作が速い
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Go</td>
                <td className="px-3 py-2 text-xs">API サーバー、CLI、インフラ道具</td>
                <td className="px-3 py-2 text-xs">
                  <strong>並行処理が言語標準</strong>。単一バイナリで配布・起動が速い
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Java</td>
                <td className="px-3 py-2 text-xs">大企業の基幹システム</td>
                <td className="px-3 py-2 text-xs">
                  <strong>実績と人の多さ</strong>。長期運用の道具が揃っている
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">C#</td>
                <td className="px-3 py-2 text-xs">業務システム、Windows 系、Unity</td>
                <td className="px-3 py-2 text-xs">
                  Java に近い性格。<strong>Microsoft 環境と相性がよい</strong>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">PHP</td>
                <td className="px-3 py-2 text-xs">Web サイト、CMS</td>
                <td className="px-3 py-2 text-xs">
                  <strong>WordPress</strong>。安いサーバーでそのまま動く
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Ruby</td>
                <td className="px-3 py-2 text-xs">Web アプリ</td>
                <td className="px-3 py-2 text-xs">
                  <strong>Rails</strong>。少人数で速く形にできる
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Rust</td>
                <td className="px-3 py-2 text-xs">性能と安全が要る所、基盤ソフト</td>
                <td className="px-3 py-2 text-xs">
                  速さと<strong>メモリ安全を型で保証</strong>。学習コストは高い
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Swift / Kotlin</td>
                <td className="px-3 py-2 text-xs">iOS / Android</td>
                <td className="px-3 py-2 text-xs">
                  各 OS の純正。<strong>新機能が最初に使える</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          この表の「強み」は、
          <strong>他の言語では代わりが利かないこと</strong>だけを書いています。
          「速い」「書きやすい」はどの言語も主張するので、選定理由になりません。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="typing" num={3}>型があるか、ないか</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          実際の開発で一番効いてくる違いです。
          <strong>間違いが実行前に見つかるか、動かすまで分からないか</strong>の差になります。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 border-l-4 border-l-indigo-400 bg-white p-4 dark:border-zinc-800 dark:border-l-indigo-500/70 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              静的型
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              TypeScript / Go / Java / C# / Rust / Swift / Kotlin
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・書いた時点で型の食い違いが分かる</li>
              <li>・エディタが補完してくれる</li>
              <li>・<strong>直す時に壊した箇所が全部出る</strong></li>
              <li>・書く量は少し増える</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              動的型
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Python / Ruby / PHP / JavaScript
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・すぐ書ける、すぐ動かせる</li>
              <li>・試作や使い捨てのスクリプトに向く</li>
              <li>・<strong>間違いは動かすまで分からない</strong></li>
              <li>・テストで担保する前提になる</li>
            </ul>
          </div>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          目安は<strong>人数と期間</strong>です。
          1 人で数週間なら動的型が速い。
          <strong>複数人で数年触り続けるなら静的型</strong>。
          区分コードや金額のように、1 文字の取り違えが業務判断を変えるデータを扱うときは特に効きます。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="concurrency" num={4}>並行処理の得意・不得意</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          「同時にたくさん処理する」には 2 種類あります。
          <strong>待ち時間が多い処理</strong>（DB や外部 API の応答待ち）と、
          <strong>CPU を使い続ける処理</strong>（大量データの変換、画像処理）です。
          言語で差が出るのは後者だけです。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">言語</th>
                <th className="px-3 py-2 text-left font-semibold">待ちが多い処理</th>
                <th className="px-3 py-2 text-left font-semibold">CPU を使う処理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">Go</td>
                <td className="px-3 py-2 text-xs">得意（goroutine）</td>
                <td className="px-3 py-2 text-xs">得意。複数コアを素直に使える</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Java / C#</td>
                <td className="px-3 py-2 text-xs">得意</td>
                <td className="px-3 py-2 text-xs">得意。スレッドは重めだが実績十分</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Rust</td>
                <td className="px-3 py-2 text-xs">得意</td>
                <td className="px-3 py-2 text-xs">得意。競合を型で防げる</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">TypeScript (Node)</td>
                <td className="px-3 py-2 text-xs">
                  <strong>得意</strong>。待ちの捌きに特化した作り
                </td>
                <td className="px-3 py-2 text-xs">
                  苦手。1 スレッドなので分割の設計が要る
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Python</td>
                <td className="px-3 py-2 text-xs">async で捌ける</td>
                <td className="px-3 py-2 text-xs">
                  苦手（GIL）。プロセスを分けて逃がす
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
          注意したいのは、<strong>業務システムのほとんどは「待ちが多い処理」だけ</strong>だということ。
          CSV を読んで DB に入れるバッチも、実際の時間の大半は DB への書き込み待ちです。
          <strong>CPU が苦手な言語でも困りません</strong>。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="choose" num={5}>実際どう選ぶか</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          性能では絞れないことが多いので、次の順で決めると迷いません。
        </p>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 1 ── ブラウザで動かすか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              ブラウザが直接実行できるのは <strong>JavaScript</strong> と{" "}
              <strong>WebAssembly</strong> の 2 つだけです。
              TypeScript も JavaScript に変換してから動いています。
              画面を書くなら <strong>JavaScript か TypeScript が事実上の標準</strong>で、
              ここはほぼ選ぶ余地がありません。
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              ※ Rust や Go を WebAssembly に変換してブラウザで動かすこともできますが、
              画面そのものを作る用途ではなく、重い計算を任せる部分的な使い方が中心です。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 2 ── CPU を使い続ける処理があるか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              あるなら <strong>Go / Java / Rust</strong>。
              無いなら（＝ほとんどの業務システム）この問いは無視してよいです。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 border-l-4 border-l-indigo-400 bg-indigo-50/30 p-4 dark:border-zinc-800 dark:border-l-indigo-500/70 dark:bg-indigo-950/10">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 3 ── 5 年後に誰が直すか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>ここが本当の決め手</strong>です。
              そのチームが書ける言語にする。書ける人を採れる言語にする。
              性能で 1 割速い言語より、直せる人がいる言語の方が価値があります。
            </p>
          </div>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          言語を分けるか、揃えるか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          画面とサーバーで言語を分けると、
          <strong>同じロジックを 2 回書く場面</strong>が出てきます。
          入力値の正規化、金額や日付の丸め、権限の判定あたりです。
          片方だけ直すと画面と結果が食い違うので、
          <strong>分ける明確な理由がないなら揃える</strong>方が安全です。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          逆に分ける理由になるのは、<strong>問 2 に当たる重い処理があるとき</strong>と、
          <strong>保守するチームが既にその言語で回っているとき</strong>の 2 つです。
          どちらも当てはまらないなら、TypeScript で通すのが素直な選択になります。
        </p>
      </section>
    </main>
  );
}
