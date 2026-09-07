export default function NetworkLayersPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          ネットワーク
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ネットワークの 7 層 (OSI モデル)
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「アプリケーション層」「トランスポート層」とよく聞くやつ。
          初心者向けに <strong>どの層が何をするか</strong>を 1 つずつ整理する
        </p>
      </header>

      <TableOfContents />

      {/* 1. 先に結論 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>これだけ覚えればいい</SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            ネットワーク通信は <strong>7 つの層 (レイヤー)</strong> に役割を分けて作られている (OSI モデル)
          </li>
          <li>
            <strong>L7 (アプリケーション)</strong> = HTTP / DNS / SMTP など、普段プログラマが触る層
          </li>
          <li>
            <strong>L4 (トランスポート)</strong> = TCP / UDP、データの届け方を決める層
          </li>
          <li>
            <strong>L3 (ネットワーク)</strong> = IP、住所を頼りに目的地まで運ぶ層
          </li>
          <li>
            実用では <strong>L7 / L4 / L3 / L2-1</strong> をざっくり知っていれば 9 割 OK
          </li>
        </ul>
      </section>

      {/* 2. なぜ層に分ける? */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="why" num={2}>なぜ層 (レイヤー) に分けるの?</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ネットワークを「全部 1 つの大きな仕組み」にしないで、わざわざ 7 段に分ける理由は{" "}
          <strong>「役割分担して、変えやすくするため」</strong>。
        </p>

        <Faq q="層に分けると何が嬉しい?">
          <ul className="ml-5 flex list-disc flex-col gap-1">
            <li>
              <strong>差し替えが効く</strong>: 有線 → Wi-Fi に変えても、上の層 (HTTP とか) は変えなくていい
            </li>
            <li>
              <strong>分業で開発できる</strong>: ハードの人、ルーターの人、Web の人が別々で作業できる
            </li>
            <li>
              <strong>規格を統一しやすい</strong>: 層ごとに国際標準 (RFC) を作れる
            </li>
            <li>
              <strong>トラブル切り分けがしやすい</strong>: 「上の層は動いてるか?」「下は?」で問題箇所を絞れる
            </li>
          </ul>
        </Faq>
      </section>

      {/* 3. 7 つの層一覧 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="overview" num={3}>7 つの層 — 一覧</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          上から順に <strong>「人に近い」→「機械に近い」</strong>。 L7 が一番アプリ寄りで、L1 が物理的な電気信号。
        </p>

        <LayerStackDiagram />
      </section>

      {/* 4. L7 アプリケーション層 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="l7" num={4}>L7 — アプリケーション層 (一番大事)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>普段ソフトウェア開発で触るほぼ全部がここ</strong>。ユーザーや別のアプリと
          「何のやり取りをするか」を決めるルール (プロトコル) の層。
        </p>

        <LayerCard layer={7} color="indigo" title="アプリケーション層" />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          代表的なプロトコル
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">プロトコル</th>
                <th className="px-4 py-2 text-left font-semibold">何をする</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-mono">HTTP / HTTPS</td>
                <td className="px-4 py-2">Web ページの取得 (ブラウザが使う一番有名なやつ)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">DNS</td>
                <td className="px-4 py-2">ドメイン名 → IP の変換 (電話帳)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">SMTP / IMAP / POP3</td>
                <td className="px-4 py-2">メールの送受信</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">SSH</td>
                <td className="px-4 py-2">遠隔ログイン (EC2 にも使うやつ)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">FTP / SFTP</td>
                <td className="px-4 py-2">ファイル転送</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">WebSocket</td>
                <td className="px-4 py-2">サーバーとの双方向通信</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          → AWS の <strong>ALB (Application Load Balancer)</strong> もこの層 (L7) で動く。HTTP のパスやヘッダで振り分けできるのが特徴
        </p>
      </section>

      {/* 5. L6 + L5 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="l5l6" num={5}>L5 + L6 — セッション層・プレゼンテーション層 (実用ではあまり意識しない)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          実は <strong>この 2 つは現代だとほぼアプリケーション層 (L7) に統合されている</strong>。
          学術的には別の役割があるけど、実装上は HTTP や TLS が一緒に処理してしまうことが多い。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              L6 — プレゼンテーション層
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              データの「表現方法」を整える。<strong>暗号化 (TLS)</strong> / <strong>圧縮</strong> /
              文字コード変換などはここの仕事
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              L5 — セッション層
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>接続の維持・再開</strong>を管理。ログイン状態を保ったり、
              切れた接続を再確立したり
            </p>
          </div>
        </div>
      </section>

      {/* 6. L4 トランスポート層 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="l4" num={6}>L4 — トランスポート層 (TCP / UDP)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>「どうやって確実に届けるか」</strong>を決める層。
          ここで <strong>ポート番号</strong>も使われる (HTTP は 80、SSH は 22 みたいなやつ)。
        </p>

        <LayerCard layer={4} color="violet" title="トランスポート層" />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          代表的な 2 つのプロトコル
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border-2 border-violet-300 bg-violet-50/40 p-4 dark:border-violet-700 dark:bg-violet-950/30">
            <p className="text-sm font-bold text-violet-900 dark:text-violet-200">
              TCP (Transmission Control Protocol)
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>確実に届ける</strong>。順番も保証する。届かなかったら再送する。
              <br />
              用途: Web (HTTP) / メール / ファイル転送 (重い手続きでも信頼性重視)
            </p>
          </div>
          <div className="rounded-lg border-2 border-amber-300 bg-amber-50/40 p-4 dark:border-amber-700 dark:bg-amber-950/30">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
              UDP (User Datagram Protocol)
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>速さ優先</strong>。届かなくても気にしない。再送なし。
              <br />
              用途: 動画/音声配信 / オンラインゲーム / DNS の問い合わせ (一瞬で済むもの)
            </p>
          </div>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ポート番号は実際どう使われるか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          住所にたとえると分かりやすいです。
          <strong>IP アドレスがマンションの住所、ポート番号が部屋番号</strong>。
          住所だけだと建物までしか届かず、部屋番号があって初めて相手に渡ります。
        </p>

        <PortRoomDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          サーバーは 1 台でも、中では Web・SSH・DB といった別々のプログラムが動いています。
          <strong>どのプログラムに渡すかを決めているのがポート番号</strong>です。
          80 番に来たら Web、22 番に来たら SSH、という具合に振り分けられます。
        </p>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          じゃあ、こちら側 (ブラウザ) のポートは?
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          実はブラウザ側にも部屋番号が付いています。
          <strong>返事を受け取るための番号</strong>で、これは自分で決めるものではなく
          <strong>接続するたびに PC が空いている番号を勝手に 1 つ選びます</strong>。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          これがないと困るのが、同じサイトをタブで複数開いたとき。
          宛先はどれも同じ「YouTube の 443 番」なので、
          こちら側の番号が違うおかげで、返ってきたデータをどのタブに渡せばいいか分かります。
        </p>

        <PortTabsDiagram />

        <Faq q="TCP は勝手に再送してくれるの?">
          <p>
            <strong>はい、アプリ (ブラウザとか) は何もしなくて OK</strong>。
            TCP が裏で自動でやってくれる。
          </p>
          <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-50">
            やってること (3 行で)
          </p>
          <ol className="ml-5 mt-1 flex list-decimal flex-col gap-1">
            <li>送る → 相手から「届いたよ」の返事 (ACK) を待つ</li>
            <li>返事が来なかったら → <strong>勝手にもう一回送る</strong></li>
            <li>無事に届くまで繰り返す</li>
          </ol>
          <div className="mt-3 rounded-md border border-zinc-200 bg-white p-3 font-mono text-xs leading-relaxed dark:border-zinc-700 dark:bg-zinc-950">
            送信側 ──「こんにちは」──▶ 受信側<br />
            送信側 ◀──「届いた!」(ACK)── 受信側<br />
            <span className="text-zinc-400">  ↑ ACK が返らないと自動で再送</span>
          </div>
        </Faq>

        <Faq q="実際どんなときに TCP / UDP を使うの?">
          <p className="font-semibold text-violet-700 dark:text-violet-400">
            TCP を使うもの (= 中身が欠けたら困るもの)
          </p>
          <ul className="ml-5 mt-1 flex list-disc flex-col gap-0.5">
            <li>Web (HTTP / HTTPS) — HTML や画像が欠けたら壊れる</li>
            <li>メール — 本文が抜けたら困る</li>
            <li>SSH — コマンドが化けたら大事故</li>
            <li>ファイル転送 / Git push — 1 バイトでも欠けたら NG</li>
          </ul>
          <p className="mt-3 font-semibold text-amber-700 dark:text-amber-400">
            UDP を使うもの (= 速さが命、多少欠けても OK)
          </p>
          <ul className="ml-5 mt-1 flex list-disc flex-col gap-0.5">
            <li>ビデオ通話 (Zoom / Meet) — 0.5 秒前のフレーム再送されても遅い</li>
            <li>オンラインゲーム — 古い位置情報より最新が欲しい</li>
            <li>音声通話 (VoIP) — 遅れた音より無音の方がマシ</li>
            <li>DNS の問い合わせ — 1 パケットで終わる軽い処理</li>
          </ul>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            → ざっくり言うと <strong>「確実さ重視 → TCP」「速さ重視 → UDP」</strong>。
          </p>
        </Faq>
      </section>

      {/* 7. L3 ネットワーク層 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="l3" num={7}>L3 — ネットワーク層 (IP)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>「住所 (IP) を頼りに目的地まで運ぶ」</strong>層。
          世界中のルーターがバケツリレーで運んでくれる。
        </p>

        <LayerCard layer={3} color="sky" title="ネットワーク層" />

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ここで使われるもの
        </h3>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">用語</th>
                <th className="px-4 py-2 text-left font-semibold">何か</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-mono">IP アドレス</td>
                <td className="px-4 py-2"><code className="font-mono">192.168.1.10</code> みたいな住所。IPv4 と IPv6 がある</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">ルーター</td>
                <td className="px-4 py-2">パケットを次の経路に振り分ける機械</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">ルーティング</td>
                <td className="px-4 py-2">最適な経路を選ぶこと</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          → AWS の <strong>VPC / サブネット / ルートテーブル</strong> は全部この層 (L3) で動く
        </p>
      </section>

      {/* 8. L2 + L1 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="l1l2" num={8}>L2 + L1 — データリンク層・物理層 (ハードウェアに近い)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>「物理的にどう繋がってるか」</strong>を扱う最下層 2 つ。
          普段意識しないけど、家の Wi-Fi が遅い時とかはここの問題が多い。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              L2 — データリンク層
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>同じ LAN 内</strong>での通信。MAC アドレスを使う。
              <br />
              スイッチングハブ / Wi-Fi (Ethernet) がここ
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              L1 — 物理層
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>電気信号や光信号そのもの</strong>。
              <br />
              LAN ケーブル / 光ファイバー / 電波がここ
            </p>
          </div>
        </div>

        <Faq q="MAC アドレスと IP アドレスの違い">
          <p>
            <strong>MAC = 機器に固有の番号 (生まれた時から決まってる)</strong>。
            <strong>IP = ネットワーク内での住所 (引っ越したら変わる)</strong>。
          </p>
          <p className="mt-2">
            比喩: MAC は「マイナンバー (一生変わらない)」。IP は「今住んでる住所 (引っ越しで変わる)」
          </p>
        </Faq>
      </section>

      {/* 9. データが包まれていく */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="encapsulation" num={9}>データが「包まれて」流れる (カプセル化)</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          上から下に降りるたびに、データに <strong>ヘッダ (宛先情報など) が追加される</strong>。
          相手に届くと逆に下から上にヘッダが剥がされていく。これを <strong>カプセル化</strong>と呼ぶ。
        </p>

        <EncapsulationDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          ポイント:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-1.5 text-[15px] text-zinc-700 dark:text-zinc-300">
          <li>
            アプリは <strong>「これを送りたい」というデータ</strong>だけ用意すれば OK
          </li>
          <li>
            下の層が <strong>「相手のポート」「相手の IP」「相手の MAC」「電気信号」</strong>を順に付け足す
          </li>
          <li>
            受信側は順に剥がして、最後にアプリにデータが届く
          </li>
        </ul>
      </section>

      {/* 10. 動画を開くまでの順番 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="flow" num={10}>動画を 1 本開くまでの順番</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          層の話が一通り出たので、
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">https://youtube.com</code>{" "}
          を開いたときに<strong>どの層が何番目に働くのか</strong>を並べてみます。
        </p>

        <div className="flex flex-col gap-3">
          <FlowStep num={1} tag="L7" color="indigo" title="youtube.com の IP アドレスを DNS で引く">
            まず「youtube.com はどの IP?」を DNS に聞きます。DNS はアプリケーション層のプロトコル。
            ただしこの問い合わせ自体も 1 回の通信なので、下では UDP の 53 番ポートで運ばれています。
          </FlowStep>
          <FlowStep num={2} tag="L7" color="indigo" title="宛先ポートは 443 だと決める">
            URL が <code className="rounded bg-white px-1 font-mono text-xs dark:bg-zinc-950">https://</code>{" "}
            で始まっていてポートの指定がないので、ブラウザが「443 番」と判断します。
            <code className="rounded bg-white px-1 font-mono text-xs dark:bg-zinc-950">http://</code> なら 80 番、
            <code className="rounded bg-white px-1 font-mono text-xs dark:bg-zinc-950">:8443</code>{" "}
            と書けばその番号。<strong>この変換はアプリケーション層の仕事</strong>です (下の枠で詳しく)。
          </FlowStep>
          <FlowStep num={3} tag="L4" color="violet" title="その IP の 443 番へ TCP で接続する">
            決まった宛先に向けて TCP がコネクションを張ります。
            いきなりデータを送るのではなく、<strong>3 回やり取りして「準備できた?」を確認</strong>してから始めます (3 ウェイハンドシェイク)。
          </FlowStep>
          <FlowStep num={4} tag="TLS" color="pink" title="暗号化の鍵を交換する">
            HTTPS の <strong>S</strong> の部分。ここで鍵を決めてから先の中身を暗号化します。
            OSI では L6 (プレゼンテーション層) にあたる仕事ですが、実務では「HTTPS の一部」と扱われることが多いです。
          </FlowStep>
          <FlowStep num={5} tag="L7" color="indigo" title="ようやく HTTP のリクエストを送る">
            ここでやっと{" "}
            <code className="rounded bg-white px-1 font-mono text-xs dark:bg-zinc-950">GET /watch?v=...</code>{" "}
            が飛びます。1〜4 が全部終わって初めて、本来送りたかったものが送れる。
          </FlowStep>
        </div>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
            「https → 443」の変換をしているのはどの層?
          </p>
          <p className="mt-2 text-sm text-indigo-900/80 dark:text-indigo-300">
            ポート番号という<strong>仕組み自体は L4 のもの</strong>なので、
            「443 に変えるのもトランスポート層では?」と思いがちです。
            でも実際に変換しているのは<strong>アプリケーション層 (ブラウザ)</strong> の方です。
          </p>
          <p className="mt-3 text-sm font-semibold text-indigo-900 dark:text-indigo-200">
            理由: TCP は「https」という文字列を知らない
          </p>
          <p className="mt-1 text-sm text-indigo-900/80 dark:text-indigo-300">
            TCP ヘッダにあるのは<strong>宛先ポートという数値の箱だけ</strong>。
            そこに入るのは 443 という数字で、「HTTPS だからこの数字にしよう」という判断はしません。
            TCP から見れば 443 も 8443 も、区別のないただの数字です。
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md border border-indigo-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-zinc-700 dark:border-indigo-900/50 dark:bg-zinc-950 dark:text-zinc-300">
{`ブラウザ  https://youtube.com
            ↓  「スキームが https、ポート指定なし → 443」と変換  ← ここが L7
          connect(IP = 142.250.196.110, port = 443)
            ↓  渡された数字をヘッダに詰めて運ぶだけ              ← ここが L4`}
          </pre>
          <p className="mt-3 text-sm text-indigo-900/80 dark:text-indigo-300">
            OS に接続を頼む時点で渡しているのは <strong>443 という数字</strong>で、
            <code className="rounded bg-white px-1 font-mono text-xs dark:bg-indigo-950/50">https</code>{" "}
            という情報はそもそも OS まで届いていません。
          </p>
          <p className="mt-3 text-sm font-semibold text-indigo-900 dark:text-indigo-200">
            「https なら必ず 443」を強制している層はない
          </p>
          <p className="mt-1 text-sm text-indigo-900/80 dark:text-indigo-300">
            この対応づけは IANA が決めた<strong>ただの取り決め (ウェルノウンポート)</strong> で、
            その表をブラウザが持っているだけ。だから{" "}
            <code className="rounded bg-white px-1 font-mono text-xs dark:bg-indigo-950/50">https://example.com:8443</code>{" "}
            と書けば <strong>HTTPS なのに 8443</strong> で繋ぎにいきます。
            強制する層があるなら、こんなことはできません。
          </p>
          <div className="mt-3 rounded-md border border-indigo-200 bg-white px-3 py-2 text-sm text-indigo-900/90 dark:border-indigo-900/50 dark:bg-zinc-950 dark:text-indigo-300">
            <strong>まとめ</strong>: アプリは「部屋番号は 443 だ」と<strong>調べて封筒に書く人</strong>、
            L4 は<strong>部屋番号の欄を用意して、書かれた番号どおりに配る仕組み</strong>。
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            ありがちな勘違い: 「IP に :443 をつける」
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <code className="rounded bg-white px-1 font-mono text-xs dark:bg-zinc-950">142.250.196.110:443</code>{" "}
            と 1 つの住所のように書きますが、実際のパケットでは
            <strong>別々のヘッダに分かれて入っています</strong>。くっつけて書くのは人間が見やすいようにしているだけです。
          </p>
          <pre className="mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
{`[ IP ヘッダ  ] 宛先 IP    142.250.196.110   ← L3 が付ける
[ TCP ヘッダ ] 宛先ポート 443               ← L4 が付ける
[ データ     ] GET /watch?v=...             ← L7 が作る`}
          </pre>
        </div>
      </section>

      {/* 11. TCP/IP 4層モデル */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="tcpip" num={11}>OSI vs TCP/IP モデル</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          学術用の <strong>OSI 7 層</strong> に対して、実用では <strong>TCP/IP 4 層</strong>がよく使われる。
          中身は同じだけど、L5/L6/L7 をまとめて「アプリケーション」にしてる感じ。
        </p>

        <OsiVsTcpipDiagram />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          → 実務だと「アプリ層」「トランスポート層」「ネットワーク層」「物理層」くらいの粒度で話すのが普通
        </p>
      </section>

      {/* 12. AWS サービス対応 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="aws" num={12}>AWS のサービスはどの層?</SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          AWS の主要なサービスを層にマッピングしてみる。実用イメージが掴める:
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">層</th>
                <th className="px-4 py-2 text-left font-semibold">AWS サービス例</th>
                <th className="px-4 py-2 text-left font-semibold">何をする</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-indigo-700 dark:text-indigo-400">L7</td>
                <td className="px-4 py-2 font-mono">ALB / API Gateway / CloudFront</td>
                <td className="px-4 py-2">HTTP のパスやヘッダで振り分け</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-indigo-700 dark:text-indigo-400">L7</td>
                <td className="px-4 py-2 font-mono">Route 53</td>
                <td className="px-4 py-2">DNS 解決 (名前 → IP)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-violet-700 dark:text-violet-400">L4</td>
                <td className="px-4 py-2 font-mono">NLB (Network Load Balancer)</td>
                <td className="px-4 py-2">TCP/UDP で超高速振り分け</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-sky-700 dark:text-sky-400">L3</td>
                <td className="px-4 py-2 font-mono">VPC / Subnet / Route Table</td>
                <td className="px-4 py-2">IP で経路制御</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-sky-700 dark:text-sky-400">L3</td>
                <td className="px-4 py-2 font-mono">Internet Gateway / NAT Gateway</td>
                <td className="px-4 py-2">外部と内部の境界</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-600 dark:text-zinc-400">L1-L2</td>
                <td className="px-4 py-2 font-mono">物理的な AZ / DC / 海底ケーブル</td>
                <td className="px-4 py-2">AWS の物理インフラ (普段見えない)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 13. 関連ページ */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="related" num={13}>関連ページ</SectionH2>
        <ul className="ml-5 flex list-disc flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          <li>
            <a
              href="/network/internet"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              インターネットの裏側
            </a>
            {" "}── 物理層 (海底ケーブル) からの全体像
          </li>
          <li>
            <a
              href="/network/domain-url"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ドメイン と URL
            </a>
            {" "}── DNS (L7) の仕組み
          </li>
          <li>
            <a
              href="/communication/http"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              HTTP / TLS / HTTPS
            </a>
            {" "}── L7 の代表 HTTP の中身
          </li>
          <li>
            <a
              href="/aws/alb"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ALB を立てる
            </a>
            {" "}── L7 で振り分けるロードバランサーの実例
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
    { id: "why", num: 2, title: "なぜ層に分けるの?" },
    { id: "overview", num: 3, title: "7 つの層 — 一覧" },
    { id: "l7", num: 4, title: "L7 アプリケーション層" },
    { id: "l5l6", num: 5, title: "L5+L6 (実用では薄い)" },
    { id: "l4", num: 6, title: "L4 トランスポート層" },
    { id: "l3", num: 7, title: "L3 ネットワーク層" },
    { id: "l1l2", num: 8, title: "L1+L2 ハードウェア" },
    { id: "encapsulation", num: 9, title: "カプセル化" },
    { id: "flow", num: 10, title: "動画を開くまでの順番" },
    { id: "tcpip", num: 11, title: "OSI vs TCP/IP" },
    { id: "aws", num: 12, title: "AWS サービス対応" },
    { id: "related", num: 13, title: "関連ページ" },
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

type LayerColor = "indigo" | "violet" | "sky" | "amber";

function FlowStep({
  num,
  tag,
  color,
  title,
  children,
}: {
  num: number;
  tag: string;
  color: "indigo" | "violet" | "pink" | "zinc";
  title: string;
  children: React.ReactNode;
}) {
  const tagClasses: Record<string, string> = {
    indigo: "border-indigo-300 bg-indigo-100/70 text-indigo-800 dark:border-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-200",
    violet: "border-violet-300 bg-violet-100/70 text-violet-800 dark:border-violet-700 dark:bg-violet-950/60 dark:text-violet-200",
    pink: "border-pink-300 bg-pink-100/70 text-pink-800 dark:border-pink-700 dark:bg-pink-950/60 dark:text-pink-200",
    zinc: "border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  };

  return (
    <div className="flex gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
        {num}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-bold ${tagClasses[color]}`}>
            {tag}
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{children}</p>
      </div>
    </div>
  );
}

function LayerCard({ layer, color, title }: { layer: number; color: LayerColor; title: string }) {
  const colorClass = {
    indigo: "border-indigo-300 bg-indigo-50 text-indigo-900 dark:border-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200",
    violet: "border-violet-300 bg-violet-50 text-violet-900 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-200",
    sky: "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-200",
    amber: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200",
  }[color];

  return (
    <div className={`flex items-center gap-4 rounded-lg border-2 px-5 py-3 ${colorClass}`}>
      <div className="text-2xl font-bold">L{layer}</div>
      <div className="text-base font-bold">{title}</div>
    </div>
  );
}

function LayerStackDiagram() {
  const layers = [
    { num: 7, name: "アプリケーション", role: "HTTP / DNS / SSH / メール", color: "indigo" as const },
    { num: 6, name: "プレゼンテーション", role: "暗号化 (TLS) / 圧縮 / 文字コード", color: "pink" as const },
    { num: 5, name: "セッション", role: "接続の維持・再開", color: "rose" as const },
    { num: 4, name: "トランスポート", role: "TCP / UDP / ポート", color: "violet" as const },
    { num: 3, name: "ネットワーク", role: "IP / ルーティング", color: "sky" as const },
    { num: 2, name: "データリンク", role: "MAC アドレス / Ethernet / Wi-Fi", color: "teal" as const },
    { num: 1, name: "物理", role: "ケーブル / 光ファイバー / 電波", color: "zinc" as const },
  ];

  const colorClasses: Record<string, string> = {
    indigo: "border-indigo-400 bg-indigo-100/70 text-indigo-900 dark:border-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-100",
    pink: "border-pink-400 bg-pink-100/70 text-pink-900 dark:border-pink-600 dark:bg-pink-950/60 dark:text-pink-100",
    rose: "border-rose-400 bg-rose-100/70 text-rose-900 dark:border-rose-600 dark:bg-rose-950/60 dark:text-rose-100",
    violet: "border-violet-400 bg-violet-100/70 text-violet-900 dark:border-violet-600 dark:bg-violet-950/60 dark:text-violet-100",
    sky: "border-sky-400 bg-sky-100/70 text-sky-900 dark:border-sky-600 dark:bg-sky-950/60 dark:text-sky-100",
    teal: "border-teal-400 bg-teal-100/70 text-teal-900 dark:border-teal-600 dark:bg-teal-950/60 dark:text-teal-100",
    zinc: "border-zinc-400 bg-zinc-100/70 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-100",
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <span>↑ 人に近い (アプリ寄り)</span>
        <span>↓ 機械に近い (物理寄り)</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {layers.map((l) => (
          <div
            key={l.num}
            className={`flex items-center gap-4 rounded-md border-2 px-4 py-2.5 ${colorClasses[l.color]}`}
          >
            <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded font-mono text-sm font-bold">
              L{l.num}
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">{l.name}</div>
              <div className="text-xs opacity-75">{l.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortRoomDiagram() {
  const rooms = [
    { port: "443", app: "Web サーバー", note: "ブラウザからの表示要求", y: 50 },
    { port: "22", app: "SSH", note: "エンジニアのログイン", y: 96 },
    { port: "3306", app: "MySQL", note: "アプリからのデータ読み書き", y: 142 },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 580 200" className="mx-auto w-full max-w-2xl">
        <rect x="12" y="86" width="92" height="44" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.3" />
        <text x="58" y="104" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          あなたの PC
        </text>
        <text x="58" y="120" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
          ここから送る
        </text>

        <rect x="292" y="16" width="272" height="172" rx="8" className="fill-violet-50/60 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.4" />
        <text x="428" y="36" textAnchor="middle" className="fill-violet-900 text-[11px] font-semibold dark:fill-violet-200">
          1 台のサーバー (住所 = IP アドレス)
        </text>

        {rooms.map((r) => (
          <g key={r.port}>
            <line
              x1="106"
              y1="108"
              x2="290"
              y2={r.y + 17}
              className="stroke-violet-400 dark:stroke-violet-600"
              strokeWidth="1.6"
            />
            <text
              x="198"
              y={108 + (r.y + 17 - 108) * 0.5 - 5}
              textAnchor="middle"
              className="fill-violet-700 font-mono text-[10px] font-semibold dark:fill-violet-300"
            >
              :{r.port} 宛
            </text>
            <rect x="306" y={r.y} width="244" height="34" rx="5" className="fill-white stroke-violet-300 dark:fill-zinc-950 dark:stroke-violet-800" strokeWidth="1.2" />
            <text x="326" y={r.y + 22} className="fill-violet-700 font-mono text-[11px] font-bold dark:fill-violet-300">
              {r.port}
            </text>
            <text x="374" y={r.y + 17} className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
              {r.app}
            </text>
            <text x="374" y={r.y + 29} className="fill-zinc-500 text-[9px] dark:fill-zinc-400">
              {r.note}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
        住所 (IP) は 1 つでも、部屋番号 (ポート) で渡す相手が変わる
      </p>
    </div>
  );
}

function PortTabsDiagram() {
  const tabs = [
    { name: "タブ 1", port: "51234", y: 44 },
    { name: "タブ 2", port: "51235", y: 88 },
    { name: "タブ 3", port: "51236", y: 132 },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 580 196" className="mx-auto w-full max-w-2xl">
        <text x="130" y="26" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          自分の PC (番号は自動で決まる)
        </text>
        <text x="452" y="26" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          YouTube のサーバー
        </text>

        <rect x="356" y="40" width="192" height="128" rx="8" className="fill-violet-50/60 stroke-violet-400 dark:fill-violet-950/30 dark:stroke-violet-700" strokeWidth="1.4" />
        <text x="452" y="100" textAnchor="middle" className="fill-violet-900 font-mono text-[13px] font-bold dark:fill-violet-200">
          :443
        </text>
        <text x="452" y="118" textAnchor="middle" className="fill-violet-700 text-[9px] dark:fill-violet-300">
          宛先はどれも同じ
        </text>

        {tabs.map((t) => (
          <g key={t.port}>
            <rect x="12" y={t.y} width="150" height="32" rx="5" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.2" />
            <text x="30" y={t.y + 21} className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">
              {t.name}
            </text>
            <text x="82" y={t.y + 21} className="fill-emerald-700 font-mono text-[11px] font-bold dark:fill-emerald-400">
              :{t.port}
            </text>
            <line x1="166" y1={t.y + 16} x2="352" y2={t.y + 16} className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.4" />
          </g>
        ))}

        <text x="259" y="186" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          ↑ 自分側の番号だけが違う = 返事をどのタブに渡すか分かる
        </text>
      </svg>
    </div>
  );
}

function EncapsulationDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`[送信側] アプリが  "こんにちは"  と送ろうとする
                       ↓
   L7: 元データ          ┃ こんにちは ┃
                       ↓
   L4: TCP ヘッダ追加    ┃ TCP ┃ こんにちは ┃   ← 「相手のポート」とか
                       ↓
   L3: IP ヘッダ追加     ┃ IP ┃ TCP ┃ こんにちは ┃   ← 「相手の IP」
                       ↓
   L2: MAC ヘッダ追加    ┃ MAC ┃ IP ┃ TCP ┃ こんにちは ┃   ← 「次の隣の機器」
                       ↓
   L1: 電気信号に変換     0101010101…   ← ケーブルに流れる

           ━━━━━━━━━━━━━━━━━━━━━━━━━━━
           インターネットを通って相手に到着
           ━━━━━━━━━━━━━━━━━━━━━━━━━━━

[受信側] L1 が電気信号を受信        0101010101…
                       ↓
   L2: MAC ヘッダを剥がす   ┃ IP ┃ TCP ┃ こんにちは ┃
                       ↓
   L3: IP ヘッダを剥がす    ┃ TCP ┃ こんにちは ┃
                       ↓
   L4: TCP ヘッダを剥がす   ┃ こんにちは ┃
                       ↓
   L7: アプリが受け取る     "こんにちは"`}
      </pre>
    </div>
  );
}

function OsiVsTcpipDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-2 gap-6">
        {/* OSI */}
        <div>
          <div className="mb-2 text-center text-sm font-bold text-zinc-700 dark:text-zinc-300">
            OSI 7 層 (学術)
          </div>
          <div className="flex flex-col gap-1">
            <div className="rounded border border-indigo-300 bg-indigo-50 px-3 py-2 text-xs dark:border-indigo-700 dark:bg-indigo-950/40">
              <span className="font-mono font-bold">L7</span> アプリケーション
            </div>
            <div className="rounded border border-pink-300 bg-pink-50 px-3 py-2 text-xs dark:border-pink-700 dark:bg-pink-950/40">
              <span className="font-mono font-bold">L6</span> プレゼンテーション
            </div>
            <div className="rounded border border-rose-300 bg-rose-50 px-3 py-2 text-xs dark:border-rose-700 dark:bg-rose-950/40">
              <span className="font-mono font-bold">L5</span> セッション
            </div>
            <div className="rounded border border-violet-300 bg-violet-50 px-3 py-2 text-xs dark:border-violet-700 dark:bg-violet-950/40">
              <span className="font-mono font-bold">L4</span> トランスポート
            </div>
            <div className="rounded border border-sky-300 bg-sky-50 px-3 py-2 text-xs dark:border-sky-700 dark:bg-sky-950/40">
              <span className="font-mono font-bold">L3</span> ネットワーク
            </div>
            <div className="rounded border border-teal-300 bg-teal-50 px-3 py-2 text-xs dark:border-teal-700 dark:bg-teal-950/40">
              <span className="font-mono font-bold">L2</span> データリンク
            </div>
            <div className="rounded border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-700 dark:bg-zinc-900">
              <span className="font-mono font-bold">L1</span> 物理
            </div>
          </div>
        </div>

        {/* TCP/IP */}
        <div>
          <div className="mb-2 text-center text-sm font-bold text-zinc-700 dark:text-zinc-300">
            TCP/IP 4 層 (実用)
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex min-h-[7.5rem] flex-col justify-center rounded border-2 border-indigo-400 bg-indigo-100/70 px-3 py-2 text-xs dark:border-indigo-600 dark:bg-indigo-950/60">
              <span className="font-bold">アプリケーション</span>
              <span className="mt-1 text-[10px] opacity-75">(L7 + L6 + L5 をまとめる)</span>
            </div>
            <div className="rounded border-2 border-violet-400 bg-violet-100/70 px-3 py-2 text-xs dark:border-violet-600 dark:bg-violet-950/60">
              <span className="font-bold">トランスポート</span>
              <span className="ml-2 text-[10px] opacity-75">(L4 と同じ)</span>
            </div>
            <div className="rounded border-2 border-sky-400 bg-sky-100/70 px-3 py-2 text-xs dark:border-sky-600 dark:bg-sky-950/60">
              <span className="font-bold">インターネット</span>
              <span className="ml-2 text-[10px] opacity-75">(L3 と同じ)</span>
            </div>
            <div className="flex min-h-[5rem] flex-col justify-center rounded border-2 border-zinc-400 bg-zinc-100/70 px-3 py-2 text-xs dark:border-zinc-600 dark:bg-zinc-900/60">
              <span className="font-bold">ネットワークアクセス</span>
              <span className="mt-1 text-[10px] opacity-75">(L2 + L1 をまとめる)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
