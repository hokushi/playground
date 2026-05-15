export default function ThreadsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          スレッドとメモリの基礎
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「Web Worker って 1 スレッド？」を理解するために、プロセス・スレッド・メモリの仕組みを基礎から整理します。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          先に結論
        </h2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>Web Worker 1 個 = スレッド 1 本</strong>
          </li>
          <li>
            ただし Worker は <strong>何個でも作れる</strong>。複数 Worker を立てれば複数スレッドで並列処理できる
          </li>
          <li>
            JS の Worker は <strong>メモリを共有しない</strong>（基本は完全に独立）。値のやり取りは postMessage で「コピー」される
          </li>
          <li>
            「<strong>ガチで同時実行</strong>」できるのは CPU コア数まで。それを超える数のスレッドは OS が高速に切り替えて動かす（タブを何個も開けるのはこのおかげ）
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ざっくり理解: スレッド と メモリ は別もの
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          まずよくある誤解を解いておきます。<strong>スレッドとメモリは別物</strong>です。
          いつも一緒に出てくるので混ざりがちですが、役割が全く違います。
          <strong>料理屋（レストラン）</strong>でたとえると分かりやすいです。
        </p>

        <KitchenAnalogyDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              スレッド ＝ 料理人
            </h3>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              実際に動いて作業する人。包丁を持ったり、火にかけたり、
              <strong>命令を 1 つずつ実行していく流れ</strong>のこと。
              料理人 1 人は同時に 1 つのことしかできません。
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">
              メモリ ＝ 作業台と食材棚
            </h3>
            <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-300">
              材料や作りかけを<strong>置いておく場所</strong>。
              料理人が使う「物」が置かれているところで、料理人自身ではありません。
              玉ねぎ、塩、鍋などが並んでいる棚や台のイメージ。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            この比喩で各概念を当てはめると:
          </p>
          <ul className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・料理人が <strong>1 人だけ</strong> → シングルスレッド（普通の JS）
            </li>
            <li>
              ・料理人を <strong>増やす</strong> → Web Worker を新しく作る
            </li>
            <li>
              ・<strong>料理人ごとに専用の作業台</strong>を持つ → Web Worker のメモリ非共有
            </li>
            <li>
              ・材料を別の料理人に渡したい →{" "}
              <code>postMessage</code> で「コピーして渡す」
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          つまり「スレッドを増やす」とは{" "}
          <strong>料理人を雇う</strong>こと、「メモリを共有する」とは
          <strong>同じ作業台を使う</strong>こと。別の話なので、別々に考えればOKです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          1. もう少し正確に: スレッドとは
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          スレッドは <strong>命令を実行していく流れ</strong>のこと。
          コンピュータの中で <code>i = i + 1</code> →{" "}
          <code>console.log(i)</code> →…と命令を一つずつ実行していく単位、と考えるとよいです。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          重要なポイントは <strong>1 つのスレッドは一度に 1 つの命令しか実行できない</strong>こと。
          だから同時に 2 つのことをやりたければ「スレッドを増やす」必要があります（＝料理人を増やす）。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          2. プロセスとスレッドの違い
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              プロセス
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              OS から見たアプリの実行単位。<strong>独立したメモリ空間</strong>を持つ。
              他のプロセスのメモリは見えない。例: Chrome のタブ 1 つ、VSCode 本体など。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              スレッド
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              プロセスの中の実行単位。<strong>同じプロセス内のスレッドはメモリを共有</strong>する。
              軽量で、プロセス内に複数立てられる。
            </p>
          </div>
        </div>

        <ProcessThreadDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            具体シナリオ: ページに画像 1 枚が表示されるまで
          </p>
          <ol className="ml-4 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ① <strong>メインスレッド</strong>が JS を実行し、{" "}
              <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
                {`<img src="cat.jpg">`}
              </code>{" "}
              を DOM に追加
            </li>
            <li>
              ② <strong>ネットワークスレッド</strong>がそのURL に GET リクエストを送って画像バイナリを受信 → メモリに保存
            </li>
            <li>
              ③ <strong>レンダリングスレッド</strong>が同じメモリ上の画像データを読んで、画面のピクセルとして描画
            </li>
            <li>
              ④ 並行して <strong>JS GC スレッド</strong>が「もう使われていないオブジェクト」を回収
            </li>
          </ol>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            3 つのスレッドが「同じメモリ上の画像データ」を共有しているからこそ、コピーせずにリレーできて高速。
            これがプロセス内のスレッドが <strong>メモリを共有する</strong>ことの実用的な意味。
          </p>
        </div>

        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          ブラウザに限らず、ほぼ全てのアプリが同じ仕組みで動いています。例えば普段使っている VSCode も：
        </p>

        <VSCodeProcessDiagram />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ざっくり: プロセスは「家」、スレッドは「家の中の住人」。同じ家の住人は冷蔵庫（メモリ）を共有しますが、別の家の冷蔵庫は覗けません。
          住人を増やしたい時は同じ家の中に増やすか、新しい家ごと建てるかの 2 択になります。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          3. メモリの基本（スタックとヒープ）
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          メモリはざっくり 2 種類に分かれます。これがスレッドの理解にも繋がります。
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              スタック (Stack)
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              関数呼び出しの履歴やローカル変数を置く場所。<strong>スレッド毎に専用</strong>に持つ。小さくて高速。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              ヒープ (Heap)
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              オブジェクトや配列など、大きいデータを置く場所。<strong>プロセス内で共有</strong>（C++/Java など普通の言語の場合）。
            </p>
          </div>
        </div>

        <MemoryDiagram />

        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <strong>競合状態（race condition）</strong>: 普通の言語では複数スレッドが同じヒープを見るので、同じ変数に同時書き込みすると壊れる。ロック・ミューテックスなどで守る必要がある。
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          4. ブラウザと JS の世界
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ブラウザ（Chrome など）は <strong>マルチプロセス</strong>で動いています。タブ毎にプロセスを分けてあるので、片方のタブが固まってもブラウザ全体は落ちません。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          そして <strong>各タブの中の JavaScript は基本 1 スレッド</strong>で動きます。これが「JS はシングルスレッド」と言われる所以。レンダリング・イベント処理・スクリプト実行が全部この 1 本に乗ります。
        </p>
        <BrowserModelDiagram />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          5. Web Worker は別スレッド（でも特殊）
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <code>new Worker(...)</code> すると、タブのプロセス内に新しいスレッドが立ち上がります。<strong>1 個の Worker = 1 本のスレッド</strong>です。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          ただし JS の Worker は普通のスレッドと違って、<strong>メインスレッドとメモリを共有しません</strong>。各 Worker は独立した「世界（V8 isolate）」を持ちます。
        </p>
        <WorkerIsolationDiagram />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          だから値のやり取りは <code>postMessage</code> で「コピー」される（構造化クローン）。これが安全な代わりに、巨大なデータの受け渡しはコストになる。
        </p>
        <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <strong>例外: SharedArrayBuffer</strong> という API を使うと、Worker 間で実際にメモリを共有できる。ただしセキュリティ要件が厳しく、特殊用途向け。
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          6. Worker は何個作れる？並列度は？
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          技術的には <strong>何個でも</strong>作れます。ただし「<strong>ある瞬間に CPU で実行されている</strong>スレッドの数」は CPU のコア数までです。4 コア CPU なら一度に 4 スレッドが本当の意味で並列に動きます。
        </p>
        <CpuCoreDiagram />

        <h3 className="mt-2 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ⚠ よくある疑問: 「4 スレッドまで」なら、なんでタブを何個も開けるの？
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ブラウザのタブ 1 個でも何本もスレッドが動いていて、それを 10 タブ、20 タブと開いても普通に動きますよね。「4 スレッドまで」とは矛盾しているように見えますが、理由は 2 つあります。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              理由 1: ほとんどのスレッドは「待っている」だけ
            </h4>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              スレッドは大半の時間「何かを待っている」状態で、CPU を使っていません。
            </p>
            <ul className="mt-2 ml-4 flex flex-col gap-0.5 text-xs text-emerald-900/80 dark:text-emerald-300">
              <li>・ネットワークスレッド → サーバーの応答待ち</li>
              <li>・メインスレッド → ユーザーのクリック待ち</li>
              <li>・IndexedDB スレッド → ディスク I/O 待ち</li>
            </ul>
            <p className="mt-2 text-xs text-emerald-900/80 dark:text-emerald-300">
              実際に CPU が必要なのは「計算中」「描画中」のスレッドだけ。なので 1000 個スレッドあっても、同時にバリバリ計算しているのはほんの一握り。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              理由 2: OS が超高速で切り替えている
            </h4>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              OS のスケジューラは 1 秒間に <strong>何百回も</strong>{" "}
              スレッドを切り替えます（コンテキストスイッチ）。
            </p>
            <ul className="mt-2 ml-4 flex flex-col gap-0.5 text-xs text-amber-900/80 dark:text-amber-300">
              <li>・各スレッドは数 ms だけ CPU を使う</li>
              <li>・時間が来たら次のスレッドに譲る</li>
              <li>・人間の目には全部同時に動いて見える</li>
            </ul>
            <p className="mt-2 text-xs text-amber-900/80 dark:text-amber-300">
              実際に並列なのは 4 つだけど、1 秒間に何百回も切り替えるので体感的には全部同時。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            料理屋でたとえると
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            料理人 4 人（CPU 4 コア）に、注文票が 100 枚（スレッド 100 本）あったとします。
          </p>
          <ul className="mt-2 ml-4 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・多くの注文は<strong>「鍋で煮込み中」「オーブンで焼き中」</strong>など、料理人が立ち会わなくてよい状態（＝待ち）
            </li>
            <li>
              ・料理人は手が空いたら次の注文に手を出す（＝コンテキストスイッチ）
            </li>
            <li>
              ・なので料理人 4 人でも 100 件の注文を回せる
            </li>
            <li>
              ・<strong>例外</strong>: 100 枚全部が「今すぐ料理人の手を 100%使わせろ」だったら詰まる（＝Worker を 100 個立てて全部で重い計算を一斉に走らせると、コア数の限界がボトルネックになる）
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          目安: 重い処理を並列化したい時は、<code>navigator.hardwareConcurrency</code>（論理コア数）を見て Worker 数を決めるとよい。やみくもに増やすと逆にスイッチコストで遅くなる。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          まとめ
        </h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">項目</th>
                <th className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-300">JS / Web Worker の場合</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SummaryRow label="メインスレッド数" value="1（ブラウザのタブごと）" />
              <SummaryRow label="Worker 1 個のスレッド数" value="1" />
              <SummaryRow label="Worker は何個作れる？" value="何個でも（実用的には CPU コア数程度）" />
              <SummaryRow label="メモリ共有" value="基本なし（独立）。SharedArrayBuffer は例外" />
              <SummaryRow label="値の受け渡し" value="postMessage（構造化クローンでコピー）" />
              <SummaryRow label="真の並列実行" value="CPU コア数まで" />
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="px-4 py-2 align-top font-medium text-zinc-900 dark:text-zinc-100">{label}</td>
      <td className="px-4 py-2 text-zinc-600 dark:text-zinc-400">{value}</td>
    </tr>
  );
}

