export default function SsoPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          SSO (シングルサインオン)
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「1 回ログインすれば、あとは全部のシステムに入れる」仕組み。
          仕組みそのものより、<strong>なぜブラウザの種類によって動いたり動かなかったりするのか</strong>までを追いかけます。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          そもそも何が困っていたのか
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          病院で働く看護師さんの朝を想像してみます。
        </p>

        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>・電子カルテを開く → <strong>ID とパスワード入力</strong></li>
          <li>・検査結果システムを開く → <strong>ID とパスワード入力</strong></li>
          <li>・勤怠システムを開く → <strong>ID とパスワード入力</strong></li>
          <li>・院内メールを開く → <strong>ID とパスワード入力</strong></li>
        </ul>

        <p className="text-zinc-700 dark:text-zinc-300">
          システムが 10 個あれば 10 回入力です。しかも全部パスワードが違う。
          その結果、現場では <strong>付箋にパスワードを書いてモニターに貼る</strong>、
          <strong>全部同じパスワードにする</strong> といったことが起きます。
          これがセキュリティ上まずい、というのが SSO の出発点です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          SSO は「遊園地のフリーパス」
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          昔の遊園地は、ジェットコースターの前でチケットを買って乗り、
          観覧車の前でまたチケットを買って乗り…… という方式でした。これが「システムごとにログイン」です。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          今の遊園地は <strong>入口で 1 回だけフリーパスを買い、手首にリストバンドを巻いてもらう</strong>。
          あとはどのアトラクションでも <strong>リストバンドを見せるだけ</strong>で乗れます。これが SSO です。
        </p>

        <SsoOverviewDiagram />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          画面では何が起きているのか
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          SSO が入った環境で電子カルテを開くと、<strong>見慣れない画面に一瞬飛ばされて戻ってくる</strong>ことがあります。
          あれが「入口で受付している」瞬間です。
        </p>

        <SsoRedirectDiagram />

        <ol className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>1 回目 (朝イチ)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              システムが「あなたが誰か分かりません」と言って受付に飛ばす →
              <strong>ログイン画面が出る</strong> → ID とパスワードを入力 → 元のシステムに戻されて開く。
            </p>
          </li>
          <li>
            <strong>2 回目以降 (別のシステムを開く)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              同じように受付に飛ばされるが、受付が「さっき確認したよね、この人」と判断するので
              <strong>ログイン画面が出ない</strong>。すぐ元のシステムに戻される。
            </p>
          </li>
        </ol>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          利用者から見ると <strong>何も入力せずにパッと開いた</strong>ように見えます。
          裏では受付に行って戻ってきているのですが、一瞬なので気づきません。
          これが「シングル (1 回の) サインオン」と呼ばれる理由です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          なぜ「印」で本人だと分かるのか
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          「リストバンドなんて偽造できるのでは?」と思うところですが、
          トークンには <strong>受付の電子署名</strong>が入っています。実印を押した書類のようなものです。
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          各システムは「この署名は本物の受付が押したものか?」を<strong>数学的に検算できる</strong>ので、
          偽造すると必ずバレます。だから各システムは <strong>パスワードを自分で持たなくてよくなります</strong>。
          受付の署名を確認するだけで済むからです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          本題 — もらった印を「どこにしまうか」で 2 パターンある
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここが、ブラウザの種類が効いてくる理由そのものです。
          同じ SSO でも、<strong>印の保管場所</strong>が 2 通りあります。
        </p>

        <TokenStorageDiagram />

        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-zinc-100">パターン A: ブラウザが自分で持つ</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              もらった印を <strong>ブラウザが自分のポケット (Cookie) にしまう</strong>方式。
              ブラウザだけで完結しているので、<strong>どのブラウザでも動きます</strong>。
              技術的には SAML / OIDC と呼ばれるタイプで、クラウドサービスで主流。
            </p>
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            <strong className="text-amber-900 dark:text-amber-100">パターン B: Windows が持っていて、ブラウザが借りに行く</strong>
            <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
              <strong>Windows にログインした時点で、実はもう印をもらっている</strong>方式。
              朝パソコンに Windows パスワードを入れた、あの時点で受付は済んでいます。
              ブラウザはサイトを開くたびに <strong>Windows の金庫へ印を借りに行きます</strong>。
              利用者から見ると <strong>ログイン画面すら出ずにいきなり開く</strong>ので、一番ラク。
              Microsoft 系を使っている組織ではこれが主流です。
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          問題は、<strong>Windows の金庫は誰にでも印を貸すわけではない</strong>ことです。
          「お前は誰だ、ちゃんと登録されているのか」と確認します。ここで差が出ます。
        </p>
      </section>
    </main>
  );
}

function SsoOverviewDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 250" className="mx-auto w-full max-w-2xl">
        <rect
          x="15"
          y="98"
          width="90"
          height="54"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="60" y="122" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          利用者
        </text>
        <text x="60" y="138" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          (看護師さん)
        </text>

        <line x1="105" y1="112" x2="185" y2="112" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#sso-arrow)" />
        <text x="145" y="104" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          ① ログイン
        </text>

        <line x1="185" y1="140" x2="105" y2="140" className="stroke-sky-500" strokeWidth="1.5" markerEnd="url(#sso-arrow-blue)" />
        <text x="145" y="158" textAnchor="middle" className="fill-sky-700 text-[10px] font-medium dark:fill-sky-400">
          ② 印をもらう
        </text>

        <rect
          x="185"
          y="98"
          width="130"
          height="54"
          rx="6"
          className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/40 dark:stroke-sky-700"
          strokeWidth="1.5"
        />
        <text x="250" y="120" textAnchor="middle" className="fill-sky-800 text-xs font-medium dark:fill-sky-200">
          受付 (認証基盤)
        </text>
        <text x="250" y="136" textAnchor="middle" className="fill-sky-700 text-[10px] dark:fill-sky-400">
          Entra ID など
        </text>

        <line x1="315" y1="120" x2="440" y2="58" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" markerEnd="url(#sso-arrow)" />
        <line x1="315" y1="125" x2="440" y2="125" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" markerEnd="url(#sso-arrow)" />
        <line x1="315" y1="130" x2="440" y2="192" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" markerEnd="url(#sso-arrow)" />
        <text x="378" y="152" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          ③ 印を見せるだけ
        </text>

        <rect x="440" y="34" width="140" height="46" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="510" y="62" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          電子カルテ
        </text>

        <rect x="440" y="102" width="140" height="46" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="510" y="130" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          検査システム
        </text>

        <rect x="440" y="170" width="140" height="46" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="510" y="198" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          勤怠システム
        </text>

        <defs>
          <marker id="sso-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400 dark:fill-zinc-600" />
          </marker>
          <marker id="sso-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-sky-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function SsoRedirectDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 250" className="mx-auto w-full max-w-2xl">
        <text x="15" y="22" className="fill-zinc-600 text-[11px] font-semibold dark:fill-zinc-400">
          1 回目 (朝イチ)
        </text>

        <rect x="15" y="36" width="130" height="46" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="80" y="64" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          電子カルテを開く
        </text>

        <line x1="145" y1="59" x2="215" y2="59" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#redirect-arrow)" />

        <rect x="215" y="36" width="150" height="46" rx="6" className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/40 dark:stroke-sky-700" strokeWidth="1.5" />
        <text x="290" y="58" textAnchor="middle" className="fill-sky-800 text-xs font-medium dark:fill-sky-200">
          受付
        </text>
        <text x="290" y="73" textAnchor="middle" className="fill-rose-600 text-[10px] font-medium dark:fill-rose-400">
          ログイン画面が出る
        </text>

        <line x1="365" y1="59" x2="435" y2="59" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#redirect-arrow)" />

        <rect x="435" y="36" width="150" height="46" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="510" y="64" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          開く
        </text>

        <line x1="15" y1="115" x2="585" y2="115" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" strokeDasharray="4 4" />

        <text x="15" y="152" className="fill-zinc-600 text-[11px] font-semibold dark:fill-zinc-400">
          2 回目以降 (別のシステム)
        </text>

        <rect x="15" y="166" width="130" height="46" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="80" y="194" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          検査システムを開く
        </text>

        <line x1="145" y1="189" x2="215" y2="189" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#redirect-arrow)" />

        <rect x="215" y="166" width="150" height="46" rx="6" className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/40 dark:stroke-sky-700" strokeWidth="1.5" />
        <text x="290" y="188" textAnchor="middle" className="fill-sky-800 text-xs font-medium dark:fill-sky-200">
          受付
        </text>
        <text x="290" y="203" textAnchor="middle" className="fill-emerald-700 text-[10px] font-medium dark:fill-emerald-400">
          画面は出ない (確認済み)
        </text>

        <line x1="365" y1="189" x2="435" y2="189" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#redirect-arrow)" />

        <rect x="435" y="166" width="150" height="46" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="510" y="194" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          すぐ開く
        </text>

        <defs>
          <marker id="redirect-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400 dark:fill-zinc-600" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function TokenStorageDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 620 250" className="mx-auto w-full max-w-2xl">
        <text x="20" y="22" className="fill-zinc-600 text-[11px] font-semibold dark:fill-zinc-400">
          パターン A: ブラウザが自分で持つ
        </text>

        <rect x="20" y="40" width="150" height="44" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="95" y="60" textAnchor="middle" className="fill-zinc-500 text-xs dark:fill-zinc-500">
          Windows
        </text>
        <text x="95" y="75" textAnchor="middle" className="fill-zinc-400 text-[10px] dark:fill-zinc-600">
          (関与しない)
        </text>

        <rect x="20" y="130" width="150" height="70" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="95" y="155" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          ブラウザ
        </text>
        <rect x="52" y="165" width="86" height="24" rx="4" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/50 dark:stroke-amber-600" strokeWidth="1.2" />
        <text x="95" y="181" textAnchor="middle" className="fill-amber-800 text-[10px] font-medium dark:fill-amber-300">
          印はここ
        </text>

        <text x="95" y="225" textAnchor="middle" className="fill-emerald-700 text-[10px] font-medium dark:fill-emerald-400">
          どのブラウザでも動く
        </text>

        <line x1="300" y1="15" x2="300" y2="235" className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="1" strokeDasharray="4 4" />

        <text x="360" y="22" className="fill-zinc-600 text-[11px] font-semibold dark:fill-zinc-400">
          パターン B: Windows が持っている
        </text>

        <rect x="410" y="40" width="150" height="70" rx="6" className="fill-sky-50 stroke-sky-400 dark:fill-sky-950/40 dark:stroke-sky-700" strokeWidth="1.5" />
        <text x="485" y="62" textAnchor="middle" className="fill-sky-800 text-xs font-medium dark:fill-sky-200">
          Windows (金庫)
        </text>
        <rect x="442" y="72" width="86" height="24" rx="4" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/50 dark:stroke-amber-600" strokeWidth="1.2" />
        <text x="485" y="88" textAnchor="middle" className="fill-amber-800 text-[10px] font-medium dark:fill-amber-300">
          印はここ
        </text>

        <line x1="485" y1="130" x2="485" y2="115" className="stroke-rose-500" strokeWidth="1.8" markerEnd="url(#storage-arrow)" />
        <text x="500" y="126" className="fill-rose-600 text-[10px] font-medium dark:fill-rose-400">
          借りに行く
        </text>

        <rect x="410" y="130" width="150" height="70" rx="6" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="485" y="160" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          ブラウザ
        </text>
        <text x="485" y="178" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          印は持っていない
        </text>

        <text x="485" y="225" textAnchor="middle" className="fill-rose-600 text-[10px] font-medium dark:fill-rose-400">
          登録済みのブラウザだけ
        </text>

        <defs>
          <marker id="storage-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
