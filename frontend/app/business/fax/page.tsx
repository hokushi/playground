export default function FaxPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ファックスの仕組み
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「紙を電話線で送る」── そのとき実際に何が起きているのか。
          スキャン → 音 → 印刷の流れを順番に見ていきます。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <p className="text-zinc-700 dark:text-zinc-300">
          ファックスは突き詰めると <strong>「紙の絵を、電話で読み上げて、相手に書き取ってもらう」</strong> 装置です。
          ただし読むのも書くのも機械なので、ものすごく速い。流れは 5 ステップに分けられます。
        </p>

        <FaxFlowDiagram />

        <ol className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>① スキャン</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              横一列に並んだ光センサーで、紙を上から下へ <strong>1 行ずつ</strong> 読み取り、
              <strong>白なら 0 / 黒なら 1</strong> のビット列に変換する。色も灰色もない、白黒だけ。
            </p>
          </li>
          <li>
            <strong>② 圧縮</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              紙のほとんどは白い余白。「白が何個続く、次に黒が何個…」とまとめて
              <strong>長さで表現する (ランレングス)</strong> ことで一気に縮める。G3 では MH / MR / MMR と呼ばれる方式。
            </p>
          </li>
          <li>
            <strong>③ 変調 (モデム)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              電話線は音声 (300〜3400 Hz のアナログ波) しか流せない。
              そこで <strong>0/1 を音の高さや位相に対応付けて</strong>、電話で運べる「ただの音」に変換する。
              これが <strong>モデム (modulator/demodulator)</strong> の仕事。
            </p>
          </li>
          <li>
            <strong>④ 電話線で送る</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              電話線にとっては <strong>ただの音声通話</strong>と区別がつかない。
              通信開始時の「ピーヒョロロ」は、お互いの機種が解像度・速度を交渉している
              <strong>ハンドシェイク</strong>の音。
            </p>
          </li>
          <li>
            <strong>⑤ 復調 → 印刷</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              受信機が音を 0/1 に戻し (復調)、圧縮を展開して<strong>元の白黒ドット</strong>に復元。
              そのまま感熱紙や普通紙にプリントして完了。
            </p>
          </li>
        </ol>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          受信側で復元されるのは <strong>ビットマップ画像</strong> であって <strong>文字データではない</strong>のがポイント。
          「あ」と書かれた紙が届いても、機械にとっては「黒い点がこの位置にこう並んだ画像」でしかない。
          だからファックスを PDF で受け取っても、そのままでは <strong>検索できない</strong> (OCR が必要)。
        </p>
      </section>
    </main>
  );
}

function FaxFlowDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 200" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="70"
          width="90"
          height="60"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="65" y="95" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          紙
        </text>
        <text x="65" y="112" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          (原稿)
        </text>

        <line x1="110" y1="100" x2="170" y2="100" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#fax-arrow)" />
        <text x="140" y="92" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          スキャン
        </text>

        <rect
          x="170"
          y="70"
          width="100"
          height="60"
          rx="6"
          className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text x="220" y="95" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          送信機
        </text>
        <text x="220" y="112" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          ビット→音
        </text>

        <path
          d="M 270 100 Q 310 70 350 100 Q 390 130 430 100"
          className="fill-none stroke-amber-500"
          strokeWidth="2"
        />
        <text x="350" y="65" textAnchor="middle" className="fill-amber-700 text-[11px] font-medium dark:fill-amber-400">
          電話線 (音)
        </text>
        <text x="350" y="145" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          ピーガー…
        </text>

        <rect
          x="430"
          y="70"
          width="100"
          height="60"
          rx="6"
          className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text x="480" y="95" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          受信機
        </text>
        <text x="480" y="112" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          音→ビット
        </text>

        <line x1="530" y1="100" x2="565" y2="100" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#fax-arrow)" />

        <rect
          x="558"
          y="70"
          width="32"
          height="60"
          rx="4"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="574" y="155" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          紙
        </text>

        <defs>
          <marker
            id="fax-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400 dark:fill-zinc-600" />
          </marker>
        </defs>
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        紙 → ビット → 音 → ビット → 紙。途中の電話線では「音」として運ばれる
      </p>
    </div>
  );
}
