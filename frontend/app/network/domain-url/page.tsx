export default function NetworkDomainUrlPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          ネットワーク
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ドメイン と URL のしくみ
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「URL ってどう読むの?」「ドメインってそもそも何?」を初心者向けに。
          AWS Route 53 でドメインを買う前に知っておきたい基礎
        </p>
      </header>

      <TableOfContents />

      {/* 1. 先に結論 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>これだけ覚えればいい</SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>ドメイン</strong>は「お店の看板の名前」。例: <code className="font-mono">google.com</code>
          </li>
          <li>
            <strong>URL</strong>はお店の「住所まで含めた案内文」。
            例: <code className="font-mono">https://google.com/search?q=cat</code>
          </li>
          <li>
            <strong>DNS</strong>は「お店の名前 → 場所 (IP) を教えてくれる電話帳」
          </li>
          <li>
            ドメインは <strong>1 年契約で買う</strong>。お名前.com や Route 53 (AWS) で買える
          </li>
        </ul>
      </section>

      {/* 2. URL ってどう読むの */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="url" num={2}>URL ってどう読むの?</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          URL は「Web の住所」。普段はあまり気にしないけど、見ると意味のあるパーツに分かれてる。
        </p>

        <UrlAnatomyDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          特に大事な 3 つだけ覚えればいい:
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <SimpleCard label="https" title="どうやって繋ぐか" body="https は「暗号化あり」のことが多い。http だけだと「保護されてない通信」と警告される" />
          <SimpleCard label="google.com" title="どこに繋ぐか (ドメイン)" body="お店の名前。世界で 1 つだけの名札。次のセクションで詳しく" />
          <SimpleCard label="/search" title="どのページか (パス)" body="お店の中の「何階の何売り場?」みたいな指定。トップなら / だけ" />
        </div>

        <Faq q="? のあとの id=xxx って何?">
          <p>
            <strong>query (クエリ)</strong> と呼ばれる「追加情報」。検索フォームの入力内容とか、
            ページの設定とかを渡す時に使われる。
          </p>
          <p className="mt-2">
            例: <code className="font-mono">https://google.com/search?q=cat</code> の <code className="font-mono">?q=cat</code> は
            「<code className="font-mono">cat</code> で検索して」と Google に伝えるための情報。
            <code className="font-mono">&amp;</code> で複数つなげることもある (例: <code className="font-mono">?q=cat&amp;lang=ja</code>)
          </p>
        </Faq>

        <Faq q="# のあとは何?">
          <p>
            <strong>fragment (フラグメント)</strong>。同じページの「特定の場所までスクロールしてね」という指示。
          </p>
          <p className="mt-2">
            例: <code className="font-mono">https://wiki.com/article#section-3</code> を開くと、
            ブラウザが「section-3」と書かれた場所まで自動スクロールしてくれる。
            <strong>サーバーには送られない</strong>のがポイント (ブラウザだけが見る)
          </p>
        </Faq>
      </section>

      {/* 3. ドメインって何? */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="domain" num={3}>ドメインって何?</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ドメインは <strong>「お店の名前」</strong>です。例:
        </p>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <ul className="flex flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
            <li>・<code className="font-mono">google.com</code> = Google の名前</li>
            <li>・<code className="font-mono">amazon.co.jp</code> = アマゾンの名前 (日本)</li>
            <li>・<code className="font-mono">your-app.com</code> = (買ったら) あなたの名前</li>
          </ul>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          名前は「右から読む」と意味がわかる
        </h3>

        <DomainHierarchyDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          つまり <code className="font-mono">www.example.com</code> は:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-1 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li><code className="font-mono">.com</code> = ジャンル (商業系の TLD)</li>
          <li><code className="font-mono">example</code> = 自分で選んで買った名前</li>
          <li><code className="font-mono">www</code> = サブドメイン (自分で自由に作れる)</li>
        </ul>

        <Faq q="サブドメインって?">
          <p>
            買ったドメインの<strong>頭につけて自由に増やせる名前</strong>。
            <code className="font-mono">example.com</code> を買ったら、<strong>追加料金なしで</strong>:
          </p>
          <ul className="ml-5 mt-2 flex list-disc flex-col gap-1">
            <li><code className="font-mono">www.example.com</code> ← Web サイト用</li>
            <li><code className="font-mono">blog.example.com</code> ← ブログ用</li>
            <li><code className="font-mono">api.example.com</code> ← API 用</li>
          </ul>
          <p className="mt-2">…のように何個でも作れる。
            「会社の入り口は 1 つだけど、中でフロアごとに違う部署がある」みたいなイメージ
          </p>
        </Faq>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          末尾 (TLD) でカテゴリがわかる
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          末尾 (<code className="font-mono">.com</code> とか <code className="font-mono">.jp</code> とか) は <strong>TLD</strong> と呼ばれる。
          ざっくりこんな感じ:
        </p>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">TLD</th>
                <th className="px-4 py-2 text-left font-semibold">よく使われる用途</th>
                <th className="px-4 py-2 text-left font-semibold">大体の年額</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-mono">.com</td>
                <td className="px-4 py-2">何でも (一番有名・無難)</td>
                <td className="px-4 py-2">$13 / 年</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">.jp / .co.jp</td>
                <td className="px-4 py-2">日本の会社・個人</td>
                <td className="px-4 py-2">$25 〜 / 年</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">.dev / .app</td>
                <td className="px-4 py-2">開発者・アプリ向け (HTTPS 必須)</td>
                <td className="px-4 py-2">$13〜$20 / 年</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">.click / .xyz</td>
                <td className="px-4 py-2">学習用・お試し</td>
                <td className="px-4 py-2">$3〜$10 / 年</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          → 学習用なら <code className="font-mono">.click</code> で年 ¥450 くらい。本気なら <code className="font-mono">.com</code> で年 ¥2,000 くらい
        </p>
      </section>

      {/* 4. DNS = 電話帳 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="dns" num={4}>DNS = ドメインの電話帳</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          コンピュータは本当は <strong>IP アドレス</strong>(<code className="font-mono">142.250.196.110</code> みたいな数字) でしか通信できない。
          でも人間はそんな数字覚えられない。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          → そこで <strong>「名前 → IP」を教えてくれるサービス</strong>が必要。これが <strong>DNS (Domain Name System)</strong>。
          仕組みは <strong>電話帳と同じ</strong>:
        </p>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">電話帳の比喩</p>
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>名前で電話番号を引く</strong>: 「田中さんに電話したい」→ 電話帳で「田中」を探す → 番号がわかる → かける
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>DNS</strong>: 「<code className="font-mono">google.com</code> に繋ぎたい」→ DNS で <code className="font-mono">google.com</code> を引く → IP がわかる → 接続
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          あなた・DNS・サイトの関係
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          実際は <strong>3 人の登場人物</strong>がいて、こんなふうに話している:
        </p>

        <DnsActorsDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          ポイント:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>あなたは「Google サーバー」と直接話さない</strong>。最初に必ず DNS に「住所教えて」と聞く
          </li>
          <li>
            <strong>DNS は住所を教えるだけ</strong>。サイトの中身は届けてくれない
          </li>
          <li>
            一度聞いた住所はブラウザがしばらく覚えてる (キャッシュ)。次は DNS をスキップして直接繋ぎに行ける
          </li>
        </ul>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          時系列で見ると
        </h3>

        <DnsFlowDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          つまり、サイトを開く時は <strong>① 名前から IP を調べる (DNS) → ② IP に接続する (HTTP)</strong> の 2 ステップ。
          普段は一瞬で終わるけど、この裏で電話帳引きが走っている。
        </p>

        <details className="group mt-6 rounded-lg border-2 border-emerald-300 bg-emerald-50/40 dark:border-emerald-800 dark:bg-emerald-950/20" open>
          <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 text-base font-semibold text-emerald-900 transition-colors hover:bg-emerald-100/50 dark:text-emerald-100 dark:hover:bg-emerald-900/20">
            <svg
              className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 3l4 3-4 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>📚 もっと深く: じつは DNS には 2 種類ある (権威 DNS)</span>
          </summary>

          <div className="flex flex-col gap-4 border-t border-emerald-200 px-5 pb-5 pt-4 dark:border-emerald-900/50">
            <p className="text-zinc-700 dark:text-zinc-300">
              ここまで「DNS」と一言で説明してきたけど、実は <strong>役割が違う 2 種類</strong>がある:
            </p>

            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">種類</th>
                    <th className="px-4 py-2 text-left font-semibold">役割</th>
                    <th className="px-4 py-2 text-left font-semibold">例</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <td className="px-4 py-2 font-medium">フルリゾルバ</td>
                    <td className="px-4 py-2">「調べてくれる人」。<br />名前を渡されたら答えを探しに行く</td>
                    <td className="px-4 py-2">ISP の DNS / Google 8.8.8.8 / Cloudflare 1.1.1.1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-amber-700 dark:text-amber-400">権威 DNS ⭐</td>
                    <td className="px-4 py-2">「答えを持っている人」。<br />そのドメインの「公式回答」をする</td>
                    <td className="px-4 py-2"><strong>Route 53 の Hosted Zone</strong> / Cloudflare DNS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              比喩で言うと: 図書館
            </h4>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
              <ul className="flex flex-col gap-2 text-[15px] text-zinc-700 dark:text-zinc-300">
                <li>
                  <strong>あなた</strong> = 図書館に「『吾輩は猫である』のあらすじ知りたい」と聞きに来た客
                </li>
                <li>
                  <strong>フルリゾルバ</strong> = 図書館の <strong>司書 (探してくれる人)</strong>。
                  本がどこにあるか調べて取ってきてくれる
                </li>
                <li>
                  <strong>権威 DNS</strong> = <strong>その本そのもの</strong>。
                  答えが書かれている (司書じゃない、本の中身が答え)
                </li>
              </ul>
            </div>

            <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              なぜ「権威」と呼ぶ?
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300">
              英語で <strong>authoritative</strong>。「公式の」「最終回答」というニュアンス。
              つまり <strong>そのドメインに関しては、ここが言うことが絶対</strong>という意味。
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              例: <code className="font-mono">hokushi-aws.click</code> の権威 DNS は Route 53。
              世界中のどんな DNS サーバーが何と言おうと、<strong>Route 53 が「IP は X」と言ったらそれが正解</strong>。
              それ以外は「キャッシュした古い答え」とか「噂」扱い。
            </p>

            <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              全体の関係図
            </h4>

            <DnsAuthoritativeDiagram />

            <p className="text-zinc-700 dark:text-zinc-300">
              ポイント:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
              <li>
                あなたが直接 <strong>権威 DNS に聞きに行くわけじゃない</strong>。間にフルリゾルバ (図書館の司書) が入る
              </li>
              <li>
                フルリゾルバは <strong>権威 DNS から取ってきた答えを少しの間キャッシュ</strong>する。
                同じドメインに次にアクセスする時は権威 DNS まで行かずに即答できる
              </li>
              <li>
                <strong>Route 53 の Hosted Zone は権威 DNS そのもの</strong>。
                「<code className="font-mono">hokushi-aws.click</code> に何か聞かれたら、Route 53 が公式回答しますよ」と任せている状態
              </li>
            </ul>

            <Faq q="フルリゾルバはどこにある? 自分で意識しないといけない?">
              <p>
                意識しなくて OK。家の Wi-Fi に繋ぐと、ルーターが ISP のフルリゾルバを自動で OS に教えてくれる。
                ブラウザは何も指定しなくても勝手に使ってくれる。
              </p>
              <p className="mt-2">
                手動で変えたい時は OS の DNS 設定で <code className="font-mono">8.8.8.8</code> (Google) や
                <code className="font-mono">1.1.1.1</code> (Cloudflare) を入れる。
                ISP の DNS より速いとか、検閲を回避したい時に
              </p>
            </Faq>
          </div>
        </details>
      </section>

      {/* 5. レコード */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="records" num={5}>DNS に書く「レコード」</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ドメインを買ったら、DNS に「<strong>この名前はこれ</strong>」と書く必要がある。
          この 1 行 1 行のことを <strong>レコード</strong>と呼ぶ。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          いろんな種類があるけど、最初は <strong>3 つだけ知ってれば OK</strong>:
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">種類</th>
                <th className="px-4 py-2 text-left font-semibold">意味</th>
                <th className="px-4 py-2 text-left font-semibold">例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium">A</td>
                <td className="px-4 py-2">名前 → IP アドレス</td>
                <td className="px-4 py-2 font-mono text-xs">www → 93.184.216.34</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">CNAME</td>
                <td className="px-4 py-2">名前 → 別の名前</td>
                <td className="px-4 py-2 font-mono text-xs">www → example.com</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-amber-700 dark:text-amber-400">Alias ⭐</td>
                <td className="px-4 py-2">名前 → AWS リソース (Route 53 専用)</td>
                <td className="px-4 py-2 font-mono text-xs">your-app.com → ALB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Faq q="CNAME と Alias の違いは?">
          <p>
            似てるけど大事な違い:
          </p>
          <ul className="ml-5 mt-2 flex list-disc flex-col gap-1">
            <li>
              <strong>CNAME</strong>: どこの DNS でも使える普通の機能。ただし
              <strong>ルート (<code className="font-mono">your-app.com</code> 自体) には使えない</strong>制限がある
            </li>
            <li>
              <strong>Alias</strong>: <strong>Route 53 の独自機能</strong>。CNAME と同じことができて、しかも
              <strong>ルートでも使える</strong>
            </li>
          </ul>
          <p className="mt-2">
            「<code className="font-mono">your-app.com</code> を ALB に向けたい」時は <strong>Alias 一択</strong>。
            これが「Route 53 を使う最大の理由」と言われる所以
          </p>
        </Faq>
      </section>

      {/* 6. ドメインを買う */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="buy" num={6}>ドメインは「買う」もの</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ドメイン名は世界で 1 つだけ。誰かが <code className="font-mono">google.com</code> を取ったら、他の人は取れない。
          だから <strong>「使いたい人が前払いで予約する」</strong>仕組みになってる。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          買う場所 = レジストラ
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          ドメインを売っている業者を <strong>レジストラ</strong>と呼ぶ。主なところ:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-1 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li><strong>お名前.com / ムームードメイン</strong>: 日本の老舗</li>
          <li><strong>Route 53 (AWS)</strong>: AWS のサービスと連携が楽</li>
          <li><strong>Cloudflare Registrar</strong>: 安くて高機能</li>
        </ul>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          買う時のルール
        </h3>
        <ul className="ml-5 flex list-disc flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li><strong>1 年単位で前払い</strong> (例: <code className="font-mono">.com</code> = $13/年)</li>
          <li><strong>返金不可</strong>。途中解約もできない (買ったら 1 年は持つ)</li>
          <li><strong>自動更新あり</strong>。要らないなら買った後すぐ OFF にする</li>
          <li><strong>更新しないと失効</strong>。失効すると別の人が買える</li>
        </ul>

        <Faq q="WHOIS って何? 個人情報出ちゃう?">
          <p>
            <strong>WHOIS (フーイズ)</strong> = 「このドメインは誰が持ってる?」を調べられる公開データベース。
            ICANN (ドメインの大元締め) のルールで「持ち主の連絡先は公開しないといけない」と決まっている。
          </p>
          <p className="mt-2">
            でも今のレジストラはほぼ全部 <strong>「プライバシー保護」</strong>を提供していて、
            実名・住所・電話の代わりにレジストラの情報を載せてくれる (代理人みたいなもの)。
          </p>
          <p className="mt-2">
            <strong>Route 53 は無料で自動 ON</strong>。個人情報は隠してくれる
          </p>
        </Faq>
      </section>

      {/* 7. 関連ページ */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="related" num={7}>関連ページ</SectionH2>
        <ul className="ml-5 flex list-disc flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <li>
            <a
              href="/network/internet"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              インターネットの裏側
            </a>
            {" "}── DNS + 物理層 (海底ケーブル) の全体像
          </li>
          <li>
            <a
              href="/communication/http"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HTTP / TLS / HTTPS
            </a>
            {" "}── URL の <code className="font-mono">https://</code> の中身
          </li>
          <li>
            <a
              href="/aws/route53"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Route 53 で HTTPS 化
            </a>
            {" "}── このページの知識を使って実際にドメインを取って HTTPS 化する
          </li>
        </ul>
      </section>
    </main>
  );
}

function SectionH2({ id, num, children }: { id: string; num: number; children: string }) {
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
    { id: "intro", num: 1, title: "これだけ覚えればいい" },
    { id: "url", num: 2, title: "URL ってどう読むの?" },
    { id: "domain", num: 3, title: "ドメインって何?" },
    { id: "dns", num: 4, title: "DNS = ドメインの電話帳" },
    { id: "records", num: 5, title: "DNS に書くレコード" },
    { id: "buy", num: 6, title: "ドメインは買うもの" },
    { id: "related", num: 7, title: "関連ページ" },
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

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-lg border border-zinc-200 bg-white open:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:open:bg-zinc-900">
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
        <span>Q. {q}</span>
        <span className="text-xs text-zinc-400 transition-transform group-open:rotate-90 dark:text-zinc-600">
          ▶
        </span>
      </summary>
      <div className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        {children}
      </div>
    </details>
  );
}

function SimpleCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">{body}</p>
    </div>
  );
}

function UrlAnatomyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`  https :// google.com / search ? q=cat # top
  └─┬─┘    └────┬───┘  └──┬──┘ └──┬──┘ └┬─┘
    │           │         │       │     │
   scheme    ドメイン    パス    query  fragment
   (HTTPS)   (どこに)  (どのページ) (追加情報) (ジャンプ先)`}
      </pre>
    </div>
  );
}

function DomainHierarchyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`         www  .  example  .  com
         │        │           │
         │        │           └─ TLD (一番右、ジャンル)
         │        └─ 自分で買う名前
         └─ サブドメイン (自由に作れる)

  読む方向:  ←──── 右から左へ意味が狭くなる ────`}
      </pre>
    </div>
  );
}

function DnsActorsDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`     あなた                    DNS                google.com サーバー
   (ブラウザ)                (電話帳役)             (実際のページ)
       │                        │                         │
       │ ① "google.com"を入力   │                         │
       │                        │                         │
       │ ─② 名前で IP 聞く────→ │                         │
       │    "google.com は?"    │                         │
       │                        │                         │
       │ ←─③ IP を返す ──────── │                         │
       │   "142.250.196.110"    │                         │
       │                        │                         │
       │ ─④ 直接 IP に接続 ───────────────────────────→ │
       │   "ページちょうだい"                              │
       │                                                  │
       │ ←─⑤ HTML が返ってくる ─────────────────────── │
       │                                                  │
       │ ⑥ 画面に表示                                     │
       ▼                                                  ▼

  ★ DNS は「住所案内」だけ。実際のページは別のサーバーから来る`}
      </pre>
    </div>
  );
}

function DnsAuthoritativeDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {/* 3 アクターのカード */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* あなた (Indigo) */}
        <div className="flex flex-col items-center rounded-lg border-2 border-indigo-300 bg-indigo-50 p-4 text-center dark:border-indigo-700 dark:bg-indigo-950/40">
          <div className="text-3xl">🌐</div>
          <div className="mt-2 text-sm font-bold text-indigo-900 dark:text-indigo-200">
            あなた
          </div>
          <div className="text-xs text-indigo-700 dark:text-indigo-300">
            (ブラウザ)
          </div>
          <div className="mt-3 text-[11px] text-indigo-800/70 dark:text-indigo-200/70">
            名前を入れて
            <br />
            繋ぎたいだけの人
          </div>
        </div>

        {/* フルリゾルバ (Amber) */}
        <div className="flex flex-col items-center rounded-lg border-2 border-amber-300 bg-amber-50 p-4 text-center dark:border-amber-700 dark:bg-amber-950/40">
          <div className="text-3xl">🔍</div>
          <div className="mt-2 text-sm font-bold text-amber-900 dark:text-amber-200">
            フルリゾルバ
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-300">
            (図書館の司書 役)
          </div>
          <div className="mt-3 space-y-0.5 text-[11px] text-amber-800/70 dark:text-amber-200/70">
            <div>ISP の DNS</div>
            <div>Google 8.8.8.8</div>
            <div>Cloudflare 1.1.1.1</div>
          </div>
        </div>

        {/* 権威 DNS (Emerald) */}
        <div className="flex flex-col items-center rounded-lg border-2 border-emerald-400 bg-emerald-50 p-4 text-center dark:border-emerald-600 dark:bg-emerald-950/40">
          <div className="text-3xl">📚</div>
          <div className="mt-2 text-sm font-bold text-emerald-900 dark:text-emerald-200">
            権威 DNS ⭐
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-300">
            (本そのもの = 答え)
          </div>
          <div className="mt-3 space-y-0.5 text-[11px] font-medium text-emerald-800/80 dark:text-emerald-200/80">
            <div>Route 53</div>
            <div>Hosted Zone</div>
          </div>
        </div>
      </div>

      {/* やりとりの 4 ステップ */}
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            ①
          </span>
          <span className="text-xs text-zinc-700 dark:text-zinc-300">
            <strong className="text-indigo-700 dark:text-indigo-400">あなた</strong> →{" "}
            <strong className="text-amber-700 dark:text-amber-400">フルリゾルバ</strong>: 「<code className="font-mono">hokushi-aws.click</code> の IP 教えて」
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
            ②
          </span>
          <span className="text-xs text-zinc-700 dark:text-zinc-300">
            <strong className="text-amber-700 dark:text-amber-400">フルリゾルバ</strong> →{" "}
            <strong className="text-emerald-700 dark:text-emerald-400">権威 DNS</strong>: 「公式の答え持ってる?」 (キャッシュになければ問い合わせ)
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
            ③
          </span>
          <span className="text-xs text-zinc-700 dark:text-zinc-300">
            <strong className="text-emerald-700 dark:text-emerald-400">権威 DNS</strong> →{" "}
            <strong className="text-amber-700 dark:text-amber-400">フルリゾルバ</strong>: 「IP は <code className="font-mono">52.x.x.x</code> ですよ」 (公式回答)
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-md border border-zinc-200 bg-zinc-50/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
            ④
          </span>
          <span className="text-xs text-zinc-700 dark:text-zinc-300">
            <strong className="text-amber-700 dark:text-amber-400">フルリゾルバ</strong> →{" "}
            <strong className="text-indigo-700 dark:text-indigo-400">あなた</strong>: 「<code className="font-mono">52.x.x.x</code> です」 (キャッシュにも保存)
          </span>
        </div>
      </div>

      {/* キーポイント */}
      <div className="mt-5 space-y-2 rounded-md border border-emerald-200 bg-emerald-50/60 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
        <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
          ⭐ ここを覚えればいい
        </div>
        <div className="text-xs leading-relaxed text-emerald-900/80 dark:text-emerald-300">
          <strong>権威 DNS</strong> = そのドメインの<strong>「公式回答」</strong>を持っている DNS。
          <br />
          君が買ったドメインなら <strong>Route 53 の Hosted Zone がこれ</strong>。
        </div>
      </div>
    </div>
  );
}

function DnsFlowDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`  ① ブラウザに  https://google.com  を入力
              ↓
  ② DNS に「google.com の IP は?」と聞く
              ↓
  ③ DNS が「142.250.196.110 です」と返事
              ↓
  ④ ブラウザがその IP に接続
              ↓
  ⑤ Google のページが返ってくる`}
      </pre>
    </div>
  );
}
