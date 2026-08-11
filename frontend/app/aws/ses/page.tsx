import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsSesPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          SES でメールを送る
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          アプリからメールを送るためのサービス。ドメインを持っていなくても、
          自分のアドレスを 1 つ検証すれば送れるところまで
        </p>
      </header>

      {/* SES とは */}
      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          SES とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>SES (Simple Email Service)</strong> = AWS の{" "}
          <strong>「メール送信専門」</strong>サービス。
          S3 が「ファイル置き場」、Cognito が「アカウント置き場」なら、SES は{" "}
          <strong>「郵便局」</strong>。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          アプリから API を叩くとメールを送ってくれる。
          <strong>受信ではなく送信が主目的</strong>で、
          「登録ありがとうございます」「パスワードを再設定しました」のような
          <strong>アプリが自動で送るメール</strong>を担当する。
        </p>
      </section>

      {/* サンドボックス */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          最初に知るべき: サンドボックス
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          SES を有効にした直後は<strong>サンドボックス</strong>という制限状態にある。
          ここを理解していないと「なぜか特定の人にしか送れない」で混乱する。
        </p>
        <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-300">
                  項目
                </th>
                <th className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-300">
                  サンドボックス
                </th>
                <th className="px-4 py-2 font-semibold text-zinc-700 dark:text-zinc-300">
                  本番アクセス
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  宛先
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  <strong>検証済みのアドレスのみ</strong>
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  誰にでも
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  送信元
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  検証済みのアドレス / ドメイン
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  同左
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  上限
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  200 通/日・1 通/秒
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                  申請した量
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-50">
                  解除
                </td>
                <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300" colSpan={2}>
                  申請フォームを出して承認を待つ (1 日程度)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>自分から自分に送るだけなら、サンドボックスのままでよい。</strong>
          解除が要るのは「知らない人に送る」段階になってから。
        </p>
      </section>

      <Screenshot
        src="/aws/ses/スクリーンショット 2026-08-11 1.15.25.png"
        alt="SES のトップページ。東京リージョン。右側に「使用を開始」ボタンと料金プランの案内が出ている"
        width={3018}
        height={1778}
        caption="SES のトップ。まず右上のリージョンが東京になっているか確認する"
      />

      <div className="flex flex-col gap-2 rounded-lg border border-rose-200 bg-rose-50/40 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/20">
        <h4 className="text-base font-semibold text-rose-900 dark:text-rose-200">
          リージョンを間違えると動かない
        </h4>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>SES はリージョンごとに完全に独立している。</strong>
          バージニア北部で検証したアドレスは、東京リージョンからは送信元として使えない。
          コードが接続するリージョンと<strong>同じ場所で検証する</strong>こと。
          「検証したはずなのに弾かれる」の原因はたいていこれ。
        </p>
      </div>

      {/* Step 01 */}
      <Step n="01" title="メールアドレスを 1 つ検証する">
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          左上の <strong>≡</strong> から <strong>設定 → ID</strong> を開く。
          まだ何も無いので <strong>ID (0)</strong> と出る。
        </p>

        <Screenshot
          src="/aws/ses/スクリーンショット 2026-08-11 1.19.24.png"
          alt="SES の ID 一覧画面。ID は 0 件で「表示する ID はありません」と出ており、右上に「ID の作成」ボタンがある"
          width={3018}
          height={1778}
          caption="ここが検証済みアドレスの一覧。ウィザードを完走しなくてもこの画面から登録できる"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>ID の作成</strong>を押すと、まず<strong>種類を 2 択</strong>で聞かれる。
        </p>

        <Screenshot
          src="/aws/ses/スクリーンショット 2026-08-11 1.27.49.png"
          alt="ID の作成画面。ID タイプとして「ドメイン」と「E メールアドレス」の 2 つが並んでいる"
          width={3018}
          height={1778}
          caption="ID タイプの選択。どちらも未選択の状態"
        />

        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`ドメイン        … DNS にレコードを追加して所有権を証明する（独自ドメインが要る）
E メールアドレス ★ こちら。届いたメールのリンクを踏むだけ`}</code>
        </pre>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          説明文が<strong>そのまま違いを表している</strong>。ドメインは
          「DNS 設定にアクセスして、必要なレコードを追加する必要があります」、
          メールアドレスは「確認 E メールを開くための受信トレイへのアクセス権が必要です」。
          <strong>受信トレイさえ見られればよい</strong>のが後者。
        </p>

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>E メールアドレス</strong>を選ぶと入力欄が出るので、自分のアドレスを入れる。
        </p>

        <Screenshot
          src="/aws/ses/スクリーンショット 2026-08-11 1.28.21.png"
          alt="E メールアドレスを選択した状態。アドレスの入力欄と DMARC に関する注意書き、デフォルト設定セットとテナントの割り当てオプションが表示されている"
          width={3018}
          height={1778}
          caption="「デフォルト設定セットの割り当て」と「テナントに割り当てる」はどちらもオプション。チェック不要"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          あとは <strong>ID の作成</strong>を押すだけ。押すと ID の詳細画面に移る。
        </p>

        <Screenshot
          src="/aws/ses/スクリーンショット 2026-08-11 1.32.49.png"
          alt="作成した ID の詳細画面。ID ステータスが「検証保留中」で、上部に「必要なアクション」として確認メールのリンクをクリックするよう案内が出ている"
          width={3018}
          height={1778}
          caption="作っただけではまだ使えない。ID ステータスが「検証保留中」になっている"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>ここで終わりではない。</strong>
          上部に青い帯で<strong>「必要なアクション」</strong>が出ていて、
          <strong>受信トレイに届いた確認メールのリンクをクリックする</strong>まで
          <Code>検証保留中</Code> のまま。この状態では送信元に使えない。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          右上の<strong>「テスト E メールの送信」が灰色で押せない</strong>のも、
          まだ検証が済んでいないから。
          <strong>ここが押せるようになれば完了</strong>と考えればよい。
        </p>
        <Note>
          メールが見つからないときは、右上の<strong>「新しい確認 E メールへ」</strong>から再送できる。
        </Note>

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          リンクを踏むと、同じ画面が<strong>検証済み</strong>に変わる。
        </p>

        <Screenshot
          src="/aws/ses/スクリーンショット 2026-08-11 1.34.17.png"
          alt="検証後の ID 詳細画面。ID ステータスが緑のチェック付きで「検証済み」になり、「テスト E メールの送信」ボタンが押せる状態になっている"
          width={3018}
          height={1778}
          caption="青い帯が消え、「テスト E メールの送信」が押せるようになった"
        />

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          変化は 3 つ。<strong>ID ステータスが「検証済み」</strong>になり、
          <strong>上部の青い帯が消え</strong>、
          <strong>「テスト E メールの送信」が押せる</strong>ようになる。
          これで送信元としても宛先としても使える。
        </p>

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          CLI で確認するなら個別に問い合わせる。
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`aws sesv2 get-email-identity --email-identity 自分のアドレス \\
  --region ap-northeast-1 \\
  --query '{Verified:VerifiedForSendingStatus,Status:VerificationStatus}'

# → { "Verified": true, "Status": "SUCCESS" }`}</code>
        </pre>
        <Note>
          一覧の <Code>list-email-identities</Code> だと
          <Code>VerifiedForSendingStatus</Code> が <Code>None</Code> のままに見えることがある。
          <strong>確実に見たいなら個別の <Code>get-email-identity</Code></strong> を使う。
        </Note>
      </Step>

      {/* Step 03 */}
      <Step n="02" title="コードから送る">
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          SDK を入れて <Code>SendEmail</Code> を呼ぶだけ。
          <strong>検証さえ済んでいれば、コードは数行</strong>で済む。
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({ region: "ap-northeast-1" });

