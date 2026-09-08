import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsRdsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          RDS で DB を立てる
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          手元の <code>management-app</code> の PostgreSQL を、作った VPC の Private サブネットに移す。
          まずはセキュリティグループを作るところまで
        </p>
      </header>

      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          RDS とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>RDS (Relational Database Service)</strong> = AWS が面倒を見てくれる
          <strong>マネージドなリレーショナル DB</strong>。PostgreSQL / MySQL などのエンジンを選ぶと、
          その DB が動くサーバごと用意される。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          EC2 に自分で PostgreSQL を入れても DB は動く。RDS との違いは、
          <strong>バックアップ・パッチ当て・障害時の切り替え・監視</strong>を AWS 側が持ってくれること。
          代わりに OS には触れない (SSH で入れない) ので、DB サーバそのものをいじりたい用途には向かない。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          今回のゴール
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          ローカルの docker-compose で動いている <Code>postgres:17</Code> を RDS に置き換える。
          DB は <strong>Private サブネット</strong>に置き、インターネットからは一切見えない状態にする。
        </p>

        <Details summary="なぜ ECS は Private ではなく Public に置くのか">
          <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            本来 ECS も Private に置きたい。ただし Private サブネットは
            <strong>ルートテーブルに <Code>0.0.0.0/0</Code> の出口がない</strong>ので、そのままだと外に出られない。
          </p>
          <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            RDS は外向き通信をしないので Private のままで問題ない。
            一方 ECS (Fargate) は起動時に <strong>ECR からイメージを pull</strong> し、
            <strong>CloudWatch Logs</strong> や <strong>Secrets Manager</strong> にも喋る。
            出口がないとタスクが起動せずに落ち続ける。
          </p>
          <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            出口を作る方法は 3 つあって、コストが違う:
          </p>
          <ul className="ml-1 flex flex-col gap-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>NAT Gateway を置く</strong> — 一番素直だが時間課金 + 転送量課金で検証には高い
            </li>
            <li>
              ・<strong>VPC エンドポイントを並べる</strong> — ECR api / ECR dkr / Logs / Secrets の
              Interface 型を各種 + S3 の Gateway 型。Interface は 1 個ずつ時間課金
            </li>
            <li>
              ・<strong>Public サブネットに置いて <Code>assignPublicIp: ENABLED</Code></strong> —
              追加費用ゼロ。SG で「ALB からだけ」に絞れば外から直接は叩けない
            </li>
          </ul>
          <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            今回は学習・検証目的なので 3 番目を選んだ。
            本番なら NAT か VPC エンドポイントにして、ECS も Private に落とす。
          </p>
        </Details>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          手順
        </h2>

        <Step n="01" title="既存の VPC が条件を満たしているか確認する">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            新しく VPC は作らず、前に作った <Code>hokushi-vpc</Code> をそのまま使う。
            RDS を置く前に、サブネットの並びを見ておく。
          </p>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">用途</th>
                  <th className="px-3 py-2 text-left font-semibold">AZ</th>
                  <th className="px-3 py-2 text-left font-semibold">CIDR</th>
                  <th className="px-3 py-2 text-left font-semibold">外への出口</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">public1</td>
                  <td className="px-3 py-2 font-mono">1a</td>
                  <td className="px-3 py-2 font-mono">10.0.0.0/20</td>
                  <td className="px-3 py-2">IGW あり</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">public2</td>
                  <td className="px-3 py-2 font-mono">1c</td>
                  <td className="px-3 py-2 font-mono">10.0.16.0/20</td>
                  <td className="px-3 py-2">IGW あり</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">private1</td>
                  <td className="px-3 py-2 font-mono">1a</td>
                  <td className="px-3 py-2 font-mono">10.0.128.0/20</td>
                  <td className="px-3 py-2">なし (local のみ)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">private2</td>
                  <td className="px-3 py-2 font-mono">1c</td>
                  <td className="px-3 py-2 font-mono">10.0.144.0/20</td>
                  <td className="px-3 py-2">なし (local のみ)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Li>
            Private が <strong>1a と 1c の 2 つの AZ に分かれている</strong> → RDS の条件を満たしている
          </Li>
          <Li>
            NAT Gateway は無い → ECS の置き場所に影響する (上の折りたたみ参照)。RDS には影響なし
          </Li>

          <Details summary="RDS は「使う AZ が 1 つ」でもサブネットを 2 AZ 分要求してくる">
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              RDS は <strong>DB サブネットグループ</strong>という「この範囲に置いていいですよ」という
              サブネットの束を先に登録し、そこから 1 つ選んで DB を置く。
              このサブネットグループが <strong>常に 2 つ以上の AZ を含むこと</strong>を要求される。
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              単一 AZ で作る場合でも同じ。理由は、あとから
              <strong>Multi-AZ (別 AZ に自動で待機系を持つ構成) に切り替えられる</strong>ようにしておくため。
              待機系を置く先が無いと切り替えができないので、最初から場所だけ確保させられる。
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              なので今回も private1 / private2 の両方を登録するが、
              実際に DB が立つのは片方 (1a) だけ。private2 は空のまま待機する。
            </p>
          </Details>
        </Step>

        <Step n="02" title="セキュリティグループを 4 つ作る">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            RDS 本体より先にセキュリティグループ (SG) を作る。
            RDS の作成ウィザードの途中で SG を選ぶ欄が出てくるので、
            そこまでに用意できていないと「一旦 default で作って後で直す」という二度手間になる。
          </p>

          <SubHeading>作る順番</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            SG のルールは <strong>他の SG を名指しで参照できる</strong>。
            参照するには相手が既に存在している必要があるので、
            <strong>参照される側から順に</strong>作る。
          </p>
          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white p-3 font-mono text-[11px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`① alb-sg  →  ② ecs-sg  →  ③ bastion-sg  →  ④ rds-sg
                                              ↑ ②③ を参照するので最後`}
          </pre>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            今日ルールを入れるのは <strong>④ rds-sg だけ</strong>。
            ①②③ は空の箱として先に作っておく (ALB を立てるときにルールを足す)。
          </p>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">SG 名</th>
                  <th className="px-3 py-2 text-left font-semibold">今日のインバウンド</th>
                  <th className="px-3 py-2 text-left font-semibold">後で足すもの</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-alb-sg</td>
                  <td className="px-3 py-2">なし</td>
                  <td className="px-3 py-2">80 / 443 ← 0.0.0.0/0</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-ecs-sg</td>
                  <td className="px-3 py-2">なし</td>
                  <td className="px-3 py-2">4000 ← alb-sg</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-bastion-sg</td>
                  <td className="px-3 py-2">なし</td>
                  <td className="px-3 py-2">—</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-rds-sg</td>
                  <td className="px-3 py-2">5432 ← bastion-sg / ecs-sg</td>
                  <td className="px-3 py-2">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Details summary="踏み台の SG がインバウンド空でいい理由">
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              普通、踏み台サーバといえば <strong>22 番 (SSH) を自分の IP に開ける</strong>もの。
              今回はそれをやらない。
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              代わりに <strong>SSM Session Manager</strong> を使う。これはサーバ側にインストールされた
              SSM エージェントが <strong>AWS 側へ外向きに接続を張って待つ</strong>方式で、
              手元からはその通り道を借りてサーバに入る。
              <strong>外から入ってくる通信が発生しないので、開けるポートが 1 つも要らない</strong>。
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              22 番を世界に開けない = ポートスキャンにも総当たりにも引っかからない。
              鍵ファイルの管理も要らず、誰がいつ入ったかは CloudTrail に残る。
            </p>
          </Details>

          <SubHeading>作成画面の入力</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            VPC コンソール → 左メニュー「セキュリティ」→「セキュリティグループ」→「セキュリティグループを作成」。
            4 回とも同じ画面を使う。下は 4 つ目の rds-sg を作っているところ。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 16.57.37.png"
            alt="セキュリティグループ作成画面 - management-app-rds-sg の基本設定とインバウンドルール"
            width={3012}
            height={1810}
          />

          <Field name="セキュリティグループ名">
            <Code>management-app-rds-sg</Code> のように <strong>何のための SG か分かる名前</strong>にする。
            画面にも書いてあるとおり <strong>作成後に変更できない</strong>ので打ち間違いに注意
          </Field>

          <Field name="説明">
            <strong>必須項目</strong>で、こちらも<strong>あとから変更できない</strong>。
            日本語は入らない (ASCII のみ) ので <Code>RDS PostgreSQL for management-app</Code> のように英語で書く
          </Field>

          <Field name="VPC">
            <strong>毎回必ず確認する。</strong> デフォルトでは別の VPC (アカウント作成時からある
            <Code>172.31.0.0/16</Code> のデフォルト VPC) が選ばれていることがある。
            <Code>vpc-072cb323e93e2ec90 (hokushi-vpc)</Code> になっているかを見る。
            SG は VPC をまたげないので、ここを間違えると RDS の作成画面で候補に出てこない
          </Field>

          <Field name="インバウンドルール">
            「ルールを追加」で 2 本入れる。<strong>タイプで PostgreSQL を選ぶ</strong>と
            プロトコル TCP / ポート 5432 が自動で埋まってグレーアウトする。
            ソースは <strong>「カスタム」</strong>を選び、右の欄に SG 名を打って候補から選ぶ
          </Field>

          <Li>
            アウトバウンドルールは<strong>触らない</strong>。デフォルトの「すべてのトラフィック / 0.0.0.0/0」のままでよい
          </Li>

          <SubHeading>4 つできた状態</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 16.58.15.png"
            alt="セキュリティグループ一覧 - management-app 用の 4 つが作成された状態"
            width={3012}
            height={1810}
          />

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            一覧に 6 件出ているうち、<Code>default</Code> の 2 件は
            VPC を作ると自動で付いてくるもの (hokushi-vpc の分とデフォルト VPC の分)。
            今回作ったのは残りの 4 件。
          </p>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">SG 名</th>
                  <th className="px-3 py-2 text-left font-semibold">SG ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-alb-sg</td>
                  <td className="px-3 py-2 font-mono">sg-01792a79df6ac4d19</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-ecs-sg</td>
                  <td className="px-3 py-2 font-mono">sg-0f9f4a3f03ce8b91e</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-bastion-sg</td>
                  <td className="px-3 py-2 font-mono">sg-04f7bf754304d0282</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">management-app-rds-sg</td>
                  <td className="px-3 py-2 font-mono">sg-018ad8e9be0f8bbc2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Step>

        <Step n="03" title="DB サブネットグループを作る">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            RDS は「このサブネットのどれかに置いていいですよ」という
            <strong>サブネットの束</strong>を先に登録しておく必要がある。それが DB サブネットグループ。
            RDS 本体の作成画面ではこれを選ぶだけなので、先に作っておく。
          </p>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            RDS コンソール → 左メニュー <strong>「サブネットグループ」</strong> →
            <strong>「DB サブネットグループを作成」</strong>。まだ 1 つも無い状態から始める。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.17.07.png"
            alt="RDS サブネットグループ一覧 - まだ 0 件の状態"
            width={3012}
            height={1810}
          />

          <SubHeading>作成画面の入力</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.18.37.png"
            alt="DB サブネットグループ作成画面 - private サブネット 2 つを選択したところ"
            width={3012}
            height={1810}
          />

          <Field name="名前">
            <Code>management-app-subnet-group</Code>。
            SG と同じく<strong>作成後は変更できない</strong>
          </Field>

          <Field name="説明">
            <Code>Private subnets for management-app RDS</Code>。
            SG の説明欄と違い、こちらは<strong>あとから編集できる</strong>
          </Field>

          <Field name="VPC">
            <Code>hokushi-vpc (vpc-072cb323e93e2ec90)</Code> を選ぶ。
            選ぶと下に <strong>「4 サブネット, 2 アベイラビリティーゾーン」</strong>と出る。
            この数字が想定と合っていれば VPC の選び間違いはない。
            <strong>作成後に別の VPC には変えられない</strong>
          </Field>

          <Field name="アベイラビリティーゾーン">
            <Code>ap-northeast-1a</Code> と <Code>ap-northeast-1c</Code> の両方を選ぶ。
            ここで選んだ AZ に属するサブネットだけが、下のサブネット欄の候補に出てくる
          </Field>

          <Field name="サブネット">
            <strong>private の 2 つだけ</strong>を選ぶ。
            <Code>hokushi-subnet-private1-ap-northeast-1a</Code> (10.0.128.0/20) と
            <Code>hokushi-subnet-private2-ap-northeast-1c</Code> (10.0.144.0/20)。
            選択済みのものは Subnet ID と CIDR 付きのカードで下に並ぶので、
            <strong>10.0.128 / 10.0.144 の 2 枚だけ</strong>になっているかを目視で確認する
          </Field>

          <SubHeading>できた状態</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.20.35.png"
            alt="サブネットグループ一覧 - management-app-subnet-group がステータス「完了」で作成された"
            width={3012}
            height={1810}
          />

          <Li>
            この時点ではまだ <strong>「置いていい場所」を宣言しただけ</strong>で、
            DB もお金も発生していない
          </Li>
        </Step>

        <Step n="04" title="RDS 本体を作る">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ここまでで「入れ物」は揃った。あとは DB 本体を作るだけ。
            ウィザードは項目が多いので、画面の上から順に見ていく。
          </p>

          <SubHeading>入口 — 3 つの作成方法</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            RDS コンソール → <strong>「データベース」</strong> →
            <strong>「データベースの作成」</strong>。押すとメニューが 3 つ出る。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.27.46.png"
            alt="データベースの作成メニュー - エクスプレス設定 / フル設定 / S3 から復元"
            width={3012}
            height={1810}
          />

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">選択肢</th>
                  <th className="px-3 py-2 text-left font-semibold">中身</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">エクスプレス設定</td>
                  <td className="px-3 py-2">AWS が大半を自動で決める。サブネットグループも SG も選べない</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">フル設定</td>
                  <td className="px-3 py-2 font-semibold">全項目を自分で指定できる。今回はこれ</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">S3 から復元</td>
                  <td className="px-3 py-2">S3 に置いたバックアップから復元する用</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Li>
            エクスプレス設定だと、せっかく作った <Code>management-app-subnet-group</Code> と
            <Code>management-app-rds-sg</Code> を指定できず、デフォルト VPC に作られてしまう
          </Li>

          <SubHeading>エンジンとテンプレート</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.30.31.png"
            alt="エンジンのオプション - PostgreSQL / フル設定 / サンドボックスを選択した状態"
            width={3012}
            height={1810}
          />

          <Field name="エンジンのタイプ">
            <strong>PostgreSQL</strong>
          </Field>

          <Field name="テンプレート">
            <strong>サンドボックス</strong>を選ぶ。初期値の<strong>「本番稼働用」のままだと危ない</strong>
          </Field>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">テンプレート</th>
                  <th className="px-3 py-2 text-left font-semibold">デフォルトで何が変わるか</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">本番稼働用</td>
                  <td className="px-3 py-2">
                    マルチ AZ (= インスタンス 2 台で<strong>料金ほぼ 2 倍</strong>) / 削除保護オン / ストレージ大きめ
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">開発/テスト</td>
                  <td className="px-3 py-2">単一 AZ。ほどよい中間</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">サンドボックス</td>
                  <td className="px-3 py-2 font-semibold">
                    いちばん軽い。高いインスタンスクラスが選べないよう制限もかかる
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Li>
            テンプレートを切り替えると下の項目が一括で書き換わる。
            変えたあとに<strong>「可用性と耐久性」が「単一 DB インスタンス」</strong>になっているか必ず見る
          </Li>

          <SubHeading>設定 — ここで 2 つ引っかかった</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            初期状態はこうなっていた。2 箇所直す必要がある。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.30.53.png"
            alt="設定セクションの初期状態 - マルチ AZ フィルタが ON で PostgreSQL 18 が選ばれている"
            width={3012}
            height={1810}
          />

          <Field name="① マルチ AZ DB クラスターをサポートするバージョンのみを表示 → OFF">
            トグルが ON になっている。これは<strong>バージョン一覧の絞り込みフィルタ</strong>で、
            ON のままだと Multi-AZ クラスター対応版しか候補に出ず、<strong>17 系が選べない</strong>
          </Field>

          <Field name="② エンジンバージョン → 17 系に">
            初期値は <Code>PostgreSQL 18.3-R2</Code>。
            ローカルの docker-compose が <Code>postgres:17</Code> なので<strong>合わせる</strong>。
            バージョン差で挙動が変わったときに「ローカルでは動くのに」と悩む余地を減らせる
          </Field>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            直したあとがこちら。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.32.18.png"
            alt="設定セクション - フィルタ OFF / PostgreSQL 17.11-R1 / management-app-db"
            width={3012}
            height={1810}
          />

          <Field name="RDS 延長サポートの有効化">
            <strong>チェックを外したまま</strong>。これは標準サポートが切れた古いバージョンを
            使い続けるための<strong>有料</strong>オプション。17 系ならまだ標準サポート内なので不要
          </Field>

          <Field name="DB インスタンス識別子">
            初期値 <Code>database-1</Code> を <Code>management-app-db</Code> に変更
          </Field>

          <Field name="マスターユーザー名">
            <Code>postgres</Code>。ローカルと揃えておく
          </Field>

          <Field name="認証情報管理">
            <strong>AWS Secrets Manager で管理</strong>を選ぶ。
            パスワードを自分で決めずに AWS が生成・保管してくれる。
            あとで ECS のタスク定義から<strong>シークレットを直接参照できる</strong>ので、
            <Code>DATABASE_URL</Code> にパスワードを直書きせずに済む
          </Field>

          <SubHeading>インスタンスとストレージ</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.35.10.png"
            alt="インスタンスタイプとストレージ - db.t4g.micro / gp3 20GiB"
            width={2550}
            height={1368}
          />

          <Field name="インスタンスタイプ">
            <Code>db.t4g.micro</Code> (2 vCPU / 1 GiB)。
            <Code>db.t3.micro</Code> も候補に出るが、<strong>t4g (Graviton / ARM) の方が安い</strong>。
            RDS は中身がマネージドなので CPU アーキテクチャの違いを意識する必要はない
          </Field>

          <Field name="ストレージ">
            汎用 SSD (gp3) / <strong>20 GiB</strong>。
            IOPS 3000・スループット 125 がグレーで固定なのは、
            gp3 の 400 GiB 未満に含まれる<strong>ベースライン分</strong>。追加料金はかからない
          </Field>

          <Field name="ストレージの自動スケーリング">
            <strong>チェックを外す</strong>。容量が逼迫すると勝手に増やしてくれる機能だが、
            <strong>増えた分は自動で減らないので課金が戻らない</strong>
          </Field>

          <SubHeading>接続 — いちばん重要</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.36.53.png"
            alt="接続セクション - VPC / サブネットグループ / パブリックアクセスなし / SG"
            width={2550}
            height={1368}
          />

          <Field name="コンピューティングリソース">
            <strong>「EC2 コンピューティングリソースに接続しない」</strong>を選ぶ。
            接続する方を選ぶと <strong>AWS が SG を勝手に新規作成して両側に付ける</strong>ので、
            Step 02 で整理した構成が崩れる
          </Field>

          <Field name="VPC / DB サブネットグループ">
            <Code>hokushi-vpc</Code> → <Code>management-app-subnet-group</Code> の順に選ぶ。
            <strong>VPC を選ばないとサブネットグループの候補が出ない</strong>。
            候補に出てこない場合は VPC を間違えている。
            なお <strong>VPC は作成後に変更できない</strong>
          </Field>

          <Field name="パブリックアクセス">
            <strong>なし</strong>。RDS にグローバル IP を振らない設定。
            これで<strong>手元の PC からは繋がらなくなる</strong>が、想定どおり。
            あとで踏み台 + SSM ポートフォワードで繋ぐ
          </Field>

          <Field name="VPC セキュリティグループ">
            「既存の選択」→ <Code>management-app-rds-sg</Code>。
            <strong>初期状態で入っている <Code>default</Code> を × で外すこと。</strong>
            足すだけだと<strong>併用</strong>になり、default は VPC 内から広く通すので絞った意味がなくなる
          </Field>

          <Field name="RDS Proxy">
            <strong>チェックしない</strong>。コネクションプールを管理してくれる機能だが追加料金がかかる
          </Field>

          <SubHeading>モニタリング</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.37.45.png"
            alt="モニタリング - Database Insights 標準 / 拡張モニタリングとログエクスポートはオフ"
            width={2550}
            height={1368}
          />

          <Field name="Database Insights">
            <strong>標準</strong>のままで OK。
            <strong>標準モード + 7 日保持は無料</strong>と画面に明記されている。
            クエリごとのメトリクスが見えるので有効のままにしておく。
            有料なのは <strong>Advanced モード</strong>と、保持期間を 7 日より延ばした場合
          </Field>

          <Field name="拡張モニタリング / ログのエクスポート">
            どちらも<strong>オフ</strong>。ログのエクスポートを選ぶと
            CloudWatch Logs に流れて課金対象になる
          </Field>

          <SubHeading>追加設定 — 最大の落とし穴</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.42.11.png"
            alt="追加設定 - 最初のデータベース名に management_app を入力"
            width={2550}
            height={1368}
          />

          <Field name="最初のデータベース名">
            <Code>management_app</Code> を<strong>必ず入れる</strong>。
            画面にも「データベース名を指定しないと、Amazon RDS はデータベースを作成しません」と書いてある。
            RDS が用意するのは <strong>PostgreSQL が動くサーバまで</strong>で、中の DB は自動では作られない。
            空欄だと接続はできるのに <Code>database &quot;management_app&quot; does not exist</Code> で弾かれ、
            原因に気づきにくい。ローカルの docker-compose の
            <Code>POSTGRES_DB: management_app</Code> に対応する項目
          </Field>

          <Field name="DB パラメータグループ">
            <Code>default.postgres17</Code> のまま。
            <strong>17 系で作られていることの確認</strong>にもなる
          </Field>

          <Field name="バックアップ">
            自動バックアップ有効 / 保持期間 <strong>1 日</strong>。
            バックアップウィンドウは指定なし。
            <strong>バックアップレプリケーション</strong>は別リージョンにコピーする機能で課金対象なのでオフ
          </Field>

          <SubHeading>メンテナンスと作成</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.42.31.png"
            alt="メンテナンスセクションと「データベースの作成」ボタン"
            width={2550}
            height={1368}
          />

          <Field name="マイナーバージョン自動アップグレード">
            有効のまま。パッチレベルの更新を AWS が当ててくれる
          </Field>

          <Field name="削除保護">
            <strong>チェックを外す</strong>。検証用なのであとで気軽に消せるようにしておく。
            有効だと削除時に一度設定変更が必要になる
          </Field>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ここまで確認して <strong>「データベースの作成」</strong>を押す。
          </p>

          <SubHeading>作成中</SubHeading>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-07 17.43.07.png"
            alt="データベース一覧 - management-app-db が「作成中」の状態"
            width={2550}
            height={1368}
          />

          <SubHeading>できた構成</SubHeading>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">項目</th>
                  <th className="px-3 py-2 text-left font-semibold">値</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">識別子</td>
                  <td className="px-3 py-2 font-mono">management-app-db</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">エンジン</td>
                  <td className="px-3 py-2 font-mono">PostgreSQL 17.11</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">インスタンス</td>
                  <td className="px-3 py-2 font-mono">db.t4g.micro / 単一 AZ</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">ストレージ</td>
                  <td className="px-3 py-2 font-mono">gp3 20 GiB</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">配置</td>
                  <td className="px-3 py-2 font-mono">private1 / ap-northeast-1a</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">パブリックアクセス</td>
                  <td className="px-3 py-2 font-mono">false</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">セキュリティグループ</td>
                  <td className="px-3 py-2 font-mono">management-app-rds-sg のみ</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">初期 DB 名</td>
                  <td className="px-3 py-2 font-mono">management_app</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">認証情報</td>
                  <td className="px-3 py-2 font-mono">Secrets Manager 管理</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Details summary="ここから課金が始まる。使わないときは止める">
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              作成した瞬間から <Code>db.t4g.micro</Code> の稼働時間とストレージ 20 GiB 分の課金が始まる。
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              しばらく触らない期間ができたら、RDS は<strong>「停止」で最大 7 日間だけ止められる</strong>
              (7 日を過ぎると自動で再起動する)。
              完全に止めたい場合は<strong>スナップショットを取ってからインスタンスを削除</strong>するのが確実。
              スナップショットから同じ状態を復元できる。
            </p>
          </Details>
        </Step>

        <Step n="05" title="踏み台 EC2 を立てて、手元から RDS に繋ぐ">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            RDS は Private サブネットにあるので、<strong>手元の PC からは繋がらない</strong>。
            VPC の中に小さいサーバを 1 台置いて、そこを経由して繋ぐ。これが踏み台。
          </p>

          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`いま        手元のPC  ──✕──▶  RDS (Private。外から見えない)

踏み台を置くと
            手元のPC  ──▶  踏み台 (VPCの中)  ──▶  RDS`}
          </pre>

          <Details summary="SSH と SSM の違い">
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              普通の踏み台は 22 番 (SSH) を開けて鍵で入る。今回はそうせず
              <strong>SSM Session Manager</strong> を使う。違いは
              <strong>矢印の向きだけ</strong>。
            </p>

            <pre className="overflow-x-auto rounded bg-white p-4 font-mono text-[12px] leading-loose text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`SSH    あなた ──▶ 踏み台

