import { Screenshot } from "@/app/_components/Screenshot";

export default function AwsVpcPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          VPC を作る
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          AWS Console で 1 ステップずつ作りながら、スクショと一緒に記録していく
        </p>
      </header>

      <section className="flex flex-col gap-3 rounded-lg border border-indigo-200 bg-indigo-50/40 px-5 py-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          VPC とは
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          AWS アカウントの中に作る <strong>自分専用のネットワーク領域</strong>。EC2 / ECS / RDS など、
          これから置くサーバや DB は全部この中に入る。
        </p>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          VPC は <strong>サブネット</strong>という小さい単位に分けて使う。
          インターネットから到達できる <strong>Public</strong> と、隔離された <strong>Private</strong> の 2 種類があり、
          複数の AZ に分散させると Multi-AZ 構成になる。
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          手順
        </h2>

        <Step n="01" title="VPC ダッシュボードから「VPC を作成」">
          <Li>
            上の検索バーに <Code>VPC</Code> と入力 → VPC サービスへ
          </Li>
          <Li>
            右上の <strong>「VPC を作成」</strong> ボタンをクリック
          </Li>
          <Li>
            右上のリージョンが <strong>東京 (ap-northeast-1)</strong> になっていることを確認
          </Li>
        </Step>

        <Step n="02" title="「VPC など」を選んで基本設定を入れる">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ウィザードに項目が多いので、画面の上から順に説明します。スクショと見比べながら埋めるイメージ。
          </p>

          <Screenshot
            src="/aws/スクリーンショット 2026-05-27 18.03.29.png"
            alt="VPC 作成ウィザード - 基本設定とプレビュー"
            width={2560}
            height={1440}
          />

          <Field name="① 作成するリソース">
            <strong>VPC など</strong> を選ぶ。「VPC のみ」だとサブネット・IGW・ルートテーブルを後から
            1 個ずつ手動で作る必要があり手間。「VPC など」なら関連リソースをまとめて生成してくれる
          </Field>

          <Field name="② 名前タグの自動生成">
            チェックを on にして prefix (デフォルト <Code>プロジェクト</Code>) を入れると、
            全リソースに <Code>プロジェクト-vpc</Code> / <Code>プロジェクト-subnet-public1-...</Code>
            のように <strong>自動で命名</strong>される。そのままで OK
          </Field>

          <Field name="③ IPv4 CIDR ブロック">
            <strong>IPv4</strong> = インターネットで一番よく使われる 32 bit の IP アドレス (例: <Code>10.0.0.5</Code> / <Code>192.168.1.1</Code>)。
            <strong>CIDR</strong> = IP の範囲を <Code>/16</Code> のように省略表記する記法。
            VPC が使う IP の範囲をここで決める。<Code>10.0.0.0/16</Code> で 65,536 個分の IP が確保される。
            個人検証では十分すぎるサイズなので <strong>このままで OK</strong>
          </Field>

          <div className="ml-4 flex flex-col gap-3 rounded-md border-l-2 border-indigo-300 bg-indigo-50/40 p-4 dark:border-indigo-700 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              この 65,536 個の IP は何に使われるのか
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              VPC 内に作るほぼ全リソースが、この範囲から <strong>1 個ずつ IP をもらいます</strong>。
            </p>

            <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-xs">
                <thead className="bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">リソース</th>
                    <th className="px-3 py-2 text-left font-semibold">消費する IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  <tr>
                    <td className="px-3 py-2">EC2 インスタンス</td>
                    <td className="px-3 py-2 font-mono">1 個 (例: 10.0.10.5)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">ECS タスク (Fargate)</td>
                    <td className="px-3 py-2">1 個 (タスク数だけ消費)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">RDS インスタンス</td>
                    <td className="px-3 py-2">1 個</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">ALB</td>
                    <td className="px-3 py-2">サブネットあたり 1 個 (Multi-AZ なら計 2+)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">NAT Gateway</td>
                    <td className="px-3 py-2">1 個</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Lambda (VPC 内実行)</td>
                    <td className="px-3 py-2">同時実行ごとに 1 個</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">VPC Endpoint</td>
                    <td className="px-3 py-2">1 個</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              階層の流れ
            </p>
            <pre className="overflow-x-auto rounded bg-white p-3 font-mono text-[11px] leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`VPC: 10.0.0.0/16        (65,536 個の IP 在庫)
 ├─ Subnet public-1a:  10.0.0.0/20    (4,096 個)
 ├─ Subnet public-1c:  10.0.16.0/20   (4,096 個)
 ├─ Subnet private-1a: 10.0.32.0/20   (4,096 個)
 └─ Subnet private-1c: 10.0.48.0/20   (4,096 個)
        ↓ ここに置いたリソースに 1 つずつ配られる
        EC2 i-xxx : 10.0.32.10
        ECS task  : 10.0.32.55
        RDS       : 10.0.48.20`}
            </pre>

            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              注意点
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  AWS が各サブネットで <strong>5 個の IP を予約</strong> (ネットワーク / DNS / ルーター / 将来用 / ブロードキャスト)。
                  なので /20 (4,096 個) は実質 <strong>4,091 個</strong>使える
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  これらは <strong>プライベート IP (RFC 1918)</strong>。VPC の外からは見えない。
                  インターネットから接続する場合は <strong>ALB / NAT GW</strong> がパブリック IP を持って中継する
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  ECS タスクが大量にスケールアウトしたり、Lambda を VPC 内で大量同時実行したりすると、
                  急激に IP を消費する。事故例: Lambda の IP 枯渇でスケールアウト不能
                </span>
              </li>
            </ul>

            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              なぜ /16 にするのか
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  <strong>/16 = 65,536 個</strong>: 個人検証では使い切ることはまずない。余裕の枠
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  <strong>/20 (4,096)</strong> や <strong>/24 (256)</strong> だと
                  サブネット 1 つあたりの IP が少なくなり、後で「IP 足りない…」と詰まる
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>
                  <strong>ベストプラクティス</strong>: VPC は広めに取り、サブネットも広めに切る (使わない分は捨て置き)
                </span>
              </li>
            </ul>
          </div>

          <Field name="④ IPv4 CIDR の取得方法">
            <strong>「IPv4 CIDR を手動で入力」</strong> を選択 (デフォルト)。
            「Amazon が提供する IPv4 CIDR」は IPAM 機能で、個人検証では不要
          </Field>

          <Field name="⑤ IPv6 CIDR ブロック">
            <strong>IPv6</strong> = IPv4 (32 bit) が世界中で枯渇しかけたので、128 bit に拡張した次世代 IP
            (例: <Code>2001:db8::1</Code>)。世界向け公開サービスや IoT で大量機器を繋ぐ時に必要になる。
            ここでは <strong>なし</strong> で OK ── 個人検証や一般的な業務システムでは IPv4 だけで十分
          </Field>

          <Field name="⑥ テナンシー">
            <strong>デフォルト</strong>。物理サーバを他の AWS ユーザーと共有する普通モード。
            「専有」は自分専用の物理サーバになるが料金が跳ね上がるので個人では使わない
          </Field>

          <SubHeading>詳細性の設定 (オプション)</SubHeading>

          <Field name="⑦ アベイラビリティーゾーン (AZ) の数">
            <strong>AZ</strong> = AWS リージョン内の <strong>物理的に独立したデータセンター群</strong>。
            東京リージョンには 4 つあり、それぞれ <strong>数 km〜数十 km 離れていて電源・冷却・ネットワークも独立</strong>。
            1 つの AZ が停電・災害でダウンしても他は生きている。詳しくは{" "}
            <a
              href="/aws/regions"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              リージョン と データセンター
            </a>
            {" "}ページ参照。
            <br />
            <br />
            ここでは <strong>2</strong> を選ぶ → 2 つの AZ にサブネットを分散して
            <strong> Multi-AZ 構成</strong>にする。1 だと冗長性なし、3 にすると AZ × 3 ぶんのコストになる
          </Field>

          <div className="ml-4 flex flex-col gap-3 rounded-md border-l-2 border-indigo-300 bg-indigo-50/40 p-4 dark:border-indigo-700 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              サブネットとは
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              VPC を <strong>さらに細かく分けた区画</strong>のこと。サーバや DB は
              VPC に直接置かれるのではなく、<strong>必ずどれかのサブネットの中</strong>に置かれる。
            </p>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              サブネットのルール
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  1 つのサブネットは <strong>1 つの AZ にだけ属する</strong> (AZ をまたげない)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  VPC の CIDR をさらに小さく区切った範囲 (例: <Code>10.0.0.0/20</Code>) を持つ
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  サブネットごとに <strong>ルートテーブル</strong>が付いていて、ここから出る通信の経路が決まる
                </span>
              </li>
            </ul>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              なぜわざわざ分割するのか
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  <strong>AZ ごとに分散</strong>するため (Multi-AZ にするには各 AZ に 1 つずつサブネットが必要)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  <strong>Public と Private を分離</strong>するため (公開していいものと、隠したいものを物理的に別エリアに)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  <strong>層 (Tier) で分ける</strong>ため (Web 層 / アプリ層 / DB 層 に分けてセキュリティを段階化)
                </span>
              </li>
            </ul>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Public と Private の正体は「ルートテーブル」
            </p>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              実はどちらも技術的には <strong>同じサブネット</strong>。違うのは付いているルートテーブル:
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>
                  <strong>Public Subnet</strong>: ルートテーブルに <Code>0.0.0.0/0 → IGW</Code> のルートがある → インターネットへの出入口
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  <strong>Private Subnet</strong>: そのルートがない → ネットから直接到達できない
                  (NAT GW 経由で出ていくことだけ可)
                </span>
              </li>
            </ul>
            <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              「VPC など」ウィザードが <strong>Public / Private</strong> と呼んでいるのは、それぞれに
              <strong>適切なルートテーブルを自動でアタッチ</strong>してくれるから。中身は同じ箱です。
            </p>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              全体構造のイメージ
            </p>
            <pre className="overflow-x-auto rounded bg-white p-3 font-mono text-[11px] leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
{`VPC: 10.0.0.0/16
 ├─ AZ: ap-northeast-1a
 │   ├─ Public  Subnet  10.0.0.0/20    (ルート: 0.0.0.0/0 → IGW)
 │   └─ Private Subnet  10.0.32.0/20   (ルート: 0.0.0.0/0 → NAT GW)
 └─ AZ: ap-northeast-1c
     ├─ Public  Subnet  10.0.16.0/20   (ルート: 0.0.0.0/0 → IGW)
     └─ Private Subnet  10.0.48.0/20   (ルート: 0.0.0.0/0 → NAT GW)`}
            </pre>
          </div>

          <Field name="⑧ パブリックサブネット数">
            <strong>2</strong>。各 AZ に 1 つずつ Public サブネットを作る。
            Public = <strong>インターネットから直接到達可</strong>。ALB や NAT GW を置く場所
          </Field>

          <Field name="⑨ プライベートサブネット数">
            <strong>2</strong>。各 AZ に 1 つずつ Private サブネットを作る。
            Private = <strong>ネットから隔離</strong>。ECS タスクや RDS を置く場所
          </Field>

          <Field name="⑩ サブネットの CIDR ブロックをカスタマイズ">
            触らなくて OK。AWS が自動で <Code>10.0.0.0/20</Code> / <Code>10.0.16.0/20</Code> ...
            のように割り振ってくれる
          </Field>

          <SubHeading>NAT ゲートウェイ ← ここだけ要決定 (料金直結)</SubHeading>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>NAT</strong> = Network Address Translation の略。Private サブネット内のリソース
            (ECS タスクや EC2 など) が外部 API を叩いたり、パッケージを取りに行くときに使う
            <strong>「片方向の出口」</strong>になる装置。
          </p>

          <NatGatewayDiagram />

          <div className="ml-4 flex flex-col gap-3 rounded-md border-l-2 border-indigo-300 bg-indigo-50/40 p-4 dark:border-indigo-700 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              何をしてくれるのか
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  Private subnet のリソース (例: ECS タスク <Code>10.0.32.10</Code>) が「外向き」のパケットを送る
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  NAT GW が <strong>プライベート IP → パブリック IP に変換</strong>して外に出す
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  返信は NAT GW が受け取って Private subnet に戻す
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 dark:bg-rose-400" />
                <span>
                  「<strong>外 → 中</strong>」の通信は通さない。あくまで「中 → 外」の応答だけ通す (これが Private 隔離の目的)
                </span>
              </li>
            </ul>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              よくある「外に出る」用途
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>ECS Fargate が ECR からコンテナイメージを pull する</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>アプリが Stripe / Slack / OpenAI などの外部 API を叩く</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>OS のセキュリティアップデートを取りに行く</span>
              </li>
            </ul>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              なぜ <Code>$</Code> マーク付きで高いのか
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span>
                  <strong>常時稼働</strong>の専用ルーティング装置 (アイドルでも止まらない)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span>
                  時間課金 <Code>$0.045/h</Code> + <strong>通信量課金</strong> (GB あたり)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span>
                  アイドルでも <strong>月 ~$32</strong> ── 個人検証で消し忘れる料金事故ナンバーワン
                </span>
              </li>
            </ul>
          </div>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>では逆に: ユーザーが自分のサービスの API を叩く時 (外 → 中) はどう流れる?</strong>
          </p>
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            これは NAT GW を <strong>通らない</strong>別の経路で処理される。インターネット側からの入口は
            <strong>IGW + ALB</strong> の組み合わせで、Public Subnet を経由して Private Subnet 内のサーバまで届く。
          </p>

          <ApiInboundDiagram />

          <div className="ml-4 flex flex-col gap-3 rounded-md border-l-2 border-indigo-300 bg-indigo-50/40 p-4 dark:border-indigo-700 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              API リクエストの経路 (外 → 中)
            </p>
            <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>
                  <strong>①</strong> ユーザーが <Code>api.hokushi.com</Code> にアクセス
                  → DNS (Route 53) が ALB の IP を返す
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>
                  <strong>②</strong> リクエストが <strong>IGW (Internet Gateway)</strong>
                  を通って VPC 内に入る (Public 用の入口)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>
                  <strong>③</strong> <strong>ALB</strong> (Public Subnet 内) が受け取り、
                  Multi-AZ の ECS タスクのどれかに振り分ける
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span>
                  <strong>④</strong> ECS タスクが必要に応じて <strong>RDS</strong> にクエリ
                  (どちらも Private Subnet 内なので外には出ない)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>
                  返信は同じ経路を逆順に: <strong>ECS → ALB → IGW → ユーザー</strong>
                </span>
              </li>
            </ul>

            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              NAT GW との違い (2 つの「ドア」の使い分け)
            </p>
            <div className="overflow-hidden rounded-md border border-indigo-200 dark:border-indigo-800">
              <table className="w-full text-xs">
                <thead className="bg-white text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">用途</th>
                    <th className="px-3 py-2 text-left font-semibold">向き</th>
                    <th className="px-3 py-2 text-left font-semibold">経路</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-200 bg-white dark:divide-indigo-800 dark:bg-indigo-950/40">
                  <tr>
                    <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ユーザーが API を叩く
                    </td>
                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">外 → 中</td>
                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">IGW → ALB → ECS</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                      ECS が外部 API を叩く
                    </td>
                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">中 → 外</td>
                    <td className="px-3 py-2 text-zinc-700 dark:text-zinc-300">ECS → NAT GW → IGW</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              ポイント: IGW は <strong>VPC とインターネットの境界</strong>に 1 つだけ立っている。
              ALB は「外向きの正面玄関」、NAT GW は「裏口の片方向出口」── どちらも結局は IGW を通って外と繋がる
            </p>
          </div>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ウィザードでは NAT GW を作成するかどうかと、いくつ作るかを <strong>3 択</strong>から選ぶ:
          </p>

          <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">選択</th>
                  <th className="px-3 py-2 text-left font-semibold">月額</th>
                  <th className="px-3 py-2 text-left font-semibold">特徴</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
                <tr>
                  <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">なし</td>
                  <td className="px-3 py-2">$0</td>
                  <td className="px-3 py-2">Private はネットに出られない。ECS は Public 配置 or VPC Endpoint 必要</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-emerald-700 dark:text-emerald-400">1 つの AZ に</td>
                  <td className="px-3 py-2">~$32</td>
                  <td className="px-3 py-2">Private からネット OK。個人検証ではこれが定番</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">各 AZ に 1 つ</td>
                  <td className="px-3 py-2">~$64</td>
                  <td className="px-3 py-2">完全冗長 (本番向け)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            画面を下にスクロールすると、NAT ゲートウェイの選択肢と、その下に VPC エンドポイント / DNS オプション /
            一番下の <strong>「VPC を作成」ボタン</strong>が見える。プレビューに <Code>hokushi-vpc</Code> など
            自分が付けた prefix で命名されたリソースが並ぶ。
          </p>

          <Screenshot
            src="/aws/スクリーンショット 2026-05-29 10.02.18.png"
            alt="VPC 作成ウィザード - 画面下半分 (NAT GW / VPC エンドポイント / DNS / 作成ボタン)"
            width={2560}
            height={1440}
          />

          <Field name="⑪ VPC エンドポイント">
            <strong>なし</strong>。S3 / DynamoDB などへの専用ルートを引く機能。今は不要 (後で追加可)
          </Field>

          <Field name="⑫ DNS オプション">
            <strong>両方チェック on のまま</strong>。EC2 などに DNS 名を割り当てて名前解決できるようにする設定
          </Field>

          <SubHeading>右側のプレビュー</SubHeading>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            設定を変えると <strong>右側の構成図がリアルタイムで更新</strong>される。最終的にこれが作られる:
          </p>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span><strong>VPC × 1</strong> (一番外)</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>サブネット × 4</strong> (
                <Code>ap-northeast-1a</Code> と <Code>ap-northeast-1c</Code> に Public/Private 1 つずつ)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span><strong>ルートテーブル × 3</strong> (Public 用 1 + Private 用 1 つずつ × 2 AZ)</span>
            </li>
          </ul>
        </Step>

        <Step n="03" title="作成完了の確認">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            「VPC を作成」ボタンを押すと「VPC ワークフローの作成」画面に遷移し、
            <strong>各リソースが順番に緑のチェック ✓ で作成されていく</strong>のが見える。
            全部チェックが付けば完成。
          </p>

          <Screenshot
            src="/aws/スクリーンショット 2026-05-29 11.15.37.png"
            alt="VPC 作成完了画面 - 各リソースに緑のチェックマーク"
            width={2560}
            height={1440}
          />

          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            作られたもの
          </p>
          <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                <strong>VPC × 1</strong> + DNS ホスト名 + DNS 解決
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                <strong>サブネット × 4</strong> (2 Public + 2 Private)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                <strong>Internet Gateway × 1</strong> + VPC へのアタッチ
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                <strong>ルートテーブル × 3</strong> + 各サブネットへの関連付け
              </span>
            </li>
          </ul>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              この時点での料金: <strong>$0</strong>
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
              NAT Gateway を「なし」にしたので、作られたのは全部 <strong>無料リソース</strong> (VPC / サブネット / IGW /
              ルートテーブル)。実際の料金は <strong>この VPC の中に EC2 / RDS / NAT GW を置いたタイミング</strong>から発生する
            </p>
          </div>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            右下の <strong>「VPC を表示」</strong> ボタンを押すと、作成した VPC の詳細画面に遷移する。
            次の Step 04 で確認する。
          </p>
        </Step>

        <Step n="04" title="リソースマップで全体構成を確認">
          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            VPC 詳細ページの <strong>「リソースマップ」タブ</strong>では、
            ウィザードのプレビューと同じ <strong>構成図がそのまま実体化した状態</strong>で見える。
            それぞれのリソースが実際に作られていて、線で繋がっているのが確認できる。
          </p>

          <Screenshot
            src="/aws/スクリーンショット 2026-05-29 11.20.08.png"
            alt="VPC 詳細ページ - リソースマップタブ"
            width={2560}
            height={1440}
          />

          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            画面に見えるもの
          </p>

          <SubHeading>上部「詳細」</SubHeading>
          <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>VPC ID</strong>: <Code>vpc-072cb325e93e2ec90</Code> ── これがこの VPC の固有 ID
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>状態</strong>: <Code>Available</Code> ── 使える状態
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>IPv4 CIDR</strong>: <Code>10.0.0.0/16</Code> ── 設定通り
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>DNS ホスト名 / DNS 解決</strong>: 有効 ── デフォルトで on
              </span>
            </li>
          </ul>

          <SubHeading>リソースマップ (中央のビジュアル)</SubHeading>
          <ul className="flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>VPC</strong>: <Code>hokushi-vpc</Code>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              <span>
                <strong>サブネット (4)</strong>: AZ ごとに Public/Private の 4 個
                <br />
                ・<Code>hokushi-subnet-public1-ap-northeast-1a</Code>
                <br />
                ・<Code>hokushi-subnet-private1-ap-northeast-1a</Code>
                <br />
                ・<Code>hokushi-subnet-public2-ap-northeast-1c</Code>
                <br />
                ・<Code>hokushi-subnet-private2-ap-northeast-1c</Code>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span>
                <strong>ルートテーブル (3)</strong>
                <br />
                ・<Code>hokushi-rtb-public</Code> ── 2 つの Public サブネットが共有
                <br />
                ・<Code>hokushi-rtb-private1</Code> ── 1a の Private 専用
                <br />
                ・<Code>hokushi-rtb-private2</Code> ── 1c の Private 専用
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500 dark:bg-zinc-400" />
              <span>
                <strong>ネットワーク接続 (1)</strong>: 作った IGW (Internet Gateway) がここに表示される
              </span>
            </li>
          </ul>

          <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              ルートテーブルが Public 1 + Private 2 = 3 つになっている理由
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-[14px] leading-relaxed text-indigo-900/90 dark:text-indigo-200/90">
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  <strong>Public 用は 1 つで共有</strong>: 両 AZ の Public サブネットとも「外行きは IGW」と同じ宛先なので、1 つで足りる
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                <span>
                  <strong>Private 用は AZ ごとに 1 つ</strong>: 将来 NAT GW を AZ ごとに置く可能性があるため、
                  分けておく方が柔軟。今は NAT GW なしなのでどちらも実質中身は同じ
                </span>
              </li>
            </ul>
          </div>

          <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            ここまでで <strong>「箱」と「ドア」と「住所表」</strong>が揃った状態。
            次はこの中に <strong>実際にサーバを置く</strong> (EC2 / ECS / RDS) ステップに進める。
          </p>
        </Step>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          補足: VPC 一覧に出てくる「Name = -」の VPC は何?
        </h2>
        <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          VPC ダッシュボードで自分の VPC 一覧を開くと、<strong>作った覚えがない VPC</strong>がもう 1 つ並んでいる。
          Name が空 (ハイフン表示)、CIDR が <Code>172.31.0.0/16</Code> なら、それは
          <strong> AWS が用意した「デフォルト VPC」</strong>です。
        </p>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            デフォルト VPC とは
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                AWS アカウントを作った瞬間に、<strong>全リージョンで自動生成</strong>される VPC
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                目的: 「VPC を自分で設計しなくても <strong>すぐ EC2 を立てられる</strong>」初心者向けのクイックスタート用
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>無料</strong>。VPC 自体は何個あっても課金されない (中に EC2 / NAT GW を置いた時だけ)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                残しておくのが推奨。<strong>削除すると戻すのに AWS CLI</strong> (
                <Code>aws ec2 create-default-vpc</Code>) が必要なので面倒
              </span>
            </li>
          </ul>
        </div>

        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          デフォルト VPC の中身
        </p>
        <pre className="overflow-x-auto rounded bg-zinc-100 p-3 font-mono text-[11px] leading-relaxed text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
{`Default VPC (172.31.0.0/16)
 ├─ AZ: ap-northeast-1a
 │   └─ Public Subnet (172.31.0.0/20)
 ├─ AZ: ap-northeast-1c
 │   └─ Public Subnet (172.31.16.0/20)
 └─ AZ: ap-northeast-1d
     └─ Public Subnet (172.31.32.0/20)