await ses.send(
  new SendEmailCommand({
    FromEmailAddress: "自分の検証済みアドレス",   // ← 検証済みでないと弾かれる
    Destination: { ToAddresses: ["宛先"] },      // ← サンドボックス中はこれも検証済みのみ
    Content: {
      Simple: {
        Subject: { Data: "件名", Charset: "UTF-8" },
        Body: { Text: { Data: "本文", Charset: "UTF-8" } },
      },
    },
  }),
);`}</code>
        </pre>
        <Note>
          <Code>Charset: &quot;UTF-8&quot;</Code> を書き忘れると<strong>日本語が化ける</strong>。
          件名と本文の両方に要る。
        </Note>

        <h4 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          送信失敗でアプリを止めない
        </h4>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          通知メールは<strong>付随的な処理</strong>であることが多い。
          「ゲームを作ったら知らせる」なら、
          <strong>メールが送れなかっただけでゲーム作成まで失敗させるのは筋が悪い</strong>。
        </p>
        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <code>{`const game = await gameRepository.create(input);

try {
  await sesClient.send({ ... });
} catch (err) {
  // 失敗はログに残すだけ。ゲーム作成は成功のままにする
  console.error(\`通知メールの送信に失敗しました: \${err}\`);
}

return game;`}</code>
        </pre>
        <Note>
          逆に「パスワード再設定メール」のように<strong>メールが本体</strong>の処理なら、
          失敗はきちんとエラーにする。<strong>握りつぶすかどうかは処理の性格で決める</strong>。
        </Note>
      </Step>

      {/* つまずき */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          つまずきやすいところ
        </h2>
        <div className="flex flex-col gap-2">
          <Details summary="MessageRejected: Email address is not verified">
            <p>
              一番よく出る。<strong>送信元か宛先のどちらかが未検証</strong>。
              サンドボックス中は<strong>両方</strong>が検証済みである必要があるので、
              「送信元は検証したのに」で止まりやすい。
            </p>
            <p>
              エラーメッセージには<strong>リージョンも書かれている</strong>ので、
              そこが自分の想定と合っているかも見る。
            </p>
          </Details>

          <Details summary="検証したはずのアドレスが一覧に出ない">
            <p>
              <strong>別リージョンで検証している</strong>可能性が高い。
              SES はリージョンごとに独立していて、東京で作った ID は
              バージニア北部の画面には出ない。コンソール右上のリージョンを確認する。
            </p>
          </Details>

          <Details summary="ウィザードのステップ 2 から進めない">
            <p>
              ドメインの入力を求められる画面。<strong>独自ドメインを持っていないなら進めない。</strong>
              キャンセルして ID から個別に登録すればよく、
              <strong>ウィザードを完走する必要はない</strong>。
            </p>
          </Details>

          <Details summary="日本語が文字化けする">
            <p>
              <Code>Charset: &quot;UTF-8&quot;</Code> の指定漏れ。
              件名と本文はそれぞれ別に指定するので、<strong>片方だけ化ける</strong>ことがある。
            </p>
          </Details>
        </div>
      </section>

      {/* 料金 */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          料金
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>送った通数</strong>で課金される。1000 通あたり $0.10 程度と安く、
          個人の学習で使う量ならほぼ無視できる。
          <strong>寝かせておくだけなら料金は発生しない</strong>。
        </p>
        <Note>
          添付ファイルのサイズや、専用 IP を使うかどうかで別途かかることがある。
          正確な条件は AWS の料金ページで確認すること。
        </Note>
      </section>
    </main>
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