SSM    あなた ──▶ AWS ◀── 踏み台`}
            </pre>

            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              矢印は「話しかける向き」。
            </p>
            <ul className="ml-1 flex flex-col gap-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li>
                ・<strong>SSH</strong> — 踏み台は<strong>話しかけられる側</strong>。
                だから<strong>入口が必要</strong>
              </li>
              <li>
                ・<strong>SSM</strong> — 踏み台も<strong>話しかける側</strong>。
                誰も入ってこないので<strong>入口が不要</strong>
              </li>
            </ul>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              この違いから 2 つのことが出てくる。
              <strong>22 番を開けなくていい</strong>ので bastion-sg のインバウンドは空のまま。
              そして<strong>踏み台が自分から動く</strong>ので、
              名乗るための <strong>IAM ロール</strong>が要る。
            </p>
          </Details>

          <SubHeading>05-A. 先に IAM ロールを作る</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            EC2 の起動画面で選ぶので、先に作っておく。
          </p>

          <Details summary="自分が管理者なのに、なぜ別途ロールが要るのか">
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <strong>自分の権限と、サーバの権限は別物</strong>だから。
            </p>
            <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-xs">
                <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">種類</th>
                    <th className="px-3 py-2 text-left font-semibold">付ける相手</th>
                    <th className="px-3 py-2 text-left font-semibold">例</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-2">IAM ユーザー</td>
                    <td className="px-3 py-2"><strong>人</strong></td>
                    <td className="px-3 py-2 font-mono">hokushi-IAM</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">IAM ロール</td>
                    <td className="px-3 py-2"><strong>モノ (サーバなど)</strong></td>
                    <td className="px-3 py-2 font-mono">management-app-bastion-role</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              SSM で入るには <strong>踏み台が自分から AWS に連絡する</strong>必要がある。
              連絡しているのは<strong>踏み台の中で動くソフト</strong>であって、自分ではない。
              そのソフトは自分の認証情報を持っていないので、
              <strong>踏み台自身の身分証</strong>が要る。それが IAM ロール。
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              ロールが無いと、EC2 が running でも
              <strong>SSM の管理対象一覧に一切現れない</strong>。
              どれだけ強い権限で繋ごうとしても「そんなインスタンスは無い」と返ってくる。
            </p>
          </Details>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            IAM コンソール → <strong>「ロール」</strong> → <strong>「ロールを作成」</strong>。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.00.51.png"
            alt="ロールの作成 - 信頼されたエンティティに AWS のサービス、ユースケースに EC2 を選択"
            width={3006}
            height={1804}
          />

          <Field name="信頼されたエンティティタイプ / ユースケース">
            <strong>AWS のサービス</strong> → <strong>EC2</strong>
          </Field>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.01.53.png"
            alt="許可を追加 - AmazonSSMManagedInstanceCore にチェック"
            width={3006}
            height={1804}
          />

          <Field name="許可ポリシー">
            検索窓に <Code>AmazonSSMManagedInstanceCore</Code> と入れて、
            出てきた 1 件だけにチェック。他は何も付けない。
            SSM に必要な最小限の権限だけを持つ AWS 製のポリシー
          </Field>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.02.48.png"
            alt="ロール名の入力と信頼ポリシーの確認"
            width={3006}
            height={1804}
          />

          <Li>
            ロール名は <Code>management-app-bastion-role</Code>
          </Li>
          <Li>
            信頼ポリシーの <Code>&quot;Service&quot;: [&quot;ec2.amazonaws.com&quot;]</Code> は
            <strong>「このロールを名乗っていいのは EC2 だけ」</strong>という意味
          </Li>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.05.39.png"
            alt="ロール一覧 - management-app-bastion-role が作成された"
            width={3006}
            height={1804}
          />

          <SubHeading>05-B. 踏み台 EC2 を起動する</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            EC2 コンソール → <strong>「インスタンスを起動」</strong>。
            最初にアーキテクチャで引っかかった。
          </p>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.08.03.png"
            alt="インスタンスタイプ選択でアーキテクチャ不一致の警告が出ている"
            width={3006}
            height={1804}
          />

          <Field name="つまずき: アーキテクチャ不一致">
            <Code>t4g.nano</Code> を選ぼうとすると
            <strong>「選択した AMI のアーキテクチャ (x86_64) はこのインスタンスタイプでサポートされていません」</strong>
            と出る。<Code>t4g</Code> は Arm (Graviton) なのに AMI が x86 のままだったため。
            <strong>先に「アーキテクチャ」を <Code>64 ビット (Arm)</Code> に変えてから</strong>
            インスタンスタイプを選ぶと通る
          </Field>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.09.06.png"
            alt="アーキテクチャを Arm に変更して t4g.nano が選べた状態"
            width={3006}
            height={1804}
          />

          <Li>
            AMI は <strong>Amazon Linux 2023</strong>。SSM エージェントが最初から入っている
          </Li>
          <Li>
            <Code>t4g.nano</Code> を選ぶのは<strong>単に安いから</strong>。
            踏み台は中継するだけでほとんど仕事をしない
          </Li>
          <Li>
            キーペアは <strong>「キーペアなしで続行」</strong>。SSH を使わないので鍵は要らない
          </Li>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.12.55.png"
            alt="ネットワーク設定 - public1 サブネット、パブリック IP 有効化、bastion-sg"
            width={3006}
            height={1804}
          />

          <Field name="ネットワーク設定">
            <strong>「編集」を押さないと VPC の欄が出てこない。</strong>
            押さずに進むとデフォルト VPC に作られてしまう。
            VPC は <Code>hokushi-vpc</Code>、サブネットは <strong>public1</strong>、
            SG は「既存のセキュリティグループを選択」→ <Code>management-app-bastion-sg</Code>
          </Field>

          <Field name="パブリック IP の自動割り当て → 有効化">
            このサブネットは<strong>自動割り当てが OFF</strong> なので、
            デフォルトのままだと IP が付かない。IP が無いと踏み台が AWS に連絡できず、
            <strong>SSM に出てこない踏み台</strong>ができあがる。
            なお<strong>これは外から入れるようにする設定ではない</strong>。
            SG は空のままなので外からは入れず、
            踏み台が<strong>自分から外に出る</strong>ために要る
          </Field>

          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.15.32.png"
            alt="高度なネットワーク設定 - 探している場所ではない"
            width={3006}
            height={1804}
          />


          <Screenshot
            src="/aws/rds/スクリーンショット 2026-09-08 16.19.44.png"
            alt="高度な詳細 - IAM インスタンスプロファイルに management-app-bastion-role を指定"
            width={3006}
            height={1804}
          />

          <Field name="IAM インスタンスプロファイル">
            <strong>「高度な詳細」の一番上。</strong>ここで
            <Code>management-app-bastion-role</Code> を選ぶ。
            これが<strong>ロールを EC2 に貼り付ける操作</strong>。
            「高度な詳細」の残りの項目は触らなくてよい
          </Field>

          <SubHeading>SSM に登録されたか確認する</SubHeading>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            起動して 1〜2 分待ってから確認する。
            ここが<strong>ロールが効いているかの答え合わせ</strong>になる。
          </p>

          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`aws ssm describe-instance-information \\
  --query 'InstanceInformationList[].{Id:InstanceId,Ping:PingStatus}'

