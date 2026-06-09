import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsEc2Page() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          EC2 を立てる
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          作った VPC の Public サブネットに t2.micro を立てて、ブラウザで <code>Hello, World!</code> が見えるところまで
        </p>
      </header>

      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          EC2 とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <strong>EC2 (Elastic Compute Cloud)</strong> = AWS が提供する <strong>「仮想サーバの時間貸し」</strong>サービス。
          借りた瞬間は OS だけ入った空っぽの Linux マシンで、SSH で繋いで好きなソフト (nginx / Node.js / Python など) を入れて使う。
          Web サーバ・API のバックエンド・開発機など、自宅の Linux と同じ感覚で何でも置ける。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          起動時には <strong>OS イメージ (AMI) / スペック (インスタンスタイプ) / 配置先 (VPC とサブネット) / 通信ルール (SG) / SSH 鍵 (キーペア)</strong>
          をまとめて選ぶ。今回はそれぞれ:
        </p>
        <ul className="ml-1 flex flex-col gap-1 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          <li>・<strong>Amazon Linux 2023</strong> (AWS 最適化、無料枠対象)</li>
          <li>・<strong>t2.micro</strong> (1 vCPU / 1 GiB、月 750 時間まで無料)</li>
          <li>・<strong>hokushi-vpc</strong> の <strong>Public サブネット</strong></li>
          <li>・SSH 通信は <strong>自分の IP からのみ</strong>許可</li>
          <li>・新規キーペア (<Code>.pem</Code> ダウンロード)</li>
        </ul>

        <Details summary="実用では「同じサーバを 2 つの Private サブネットに置く」">
          <p>
            本番では <strong>同じアプリの EC2 を 2 つの AZ の Private サブネットに 1 台ずつ</strong>置く
            (= 合計 2 台、同じものが動いている状態)。
          </p>
          <pre className="overflow-x-auto rounded bg-white p-3 font-mono text-[11px] leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`     AZ: 1a              AZ: 1c
  ┌─────────────┐    ┌─────────────┐
  │   Private   │    │   Private   │
  │   [ EC2 ]   │    │   [ EC2 ]   │   ← 同じアプリを 2 台
  └─────────────┘    └─────────────┘`}
          </pre>
          <p>2 つに分けて Private に置く理由:</p>
          <ul className="ml-1 flex flex-col gap-1">
            <li>
              ・<strong>2 AZ に分散</strong> → 片方の AZ が落ちても、生きてる方でサービス継続できる
            </li>
            <li>
              ・<strong>Private に置く</strong> → サーバが直接インターネットに露出しないので攻撃されにくい
            </li>
          </ul>
          <p>
            今回は <strong>1 台を Public サブネットに直置き</strong>しているので、
            AZ が落ちたら即停止 / 外から直接 SSH や HTTP できる状態。
            学習・検証用に意図的に簡略化している
          </p>
        </Details>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          手順
        </h2>

        <Step n="01" title="EC2 ダッシュボードを開く">
          <Details summary="インスタンスとは?">
            <p>
              <strong>インスタンス</strong> = <strong>実際に動いている 1 台の EC2 サーバ</strong>。
              「EC2 を立てる = インスタンスを 1 つ作る」と言い換えて OK。
            </p>
            <ul className="ml-1 flex flex-col gap-1">
              <li>
                ・<strong>AMI</strong> = 設計図 (= ケーキのレシピ)
              </li>
              <li>
                ・<strong>インスタンス</strong> = 設計図から作った 1 台 (= 焼いた具体的なケーキ)
              </li>
            </ul>
            <p>
              同じ AMI から <strong>何台でも</strong>インスタンスを作れる。それぞれに固有の状態
              (実行中 / 停止 / 終了) や IP を持つ。
            </p>
            <p>
              EC2 ダッシュボードの <strong>「インスタンス」一覧</strong>は、
              <strong>今動いている (or 過去動いていた)</strong> サーバの一覧。
            </p>
          </Details>
          <Li>
            上検索バーで <Code>EC2</Code> → サービスへ。リージョンは <strong>東京 (ap-northeast-1)</strong>
          </Li>
          <Li>
            オレンジボタン <strong>「インスタンスを起動」</strong> をクリック
          </Li>
          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 16.01.16.png"
            alt="EC2 ダッシュボード"
            width={2560}
            height={1440}
          />
        </Step>

        <Step n="02" title="基本設定 (名前 / AMI / インスタンスタイプ)">
          <Li>
            <strong>名前</strong>: <Code>hokushi-ec2</Code> (Name タグになる)
          </Li>
          <Li>
            <strong>AMI</strong>: <Code>Amazon Linux 2023</Code> (デフォルトで OK、無料枠対応)。ユーザー名は <Code>ec2-user</Code>
          </Li>
          <Li>
            <strong>インスタンスタイプ</strong>: <Code>t2.micro</Code> (検索欄で絞り込み)
          </Li>
          <Details summary="なぜ t2.micro?">
            <p>
              <strong>AWS の無料利用枠の対象が t2.micro だから</strong>。
              月 750 時間 (ほぼ常時稼働) まで $0。
            </p>
            <ul className="ml-1 flex flex-col gap-1">
              <li>・<strong>t2.nano</strong> (もっと小さい / 1 vCPU / 0.5 GiB) → 無料枠 ❌ (月 ~$5)</li>
              <li>・<strong>t2.micro</strong> (1 vCPU / 1 GiB) → ✅ 無料枠あり、検証には十分</li>
              <li>・<strong>t2.small</strong> 以上 → 無料枠 ❌ (月 ~$20〜)</li>
            </ul>
            <p>
              ※ 新しめのアカウント or 無料枠 (12 ヶ月) が切れていると、
              代わりに <strong>t3.micro</strong> や <strong>t4g.small</strong> が無料枠になっていることもある。
              ドロップダウンで <strong>「無料利用枠の対象」ラベル</strong>が付いているものを選ぶのが確実
            </p>
          </Details>
          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 16.10.14.png"
            alt="名前 / AMI / インスタンスタイプを設定済みのフォーム"
            width={2560}
            height={1440}
          />
        </Step>

        <Step n="03" title="キーペア / ネットワーク / SG / ストレージ">
          <Li>
            <strong>キーペア</strong>: 「新しいキーペアの作成」→ 名前を入れて <Code>.pem</Code> をダウンロード。
            <span className="text-rose-700 dark:text-rose-400">再ダウンロード不可なので失くさない</span>
          </Li>

          <Details summary="SSH ってなに? なぜ EC2 でキーペアが要るの?">
            <p>
              <strong>SSH = Secure Shell</strong> ──{" "}
              <strong>「遠くにあるコンピュータの中に入って、ターミナル (黒い画面) を操作する仕組み」</strong>。
              通信は常に暗号化されている。
            </p>
            <p>
              EC2 は東京のデータセンターにある仮想マシンで、目の前にはない。
              でも nginx をインストールしたり、ファイルを書き換えたり、ログを見たりはしたい。
              → <strong>SSH で「入って」、ターミナルで遠隔操作する</strong>のが標準。
            </p>

            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              ブラウザ (HTTP) と SSH の対比
            </p>
            <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-xs">
                <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-medium"></th>
                    <th className="px-3 py-1.5 text-left font-medium">ブラウザ (HTTP)</th>
                    <th className="px-3 py-1.5 text-left font-medium">SSH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-1.5">何をする</td>
                    <td className="px-3 py-1.5">Web ページを見る</td>
                    <td className="px-3 py-1.5">遠くのターミナル操作</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">何が見える</td>
                    <td className="px-3 py-1.5">HTML</td>
                    <td className="px-3 py-1.5">
                      コマンドプロンプト <Code>$ _</Code>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">ポート</td>
                    <td className="px-3 py-1.5 font-mono">80 / 443</td>
                    <td className="px-3 py-1.5 font-mono">22</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 font-semibold text-zinc-800 dark:text-zinc-200">
              認証は「鍵 (キーペア)」で行う
            </p>
            <p>
              SSH はパスワードではなく <strong>鍵</strong>で認証するのが標準:
            </p>
            <ul className="ml-1 flex flex-col gap-0.5">
              <li>
                ・<strong>公開鍵 (<Code>.pub</Code>)</strong> = 南京錠みたいなもの。EC2 側に置いておく
              </li>
              <li>
                ・<strong>秘密鍵 (<Code>.pem</Code>)</strong> = 物理鍵。<strong>自分の Mac だけに保管</strong>
              </li>
            </ul>
            <p>
              EC2 立ち上げ時にダウンロードした <Code>hokushi-ec2-key.pem</Code> が秘密鍵。
              ターミナルから <Code>ssh -i hokushi-ec2-key.pem ec2-user@&lt;Public IP&gt;</Code> で繋ぐと、
              EC2 のターミナルが開く。
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              → なぜパスワードじゃなく鍵?: パスワードは盗まれるしブルートフォースされる。
              鍵は数千文字の暗号文なので実質破られない
            </p>

            <p className="mt-3 font-semibold text-zinc-800 dark:text-zinc-200">
              EC2 で SSH を使う 2 つの方法
            </p>
            <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-xs">
                <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-medium"></th>
                    <th className="px-3 py-1.5 text-left font-medium">① ターミナル SSH</th>
                    <th className="px-3 py-1.5 text-left font-medium">② EC2 Instance Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-1.5">ツール</td>
                    <td className="px-3 py-1.5">Mac のターミナル + <Code>ssh</Code></td>
                    <td className="px-3 py-1.5">AWS コンソール (ブラウザ)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">鍵</td>
                    <td className="px-3 py-1.5">
                      <Code>.pem</Code> ファイルを使う
                    </td>
                    <td className="px-3 py-1.5">AWS が裏で一時鍵を発行</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">通信元</td>
                    <td className="px-3 py-1.5">自分の家の IP</td>
                    <td className="px-3 py-1.5">AWS の中継サーバー</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">SG ルール</td>
                    <td className="px-3 py-1.5 font-mono">
                      SSH 22 / マイ IP
                    </td>
                    <td className="px-3 py-1.5 font-mono">
                      SSH 22 / 3.112.23.0/29
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              → SG に SSH 22 のルールが <strong>2 つあるのはこのため</strong>。
              どちらも宛先は同じ EC2 の 22 番だが、<strong>「誰から来るか」</strong>が違う。
              片方だけでも作業可能 (両方残すと冗長性が上がる)
            </p>
          </Details>
          <Li>
            <strong>ネットワーク (要編集)</strong>: サーバを <strong>どこに置くか / 外から到達できるか</strong>をまとめて決める
            <span className="mt-1.5 ml-1 block text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ・<Code>VPC</Code> = <Code>hokushi-vpc</Code> ── <strong>どのネットワーク領域</strong>に置くか
              <br />
              ・<Code>サブネット</Code> = <strong>Public のどれか</strong> ── <strong>どの AZ のどの区画</strong>に置くか
              <br />
              ・<Code>パブリック IP 自動割り当て</Code> = <strong>有効</strong> ── <strong>外から到達できるグローバル IP</strong>を付けるか
            </span>
          </Li>
          <Li>
            <strong>SG</strong>: 新規作成。SSH の送信元は <strong>「マイ IP」</strong>に絞る (0.0.0.0/0 にしない)
          </Li>
          <Li>
            <strong>ストレージ</strong>: 8 GiB / gp3 のままで OK
          </Li>
          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 16.12.11.png"
            alt="フォーム下半分 - キーペア / ネットワーク / SG / ストレージ"
            width={2560}
            height={1440}
          />
          <Note>
            セキュリティグループは「インスタンス個別のファイアウォール」。詳細は{" "}
            <a
              href="/network/firewall"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ファイアウォール / FortiGate
            </a>
            {" "}ページ参照
          </Note>
        </Step>

        <Step n="04" title="起動成功 → インスタンス一覧へ">
          <Li>
            緑のバナー「成功」が出たら、右下の <strong>「すべてのインスタンスを表示」</strong>
          </Li>
          <Li>
            一覧で <strong>状態 = 実行中</strong> + <strong>ステータスチェック 2/2</strong> を待つ (1〜2 分)
          </Li>
          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 17.01.38.png"
            alt="EC2 起動成功画面"
            width={2560}
            height={1440}
          />
        </Step>

        <Step n="05" title="インスタンス詳細で Public IP を確認">
          <Li>
            行をクリックして詳細を開く
          </Li>
          <Li>
            <strong>パブリック IPv4 アドレス</strong>: <Code>13.113.54.137</Code> ← 後でブラウザから叩く
          </Li>
          <Li>
            VPC が <Code>hokushi-vpc</Code>、サブネットが Public 用になっているか念のため確認
          </Li>
          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 17.04.08.png"
            alt="EC2 インスタンス詳細"
            width={2560}
            height={1440}
          />
          <Note>
            今回 <strong>「パブリック IP の自動割り当て = 有効」</strong>にしたので、起動中はずっと
            <Code>13.113.54.137</Code> が割り当てられている状態。
            ただし <strong>停止 → 起動 すると別の IP に変わる</strong>ので注意 (自動割り当ては「起動時にプールから 1 つもらう」だけで、固定じゃない)。
            完全に固定したければ <strong>Elastic IP</strong> を割り当てる (未関連付け時のみ月 ~$3.6)
          </Note>
        </Step>

        <Step n="06" title="ブラウザで Hello World までのロードマップ">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            EC2 は <strong>ただの Linux</strong>。<Code>http://13.113.54.137</Code> をブラウザに打っても空っぽ。
            4 つやって初めて表示される。
          </p>
          <ol className="ml-1 flex flex-col gap-1 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>① SG にルールを追加</strong> (HTTP 80 + Instance Connect 用 SSH)
            </li>
            <li>
              <strong>② EC2 Instance Connect でブラウザにターミナル</strong>を出す
            </li>
            <li>
              <strong>③ nginx をインストール + 起動</strong>
            </li>
            <li>
              <strong>④ ブラウザで Public IP を開く</strong> → Welcome to nginx
            </li>
          </ol>
          <Note>
            全部 AWS Console (ブラウザ) で完結。手元のターミナルや <Code>.pem</Code> ファイルは触らない
          </Note>
        </Step>

        <Step n="07" title="SG にルールを 2 つ追加">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            EC2 → インスタンス → セキュリティタブ → SG リンクをクリック → 「インバウンドルールを編集」。以下 2 つを追加:
          </p>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">タイプ</th>
                  <th className="px-3 py-2 text-left font-semibold">ポート</th>
                  <th className="px-3 py-2 text-left font-semibold">ソース</th>
                  <th className="px-3 py-2 text-left font-semibold">用途</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2">SSH</td>
                  <td className="px-3 py-2 font-mono">22</td>
                  <td className="px-3 py-2 font-mono">3.112.23.0/29</td>
                  <td className="px-3 py-2">EC2 Instance Connect (東京)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">HTTP</td>
                  <td className="px-3 py-2 font-mono">80</td>
                  <td className="px-3 py-2 font-mono">0.0.0.0/0</td>
                  <td className="px-3 py-2">nginx をブラウザで開くため</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 17.22.20.png"
            alt="正しい launch-wizard-1 (hokushi-vpc) の詳細画面"
            width={2560}
            height={1440}
          />

          <Details summary="なぜ HTTP は 80, SSH は 22 なの?">
            <p>
              各プロトコルには <strong>「特に指定がなければこのポートを使う」と決められた番号</strong>
              (<strong>Well-Known Port</strong>) がある。IANA という世界のネット標準を決める団体が古くから割り当てていて、
              ブラウザや SSH クライアントは「指定がなければこのポート」と覚えている。
            </p>
            <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-xs">
                <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">プロトコル</th>
                    <th className="px-3 py-2 text-left font-semibold">ポート</th>
                    <th className="px-3 py-2 text-left font-semibold">用途</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-2 font-mono">HTTP</td>
                    <td className="px-3 py-2 font-mono">80</td>
                    <td className="px-3 py-2">Web (平文)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono">HTTPS</td>
                    <td className="px-3 py-2 font-mono">443</td>
                    <td className="px-3 py-2">Web (TLS 暗号化)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono">SSH</td>
                    <td className="px-3 py-2 font-mono">22</td>
                    <td className="px-3 py-2">リモートログイン</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono">DNS</td>
                    <td className="px-3 py-2 font-mono">53</td>
                    <td className="px-3 py-2">ドメイン名 → IP 変換</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-mono">SMTP</td>
                    <td className="px-3 py-2 font-mono">25</td>
                    <td className="px-3 py-2">メール送信</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              つまり、ブラウザで <Code>http://13.113.54.137</Code> を開くと、自動で
              <strong>「13.113.54.137 の 80 番ポート」</strong>に接続する。
              もし nginx を 8080 で動かすと <Code>http://13.113.54.137:8080</Code> のように
              <strong>ポート番号を明示する必要</strong>が出てくる。
            </p>
            <p>
              SSH も同じで <Code>ssh ec2-user@13.113.54.137</Code> と打つと、自動で 22 番に繋ぎに行く
            </p>
          </Details>

          <Note>
            EC2 Instance Connect の通信は <strong>AWS のサーバから飛んでくる</strong>ので、自分のマイ IP とは別に
            <Code>3.112.23.0/29</Code> を許可する必要がある
          </Note>
          <Note>
            launch-wizard-1 が <strong>VPC ごとに 2 個</strong>並んで見えるが、編集するのは hokushi-vpc 側のみ
          </Note>
        </Step>

        <Step n="08" title="EC2 Instance Connect → nginx インストール">
          <Li>
            EC2 → インスタンス → <Code>hokushi-ec2</Code> → 「接続」 → 「<strong>EC2 Instance Connect</strong>」タブ → 「接続」
          </Li>
          <Li>
            別タブで黒いターミナル <Code>[ec2-user@ip-10-0-13-66 ~]$</Code> が開く
          </Li>

          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 17.49.50.png"
            alt="EC2 Instance Connect 接続成功 - Amazon Linux 2023"
            width={2560}
            height={1440}
          />

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            続けて以下 4 コマンド:
          </p>

          <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl status nginx     # active (running) が緑で出れば OK
sudo systemctl enable nginx     # 再起動時も自動起動`}
          </pre>

          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 17.53.36.png"
            alt="dnf install nginx + systemctl status - active (running)"
            width={2560}
            height={1440}
          />
        </Step>

        <Step n="09" title="ブラウザで開く → Welcome to nginx!">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            手元の Chrome の URL バーに以下を入れて Enter (<strong><Code>http://</Code> で開く</strong>、<Code>https://</Code> ではない):
          </p>
          <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`http://13.113.54.137`}
          </pre>

          <Screenshot
            src="/aws/ec2/スクリーンショット 2026-06-03 18.02.54.png"
            alt="ブラウザで Welcome to nginx! ページが表示される"
            width={2560}
            height={1440}
          />

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            🎉 これで <strong>VPC → サブネット → EC2 → nginx → HTTP → ブラウザ</strong>の一筆書きが完成。
          </p>

          <Note>
            「Hello, World!」に書き換えるなら、ターミナルで:
            <br />
            <Code>{`echo "<h1>Hello, World!</h1>" | sudo tee /usr/share/nginx/html/index.html`}</Code>
            <br />
            → ブラウザを Cmd+Shift+R でハードリロード
          </Note>

          <h4 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            今回作った全体図
          </h4>
          <OverallDiagram />
        </Step>

        <Step n="10" title="あとかたづけ (止め方)">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            動作確認が済んだら <strong>必ず EC2 を片付ける</strong>。放っておくと無料枠を使い切ったところで
            <strong>月 ~$10 の課金が始まる</strong>ので、もう触らないなら今のうちに止める。
          </p>

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            「停止 (Stop)」 と 「終了 (Terminate)」 の違い
          </h4>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">操作</th>
                  <th className="px-3 py-2 text-left font-semibold">何が起きるか</th>
                  <th className="px-3 py-2 text-left font-semibold">課金</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2 font-medium">停止 (Stop)</td>
                  <td className="px-3 py-2">
                    OS を一時停止 (シャットダウン)。<strong>EBS ボリュームは残る</strong>ので、いつでも再起動可能
                  </td>
                  <td className="px-3 py-2">
                    EC2 自体は止まる / <strong>EBS は課金継続</strong> (8GiB なら月 ~$1)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">
                    終了 (Terminate)
                  </td>
                  <td className="px-3 py-2">
                    インスタンスごと <strong>完全削除</strong>。EBS も同時に消える (デフォルト設定の場合)
                  </td>
                  <td className="px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-400">
                    完全に $0
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Note>
            検証を終わって「もう触らない」なら <strong>「終了」一択</strong>。
            「明日また続きをやる」なら <strong>「停止」</strong>でも OK (Public IP は変わる)
          </Note>

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            終了 (Terminate) の手順
          </h4>
          <ol className="ml-1 flex flex-col gap-1 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>1.</strong> EC2 → インスタンス → <Code>hokushi-ec2</Code> を選択
            </li>
            <li>
              <strong>2.</strong> 上の <strong>「インスタンスの状態」</strong>ボタン → <strong>「インスタンスを終了 (削除)」</strong>
            </li>
            <li>
              <strong>3.</strong> 確認ダイアログで <strong>「終了 (削除)」</strong>をクリック
            </li>
            <li>
              <strong>4.</strong> 状態が「シャットダウン中」→「終了済み」に変わる
            </li>
            <li>
              <strong>5.</strong> 数十分すると一覧から消える (Cost Explorer 上でも課金停止)
            </li>
          </ol>

          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            何が消えて、何が残るか
          </h4>
          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">リソース</th>
                  <th className="px-3 py-2 text-left font-semibold">どうなる</th>
                  <th className="px-3 py-2 text-left font-semibold">対処</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2 font-medium">EC2 インスタンス</td>
                  <td className="px-3 py-2 text-rose-700 dark:text-rose-400">消える</td>
                  <td className="px-3 py-2">何もしない</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">EBS ボリューム (ディスク)</td>
                  <td className="px-3 py-2 text-rose-700 dark:text-rose-400">一緒に消える</td>
                  <td className="px-3 py-2">何もしない</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">Public IP (自動割り当て)</td>
                  <td className="px-3 py-2 text-rose-700 dark:text-rose-400">解放される</td>
                  <td className="px-3 py-2">何もしない</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">SG (launch-wizard-1)</td>
                  <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">残る (無料)</td>
                  <td className="px-3 py-2">残して OK / 気になれば削除</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">キーペア (<Code>.pem</Code>)</td>
                  <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">残る (無料)</td>
                  <td className="px-3 py-2">使わないなら IAM で削除</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">VPC / サブネット / IGW</td>
                  <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">残る (無料)</td>
                  <td className="px-3 py-2">残して OK (次の検証で再利用可)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <p className="text-sm font-medium text-rose-900 dark:text-rose-200">
              ⚠️ 「停止」だけだと EBS で月 ~$1 が地味に積み重なる
            </p>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              個人検証で何台か「停止のまま放置」しちゃうと、知らないうちに月 数百円〜千円課金されてる、というのが起きやすい。
              <strong>もう絶対触らないなら必ず「終了」</strong>
            </p>
          </div>

          <Note>
            <strong>確認方法</strong>: 削除後、AWS Console → <strong>請求とコスト管理 → Cost Explorer</strong> で
            「日別 × サービス別」を見ると、EC2 / EBS の課金が <strong>翌日 $0</strong> に落ちていれば成功
          </Note>
        </Step>
      </section>
    </main>
  );
}

function OverallDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
        通信の入り口 (外から来るもの)
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-md border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">① Web を見る</p>
          <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400">ローカル PC (Chrome)</p>
          <p className="mt-0.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
            HTTP :80
          </p>
        </div>
        <div className="rounded-md border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">② SSH でログイン</p>
          <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400">ローカル PC (Terminal)</p>
          <p className="mt-0.5 text-[11px] font-mono text-blue-700 dark:text-blue-400">
            SSH :22
          </p>
        </div>
        <div className="rounded-md border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">③ ブラウザでターミナル</p>
          <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-400">AWS Console (Instance Connect)</p>
          <p className="mt-0.5 text-[11px] font-mono text-blue-700 dark:text-blue-400">
            SSH :22
          </p>
        </div>
      </div>

      <div className="flex justify-center py-3 text-2xl text-zinc-400 dark:text-zinc-600">
        ↓
      </div>

      <div className="rounded-lg border-2 border-purple-300 bg-purple-50/30 p-4 dark:border-purple-700 dark:bg-purple-950/20">
        <p className="text-xs font-semibold text-purple-900 dark:text-purple-200">
          🌐 VPC: hokushi-vpc <span className="font-mono">(10.0.0.0/16)</span>
        </p>

        <div className="mt-3 rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/20">
          <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
            🏢 Public Subnet <span className="font-mono">(10.0.0.0/24, AZ: ap-northeast-1a)</span>
          </p>

          <div className="mt-3 rounded-lg border-2 border-dashed border-amber-500 bg-amber-50/50 p-4 dark:border-amber-600 dark:bg-amber-950/20">
            <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
              🛡 Security Group (関所) ── ここでルール判定
            </p>
            <ul className="mt-2 ml-1 flex flex-col gap-0.5 text-[11px] font-mono text-amber-800 dark:text-amber-300">
              <li>
                ・<span className="text-emerald-700 dark:text-emerald-400">①</span>{" "}
                HTTP 80 ← 0.0.0.0/0
              </li>
              <li>
                ・<span className="text-blue-700 dark:text-blue-400">②</span>{" "}
                SSH 22 ← マイ IP
              </li>
              <li>
                ・<span className="text-blue-700 dark:text-blue-400">③</span>{" "}
                SSH 22 ← 3.112.23.0/29
              </li>
            </ul>

            <p className="mt-3 text-center text-[11px] text-amber-700 dark:text-amber-400">
              ↓ 許可されたら EC2 へ
            </p>

            <div className="mt-2 rounded-lg border-2 border-blue-500 bg-blue-50 p-3 dark:border-blue-500 dark:bg-blue-950/30">
              <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
                🖥 EC2: hokushi-ec2
              </p>
              <ul className="mt-1.5 flex flex-col gap-0.5 text-[11px] text-blue-800 dark:text-blue-300">
                <li>
                  <span className="font-mono">Public IP:</span> 13.113.54.137 (外から見える)
                </li>
                <li>
                  <span className="font-mono">Private IP:</span> 10.0.13.66 (VPC 内のアドレス)
                </li>
                <li>t2.micro / Amazon Linux 2023</li>
                <li className="font-semibold text-emerald-700 dark:text-emerald-400">
                  🟢 nginx running on port 80
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        外から届く全ての通信は <strong>VPC → サブネット → SG (関所)</strong> の順に通って、
        SG で「通って良し」と判定されたものだけが EC2 に届く
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
