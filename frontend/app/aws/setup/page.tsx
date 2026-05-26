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
    </main>
  );
}