function KitchenAnalogyDiagram() {
  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        料理屋でたとえると
      </figcaption>
      <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col items-center gap-2 rounded-md border-2 border-dashed border-blue-300 bg-blue-50 p-4 text-center dark:border-blue-800 dark:bg-blue-950/30">
          <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            スレッド = 料理人
          </div>
          <div className="text-sm text-zinc-800 dark:text-zinc-200">
            動いて作業する人
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            包丁を握る・煮る・混ぜる…
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 px-2 text-xs">
          <div className="text-zinc-500 dark:text-zinc-400">が使う</div>
          <div className="font-mono text-base text-zinc-700 dark:text-zinc-300">
            ─────→
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-md border-2 border-dashed border-purple-300 bg-purple-50 p-4 text-center dark:border-purple-800 dark:bg-purple-950/30">
          <div className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
            メモリ = 作業台 + 食材棚
          </div>
          <div className="text-sm text-zinc-800 dark:text-zinc-200">
            材料や作りかけを置く場所
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            玉ねぎ・塩・鍋…
          </div>
        </div>
      </div>
    </figure>
  );
}

function ProcessThreadDiagram() {
  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        例: ブラウザのタブ 1 個 = 1 プロセス
      </figcaption>
      <div className="rounded-md border-2 border-dashed border-blue-300 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Process: ブラウザのタブ（例: example.com を開いた 1 タブ）
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <ThreadRow
            name="メインスレッド"
            job="JS の実行、DOM 操作、クリック等イベント処理、setTimeout"
          />
          <ThreadRow
            name="レンダリングスレッド"
            job="画面に実際にピクセルを描く（Compositor）"
          />
          <ThreadRow
            name="ネットワークスレッド"
            job="HTTP 通信、画像 / JS / CSS のダウンロード"
          />
          <ThreadRow
            name="JS GC スレッド"
            job="使われなくなったオブジェクトをメモリから掃除"
          />
          <ThreadRow
            name="IndexedDB スレッド"
            job="ブラウザのローカル DB の読み書き"
          />
          <ThreadRow
            name="Web Worker（任意）"
            job="new Worker() で増やせる、自分で作るスレッド"
          />
        </div>
        <div className="rounded border border-blue-300 bg-white px-3 py-2 dark:border-blue-800 dark:bg-zinc-900">
          <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Memory（このタブの全スレッドが共有）
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            DOM ツリー / JS のオブジェクト / ダウンロード済み画像 / fetch 結果 / 変数 / etc.
          </div>
        </div>
      </div>
    </figure>
  );
}

