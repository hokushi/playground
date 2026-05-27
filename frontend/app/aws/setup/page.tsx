import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsSetupPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        AWS アカウント準備
      </h1>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          ルートユーザーでログイン
        </h2>

        <Screenshot
          src="/aws/スクリーンショット 2026-05-26 18.01.57.png"
          alt="AWS Console Home - 右上のドロップダウンを開いた状態"
          width={2560}
          height={1440}
        />

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            どこを見て「root」と判断したか
          </h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                右上の表示が <strong>「hokushi (8843-7510-6358)」</strong>
                という <strong>「アカウント名 (アカウント番号)」</strong>の形式。
                IAM ユーザーなら <strong>「ユーザー名 @ アカウント番号」</strong>
                のように <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">@</code> 付きになる
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                ドロップダウンに <strong>「請求とコスト管理」</strong>
                が普通に出ている。root は全権限を持つので請求情報まで見える
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>そもそも、まだ IAM ユーザーを作っていない</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            確実に確認したいとき
          </h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                ドロップダウンの上部に <strong>「ルートユーザー」</strong>
                というラベルが表示される (拡大すれば見える)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                CLI が通っていれば <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">aws sts get-caller-identity</code> で
                ARN を確認。末尾が <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">:root</code>
                なら root、<code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">:user/名前</code> なら IAM ユーザー
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-rose-200 bg-rose-50/60 p-5 dark:border-rose-900/50 dark:bg-rose-950/20">
        <h2 className="text-lg font-semibold text-rose-900 dark:text-rose-200">
          なぜ root のまま使ってはいけないのか
        </h2>
        <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-rose-900/90 dark:text-rose-200/90">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 dark:bg-rose-400" />
            <span>
              <strong>全権限を持っている</strong>。一度漏れたら誰でもアカウント内のすべてを操作できる
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 dark:bg-rose-400" />
            <span>
              <strong>請求情報・支払い方法・アカウント解約</strong>まで触れる。
              リソース全消し + 高額利用も理論上可能
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 dark:bg-rose-400" />
            <span>
              <strong>権限を絞れない</strong>。IAM ユーザーなら「この人は EC2 だけ」「あの人は読み取り専用」と
              できるが、root にはそもそも IAM ポリシーが適用されない
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 dark:bg-rose-400" />
            <span>
              <strong>パスワード変更だけでは取り戻せない</strong>事故もある (アクセスキーが既に漏れていた等)。
              root のアクセスキーは絶対に作らない
            </span>
          </li>
        </ul>
        <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
          → 普段の作業用に <strong>IAM ユーザーを作って、そちらでログインし直す</strong>のが鉄則。
          root は「IAM ユーザー作成」「予算アラート設定」「アカウント情報変更」など
          <strong> root じゃないと触れない操作のとき</strong>だけ使う
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          IAM ユーザーを作る
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ここから先の普段使いユーザーを作る。<strong>個人検証なので権限は AdministratorAccess</strong>
          で全権付与する (本番なら最小権限が原則)。作り終わったら <strong>root をログアウトして、こっちで入り直す</strong>のがゴール。
        </p>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ① IAM ダッシュボードへ
          </h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                上の検索バーに <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">IAM</code> と入れて IAM サービスへ
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                左メニューの <strong>「ユーザー」</strong> をクリック → 右上の
                <strong> 「ユーザーの作成」</strong> ボタン
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                ※ IAM は <strong>グローバルサービス</strong>。リージョンは関係なし
              </span>
            </li>
          </ul>
          <Screenshot
            src="/aws/スクリーンショット 2026-05-26 18.19.12.png"
            alt="IAM ダッシュボード"
            width={2560}
            height={1440}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ② ユーザー詳細を入れる (ステップ 1)
          </h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>ユーザー名</strong>: 任意 (例: <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">hokushi-IAM</code>)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                ☑ <strong>「AWS マネジメントコンソールへのユーザーアクセスを提供する」</strong>
                ← これにチェックしないと Web 画面でログインできない
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>コンソールパスワード: カスタムパスワード</strong> を選び、自分で覚えやすい強めのパスワードを入れる
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                「次回サインインで新しいパスワードを作成」のチェックは、個人用なら <strong>オフでも OK</strong>
              </span>
            </li>
          </ul>
          <Screenshot
            src="/aws/スクリーンショット 2026-05-26 18.26.00.png"
            alt="ユーザー詳細 - カスタムパスワード入力済み"
            width={2560}
            height={1440}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ③ 許可を付ける (ステップ 2)
          </h3>

          <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              AdministratorAccess とは
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-[14px] leading-relaxed text-blue-900/90 dark:text-blue-200/90">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  AWS が用意している <strong>マネージドポリシー</strong> (= AWS が中身を定義していて、ユーザーは付け外しするだけ)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  中身はほぼ <code className="rounded bg-white/70 px-1 text-xs dark:bg-zinc-900/70">{`{"Action": "*", "Resource": "*"}`}</code>
                  。つまり <strong>全 AWS サービスのほぼ全操作を許可</strong>する最強権限
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  例えるなら「root に近いけど、いざとなれば取り上げられる管理者権限」。
                  ポリシーを外せば即座に権限を失う ── root と違ってここが大事
                </span>
              </li>
            </ul>

            <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">
              root との違い
            </p>
            <ul className="mt-1 flex flex-col gap-1 text-[14px] leading-relaxed text-blue-900/90 dark:text-blue-200/90">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  <strong>アカウント解約 / メアド変更 / root パスワード変更</strong>などは AdministratorAccess でも不可。
                  これだけは root にしかできない
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  <strong>請求情報の閲覧</strong>はデフォルトでは見えない。アカウント側で「IAM ユーザーの請求アクセスを有効化」をしないと出てこない
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  <strong>権限の付け外しが可能</strong>。漏洩が分かれば即削除 / 切り替えできる (root の権限は剥がせない)
                </span>
              </li>
            </ul>

            <p className="mt-3 text-xs text-blue-800/80 dark:text-blue-300/80">
              ※ 本番運用では <strong>最小権限の原則</strong> (必要なサービスだけ許可) に従ってもっと絞るべき。
              個人検証では「とにかく動けば OK」なので AdministratorAccess で進める
            </p>
          </div>

          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                右上の <strong>「ポリシーを直接アタッチする」</strong>を選択
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                検索欄に <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">AdministratorAccess</code> と入れて、
                <strong>無印の AdministratorAccess</strong> にチェック (-Amplify とかの派生は違うので注意)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                タイプ欄が「AWS 管理 - ジョブ機能」になっていれば正解
              </span>
            </li>
          </ul>
          <Screenshot
            src="/aws/スクリーンショット 2026-05-26 18.27.36.png"
            alt="許可ポリシー選択 - AdministratorAccess にチェック"
            width={2560}
            height={1440}
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            ④ 完成 (ステップ 3 で「ユーザーの作成」を押した後)
          </h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                緑のバナーで <strong>「ユーザーが正常に作成されました」</strong>と出れば成功
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                ユーザー詳細ページに ARN (<code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-800">arn:aws:iam::xxxxxxxxxxxx:user/hokushi-IAM</code>) と
                AdministratorAccess ポリシーがアタッチ済みなのが見える
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                パスワードは自分で設定したやつなので、CSV ダウンロードは省略可
              </span>
            </li>
          </ul>
          <Screenshot
            src="/aws/スクリーンショット 2026-05-26 18.30.08.png"
            alt="ユーザー作成完了画面"
            width={2560}
            height={1440}
          />
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
            ⑤ サインアウトして IAM ユーザーで入り直す
          </h3>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>右上のメニューから <strong>サインアウト</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                サインイン URL は <code className="rounded bg-white/70 px-1 font-mono text-xs dark:bg-zinc-900/70">https://&#123;アカウントID&#125;.signin.aws.amazon.com/console</code>
                (ブックマーク推奨)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                ユーザー名 (例: <code className="rounded bg-white/70 px-1 font-mono text-xs dark:bg-zinc-900/70">hokushi-IAM</code>) +
                さっき設定したパスワードでログイン
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                ログイン後、右上の表示が <strong>「hokushi-IAM @ アカウントID」</strong> の <code className="rounded bg-white/70 px-1 text-xs dark:bg-zinc-900/70">@</code> 付きに変われば成功
              </span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