[
  { "Id": "i-00f0e3ebb62a0b722", "Ping": "Online" }
]`}
          </pre>

          <Li>
            <Code>Online</Code> = 踏み台が AWS に連絡できていて、指示を受け取れる状態
          </Li>
          <Li>
            ロールが無いと、EC2 が running でも<strong>この一覧に一切現れない</strong>
          </Li>

          <SubHeading>05-C. トンネルを張って RDS に繋ぐ</SubHeading>

          <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`aws ssm start-session \\
  --target i-00f0e3ebb62a0b722 \\
  --document-name AWS-StartPortForwardingSessionToRemoteHost \\
  --parameters '{"host":["<RDSのエンドポイント>"],
                 "portNumber":["5432"],
                 "localPortNumber":["5435"]}'

Port 5435 opened for sessionId ...
Waiting for connections...`}
          </pre>

          <Li>
            この表示のまま<strong>繋ぎっぱなしにする</strong>。これがトンネル本体。
            終わるときは <Code>Ctrl+C</Code>
          </Li>
          <Li>
            <Code>localhost:5435</Code> に繋ぐと、AWS 経由で踏み台まで運ばれ、
            踏み台が RDS に中継する
          </Li>
        </Step>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          いま繋がっている経路
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          手元の <Code>psql</Code> や <Code>db:push</Code> が、
          どこを通って Private の RDS まで届いているのか。
        </p>

        <pre className="overflow-x-auto rounded-md border border-zinc-200 bg-white p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`    あなたの PC
    psql localhost:5435  /  pnpm db:push
                                      │
                                      │  ① aws ssm start-session
                                      │     HTTPS + IAM 認証 (hokushi-IAM)
                                      ▼
    ┌────────────────────────────────────────┐
    │ AWS Systems Manager                    │
    │ 手元と踏み台を取り次ぐ                 │
    └────────────────────────────────────────┘
                                      ▲
                                      │  ② 踏み台から外向きに接続して待機
                                      │     「ここに居ます」= Ping: Online
                                      │