ルートテーブル × 1 (メイン RT がそのまま使われる)
  ・local         → VPC 内
  ・0.0.0.0/0     → IGW
  (全 Public サブネットが共有)`}
        </pre>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
            設計のポイント (なぜこういう構造か)
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-[14px] leading-relaxed text-indigo-900/90 dark:text-indigo-200/90">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>Public しかない</strong>: 「EC2 を立てて外からアクセスする」が初心者の最大ニーズだから。
                Private は「隠したい意図がある時」だけ作るもの
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>1 ルートテーブルで共有</strong>: 全 Public で行き先 (IGW) が同じなので、複数作る必要がない。
                これは <strong>メイン RT がそのまま現役で使われている</strong>状態 (hokushi-vpc では「念のための控え」だったやつ)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span>
                <strong>3 AZ に 1 サブネットずつ</strong>: 全 AZ にとりあえずサブネットを置いておくことで、
                「どの AZ に EC2 を作ってもいい」状態にしている
              </span>
            </li>
          </ul>
        </div>

        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          自作の VPC との比較
        </p>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">項目</th>
                <th className="px-3 py-2 text-left font-semibold">デフォルト VPC</th>
                <th className="px-3 py-2 text-left font-semibold">hokushi-vpc (自作)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">CIDR</td>
                <td className="px-3 py-2 font-mono">172.31.0.0/16</td>
                <td className="px-3 py-2 font-mono">10.0.0.0/16</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">AZ 数</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">2</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">サブネット</td>
                <td className="px-3 py-2">Public × 3 (Private なし)</td>
                <td className="px-3 py-2">Public × 2 + Private × 2 = 4</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">ルートテーブル</td>
                <td className="px-3 py-2">1 (メイン RT が現役)</td>
                <td className="px-3 py-2">4 (メイン + Public + Private × 2)</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">設計思想</td>
                <td className="px-3 py-2">初心者がすぐ使える</td>
                <td className="px-3 py-2">本番想定の最小構成</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">Private リソースを置ける?</td>
                <td className="px-3 py-2">❌ Public しかない</td>
                <td className="px-3 py-2">✅ DB / ECS を Private に隠せる</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          いつデフォルト VPC で済むか
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              OK なケース
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/90 dark:text-emerald-200/90">
              <li>・学習・検証</li>
              <li>・シンプルな個人用 Web サイト</li>
              <li>・とにかく動けばいい PoC</li>
            </ul>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
            <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              自分で VPC を切る理由
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-rose-900/90 dark:text-rose-200/90">
              <li>・DB を隠したい (Private 必要)</li>
              <li>・本番運用 (セキュリティ層を分けたい)</li>
              <li>・Multi-tier 構成 (Web / App / DB)</li>
              <li>・カスタム CIDR を使いたい</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function NatGatewayDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 700 360" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="80"
          width="180"
          height="240"
          rx="10"
          className="fill-blue-50/60 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700"
          strokeWidth="1.5"
        />
        <text
          x="110"
          y="105"
          textAnchor="middle"
          className="fill-blue-900 text-xs font-semibold dark:fill-blue-200"
        >
          中 (Private Subnet)
        </text>
        <text
          x="110"
          y="120"
          textAnchor="middle"
          className="fill-blue-700 text-[10px] dark:fill-blue-400"
        >
          10.0.32.0/20
        </text>

        <rect
          x="50"
          y="190"
          width="120"
          height="60"
          rx="6"
          className="fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="110"
          y="215"
          textAnchor="middle"
          className="fill-zinc-900 text-xs font-semibold dark:fill-zinc-100"
        >
          ECS タスク
        </text>
        <text
          x="110"
          y="232"
          textAnchor="middle"
          className="fill-zinc-600 text-[10px] dark:fill-zinc-400"
        >
          10.0.32.10
        </text>

        <rect
          x="250"
          y="80"
          width="180"
          height="240"
          rx="10"
          className="fill-emerald-50/60 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text
          x="340"
          y="105"
          textAnchor="middle"
          className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200"
        >
          Public Subnet
        </text>
        <text
          x="340"
          y="120"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] dark:fill-emerald-400"
        >
          10.0.0.0/20
        </text>

        <rect
          x="280"
          y="190"
          width="120"
          height="60"
          rx="6"
          className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600"
          strokeWidth="1.5"
        />
        <text
          x="340"
          y="215"
          textAnchor="middle"
          className="fill-amber-900 text-xs font-semibold dark:fill-amber-200"
        >
          NAT GW
        </text>
        <text
          x="340"
          y="232"
          textAnchor="middle"
          className="fill-amber-700 text-[10px] dark:fill-amber-300"
        >
          (IP 変換)
        </text>

        <rect
          x="500"
          y="80"
          width="180"
          height="240"
          rx="10"
          className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text
          x="590"
          y="105"
          textAnchor="middle"
          className="fill-zinc-900 text-xs font-semibold dark:fill-zinc-100"
        >
          外 (インターネット)
        </text>
        <text
          x="590"
          y="120"
          textAnchor="middle"
          className="fill-zinc-600 text-[10px] dark:fill-zinc-400"
        >
          0.0.0.0/0
        </text>

        <rect
          x="530"
          y="170"
          width="120"
          height="40"
          rx="6"
          className="fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="590"
          y="195"
          textAnchor="middle"
          className="fill-zinc-900 text-xs font-semibold dark:fill-zinc-100"
        >
          外部 API
        </text>

        <rect
          x="530"
          y="250"
          width="120"
          height="40"
          rx="6"
          className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-600"
          strokeWidth="1.5"
        />
        <text
          x="590"
          y="275"
          textAnchor="middle"
          className="fill-rose-900 text-xs font-semibold dark:fill-rose-200"
        >
          攻撃者
        </text>

        <line
          x1="170"
          y1="200"
          x2="278"
          y2="200"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#nat-arrow-e)"
        />
        <text
          x="224"
          y="195"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] dark:fill-emerald-400"
        >
          ① 出る
        </text>
        <line
          x1="400"
          y1="190"
          x2="528"
          y2="190"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#nat-arrow-e)"
        />
        <text
          x="464"
          y="183"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] dark:fill-emerald-400"
        >
          ② 変換済 IP で外へ
        </text>

        <line
          x1="528"
          y1="215"
          x2="400"
          y2="225"
          className="stroke-emerald-500"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          markerEnd="url(#nat-arrow-e)"
        />
        <text
          x="464"
          y="222"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] dark:fill-emerald-400"
        >
          ③ 返信
        </text>
        <line
          x1="278"
          y1="235"
          x2="170"
          y2="225"
          className="stroke-emerald-500"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          markerEnd="url(#nat-arrow-e)"
        />
        <text
          x="224"
          y="252"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] dark:fill-emerald-400"
        >
          ④ 中に戻す
        </text>

        <line
          x1="528"
          y1="270"
          x2="408"
          y2="270"
          className="stroke-rose-500"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
        <text
          x="468"
          y="288"
          textAnchor="middle"
          className="fill-rose-700 text-[18px] font-bold dark:fill-rose-400"
        >
          ✕
        </text>
        <text
          x="468"
          y="305"
          textAnchor="middle"
          className="fill-rose-700 text-[10px] font-semibold dark:fill-rose-400"
        >
          外から始まる接続は遮断
        </text>

        <defs>
          <marker
            id="nat-arrow-e"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
        </defs>
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <strong>中</strong> (Private) → NAT GW →{" "}
        <strong>外</strong> (Internet)。
        中から始めた通信の <strong>応答だけ</strong>戻ってこられる。外から始まる接続は弾く
      </p>
    </div>
  );
}

function ApiInboundDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 720 380" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="60"
          width="130"
          height="260"
          rx="10"
          className="fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text
          x="85"
          y="85"
          textAnchor="middle"
          className="fill-zinc-900 text-xs font-semibold dark:fill-zinc-100"
        >
          外 (Internet)
        </text>

        <rect
          x="35"
          y="180"
          width="100"
          height="60"
          rx="6"
          className="fill-white stroke-zinc-400 dark:fill-zinc-950 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text
          x="85"
          y="205"
          textAnchor="middle"
          className="fill-zinc-900 text-xs font-semibold dark:fill-zinc-100"
        >
          ユーザー
        </text>
        <text
          x="85"
          y="223"
          textAnchor="middle"
          className="fill-zinc-600 text-[10px] dark:fill-zinc-400"
        >
          (ブラウザ等)
        </text>

        <rect
          x="170"
          y="190"
          width="50"
          height="40"
          rx="6"
          className="fill-zinc-900 dark:fill-zinc-100"
        />
        <text
          x="195"
          y="215"
          textAnchor="middle"
          className="fill-zinc-50 text-xs font-semibold dark:fill-zinc-900"
        >
          IGW
        </text>

        <rect
          x="250"
          y="60"
          width="170"
          height="260"
          rx="10"
          className="fill-emerald-50/60 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text
          x="335"
          y="85"
          textAnchor="middle"
          className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200"
        >
          Public Subnet
        </text>

        <rect
          x="270"
          y="180"
          width="130"
          height="60"
          rx="6"
          className="fill-white stroke-emerald-600 dark:fill-zinc-950 dark:stroke-emerald-600"
          strokeWidth="1.5"
        />
        <text
          x="335"
          y="205"
          textAnchor="middle"
          className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200"
        >
          ALB
        </text>
        <text
          x="335"
          y="223"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] dark:fill-emerald-400"
        >
          ロードバランサ
        </text>

        <rect
          x="450"
          y="60"
          width="250"
          height="260"
          rx="10"
          className="fill-blue-50/60 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700"
          strokeWidth="1.5"
        />
        <text
          x="575"
          y="85"
          textAnchor="middle"
          className="fill-blue-900 text-xs font-semibold dark:fill-blue-200"
        >
          Private Subnet
        </text>

        <rect
          x="480"
          y="120"
          width="190"
          height="60"
          rx="6"
          className="fill-white stroke-blue-500 dark:fill-zinc-950 dark:stroke-blue-500"
          strokeWidth="1.5"
        />
        <text
          x="575"
          y="145"
          textAnchor="middle"
          className="fill-blue-900 text-xs font-semibold dark:fill-blue-200"
        >
          ECS タスク
        </text>
        <text
          x="575"
          y="162"
          textAnchor="middle"
          className="fill-blue-700 text-[10px] dark:fill-blue-400"
        >
          (API サーバ)
        </text>

        <rect
          x="480"
          y="230"
          width="190"
          height="60"
          rx="6"
          className="fill-white stroke-blue-500 dark:fill-zinc-950 dark:stroke-blue-500"
          strokeWidth="1.5"
        />
        <text
          x="575"
          y="255"
          textAnchor="middle"
          className="fill-blue-900 text-xs font-semibold dark:fill-blue-200"
        >
          RDS
        </text>
        <text
          x="575"
          y="272"
          textAnchor="middle"
          className="fill-blue-700 text-[10px] dark:fill-blue-400"
        >
          (データベース)
        </text>

        <line
          x1="135"
          y1="205"
          x2="168"
          y2="205"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#api-arrow-e)"
        />
        <text
          x="151"
          y="195"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400"
        >
          ①
        </text>

        <line
          x1="220"
          y1="205"
          x2="268"
          y2="205"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#api-arrow-e)"
        />
        <text
          x="244"
          y="195"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400"
        >
          ②
        </text>

        <line
          x1="400"
          y1="195"
          x2="478"
          y2="155"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#api-arrow-e)"
        />
        <text
          x="430"
          y="165"
          textAnchor="middle"
          className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400"
        >
          ③
        </text>

        <line
          x1="575"
          y1="180"
          x2="575"
          y2="228"
          className="stroke-blue-500"
          strokeWidth="2"
          markerEnd="url(#api-arrow-b)"
        />
        <text
          x="608"
          y="208"
          textAnchor="middle"
          className="fill-blue-700 text-[10px] font-semibold dark:fill-blue-400"
        >
          ④ DB クエリ
        </text>

        <line
          x1="478"
          y1="170"
          x2="400"
          y2="218"
          className="stroke-emerald-500"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          markerEnd="url(#api-arrow-e)"
        />
        <line
          x1="268"
          y1="225"
          x2="220"
          y2="225"
          className="stroke-emerald-500"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          markerEnd="url(#api-arrow-e)"
        />
        <line
          x1="168"
          y1="225"
          x2="135"
          y2="225"
          className="stroke-emerald-500"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          markerEnd="url(#api-arrow-e)"
        />

        <text
          x="335"
          y="345"
          textAnchor="middle"
          className="fill-zinc-600 text-[10px] dark:fill-zinc-400"
        >
          応答は <tspan className="fill-emerald-700 dark:fill-emerald-400">点線</tspan>{" "}
          で同じ経路を逆順に戻る (ECS → ALB → IGW → ユーザー)
        </text>

        <defs>
          <marker
            id="api-arrow-e"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker
            id="api-arrow-b"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500" />
          </marker>
        </defs>
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        外 → IGW → ALB (Public) → ECS (Private) → RDS (Private)。NAT GW は通らない
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
