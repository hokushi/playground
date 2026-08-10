import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsCognitoPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Cognito でログインを任せる
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          パスワード管理を AWS に丸投げする「ユーザー管理」サービス。ユーザープールを作って、確認コード付きの
          アカウント作成 → ログインまで
        </p>
      </header>

      {/* Cognito とは */}
      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          Cognito とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>Cognito (コグニート)</strong> = AWS の{" "}
          <strong>「ユーザーとパスワードの置き場」</strong>サービス。S3 が「ファイル置き場」なら、Cognito は{" "}
          <strong>「アカウント置き場」</strong>。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          自分でログイン機能を作ると、パスワードのハッシュ化・確認コードのメール送信・
          パスワード再設定・2 段階認証…と、<strong>本題と関係ないのに絶対に間違えられない処理</strong>が延々と出てくる。
          これを <strong>全部 AWS 側に持たせる</strong>のが Cognito。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          大事な考え方は <strong>「パスワードは Cognito にしか置かない」</strong>こと。
          自分の DB にはパスワードを一切保存しない。ここがブレると後で必ず事故る。
        </p>
      </section>

      <Screenshot
        src="/aws/cognito/スクリーンショット 2026-08-10 17.11.15.png"
        alt="Cognito のトップページ - 東京リージョン。「アプリへのログインとサインアップのエクスペリエンスを追加」と「AWS のサービスへのアプリのアクセス権を付与する」の 2 択が並ぶ"
        width={3018}
        height={1778}
        caption="コンソールで Cognito を開いたところ。入り口が 2 つあり、今回は左の「アプリへのログインとサインアップのエクスペリエンスを追加」の方を使う"
      />

      {/* Step 01 */}
      <Step n="01" title="アプリケーションのリソースを設定する">
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          「無料で開始する」を押すとこの画面に来る。
          <strong>ユーザープールとアプリクライアントを一度に作ってくれる</strong>ウィザードで、
          入力するのは実質 4 つだけ。
        </p>

        <Screenshot
          src="/aws/cognito/スクリーンショット 2026-08-10 17.15.31.png"
          alt="アプリケーションのリソースを設定する画面。アプリケーションタイプ・アプリケーション名・サインイン識別子のオプション・自己登録を入力する"
          width={3018}
          height={1778}
          caption="上半分が「アプリケーションを定義」、下半分が「オプションを設定」"
        />

        {/* 後から変えられない警告 */}
        <div className="flex flex-col gap-2 rounded-lg border border-rose-200 bg-rose-50/40 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/20">
          <h4 className="text-base font-semibold text-rose-900 dark:text-rose-200">
            先に注意: 下半分は後から変えられない
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            画面にも小さく書いてある通り、<strong>「オプションを設定」の内容を変更するには
            ユーザープールを作り直すしかない</strong>。特に次の
            <strong>サインイン識別子</strong>は選び間違えると作り直しになるので、ここだけは慎重に。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Field
            name="アプリケーションタイプ"
            choice="シングルページアプリケーション (SPA)"
          >
            <p>
              名前で選ばず、<strong>「クライアントシークレットが要るかどうか」で選ぶ</strong>のがコツ。
              <strong>従来のウェブアプリケーション</strong>を選ぶとシークレット付きのクライアントが作られ、
              <strong>SPA</strong> を選ぶとシークレットなしになる。
            </p>
            <p>
              シークレットがあると、API を叩くたびに{" "}
              <strong>署名 (SECRET_HASH) を計算して添える</strong>必要が出てくる。
              数行で書けるものではあるが、最初の一歩では省きたい。まずは SPA で通してから、
              必要になったらシークレット付きのクライアントを<strong>後から追加</strong>すればよい
              (アプリクライアントはいくつでも足せる)。
            </p>
          </Field>

          <Field name="サインイン識別子のオプション" choice="メールアドレス にチェック">
            <p>
              <strong>何を使ってログインするか</strong>。今回はメールアドレスなので
              <strong>メールアドレスだけ</strong>にチェックを入れる。
            </p>
          </Field>

          <Field name="自己登録" choice="有効のまま">
            <p>
              <strong>ユーザーが自分でアカウントを作れるようにするか</strong>。
              今回はアカウント作成画面から誰でも登録する形なので<strong>有効</strong>。
            </p>
            <p>
              無効にすると<strong>管理者が手で作ったユーザーしかログインできない</strong>社内ツールのような形になる。
            </p>
          </Field>
        </div>

        <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          そのまま下にスクロールすると、残り 2 つの入力と作成ボタンが出てくる。
        </p>

        <Screenshot
          src="/aws/cognito/スクリーンショット 2026-08-10 17.20.14.png"
          alt="同じ画面の下半分。自己登録を有効化にチェック、サインアップのための必須属性は未選択、リターン URL は空、右下に「ユーザーディレクトリを作成する」ボタン"
          width={3018}
          height={1778}
          caption="「サインイン識別子のオプションと必須属性は、アプリケーションの作成後に変更することはできません」の警告が出ている"
        />

        <div className="flex flex-col gap-3">
          <Field name="サインアップのための必須属性" choice="何も選ばない（空のまま）">
            <p>
              <strong>アカウント作成時に、Cognito 側で入力を必須にする項目</strong>。
              ここで <Code>name</Code> などを足すと、Cognito にもその値が保存される。
            </p>
            <p>
              今回は <strong>空のままでよい</strong>。表示名は自分の DB に持たせる方針なので、
              <strong>Cognito と DB の両方に同じものを持つ理由がない</strong>。
              メールアドレスはサインイン識別子に選んだ時点で必須になっているので、ここで指定する必要もない。
            </p>
          </Field>

          <Field name="リターン URL" choice="空のまま（オプション）">
            <p>
              これは <strong>Cognito が用意している既製のログイン画面 (マネージドログイン)</strong> を使う場合の設定。
              ログイン成功後にどこへ戻すか、という URL。
            </p>
            <p>
              今回は<strong>自分でログイン画面を作り、バックエンドから API を叩く</strong>ので、
              既製の画面は使わない。よって<strong>空でよい</strong>。
              後で使いたくなったら足せる。
            </p>
          </Field>
        </div>

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          最後に右下の <strong>「ユーザーディレクトリを作成する」</strong>を押すと、
          <strong>ユーザープールとアプリクライアントが両方できる</strong>。
        </p>

        <Note>
          ボタンの名前が「ユーザーディレクトリ」になっているが、作られるのは
          <strong>ユーザープール</strong>のこと。呼び方が画面によって揺れていて紛らわしい。
        </Note>
      </Step>

      {/* Step 02 */}
      <Step n="02" title="ユーザープールの概要を見る">
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          作成が終わったら <strong>Cognito → ユーザープール → 作ったプール</strong>を開く。
          ここが<strong>これから何度も戻ってくる拠点</strong>になる。
        </p>

        <Screenshot
          src="/aws/cognito/スクリーンショット 2026-08-10 17.28.10.png"
          alt="ユーザープールの概要画面。ユーザープール ID、ARN、推定ユーザー数、OpenID Connect 設定 URL、トークン署名キー URL、機能プランが並び、左に設定メニューが出ている"
          width={3018}
          height={1778}
          caption="右上に「名前変更」ボタンがある。自動生成された名前が気になるならここで変えられる"
        />

        <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          この画面で拾う値
        </h4>
        <div className="flex flex-col gap-3">
          <Field name="ユーザープール ID" choice="ap-northeast-1_XXXXXXXXX">
            <p>
              <strong>コードから参照するのはこれ</strong>。プール名ではない。
              左のコピーアイコンで control + C せずに取れる。
              後で <Code>.env</Code> に入れる。
            </p>
          </Field>

          <Field name="トークン署名キー URL (jwks.json)" choice="今はコピーだけしておく">
            <p>
              ログイン後に Cognito が発行するトークンが<strong>本物かどうかを確かめるための公開鍵</strong>が置いてある URL。
            </p>
            <p>
              「Cognito のトークンをバックエンドで検証する」方式を選ぶ場合に使う。
              <strong>今すぐは使わないが、後で必ず出てくる</strong>ので場所だけ覚えておく。
            </p>
          </Field>

          <Field name="推定ユーザー数" choice="0 になっているはず">
            <p>
              まだ誰も登録していないので <Code>0</Code>。
              <strong>アカウント作成が成功したかどうかは、ここが 1 に増えるかで確かめられる</strong>。
              動作確認のときに便利。
            </p>
          </Field>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50/60 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            クライアント ID はこの画面には無い
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            コードから使う ID は <strong>2 つあって、置いてある場所が違う</strong>。
            クライアント ID は <strong>アプリケーション → アプリケーションクライアント</strong>
            の画面にある (Step 03 の 1 枚目)。
          </p>
          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <code>{`COGNITO_USER_POOL_ID=ap-northeast-1_XXXXXXXXX   ← この画面（概要）
COGNITO_CLIENT_ID=1l4l8s2o48ml1hqcesp6d9j06a   ← アプリケーションクライアントの画面
AWS_REGION=ap-northeast-1`}</code>
          </pre>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            この 2 つを <Code>.env</Code> に入れれば、バックエンドから Cognito を叩ける。
            <strong>どちらも秘密の値ではない</strong>
            (これだけ知られてもログインはできない) が、環境ごとに変わるのでコードに直書きはしない。
          </p>
        </div>
      </Step>

      {/* Step 03 */}
      <Step n="03" title="認証フローを 1 つ足す">
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ウィザードで作ったままだと、<strong>メールとパスワードでログインする方式が許可されていない</strong>。
          これに気づかずに実装を進めると、最後にログインが通らなくて詰まる。
        </p>

        <div className="flex flex-col gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
          <h4 className="text-base font-semibold text-amber-900 dark:text-amber-200">
            許可し忘れると出るエラー
          </h4>
          <pre className="overflow-x-auto rounded-md border border-amber-200 bg-white px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-amber-900/50 dark:bg-zinc-950 dark:text-zinc-300">
            <code>{`{
  "statusCode": 500,
  "message": "USER_PASSWORD_AUTH flow not enabled for this client"
}`}</code>
          </pre>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>パスワードは合っているのに通らない</strong>ので、
            コード側を疑って時間を溶かしやすい。
            <strong>これは設定の問題で、コードの変更は要らない。</strong>
          </p>
        </div>

        <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          そもそも何を許可しているのか
        </h4>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          Cognito はログインのやり方が何通りかあり、
          <strong>アプリクライアントごとに、どれを使ってよいかを明示する</strong>仕組みになっている。
          許可していない方式で来た要求は、パスワードが正しくても門前払いされる。
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`今回の作り

  ブラウザ ──(パスワード)──> 自分のバックエンド ──(パスワード)──> Cognito
                                                    ↑
                                       ここで使うのが USER_PASSWORD_AUTH`}</code>
        </pre>
        <Note>
          <Code>USER_SRP_AUTH</Code> はパスワードを一切ネットワークに流さない、より安全な方式。
          ただし<strong>ブラウザ側で暗号計算をする前提</strong>の仕組みなので、
          今回のようにバックエンドを経由する構成では使いどころがない。
        </Note>

        <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          たどり方
        </h4>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          左メニューの <strong>アプリケーション → アプリケーションクライアント</strong>。
          ウィザードで作ったクライアントが 1 つだけ並んでいる。
        </p>

        <Screenshot
          src="/aws/cognito/スクリーンショット 2026-08-10 22.30.18.png"
          alt="アプリケーションクライアントの一覧画面。memory-game が 1 件だけ表示され、クライアント ID が並んでいる"
          width={3018}
          height={1778}
          caption="ここに出ているクライアント ID が、コードから使う値"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          名前をクリックすると詳細が開く。<strong>今の認証フローがここに出ている</strong>。
        </p>

        <Screenshot
          src="/aws/cognito/スクリーンショット 2026-08-10 22.30.27.png"
          alt="memory-game クライアントの詳細画面。認証フローに「選択ベースのサインイン」「セキュアリモートパスワード (SRP)」「既存の認証済みセッションからユーザートークンを取得」の 3 つが並ぶ"
          width={3018}
          height={1778}
          caption="認証フローが 3 つしかない。「ユーザー名とパスワード」が無いのが今回の問題"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          この画面は<strong>設定の答え合わせにも使える</strong>。
          あわせて確認しておきたいのが次の 3 つ。
        </p>
        <div className="flex flex-col gap-3">
          <Field name="クライアントシークレット" choice="「-」= 無し が正しい">
            <p>
              Step 01 で SPA を選んだ結果。ここに値が入っていたら
              <strong>署名 (SECRET_HASH) の計算が必要</strong>になるので、
              実装が変わってくる。
            </p>
          </Field>
          <Field name="アクセストークンの有効期限" choice="60 分（初期値）">
            <p>
              ログイン状態がどれだけ保つかを決める値。
              <strong>60 分経つと再ログインが必要</strong>になるので、
              それが嫌なら更新トークンで延長する仕組みを別途作ることになる。
            </p>
          </Field>
          <Field name="更新トークンの有効期限" choice="5 日（初期値）">
            <p>
              上を延長するための期限。
              <strong>この日数までは、再ログインさせずにログイン状態を保てる</strong>。
            </p>
          </Field>
        </div>

        <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          編集する
        </h4>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          右上の<strong>「編集」</strong>を押すと、認証フローがチェックボックスで並ぶ。
        </p>

        <Screenshot
          src="/aws/cognito/スクリーンショット 2026-08-10 22.31.08.png"
          alt="アプリケーションクライアントの編集画面。認証フローのチェックボックスが 6 つ並び、ALLOW_USER_PASSWORD_AUTH だけ未チェックになっている"
          width={3018}
          height={1778}
          caption="上から 2 番目「ユーザー名とパスワード (ALLOW_USER_PASSWORD_AUTH)」にチェックを入れる"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          チェックするのは<strong>1 つだけ</strong>。
          <strong>既に入っている 3 つは外さないこと。</strong>
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`☑ 選択ベースのサインイン (ALLOW_USER_AUTH)                そのまま
☐ ユーザー名とパスワード (ALLOW_USER_PASSWORD_AUTH)      ★ ここを入れる
☑ 安全なリモートパスワード SRP (ALLOW_USER_SRP_AUTH)      そのまま
☐ サーバー側の管理者認証情報 (ALLOW_ADMIN_USER_PASSWORD_AUTH)  触らない
☐ Lambda トリガー (ALLOW_CUSTOM_AUTH)                    触らない
☑ 既存の認証済みセッション (ALLOW_REFRESH_TOKEN_AUTH)     そのまま`}</code>
        </pre>

        <div className="flex flex-col gap-2 rounded-lg border border-rose-200 bg-rose-50/40 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/20">
          <h4 className="text-base font-semibold text-rose-900 dark:text-rose-200">
            間違えやすい: 似た名前がもう 1 つある
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <Code>ALLOW_ADMIN_USER_PASSWORD_AUTH</Code>{" "}
            は名前がよく似ているが<strong>別物</strong>。
            こちらは <Code>AdminInitiateAuth</Code> という管理者向けの API 用で、
            AWS の認証情報を持っている側からユーザーになりすませる。
            今回使うのは <strong>ADMIN が付かない方</strong>。
          </p>
        </div>

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          保存すれば<strong>すぐに反映される</strong>。
          アプリの再起動もデプロイも要らない。
        </p>

        <Note>
          CLI でも変えられるが、<Code>update-user-pool-client</Code> は
          <strong>指定しなかった項目を既定値に戻す</strong>。
          有効期限などを巻き添えで初期化しやすいので、
          1 箇所だけ直すならコンソールの方が安全。
        </Note>
      </Step>
    </main>
  );
}

// 入力項目カード（何を選ぶか + なぜ をセットで見せる）
function Field({
  name,
  choice,
  children,
}: {
  name: string;
  choice: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {name}
      </p>
      <p className="mt-1.5 flex items-baseline gap-2 text-[14px]">
        <span className="shrink-0 font-semibold text-zinc-500 dark:text-zinc-500">
          選ぶもの
        </span>
        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
          {choice}
        </span>
      </p>
      <div className="mt-2 flex flex-col gap-2 border-t border-zinc-100 pt-2 text-[14px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        {children}
      </div>
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
