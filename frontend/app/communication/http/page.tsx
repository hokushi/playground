export default function HttpTlsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          HTTP / TLS / HTTPS
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Web を動かしている <strong>HTTP</strong> という会話のルール、それを暗号化する
          <strong>TLS</strong>、その合わせ技である <strong>HTTPS</strong> ── を順番に整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>HTTP</strong> = ブラウザとサーバが話すときの <strong>共通言語</strong>。
            「ください → どうぞ」を 1 往復する単純なやり取り
          </li>
          <li>
            <strong>TLS</strong> = 通信を <strong>暗号化 + 改ざん検知 + 相手の身元保証</strong>するレイヤー (旧名: SSL)
          </li>
          <li>
            <strong>HTTPS</strong> = <strong>HTTP を TLS の上で動かしたもの</strong>。中身は HTTP そのままで、配管だけ暗号化されている
          </li>
          <li>
            アドレスバーの <strong>🔒</strong> マークは「TLS が効いてる」のサイン。現代の Web サイトはほぼ全部 HTTPS
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="http" num={2}>
          HTTP: Web 通信の基本ルール
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          HTTP は <strong>「クライアントが要求 (リクエスト) → サーバが応答 (レスポンス)」</strong>の
          1 往復で動きます。ブラウザでページを開くと、裏では数十回〜数百回のリクエストが飛んでいます。
        </p>

        <HttpRequestResponseDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              主なメソッド (動詞)
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>GET</strong>: 取得 (ページを見る、API でデータを読む)</li>
              <li>・<strong>POST</strong>: 送信・作成 (フォーム送信、新規作成)</li>
              <li>・<strong>PUT</strong>: 更新 (置き換え)</li>
              <li>・<strong>PATCH</strong>: 部分更新</li>
              <li>・<strong>DELETE</strong>: 削除</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              主なステータスコード
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>200</strong>: OK (成功)</li>
              <li>・<strong>301 / 302</strong>: リダイレクト</li>
              <li>・<strong>400</strong>: リクエストが不正</li>
              <li>・<strong>401 / 403</strong>: 認証が必要 / 権限がない</li>
              <li>・<strong>404</strong>: 見つからない</li>
              <li>・<strong>500 / 502 / 503</strong>: サーバ側エラー</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            ヘッダとボディ
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            リクエストもレスポンスも <strong>ヘッダ (メタ情報) + ボディ (本体)</strong> という構造。
            ヘッダには <code>Content-Type</code> (中身の種類)、<code>Authorization</code> (認証情報)、
            <code>Cookie</code> などが入る。ボディには HTML / JSON / 画像 などの実データが入る。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="versions" num={3}>
          HTTP のバージョン: 1.1 → 2 → 3
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          HTTP は同じ「リクエスト/レスポンス」というモデルを保ったまま、<strong>配管のやり方</strong>を
          進化させてきました。中身 (メソッドやステータス) はほぼ変わらず、<strong>速度と並列性</strong>が改善され続けています。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">バージョン</th>
                <th className="px-4 py-2 text-left font-semibold">登場</th>
                <th className="px-4 py-2 text-left font-semibold">特徴</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">HTTP/1.1</td>
                <td className="px-4 py-2">1997</td>
                <td className="px-4 py-2">
                  テキストベース。<strong>1 接続で 1 リクエストずつ</strong> (前のレスポンスを待つ間は次が送れない)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">HTTP/2</td>
                <td className="px-4 py-2">2015</td>
                <td className="px-4 py-2">
                  バイナリ化 + <strong>多重化 (Multiplexing)</strong>。
                  1 接続で複数リクエストが並列で流せる。ヘッダ圧縮も
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">HTTP/3</td>
                <td className="px-4 py-2">2022</td>
                <td className="px-4 py-2">
                  TCP ではなく <strong>QUIC (UDP ベース)</strong> で動く。
                  パケットロスがあっても他のストリームが止まらない。接続確立も高速 (1-RTT / 0-RTT)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          重要なのは <strong>「HTTP の意味論 (動詞・ステータスコード) は変わっていない」</strong>こと。
          だからブラウザ側のコードも、サーバ側のアプリも、バージョンが上がっても書き換え不要で恩恵が受けられます。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="tls" num={4}>
          TLS が解決する 3 つのこと
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          HTTP は <strong>そのままだと全部丸見え</strong>のテキスト。カフェの Wi-Fi で隣の人がパケットを拾えば
          パスワードもクレジットカード番号もそのまま読めてしまいます。
          <strong>TLS (Transport Layer Security)</strong> は HTTP の下に挟まって、これを解決するレイヤーです。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ① 暗号化
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              通信内容を <strong>第三者には解読できない</strong>形に変換する。
              間で盗み見されても意味不明な文字列にしか見えない。
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              ② 改ざん検知
            </h3>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              途中で <strong>1 bit でも書き換えられたら気付く</strong>仕組み (MAC / 認証付き暗号)。
              「広告を勝手に挿入される」「振込先を書き換えられる」を防ぐ。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              ③ 相手の身元保証
            </h3>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              <strong>「本当に banking.example.com に繋いでいる」</strong>ことを証明書で保証する。
              なりすましサイト (フィッシング) との接続を防ぐ。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            SSL? TLS? どっちが正しい?
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>SSL (Secure Sockets Layer)</strong> は TLS の前身で、1990 年代の規格。
            脆弱性が見つかって <strong>2015 年に廃止</strong>されたが、慣習で「SSL 証明書」「SSL 化」と
            言い続けている。<strong>今動いているものは全部 TLS</strong>と思って OK。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="summary" num={5}>
          まとめ: HTTPS = HTTP + TLS
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          HTTPS は <strong>「HTTP とは別物の新しいプロトコル」ではなく</strong>、
          <strong>HTTP をそのまま TLS の上に乗せただけ</strong>の構成です。
          アプリケーション側 (ブラウザのコードもサーバのコードも) からは
          <strong>「HTTP のままで、配管が暗号化されている」</strong>ように見えます。
        </p>

        <ProtocolStackDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>・<strong>ポート 80</strong> = HTTP、<strong>ポート 443</strong> = HTTPS</li>
            <li>・現代の Web はほぼ全部 HTTPS。HTTP のままだとブラウザが「保護されていない通信」と警告</li>
            <li>・LLM API のストリーミング ([SSE](/communication/sse)) も実体は HTTPS の上を流れる HTTP</li>
            <li>・<strong>HTTPS = HTTP + TLS</strong> ── これさえ覚えれば十分</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function HttpRequestResponseDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr,2rem,1fr]">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-700 dark:bg-emerald-950/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            リクエスト
          </p>
          <pre className="mt-1 overflow-x-auto font-mono text-[10px] leading-relaxed text-emerald-900 dark:text-emerald-200">
{`GET /index.html HTTP/1.1
Host: example.com
User-Agent: Chrome/...
Accept: text/html
Cookie: session=abc123

(ボディなし)`}
          </pre>
        </div>

        <div className="flex items-center justify-center text-zinc-400 dark:text-zinc-600">
          <span className="hidden sm:block">⇄</span>
          <span className="sm:hidden">↓</span>
        </div>

        <div className="rounded-lg border border-blue-300 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-950/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            レスポンス
          </p>
          <pre className="mt-1 overflow-x-auto font-mono text-[10px] leading-relaxed text-blue-900 dark:text-blue-200">
{`HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1234
Set-Cookie: session=xyz789

<html>
  <body>...</body>
</html>`}
          </pre>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        ブラウザがリクエストを送り、サーバがレスポンスを返す。これが 1 往復
      </p>
    </div>
  );
}