function ThreadRow({ name, job }: { name: string; job: string }) {
  return (
    <div className="flex flex-col rounded border border-blue-400 bg-white px-3 py-2 dark:border-blue-700 dark:bg-zinc-900 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 sm:w-40 sm:shrink-0">
        {name}
      </span>
      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">{job}</span>
    </div>
  );
}

function VSCodeProcessDiagram() {
  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        ブラウザ以外の例: VSCode も同じ仕組み
      </figcaption>
      <div className="rounded-md border-2 border-dashed border-blue-300 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Process: VSCode 本体
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <ThreadRow
            name="UI スレッド"
            job="エディタ画面、メニュー、ファイルツリーの描画"
          />
          <ThreadRow
            name="拡張機能ホスト"
            job="インストールした拡張機能（Claude Code, ESLint など）"
          />
          <ThreadRow
            name="言語サーバー"
            job="TypeScript の型チェック、補完候補の生成"
          />
          <ThreadRow
            name="ファイル監視"
            job="エディタ外からのファイル変更を検知"
          />
        </div>
        <div className="rounded border border-blue-300 bg-white px-3 py-2 dark:border-blue-800 dark:bg-zinc-900">
          <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Memory（VSCode プロセス内で共有）
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            開いているファイルの中身 / 設定 / 拡張機能の状態 / etc.
          </div>
        </div>
      </div>
    </figure>
  );
}

