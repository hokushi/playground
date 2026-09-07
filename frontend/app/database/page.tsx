import type { ReactNode } from "react";
import Link from "next/link";

import { Screenshot } from "@/app/_components/Screenshot";

export default function DatabasePage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          データベースの基本
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          データがどこに置かれるのかという話から始めて、
          「RDB とは何か」「RDS とは何か」
          といった、<strong>実際に DB を触るときに出てくる話</strong>までをまとめます。
        </p>
      </header>

      <TableOfContents />

      {/* 1. メモリとストレージ */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="memory" num={1}>
          データはどこに置かれるのか ── メモリとストレージ
        </SectionH2>
        <P>
          DB の話に入る前に、そもそも
          <strong>コンピュータがデータを置ける場所は 2 種類しかない</strong>、
          というところから始めます。
          <strong>メモリ</strong>と<strong>ストレージ</strong>です。
        </P>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <th className="border border-zinc-200 px-3 py-2 text-left font-semibold text-zinc-800 dark:border-zinc-800 dark:text-zinc-200" />
                <th className="border border-zinc-200 px-3 py-2 text-left font-semibold text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
                  メモリ (RAM)
                </th>
                <th className="border border-zinc-200 px-3 py-2 text-left font-semibold text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
                  ストレージ (SSD / HDD)
                </th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="border border-zinc-200 px-3 py-2 font-medium dark:border-zinc-800">
                  速さ
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  非常に速い
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  メモリより<strong>桁違いに遅い</strong>
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-200 px-3 py-2 font-medium dark:border-zinc-800">
                  電源を切ると
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <strong>消える</strong>
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <strong>残る</strong>
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-200 px-3 py-2 font-medium dark:border-zinc-800">
                  容量の感覚
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  16 GB くらい（小さい・高い）
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  1 TB くらい（大きい・安い）
                </td>
              </tr>
              <tr>
                <td className="border border-zinc-200 px-3 py-2 font-medium dark:border-zinc-800">
                  何が置かれる
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  プログラムの<strong>変数</strong>、計算の途中結果
                </td>
                <td className="border border-zinc-200 px-3 py-2 dark:border-zinc-800">
                  <strong>ファイル</strong>、写真、そして DB のデータ
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <P>
          プログラムの中で作った配列やオブジェクトは、すべてメモリの上にあります。
          つまり<strong>アプリを終了した時点で消えます</strong>。
          「次に開いたときも残っていてほしいデータ」は、
          どこかの時点で<strong>必ずストレージに書く</strong>必要がある ──
          ここが DB の出発点です。
        </P>

        <Note>
          ちなみに DB も、よく使うデータは
          <strong>メモリに載せたまま</strong>にして速度を稼いでいます（キャッシュ）。
          さらに <Code>Redis</Code> のように
          <strong>あえてメモリだけで動かす DB</strong> もあり、
          こちらは速い代わりに再起動で消えることを前提に使います。
        </Note>
      </section>

      {/* 2. DB とは何か */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="why" num={2}>
          データベースとは何か
        </SectionH2>
        <P>
          <strong>
            データベースは、ストレージへのデータの保存と取り出しを丸ごと引き受けてくれるソフト
          </strong>
          です。多くの場合<strong>専用のサーバーとして常に動いていて</strong>、
          アプリはそこに「これを保存して」「この条件のものを出して」と
          お願いを投げるだけになります。
        </P>

        <DbRoleDiagram />

        <P>
          「保存するだけなら、自分で CSV や JSON をファイルに書けばいいのでは？」
          と思うところですが、実際、1 人で使うメモならそれで足ります。
          DB が要るのは、
          <strong>複数の人が同時に読み書きし、件数が増えてきた瞬間</strong>です。
        </P>

        <div className="grid gap-3 md:grid-cols-2">
          <Panel title="ファイルに自前で書くと困ること">
            <ul className="flex flex-col gap-1">
              <li>・2 人が同時に書くと<strong>上書きし合って壊れる</strong></li>
              <li>・10 万件から 1 件探すのに<strong>全部読む</strong>羽目になる</li>
              <li>・途中で落ちると<strong>半分だけ書かれた状態</strong>が残る</li>
              <li>・「誰がどこまで見ていいか」を自分で作る必要がある</li>
            </ul>
          </Panel>
          <Panel title="DB が代わりにやってくれること">
            <ul className="flex flex-col gap-1">
              <li>・同時アクセスの<strong>整理（ロック）</strong></li>
              <li>・<strong>索引</strong>を使った高速な検索</li>
              <li>・<strong>途中で落ちても中途半端にしない</strong>仕組み</li>
              <li>・ユーザーごとの権限、バックアップ、復旧</li>
            </ul>
          </Panel>
        </div>

        <Note>
          DB は「保存する箱」というより、
          <strong>「大勢で同時に触っても壊れないように、データを預かってくれるサーバー」</strong>
          と捉えると納得しやすいです。だからアプリとは別のプロセス（多くは別のマシン）で動きます。
        </Note>
      </section>

      {/* 3. 主な製品 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="products" num={3}>
          よく名前を聞く DB と、その立ち位置
        </SectionH2>
        <P>
          「DB」と一口に言っても中身は製品ごとに別物です。
          まず<strong>RDB</strong> が主役で、
          用途によってそれ以外も混ざる、という関係になっています。
        </P>

        <SubH3>RDB（リレーショナルデータベース）とは</SubH3>
        <P>
          <strong>データを表（テーブル）の形で持ち、表どうしを ID でつなぐ</strong>
          方式の DB です。
          PostgreSQL も MySQL も Oracle も、すべてこの仲間で、
          <strong>操作には SQL を使います</strong>。
          いま業務システムで DB と言えば、まずこれを指します。
        </P>

        <RdbDiagram />

        <P>
          <strong>「関係 (relational)」</strong>とは、
          この<strong>表どうしのつながり</strong>のことです。
          同じ情報を 1 か所にだけ置いて、必要なときに ID でたどる。
          こうしておくと、住所が変わっても<strong>直す場所は 1 か所</strong>で済み、
          あとから「今月の売上を店舗ごとに」のような
          <strong>最初は想定していなかった集計</strong>にも対応できます。
        </P>

        <SubH3>よく名前を聞く製品</SubH3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <Th>製品</Th>
                <Th>種類</Th>
                <Th>立ち位置</Th>
                <Th>ライセンス / 提供元</Th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <Td strong>PostgreSQL</Td>
                <Td>RDB</Td>
                <Td>
                  機能が広く、複雑な検索・集計に強い。
                  <strong>新規開発の第一候補</strong>になりやすい
                </Td>
                <Td>オープンソース（BSD 系・商用利用自由）</Td>
              </tr>
              <tr>
                <Td strong>MySQL</Td>
                <Td>RDB</Td>
                <Td>
                  Web で長く使われてきた定番。
                  <strong>既存システムで出会うことが多い</strong>
                </Td>
                <Td>Oracle（GPL と商用のデュアル）</Td>
              </tr>
              <tr>
                <Td strong>MariaDB</Td>
                <Td>RDB</Td>
                <Td>MySQL から派生。使い勝手はほぼ MySQL</Td>
                <Td>オープンソース（GPL）</Td>
              </tr>
              <tr>
                <Td strong>SQLite</Td>
                <Td>RDB</Td>
                <Td>
                  サーバー不要でファイル 1 個。
                  <strong>組み込み・テスト用</strong>
                </Td>
                <Td>パブリックドメイン</Td>
              </tr>
              <tr>
                <Td strong>Oracle DB / SQL Server</Td>
                <Td>RDB</Td>
                <Td>
                  大企業・基幹システム。
                  <strong>ライセンス費用が高い</strong>
                </Td>
                <Td>商用（Oracle / Microsoft）</Td>
              </tr>
              <tr>
                <Td strong>DynamoDB</Td>
                <Td>NoSQL</Td>
                <Td>
                  表ではなくキーで引く。
                  <strong>アクセス方法を先に決めて設計する</strong>
                </Td>
                <Td>AWS のサービス</Td>
              </tr>
              <tr>
                <Td strong>Redis</Td>
                <Td>メモリ上の KVS</Td>
                <Td>
                  キャッシュやセッション置き場。
                  <strong>本体データの保管先には使わない</strong>
                </Td>
                <Td>オープンソース系</Td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubH3>RDS は「DB の種類」ではなく「置き場所」</SubH3>
        <P>
          <strong>RDS (Relational Database Service)</strong> は AWS のサービスで、
          <strong>DB 製品そのものではありません</strong>。
          「RDS というデータベース」があるのではなく、
          <strong>RDS の上で PostgreSQL や MySQL を動かす</strong>、という関係です。
          作るときに、どのエンジンを使うかを選びます。
        </P>

        <RdsDiagram />

        <P>
          同じ PostgreSQL を、自分で用意したサーバー
          （社内のマシンや EC2）に入れて動かすこともできます。
          違いは<strong>「面倒を誰が見るか」</strong>だけで、
          <strong>アプリから見た使い方は変わりません</strong>。
          接続先のホスト名が RDS のエンドポイントになるだけです。
        </P>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <Th>　</Th>
                <Th>RDS（マネージド）</Th>
                <Th>EC2 に自分で入れる</Th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <Td strong>構築</Td>
                <Td>画面から数十分で立つ</Td>
                <Td>インストールと設定を自分で</Td>
              </tr>
              <tr>
                <Td strong>バックアップ</Td>
                <Td>
                  <strong>自動</strong>
                </Td>
                <Td>自分で仕組みを作る</Td>
              </tr>
              <tr>
                <Td strong>バージョン更新</Td>
                <Td>ボタン操作（再起動は入る）</Td>
                <Td>手順を作って自分で実施</Td>
              </tr>
              <tr>
                <Td strong>OS へのログイン</Td>
                <Td>
                  <strong>できない</strong>（触れない）
                </Td>
                <Td>できる（何でも入れられる）</Td>
              </tr>
              <tr>
                <Td strong>設定の変更</Td>
                <Td>
                  <strong>パラメータグループ</strong>から
                </Td>
                <Td>設定ファイルを直接編集</Td>
              </tr>
              <tr>
                <Td strong>費用</Td>
                <Td>やや高い（起動している間ずっと）</Td>
                <Td>サーバー代のみだが、人手がかかる</Td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

      {/* 4. 接続情報 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="connect" num={4}>
          つなぐのに要る 5 つの情報
        </SectionH2>
        <P>
          どの DB でも、接続に必要なものは<strong>同じ 5 つ</strong>です。
          エラーが出たときも、大抵このどれかが違っています。
        </P>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Term term="ホスト">
            DB がどこにいるか。同じ PC なら <Code>localhost</Code>、
            AWS なら RDS のエンドポイント。
          </Term>
          <Term term="ポート">
            PostgreSQL は <Code>5432</Code>、MySQL は <Code>3306</Code> が既定。
          </Term>
          <Term term="ユーザー名">
            OS のログインとは<strong>別物</strong>。DB の中に作られたユーザー。
          </Term>
          <Term term="パスワード">
            上のユーザーのもの。コードに直書きせず環境変数に置く。
          </Term>
          <Term term="データベース名">
            1 つのサーバーの中に DB は複数作れるので、どれかを指定する。
          </Term>
          <Term term="（+ SSL 設定）">
            クラウドの DB では、暗号化してつなぐ指定が要ることが多い。
          </Term>
        </div>

        <P>
          この 5 つを 1 行にまとめた
          <strong>接続 URL</strong>（<Code>DATABASE_URL</Code> と呼ばれることが多い）
          という書き方が定番です。
        </P>

        <CodeBlock
          label="接続 URL の形"
          code={`postgres://ユーザー:パスワード@ホスト:ポート/DB名

postgres://app_user:password@db.example.com:5432/myapp
mysql://app_user:password@db.example.com:3306/myapp`}
        />
      </section>

      {/* 5. 入れ物の階層 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="hierarchy" num={5}>
          サーバー / データベース / スキーマ / テーブル
        </SectionH2>
        <P>
          「データベース」という言葉は、
          <strong>サーバー全体</strong>を指したり
          <strong>その中の 1 区画</strong>を指したりします。
          話が噛み合わないときは、大抵ここがずれています。
        </P>

        <HierarchyDiagram />

        <SubH3>pgAdmin で見るとそのまま同じ形</SubH3>
        <P>
          ローカルの PostgreSQL を <strong>pgAdmin</strong> で開くと、
          左のツリーがこの階層そのものになっています。
        </P>

        <Screenshot
          src="/backend/pgadmin-object-explorer.png"
          alt="pgAdmin の Object Explorer。Servers > management-app > Databases > management_app > Schemas > public という階層が表示されている"
          width={2912}
          height={1228}
          caption="pgAdmin の Object Explorer。上から Servers → Databases → Schemas → （その下に Tables）と、階層がそのまま並ぶ。"
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <Th>ツリーの表示</Th>
                <Th>これは何か</Th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <Td strong>Servers &gt; management-app</Td>
                <Td>
                  <strong>接続先の PostgreSQL サーバー</strong>。
                  <Code>management-app</Code> は pgAdmin に登録するとき自分で付けた表示名で、
                  実体は<strong>ホスト + ポート (5432)</strong>
                </Td>
              </tr>
              <tr>
                <Td strong>Databases (2)</Td>
                <Td>
                  そのサーバーの中の<strong>データベース</strong>。
                  1 つのサーバーに複数作れる
                </Td>
              </tr>
              <tr>
                <Td strong>management_app</Td>
                <Td>
                  アプリが使うデータベース。
                  接続 URL の<strong>末尾に書く DB 名</strong>がこれ
                </Td>
              </tr>
              <tr>
                <Td strong>postgres</Td>
                <Td>
                  インストール時から居る<strong>管理用のデータベース</strong>。
                  アプリのデータは入れない
                </Td>
              </tr>
              <tr>
                <Td strong>Schemas (1) &gt; public</Td>
                <Td>
                  <strong>スキーマ</strong>。既定の <Code>public</Code> が 1 つだけある状態。
                  この下の <strong>Tables</strong> を開くとテーブルが並ぶ
                </Td>
              </tr>
              <tr>
                <Td strong>Login/Group Roles</Td>
                <Td>
                  <strong>DB のユーザー（ロール）一覧</strong>。
                  <Code>postgres</Code> などが登録されている。
                  OS のログインとは別物
                </Td>
              </tr>
            </tbody>
          </table>
        </div>

        <P>
          PostgreSQL は <strong>データベースの中がさらにスキーマで分かれ</strong>、
          何も指定しなければ <Code>public</Code> スキーマが使われます。
          MySQL にはこの階層が無く、<strong>データベース＝スキーマ</strong>です。
          「PostgreSQL でテーブルが見つからない」の原因は、
          スキーマ違いであることがよくあります。
        </P>

        <SubH3>スキーマは何に使うのか</SubH3>
        <P>
          スキーマは<strong>テーブルをまとめておくフォルダ</strong>のようなものです。
          小さいアプリなら <Code>public</Code> だけで足りますが、
          <strong>1 つのデータベースの中を分けたい</strong>ときに使います。
        </P>

        <SchemaExample
          title="例 1：用途ごとに分ける"
          tree={`データベース myapp
├─ スキーマ public       ← アプリが普段読み書きする場所
│  ├─ テーブル users
│  └─ テーブル orders
├─ スキーマ staging      ← 取り込んだ生データの一時置き場
│  └─ テーブル csv_import
└─ スキーマ analytics    ← 集計してできた結果
   └─ テーブル monthly_sales`}
        >
          役割の違うテーブルが<strong>混ざらない</strong>。
          権限はスキーマ単位で渡せるので、
          「分析チームには <Code>analytics</Code> の参照だけ許す」
          といった設定もできる。
        </SchemaExample>

        <SchemaExample
          title="例 2：顧客ごとに区切る"
          tree={`データベース myapp
├─ スキーマ tenant_a     ← A 社のデータ
│  ├─ テーブル users
│  └─ テーブル orders
└─ スキーマ tenant_b     ← B 社のデータ
   ├─ テーブル users
   └─ テーブル orders`}
        >
          中身の構造は同じでも、
          <strong>スキーマが違えば別のテーブル</strong>として扱われる。
          DB を顧客ごとに分けなくても、データを分離できる。
        </SchemaExample>

        <Note>
          ややこしいのは、<strong>「スキーマ」にはもう 1 つの意味がある</strong>ことです。
          「スキーマ変更」「スキーマ設計」と言うときの
          スキーマは<strong>テーブルの定義そのもの</strong>を指していて、
          ここで説明した入れ物のスキーマとは別の話です。
          文脈で読み分けます。
        </Note>
      </section>

      <Link
        href="/infra"
        className="group flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-6 py-5 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            関連ページ
          </p>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            インフラの選び方 (実行環境と DB)
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            RDS か Aurora か、自前で立てるか ── DB を<strong>どこに置くか</strong>の話。
          </p>
        </div>
        <span className="text-2xl text-zinc-400 transition-transform group-hover:translate-x-1 dark:text-zinc-600">
          →
        </span>
      </Link>
    </main>
  );
}

/* ---------------- 部品 ---------------- */

function P({ children }: { children: ReactNode }) {
  return (
    <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
      {children}
    </p>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </div>
  );
}

function Term({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
        {term}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    </div>
  );
}

function SubH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </h3>
  );
}

function Th({ children }: { children?: ReactNode }) {
  return (
    <th className="border border-zinc-200 px-3 py-2 text-left font-semibold text-zinc-800 dark:border-zinc-800 dark:text-zinc-200">
      {children}
    </th>
  );
}

function Td({ children, strong }: { children: ReactNode; strong?: boolean }) {
  return (
    <td
      className={`border border-zinc-200 px-3 py-2 align-top dark:border-zinc-800 ${
        strong ? "font-medium text-zinc-900 dark:text-zinc-100" : ""
      }`}
    >
      {children}
    </td>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
        {label}
      </p>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-200">
        {code}
      </pre>
    </div>
  );
}

function SchemaExample({
  title,
  tree,
  children,
}: {
  title: string;
  tree: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </p>
      <pre className="mt-2 overflow-x-auto rounded-md bg-zinc-50 p-3 font-mono text-[12px] leading-relaxed text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        {tree}
      </pre>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    </div>
  );
}

function SectionH2({
  id,
  num,
  children,
}: {
  id: string;
  num: number;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="flex scroll-mt-6 items-center gap-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
        {num}
      </span>
      <span>{children}</span>
    </h2>
  );
}

function TableOfContents() {
  const items = [
    { id: "memory", num: 1, title: "メモリとストレージ" },
    { id: "why", num: 2, title: "データベースとは何か" },
    { id: "products", num: 3, title: "RDB とよく聞く DB / RDS" },
    { id: "connect", num: 4, title: "つなぐのに要る 5 つの情報" },
    { id: "hierarchy", num: 5, title: "データベースとスキーマの階層" },
  ];
  return (
    <nav className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        目次
      </p>
      <ol className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="flex items-center gap-2 text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
                {it.num.toString().padStart(2, "0")}
              </span>
              <span>{it.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------------- 図 ---------------- */

function DbRoleDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:justify-center sm:gap-4">
      <div className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-center dark:border-zinc-700 dark:bg-zinc-900 sm:w-44">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          アプリ
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
          画面・業務ロジック
        </p>
      </div>

      <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          SQL
        </span>
        <span className="text-2xl leading-none">→</span>
      </div>

      <div className="w-full rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-3 text-center dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-44">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          DB サーバー
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
          PostgreSQL など
        </p>
      </div>

      <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          読み書き
        </span>
        <span className="text-2xl leading-none">→</span>
      </div>

      <div className="w-full rounded-lg border border-violet-300 bg-violet-50 px-4 py-3 text-center dark:border-violet-800 dark:bg-violet-950/30 sm:w-44">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          ストレージ
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
          電源を切っても残る
        </p>
      </div>
    </div>
  );
}

function RdbDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:justify-center sm:gap-5">
      <div className="w-full rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-3 dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-60">
        <p className="font-mono text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
          users（顧客の表）
        </p>
        <p className="mt-1 font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
          <strong>id</strong> / name / email
        </p>
        <p className="mt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          1 … 田中
        </p>
      </div>

      <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          id でつなぐ
        </span>
        <span className="text-2xl leading-none">↔</span>
      </div>

      <div className="w-full rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/30 sm:w-60">
        <p className="font-mono text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
          orders（注文の表）
        </p>
        <p className="mt-1 font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
          id / <strong>user_id</strong> / total
        </p>
        <p className="mt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          101 … user_id=1 … 5,000 円
        </p>
      </div>
    </div>
  );
}

function RdsDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="rounded-lg border border-orange-300 bg-orange-50/60 p-4 dark:border-orange-900/60 dark:bg-orange-950/20">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          RDS（AWS が用意する DB の置き場所）
        </p>
        <p className="mt-0.5 text-[12px] text-zinc-600 dark:text-zinc-400">
          サーバー・バックアップ・故障時の切り替えを AWS が持つ
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {["PostgreSQL", "MySQL / MariaDB", "SQL Server / Oracle"].map((e) => (
            <div
              key={e}
              className="rounded-md border border-indigo-300 bg-indigo-50 px-3 py-2 text-center dark:border-indigo-800 dark:bg-indigo-950/30"
            >
              <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                {e}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[12px] text-zinc-600 dark:text-zinc-400">
          この<strong>どれを動かすかを選ぶ</strong>のが RDS の使い方。
          中で動いているのは、いつもの PostgreSQL / MySQL そのもの。
        </p>
      </div>
    </div>
  );
}

function HierarchyDiagram() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          PostgreSQL
        </p>
        <pre className="mt-2 overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {`サーバー (5432)
└─ データベース myapp
   └─ スキーマ public
      ├─ テーブル users
      └─ テーブル orders`}
        </pre>
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          MySQL
        </p>
        <pre className="mt-2 overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {`サーバー (3306)
└─ データベース myapp   ← これがスキーマ
   ├─ テーブル users
   └─ テーブル orders`}
        </pre>
      </div>
    </div>
  );
}