function ProtocolStackDiagram() {
  const layers = [
    { name: "アプリケーション", example: "HTTP (GET / POST / ...)", color: "purple" },
    { name: "セキュリティ", example: "TLS (暗号化・認証)", color: "amber" },
    { name: "トランスポート", example: "TCP (または HTTP/3 なら QUIC/UDP)", color: "blue" },
    { name: "ネットワーク", example: "IP", color: "emerald" },
  ];
  const cls = (c: string) => {
    switch (c) {
      case "purple":
        return "bg-purple-100 border-purple-300 text-purple-900 dark:bg-purple-950/40 dark:border-purple-900 dark:text-purple-200";
      case "amber":
        return "bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-200";
      case "blue":
        return "bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-200";
      default:
        return "bg-emerald-100 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200";
    }
  };
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-2">
        {layers.map((l) => (
          <div key={l.name} className={`rounded-md border px-4 py-3 ${cls(l.color)}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{l.name}</span>
              <span className="text-xs opacity-80">{l.example}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        HTTP は一番上、TLS はその下に挟まる暗号化レイヤー
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
    { id: "http", num: 2, title: "HTTP の基本" },
    { id: "versions", num: 3, title: "HTTP のバージョン" },
    { id: "tls", num: 4, title: "TLS が解決すること" },
    { id: "summary", num: 5, title: "HTTPS = HTTP + TLS" },
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
