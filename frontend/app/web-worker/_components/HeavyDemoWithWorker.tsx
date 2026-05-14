"use client";

import { useEffect, useRef, useState } from "react";

export default function HeavyDemoWithWorker() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ value: number; elapsed: number } | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [tick, setTick] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const worker = new Worker(
      new URL("./heavy.worker.ts", import.meta.url),
      { type: "module" },
    );
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent<number>) => {
      const elapsed = performance.now() - startTimeRef.current;
      setResult({ value: e.data, elapsed });
      setRunning(false);
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const runHeavy = () => {
    if (!workerRef.current) return;
    setRunning(true);
    setResult(null);
    startTimeRef.current = performance.now();
    workerRef.current.postMessage(null);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        同じ計算（1 から 10 億まで足す）を <strong>Web Worker</strong> で実行します。
        実行中もタイマーが止まらず、隣のボタンも即座に反応することを確認してください。
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={runHeavy}
          disabled={running}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {running ? "実行中…（UI は固まりません）" : "重い処理を実行（Worker 使用）"}
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
            タイマー（100ms 毎に更新 / Worker 中も止まらない）
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
        計算にかかる時間（数秒）は Worker 無しの時と同じですが、メインスレッドは UI に集中できるので、
        タイマー更新やボタン操作はリアルタイムに反応します。
      </p>
    </div>
  );
}