╔═════════════════════════════════════╧══════════════════════════════════╗
║ hokushi-vpc  10.0.0.0/16                                               ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ Public サブネット 1a   10.0.0.0/20                               │  ║
║  │                                                                  │  ║
║  │   ┌──────────────────────────────────────────────┐               │  ║
║  │   │ 踏み台 EC2  t4g.nano  Amazon Linux 2023      │               │  ║
║  │   │                                              │               │  ║
║  │   │  中で SSM エージェントが常駐して待機         │               │  ║
║  │   │  身分証: IAM ロール bastion-role             │               │  ║
║  │   │                                              │               │  ║
║  │   │  SG: bastion-sg   インバウンド 0 件          │               │  ║
║  │   │  Private IP 10.0.7.215 / Public IP あり      │               │  ║
║  │   └──────────────────────────────────────────────┘               │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
║                                    │  ③ 5432 (SSL 必須)                ║
║                                    ▼                                   ║
║  ┌──────────────────────────────────────────────────────────────────┐  ║
║  │ Private サブネット 1a   10.0.128.0/20                            │  ║
║  │                                                                  │  ║
║  │   ┌──────────────────────────────────────────────┐               │  ║
║  │   │ RDS  management-app-db  PostgreSQL 17.11     │               │  ║
║  │   │                                              │               │  ║
║  │   │  SG: rds-sg  許可 bastion-sg → 5432          │               │  ║
║  │   │  パブリックアクセス なし = 外から届かない    │               │  ║
║  │   └──────────────────────────────────────────────┘               │  ║
║  │                                                                  │  ║
║  │   外に出る経路なし (NAT なし)                                    │  ║
║  └──────────────────────────────────────────────────────────────────┘  ║
╚════════════════════════════════════════════════════════════════════════╝`}
        </pre>

        <Field name="① 手元 → AWS">
          <Code>aws ssm start-session</Code> は <strong>AWS の API を叩いているだけ</strong>。
          踏み台に直接繋ぎに行っているわけではない。
          認証は IAM ユーザー <Code>hokushi-IAM</Code> の権限で行われる
        </Field>

        <Field name="② 踏み台 → AWS">
          踏み台の中の <strong>SSM エージェント</strong>が、
          起動時から<strong>自分で AWS に接続して待っている</strong>。
          このとき名乗るのが <strong>IAM ロール</strong>。
          <Code>PingStatus: Online</Code> はこの接続が生きている印。
          <strong>①も②も外向き</strong>なので、踏み台に開けるポートが 1 つも要らない
        </Field>

        <Field name="③ 踏み台 → RDS">
          ここで初めて VPC 内部の通信になる。
          rds-sg が <strong>bastion-sg からの 5432 を許可</strong>しているので通る。
          RDS 側のログに接続元として出るのは<strong>踏み台のプライベート IP</strong>
          (<Code>10.0.7.215</Code>)。
          また RDS は <Code>rds.force_ssl=1</Code> なので<strong>暗号化必須</strong>で、
          ドライバから繋ぐときは <Code>?sslmode=require</Code> が要る
        </Field>

        <Li>
          手元の <Code>localhost:5435</Code> は、このトンネルの入口。
          <strong>ローカルの docker が使う 5434 とぶつからないよう</strong>ずらしてある
        </Li>
        <Li>
          ALB と ECS はまだ無い。アプリからの経路は
          <strong>ecs-sg → 5432</strong> という別のルールで、これから作る
        </Li>
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          ここから先 (未着手)
        </h2>
        <Li>
          <strong>backend の本番用 Dockerfile を作る</strong> —
          いまある <Code>Dockerfile.dev</Code> は <Code>tsx watch</Code> +
          ソースマウント前提。<Code>pnpm build</Code> → <Code>node dist/server.js</Code> の
          マルチステージ構成が別途要る
        </Li>
        <Li>
          <strong>ECR にイメージを置く</strong>
        </Li>
        <Li>
          <strong>ECS (Fargate) + ALB を立てる</strong> — Public サブネットに
          <Code>assignPublicIp: ENABLED</Code> で置き、ecs-sg と alb-sg にルールを足す
        </Li>
        <Li>
          <strong>接続情報の渡し方を決める</strong> — パスワードの記号で URL が壊れるので、
          <Code>DATABASE_URL</Code> を組み立てずにホスト・ユーザー・パスワードを
          個別の環境変数で渡す方が安全。<Code>sslmode=require</Code> も忘れずに
        </Li>
        <Li>
          <strong>マイグレーションの流し方を決める</strong> —
          <Code>db:push</Code> をタスク起動のたびに走らせるのは危険なので、
          単発のマイグレーションタスクに分ける
        </Li>
        <Li>
          <strong>frontend の置き場を決める</strong> — ECS 同居 / Amplify / Vercel
        </Li>
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
    <section className="flex flex-col gap-4">
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

function Field({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {name}
      </p>
      <p className="pl-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 border-l-2 border-indigo-400 pl-3 text-sm font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500 dark:text-indigo-300">
      {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-xs text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200">
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
    <details className="group ml-4 rounded-md border-l-2 border-indigo-300 bg-indigo-50/40 dark:border-indigo-700 dark:bg-indigo-950/20">
      <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-sm font-semibold text-indigo-900 transition-colors hover:text-indigo-700 dark:text-indigo-200 dark:hover:text-indigo-100">
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
      <div className="flex flex-col gap-3 px-4 pb-4 pt-0">{children}</div>
    </details>
  );
}
