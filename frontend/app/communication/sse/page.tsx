export default function SsePage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          SSE: Server-Sent Events
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          サーバーから一方向にデータを流し続ける仕組み。
          ChatGPT みたいに文字がパラパラ出てくる UI は、だいたいこれで動いています。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            SSE は <strong>「HTTP のレスポンスを閉じずに、サーバーが好きなタイミングでデータを書き続ける」</strong>仕組み
          </li>
          <li>
            <strong>サーバー → クライアントの片方向のみ</strong>。クライアントから送る場合は別途リクエストを投げる
          </li>
          <li>
            実体は <strong>ただの HTTP/1.1 レスポンス</strong>。Content-Type が <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">text/event-stream</code> のテキスト
          </li>
          <li>
            ブラウザには標準で <code className="rounded bg-zinc-200 px-1 text-xs dark:bg-zinc-800">EventSource</code> という API がある。再接続も勝手にやってくれる
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="problem" num={2}>
          そもそも何を解決したいのか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          普通の HTTP リクエストは <strong>「お願いします → 答え → 終わり」</strong>で一往復したら閉じます。
          でも <strong>「サーバー側で何か起きたら教えてほしい」</strong>用途では、それだと困ります。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <h3 className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              ❌ ポーリング
            </h3>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              5 秒ごとに「新しいの来た?」と聞きに行く。
              <strong>無駄なリクエストが大量</strong>に発生し、リアルタイム性も悪い。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              △ ロングポーリング
            </h3>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              リクエストを投げて<strong>サーバー側で握ったまま</strong>、来たら返す。
              来たら<strong>また投げ直す</strong>必要があって面倒。
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ✓ SSE
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              <strong>1 本のリクエストを開きっぱなし</strong>にして、
              サーバーが書き込むたびにブラウザが受け取る。シンプル。
            </p>
          </div>
        </div>

        <PollingVsSseDiagram />
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="howitworks" num={3}>
          仕組み: 「閉じない HTTP」
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          技術的に新しいことはほとんどありません。<strong>HTTP/1.1 の Chunked Transfer Encoding</strong>
          という昔からある機能を使って、レスポンスを <strong>細切れに送り続ける</strong>だけです。
          サーバーは <strong>Content-Length を書かず</strong>、好きなタイミングで書き込み、好きなタイミングで終了します。
        </p>

        <RequestResponseDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          ポイントはレスポンスの中身の <strong>フォーマット</strong>。
          ただのテキストですが、<strong>空行 (改行 2 つ) でイベントの区切り</strong>になっています。
        </p>

        <WireFormatDiagram />
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="format" num={4}>
          ワイヤフォーマット
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          SSE のデータ形式はとても単純で、<strong>1 行 1 フィールド</strong>、空行で 1 イベント区切りです。
          使えるフィールドは 4 種類だけ。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">フィールド</th>
                <th className="px-4 py-2 text-left font-semibold">役割</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">data:</td>
                <td className="px-4 py-2">本体。改行を含めたい時は data: 行を複数並べる</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">event:</td>
                <td className="px-4 py-2">イベント種別の名前 (省略時は <code>message</code>)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">id:</td>
                <td className="px-4 py-2">そのイベントの ID。再接続時の続きを指示するのに使う</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">retry:</td>
                <td className="px-4 py-2">再接続までの待ち時間 (ミリ秒)。サーバーが指定可能</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          実際のレスポンスはこんな感じで流れてきます。
        </p>

        <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

event: token
data: {"text": "こ"}

event: token
data: {"text": "ん"}

event: token
data: {"text": "に"}

event: token
data: {"text": "ち"}

event: token
data: {"text": "は"}

event: done
data: [DONE]
`}</pre>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ※ <code>data:</code> の中身は <strong>SSE 仕様としてはただの文字列</strong>。
          JSON を入れるかどうかはアプリ側の決め事です。LLM 系 API はほぼ JSON を入れる流儀。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="client" num={5}>
          ブラウザ側: EventSource
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ブラウザには SSE 専用のクラスが組み込まれています。
          <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">new EventSource(url)</code>
          するだけで、あとは<strong>勝手に接続・再接続</strong>してくれます。
        </p>

        <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`const es = new EventSource("/api/chat-stream");

// event: token が来るたびに発火
es.addEventListener("token", (e) => {
  const chunk = JSON.parse(e.data);
  appendToScreen(chunk.text);
});

// event: が指定されないやつは "message" になる
es.onmessage = (e) => { /* ... */ };

// 切断時 (5xx, ネットワーク断など)
es.onerror = () => { /* 自動再接続される */ };

