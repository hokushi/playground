export default function WebWorkerPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 px-10 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Web Worker
      </h1>
      <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
        Web Worker の専用ページです。ここに Worker を使った処理や検証を実装していきます。
      </p>
    </main>
  );
}
