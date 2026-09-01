export default function ProxyPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          プロキシ とは何か
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          ルータやファイアウォールと並んで「通信の途中に置く装置」なのに、役割がまるで違う。
          <strong>何が違うのか</strong>と、<strong>フォワード / リバース</strong>の 2 種類を整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            プロキシ = <strong>「代理人」</strong>。通信を素通しさせるのではなく、
            <strong>自分が受け取って、自分が改めて相手に繋ぎ直す</strong>装置
          </li>
          <li>
            ルータ・ファイアウォールとの決定的な違いは
            <strong>「通信の当事者になるかどうか」</strong>。
            プロキシは <strong>接続が手前と奥で 2 本に分かれる</strong>
          </li>
          <li>
            当事者になるので <strong>URL や HTTP ヘッダ、中身まで見て判断できる</strong>。
            IP とポートしか見ないファイアウォールとの差はここから生まれる
          </li>
          <li>
            向きで 2 種類。<strong>フォワードプロキシ</strong> = 社内 PC の代理で外に出る、
            <strong>リバースプロキシ</strong> = 公開サーバの代理で外から受ける（<strong>ALB がこれ</strong>）
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="agent" num={2}>
          プロキシ = 代理で繋ぎ直す
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ルータもファイアウォールも、やっていることは
          <strong>「流れてきたパケットを、通すか捨てるか決めて、そのまま次へ渡す」</strong>だけです。
          パケットの中身は基本的に触りません。宛先も送信元も、最初から最後まで同じです。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          プロキシは違います。<strong>いったん自分宛てとして受け取り切って</strong>、
          <strong>自分の名前で改めて本来の相手に接続します</strong>。
          つまり <strong>1 本だった通信が、手前と奥で 2 本に分かれる</strong>。
        </p>

        <ConnectionSplitDiagram />

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
            この「2 本に分かれる」から、全部の性質が出てくる
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-indigo-900/90 dark:text-indigo-300">
            <li>
              ・<strong>中身が見える</strong>: 受け取り切るので、URL も HTTP ヘッダも本文も読める。
              「このサイトは業務に関係ないから拒否」といった判断ができる
            </li>
            <li>
              ・<strong>送信元が隠れる</strong>: サーバ側から見た接続元は
              <strong>プロキシの IP</strong>。社員の PC の IP は届かない
            </li>
            <li>
              ・<strong>代わりに答えられる</strong>: 一度取得した内容を持っておけば、
              次の人には奥へ行かずに返せる（<strong>キャッシュ</strong>）
            </li>
            <li>
              ・<strong>行き先を差し替えられる</strong>: 奥への接続は自分で張り直すので、
              別のサーバに振ることも、複数台に分散することもできる
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          逆に言うと、プロキシは <strong>全通信の中身を扱える立場</strong>にいます。
          社内プロキシがアクセスログを持っているのも、HTTPS を復号して検査する製品があるのも、
          この構造上の必然です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="compare" num={3}>
          ルータ / ファイアウォール / プロキシ の関係
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          3 つとも「通信の途中にいる箱」ですが、
          <strong>どの層で、何を材料に、何を決めるか</strong>が違います。
          並べると役割分担がはっきりします。
        </p>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold">ルータ</th>
                <th className="px-3 py-2 text-left font-semibold">ファイアウォール</th>
                <th className="px-3 py-2 text-left font-semibold">プロキシ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">主な層</td>
                <td className="px-3 py-2 font-mono text-xs">L3</td>
                <td className="px-3 py-2 font-mono text-xs">L3 / L4</td>
                <td className="px-3 py-2 font-mono text-xs">L7</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">判断材料</td>
                <td className="px-3 py-2">宛先 IP</td>
                <td className="px-3 py-2">IP / ポート / 通信の状態</td>
                <td className="px-3 py-2">URL / HTTP ヘッダ / 中身</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">やること</td>
                <td className="px-3 py-2">次はどっちへ送るか決める</td>
                <td className="px-3 py-2">通すか捨てるか決める</td>
                <td className="px-3 py-2">代理で繋ぎ直す</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">通信の当事者?</td>
                <td className="px-3 py-2">いいえ</td>
                <td className="px-3 py-2">いいえ</td>
                <td className="px-3 py-2 font-semibold text-indigo-700 dark:text-indigo-300">はい</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">接続の本数</td>
                <td className="px-3 py-2">1 本のまま</td>
                <td className="px-3 py-2">1 本のまま</td>
                <td className="px-3 py-2 font-semibold text-indigo-700 dark:text-indigo-300">2 本に分かれる</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">たとえ</td>
                <td className="px-3 py-2">道路の分岐標識</td>
                <td className="px-3 py-2">入口の門番</td>
                <td className="px-3 py-2">受付の代理人</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          実際の会社の出口では、<strong>3 つが同時に並んでいます</strong>。
          対立するものではなく、<strong>役割が違うので重ねて使う</strong>のが普通です。
        </p>

        <PlacementDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            上の図で実際に起きていること (順番に追う)
          </p>
          <ol className="mt-3 flex list-none flex-col gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">① PC は YouTube ではなく、まずプロキシに繋ぐ</strong>
              <br />
              宛先は{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-zinc-950">10.0.1.10:8080</code>。
              「<code className="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-zinc-950">www.youtube.com/watch</code>{" "}
              を取ってきて」と<strong>依頼を出す</strong>形になる
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">② プロキシが URL を見て判断する</strong>
              <br />
              社内ルールの「動画」カテゴリに一致 → <strong>ここで打ち切り</strong>。PC にブロック画面を返す。
              この場合 <strong>YouTube には 1 バイトも届いていない</strong>
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">③ (許可されるサイトなら) プロキシが自分の名前で接続する</strong>
              <br />
              宛先は{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-zinc-950">142.250.196.110:443</code>。
              <strong>ここが 2 本目の接続</strong>で、送信元は PC ではなくプロキシになる
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">④ FW は ③ のパケットだけを見る</strong>
              <br />
              「送信元 = 社内、宛先ポート = 443」なのでルールに合致 → <strong>通す</strong>。
              FW にとっては<strong>ごく普通の HTTPS 通信</strong>で、YouTube かどうかは判断材料に入っていない
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">⑤ 応答はプロキシが受け取り、PC に渡す</strong>
              <br />
              PC は最後までプロキシとしか会話していない
            </li>
          </ol>
        </div>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
            なぜ 8080? HTTPS だから 443 では?
          </p>
          <p className="mt-2 text-sm text-indigo-900/90 dark:text-indigo-300">
            ポート番号は <strong>「どの機械の、どのドアを叩くか」</strong>を指すものなので、
            <strong>区間が変われば別の番号</strong>になります。1 本の通信にポート番号が 1 つ、ではありません。
          </p>
          <div className="mt-3 overflow-x-auto rounded-md border border-indigo-200 bg-white dark:border-indigo-900/50 dark:bg-zinc-950">
            <table className="w-full min-w-[420px] text-sm">
              <thead className="bg-indigo-50/70 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">区間</th>
                  <th className="px-3 py-2 text-left font-semibold">宛先の機械</th>
                  <th className="px-3 py-2 text-left font-semibold">ポート</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100 text-zinc-700 dark:divide-indigo-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">PC → プロキシ</td>
                  <td className="px-3 py-2">プロキシ</td>
                  <td className="px-3 py-2 font-mono text-xs">8080</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">プロキシ → YouTube</td>
                  <td className="px-3 py-2">YouTube のサーバ</td>
                  <td className="px-3 py-2 font-mono text-xs">443</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-indigo-900/90 dark:text-indigo-300">
            <strong>443 は「Web サーバが待ち受ける番号」</strong>としての慣習です。
            プロキシは Web サーバではなく<strong>代理人</strong>なので、その番号を使う理由がありません。
            プロキシ用に慣習的に使われるのが <strong>8080</strong>（製品によっては 3128 など）で、
            <strong>設定で自由に変えられます</strong>。決まりではなく「そう置くことが多い」だけです。
          </p>
          <p className="mt-2 text-sm text-indigo-900/90 dark:text-indigo-300">
            会社の PC で{" "}
            <code className="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-zinc-950">
              http://proxy.example.co.jp:8080
            </code>{" "}
            のような値を設定させられるのは、まさに<strong>「1 本目の接続先」を PC に教えている</strong>作業です。
            ポート番号が 2 つ出てくること自体が、<strong>接続が 2 本に分かれている何よりの証拠</strong>になります。
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            「NGFW があればプロキシは要らないのでは?」
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            境界はかなり曖昧です。FortiGate のような <strong>NGFW は中身も見る</strong>ので、
            URL フィルタなどプロキシと同じ仕事もこなします。実際
            <strong>1 台に統合されている現場は多い</strong>。
            それでも「認証してユーザ単位でログを残す」「キャッシュで帯域を節約する」など
            <strong>代理人として振る舞う前提の機能</strong>が要る場合に、専用のプロキシが置かれます。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="forward" num={4}>
          フォワードプロキシ (中 → 外)
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>社内 PC の代理で、外のサイトに取りに行く</strong>タイプ。
          単に「プロキシ」と言った場合、たいていこちらを指します。
          守っているのは <strong>クライアント側（社員 PC）</strong>です。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              何に使うか
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>アクセス制限</strong>: 業務に関係ないサイトを URL 単位で遮断</li>
              <li>・<strong>ログ取得</strong>: 誰がいつどこに接続したかを記録（監査対応）</li>
              <li>・<strong>キャッシュ</strong>: 同じファイルを何度も取りに行かせない</li>
              <li>・<strong>出口 IP の固定</strong>: 全社員の接続元 IP を 1 つに揃える</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              気づくポイント
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              会社の PC で <strong>ブラウザやターミナルにプロキシ設定を書かされる</strong>のがこれ。
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">
                HTTP_PROXY
              </code>{" "}
              環境変数や、<code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">npm</code>{" "}
              が繋がらず設定を追加した経験があれば、それがフォワードプロキシです。
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <strong>出口 IP が 1 つに揃う</strong>のは実務上よく効きます。取引先のシステムに
          「この IP からのアクセスだけ許可」と登録してもらう場合、社員が何人いても
          <strong>登録するのはプロキシの IP 1 つで済む</strong>ためです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="reverse" num={5}>
          リバースプロキシ (外 → 中)
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          向きが逆で、<strong>公開サーバの代理で、外からのアクセスを受ける</strong>タイプ。
          守っているのは <strong>サーバ側</strong>です。
          利用者は<strong>プロキシがいることに気づきません</strong>。ドメイン名が指しているのがそれ自身だからです。
        </p>

        <ReverseProxyDiagram />

        <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            ALB はリバースプロキシそのもの
          </p>
          <p className="mt-2 text-sm text-emerald-900/90 dark:text-emerald-300">
            <a
              href="/aws/alb"
              className="underline underline-offset-2 hover:text-emerald-950 dark:hover:text-emerald-100"
            >
              ALB
            </a>{" "}
            でやったことを並べると、全部リバースプロキシの仕事です。
            <strong>2 台の EC2 に振り分ける</strong>（負荷分散）、
            <strong>HTTPS を受けて EC2 には HTTP で渡す</strong>（TLS 終端）、
            <strong>ヘルスチェックで落ちた方を外す</strong>。
            どれも「代理で繋ぎ直す」からできることです。
          </p>
          <p className="mt-2 text-sm text-emerald-900/90 dark:text-emerald-300">
            <a
              href="/aws/route53"
              className="underline underline-offset-2 hover:text-emerald-950 dark:hover:text-emerald-100"
            >
              Route 53
            </a>{" "}
            で証明書を EC2 ではなく ALB に紐づけたのも同じ理由です。
            <strong>ブラウザの接続相手は ALB</strong>なので、証明書もそこが持たないと意味がありません。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              何に使うか
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>負荷分散</strong>: 複数のサーバに振り分ける</li>
              <li>・<strong>TLS 終端</strong>: 証明書を 1 か所にまとめる</li>
              <li>・<strong>サーバを隠す</strong>: 実サーバの IP を外に出さない</li>
              <li>・<strong>パスで振り分け</strong>: <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800">/api</code> は別サーバへ、など</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              よく使われるもの
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>nginx</strong> / Apache（自前で立てる定番）</li>
              <li>・<strong>ALB</strong> / CloudFront（AWS のマネージド）</li>
              <li>・<strong>Cloudflare</strong>（CDN 兼リバースプロキシ）</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              nginx は Web サーバとしても使えるので、
              <strong>同じソフトが役割によって呼ばれ方を変える</strong>点が混乱しやすいところです。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="tell" num={6}>
          見分け方: どっちのプロキシか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          フォワードとリバースは <strong>仕組みは同じで、置く向きが違うだけ</strong>です。
          迷ったら <strong>「誰を守っているか」「利用者が存在を知っているか」</strong>で判断できます。
        </p>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold"></th>
                <th className="px-3 py-2 text-left font-semibold">フォワード</th>
                <th className="px-3 py-2 text-left font-semibold">リバース</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">守る相手</td>
                <td className="px-3 py-2">クライアント（社員 PC）</td>
                <td className="px-3 py-2">サーバ（公開サービス）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">誰が存在を知っているか</td>
                <td className="px-3 py-2">クライアントだけ（設定を書く）</td>
                <td className="px-3 py-2">サーバ側だけ（利用者は気づかない）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">隠れるもの</td>
                <td className="px-3 py-2">接続元（誰が見に来たか）</td>
                <td className="px-3 py-2">接続先（実サーバはどれか）</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">置き場所</td>
                <td className="px-3 py-2">社内 LAN の出口</td>
                <td className="px-3 py-2">公開サーバの手前</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            1 回のアクセスで両方通ることもある
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            社員が会社の PC から自社サービスを開くと、
            <strong>出口でフォワードプロキシを通り、サービスの手前でリバースプロキシを通ります</strong>。
            同じ 1 本のアクセスが、途中で <strong>2 回代理されている</strong>ということです。
            どちらも「代理で繋ぎ直す」だけなので、重なっても問題なく動きます。
          </p>
        </div>
      </section>
    </main>
  );
}

function ConnectionSplitDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 260" className="mx-auto w-full max-w-2xl">
        <text x="300" y="18" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          ルータ / ファイアウォール ── 接続は 1 本のまま
        </text>

        <rect x="20" y="35" width="110" height="40" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="75" y="60" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          PC
        </text>

        <rect x="245" y="35" width="110" height="40" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="300" y="60" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          FW
        </text>

        <rect x="470" y="35" width="110" height="40" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="525" y="60" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          サーバ
        </text>

        <line x1="130" y1="55" x2="470" y2="55" className="stroke-emerald-500" strokeWidth="2" />
        <text x="300" y="92" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          PC ⇄ サーバ の接続が 1 本、素通りしている
        </text>

        <line x1="20" y1="118" x2="580" y2="118" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="300" y="145" textAnchor="middle" className="fill-zinc-500 text-[10px] font-semibold dark:fill-zinc-400">
          プロキシ ── 手前と奥で 2 本に分かれる
        </text>

        <rect x="20" y="162" width="110" height="40" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="75" y="187" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          PC
        </text>

        <rect x="235" y="157" width="130" height="50" rx="6" className="fill-indigo-600 dark:fill-indigo-500" />
        <text x="300" y="177" textAnchor="middle" className="fill-white text-xs font-semibold">
          プロキシ
        </text>
        <text x="300" y="194" textAnchor="middle" className="fill-indigo-100 text-[10px]">
          代理人
        </text>

        <rect x="470" y="162" width="110" height="40" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="525" y="187" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          サーバ
        </text>

        <line x1="130" y1="182" x2="235" y2="182" className="stroke-indigo-500" strokeWidth="2" />
        <line x1="365" y1="182" x2="470" y2="182" className="stroke-indigo-500" strokeWidth="2" />

        <text x="182" y="152" textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          接続 ①
        </text>
        <text x="417" y="152" textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          接続 ②
        </text>

        <text x="300" y="228" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          プロキシが ① を受け切ってから、自分の名前で ② を張り直す
        </text>
        <text x="300" y="245" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          サーバから見た接続元は PC ではなく「プロキシ」になる
        </text>
      </svg>
    </div>
  );
}

function PlacementDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="mb-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        例: 社員が <span className="font-mono">https://www.youtube.com/watch?v=xxxx</span> を開いたとき
      </p>
      <svg viewBox="0 0 600 330" className="mx-auto w-full max-w-2xl">
        <rect x="15" y="20" width="115" height="52" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="72" y="42" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          社員 PC
        </text>
        <text x="72" y="60" textAnchor="middle" className="fill-zinc-500 font-mono text-[10px] dark:fill-zinc-500">
          10.0.5.23
        </text>

        <line x1="130" y1="46" x2="180" y2="46" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="180" y="14" width="125" height="64" rx="6" className="fill-indigo-600 dark:fill-indigo-500" />
        <text x="242" y="36" textAnchor="middle" className="fill-white text-xs font-semibold">
          プロキシ
        </text>
        <text x="242" y="53" textAnchor="middle" className="fill-indigo-100 font-mono text-[10px]">
          10.0.1.10:8080
        </text>
        <text x="242" y="69" textAnchor="middle" className="fill-indigo-100 text-[10px]">
          URL を見る
        </text>

        <line x1="305" y1="46" x2="355" y2="46" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="355" y="14" width="125" height="64" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="417" y="36" textAnchor="middle" className="fill-zinc-50 text-xs font-semibold dark:fill-zinc-900">
          FW / ルータ
        </text>
        <text x="417" y="53" textAnchor="middle" className="fill-zinc-300 font-mono text-[10px] dark:fill-zinc-600">
          10.0.1.1
        </text>
        <text x="417" y="69" textAnchor="middle" className="fill-zinc-300 text-[10px] dark:fill-zinc-600">
          IP とポートを見る
        </text>

        <line x1="480" y1="46" x2="520" y2="46" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="520" y="20" width="65" height="52" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="552" y="42" textAnchor="middle" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-200">
          インター
        </text>
        <text x="552" y="56" textAnchor="middle" className="fill-amber-900 text-[10px] font-semibold dark:fill-amber-200">
          ネット
        </text>

        <line x1="242" y1="78" x2="242" y2="105" className="stroke-indigo-300 dark:stroke-indigo-700" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="140" y="105" width="205" height="86" rx="6" className="fill-indigo-50 stroke-indigo-300 dark:fill-indigo-950/30 dark:stroke-indigo-800" strokeWidth="1" />
        <text x="242" y="124" textAnchor="middle" className="fill-indigo-900 text-[10px] font-semibold dark:fill-indigo-200">
          プロキシが見ているもの
        </text>
        <g className="fill-indigo-900 font-mono text-[9px] dark:fill-indigo-300" textAnchor="middle">
          <text x="242" y="142">www.youtube.com/watch</text>
          <text x="242" y="156">User-Agent: Chrome</text>
          <text x="242" y="170">社員 ID: sato</text>
        </g>
        <text x="242" y="185" textAnchor="middle" className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-400">
          → 動画サイトなので拒否
        </text>

        <line x1="417" y1="78" x2="417" y2="105" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="360" y="105" width="225" height="86" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1" />
        <text x="472" y="124" textAnchor="middle" className="fill-zinc-800 text-[10px] font-semibold dark:fill-zinc-200">
          FW が見ているもの
        </text>
        <g className="fill-zinc-700 font-mono text-[9px] dark:fill-zinc-300" textAnchor="middle">
          <text x="472" y="142">送信元 10.0.1.10</text>
          <text x="472" y="156">宛先 142.250.196.110</text>
          <text x="472" y="170">ポート 443/tcp</text>
        </g>
        <text x="472" y="185" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          → 443 は許可なので通す
        </text>

        <line x1="15" y1="212" x2="585" y2="212" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" />

        <text x="300" y="236" textAnchor="middle" className="fill-zinc-800 text-[11px] font-semibold dark:fill-zinc-200">
          同じ 1 つのアクセスを、別の材料で 2 回審査している
        </text>
        <text x="300" y="258" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          FW には「YouTube だから」は判断できない。宛先 IP とポート 443 しか見えないので、
        </text>
        <text x="300" y="273" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          社内から許可された普通の HTTPS 通信にしか見えない
        </text>
        <text x="300" y="295" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          プロキシには「ポート 443 を閉じる」ができない。閉じたら全 Web が止まる
        </text>
        <text x="300" y="317" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          得意分野が違うので、どちらか一方では足りない
        </text>
      </svg>
    </div>
  );
}

function ReverseProxyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 250" className="mx-auto w-full max-w-2xl">
        <rect x="20" y="100" width="110" height="46" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="75" y="128" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          利用者
        </text>

        <line x1="130" y1="123" x2="215" y2="123" className="stroke-emerald-500" strokeWidth="2" />
        <text x="172" y="112" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          HTTPS
        </text>

        <rect x="215" y="93" width="130" height="60" rx="6" className="fill-indigo-600 dark:fill-indigo-500" />
        <text x="280" y="116" textAnchor="middle" className="fill-white text-xs font-semibold">
          リバースプロキシ
        </text>
        <text x="280" y="134" textAnchor="middle" className="fill-indigo-100 text-[10px]">
          ALB / nginx
        </text>

        <line x1="345" y1="110" x2="450" y2="75" className="stroke-zinc-400" strokeWidth="1.5" />
        <line x1="345" y1="136" x2="450" y2="171" className="stroke-zinc-400" strokeWidth="1.5" />
        <text x="400" y="112" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          HTTP
        </text>

        <rect x="450" y="52" width="130" height="46" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="515" y="80" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          サーバ 1
        </text>

        <rect x="450" y="148" width="130" height="46" rx="6" className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="515" y="176" textAnchor="middle" className="fill-zinc-800 text-xs font-semibold dark:fill-zinc-200">
          サーバ 2
        </text>

        <text x="280" y="80" textAnchor="middle" className="fill-indigo-700 text-[10px] font-semibold dark:fill-indigo-300">
          ドメイン名が指しているのはここ
        </text>

        <text x="300" y="215" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">
          利用者から見える相手は常にプロキシ。奥に何台あるかは分からない
        </text>
        <text x="300" y="233" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          証明書もここに置く (TLS 終端)。奥へは HTTP で渡す
        </text>
      </svg>
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
    { id: "agent", num: 2, title: "代理で繋ぎ直す" },
    { id: "compare", num: 3, title: "ルータ / FW との関係" },
    { id: "forward", num: 4, title: "フォワードプロキシ" },
    { id: "reverse", num: 5, title: "リバースプロキシ" },
    { id: "tell", num: 6, title: "見分け方" },
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
