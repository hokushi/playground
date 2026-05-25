type Term = {
  term: string;
  reading?: string;
  body: React.ReactNode;
};

const terms: Term[] = [
  {
    term: "基幹システム",
    reading: "きかんしすてむ",
    body: (
      <>
        会社の本業を直接回している、絶対に止められない業務システム群のこと。
        会計・人事・販売管理・在庫管理・電子カルテなどが典型例。
        対義語的な存在として、止まっても会社は回る BI / 分析系の <strong>情報系システム</strong> がある。
      </>
    ),
  },
  {
    term: "マルチモーダル",
    reading: "Multimodal",
    body: (
      <>
        テキスト・画像・音声・動画など <strong>複数種類のデータ</strong>を同時に扱える AI のこと。
        モダリティ = データの種類。Claude / GPT-4o / Gemini などが代表例で、
        「スクショ + 質問」「PDF の図表理解」のような<strong>1 回で完結する使い方</strong>ができるのが強み。
      </>
    ),
  },
  {
    term: "ゼロトラスト",
    reading: "Zero Trust",
    body: (
      <>
        「ネットワークの中にいる人も含めて誰も信用せず、毎回検証する」というセキュリティ思想。
        従来の <strong>境界防御 (LAN 内 = 安全)</strong> に対し、場所に依存せず ID / デバイス / 権限を都度確認する。
        実装は IdP・MFA・ZTNA・継続監視などの組み合わせ ── 単一の製品ではなく設計方針の名前。
      </>
    ),
  },
];

export default function GlossaryPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          用語集
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          雑談やドキュメントで急に出てきて「うっ」となる用語を、2〜3 行で書き留めていくページ。
        </p>
      </header>

      <dl className="flex flex-col divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
        {terms.map(({ term, reading, body }) => (
          <div
            key={term}
            className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[12rem,1fr] sm:gap-6"
          >
            <dt className="flex flex-col">
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {term}
              </span>
              {reading && (
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  {reading}
                </span>
              )}
            </dt>
            <dd className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {body}
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
