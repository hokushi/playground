"use client";

import { useEffect, useState } from "react";

function heavySum(): number {
  let sum = 0;
  for (let i = 1; i <= 1_000_000_000; i++) {
    sum += i;
  }
  return sum;
}

export default function HeavyDemoNoWorker() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ value: number; elapsed: number } | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  const runHeavy = () => {
    setRunning(true);
    setResult(null);
    // 「実行中…」を一度ペイントさせてから同期処理を走らせる
    setTimeout(() => {
      const start = performance.now();
      const value = heavySum();
      const elapsed = performance.now() - start;
      setResult({ value, elapsed });
      setRunning(false);
    }, 50);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        「重い処理を実行」を押すとメインスレッドで{" "}
        <strong>1 から 10 億まで全部足す</strong>
        計算をします（数秒かかります）。実行中に隣のボタンを連打したり、下のタイマーを観察してみてください。
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={runHeavy}
          disabled={running}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {running ? "実行中…（UI が固まっています）" : "重い処理を実行（Worker 無し）"}
        </button>
        <button
          type="button"
          onClick={() => setClickCount((c) => c + 1)}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          適当なボタン（クリック数: {clickCount}）
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            タイマー（100ms 毎に更新 / 重い処理中は止まる）
          </div>
          <div className="font-mono text-lg text-zinc-900 dark:text-zinc-100">
            {tick}
          </div>
        </div>
        <div className="rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">結果</div>
          <div className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {result
              ? `${result.value.toLocaleString()} (${result.elapsed.toFixed(0)}ms)`
              : "—"}
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        ヒント: 実行中は「適当なボタン」を押しても無反応に見えますが、
        実はクリックがキューに溜まっているだけです。処理が終わった瞬間に、
        押した回数分だけカウントが一気に進みます。
      </p>
    </div>
  );
}