function MemoryDiagram() {
  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        メモリの構造（普通の言語の場合）
      </figcaption>
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="flex flex-col gap-2">
          <MemoryBox label="Stack (Thread 1)" tone="green" />
          <MemoryBox label="Stack (Thread 2)" tone="green" />
          <MemoryBox label="Stack (Thread 3)" tone="green" />
        </div>
        <div className="flex items-center justify-center rounded-md border-2 border-dashed border-purple-300 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/30">
          <div className="text-center">
            <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Heap
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              全スレッドで共有
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function MemoryBox({ label, tone }: { label: string; tone: "green" }) {
  const cls =
    tone === "green"
      ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
      : "";
  return (
    <div className={`rounded border px-3 py-2 text-xs font-medium ${cls}`}>
      {label}
    </div>
  );
}

function BrowserModelDiagram() {
  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        ブラウザのプロセス／スレッドモデル
      </figcaption>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TabProcess title="Tab A" sub="example.com" />
        <TabProcess title="Tab B" sub="other.com" />
      </div>
    </figure>
  );
}

function TabProcess({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="rounded-md border-2 border-dashed border-blue-300 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
          {title} Process
        </span>
        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{sub}</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="rounded border border-blue-400 bg-white px-3 py-2 text-xs dark:border-blue-700 dark:bg-zinc-900">
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            Main thread
          </span>
          <span className="ml-1 text-zinc-500 dark:text-zinc-400">
            JS / DOM / レンダリング
          </span>
        </div>
        <div className="rounded border border-zinc-300 bg-zinc-50 px-3 py-1 text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          + 他のスレッド（ネットワーク、コンポジット等）
        </div>
      </div>
    </div>
  );
}

