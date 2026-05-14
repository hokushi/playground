export default function WebWorkerPage() {
  return (
    <main className="flex flex-1 flex-col gap-10 px-10 py-12 max-w-4xl">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Web Worker
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Web Worker はブラウザでメインスレッドとは別のスレッドで JavaScript
          を実行できる仕組みです。UI を止めずに重い処理を走らせたいときに使います。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          普段の動き（シングルスレッド）
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ブラウザの JavaScript は基本的に <strong>1 本のメインスレッド</strong>{" "}
          で動きます。UI 描画・イベント処理・スクリプト実行が全部ここに乗るので、
          重い処理が走るとその間は<strong>クリックもスクロールも反応しなくなる</strong>
          （いわゆる「画面が固まる」状態）。
        </p>
        <ThreadDiagram
          title="メインスレッドのみ"
          tracks={[
            {
              label: "Main",
              segments: [
                { kind: "ui", width: 60, label: "UI" },
                { kind: "ui", width: 60, label: "UI" },
                { kind: "heavy", width: 240, label: "重い処理（UI停止）" },
                { kind: "ui", width: 60, label: "UI" },
                { kind: "ui", width: 60, label: "UI" },
              ],
            },
          ]}
          note="重い処理の間、ユーザーのクリックやアニメーションが全部止まる"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Web Worker を使うと
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          重い処理を Worker（別スレッド）に逃がすことで、
          <strong>メインスレッドは UI に集中</strong>
          できます。処理が終わったら結果だけ受け取る形。
        </p>
        <ThreadDiagram
          title="Main + Worker"
          tracks={[
            {
              label: "Main",
              segments: [
                { kind: "ui", width: 60, label: "UI" },
                { kind: "post", width: 30, label: "post" },
                { kind: "ui", width: 60, label: "UI" },
                { kind: "ui", width: 60, label: "UI" },
                { kind: "ui", width: 60, label: "UI" },
                { kind: "recv", width: 30, label: "recv" },
                { kind: "ui", width: 60, label: "UI" },
                { kind: "ui", width: 60, label: "UI" },
              ],
            },
            {
              label: "Worker",
              segments: [
                { kind: "idle", width: 90, label: "" },
                { kind: "heavy", width: 240, label: "重い処理" },
                { kind: "idle", width: 150, label: "" },
              ],
            },
          ]}
          note="Main は UI 描画を続け、Worker は裏で計算。postMessage で値を受け渡す"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          こんなときに使う
        </h2>
        <ul className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <Bullet title="重い計算">
            画像処理、暗号化/復号、ハッシュ計算、物理シミュレーション、AI 推論など
          </Bullet>
          <Bullet title="大量データのパース / 変換">
            JSON や CSV の巨大ファイル、ログの集計、データ前処理
          </Bullet>
          <Bullet title="長時間ポーリング">
            バックグラウンドで定期的に何かをチェックする処理（タイマー精度を保ちたい時）
          </Bullet>
          <Bullet title="WebSocket の処理">
            メッセージのデコードや状態管理を UI から分離したい時
          </Bullet>
        </ul>
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <strong>逆に向かないもの</strong>: DOM 操作（Worker からは触れない）、
          軽い処理（postMessage のオーバーヘッドが勝つ）、
          頻繁にデータ往復が必要な処理。
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          基本の使い方
        </h2>
        <div className="flex flex-col gap-3">
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong>worker.ts</strong>（別スレッドで動くコード）
          </p>
          <CodeBlock>{`// worker.ts
self.onmessage = (e: MessageEvent<number>) => {
  // 例: 重い計算（フィボナッチ）
  const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));
  const result = fib(e.data);
  self.postMessage(result);
};`}</CodeBlock>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong>page.tsx</strong>（メインスレッドから呼ぶ）
          </p>
          <CodeBlock>{`// page.tsx
const worker = new Worker(new URL("./worker.ts", import.meta.url));

worker.postMessage(40);

worker.onmessage = (e) => {
  console.log("結果:", e.data);
  worker.terminate(); // 使い終わったら必ず止める
};`}</CodeBlock>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          知っておくとよいこと
        </h2>
        <ul className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <Bullet title="DOM/window にアクセスできない">
            Worker のスコープは独立しているので <code>document</code> や{" "}
            <code>window</code> は使えない。利用できるのは <code>self</code>,{" "}
            <code>fetch</code>, <code>IndexedDB</code> など限定的なAPI。
          </Bullet>
          <Bullet title="データの受け渡しは「コピー」">
            postMessage はデフォルトで <strong>構造化クローン</strong>{" "}
            で値をコピーする。巨大データは<code>Transferable</code>{" "}
            (ArrayBuffer等) を使うと所有権だけ移動できて高速。
          </Bullet>
          <Bullet title="必ず terminate する">
            使い終わったら <code>worker.terminate()</code>{" "}
            を呼ばないと、スレッドが残り続けてメモリリークの原因に。
          </Bullet>
          <Bullet title="Service Worker / Shared Worker とは別物">
            Service Worker は「ネットワークプロキシ」、Shared Worker は
            「複数タブで共有できる Worker」。今回扱うのは Dedicated Worker。
          </Bullet>
        </ul>
      </section>
    </main>
  );
}

