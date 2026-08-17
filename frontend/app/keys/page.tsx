import type { ReactNode } from "react";

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  );
}

/** カードは基本グレー。強調したい 1 枚だけ accent を付ける */
function Card({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`flex flex-col gap-3 rounded-lg border border-l-4 px-5 py-4 ${
        accent
          ? "border-zinc-200 border-l-indigo-400 bg-indigo-50/30 dark:border-zinc-800 dark:border-l-indigo-500/70 dark:bg-indigo-950/10"
          : "border-zinc-200 border-l-zinc-300 bg-white dark:border-zinc-800 dark:border-l-zinc-700 dark:bg-zinc-950/30"
      }`}
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * 鍵のチップ。色ではなく「塗りつぶし / 白抜き」で秘密か公開かを表す。
 * secret = 塗り（人に渡さない） / public = 白抜き（配ってよい）
 */
function KeyChip({
  kind,
  label,
}: {
  kind: "secret" | "public" | "shared";
  label: string;
}) {
  const style = {
    secret:
      "border-zinc-800 bg-zinc-800 text-zinc-50 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900",
    public:
      "border-dashed border-zinc-400 bg-white text-zinc-700 dark:border-zinc-500 dark:bg-transparent dark:text-zinc-300",
    shared:
      "border-zinc-800 bg-zinc-800 text-zinc-50 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900",
  }[kind];
  const icon = kind === "public" ? "🔓" : "🔑";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[12px] font-medium ${style}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

/** 図の中の登場人物 */
function Actor({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</p>
      <p className="text-[12px] text-zinc-500 dark:text-zinc-400">{role}</p>
      {children}
    </div>
  );
}

/** 横向きの矢印（狭い画面では下向きになる） */
function HArrow({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-2 py-2">
      <span className="text-lg leading-none text-zinc-400 dark:text-zinc-600">
        <span className="sm:hidden">↓</span>
        <span className="hidden sm:inline">→</span>
      </span>
      <span className="text-center text-[11.5px] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      {sub && (
        <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-center font-mono text-[10.5px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {sub}
        </span>
      )}
    </div>
  );
}

/**
 * 段取りの 1 手順。
 * who = 誰が動くか、after = その結果どうなるか
 */
function Step({
  n,
  who,
  title,
  after,
  children,
}: {
  n: number;
  who: "自分" | "外部";
  title: string;
  after?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-[11px] font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {n}
        </span>
        <span className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mb-3 flex w-full flex-col gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded border px-1.5 py-0.5 text-[11px] font-medium ${
              who === "自分"
                ? "border-zinc-800 bg-zinc-800 text-zinc-50 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900"
                : "border-zinc-300 bg-white text-zinc-600 dark:border-zinc-600 dark:bg-transparent dark:text-zinc-300"
            }`}
          >
            {who}
          </span>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
        </div>
        {children}
        {after && (
          <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400">→ {after}</p>
        )}
      </div>
    </div>
  );
}

/** 図の外枠 */
function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950/30">
      <p className="mb-3 text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
        {caption}
      </p>
      {children}
    </div>
  );
}

export default function KeysPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          秘密鍵と公開鍵は「どっちが何を持つ」のか
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          鍵は 2 本 1 組。送る側が秘密鍵でサインし、受け取る側が公開鍵で本物か確かめる
        </p>
      </header>

      {/* 結論 */}
      <Card title="先に結論" accent>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              送る側（呼び出す人）
            </p>
            <KeyChip kind="secret" label="秘密鍵" />
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
              絶対に渡さない。これで<strong>署名する</strong>
            </p>
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              受け取る側（API 側）
            </p>
            <KeyChip kind="public" label="公開鍵" />
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
              人に見られてよい。これで<strong>検証する</strong>
            </p>
          </div>
        </div>
        <P>
          秘密鍵は<strong>実印</strong>、公開鍵は
          <strong>その印影が本物か照合するための見本</strong>。
          見本は誰に配ってもよいが、そこから実印は作れない。
        </P>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
          ※ この図では <KeyChip kind="secret" label="塗りつぶし" /> ＝ 人に渡さない鍵、
          <KeyChip kind="public" label="点線の枠" /> ＝ 配ってよい鍵、として描いている。
        </p>
      </Card>

      {/* 図：APIキーとの違い */}
      <Card title="図で見る：APIキーとの違い">
        <P>
          いまの external-api はAPIキー方式（<Code>x-api-key</Code>）。
          違いは<strong>「受け取る側が何を持っているか」</strong>の一点に尽きる。
        </P>

        {/* ① APIキー方式 */}
        <Figure caption="① APIキー方式 ＝ 同じ鍵を 2 人が持つ（共通鍵）">
          <div className="grid items-stretch gap-1 sm:grid-cols-[1fr_auto_1fr]">
            <Actor name="memory-game" role="送る側">
              <KeyChip kind="shared" label="local-dev-key" />
            </Actor>
            <HArrow label="鍵をそのまま送る" sub="x-api-key: local-dev-key" />
            <Actor name="external-api" role="受け取る側">
              <KeyChip kind="shared" label="local-dev-key" />
              <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                同じ文字列か比較するだけ
              </span>
            </Actor>
          </div>
          <p className="mt-3 rounded border border-zinc-200 bg-zinc-50 px-3 py-2 text-center text-[12.5px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            秘密（塗りつぶしの鍵）が <strong>2 箇所</strong>にある
          </p>
        </Figure>

        {/* ② 公開鍵方式 */}
        <Figure caption="② 公開鍵方式 ＝ 鍵は 2 本 1 組で、別々のものを持つ">
          <div className="grid items-stretch gap-1 sm:grid-cols-[1fr_auto_1fr]">
            <Actor name="memory-game" role="送る側 / 署名する人">
              <KeyChip kind="secret" label="秘密鍵" />
              <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                署名を作れる
              </span>
            </Actor>
            <HArrow label="鍵は送らない。署名だけ送る" sub="Authorization: Bearer eyJ..." />
            <Actor name="external-api" role="受け取る側 / 検証する人">
              <KeyChip kind="public" label="公開鍵" />
              <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                検証はできる／署名は作れない
              </span>
            </Actor>
          </div>
          <p className="mt-3 rounded border border-zinc-200 bg-zinc-50 px-3 py-2 text-center text-[12.5px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            秘密（塗りつぶしの鍵）は <strong>1 箇所だけ</strong>。右側は公開鍵しか持たない
          </p>
        </Figure>
      </Card>

      {/* 鍵ペアとは */}
      <Card title="そもそも「鍵ペア」とは">
        <P>
          鍵は<strong>必ず 2 本セットで生成</strong>される。ペアの片方でやった処理は、
          もう片方でしか確かめられない／元に戻せない、という数学的な関係になっている。
        </P>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
            <KeyChip kind="secret" label="秘密鍵 (private key)" />
            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              自分だけが持つ。git にコミットしない、ログに出さない、人に送らない。
              漏れたら鍵ごと作り直す
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
            <KeyChip kind="public" label="公開鍵 (public key)" />
            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              配ってよい。Web に置いてもよい（Cognito は実際に誰でも取れる URL に置いている）。
              <strong>検証はできるが署名は作れない</strong>
            </p>
          </div>
        </div>
        <P>
          公開鍵から秘密鍵を逆算することはできない。だから「公開鍵は公開してよい」が成り立つ。
        </P>
      </Card>

      {/* 段取り */}
      <Card title="段取り：external-api が本物の外部サービスだったら">
        <P>
          <strong>最初に 1 回だけやること</strong>（セットアップ）と、
          <strong>毎回のリクエストでやること</strong>は別物。まずここを分ける。
        </P>

        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          最初に 1 回だけ（セットアップ）
        </p>
        <div className="flex flex-col">
          <Step
            n={1}
            who="自分"
            title="external-api に利用登録する"
            after="相手の DB に「memory-game」という利用者の行ができる。client_id のような識別子をもらう"
          />
          <Step
            n={2}
            who="自分"
            title="自分のサーバで鍵ペアを作る"
            after="private.pem（秘密鍵）と public.pem（公開鍵）が手元にできる"
          >
            <p className="font-mono text-[12px] break-all text-zinc-600 dark:text-zinc-400">
              openssl genpkey -algorithm ed25519 -out private.pem
              <br />
              openssl pkey -in private.pem -pubout -out public.pem
            </p>
          </Step>
          <Step
            n={3}
            who="自分"
            title="public.pem の中身を相手に登録する"
            after="相手の DB の自分の行に、公開鍵が保存される。これで「この鍵で署名されたもの＝memory-game」と判定できるようになる"
          >
            <p className="flex flex-wrap items-center gap-2 text-[13px] text-zinc-600 dark:text-zinc-400">
              登録するのは <KeyChip kind="public" label="公開鍵" /> だけ。
              <KeyChip kind="secret" label="秘密鍵" /> は渡さない
            </p>
            <div className="overflow-x-auto rounded border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950/40">
              <p className="mb-1 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                external-api 側の DB（イメージ）
              </p>
              <table className="w-full min-w-[380px] border-collapse text-[12px]">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="py-1 pr-3 font-medium">client_id</th>
                    <th className="py-1 pr-3 font-medium">name</th>
                    <th className="py-1 font-medium">public_key</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="py-1 pr-3 font-mono">cli_8f3a...</td>
                    <td className="py-1 pr-3">memory-game</td>
                    <td className="py-1 font-mono">MCowBQYDK2Vw...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Step>
          <Step
            n={4}
            who="自分"
            title="秘密鍵を秘密の置き場にしまう"
            after="コードからは環境変数として読む。リポジトリには入れない"
          >
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
              ローカルは <Code>.env.local</Code>（gitignore 済み）、本番は Secrets Manager など
            </p>
          </Step>
        </div>

        <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          毎回のリクエストで
        </p>
        <div className="flex flex-col">
          <Step
            n={5}
            who="自分"
            title="送信の直前に JWT を作り、秘密鍵で署名する"
            after="有効期限つきの「通行証」がその場で 1 枚できる。保存はしない"
          >
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
              中身は「誰が（<Code>iss</Code>: 自分の client_id）・誰宛（<Code>aud</Code>:
              external-api）・いつまで（<Code>exp</Code>: 5 分後）」
            </p>
          </Step>
          <Step
            n={6}
            who="自分"
            title="ヘッダーに載せて API を呼ぶ"
            after="鍵そのものは流れない。流れるのは署名された通行証だけ"
          >
            <p className="font-mono text-[12px] break-all text-zinc-600 dark:text-zinc-400">
              Authorization: Bearer eyJhbGciOiJFZERTQSJ9...
            </p>
          </Step>
          <Step
            n={7}
            who="外部"
            title="登録済みの公開鍵で検証して、通れば処理する"
            after="署名が偽物 / 期限切れ / 宛先違いなら 401 で弾かれる"
          />
        </div>

        <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          たまに（運用）
        </p>
        <div className="flex flex-col">
          <Step
            n={8}
            who="自分"
            title="鍵を入れ替える"
            after="新しい公開鍵を登録 → 署名を新しい鍵に切替 → 相手の DB から古い公開鍵を消してもらう"
          >
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
              秘密鍵が漏れた疑いがあるときも同じ手順。相手に連絡しなくても自分で止められる
            </p>
          </Step>
        </div>

        <p className="rounded border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13.5px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
          鍵の受け渡しが発生するのは <strong>③ の 1 回だけ</strong>で、渡すのは公開鍵。
          秘密鍵は最初から最後まで自分のサーバから出ない。
          <br />
          ③ の登録手段（Web の入力欄・登録用 API・依頼フォームなど）は相手によって違うが、
          やっていることは<strong>相手の DB に公開鍵を 1 行入れる</strong>だけで同じ。
        </p>
      </Card>

      {/* 送る中身は誰が決めるか */}
      <Card title="トークンに何を入れるかは、相手が決める">
        <P>
          署名すれば通る、ではない。トークンの中身の仕様を決めるのは
          <strong>受け取る側</strong>で、API ドキュメントに書いてある。
          1 つでも食い違えば 401 で弾かれる。
        </P>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium">相手が指定してくる項目</th>
                <th className="py-2 font-medium">書かれ方の例</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">署名方式</td>
                <td className="py-2">「RS256 で署名すること」</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">ヘッダー名</td>
                <td className="py-2">
                  <Code>Authorization: Bearer &lt;JWT&gt;</Code>
                </td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">
                  <Code>aud</Code> に入れる値
                </td>
                <td className="py-2">「https://api.example.com/token を指定」</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">
                  <Code>iss</Code> に入れる値
                </td>
                <td className="py-2">「発行された client_id を指定」</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">有効期限の上限</td>
                <td className="py-2">「exp は発行から最大 5 分」</td>
              </tr>
              <tr>
                <td className="py-2 pr-3">追加で必須の項目</td>
                <td className="py-2">
                  「<Code>sub</Code> に対象ユーザー」「<Code>jti</Code> に一意な値」など
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          こちらが自由に決められるのは、鍵ペアそのものと、
          上限の範囲でどれだけ期限を短くするかくらい。
          同じ「JWT で認証」でも中身の要求は相手ごとに違う
          （Google はスコープ必須で最大 1 時間、Salesforce は <Code>sub</Code> にユーザー、
          Snowflake は <Code>iss</Code> が公開鍵の指紋を含む独特な形式、など）。
        </P>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-3 font-medium">項目</th>
                <th className="py-2 pr-3 font-medium">送る側が入れる</th>
                <th className="py-2 font-medium">受け取る側が確かめる</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">
                  <Code>alg</Code>
                </td>
                <td className="py-2 pr-3">header に署名方式</td>
                <td className="py-2">受け入れる方式を 1 つに固定して照合</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">
                  <Code>iss</Code>
                </td>
                <td className="py-2 pr-3">自分の client_id</td>
                <td className="py-2">その ID で公開鍵を引く</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-2 pr-3">
                  <Code>aud</Code>
                </td>
                <td className="py-2 pr-3">相手が指定した名前</td>
                <td className="py-2">自分宛かどうか</td>
              </tr>
              <tr>
                <td className="py-2 pr-3">
                  <Code>exp</Code>
                </td>
                <td className="py-2 pr-3">発行時刻 + 数分</td>
                <td className="py-2">期限切れでないか（時計のズレを少し許容）</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="rounded border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[13.5px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
          初回の連携は「仕様どおりに組んで、401 が出たらどこが違うか潰す」作業になる。
          しかも 401 は<strong>署名が違うのか aud が違うのか期限切れなのかを教えてくれない</strong>
          のが普通（攻撃者にヒントを与えないため）。
          自分でトークンをデコードして、仕様と 1 項目ずつ突き合わせることになる。
        </p>
      </Card>
    </main>
  );
}