function WorkerIsolationDiagram() {
  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Worker は独立した世界（メモリ共有なし）
      </figcaption>
      <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <IsolatedWorld label="Main thread" tone="blue" />
        <div className="flex flex-col items-center gap-1 text-xs">
          <div className="text-zinc-500 dark:text-zinc-400">postMessage</div>
          <div className="font-mono text-zinc-700 dark:text-zinc-300">←─ コピー ─→</div>
          <div className="text-zinc-500 dark:text-zinc-400">onmessage</div>
        </div>
        <IsolatedWorld label="Worker thread" tone="emerald" />
      </div>
    </figure>
  );
}

function IsolatedWorld({
  label,
  tone,
}: {
  label: string;
  tone: "blue" | "emerald";
}) {
  const cls =
    tone === "blue"
      ? "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
      : "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30";
  const labelCls =
    tone === "blue"
      ? "text-blue-700 dark:text-blue-300"
      : "text-emerald-700 dark:text-emerald-300";
  return (
    <div className={`rounded-md border-2 border-dashed p-3 ${cls}`}>
      <div className={`mb-2 text-xs font-semibold uppercase tracking-wide ${labelCls}`}>
        {label}
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <div className="rounded border bg-white px-2 py-1 dark:bg-zinc-900">Stack</div>
        <div className="rounded border bg-white px-2 py-1 dark:bg-zinc-900">Heap</div>
      </div>
    </div>
  );
}

function CpuCoreDiagram() {
  return (
    <figure className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        スレッドと CPU コアの関係
      </figcaption>
      <div className="flex flex-wrap gap-2">
        {["Main", "Worker 1", "Worker 2", "Worker 3", "Worker 4", "Worker 5"].map(
          (t) => (
            <div
              key={t}
              className="rounded border border-blue-400 bg-white px-2 py-1 text-xs dark:border-blue-700 dark:bg-zinc-900"
            >
              {t}
            </div>
          ),
        )}
      </div>
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        ↓ OS のスケジューラが割り当て ↓
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="rounded border-2 border-purple-400 bg-purple-50 px-3 py-2 text-center text-xs font-semibold text-purple-700 dark:border-purple-700 dark:bg-purple-950/30 dark:text-purple-300"
          >
            CPU Core {n}
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        コア数より多いスレッドは順番に切り替えて実行（コンテキストスイッチ）。ガチで並列に動くのは <strong>コア数まで</strong>。
      </p>
    </figure>
  );
}