// 自分から閉じる
es.close();
`}</pre>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            EventSource が裏でやってくれること
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>自動再接続</strong>: 切れたら勝手につなぎ直す (デフォルト 3 秒)
            </li>
            <li>
              ・<strong>Last-Event-ID の自動付与</strong>:
              再接続時に最後に受け取った <code>id:</code> を
              <code className="mx-1 text-xs">Last-Event-ID</code> ヘッダで送ってくれる
            </li>
            <li>
              ・<strong>パース処理</strong>: 仕様通りの <code>data:</code> や <code>event:</code> を組み立ててくれる
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            EventSource の弱点
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-amber-900/80 dark:text-amber-300">
            <li>
              ・<strong>GET しか送れない</strong>。POST でリクエストボディを送りたいケース (LLM チャット等) では使えない
            </li>
            <li>
              ・<strong>カスタムヘッダを付けられない</strong>。認証トークンを Authorization に入れたい時に困る
            </li>
            <li>
              ・なので実務では <code className="mx-1 text-xs">fetch()</code> + <code className="mx-1 text-xs">ReadableStream</code> で自前パースする方が多い
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="llm" num={6}>
          なぜ LLM チャットでこれが使われるのか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          LLM は答え全体を一気に作るのではなく、<strong>トークン (単語のかけら) を 1 個ずつ</strong>順番に生成します。
          全部できるまで待つと <strong>数秒〜数十秒</strong>沈黙する画面になってしまう。
          そこで <strong>生成したそばから 1 トークンずつ SSE で流す</strong> ── これでパラパラ表示が実現します。
        </p>

        <LlmStreamingDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          OpenAI、Anthropic、Google (Gemini) ── 主要な LLM API はみんな
          <strong> SSE 互換のストリーミング</strong>を提供しています。<code className="mx-1 rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">streamGenerateContent?alt=sse</code>
          といった URL を見たことがあれば、それは SSE です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="canceled" num={7}>
          「context canceled」が起きる時
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          SSE の運用でよく遭遇するのが <strong>「context canceled」</strong> エラー。
          これは <strong>クライアントが先に接続を切った</strong>ときに発生します。
          ストリームの片側 (受け手) が消えたので、サーバー側の HTTP ハンドラが
          <strong>「もう書き込む先がない」</strong> と気付いて Go の <code>context</code> がキャンセルされる、という流れです。
        </p>

        <ContextCanceledDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          典型的に起きるシナリオ:
        </p>

        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            ・ユーザーが <strong>ブラウザのタブを閉じた</strong> / リロードした
          </li>
          <li>
            ・ユーザーが UI 上の <strong>「停止」ボタン</strong>を押した (<code>es.close()</code> や <code>AbortController.abort()</code>)
          </li>
          <li>
            ・<strong>ネットワークが切れた</strong> (Wi-Fi 切断、トンネル断)
          </li>
          <li>
            ・前段のプロキシ / ロードバランサが <strong>アイドルタイムアウト</strong>で切った
          </li>
          <li>
            ・サーバー側で <strong>リクエスト全体のタイムアウト</strong>に到達した
          </li>
        </ul>

        <p className="text-zinc-700 dark:text-zinc-300">
          「context canceled」自体は <strong>異常ではなく、ストリーム通信では普通に起きる事象</strong>です。
          ただ、それを <strong>5xx エラーとしてログに残す</strong>とアラート対象になってしまう。
          実務では <strong>「クライアント都合の中断は warn/info に落とす」</strong>ハンドリングをするのが定石です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="vs-ws" num={8}>
          SSE vs WebSocket
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          「双方向通信なら WebSocket では?」と思いがちですが、用途は意外と違います。
          <strong>「サーバーが押し付けて流すだけ」なら SSE</strong>、
          <strong>「お互いに送り合う」なら WebSocket</strong>、と覚えると分かりやすい。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">観点</th>
                <th className="px-4 py-2 text-left font-semibold">SSE</th>
                <th className="px-4 py-2 text-left font-semibold">WebSocket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  方向
                </td>
                <td className="px-4 py-2">サーバー → クライアントのみ</td>
                <td className="px-4 py-2">双方向</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  プロトコル
                </td>
                <td className="px-4 py-2">HTTP そのまま</td>
                <td className="px-4 py-2">ws:// (HTTP からアップグレード)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  扱うデータ
                </td>
                <td className="px-4 py-2">テキストのみ</td>
                <td className="px-4 py-2">テキスト + バイナリ</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  再接続
                </td>
                <td className="px-4 py-2">ブラウザが自動でやる</td>
                <td className="px-4 py-2">自前で書く必要あり</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  プロキシ通過
                </td>
                <td className="px-4 py-2">ただの HTTP なのでほぼ素通り</td>
                <td className="px-4 py-2">中間プロキシで弾かれることがある</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  向いてる用途
                </td>
                <td className="px-4 py-2">通知 / 進捗 / LLM ストリーミング</td>
                <td className="px-4 py-2">チャット / ゲーム / 共同編集</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="summary" num={9}>
          まとめ
        </SectionH2>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・SSE = <strong>HTTP レスポンスを閉じずに、サーバーから書き続ける</strong>仕組み
            </li>
            <li>
              ・実体は <code className="mx-1 text-xs">text/event-stream</code> という MIME のただのテキスト
            </li>
            <li>
              ・<strong>1 行 1 フィールド、空行で区切り</strong>。これだけ
            </li>
            <li>
              ・LLM のパラパラ表示はほぼ全部これ。「context canceled」はクライアントが切ったサインで、ストリームでは正常事象として扱う
            </li>
            <li>
              ・双方向が必要になったら WebSocket。それ以外で「サーバーから押し付けたい」だけなら SSE で十分
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function PollingVsSseDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 260" className="mx-auto w-full max-w-2xl">
        <text
          x="20"
          y="20"
          className="fill-rose-700 text-[11px] font-semibold dark:fill-rose-400"
        >
          ポーリング: 何度も聞く
        </text>
        <line x1="80" y1="40" x2="80" y2="120" className="stroke-zinc-400" strokeWidth="1" />
        <line x1="520" y1="40" x2="520" y2="120" className="stroke-zinc-400" strokeWidth="1" />
        <text x="80" y="38" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">クライアント</text>
        <text x="520" y="38" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">サーバー</text>

        {[55, 75, 95, 115].map((y, i) => (
          <g key={i}>
            <line x1="80" y1={y} x2="520" y2={y} className="stroke-rose-400" strokeWidth="1" markerEnd="url(#sse-arrow-rose)" />
            <text x="300" y={y - 3} textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
              {i % 2 === 0 ? "新しいの来た?" : "まだ"}
            </text>
          </g>
        ))}

        <text
          x="20"
          y="155"
          className="fill-emerald-700 text-[11px] font-semibold dark:fill-emerald-400"
        >
          SSE: 1 本開いて流し続ける
        </text>
        <line x1="80" y1="175" x2="80" y2="245" className="stroke-zinc-400" strokeWidth="1" />
        <line x1="520" y1="175" x2="520" y2="245" className="stroke-zinc-400" strokeWidth="1" />

        <line x1="80" y1="190" x2="520" y2="190" className="stroke-emerald-500" strokeWidth="1.5" markerEnd="url(#sse-arrow-emerald)" />
        <text x="300" y="186" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
          GET /stream (1 回だけ)
        </text>

        {[205, 215, 225, 235].map((y, i) => (
          <line key={i} x1="520" y1={y} x2="80" y2={y} className="stroke-emerald-500" strokeWidth="1.2" markerEnd="url(#sse-arrow-emerald-rev)" />
        ))}
        <text x="300" y="252" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">
          サーバーが書き込むたびに届く
        </text>

        <defs>
          <marker id="sse-arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-400" />
          </marker>
          <marker id="sse-arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="sse-arrow-emerald-rev" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-500">
        ポーリングは <span className="text-rose-700 dark:text-rose-400">毎回往復</span> するが、SSE は
        <span className="text-emerald-700 dark:text-emerald-400"> 1 本のレスポンス</span> に複数イベントを乗せる
      </p>
    </div>
  );
}

function RequestResponseDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            普通の HTTP
          </p>
          <pre className="rounded border border-zinc-200 bg-zinc-50 p-3 font-mono text-[10px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
{`Content-Type: application/json
Content-Length: 42

