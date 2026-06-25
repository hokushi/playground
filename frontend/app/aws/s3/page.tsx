import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsS3Page() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          S3 でファイルを置く
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          画像やバックアップを置く「オブジェクトストレージ」。バケットを作って、ファイルを 1 つアップロードするところまで
        </p>
      </header>

      {/* S3 とは */}
      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          S3 とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>S3 (Simple Storage Service)</strong> = AWS の{" "}
          <strong>「ファイル置き場」</strong>サービス。EC2 が「サーバの時間貸し」なら、S3 は{" "}
          <strong>「容量無制限のオンラインストレージの時間貸し」</strong>。画像・動画・バックアップ・ログなど、
          とにかくファイル (= オブジェクト) を放り込んでおく場所。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ポイントは <strong>OS もディスクも意識しなくていい</strong>こと。EC2 のように「サーバを起動して SSH で…」は不要で、
          <strong>HTTP で PUT すれば保存、GET すれば取得</strong>できる。各ファイルには URL が割り当たる。
        </p>
      </section>

      {/* 目指すこと */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          このページでやること
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          S3 の一番小さい体験 ──{" "}
          <strong>バケットを 1 個作って、ファイルを 1 つ放り込む</strong>まで。
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`[ あなたの AWS アカウント ]
   └─ 🪣 バケット (hokushi-memory-game)   ← Step 01 で作る箱
        └─ 📄 オブジェクト (photo-1.webp)      ← Step 02 で入れるファイル
             ・キー : games/12/photo-1.webp     (バケット内での名前 / パス)
             ・URL : https://バケット名.s3.ap-northeast-1.amazonaws.com/games/12/photo-1.webp`}</code>
        </pre>
        <ul className="ml-1 flex flex-col gap-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>・<strong>Step 01</strong>: バケットを作る (バケットタイプ・名前空間の話もここ)</li>
          <li>・<strong>Step 02</strong>: ファイルを 1 つアップロードして URL を確認する</li>
        </ul>
      </section>

      {/* まず 3 つの言葉 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          まず 3 つの言葉
        </h2>

        <div className="flex flex-col gap-3">
          <Term name="バケット (Bucket)">
            ファイルを入れる <strong>一番外側の入れ物</strong>。1 アカウントに複数作れる。
            名前は <strong>世界中で重複できない</strong> (全 AWS ユーザーで共有の名前空間)。
            作るときに <strong>リージョンを 1 つ</strong>選ぶ = そのバケットの実体はそのリージョンに置かれる。
          </Term>
          <Term name="オブジェクト (Object)">
            バケットに入れる <strong>ファイル 1 つ 1 つ</strong>。中身 (バイナリ) +
            メタデータ (Content-Type など) のセット。1 オブジェクト最大 5 TB。
          </Term>
          <Term name="キー (Key)">
            バケット内でオブジェクトを指す <strong>名前 (パスのようなもの)</strong>。例:{" "}
            <Code>games/12/photo-1.webp</Code>。
            S3 は実はフォルダが無い <strong>フラットな構造</strong>で、
            <Code>/</Code> 区切りは「そう見せているだけ」(プレフィックス)。
          </Term>
        </div>
      </section>

      {/* 特徴 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          特徴 (なぜみんな使うのか)
        </h2>
        <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              <strong>壊れにくい</strong>: 99.999999999% (イレブンナイン) の耐久性。
              裏で複数の場所に自動コピーされている
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              <strong>容量無制限・使った分だけ課金</strong>: 保存量 (GB/月) + リクエスト数 + 外向き転送量で課金。
              空なら基本タダ
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              <strong>デフォルトは非公開</strong>: 作っただけでは外部から見えない
              (<strong>パブリックアクセスのブロック</strong>が ON)。公開したいときだけ明示的に開ける
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>
              <strong>静的サイトのホスティング</strong>もできる (HTML/CSS/JS を置いてそのまま公開)
            </span>
          </li>
        </ul>
      </section>

      {/* 料金 */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          料金 (東京リージョン / S3 標準の目安)
        </h2>
        <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">課金される対象</th>
                <th className="px-3 py-2 text-left font-semibold">料金の目安</th>
                <th className="px-3 py-2 text-left font-semibold">備考</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2">保存量</td>
                <td className="px-3 py-2 font-mono">約 $0.025 / GB・月</td>
                <td className="px-3 py-2">1 GB 置いても月 ¥4 程度</td>
              </tr>
              <tr>
                <td className="px-3 py-2">アップロード (PUT 等)</td>
                <td className="px-3 py-2 font-mono">約 $0.0047 / 1,000 リクエスト</td>
                <td className="px-3 py-2">普通の使い方ならほぼ無視できる</td>
              </tr>
              <tr>
                <td className="px-3 py-2">ダウンロード (GET 等)</td>
                <td className="px-3 py-2 font-mono">約 $0.00037 / 1,000 リクエスト</td>
                <td className="px-3 py-2">同上</td>
              </tr>
              <tr>
                <td className="px-3 py-2">外向き転送量</td>
                <td className="px-3 py-2 font-mono">約 $0.114 / GB</td>
                <td className="px-3 py-2">インターネットへ送り出した分 (取り出しが多いと効く)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          → <strong>バケットを作るだけ・空のままなら $0</strong>。学習用に画像を数枚置く程度なら月数円。
          無料利用枠 (登録から 12 か月) があれば 5 GB の保存 + 一定リクエストまで無料
        </p>
      </section>

      {/* 手順 */}
      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          手順
        </h2>

        <Step n="01" title="バケットを作る">
          {/* 一言で言うと */}
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              💡 一言で言うと
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <strong>バケット = ファイルを入れる箱を 1 個作る</strong>だけの作業。
              迷うのは最初の <strong>「バケットタイプ」</strong>と <strong>「バケット名」</strong>の 2 つくらいで、
              あとはデフォルトのまま「作成」を押せば終わる。
            </p>
          </div>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            IAM ユーザーでログインした状態で、上の検索バーに <Code>S3</Code> と入れて S3 のコンソールへ →{" "}
            右上の <strong>「バケットを作成」</strong>。
          </p>

          {/* ① 基本の 3 項目 */}
          <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ① 基本の 3 項目を埋める
          </h4>
          <Li>
            <strong>バケットタイプ</strong>: <strong>「汎用」</strong>を選ぶ
            (もう一方の「ディレクトリ」は特殊用途 → 下の 💡 で説明)
          </Li>
          <Li>
            <strong>バケット名前空間</strong>: <strong>2 つから選べる</strong>。
            <strong>「リージョナル名前空間 (推奨)」</strong>を選んでおけばOK
            (名前の取り合いがなく、短い名前もそのまま取れる)。
            「グローバル名前空間」との違いは下の 💡 で説明
          </Li>
          <Li>
            <strong>バケット名</strong>: 小文字・数字・ハイフンのみ
            (例: <Code>hokushi-memory-game</Code>)。
            一意であればよい範囲は、上で選んだ名前空間で変わる (グローバル = 全世界 / リージョナル = 自分のアカウント内) → 下の 💡 で
          </Li>
          <Li>
            <strong>リージョン</strong>: 東京 (<Code>ap-northeast-1</Code>) を選ぶ
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.05.57.png"
            alt="バケット作成 - リージョン(東京)・バケットタイプ汎用・バケット名の入力"
            width={3014}
            height={1848}
          />

          {/* バケットタイプの説明 */}
          <details className="group rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-sm font-semibold text-amber-900 transition-colors hover:text-amber-700 dark:text-amber-200 dark:hover:text-amber-100">
              <svg className="h-3 w-3 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>💡 「バケットタイプ」って? — 汎用 と ディレクトリ</span>
            </summary>
            <div className="px-5 pb-4 pt-1">
            <p className="text-sm text-amber-900/80 dark:text-amber-300">
              作成画面の一番上で <strong>2 つから選ぶ</strong>。
              <strong>ほぼ全員「汎用」でいい</strong>。「ディレクトリ」は速度特化の特殊版で、普通のファイル置き場には使わない。
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {/* 汎用 */}
              <div className="overflow-hidden rounded-md border border-amber-200 bg-white dark:border-amber-900/50 dark:bg-zinc-950">
                <div className="border-b border-amber-200 bg-amber-50/60 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                  汎用バケット (General purpose) ← これを選ぶ
                </div>
                <ul className="flex flex-col gap-1 px-3 py-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <li>・今まで通りの「普通の S3」</li>
                  <li>・<strong>複数の AZ</strong> に自動コピー → 壊れにくい</li>
                  <li>・名前空間 (グローバル / リージョナル) を選べる ← 下の 💡</li>
                  <li>・画像 / バックアップ / 配信、ほぼ全部これ</li>
                </ul>
              </div>

              {/* ディレクトリ */}
              <div className="overflow-hidden rounded-md border border-amber-200 bg-white dark:border-amber-900/50 dark:bg-zinc-950">
                <div className="border-b border-amber-200 bg-amber-50/60 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                  ディレクトリバケット (Directory) ← 今回は使わない
                </div>
                <ul className="flex flex-col gap-1 px-3 py-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <li>・<strong>S3 Express One Zone</strong> 専用の高速版</li>
                  <li>・<strong>単一 AZ</strong> に置いて超低レイテンシ (その分 AZ 障害に弱い)</li>
                  <li>・名前が <Code>名前--azid--x-s3</Code> という決まった形式</li>
                  <li>・機械学習や高頻度アクセスなど用途が限定的</li>
                </ul>
              </div>
            </div>

            <p className="mt-3 text-sm text-amber-900/80 dark:text-amber-300">
              → 迷ったら <strong>「汎用」</strong>。このページも以降ぜんぶ汎用バケット前提。
            </p>
            </div>
          </details>

          {/* バケット名前空間の説明 */}
          <details className="group rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-sm font-semibold text-amber-900 transition-colors hover:text-amber-700 dark:text-amber-200 dark:hover:text-amber-100">
              <svg className="h-3 w-3 shrink-0 transition-transform group-open:rotate-90" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M4 3l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>💡 「バケット名前空間」って? — グローバル と リージョナル</span>
            </summary>
            <div className="px-5 pb-4 pt-1">
            <p className="text-sm text-amber-900/80 dark:text-amber-300">
              <strong>名前空間 (namespace) = バケット名が重複しないように管理されている空間</strong>のこと。
              汎用バケットでは <strong>この空間を 2 種類から選べる</strong>ようになっている。
              「どこまでの範囲で名前がぶつからないようにするか」が違う。
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {/* グローバル */}
              <div className="overflow-hidden rounded-md border border-amber-200 bg-white dark:border-amber-900/50 dark:bg-zinc-950">
                <div className="border-b border-amber-200 bg-amber-50/60 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                  グローバル名前空間 (従来のデフォルト)
                </div>
                <ul className="flex flex-col gap-1 px-3 py-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <li>・名前が <strong>全世界・全 AWS アカウントで一意</strong></li>
                  <li>・<strong>ドメインと同じ早い者勝ち</strong> ── 誰かが <Code>images</Code> を取ってたら使えない</li>
                  <li>・昔ながらの S3。古い手順書やツールはこれ前提のことが多い</li>
                </ul>
              </div>

              {/* リージョナル */}
              <div className="overflow-hidden rounded-md border border-emerald-300 bg-white dark:border-emerald-800/60 dark:bg-zinc-950">
                <div className="border-b border-emerald-200 bg-emerald-50/60 px-3 py-2 text-xs font-semibold text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200">
                  リージョナル名前空間 (推奨) ← これでOK
                </div>
                <ul className="flex flex-col gap-1 px-3 py-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <li>・名前が一意ならいいのは <strong>自分のアカウント + リージョン内だけ</strong></li>
                  <li>・<strong>他アカウントとの取り合いが無い</strong> → 短い名前もそのまま取れる</li>
                  <li>・そのバケットは <strong>自分のアカウント専用</strong>。他人が同じ名前で作れない</li>
                  <li>・実際の名前には <strong>アカウントID + リージョンが自動で付く</strong> (作成後の 💡 で実例)</li>
                  <li>・AWS が <strong>「推奨」</strong>と付けている新しい方式</li>
                </ul>
              </div>
            </div>

            <p className="mt-3 text-sm text-amber-900/80 dark:text-amber-300">
              → <strong>迷ったら「リージョナル名前空間 (推奨)」</strong>。
              <Code>hokushi-memory-game</Code> のような短い名前でも、取り合いを気にせずそのまま取れる。
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              ※ もしグローバルを選ぶ場合は <strong>「会社名 / プロダクト名 + 用途 + 環境」</strong>のように
              プレフィックスを付けて衝突を避ける (例: <Code>albatrus-medcloud-upload-prod</Code>)。
              逆にリージョナルなら、その工夫はあまり要らない。
            </p>
            </div>
          </details>

          {/* ② パブリックアクセス */}
          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ② パブリックアクセスはブロックのまま
          </h4>
          <Li>
            <strong>オブジェクト所有者</strong>: <strong>「ACL 無効 (推奨)」</strong>のまま
            (アクセス制御は古い ACL ではなく IAM ポリシーで一本化する、が今の流儀)
          </Li>
          <Li>
            <strong>「パブリックアクセスをすべてブロック」は ON のまま</strong>でよい。
            アプリからは IAM 権限 or 署名付き URL で読み書きするので、公開する必要はない
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.32.28.png"
            alt="バケット作成 - オブジェクト所有者(ACL 無効・推奨)とパブリックアクセスをすべてブロック"
            width={3014}
            height={1848}
          />

          <Details summary="なぜ最初から全公開にしないの?">
            <p>
              S3 の事故で一番多いのが <strong>「バケットを全公開にして、置いてあった個人情報や鍵が丸見え」</strong>。
              だから AWS はデフォルトで <strong>全ブロック (非公開)</strong> にしている。
            </p>
            <p>
              アプリから使うときは、公開する代わりに{" "}
              <strong>① アプリ用 IAM 権限</strong>か <strong>② 署名付き URL</strong> (時間制限つきの一時 URL) で
              アクセスする。だから <strong>ブロックは ON のままが正解</strong>。
            </p>
          </Details>

          {/* ③ 残りはデフォルト → 作成 */}
          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ③ 残りはデフォルトのまま下までスクロール → 「バケットを作成」
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            この下にもいくつか設定が並ぶが、<strong>学習用なら全部デフォルトのままでいい</strong>。
            一応それぞれが何かだけ:
          </p>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">項目</th>
                  <th className="px-3 py-2 text-left font-semibold">デフォルト</th>
                  <th className="px-3 py-2 text-left font-semibold">何のための設定?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">バケットのバージョニング</td>
                  <td className="px-3 py-2">無効</td>
                  <td className="px-3 py-2">同じキーで上書きしたとき、古い版も世代として残すか。今回は無効でOK</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">タグ</td>
                  <td className="px-3 py-2">なし</td>
                  <td className="px-3 py-2">コスト集計や管理用のラベル。今回は不要</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">デフォルトの暗号化</td>
                  <td className="px-3 py-2 font-mono">SSE-S3</td>
                  <td className="px-3 py-2">保存時に S3 が自動で暗号化 (鍵も S3 管理)。無料・デフォルトで有効</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">バケットキー</td>
                  <td className="px-3 py-2">有効</td>
                  <td className="px-3 py-2">暗号化まわりのリクエストコストを下げる仕組み。有効のままでOK</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.34.52.png"
            alt="バケット作成 - バージョニング(無効)・タグ(なし)・デフォルト暗号化"
            width={3014}
            height={1848}
          />

          <Li>
            一番下まで来たら、右下のオレンジ <strong>「バケットを作成」</strong>をクリック
          </Li>
          <Li>
            青いバナーに <strong>「バケットを作成したら、ファイルとフォルダをアップロードできます」</strong>
            と出ていれば、押すだけで完成
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.35.00.png"
            alt="バケット作成 - 暗号化 SSE-S3・バケットキー有効・右下「バケットを作成」ボタン"
            width={3014}
            height={1848}
          />

          <Li>
            緑のバナー <strong>「バケットが正常に作成されました」</strong>が出て、
            空のバケット (オブジェクト 0 件) の画面に切り替われば完成
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.40.06.png"
            alt="バケット作成完了 - hokushi-memory-game-884375106358-ap-northeast-1-an が作成され、中身は空"
            width={3014}
            height={1848}
          />

          {/* リージョナル名前空間でバケット名が伸びる話 */}
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              💡 「あれ? バケット名が伸びてる」 — リージョナル名前空間のサフィックス
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              入力したのは <Code>hokushi-memory-game</Code> なのに、できあがった名前は
            </p>
            <pre className="mt-2 overflow-x-auto rounded-md bg-white px-4 py-3 text-[12px] leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
              <code>{`hokushi-memory-game-884375106358-ap-northeast-1-an
└──── 入力した名前 ────┘ └─ アカウントID ─┘ └─ リージョン ─┘`}</code>
            </pre>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              これは <strong>リージョナル名前空間を選んだから</strong>。
              S3 が裏で <strong>「アカウント ID + リージョン」のサフィックスを自動で足して</strong>、
              世界のどこからでも一意に指せる正式名にしてくれている。
              <strong>自分で打つ必要はない</strong> (勝手に付く)。
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              → だから <strong>取り合いを気にせず短い名前を入力できる</strong>のがリージョナルの利点。
              以降この正式名 (サフィックス付き) が、URL や IAM ポリシーで使う本当のバケット名になる。
              <br />
              ちなみに <strong>グローバル名前空間</strong>を選んでいたら、入力した名前がそのまま正式名 (サフィックスなし) になる。
            </p>
          </div>

          {/* 完了サマリー */}
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ✅ Step 01 完了
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-emerald-900/80 dark:text-emerald-300">
              <li>汎用バケットを東京リージョンに作成 (正式名は <Code>hokushi-memory-game-884375106358-ap-northeast-1-an</Code>)</li>
              <li>名前空間はリージョナル (推奨) = アカウント専用・名前の取り合いなし・サフィックス自動付与</li>
              <li>パブリックアクセスは全ブロック = 非公開 (安全側)</li>
              <li>まだ中身は空 → 課金もほぼ $0</li>
            </ul>
            <p className="mt-3 text-sm text-emerald-900/80 dark:text-emerald-300">
              次は <strong>この箱にファイルを 1 つ入れて</strong>、URL がどうなるか見る (Step 02)
            </p>
          </div>
        </Step>

        <Step n="02" title="ファイルを 1 つアップロードしてみる">
          {/* 一言で言うと */}
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              💡 一言で言うと
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              作った箱に <strong>画像を 1 枚ドラッグして「アップロード」</strong>するだけ。
              そのあと <strong>オブジェクト URL</strong> を開いて、
              <strong>わざと <Code>AccessDenied</Code> になる</strong>のを確認するのがこの Step の山場。
            </p>
          </div>

          <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ① アップロードする
          </h4>
          <Li>
            作ったバケットを開いて、オブジェクトタブ右上の <strong>「アップロード」</strong>をクリック →
            アップロード画面へ。<strong>送信先</strong>が今のバケット名になっているのを確認
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.42.04.png"
            alt="アップロード画面 - 送信先が hokushi-memory-game-... のバケット、まだファイルなし"
            width={3014}
            height={1848}
          />

          <Li>
            <strong>「ファイルを追加」</strong>で画像を 1 枚選ぶ (またはドラッグ&ドロップ) →
            ファイル名・サイズ・タイプが一覧に並ぶ
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.42.18.png"
            alt="画像を1枚選んだ状態 - ダウンロード(1).jpeg / image/jpeg / 5.1 KB、右下にアップロードボタン"
            width={3014}
            height={1848}
          />

          <Li>
            右下のオレンジ <strong>「アップロード」</strong>をクリック → 緑バナー
            <strong>「アップロードに成功しました」</strong>＋ ステータスが <strong>「成功しました」</strong>になれば完了
          </Li>

          <Screenshot
            src="/aws/s3/スクリーンショット 2026-06-25 15.42.28.png"
            alt="アップロード成功 - 成功1ファイル、ダウンロード(1).jpeg のステータスが成功しました"
            width={3014}
            height={1848}
          />

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ② オブジェクト URL を開いてみる (わざと失敗する)
          </h4>
          <Li>
            アップした行をクリック → 詳細に <strong>「オブジェクト URL」</strong>が表示される
            (<Code>https://バケット名.s3.ap-northeast-1.amazonaws.com/ファイル名</Code>)
          </Li>
          <Li>
            その URL をブラウザで開くと <Code>AccessDenied</Code> の XML が出る ←{" "}
            <strong>これが正常</strong>
          </Li>

          {/* TODO: AccessDenied のスクショ */}

          <Note>
            Step 01 でパブリックアクセスを全ブロックにしたので、URL を知っていても外部からは開けない。
            「URL はあるのに見えない」= 非公開バケットの正しい挙動
          </Note>

          {/* 完了サマリー */}
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              🎉 S3 の最小体験 完了
            </p>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              <strong>バケットを作る → ファイルを入れる → URL を確認する</strong>という
              S3 の基本の一周を体験できた。各ファイルに URL が振られること・デフォルトは非公開なこと、の 2 つが分かれば十分。
            </p>
          </div>
        </Step>
      </section>

      {/* このあとやること */}
      <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50/40 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          このあとやること (アプリと繋ぐなら)
        </h2>
        <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          ここまでは「手で 1 個置く」体験。実際のアプリから使うときは、非公開のまま安全に読み書きする仕組みを足す:
        </p>
        <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>アプリ用の <strong>IAM 権限</strong> (このバケットだけ読み書きできるポリシー) を用意する</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>バックエンドから <strong>署名付き URL</strong> を発行して、フロントから直接アップロード</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span><strong>CORS 設定</strong> (フロントのオリジンから PUT/GET を許可)</span>
          </li>
        </ul>
      </section>
    </main>
  );
}

// 用語カード（このページ専用の小コンポーネント）
function Term({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {name}
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline gap-4 border-b-2 border-indigo-200 pb-2 dark:border-indigo-900/60">
        <span className="font-mono text-2xl font-bold text-indigo-500 dark:text-indigo-400">
          {n}
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-3 pl-1">{children}</div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
      <span>{children}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="ml-3.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
      ※ {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function Details({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-md border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50">
        <svg
          className="h-3 w-3 shrink-0 transition-transform group-open:rotate-90"
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
        <span>{summary}</span>
      </summary>
      <div className="flex flex-col gap-2 px-5 pb-3 pt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </details>
  );
}
