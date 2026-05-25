export default function FirewallPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ファイアウォール と FortiGate
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「外から変なやつ入ってくるな」「中から変なところに繋ぐな」を実現する装置。
          一般論としてのファイアウォールと、現場でよく見る <strong>FortiGate (フォーティゲート)</strong> の正体を整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            ファイアウォール = <strong>「通信パケットを 1 個ずつ見て、ルールに合わなければ捨てる門番」</strong>
          </li>
          <li>
            判定材料は <strong>送信元 IP / 宛先 IP / ポート / プロトコル</strong>。
            通信の中身ではなく <strong>「宛先のドアの番号」</strong>を見ている、というイメージ
          </li>
          <li>
            最近主流の <strong>NGFW (次世代ファイアウォール)</strong> は、それに加えて
            <strong>「中身もちょっと開けて」</strong>アプリ判別・侵入検知・アンチウイルスまでやる
          </li>
          <li>
            <strong>FortiGate</strong> = <strong>Fortinet 社の NGFW アプライアンス (専用機)</strong>。日本企業のオフィスではよく見かける鉄板
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="basics" num={2}>
          ファイアウォール = 通信の門番
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ネットワークでは何でも <strong>パケット</strong>という小包に分割して運ばれます。
          ファイアウォールは <strong>ネットワークの境目に立って</strong>、
          通り抜けようとするパケット 1 個ずつに <strong>「お前は通っていいか?」</strong> と判定するだけの装置です。
        </p>

        <GatekeeperDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          パケットには宛名のような情報 (ヘッダ) が付いています。ファイアウォールはここを見て判定する。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">見る項目</th>
                <th className="px-4 py-2 text-left font-semibold">例</th>
                <th className="px-4 py-2 text-left font-semibold">何の情報か</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  送信元 IP
                </td>
                <td className="px-4 py-2 font-mono text-xs">192.168.1.42</td>
                <td className="px-4 py-2">誰から来たパケットか</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  宛先 IP
                </td>
                <td className="px-4 py-2 font-mono text-xs">142.250.207.78</td>
                <td className="px-4 py-2">どこ宛か (例: Google のサーバ)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  プロトコル
                </td>
                <td className="px-4 py-2 font-mono text-xs">TCP / UDP / ICMP</td>
                <td className="px-4 py-2">運び方の種類</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  宛先ポート
                </td>
                <td className="px-4 py-2 font-mono text-xs">443 (HTTPS)</td>
                <td className="px-4 py-2">宛先サーバの「どのドア」を叩くか</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  送信元ポート
                </td>
                <td className="px-4 py-2 font-mono text-xs">51234</td>
                <td className="px-4 py-2">差出人側の口 (ランダム)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よくある用語: インバウンド / アウトバウンド
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>インバウンド</strong> = 外 (インターネット) から内 (社内 LAN) へ来る通信
            </li>
            <li>
              ・<strong>アウトバウンド</strong> = 内から外へ出ていく通信
            </li>
            <li>
              ・通常はそれぞれに対して別々のルールを書く
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="rules" num={3}>
          ルール: 何を許可して何を弾くか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ファイアウォールには <strong>ルールを上から順に並べたリスト</strong>があり、
          パケットが来たら <strong>上から評価して、最初にマッチしたルールが適用</strong>されます。
          どれにもマッチしなかったら <strong>暗黙の「拒否」</strong>になるのが基本。
        </p>

        <RuleTableDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          典型的なオフィスのルール例:
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">#</th>
                <th className="px-3 py-2 text-left font-semibold">方向</th>
                <th className="px-3 py-2 text-left font-semibold">送信元</th>
                <th className="px-3 py-2 text-left font-semibold">宛先</th>
                <th className="px-3 py-2 text-left font-semibold">ポート</th>
                <th className="px-3 py-2 text-left font-semibold">動作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">Out</td>
                <td className="px-3 py-2 font-mono text-xs">社内 LAN</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 font-mono text-xs">80, 443</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">許可</td>
              </tr>
              <tr>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">Out</td>
                <td className="px-3 py-2 font-mono text-xs">社内 LAN</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 font-mono text-xs">53 (DNS)</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">許可</td>
              </tr>
              <tr>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">In</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 font-mono text-xs">Web サーバ</td>
                <td className="px-3 py-2 font-mono text-xs">443</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">許可</td>
              </tr>
              <tr>
                <td className="px-3 py-2">4</td>
                <td className="px-3 py-2">In</td>
                <td className="px-3 py-2 font-mono text-xs">VPN 拠点</td>
                <td className="px-3 py-2 font-mono text-xs">社内 LAN</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 text-emerald-700 dark:text-emerald-400">許可</td>
              </tr>
              <tr className="bg-rose-50 dark:bg-rose-950/20">
                <td className="px-3 py-2">99</td>
                <td className="px-3 py-2">All</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 font-mono text-xs">any</td>
                <td className="px-3 py-2 text-rose-700 dark:text-rose-400">拒否 (暗黙)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ポイント: 「許可ルール」を <strong>必要な分だけ並べて</strong>、それ以外は全部弾く。
          <strong>「明示的に許可されていないものは拒否」</strong>が基本姿勢 (= デフォルト deny)。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="evolution" num={4}>
          進化: パケットフィルタから NGFW へ
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ファイアウォールは <strong>3 世代</strong>に分けて発展してきました。
          今のオフィスにある FortiGate などは一番右の <strong>NGFW</strong> 世代です。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
              第 1 世代 (1980s〜)
            </p>
            <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              パケットフィルタ
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              ヘッダの <strong>IP・ポート・プロトコル</strong>を見て判定するだけ。
              シンプルだが <strong>応答パケットを別ルールで明示的に許可</strong>する必要があり管理が大変。
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              第 2 世代 (1990s〜)
            </p>
            <h3 className="mt-1 text-sm font-semibold text-blue-900 dark:text-blue-200">
              ステートフル
            </h3>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              <strong>「どのコネクションが今開いてるか」を覚える</strong>ようになった。
              「内から出した通信の応答」だけ自動で許可できる。今のファイアウォールはほぼ全部これ以降。
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              第 3 世代 (2010s〜)
            </p>
            <h3 className="mt-1 text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              NGFW (次世代)
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              <strong>ヘッダだけでなく中身も見る</strong>。
              SSL 復号 / アプリ識別 / 侵入検知 / アンチウイルス / Web カテゴリフィルタ。
              <strong>FortiGate はここ</strong>。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            なぜ「中身を見る」必要が出てきたか
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            昔は「ポート 80 = HTTP」のように <strong>ポートと用途が一致</strong>していたので、
            ポートで弾けば用途を制限できた。今は <strong>全部が HTTPS (443)</strong> に集約されていて、
            YouTube も Gmail も社内システムも <strong>同じポート</strong>を使う。
            なので「Gmail は OK だが YouTube はダメ」みたいな制御には <strong>中身を見る必要</strong>がある ── これが NGFW の発端。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="fortigate" num={5}>
          FortiGate (フォーティゲート) とは
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>FortiGate</strong> は <strong>Fortinet 社</strong>が出している
          <strong>NGFW のハードウェアアプライアンス</strong> (専用機)。
          日本のオフィスの「インターネットに出る境目」に置かれている黒い箱は、
          だいたい FortiGate か Cisco ASA か Palo Alto Networks のどれかです。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              実体は何か
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>
                ・<strong>専用ハードウェア (1U サイズの箱)</strong>。家庭用ルータの強力版に近い見た目
              </li>
              <li>
                ・OS は独自の <strong>FortiOS</strong>
              </li>
              <li>
                ・<strong>ASIC (専用チップ)</strong>で暗号処理を高速化しているのが売り
              </li>
              <li>
                ・<strong>FortiGate-VM</strong> (ソフト版・クラウド版) もある
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              なぜ「ゲート (gate)」?
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              社内 LAN とインターネットの <strong>境目に立つ「門」</strong>として置かれるから。
              通常 <strong>1 拠点に 1 台 (冗長化なら 2 台)</strong> 設置され、
              ここを通らないと外に出られない・中に入れない構造を作る。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            FortiGate が <strong>1 台で</strong> やってくれること (UTM 機能)
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            FortiGate は <strong>UTM (Unified Threat Management)</strong> という分類で、
            これ 1 台で多数のセキュリティ機能を兼ねます ── これが選ばれる最大の理由。
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-1 text-sm text-emerald-900/80 sm:grid-cols-2 dark:text-emerald-300">
            <li>・<strong>ファイアウォール</strong> (ルールベース)</li>
            <li>・<strong>VPN</strong> (IPSec / SSL-VPN で拠点間や在宅接続)</li>
            <li>・<strong>IPS</strong> (侵入防止: 既知の攻撃パターンを遮断)</li>
            <li>・<strong>アンチウイルス</strong> (通信中のファイルをスキャン)</li>
            <li>・<strong>Web フィルタ</strong> (カテゴリ別にサイトを制限)</li>
            <li>・<strong>アプリ制御</strong> (Facebook 禁止、Teams は許可、等)</li>
            <li>・<strong>SSL 復号</strong> (中身検査のため一時復号)</li>
            <li>・<strong>ルーティング・NAT</strong> (基本のルータ機能も兼ねる)</li>
          </ul>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            ルールはどこに書く? → FortiGate <strong>本体に直接</strong>
          </p>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            インバウンド / アウトバウンドのルール (FortiGate では <strong>「ポリシー (Policy)」</strong>と呼ぶ) は、
            <strong>FortiGate の箱そのものにログインして書き込み</strong>ます。
            設定はその箱の中に保存され、そこを通る全パケットに適用される ── という単純な構造です。
          </p>

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">アクセス方法は 3 つ</p>
          <ul className="mt-1 flex flex-col gap-1 text-sm text-blue-900/80 dark:text-blue-300">
            <li>
              ・<strong>GUI (Web)</strong>: ブラウザで <code className="rounded bg-white/60 px-1 font-mono text-xs dark:bg-blue-950/50">https://&lt;FortiGate の IP&gt;</code> にアクセス。
              日常運用で一番使われる管理画面
            </li>
            <li>
              ・<strong>CLI</strong>: SSH 接続 or コンソールケーブル。設定の自動化・テンプレ化に
            </li>
            <li>
              ・<strong>FortiManager</strong>: 複数台ある時の集中管理画面。各拠点の FortiGate を 1 か所から
            </li>
          </ul>

          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-300">
            GUI を開くと <strong>「ポリシー &amp; オブジェクト → ファイアウォールポリシー」</strong>に一覧があり、
            各行が 1 ルールです。実際の画面はおおむねこんな構造:
          </p>

          <div className="mt-3 overflow-hidden rounded-md border border-blue-200 dark:border-blue-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold">Name</th>
                  <th className="px-2 py-1.5 text-left font-semibold">From</th>
                  <th className="px-2 py-1.5 text-left font-semibold">To</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Source</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Dest</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Service</th>
                  <th className="px-2 py-1.5 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 bg-white text-blue-900/90 dark:divide-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
                <tr>
                  <td className="px-2 py-1.5 font-mono">allow-web-out</td>
                  <td className="px-2 py-1.5 font-mono">internal</td>
                  <td className="px-2 py-1.5 font-mono">wan1</td>
                  <td className="px-2 py-1.5 font-mono">LAN_subnet</td>
                  <td className="px-2 py-1.5 font-mono">all</td>
                  <td className="px-2 py-1.5 font-mono">HTTPS</td>
                  <td className="px-2 py-1.5 text-emerald-700 dark:text-emerald-400">Accept</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">allow-web-srv-in</td>
                  <td className="px-2 py-1.5 font-mono">wan1</td>
                  <td className="px-2 py-1.5 font-mono">dmz</td>
                  <td className="px-2 py-1.5 font-mono">all</td>
                  <td className="px-2 py-1.5 font-mono">Web_srv</td>
                  <td className="px-2 py-1.5 font-mono">HTTPS</td>
                  <td className="px-2 py-1.5 text-emerald-700 dark:text-emerald-400">Accept</td>
                </tr>
                <tr>
                  <td className="px-2 py-1.5 font-mono">allow-vpn</td>
                  <td className="px-2 py-1.5 font-mono">vpn-tun</td>
                  <td className="px-2 py-1.5 font-mono">internal</td>
                  <td className="px-2 py-1.5 font-mono">VPN_users</td>
                  <td className="px-2 py-1.5 font-mono">LAN_subnet</td>
                  <td className="px-2 py-1.5 font-mono">ALL</td>
                  <td className="px-2 py-1.5 text-emerald-700 dark:text-emerald-400">Accept</td>
                </tr>
                <tr className="bg-rose-50 dark:bg-rose-950/30">
                  <td className="px-2 py-1.5 font-mono text-rose-900 dark:text-rose-200">implicit-deny</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 font-mono">any</td>
                  <td className="px-2 py-1.5 text-rose-700 dark:text-rose-400">Deny</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-sm font-medium text-blue-900 dark:text-blue-200">
            ポイント: インバウンド / アウトバウンドは <strong>「From → To のインターフェース」</strong>で表現される
          </p>
          <ul className="mt-1 flex flex-col gap-1 text-sm text-blue-900/80 dark:text-blue-300">
            <li>
              ・<strong>wan1 → internal</strong> = <strong>インバウンド</strong> (外から社内へ来る通信)
            </li>
            <li>
              ・<strong>internal → wan1</strong> = <strong>アウトバウンド</strong> (社内から外へ出る通信)
            </li>
            <li>
              ・<strong>internal → dmz</strong>、<strong>vpn-tun → internal</strong> など、ゾーン間の通信も同じ書き方で表現
            </li>
          </ul>

          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-300">
            つまり「インバウンド」「アウトバウンド」というのは <strong>概念上の呼び方</strong>であって、
            FortiGate 上では <strong>「どのインターフェースから入って、どのインターフェースへ出るか」</strong>として
            機械的に定義される、というのが実体です。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            周辺製品: Fortinet 製品はファミリーで揃えるのが普通
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>FortiManager</strong> = 複数の FortiGate を <strong>集中管理</strong>するサーバ
            </li>
            <li>
              ・<strong>FortiAnalyzer</strong> = ログを集めて <strong>レポート・分析</strong>するサーバ
            </li>
            <li>
              ・<strong>FortiSwitch / FortiAP</strong> = スイッチ / 無線 AP。FortiGate から一元管理できる
            </li>
            <li>
              ・<strong>FortiClient</strong> = 端末側に入れる VPN クライアント + EPP
            </li>
          </ul>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            これらをまとめて <strong>「Security Fabric」</strong>と呼んでいて、
            「全部 Fortinet で揃えると統合管理できる」というのが営業メッセージ。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="topology" num={6}>
          配置例: オフィスでの位置
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          典型的な中小企業の構成だと、FortiGate は <strong>「インターネット回線とオフィス内 LAN の間」</strong>に
          鎮座します。社員の PC から外部へのアクセスも、外部からの応答も <strong>必ずここを通る</strong>。
        </p>

        <TopologyDiagram />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          公開する Web サーバなどは <strong>DMZ (非武装地帯)</strong> という別ゾーンに置き、
          「外から DMZ までは許可するが DMZ から社内 LAN への侵入は厳しく制限」という構成にするのが定石です。
          FortiGate のような UTM は <strong>このゾーン分割と各ゾーン間のルール</strong>を 1 台で全部管理できます。
        </p>
      </section>
    </main>
  );
}

function GatekeeperDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 320" className="mx-auto w-full max-w-2xl">
        <rect
          x="10"
          y="50"
          width="240"
          height="240"
          rx="10"
          className="fill-amber-50/60 stroke-amber-400 dark:fill-amber-950/20 dark:stroke-amber-700"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="130" y="42" textAnchor="middle" className="fill-amber-800 text-xs font-semibold dark:fill-amber-300">
          ネットワーク A: インターネット (信頼できない)
        </text>

        <g>
          <circle cx="55" cy="120" r="14" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600" strokeWidth="1.2" />
          <text x="55" y="124" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">PC</text>
          <circle cx="55" cy="200" r="14" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600" strokeWidth="1.2" />
          <text x="55" y="204" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">サーバ</text>
          <circle cx="55" cy="260" r="14" className="fill-amber-100 stroke-amber-500 dark:fill-amber-950/40 dark:stroke-amber-600" strokeWidth="1.2" />
          <text x="55" y="264" textAnchor="middle" className="fill-amber-800 text-[9px] dark:fill-amber-300">攻撃者</text>
        </g>

        <rect x="280" y="100" width="60" height="160" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="310" y="175" textAnchor="middle" className="fill-zinc-50 text-xs font-semibold dark:fill-zinc-900">FW</text>
        <text x="310" y="192" textAnchor="middle" className="fill-zinc-300 text-[9px] dark:fill-zinc-600">門番</text>

        <rect
          x="370"
          y="50"
          width="220"
          height="240"
          rx="10"
          className="fill-emerald-50/60 stroke-emerald-400 dark:fill-emerald-950/20 dark:stroke-emerald-700"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="480" y="42" textAnchor="middle" className="fill-emerald-800 text-xs font-semibold dark:fill-emerald-300">
          ネットワーク B: 社内 LAN (信頼)
        </text>

        <g>
          <circle cx="555" cy="120" r="14" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950/40 dark:stroke-emerald-600" strokeWidth="1.2" />
          <text x="555" y="124" textAnchor="middle" className="fill-emerald-800 text-[9px] dark:fill-emerald-300">PC</text>
          <circle cx="555" cy="200" r="14" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950/40 dark:stroke-emerald-600" strokeWidth="1.2" />
          <text x="555" y="204" textAnchor="middle" className="fill-emerald-800 text-[9px] dark:fill-emerald-300">Web</text>
          <circle cx="555" cy="260" r="14" className="fill-emerald-100 stroke-emerald-500 dark:fill-emerald-950/40 dark:stroke-emerald-600" strokeWidth="1.2" />
          <text x="555" y="264" textAnchor="middle" className="fill-emerald-800 text-[9px] dark:fill-emerald-300">DB</text>
        </g>

        <rect x="90" y="105" width="120" height="32" rx="4" className="fill-white stroke-emerald-500 dark:fill-zinc-900 dark:stroke-emerald-500" strokeWidth="1.4" />
        <text x="150" y="117" textAnchor="middle" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">パケット A</text>
        <text x="150" y="130" textAnchor="middle" className="fill-zinc-700 font-mono text-[8px] dark:fill-zinc-300">dst:443 (HTTPS)</text>

        <line x1="210" y1="121" x2="278" y2="121" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#gk-arrow-ok)" />
        <line x1="342" y1="121" x2="410" y2="121" className="stroke-emerald-500" strokeWidth="2" markerEnd="url(#gk-arrow-ok)" />

        <rect x="420" y="105" width="120" height="32" rx="4" className="fill-white stroke-emerald-500 dark:fill-zinc-900 dark:stroke-emerald-500" strokeWidth="1.4" />
        <text x="480" y="117" textAnchor="middle" className="fill-emerald-700 text-[9px] font-semibold dark:fill-emerald-400">パケット A</text>
        <text x="480" y="130" textAnchor="middle" className="fill-zinc-700 font-mono text-[8px] dark:fill-zinc-300">✓ 通過</text>

        <rect x="90" y="225" width="120" height="32" rx="4" className="fill-white stroke-rose-500 dark:fill-zinc-900 dark:stroke-rose-500" strokeWidth="1.4" />
        <text x="150" y="237" textAnchor="middle" className="fill-rose-700 text-[9px] font-semibold dark:fill-rose-400">パケット B</text>
        <text x="150" y="250" textAnchor="middle" className="fill-zinc-700 font-mono text-[8px] dark:fill-zinc-300">dst:22 (SSH)</text>

        <line x1="210" y1="241" x2="272" y2="241" className="stroke-rose-500" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#gk-arrow-ng)" />
        <text x="305" y="246" textAnchor="middle" className="fill-rose-600 text-base font-bold dark:fill-rose-400">✕</text>
        <text x="240" y="275" textAnchor="middle" className="fill-rose-700 text-[9px] dark:fill-rose-400">
          ルールに合わない → ここで破棄
        </text>

        <text x="300" y="312" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          2 つのネットワークの境目に FW が立ち、流れてくる<strong>パケット 1 個ずつ</strong>を判定する
        </text>

        <defs>
          <marker id="gk-arrow-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-emerald-500" />
          </marker>
          <marker id="gk-arrow-ng" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function RuleTableDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
        <div className="flex flex-col gap-1 text-xs">
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
            1. allow 443/tcp
          </div>
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
            2. allow 53/udp
          </div>
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
            3. allow 80/tcp
          </div>
          <div className="rounded-md border border-zinc-300 bg-zinc-50 px-3 py-1 font-mono text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
            … (続く)
          </div>
          <div className="rounded-md border border-rose-300 bg-rose-50 px-3 py-1 font-mono text-rose-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
            99. deny any (暗黙)
          </div>
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-500 sm:max-w-xs">
          <p>
            パケットが来ると <strong>1 → 2 → 3 …</strong> と上から順に評価。
            最初にマッチしたルールで <strong>即決</strong>。
          </p>
          <p className="mt-2">
            どれにも当たらなければ最後の <strong className="text-rose-700 dark:text-rose-400">deny</strong> で
            拒否 (= 明示的に許可されないものは弾く)。
          </p>
        </div>
      </div>
    </div>
  );
}

function TopologyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 320" className="mx-auto w-full max-w-2xl">
        <rect x="240" y="20" width="120" height="40" rx="6" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="300" y="45" textAnchor="middle" className="fill-amber-900 text-xs font-semibold dark:fill-amber-200">
          インターネット
        </text>

        <line x1="300" y1="60" x2="300" y2="90" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="220" y="90" width="160" height="50" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="300" y="113" textAnchor="middle" className="fill-zinc-50 text-sm font-semibold dark:fill-zinc-900">
          FortiGate
        </text>
        <text x="300" y="130" textAnchor="middle" className="fill-zinc-300 text-[10px] dark:fill-zinc-600">
          境界ファイアウォール
        </text>

        <line x1="220" y1="140" x2="120" y2="180" className="stroke-zinc-400" strokeWidth="1.5" />
        <rect x="40" y="180" width="160" height="50" rx="6" className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700" strokeWidth="1.5" />
        <text x="120" y="203" textAnchor="middle" className="fill-rose-900 text-xs font-semibold dark:fill-rose-200">
          DMZ
        </text>
        <text x="120" y="220" textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-400">
          公開 Web サーバ等
        </text>

        <line x1="380" y1="140" x2="480" y2="180" className="stroke-zinc-400" strokeWidth="1.5" />
        <rect x="400" y="180" width="160" height="50" rx="6" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="480" y="203" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">
          社内 LAN
        </text>
        <text x="480" y="220" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          社員 PC / ファイルサーバ
        </text>

        <line x1="480" y1="230" x2="480" y2="260" className="stroke-zinc-300" strokeWidth="1" />
        <g className="fill-zinc-700 text-[10px] dark:fill-zinc-300" textAnchor="middle">
          <text x="420" y="275">スイッチ</text>
          <text x="540" y="275">無線 AP</text>
        </g>
        <g className="fill-zinc-500 text-[9px] dark:fill-zinc-500" textAnchor="middle">
          <text x="420" y="290">(FortiSwitch)</text>
          <text x="540" y="290">(FortiAP)</text>
        </g>

        <text x="300" y="315" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          インターネットと社内の間に 1 台。DMZ・社内 LAN を別ゾーンに分けて、ゾーン間のルールも FortiGate が制御する
        </text>
      </svg>
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
    { id: "intro", num: 1, title: "先に結論" },
    { id: "basics", num: 2, title: "通信の門番" },
    { id: "rules", num: 3, title: "ルール" },
    { id: "evolution", num: 4, title: "進化 (NGFW)" },
    { id: "fortigate", num: 5, title: "FortiGate とは" },
    { id: "topology", num: 6, title: "配置例" },
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