{"answer": "こんにちは"}
[ここで閉じる]`}
          </pre>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            長さが分かっているので、全部書いたら閉じる
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            SSE
          </p>
          <pre className="rounded border border-emerald-200 bg-emerald-50 p-3 font-mono text-[10px] leading-relaxed text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
{`Content-Type: text/event-stream
[Content-Length なし]

data: {"text": "こ"}

data: {"text": "ん"}
...
[ずっと閉じない]`}
          </pre>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            長さが未定。サーバーが書きたいだけ書ける
          </p>
        </div>
      </div>
    </div>
  );
}

function WireFormatDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
        <span className="text-emerald-700 dark:text-emerald-400">event: token</span>
        {`         ← イベント種別 (任意)
`}
        <span className="text-emerald-700 dark:text-emerald-400">data: {`{"text": "こ"}`}</span>
        {`   ← 本体
                  ← 空行 = ここで 1 イベント終わり

`}
        <span className="text-emerald-700 dark:text-emerald-400">event: token</span>
        {`
`}
        <span className="text-emerald-700 dark:text-emerald-400">data: {`{"text": "ん"}`}</span>
        {`
                  ← 次のイベント区切り`}
      </pre>
    </div>
  );
}

function LlmStreamingDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 180" className="mx-auto w-full max-w-2xl">
        <rect x="20" y="60" width="100" height="60" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="70" y="85" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">ブラウザ</text>
        <text x="70" y="102" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">EventSource</text>

        <rect x="250" y="60" width="100" height="60" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="300" y="85" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">バックエンド</text>
        <text x="300" y="102" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">プロキシ</text>

        <rect x="480" y="60" width="100" height="60" rx="6" className="fill-purple-100 stroke-purple-400 dark:fill-purple-950/30 dark:stroke-purple-700" strokeWidth="1.5" />
        <text x="530" y="85" textAnchor="middle" className="fill-purple-900 text-xs font-medium dark:fill-purple-200">LLM API</text>
        <text x="530" y="102" textAnchor="middle" className="fill-purple-700 text-[10px] dark:fill-purple-400">Gemini / GPT 等</text>

        <line x1="120" y1="78" x2="250" y2="78" className="stroke-emerald-500" strokeWidth="1.5" markerEnd="url(#llm-arrow)" />
        <text x="185" y="72" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">SSE</text>

        <line x1="350" y1="78" x2="480" y2="78" className="stroke-emerald-500" strokeWidth="1.5" markerEnd="url(#llm-arrow)" />
        <text x="415" y="72" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">SSE</text>

        <text x="300" y="145" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          LLM が生成した 1 トークンを、バックエンドが素通しでブラウザまで流す
        </text>
        <text x="300" y="160" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
          全部 SSE のまま。バックエンドは pipe するだけ
        </text>

        <defs>
          <marker id="llm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function ContextCanceledDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 220" className="mx-auto w-full max-w-2xl">
        <line x1="80" y1="20" x2="80" y2="200" className="stroke-zinc-400" strokeWidth="1" />
        <line x1="520" y1="20" x2="520" y2="200" className="stroke-zinc-400" strokeWidth="1" />
        <text x="80" y="15" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">クライアント</text>
        <text x="520" y="15" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">サーバー (Go)</text>

        <line x1="80" y1="40" x2="520" y2="40" className="stroke-emerald-500" strokeWidth="1.5" markerEnd="url(#cc-arrow-e)" />
        <text x="300" y="35" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">POST /stream</text>

        {[60, 80, 100].map((y, i) => (
          <line key={i} x1="520" y1={y} x2="80" y2={y} className="stroke-emerald-500" strokeWidth="1.2" markerEnd="url(#cc-arrow-e-r)" />
        ))}
        <text x="300" y="116" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">data: ... (流れている最中)</text>

        <line x1="80" y1="135" x2="180" y2="135" className="stroke-rose-500" strokeWidth="2" />
        <text x="130" y="130" textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-400">✕ 切断</text>
        <text x="130" y="148" textAnchor="middle" className="fill-rose-700 text-[9px] dark:fill-rose-400">タブ閉じ / 停止ボタン</text>

        <line x1="520" y1="165" x2="520" y2="195" className="stroke-amber-500" strokeWidth="2" strokeDasharray="3 2" />
        <text x="520" y="210" textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-400">
          ctx.Done() ← context canceled
        </text>

        <defs>
          <marker id="cc-arrow-e" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="cc-arrow-e-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-500">
        クライアントが切ると、サーバー側の HTTP ハンドラの <code>ctx</code> がキャンセルされ、その先 (LLM API への読み込み) も連鎖して止まる
      </p>
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
    { id: "intro", num: 1, title: "先に結論" },
    { id: "problem", num: 2, title: "何を解決したいのか" },
    { id: "howitworks", num: 3, title: "仕組み" },
    { id: "format", num: 4, title: "ワイヤフォーマット" },
    { id: "client", num: 5, title: "EventSource" },
    { id: "llm", num: 6, title: "LLM チャットで使う理由" },
    { id: "canceled", num: 7, title: "context canceled" },
    { id: "vs-ws", num: 8, title: "vs WebSocket" },
    { id: "summary", num: 9, title: "まとめ" },
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
