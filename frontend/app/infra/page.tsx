export default function InfraPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          インフラの選び方 (実行環境と DB)
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「これ ECS で動かす? Vercel でいい?」「DB は RDS?」を聞かれたときの判断材料。
          結論から言うと、<strong>どれを選んでも大抵は動きます</strong>。
          変わるのは <strong>運用の手間</strong>と、<strong>困ったときに逃げられるか</strong>です。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="changes" num={1}>
          インフラで変わること・変わらないこと
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          インフラ選定の議論は「どれが速いか」「どれが安いか」に流れがちですが、
          普通の業務システムの規模ではそこで大きな差はつきません。
          月数万リクエストなら、どの選択肢でも動きますし、
          料金も<strong>人件費 1 人日分に届かない差</strong>であることがほとんどです。
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              インフラで変わらないこと
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>動くかどうか</strong>（大抵どれでも動く）</li>
              <li>・アプリのコード（<strong>ほぼそのまま載る</strong>）</li>
              <li>・検索や集計の速さ（<strong>DB と索引</strong>の仕事）</li>
              <li>・機能の作りやすさ</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              インフラで変わること
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・<strong>自分が面倒を見る範囲</strong>（OS 更新、証明書、監視）</li>
              <li>・<strong>障害時に自分で直せるか</strong></li>
              <li>・<strong>後から乗り換えられるか</strong>（ロックイン）</li>
              <li>・使わない時間に金がかかるか</li>
            </ul>
          </div>
        </div>

        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
          インフラ選定は性能の話ではなく、
          <strong>「どこまでを自分の仕事にするか」を決める作業</strong>です。
          裏を返すと、<strong>運用する人数が少ないほどマネージドに寄せる</strong>のが合理的になります。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="responsibility" num={2}>
          全部の選択肢は「どこまで任せるか」の一本の線に並ぶ
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          サービス名を個別に覚えると混乱しますが、実は <strong>1 本の軸の上に並んでいる</strong>だけです。
          <strong>上に行くほど自由で面倒、下に行くほど楽で制約が多い</strong>。
          これが分かると、新しいサービスが出てきても位置づけを判断できます。
        </p>

        <ResponsibilityDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>右に行くほど良い、ではありません。</strong>
          任せる範囲が増えるほど、<strong>「そのサービスの流儀」から外れられなくなります</strong>。
          常時起動のバッチを動かしたい、特殊なミドルウェアを入れたい、といった要件が出たとき、
          上側なら力技で解決できますが、下側では「できません」で終わります。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="compute" num={3}>
          実行環境の選択肢
        </SectionH2>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">選択肢</th>
                <th className="px-3 py-2 text-left font-semibold">向いている用途</th>
                <th className="px-3 py-2 text-left font-semibold">代わりが利かない点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">Vercel / Netlify</td>
                <td className="px-3 py-2 text-xs">Next.js の画面、LP、管理画面</td>
                <td className="px-3 py-2 text-xs">
                  <strong>git push だけで公開まで終わる</strong>。プレビュー環境が PR ごとに自動で立つ
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Lambda</td>
                <td className="px-3 py-2 text-xs">たまに動く処理、イベント駆動、Webhook</td>
                <td className="px-3 py-2 text-xs">
                  <strong>動いていない間は 0 円</strong>。他の AWS サービスと直結できる
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">ECS (Fargate)</td>
                <td className="px-3 py-2 text-xs">常時起動の API、社内システムの本体</td>
                <td className="px-3 py-2 text-xs">
                  <strong>コンテナをそのまま動かせて、サーバ管理が要らない</strong>。VPC 内に置ける
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">App Runner / Cloud Run</td>
                <td className="px-3 py-2 text-xs">コンテナ 1 つで済む Web API</td>
                <td className="px-3 py-2 text-xs">
                  ECS より<strong>設定がほぼ要らない</strong>。ALB もタスク定義も書かずに済む
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">EC2</td>
                <td className="px-3 py-2 text-xs">既存資産の移設、特殊なミドルウェア</td>
                <td className="px-3 py-2 text-xs">
                  <strong>OS ごと自由</strong>。他で動かないものが動く最後の逃げ道
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Kubernetes (EKS)</td>
                <td className="px-3 py-2 text-xs">多数のサービスを同じ流儀で運用</td>
                <td className="px-3 py-2 text-xs">
                  <strong>クラウドを跨いで同じ書き方</strong>ができる。専任者がいる前提
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          この表の「代わりが利かない点」は、
          <strong>それを選ばないと得られないもの</strong>だけを書いています。
          「スケールする」「安い」はどれも主張するので、選定理由になりません。
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            Kubernetes は「動かせるか」ではなく「運用できるか」で判断する
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            EKS は最も自由度が高い一方で、
            <strong>それ自体の面倒を見る仕事が新しく増えます</strong>。
            バージョン更新が定期的に来て、追従しないとサポートが切れます。
            <strong>専任で見る人がいないなら選ばない</strong>、が実務的な線引きです。
            サービスが 1 つ 2 つなら ECS や Cloud Run で十分足ります。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="compute-choose" num={4}>
          実行環境をどう選ぶか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          性能では絞れないので、次の順で決めると迷いません。
        </p>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 1 ── 閉じたネットワークの中に置く必要があるか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              社内 DB や専用線の先にしか無いシステムを触るなら、
              <strong>VPC の中で動かせるもの</strong>（ECS / EC2 / Lambda）に限られます。
              Vercel のような外部 PaaS は、原則インターネット側からしか繋げません。
              <strong>ここは要件で決まるので、最初に効きます</strong>。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 2 ── 画面 (Next.js) だけか、常時動くサーバが要るか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              画面が中心で、重い処理を裏で持たないなら <strong>Vercel</strong> が最短です。
              常駐して外部システムと繋ぎ続ける、長い処理を回す、といった要件があるなら
              <strong>ECS</strong> 側になります。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 3 ── 動いていない時間が長いか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              1 日数回のバッチや Webhook 受けなら <strong>Lambda</strong>。
              待機時間に課金されないのが効きます。
              逆に<strong>常に流量があるなら ECS の方が安く、かつ簡単</strong>になります。
              Lambda には実行時間の上限（15 分）もあります。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 border-l-4 border-l-indigo-400 bg-indigo-50/30 p-4 dark:border-zinc-800 dark:border-l-indigo-500/70 dark:bg-indigo-950/10">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              問 4 ── 誰が運用するか
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>ここが本当の決め手</strong>です。
              専任のインフラ担当がいないなら、<strong>迷わずマネージド寄り</strong>にする。
              自由度の高い構成は、作った本人が居なくなった瞬間に負債になります。
              「動かせる構成」より「<strong>自分たちが運用し続けられる構成</strong>」が正解です。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="db" num={5}>
          DB は「種類」と「置き場所」を分けて考える
        </SectionH2>
        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ① 種類をどう選ぶか
        </h3>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">種類</th>
                <th className="px-3 py-2 text-left font-semibold">使いどころ</th>
                <th className="px-3 py-2 text-left font-semibold">代わりが利かない点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">PostgreSQL</td>
                <td className="px-3 py-2 text-xs">業務システム全般。迷ったらこれ</td>
                <td className="px-3 py-2 text-xs">
                  <strong>JSON・全文検索・地理情報まで 1 つで賄える</strong>。制約チェックが厳格
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">MySQL</td>
                <td className="px-3 py-2 text-xs">既存システム、レンタルサーバ、WordPress</td>
                <td className="px-3 py-2 text-xs">
                  <strong>採用実績と情報量</strong>。周辺ツールと運用ノウハウが揃っている
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">SQLite</td>
                <td className="px-3 py-2 text-xs">ローカル開発、組み込み、小さな社内ツール</td>
                <td className="px-3 py-2 text-xs">
                  <strong>ファイル 1 つで完結</strong>。サーバを立てる必要がない
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">DynamoDB</td>
                <td className="px-3 py-2 text-xs">キー引きが中心で桁違いの量を捌く</td>
                <td className="px-3 py-2 text-xs">
                  <strong>量が増えても速度が落ちない</strong>。代わりに柔軟な検索は苦手
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Redis</td>
                <td className="px-3 py-2 text-xs">キャッシュ、セッション、順位表</td>
                <td className="px-3 py-2 text-xs">
                  <strong>桁違いに速い</strong>。ただし<strong>主データの置き場ではない</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>業務システムなら、まず PostgreSQL か MySQL の 2 択</strong>です。
          そして<strong>この 2 つの性能差が問題になる場面はほぼ来ません</strong>。
          既存システムやチームの慣れで決めて構いません。
          新規で特に縛りがないなら、機能の幅が広い PostgreSQL が無難です。
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            NoSQL を「新しいから」で選ばない
          </p>
          <p className="mt-2 text-sm text-amber-900/90 dark:text-amber-300">
            DynamoDB は<strong>アクセスの仕方を先に決めてから設計する</strong>DB です。
            後から「やっぱりこの条件でも検索したい」が来ると、作り直しになります。
            業務システムは<strong>検索条件が後から増えるのが常</strong>なので、
            リレーショナル DB の方が事故りません。
            <strong>迷っている時点で答えはリレーショナル</strong>です。
          </p>
        </div>

        <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ② 置き場所をどう選ぶか
        </h3>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">置き場所</th>
                <th className="px-3 py-2 text-left font-semibold">自分でやること</th>
                <th className="px-3 py-2 text-left font-semibold">代わりが利かない点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium">RDS</td>
                <td className="px-3 py-2 text-xs">パラメータ調整、更新時期の判断</td>
                <td className="px-3 py-2 text-xs">
                  <strong>VPC 内に置けて、バックアップも自動</strong>。AWS 構成の標準解
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Aurora</td>
                <td className="px-3 py-2 text-xs">RDS とほぼ同じ</td>
                <td className="px-3 py-2 text-xs">
                  <strong>読み取りの複製と障害復帰が速い</strong>。その分やや高い
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Supabase / Neon</td>
                <td className="px-3 py-2 text-xs">ほぼ無し（画面から作れる）</td>
                <td className="px-3 py-2 text-xs">
                  <strong>数分で使える</strong>。認証や API まで込みで揃う（Supabase）
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">EC2 に自前で構築</td>
                <td className="px-3 py-2 text-xs">
                  バックアップ、更新、監視、障害対応<strong>すべて</strong>
                </td>
                <td className="px-3 py-2 text-xs">
                  <strong>全部を自分で決められる</strong>。特殊要件の最後の手段
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-rose-200 bg-rose-50/60 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/20">
          <p className="text-sm font-medium text-rose-900 dark:text-rose-200">
            DB を EC2 に自前で立てるのは、基本的に避ける
          </p>
          <p className="mt-2 text-sm text-rose-900/90 dark:text-rose-300">
            料金だけ見ると安く見えますが、<strong>バックアップが取れていることの確認</strong>、
            <strong>復旧手順の訓練</strong>、セキュリティ更新の追従が全部自分の仕事になります。
            そして<strong>失敗したときに失うのはデータ</strong>で、サーバと違って作り直せません。
            マネージドとの差額は、この保険料だと考えるのが妥当です。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="patterns" num={6}>
          よくある組み合わせ
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          実際には、要件から自然に決まる<strong>定番の型</strong>があります。
          まずここに当てはめてみて、合わない理由が出てきたら初めて外す、という順序が安全です。
        </p>

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              個人開発・MVP ── Vercel + Supabase (or Neon)
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              インフラを触る時間を<strong>ゼロにして、作る方に全部使う</strong>構成。
              git push で公開まで終わります。伸びてきたら DB だけ先に移すこともできます。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              社内業務システム ── ECS (Fargate) + ALB + RDS
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>VPC の中で完結</strong>し、社内ネットワークや専用線とも繋げる。
              このサイトの{" "}
              <a
                href="/aws/vpc"
                className="underline underline-offset-2 hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                VPC
              </a>{" "}
              →{" "}
              <a
                href="/aws/alb"
                className="underline underline-offset-2 hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                ALB
              </a>{" "}
              →{" "}
              <a
                href="/aws/route53"
                className="underline underline-offset-2 hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                Route 53
              </a>{" "}
              でやったことが、そのままこの型です（EC2 を ECS に置き換えた形）。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              たまにしか動かない処理 ── Lambda + DynamoDB (or RDS)
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              日次バッチ、Webhook 受け、ファイル変換など。
              <strong>待機時間が長いほど有利</strong>になります。
              ただし RDS と組む場合は接続数の扱いに注意が要ります。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              画面は速く、業務ロジックは社内に ── Vercel + ECS (API) + RDS
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              画面だけ Vercel に置き、<strong>データを触る処理は VPC の中の API に寄せる</strong>形。
              両方の利点を取れますが、<strong>環境が 2 つに増える</strong>ので、
              管理する人が居ることが前提になります。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
            最後に ── 迷ったときの原則
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-indigo-900/90 dark:text-indigo-300">
            <li>
              ・<strong>小さく始められる方を選ぶ</strong>。足りなくなってから移す方が、
              最初から大きく作るより安く済む
            </li>
            <li>
              ・<strong>データの置き場所は慎重に、アプリの置き場所は気軽に</strong>。
              アプリは載せ替えられるが、DB の移設は止まる時間が発生する
            </li>
            <li>
              ・<strong>運用する人数で決める</strong>。人が少ないほどマネージドに寄せる。
              構成の格好良さは運用してくれない
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function ResponsibilityDiagram() {
  const rows = [
    { name: "EC2", self: 5, label: "OS もミドルウェアも自分で" },
    { name: "ECS (Fargate)", self: 3, label: "コンテナまで自分で" },
    { name: "App Runner / Cloud Run", self: 2, label: "コンテナを渡すだけ" },
    { name: "Lambda", self: 1.5, label: "関数を渡すだけ" },
    { name: "Vercel", self: 1, label: "コードを push するだけ" },
  ];
  const max = 6;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
        <span>↑ 自由・面倒</span>
        <span className="font-normal text-zinc-500 dark:text-zinc-500">
          （何でもできるが、自分の担当が多い）
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-44 shrink-0 text-right text-xs font-medium text-zinc-800 dark:text-zinc-200">
              {r.name}
            </span>
            <div className="flex h-7 flex-1 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800">
              <div
                className="flex items-center justify-center bg-indigo-500/85 text-[10px] font-semibold text-white"
                style={{ width: `${(r.self / max) * 100}%` }}
              >
                {r.self >= 3 ? "自分" : ""}
              </div>
              <div className="flex flex-1 items-center justify-center bg-emerald-500/20 text-[10px] font-medium text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300">
                サービス側
              </div>
            </div>
            <span className="hidden w-40 shrink-0 text-[10px] text-zinc-500 sm:block dark:text-zinc-500">
              {r.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
        <span>↓ 楽・制約あり</span>
        <span className="font-normal text-zinc-500 dark:text-zinc-500">
          （任せられるが、決められた枠から出られない）
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-600 dark:text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-indigo-500/85" />
          自分が面倒を見る範囲
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500/25" />
          サービス側が持つ範囲
        </span>
      </div>
      <p className="mt-2 text-[11px] text-zinc-600 dark:text-zinc-400">
        青には OS 更新・スケール設定・証明書・監視などが含まれる。
        下に行くほど仕事は減るが、<strong>そのサービスのやり方から外れられなくなる</strong>。
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
    { id: "changes", num: 1, title: "変わること・変わらないこと" },
    { id: "responsibility", num: 2, title: "どこまで任せるかの軸" },
    { id: "compute", num: 3, title: "実行環境の選択肢" },
    { id: "compute-choose", num: 4, title: "実行環境をどう選ぶか" },
    { id: "db", num: 5, title: "DB は種類と置き場所" },
    { id: "patterns", num: 6, title: "よくある組み合わせ" },
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
