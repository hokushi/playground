import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsAlbPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ALB を立てる
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          EC2 を 2 つの AZ に立てて、その前段に ALB (ロードバランサ) を置く。1 台落ちても継続するところまで
        </p>
      </header>

      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          ALB とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>ALB (Application Load Balancer)</strong> = AWS のマネージドな
          <strong>ロードバランサ</strong>。HTTP/HTTPS の通信を受け取って、裏にいる複数のサーバ (EC2 / ECS タスクなど) に
          <strong>振り分けて</strong>くれる装置。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          表からは <strong>「1 つの入り口」</strong>に見えて、裏では <strong>複数台のサーバが手分け</strong>している状態を作れる。
          1 台が落ちても気付かれずに残りで継続できるし、トラフィックが増えても台数を増やすだけで対応できる。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          ALB は「サブネットを 2 つ選ぶ」だけで作れる
        </h2>

        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ALB 自体は <strong>1 個のリソース</strong>。作るときに <strong>「使うサブネットを 2 つ選ぶ」</strong>と、
          あとは全部 AWS が裏でやってくれる。
        </p>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
            ALB 作成画面 (イメージ)
          </p>
          <pre className="mt-2 font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
{`・名前 : hokushi-alb
・サブネット : ☑ Public 1a   ☑ Public 1c   ← ここで 2 つ選ぶ
・[ 作成 ]`}
          </pre>
          <p className="mt-2 text-center text-xs text-emerald-700 dark:text-emerald-400">
            ↓
          </p>
          <p className="text-center text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            「2 つのサブネットで動く ALB が 1 個」ができあがる
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          目指す構成
        </h2>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="mb-3 text-center text-xs text-zinc-500 dark:text-zinc-500">
            Internet ↓
          </p>

          <div className="rounded-lg border-2 border-orange-500 bg-orange-50 p-3 dark:border-orange-500 dark:bg-orange-950/30">
            <p className="text-center text-sm font-bold text-orange-900 dark:text-orange-200">
              ⚖️ ALB (リソース名は 1 つだけ)
            </p>
            <p className="text-center text-[11px] text-orange-700 dark:text-orange-400">
              hokushi-alb-xxx.ap-northeast-1.elb.amazonaws.com
            </p>
          </div>

          <div className="my-2 grid grid-cols-2 gap-3 text-center text-[10px] text-orange-700 dark:text-orange-400">
            <span>↓ 実体はここに住む</span>
            <span>↓ 実体はここにも住む</span>
          </div>

          <div className="rounded-lg border-2 border-purple-300 bg-purple-50/30 p-3 dark:border-purple-700 dark:bg-purple-950/20">
            <p className="text-xs font-semibold text-purple-900 dark:text-purple-200">
              🌐 VPC: hokushi-vpc (10.0.0.0/16)
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-3 dark:border-emerald-700 dark:bg-emerald-950/20">
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  🏢 Public Subnet 1a
                </p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  10.0.0.0/24
                </p>

                <div className="mt-2 rounded border-2 border-dashed border-orange-500 bg-orange-50/70 p-2 dark:border-orange-600 dark:bg-orange-950/40">
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-200">
                    🔌 ALB の ENI (1a)
                  </p>
                  <p className="text-[10px] font-mono text-orange-700 dark:text-orange-400">
                    10.0.0.10
                  </p>
                </div>

                <div className="mt-2 rounded border-2 border-blue-500 bg-blue-50 p-2 dark:border-blue-500 dark:bg-blue-950/30">
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
                    🖥 EC2 1a
                  </p>
                  <p className="text-[10px] font-mono text-blue-700 dark:text-blue-400">
                    10.0.0.50
                  </p>
                  <p className="text-[10px] text-blue-700 dark:text-blue-400">
                    nginx → 「I am 1a」
                  </p>
                </div>
              </div>

              <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-3 dark:border-emerald-700 dark:bg-emerald-950/20">
                <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  🏢 Public Subnet 1c
                </p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  10.0.1.0/24
                </p>

                <div className="mt-2 rounded border-2 border-dashed border-orange-500 bg-orange-50/70 p-2 dark:border-orange-600 dark:bg-orange-950/40">
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-200">
                    🔌 ALB の ENI (1c)
                  </p>
                  <p className="text-[10px] font-mono text-orange-700 dark:text-orange-400">
                    10.0.1.10
                  </p>
                </div>

                <div className="mt-2 rounded border-2 border-blue-500 bg-blue-50 p-2 dark:border-blue-500 dark:bg-blue-950/30">
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-200">
                    🖥 EC2 1c
                  </p>
                  <p className="text-[10px] font-mono text-blue-700 dark:text-blue-400">
                    10.0.1.50
                  </p>
                  <p className="text-[10px] text-blue-700 dark:text-blue-400">
                    nginx → 「I am 1c」
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            上のオレンジ箱 (ALB 本体) と 中のオレンジ点線箱 (ENI) は<strong>同じ ALB</strong>。
            <strong>論理的には 1 個</strong>だけど、<strong>物理的には各サブネットに ENI を 1 つずつ生やしている</strong>状態。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          完成すると体験できること
        </h2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-[15px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>
              <strong>1 台を落としても、もう片方で継続</strong> ── Multi-AZ HA を本当に体感
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>
              ALB が <strong>「生きてる方」に自動で振り分け</strong>る挙動
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>
              nginx に <strong>「I am EC2 in 1a」 / 「1c」</strong> を仕込んでおくと、リロードで振り分け先が切り替わるのが見える
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>
              <strong>Target Group</strong>: 「振り分け先のグループ」という概念
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>
              <strong>ヘルスチェック</strong>: ALB が定期的に「このサーバ生きてる?」と問う仕組み
            </span>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          手順
        </h2>

        <Step n="01" title="既存 EC2 (1a) の nginx を「I am 1a」に書き換える">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            あとで ALB が <strong>どちらの EC2 に振り分けたか</strong>を見えるようにするため、
            まず 1a 側のページを <strong>「I am EC2 1a」</strong>に書き換える。
          </p>
          <Li>
            EC2 → インスタンス → <Code>hokushi-ec2</Code> → 「接続」→「EC2 Instance Connect」→ ターミナルを開く
          </Li>
          <Li>
            以下のコマンドを実行:
          </Li>
          <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`echo "<h1>I am EC2 1a</h1>" | sudo tee /usr/share/nginx/html/index.html`}
          </pre>
          <Li>
            ブラウザで Public IP (<Code>http://13.113.195.120</Code> 等) を開いてリロード
          </Li>
          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 12.31.18.png"
            alt="ブラウザに「I am EC2 1a」が表示される"
            width={2560}
            height={1440}
          />
        </Step>

        <Step n="02" title="既存 EC2 から AMI を作る">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            今の EC2 の <strong>ディスクをまるごとコピーしたテンプレート (AMI)</strong>を作る。
            これを使うと、<strong>nginx インストール済み + I am EC2 1a が入った状態</strong>で 2 台目をすぐ起動できる。
          </p>

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
              <span>AMI とは?</span>
            </summary>
            <div className="flex flex-col gap-2 px-5 pb-3 pt-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                <strong>AMI (Amazon Machine Image)</strong> = EC2 のフルコピーを保存した「テンプレート」。
                ゲームのセーブデータ的なもの。
              </p>
              <p>中身は:</p>
              <ul className="ml-1 flex flex-col gap-0.5">
                <li>・OS (Amazon Linux 2023)</li>
                <li>・入れたソフト (nginx)</li>
                <li>・設定 (systemctl enable など)</li>
                <li>・ファイル (index.html の中身)</li>
              </ul>
              <p>
                <strong>1 つの AMI から何台でも EC2 を起動可能</strong>。
                立ち上がった新しい EC2 は AMI 作成時のディスクの状態のまま動き始めるので、
                <strong>Step 02〜08 を全部スキップして数分で 2 台目が完成</strong>する
              </p>
            </div>
          </details>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            手順:
          </p>
          <Li>
            EC2 → インスタンス → <Code>hokushi-ec2</Code> → 上の <strong>「アクション」</strong> →{" "}
            <strong>「イメージとテンプレート」</strong> → <strong>「イメージを作成」</strong>
          </Li>
          <Li>
            フォームを以下で埋める:
            <span className="mt-1.5 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・<strong>イメージ名</strong>: <Code>hokushi-ec2-copy</Code> (何でも OK)
              <br />
              ・<strong>イメージの説明</strong>: 空でも OK
              <br />
              ・<strong>再起動しない</strong>: ☐ チェック<strong>しない</strong> (再起動して整合性確保)
              <br />
              ・<strong>ストレージ</strong>: デフォルト
            </span>
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 13.01.49.png"
            alt="AMI 作成フォーム"
            width={2560}
            height={1440}
          />

          <Li>
            右下の <strong>「イメージを作成」</strong> をクリック
          </Li>
          <Li>
            EC2 → 左メニュー <strong>「AMI」</strong> で一覧を開く → ステータスが
            <strong> 「保留中 (pending)」</strong>になっている
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 13.03.23.png"
            alt="AMI 一覧 - 保留中"
            width={2560}
            height={1440}
          />

          <Note>
            裏側では「EC2 を再起動 → EBS をスナップショット → AMI として登録」が走っている。
            5〜10 分で <strong>「利用可能 (available)」</strong>になる。
            その間、元の EC2 も一時的に再起動するが、<Code>systemctl enable nginx</Code> のおかげで自動復帰する
          </Note>
        </Step>

        <Step n="03" title="AMI から 2 台目を Public Subnet 1c に立てる">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            AMI を使うと <strong>nginx インストール済み + I am EC2 1a が入った状態</strong>で
            2 台目がすぐ立ち上がる。<strong>サブネットだけ 1a → 1c に変える</strong>のがポイント。
          </p>

          <Li>
            EC2 → 左メニュー <strong>「AMI」</strong> → <Code>hokushi-ec2-copy</Code> を選択
          </Li>
          <Li>
            右上の <strong>「AMI からインスタンスを起動」</strong> をクリック
          </Li>
          <Li>
            フォームの設定 (1a の EC2 と違うところだけ):
            <span className="mt-1.5 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・<strong>名前</strong>: <Code>hokushi-ec2-1c</Code>
              <br />
              ・<strong>AMI</strong>: <Code>hokushi-ec2-copy</Code> (自動で選ばれている)
              <br />
              ・<strong>キーペア</strong>: 既存の <Code>hokushi-ec2-key</Code> を選ぶ
              <br />
              ・<strong>VPC</strong>: <Code>hokushi-vpc</Code>
              <br />
              ・<strong>サブネット</strong>: <strong>hokushi-subnet-public2-ap-northeast-1c</strong> ← 1c!
              <br />
              ・<strong>パブリック IP 自動割り当て</strong>: 有効
              <br />
              ・<strong>SG</strong>: <strong>「既存のセキュリティグループを選択する」</strong> → <Code>launch-wizard-1</Code>
            </span>
          </Li>

          <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <p className="text-sm font-medium text-rose-900 dark:text-rose-200">
              ⚠️ SG は「既存」を選ぶ (新規作成しない)
            </p>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              デフォルトだと「セキュリティグループを作成する」が選ばれていて、ルール 1 個 (SSH from マイ IP) しか入らない新 SG を作ろうとする。
              そのままだと <strong>HTTP 80 と Instance Connect 用ルールが無い</strong>状態になり、ブラウザもターミナルも繋がらない。
              <br />
              <br />
              **「既存のセキュリティグループを選択する」** に切り替えて、1 台目で使った{" "}
              <Code>launch-wizard-1</Code> (hokushi-vpc 側) を選ぶ。
              これで 3 ルール (SSH × 2 + HTTP) を 1 台目と共有できる
            </p>
          </div>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.19.47.png"
            alt="2 台目の起動設定 - サブネット 1c + 既存 SG launch-wizard-1"
            width={2560}
            height={1440}
          />

          <Li>
            右下のオレンジボタン <strong>「インスタンスを起動」</strong> をクリック
          </Li>
          <Li>
            EC2 → インスタンス一覧 で <strong>1〜2 分</strong>待ってステータスチェックが <strong>2/2 合格</strong>になるのを確認
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.31.08.png"
            alt="EC2 インスタンス一覧 - 1a と 1c の 2 台が両方 2/2 合格"
            width={2560}
            height={1440}
          />

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            この時点での状態
          </h4>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">名前</th>
                  <th className="px-3 py-2 text-left font-semibold">AZ</th>
                  <th className="px-3 py-2 text-left font-semibold">Public IP</th>
                  <th className="px-3 py-2 text-left font-semibold">index.html</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2 font-mono">hokushi-ec2</td>
                  <td className="px-3 py-2">ap-northeast-1a</td>
                  <td className="px-3 py-2 font-mono">13.113.195.120</td>
                  <td className="px-3 py-2">「I am EC2 1a」 ✓</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">hokushi-ec2-1c</td>
                  <td className="px-3 py-2">ap-northeast-1c</td>
                  <td className="px-3 py-2 font-mono">43.207.49.x</td>
                  <td className="px-3 py-2">
                    <strong>「I am EC2 1a」</strong> ← AMI 由来でまだ 1a と書かれてる
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </Step>

        <Step n="04" title="2 台目の index.html を「I am EC2 1c」に書き換える">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            やることは <strong>Step 01 と全く同じ</strong>。2 台目に接続して、<Code>I am EC2 1a</Code> →{" "}
            <Code>I am EC2 1c</Code> の 1 文字差し替えだけ。
          </p>

          <Li>
            EC2 一覧 → <Code>hokushi-ec2-1c</Code> を選択 → <strong>「接続」</strong> →
            「EC2 Instance Connect」タブ → <strong>「接続」</strong>
          </Li>
          <Li>
            ターミナルで:
            <pre className="mt-2 overflow-x-auto rounded-md bg-zinc-900 px-4 py-3 text-[13px] leading-relaxed text-zinc-100">
              <code>sudo nano /usr/share/nginx/html/index.html</code>
            </pre>
          </Li>
          <Li>
            中身を <strong>「I am EC2 1c」</strong> に書き換え →{" "}
            <Code>Ctrl + O</Code> → <Code>Enter</Code> → <Code>Ctrl + X</Code> で保存して閉じる
          </Li>
          <Li>
            ブラウザで <Code>http://&lt;2 台目の Public IP&gt;</Code> を開いて{" "}
            <strong>「I am EC2 1c」</strong>が出れば成功
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.38.19.png"
            alt="2 台目 (43.207.40.11) のブラウザ表示が I am EC2 1c に変わった"
            width={2552}
            height={1403}
          />

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              ✅ ALB を載せる土台が完成
            </p>
            <div className="mt-3 overflow-hidden rounded-md border border-emerald-200 bg-white dark:border-emerald-900/50 dark:bg-zinc-950">
              <table className="w-full text-sm">
                <thead className="bg-emerald-50/60 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">EC2</th>
                    <th className="px-3 py-2 text-left font-semibold">AZ / サブネット</th>
                    <th className="px-3 py-2 text-left font-semibold">ブラウザ表示</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-200 text-zinc-700 dark:divide-emerald-900/50 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-2 font-mono">hokushi-ec2</td>
                    <td className="px-3 py-2">1a / Public 1a</td>
                    <td className="px-3 py-2">
                      <strong>I am EC2 1a</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono">hokushi-ec2-1c</td>
                    <td className="px-3 py-2">1c / Public 1c</td>
                    <td className="px-3 py-2">
                      <strong>I am EC2 1c</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-emerald-900/80 dark:text-emerald-300">
              これで「ブラウザ更新するたびに 1a と 1c が交互に出る」が成立するための前提が揃った。
              あとは前段に ALB を置いて、2 台に振り分けてもらうだけ。
            </p>
          </div>
        </Step>

        <Step n="05" title="ALB を作る">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            いよいよ本題。EC2 → 左メニュー <strong>「ロードバランサー」</strong> →{" "}
            <strong>「ロードバランサーの作成」</strong> から始める。
            <br />
            タイプ選択画面で <strong>「Application Load Balancer」</strong>を選ぶと、ここから先の設定は
            <strong>「① 基本設定 / ② サブネット / ③ SG / ④ Target Group」</strong>の 4 ブロックに分かれる。
          </p>

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⓪ 入口  ロードバランサーの種類を選ぶ
          </h4>
          <Li>
            EC2 → 左メニュー <strong>「ロードバランサー」</strong> → 一覧画面 (まだ空)
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.42.14.png"
            alt="ロードバランサー一覧 - まだ何もない初期状態"
            width={2560}
            height={1440}
          />

          <Li>
            右上の <strong>「ロードバランサーの作成」</strong>をクリック → タイプ比較画面 → {" "}
            <strong>「Application Load Balancer」</strong>の「作成」ボタンを押す
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.42.28.png"
            alt="ロードバランサーの 3 タイプ比較 - Application / Network / Gateway"
            width={2560}
            height={1440}
          />

          <Note>
            HTTP/HTTPS のような <strong>L7 (アプリケーション層)</strong> で振り分けたいなら ALB。
            TCP/UDP のような <strong>L4 (トランスポート層)</strong> なら NLB。
            VPN や Firewall のような <strong>セキュリティ機器を経由させたい</strong>なら GLB。
            今回は HTTP なので ALB
          </Note>

          <h4 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ① 基本設定 + ② ネットワークマッピング (核心)
          </h4>
          <Li>
            ロードバランサー名: <Code>hokushi-alb</Code>
          </Li>
          <Li>
            スキーム: <strong>インターネット向け</strong> / IP タイプ: <strong>IPv4</strong>
          </Li>
          <Li>
            VPC: <Code>hokushi-vpc</Code> (デフォルトの default VPC のままにしない)
          </Li>
          <Li>
            <strong>マッピング: ap-northeast-1a と ap-northeast-1c の 2 つにチェック</strong>
            <span className="mt-1 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・1a → <Code>hokushi-subnet-public1-1a</Code>
              <br />
              ・1c → <Code>hokushi-subnet-public2-1c</Code>
            </span>
          </Li>

          <Note>
            このページの冒頭で説明した <strong>「ALB はサブネットを 2 つ選ぶだけで作れる」</strong>のド本命部分。
            ここで 1a / 1c の Public Subnet を選ぶ = ALB の ENI が裏で 2 つの AZ に同時配置される
          </Note>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.50.34.png"
            alt="ALB 作成 - 名前/スキーム/VPC とサブネット 2 つ (1a / 1c) を選んだ状態"
            width={2560}
            height={1440}
          />

          <h4 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ③ セキュリティグループ
          </h4>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              💡 「EC2 のときも SG 作ったよね? また作るの?」
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              うん。<strong>ALB には ALB の SG が要る</strong> (EC2 の SG は EC2 にくっついていて流用できない)。
              ALB と EC2 では <strong>受けたい通信が違う</strong>から、ルールも別。
            </p>

            <p className="mt-4 text-sm font-semibold text-amber-900 dark:text-amber-200">
              実用ではこんな中身にする
            </p>

            <div className="mt-2 grid gap-3 md:grid-cols-2">
              {/* ALB SG */}
              <div className="overflow-hidden rounded-md border border-amber-200 bg-white dark:border-amber-900/50 dark:bg-zinc-950">
                <div className="border-b border-amber-200 bg-amber-50/60 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                  ALB の SG (<span className="font-mono">hokushi-alb-sg</span>)
                </div>
                <table className="w-full text-xs">
                  <thead className="text-zinc-500 dark:text-zinc-400">
                    <tr>
                      <th className="px-3 py-1.5 text-left font-medium">ポート</th>
                      <th className="px-3 py-1.5 text-left font-medium">ソース</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 text-zinc-700 dark:divide-amber-900/30 dark:text-zinc-300">
                    <tr>
                      <td className="px-3 py-1.5 font-mono">HTTP 80</td>
                      <td className="px-3 py-1.5 font-mono">0.0.0.0/0</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-mono">HTTPS 443</td>
                      <td className="px-3 py-1.5 text-zinc-500">(HTTPS 化したら追加)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="border-t border-amber-100 px-3 py-1.5 text-[11px] text-zinc-600 dark:border-amber-900/30 dark:text-zinc-400">
                  → 誰でもインターネットから来ていい
                </p>
              </div>

              {/* EC2 SG */}
              <div className="overflow-hidden rounded-md border border-amber-200 bg-white dark:border-amber-900/50 dark:bg-zinc-950">
                <div className="border-b border-amber-200 bg-amber-50/60 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                  EC2 の SG (理想形)
                </div>
                <table className="w-full text-xs">
                  <thead className="text-zinc-500 dark:text-zinc-400">
                    <tr>
                      <th className="px-3 py-1.5 text-left font-medium">ポート</th>
                      <th className="px-3 py-1.5 text-left font-medium">ソース</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100 text-zinc-700 dark:divide-amber-900/30 dark:text-zinc-300">
                    <tr>
                      <td className="px-3 py-1.5 font-mono">HTTP 80</td>
                      <td className="px-3 py-1.5 font-mono font-semibold text-amber-700 dark:text-amber-300">
                        hokushi-alb-sg ★
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-mono">SSH 22</td>
                      <td className="px-3 py-1.5 font-mono">マイ IP</td>
                    </tr>
                  </tbody>
                </table>
                <p className="border-t border-amber-100 px-3 py-1.5 text-[11px] text-zinc-600 dark:border-amber-900/30 dark:text-zinc-400">
                  → ALB からだけ HTTP 受ける + 自分から SSH
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm text-amber-900/80 dark:text-amber-300">
              ★ ポイント: EC2 の HTTP ソースに <strong>ALB の SG を指定</strong>する。
              こうすると EC2 への <strong>直接アクセスは閉まり、ALB 経由でしか到達できない</strong>。
              この絞り込みは <strong>SG が別々であることが前提</strong>なので、最初から分けて作る。
              <br />
              <br />
              (今回のセットアップでは EC2 SG はまだ <Code>0.0.0.0/0</Code> から HTTP 許可しちゃってる。
              絞り込み手順は別途扱う)
            </p>
          </div>

          <h5 className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            手順
          </h5>
          <Li>
            「新しいセキュリティグループを作成」リンクを <strong>別タブで開く</strong>
            (今のタブの ALB 設定を失わないため)
          </Li>
          <Li>
            別タブで SG を作成:
            <span className="mt-1 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・名前: <Code>hokushi-alb-sg</Code>
              <br />
              ・VPC: <Code>hokushi-vpc</Code> ← また default にしない
              <br />
              ・インバウンドルール: <strong>HTTP / 0.0.0.0/0</strong> を 1 個
            </span>
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.53.45.png"
            alt="hokushi-alb-sg の作成 - HTTP/80 を 0.0.0.0/0 から許可"
            width={2560}
            height={1440}
          />

          <Li>
            画面右下「セキュリティグループを作成」をクリック → 緑バナーで作成完了 ↓
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.54.52.png"
            alt="hokushi-alb-sg 作成完了 - SG 詳細ページに遷移"
            width={2560}
            height={1440}
          />

          <Li>
            元の ALB 作成タブに戻る → セキュリティグループのドロップダウン左の{" "}
            <strong>🔄 更新ボタン</strong>を押す → <strong>default を外して</strong>{" "}
            <Code>hokushi-alb-sg</Code> を選択
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.55.33.png"
            alt="ALB タブのセキュリティグループ欄に hokushi-alb-sg が選択された状態"
            width={2560}
            height={1440}
          />

          <h4 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ④ ターゲットグループ (Target Group) を作る
          </h4>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              💡 ターゲットグループ (TG) ってなに?
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              ALB の<strong>「振り分け先リスト」</strong>。
              ALB は「リクエスト来た → TG に渡せ」とだけ知っていて、TG が
              「メンバーは誰々」「今健康なのは誰」を管理する。<strong>役割分担</strong>。
            </p>

            <pre className="mt-3 overflow-x-auto rounded-md bg-white px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
              <code>{`リクエスト → [ALB] → [TG: 振り分け先リスト] ─→ [EC2 1a]
                                          ╰→ [EC2 1c]`}</code>
            </pre>

            <p className="mt-3 text-sm font-semibold text-amber-900 dark:text-amber-200">
              なぜ間接層 (TG) があるのか?
            </p>
            <ul className="mt-1 ml-5 list-disc space-y-1 text-sm text-amber-900/80 dark:text-amber-300">
              <li>
                <strong>ALB を触らず EC2 を入れ替え可能</strong> ── 追加/削除は TG だけ更新
              </li>
              <li>
                <strong>パスごとに違う TG へ振り分けできる</strong> ── 例:{" "}
                <Code>/api/*</Code> → <Code>tg-api</Code>, <Code>/*</Code> → <Code>tg-web</Code>
              </li>
              <li>
                <strong>TG が健康状態を管理</strong> ── 定期チェックで unhealthy な EC2 を自動で名簿から外す
              </li>
            </ul>

            <p className="mt-3 text-sm font-semibold text-amber-900 dark:text-amber-200">
              今回作る TG の中身
            </p>
            <div className="mt-2 overflow-hidden rounded-md border border-amber-200 bg-white dark:border-amber-900/50 dark:bg-zinc-950">
              <table className="w-full text-xs">
                <thead className="bg-amber-50/60 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-medium">項目</th>
                    <th className="px-3 py-1.5 text-left font-medium">値</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-zinc-700 dark:divide-amber-900/30 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-1.5">ターゲットの種類</td>
                    <td className="px-3 py-1.5">インスタンス</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">プロトコル / ポート</td>
                    <td className="px-3 py-1.5 font-mono">HTTP / 80</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">メンバー</td>
                    <td className="px-3 py-1.5 font-mono">hokushi-ec2 (1a), hokushi-ec2-1c (1c)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">ヘルスチェック</td>
                    <td className="px-3 py-1.5 font-mono">GET / → 200 OK</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">アルゴリズム</td>
                    <td className="px-3 py-1.5">Round Robin (順番に均等)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h5 className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            手順 ①  TG 作成画面を開く
          </h5>
          <Li>
            ALB 作成タブ → <strong>「リスナーとルーティング」</strong>セクション →{" "}
            「ターゲットグループの選択」ドロップダウンの下にある{" "}
            <strong>「ターゲットグループの作成 ⤴」</strong>リンクを{" "}
            <strong>⌘ + クリックで別タブで開く</strong>
            <span className="mt-1 ml-1 block text-[13px] text-zinc-500 dark:text-zinc-500">
              (今のタブの ALB 設定は埋めたまま残しておきたいので「別タブ」が大事)
            </span>
          </Li>
          <Li>
            別タブで「ターゲットグループを作成」画面 (まだ空) が開く
          </Li>

          <h5 className="mt-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            手順 ②  基本設定を埋める
          </h5>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            空のフォームに以下の値を入れていく:
          </p>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">項目</th>
                  <th className="px-3 py-2 text-left font-semibold">値</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">ターゲットタイプ</td>
                  <td className="px-3 py-2">
                    <strong>インスタンス</strong>{" "}
                    <span className="text-xs text-zinc-500">(一番最初にここを選ぶ)</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">名前</td>
                  <td className="px-3 py-2 font-mono">hokushi-tg</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">プロトコル / ポート</td>
                  <td className="px-3 py-2 font-mono">HTTP / 80</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">VPC</td>
                  <td className="px-3 py-2 font-mono">hokushi-vpc</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">ヘルスチェック</td>
                  <td className="px-3 py-2">
                    HTTP / パス <Code>/</Code>{" "}
                    <span className="text-xs text-zinc-500">(デフォルトのまま触らない)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-zinc-600 dark:text-zinc-400">
            → 入力できると、こんな状態になる ↓
          </p>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 14.58.27.png"
            alt="TG 基本設定を埋めた直後の画面 - インスタンス + hokushi-tg + HTTP:80 + hokushi-vpc"
            width={2560}
            height={1440}
          />

          <h5 className="mt-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            手順 ③  「次へ」 → ターゲット (EC2) を 2 台登録
          </h5>
          <Li>
            画面下までスクロール → 右下の <strong>「次へ」</strong> をクリック
          </Li>
          <Li>
            <strong>「利用可能なインスタンス」</strong>に EC2 一覧が出る → {" "}
            <Code>hokushi-ec2</Code> と <Code>hokushi-ec2-1c</Code> の<strong>左のチェックボックスを ✓</strong>
          </Li>
          <Li>
            下の「以下に対して選択したインスタンスを含めるためのポート」が{" "}
            <strong>80</strong> になっているのを確認 → <strong>「保留中として以下を含める」</strong> ボタンをクリック
          </Li>
          <Li>
            下の <strong>「ターゲット」テーブル</strong>に 2 台が並んだのを確認 ↓
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.02.13.png"
            alt="2 台の EC2 をターゲットに登録した状態 (ap-northeast-1a と 1c)"
            width={2560}
            height={1440}
          />

          <h5 className="mt-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            手順 ④  確認 & 作成
          </h5>
          <Li>
            「次へ」 → <strong>「確認と作成」</strong>ページで、設定 (ステップ 1 + ステップ 2) の最終確認ができる
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.04.08.png"
            alt="TG 作成の最終確認 - 名前 hokushi-tg / VPC hokushi-vpc / ターゲット 2 台が並ぶ"
            width={2560}
            height={1440}
          />

          <Li>
            画面右下のオレンジボタン <strong>「ターゲットグループの作成」</strong>をクリック
          </Li>
          <Li>
            緑のバナー <strong>「ターゲットグループ hokushi-tg が正常に作成されました」</strong>{" "}
            が出て、TG 詳細ページに遷移する ↓
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.05.10.png"
            alt="hokushi-tg 作成完了 - 詳細ページに遷移、登録済みターゲット 2 台が unused 状態"
            width={2560}
            height={1440}
          />

          <Note>
            この時点で ターゲットのヘルスステータスは <strong>「unused」</strong>と表示される。
            まだ ALB に紐づけてないので、ヘルスチェックが走っていない状態。問題ない
          </Note>

          <h4 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ⑤ ALB タブに戻って作成
          </h4>
          <Li>
            ALB タブに戻る → 「リスナーとルーティング」セクションの ターゲットグループ ドロップダウン左の{" "}
            <strong>🔄 更新</strong>ボタン → <Code>hokushi-tg</Code> を選択
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.06.19.png"
            alt="ALB タブのリスナー欄に hokushi-tg が選択された状態"
            width={2560}
            height={1440}
          />

          <Li>
            画面下までスクロール → <strong>「概要」</strong>セクションで全項目を最終確認:
            <span className="mt-1 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・VPC: <Code>hokushi-vpc</Code>
              <br />
              ・マッピング: 1a + 1c の Public サブネット
              <br />
              ・セキュリティグループ: <Code>hokushi-alb-sg</Code>
              <br />
              ・リスナー: HTTP:80 → <Code>hokushi-tg</Code>
            </span>
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.06.52.png"
            alt="ALB 作成前の概要セクション - 全設定の最終確認画面"
            width={2560}
            height={1440}
          />

          <Li>
            右下オレンジ <strong>「ロードバランサーの作成」</strong>をクリック
          </Li>
          <Li>
            ALB 詳細ページに遷移 → ステータスが <strong>🟡 プロビジョニング中</strong>になる ↓
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.08.34.png"
            alt="ALB 作成直後 - ステータス「プロビジョニング中」"
            width={2560}
            height={1440}
          />

          <Li>
            約 <strong>2〜3 分</strong>後にページを 🔄 リロード → ステータスが{" "}
            <strong>🟢 アクティブ</strong>になる ↓
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.11.38.png"
            alt="ALB hokushi-alb がアクティブになった状態 - DNS 名が確認できる"
            width={2560}
            height={1440}
          />

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              💡 DNS 名はどこ?
            </p>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              ALB 詳細ページの「詳細」セクション内、ARN のすぐ下に <strong>「DNS 名」</strong>欄がある。
              <br />
              形式: <Code>hokushi-alb-XXXXXXXXXX.ap-northeast-1.elb.amazonaws.com</Code>
              <br />
              これが「アプリの入口の住所」。Public IP は AWS が裏で勝手に付け替えるので、
              <strong>固定された名前は DNS 名のみ</strong>。Route 53 でカスタムドメインを当てるときも、A レコードで「Alias → この DNS 名」と指定する
            </p>
          </div>
        </Step>

        <Step n="06" title="動作確認 — ブラウザ更新で 1a と 1c が交互に出る">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ALB がアクティブになっただけではまだ。<strong>ターゲットがヘルスチェックに合格</strong>
            してから初めて振り分けが動く。
          </p>

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ① ヘルスチェック合格を確認
          </h4>
          <Li>
            左メニュー「ターゲットグループ」 → <Code>hokushi-tg</Code> → 「ターゲット」タブ
          </Li>
          <Li>
            2 台のヘルスステータスを確認:
            <span className="mt-1 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・🟡 <Code>initial</Code> → まだチェック中 (30 秒〜1 分待つ)
              <br />
              ・🟢 <strong>healthy</strong> → 準備完了!
              <br />
              ・🔴 <Code>unhealthy</Code> → SG / nginx / パスをチェック
            </span>
          </Li>

          <Screenshot
            src="/aws/alb/スクリーンショット 2026-06-04 15.13.06.png"
            alt="hokushi-tg のターゲット 2 台が両方 healthy になった状態"
            width={2560}
            height={1440}
          />

          <Note>
            <strong>ヘルスチェックとは:</strong> ALB が EC2 に定期的に
            <Code>GET http://&lt;EC2&gt;:80/</Code> を打って、200 OK が返るかを確認する仕組み。
            今回は nginx が <Code>index.html</Code> を返すので、デフォルトのパス <Code>/</Code> で通る
          </Note>

          <h4 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ② ブラウザで DNS 名にアクセス
          </h4>
          <Li>
            アドレスバーに以下を入力 (頭の <Code>http://</Code> を忘れずに):
            <pre className="mt-2 overflow-x-auto rounded-md bg-zinc-900 px-4 py-3 text-[13px] leading-relaxed text-zinc-100">
              <code>http://hokushi-alb-XXXXXXXXXX.ap-northeast-1.elb.amazonaws.com</code>
            </pre>
          </Li>
          <Li>
            ⚠️ HTTPS リスナーは作っていないので <strong>https:// で開いても繋がらない</strong>
          </Li>

          <h4 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            ③ Shift + Cmd + R を連打
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            **スーパーリロード**を 10 回くらい連打すると:
          </p>
          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[14px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <code>{`I am EC2 1a
I am EC2 1c
I am EC2 1a
I am EC2 1c
...`}</code>
          </pre>
          <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            と交互に切り替わる ← <strong>ALB のラウンドロビン振り分けが動いている証拠</strong>。
            完全に 1:1 でなくキャッシュ等で偏ることもあるが、数回更新すれば両方出る
          </p>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
              🎉 ALB 構築完了
            </p>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              「1 つの DNS 名」「裏で 2 台に振り分け」「片方落ちてももう片方が応答」
              という典型的なロードバランサー構成を <strong>サブネットを 2 つ選ぶだけ</strong>で実現できた。
              ここまでが ALB の最小構成体験。
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-1 text-sm text-emerald-900/80 dark:text-emerald-300">
              <li>
                <strong>水平スケール</strong>: EC2 を 3 台 4 台と増やせば、同じ DNS のまま負荷分散される
              </li>
              <li>
                <strong>耐障害性</strong>: 1a の EC2 を停止しても 1c に流れる (ヘルスチェックが unhealthy 判定する)
              </li>
              <li>
                <strong>固定の入口</strong>: 入口は変わらず DNS 名 1 つ。中身の EC2 が入れ替わっても外から見えない
              </li>
            </ul>
          </div>
        </Step>

        <details className="group rounded-lg border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
          <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 text-base font-bold text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300">
            <svg
              className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-90"
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
            <span>💡 補足: Route 53 を使うときって?</span>
          </summary>

          <div className="flex flex-col gap-5 px-5 pb-5 pt-2">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            「ALB が自動で DNS 作るなら、Route 53 って何のため?」というよくある疑問。
            答えは <strong>9 割が「独自ドメインを使いたいから」</strong>。
          </p>

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            AWS の自動 DNS は本番で使い物にならない
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ALB を作ると AWS が自動で発行してくれる DNS:
          </p>
          <pre className="overflow-x-auto rounded-md bg-zinc-900 px-4 py-3 text-[12px] leading-relaxed text-zinc-100">
            <code>hokushi-alb-1719683356.ap-northeast-1.elb.amazonaws.com</code>
          </pre>
          <ul className="ml-5 list-disc space-y-1 text-[14px] text-zinc-600 dark:text-zinc-400">
            <li>長い、覚えられない</li>
            <li>ブランド感ゼロ</li>
            <li>「AWS で動いてる」がバレバレ (<Code>elb.amazonaws.com</Code> で分かる)</li>
            <li>SEO・信頼感もマイナス</li>
          </ul>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            本番で使いたいのは <Code>www.your-app.com</Code> や <Code>api.your-app.com</Code>。
            <br />
            この「自分のドメイン」を ALB に繋ぐのが <strong>Route 53 の主な仕事</strong>。
          </p>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            構造で見ると
          </h4>
          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <code>{`ユーザー: https://www.your-app.com
       ↓ DNS 解決
[Route 53]: www.your-app.com → hokushi-alb-XXXX.elb.amazonaws.com (Alias)
       ↓ さらに DNS 解決
[AWS の DNS]: hokushi-alb-XXXX → 52.x.x.x, 13.x.x.x
       ↓ HTTP 接続
[ALB] → [TG] → [EC2 1a / 1c]`}</code>
          </pre>
          <p className="text-[14px] text-zinc-600 dark:text-zinc-400">
            Route 53 は <strong>「自分のドメイン」と「AWS の DNS 名」を繋ぐ橋渡し</strong>
          </p>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Route 53 が活きる場面
          </h4>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">場面</th>
                  <th className="px-3 py-2 text-left font-semibold">Route 53 を使う理由</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">
                    <strong>独自ドメインを ALB に当てたい</strong>
                  </td>
                  <td className="px-3 py-2">⭐ メインの用途</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">ルートドメインを使いたい (<Code>your-app.com</Code> 自体)</td>
                  <td className="px-3 py-2">
                    普通の CNAME はルートに置けない (DNS RFC 制約)。Route 53 の{" "}
                    <strong>Alias レコード</strong>だけが特別にこれを許す
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">HTTPS 化したい</td>
                  <td className="px-3 py-2">
                    ACM (AWS の無料 SSL 証明書) のドメイン所有検証が <strong>ボタン 1 個</strong>で済む
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">複数のサブドメインを管理したい</td>
                  <td className="px-3 py-2">
                    <Code>www</Code>, <Code>api</Code>, <Code>admin</Code>, <Code>staging</Code>... を 1 箇所で管理
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">メール (MX レコード)</td>
                  <td className="px-3 py-2">Google Workspace 等の設定もここで一括</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">地理ベース / 重み付けルーティング</td>
                  <td className="px-3 py-2">
                    「日本のユーザーは東京 ALB、米国はバージニア ALB」みたいな分岐
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">DNS フェイルオーバー</td>
                  <td className="px-3 py-2">プライマリ ALB が落ちたら DR リージョンに自動切替</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">A/B テスト・カナリアリリース</td>
                  <td className="px-3 py-2">「90% を旧 ALB、10% を新 ALB に流す」</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            なぜ「Alias レコード」が特別なのか (寄り道)
          </h4>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            普通の DNS には:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-[14px] text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>A レコード</strong>: 名前 → IP (<Code>www → 52.x.x.x</Code>)
            </li>
            <li>
              <strong>CNAME レコード</strong>: 名前 → 別の名前 (<Code>www → other-name.com</Code>)
            </li>
          </ul>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            でも問題が:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-[14px] text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>A は IP 直書き</strong> → ALB の IP は変わるので使えない
            </li>
            <li>
              <strong>CNAME はルートドメイン (<Code>your-app.com</Code>) に使えない</strong> ← DNS の仕様
            </li>
            <li>なので「ALB を <Code>your-app.com</Code> のルートに当てたい」が普通の DNS でできない</li>
          </ul>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ここで Route 53 の <strong>Alias レコード</strong>:
          </p>
          <ul className="ml-5 list-disc space-y-1 text-[14px] text-zinc-700 dark:text-zinc-300">
            <li>見た目は A レコード (ルートでも OK)</li>
            <li>中身は CNAME 的 (IP じゃなく ALB の DNS 名を指す)</li>
            <li>
              <strong>AWS が裏で解決して、その時の正しい IP を返す</strong>
            </li>
          </ul>
          <Note>
            Alias は Route 53 (と CloudFront 等 AWS のサービス間) でしかできない特別技。
            <strong>ルートドメインを ALB に当てたい瞬間、Route 53 がほぼ必須</strong>になる
          </Note>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            結論
          </h4>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">シーン</th>
                  <th className="px-3 py-2 text-left font-semibold">必要なもの</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">学習・社内検証・開発環境</td>
                  <td className="px-3 py-2">
                    <strong>AWS 自動 DNS だけで OK</strong> ← 今回
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    本番で <Code>your-app.com</Code> に当てたい
                  </td>
                  <td className="px-3 py-2">
                    <strong>Route 53 が必須</strong> (または お名前.com 等 + 手動設定)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">HTTPS 化したい</td>
                  <td className="px-3 py-2">
                    <strong>Route 53 推奨</strong> (ACM 検証がラク)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">高度な振り分け (地理 / フェイルオーバー)</td>
                  <td className="px-3 py-2">
                    <strong>Route 53 一択</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </details>
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