type Segment = {
  kind: "ui" | "heavy" | "post" | "recv" | "idle";
  width: number;
  label: string;
};

type Track = {
  label: string;
  segments: Segment[];
};

const colors: Record<Segment["kind"], { fill: string; text: string }> = {
  ui: { fill: "#dbeafe", text: "#1e40af" },
  heavy: { fill: "#fecaca", text: "#991b1b" },
  post: { fill: "#fde68a", text: "#92400e" },
  recv: { fill: "#fde68a", text: "#92400e" },
  idle: { fill: "#f4f4f5", text: "#71717a" },
};

function ThreadDiagram({
  title,
  tracks,
  note,
}: {
  title: string;
  tracks: Track[];
  note: string;
}) {
  const labelWidth = 70;
  const rowHeight = 50;
  const rowGap = 10;
  const padding = 16;
  const trackWidth = Math.max(
    ...tracks.map((t) => t.segments.reduce((sum, s) => sum + s.width, 0)),
  );
  const width = labelWidth + trackWidth + padding * 2;
  const height = tracks.length * (rowHeight + rowGap) - rowGap + padding * 2;

  return (
    <figure className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <figcaption className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {title}
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={title}
      >
        {tracks.map((track, i) => {
          const y = padding + i * (rowHeight + rowGap);
          let x = padding + labelWidth;
          return (
            <g key={track.label}>
              <text
                x={padding}
                y={y + rowHeight / 2}
                dominantBaseline="middle"
                className="fill-zinc-700 dark:fill-zinc-300"
                fontSize="13"
                fontWeight="600"
              >
                {track.label}
              </text>
              {track.segments.map((seg, j) => {
                const c = colors[seg.kind];
                const segX = x;
                x += seg.width;
                return (
                  <g key={j}>
                    <rect
                      x={segX}
                      y={y}
                      width={seg.width}
                      height={rowHeight}
                      fill={c.fill}
                      stroke="#fff"
                      strokeWidth={1}
                    />
                    {seg.label && (
                      <text
                        x={segX + seg.width / 2}
                        y={y + rowHeight / 2}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="11"
                        fill={c.text}
                      >
                        {seg.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        <text
          x={padding + labelWidth}
          y={height - 4}
          fontSize="10"
          className="fill-zinc-400"
        >
          time →
        </text>
      </svg>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{note}</p>
    </figure>
  );
}

function Bullet({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-0.5">
      <span className="font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </span>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </span>
    </li>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-zinc-900 px-4 py-3 text-sm text-zinc-100 dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
      <code className="font-mono">{children}</code>
    </pre>
  );
}
