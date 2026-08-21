export default function DirectConnectPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Direct Connect (オンプレと AWS を専用線で繋ぐ)
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          自社のデータセンターや病院内のサーバ室と AWS を、
          <strong>インターネットを経由せず</strong>物理的な回線で直結するサービスです。
          「速い」よりも <strong>「品質が読める」</strong>のが本質。
        </p>
      </header>

      <OverviewDiagram />

      <section className="flex flex-col gap-4 rounded-lg border-2 border-amber-300 bg-amber-50/30 px-6 py-5 dark:border-amber-800 dark:bg-amber-950/20">
        <h2 id="hosted" className="scroll-mt-6 text-lg font-semibold text-amber-900 dark:text-amber-200">
          補足: なぜ「KDDI が AWS と契約している」のか
        </h2>
        <p className="text-sm text-amber-950/90 dark:text-amber-200/90">
          Direct Connect には申し込み方が 2 通りあり、
          弊社が使っているのは <strong>ホスト接続 (Hosted Connection)</strong> の方です。
          この形では <strong>AWS と直接契約しているのは KDDI</strong> で、
          弊社は<strong>その回線の一部を分けてもらっている</strong>立場になります。
        </p>

        <HostedConnectionDiagram />

        <p className="text-sm text-amber-950/90 dark:text-amber-200/90">
          KDDI は AWS と <strong>10 Gbps などの太い専有接続</strong>をあらかじめ結んでおき、
          それを <strong>50 Mbps 〜 の単位で顧客ごとに切り分けて</strong>提供しています。
          弊社ごとに新しい物理回線を AWS まで引いているわけではありません。
        </p>

        <h3 className="mt-2 text-base font-semibold text-amber-900 dark:text-amber-200">
          では、他社とどうやって分けているのか
        </h3>
        <p className="text-sm text-amber-950/90 dark:text-amber-200/90">
          分けているのは <strong>IP アドレスの範囲ではありません</strong>。
          パケット 1 つ 1 つに <strong>「VLAN 番号」という札</strong>を付けて、
          その札で行き先を仕分けています。
        </p>

        <VlanSplitDiagram />

      </section>


      <section className="flex flex-col gap-5">
        <h2 id="ours" className="scroll-mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          すでに動いているサービスに Direct Connect を足すと、何が増えるのか
        </h2>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          <strong>インターネット経由ではもう動いている</strong>ものとします
          （ALB があって、公開ドメインでアクセスできて、DB も繋がっている状態）。
          そこに Direct Connect を追加するとき、<strong>増える作業だけ</strong>を並べます。
        </p>

        <AwsSideDiagram />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              触らないもの（作業ゼロ）
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・アプリのコード</li>
              <li>・EC2 / ECS / RDS</li>
              <li>・ALB</li>
              <li>・既存のインターネット向けの経路</li>
            </ul>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              → <strong>今までのインターネット経由のアクセスもそのまま生きる</strong>。
              入口が 1 つ増えるだけ
            </p>
          </div>
          <div className="rounded-lg border-2 border-blue-400 bg-blue-50/40 p-4 dark:border-blue-700 dark:bg-blue-950/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              増えるもの
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-blue-900 dark:text-blue-200">
              <li>・<strong>VGW</strong>（新しく作る）</li>
              <li>・<strong>接続と VIF の承認</strong>（新しくやる）</li>
              <li>・<strong>ルートテーブルに 1 行</strong>（既存に追記）</li>
              <li>・<strong>セキュリティグループに 1 行</strong>（既存に追記）</li>
            </ul>
            <p className="mt-3 text-xs text-blue-700 dark:text-blue-400">
              → 新規に作るのは <strong>VGW だけ</strong>。あとは既存への追記
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          追加された経路は、こういう順番で関門を通ります。
        </p>

        <PacketPathDiagram />

        <div className="flex flex-col gap-3">
          <SetupStep
            num={1}
            tag="新規"
            title="VGW を作って VPC にアタッチする"
            resources={["aws_vpn_gateway", "aws_vpn_gateway_attachment"]}
          >
            外部接続用の入口を VPC に生やします。
            決めるのは <strong>AWS 側の BGP ASN</strong>（プライベート ASN でよい）だけ。
            1 つの VPC に 1 つ付けられます。
          </SetupStep>

          <SetupStep
            num={2}
            tag="新規"
            title="KDDI から来た接続と VIF を承認する"
            resources={[
              "aws_dx_connection_confirmation",
              "aws_dx_hosted_private_virtual_interface_accepter",
            ]}
          >
            連絡された ID を承認し、<strong>① で作った VGW に紐づける</strong>だけ。
            VLAN・帯域・BGP の設定値は KDDI 側で決まっているので、書く欄がありません。
          </SetupStep>

        </div>

      </section>

    </main>
  );
}

function OverviewDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        全体像
      </p>
      <svg viewBox="0 0 680 330" className="mx-auto w-full max-w-3xl">
        <text x="340" y="30" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          病院 と 弊社の AWS を、インターネットを通らずに繋ぐ
        </text>

        <rect x="20" y="70" width="180" height="140" rx="10" className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700" strokeWidth="1.8" />
        <text x="110" y="105" textAnchor="middle" className="fill-emerald-900 text-sm font-bold dark:fill-emerald-200">病院</text>
        <text x="110" y="132" textAnchor="middle" className="fill-emerald-800 text-[11px] dark:fill-emerald-300">電子カルテ / 部門システム</text>
        <text x="110" y="152" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">院内 LAN</text>
        <text x="110" y="176" textAnchor="middle" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">192.168.0.0/16</text>
        <text x="110" y="196" textAnchor="middle" className="fill-emerald-700 text-[9px] dark:fill-emerald-400">端末・サーバ室のルータ</text>

        <line x1="200" y1="140" x2="250" y2="140" className="stroke-zinc-500" strokeWidth="3" />

        <rect x="250" y="60" width="180" height="160" rx="10" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.8" />
        <text x="340" y="92" textAnchor="middle" className="fill-amber-900 text-sm font-bold dark:fill-amber-200">KDDI</text>
        <text x="340" y="116" textAnchor="middle" className="fill-amber-800 text-[11px] dark:fill-amber-300">閉域網 (IP-VPN)</text>
        <line x1="266" y1="132" x2="414" y2="132" className="stroke-amber-400 dark:stroke-amber-700" strokeWidth="1" strokeDasharray="4 3" />
        <text x="340" y="155" textAnchor="middle" className="fill-amber-900 text-[11px] font-semibold dark:fill-amber-200">DX ロケーション</text>
        <text x="340" y="173" textAnchor="middle" className="fill-amber-700 text-[9px] dark:fill-amber-400">Equinix TY2 など</text>
        <text x="340" y="196" textAnchor="middle" className="fill-amber-700 text-[10px] dark:fill-amber-400">AWS のルータと相互接続</text>

        <line x1="430" y1="140" x2="480" y2="140" className="stroke-blue-500" strokeWidth="3" />

        <rect x="480" y="70" width="180" height="140" rx="10" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.8" />
        <text x="570" y="105" textAnchor="middle" className="fill-blue-900 text-sm font-bold dark:fill-blue-200">弊社の AWS</text>
        <text x="570" y="132" textAnchor="middle" className="fill-blue-800 text-[11px] dark:fill-blue-300">VPC (ap-northeast-1)</text>
        <text x="570" y="152" textAnchor="middle" className="fill-blue-700 text-[10px] dark:fill-blue-400">EC2 / RDS</text>
        <text x="570" y="176" textAnchor="middle" className="fill-zinc-600 font-mono text-[10px] dark:fill-zinc-400">10.0.0.0/16</text>
        <text x="570" y="196" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">入口は VGW</text>

        <line x1="20" y1="252" x2="20" y2="262" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" />
        <line x1="20" y1="257" x2="340" y2="257" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" />
        <line x1="340" y1="252" x2="340" y2="262" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" />
        <text x="180" y="278" textAnchor="middle" className="fill-zinc-600 text-[11px] font-semibold dark:fill-zinc-400">KDDI と契約する回線</text>
        <text x="180" y="294" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">AWS の請求書には出てこない</text>

        <line x1="340" y1="252" x2="340" y2="262" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="1.5" />
        <line x1="340" y1="257" x2="660" y2="257" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="1.5" />
        <line x1="660" y1="252" x2="660" y2="262" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="1.5" />
        <text x="500" y="278" textAnchor="middle" className="fill-blue-600 text-[11px] font-semibold dark:fill-blue-400">ここが Direct Connect</text>
        <text x="500" y="294" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">AWS に払う (ポート時間料金 + 転送料)</text>

        <text x="340" y="320" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          病院の端末から見ると、弊社の EC2 / RDS が「院内にあるサーバ」と同じように見える
        </text>
      </svg>
    </div>
  );
}

function HostedConnectionDiagram() {
  return (
    <div className="rounded-lg border border-amber-200 bg-white p-6 dark:border-amber-900 dark:bg-zinc-950">
      <svg viewBox="0 0 660 250" className="mx-auto w-full max-w-2xl">
        <text x="85" y="24" textAnchor="middle" className="fill-zinc-600 text-[10px] font-semibold dark:fill-zinc-400">KDDI の顧客</text>

        <rect x="20" y="38" width="130" height="46" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.8" />
        <text x="85" y="58" textAnchor="middle" className="fill-blue-900 text-[11px] font-bold dark:fill-blue-200">弊社</text>
        <text x="85" y="74" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">100 Mbps</text>

        <rect x="20" y="100" width="130" height="46" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.2" />
        <text x="85" y="120" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">別の会社</text>
        <text x="85" y="136" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">1 Gbps</text>

        <rect x="20" y="162" width="130" height="46" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.2" />
        <text x="85" y="182" textAnchor="middle" className="fill-zinc-700 text-[11px] dark:fill-zinc-300">別の会社</text>
        <text x="85" y="198" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">50 Mbps</text>

        <line x1="150" y1="61" x2="250" y2="105" className="stroke-blue-500" strokeWidth="2" />
        <line x1="150" y1="123" x2="250" y2="123" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" />
        <line x1="150" y1="185" x2="250" y2="141" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" />

        <rect x="250" y="62" width="150" height="122" rx="10" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.8" />
        <text x="325" y="92" textAnchor="middle" className="fill-amber-900 text-sm font-bold dark:fill-amber-200">KDDI</text>
        <text x="325" y="116" textAnchor="middle" className="fill-amber-800 text-[10px] dark:fill-amber-300">太い回線を</text>
        <text x="325" y="132" textAnchor="middle" className="fill-amber-800 text-[10px] dark:fill-amber-300">顧客ごとに切り分ける</text>
        <text x="325" y="158" textAnchor="middle" className="fill-amber-700 text-[10px] font-semibold dark:fill-amber-400">= ホスト接続</text>

        <line x1="400" y1="123" x2="500" y2="123" className="stroke-amber-600 dark:stroke-amber-500" strokeWidth="7" />
        <text x="450" y="108" textAnchor="middle" className="fill-zinc-700 text-[10px] font-semibold dark:fill-zinc-300">10 Gbps 専有接続</text>
        <text x="450" y="146" textAnchor="middle" className="fill-red-600 text-[10px] font-semibold dark:fill-red-400">契約者は KDDI</text>

        <rect x="500" y="62" width="140" height="122" rx="10" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.8" />
        <text x="570" y="105" textAnchor="middle" className="fill-blue-900 text-sm font-bold dark:fill-blue-200">AWS</text>
        <text x="570" y="130" textAnchor="middle" className="fill-blue-800 text-[10px] dark:fill-blue-300">Direct Connect</text>
        <text x="570" y="150" textAnchor="middle" className="fill-blue-700 text-[9px] dark:fill-blue-400">DX ロケーションのポート</text>

        <text x="330" y="228" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          AWS から見た契約相手は KDDI。弊社は「KDDI の回線の一部を払い出してもらう」立場
        </text>
        <text x="330" y="245" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
          日本の Direct Connect はこの形が大多数
        </text>
      </svg>
    </div>
  );
}

function VlanSplitDiagram() {
  return (
    <div className="rounded-lg border border-amber-200 bg-white p-6 dark:border-amber-900 dark:bg-zinc-950">
      <svg viewBox="0 0 660 270" className="mx-auto w-full max-w-2xl">
        <rect x="14" y="95" width="106" height="70" rx="8" className="fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700" strokeWidth="1.6" />
        <text x="67" y="125" textAnchor="middle" className="fill-amber-900 text-[12px] font-bold dark:fill-amber-200">KDDI</text>
        <text x="67" y="145" textAnchor="middle" className="fill-amber-700 text-[9px] dark:fill-amber-400">札を付ける</text>

        <rect x="136" y="40" width="344" height="180" rx="12" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900/60 dark:stroke-zinc-700" strokeWidth="1.4" strokeDasharray="6 4" />
        <text x="308" y="32" textAnchor="middle" className="fill-zinc-600 text-[10px] font-semibold dark:fill-zinc-400">
          1 本の光ファイバ (10 Gbps) ── 物理は全社で共用
        </text>

        <line x1="120" y1="80" x2="490" y2="80" className="stroke-blue-500" strokeWidth="3" />
        <rect x="240" y="66" width="76" height="26" rx="5" className="fill-blue-100 stroke-blue-500 dark:fill-blue-950/60 dark:stroke-blue-600" strokeWidth="1.4" />
        <text x="278" y="84" textAnchor="middle" className="fill-blue-900 text-[11px] font-bold dark:fill-blue-200">VLAN 100</text>
        <text x="168" y="74" textAnchor="middle" className="fill-blue-700 text-[10px] font-bold dark:fill-blue-400">弊社</text>

        <line x1="120" y1="130" x2="490" y2="130" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2.2" />
        <rect x="240" y="116" width="76" height="26" rx="5" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.2" />
        <text x="278" y="134" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">VLAN 200</text>
        <text x="168" y="124" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">A 社</text>

        <line x1="120" y1="180" x2="490" y2="180" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2.2" />
        <rect x="240" y="166" width="76" height="26" rx="5" className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600" strokeWidth="1.2" />
        <text x="278" y="184" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">VLAN 300</text>
        <text x="168" y="174" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">B 社</text>

        <rect x="490" y="55" width="62" height="150" rx="8" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.6" />
        <text x="521" y="115" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">AWS の</text>
        <text x="521" y="130" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">ルータ</text>
        <text x="521" y="150" textAnchor="middle" className="fill-blue-700 text-[8px] dark:fill-blue-400">札で仕分け</text>

        <line x1="552" y1="80" x2="572" y2="80" className="stroke-blue-500" strokeWidth="2" />
        <rect x="572" y="58" width="76" height="44" rx="6" className="fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700" strokeWidth="1.6" />
        <text x="610" y="78" textAnchor="middle" className="fill-blue-900 text-[10px] font-bold dark:fill-blue-200">弊社 VPC</text>
        <text x="610" y="92" textAnchor="middle" className="fill-zinc-600 font-mono text-[8px] dark:fill-zinc-400">10.0.0.0/16</text>

        <line x1="552" y1="130" x2="572" y2="130" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
        <rect x="572" y="108" width="76" height="44" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.2" />
        <text x="610" y="128" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">A 社 VPC</text>
        <text x="610" y="142" textAnchor="middle" className="fill-zinc-500 font-mono text-[8px] dark:fill-zinc-500">10.0.0.0/16</text>

        <line x1="552" y1="180" x2="572" y2="180" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.6" />
        <rect x="572" y="158" width="76" height="44" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.2" />
        <text x="610" y="178" textAnchor="middle" className="fill-zinc-700 text-[10px] dark:fill-zinc-300">B 社 VPC</text>
        <text x="610" y="192" textAnchor="middle" className="fill-zinc-500 font-mono text-[8px] dark:fill-zinc-500">172.16.0.0/16</text>

        <text x="330" y="244" textAnchor="middle" className="fill-zinc-700 text-[11px] font-semibold dark:fill-zinc-300">
          同じケーブルを流れていても、札が違えば行き先が混ざることはない
        </text>
        <text x="330" y="262" textAnchor="middle" className="fill-emerald-700 text-[10px] font-semibold dark:fill-emerald-400">
          弊社と A 社の VPC が同じ 10.0.0.0/16 でも、お互い一切影響しない
        </text>
      </svg>
    </div>
  );
}

function AwsSideDiagram() {
  const hops = [
    { x: 26, t: "病院", sub: "院内 LAN", owner: "hosp" },
    { x: 120, t: "院内ルータ", sub: "BGP を話す", owner: "hosp" },
    { x: 214, t: "KDDI 閉域網", sub: "IP-VPN", owner: "kddi" },
    { x: 308, t: "DX ロケーション", sub: "クロスコネクト", owner: "kddi" },
    { x: 402, t: "AWS のルータ", sub: "VLAN で仕分け", owner: "aws" },
    { x: 496, t: "Private VIF", sub: "弊社専用の論理線", owner: "us" },
    { x: 590, t: "VGW", sub: "VPC の入口", owner: "us" },
  ];
  const fill = {
    hosp: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700",
    kddi: "fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700",
    aws: "fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600",
    us: "fill-blue-50 stroke-blue-500 dark:fill-blue-950/40 dark:stroke-blue-600",
  } as const;
  const tone = {
    hosp: "fill-emerald-900 dark:fill-emerald-200",
    kddi: "fill-amber-900 dark:fill-amber-200",
    aws: "fill-zinc-800 dark:fill-zinc-200",
    us: "fill-blue-900 dark:fill-blue-200",
  } as const;
  const subTone = {
    hosp: "fill-emerald-700 dark:fill-emerald-400",
    kddi: "fill-amber-700 dark:fill-amber-400",
    aws: "fill-zinc-500 dark:fill-zinc-400",
    us: "fill-blue-700 dark:fill-blue-400",
  } as const;
  const owners = [
    { x1: 26, x2: 204, label: "病院 / 自社側", cls: "stroke-emerald-400 dark:stroke-emerald-600", text: "fill-emerald-700 dark:fill-emerald-400" },
    { x1: 214, x2: 392, label: "KDDI", cls: "stroke-amber-400 dark:stroke-amber-600", text: "fill-amber-700 dark:fill-amber-400" },
    { x1: 402, x2: 486, label: "AWS 共用", cls: "stroke-zinc-400 dark:stroke-zinc-600", text: "fill-zinc-500 dark:fill-zinc-400" },
    { x1: 496, x2: 674, label: "弊社", cls: "stroke-blue-400 dark:stroke-blue-600", text: "fill-blue-600 dark:fill-blue-400" },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        病院のパケットが VPC に届くまで
      </p>
      <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">
        緑 = 病院側 / 琥珀 = KDDI / 灰 = AWS の共用設備 / 青 = 弊社
      </p>
      <svg viewBox="0 0 700 510" className="mx-auto w-full">
        {hops.map((h, i) => (
          <g key={h.t}>
            <rect x={h.x} y={30} width={84} height={62} rx={8} className={fill[h.owner as keyof typeof fill]} strokeWidth={h.owner === "us" ? 2 : 1.5} />
            <text x={h.x + 42} y={58} textAnchor="middle" className={`${tone[h.owner as keyof typeof tone]} text-[10px] font-bold`}>
              {h.t}
            </text>
            <text x={h.x + 42} y={76} textAnchor="middle" className={`${subTone[h.owner as keyof typeof subTone]} text-[8px]`}>
              {h.sub}
            </text>
            {i < hops.length - 1 && (
              <line x1={h.x + 84} y1={61} x2={h.x + 94} y2={61} className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />
            )}
          </g>
        ))}

        {owners.map((o) => (
          <g key={o.label}>
            <line x1={o.x1} y1={108} x2={o.x2} y2={108} className={o.cls} strokeWidth="1.4" />
            <line x1={o.x1} y1={103} x2={o.x1} y2={113} className={o.cls} strokeWidth="1.4" />
            <line x1={o.x2} y1={103} x2={o.x2} y2={113} className={o.cls} strokeWidth="1.4" />
            <text x={(o.x1 + o.x2) / 2} y={126} textAnchor="middle" className={`${o.text} text-[9px] font-semibold`}>
              {o.label}
            </text>
          </g>
        ))}

        <text x="120" y="152" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">
          物理的な回線を用意する区間
        </text>
        <text x="444" y="152" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">
          VLAN の札で弊社宛だけ取り出される
        </text>

        <line x1="632" y1="92" x2="632" y2="190" className="stroke-blue-500" strokeWidth="3" />
        <text x="646" y="150" className="fill-blue-600 text-[8px] font-semibold dark:fill-blue-400">ここから</text>
        <text x="646" y="162" className="fill-blue-600 text-[8px] font-semibold dark:fill-blue-400">VPC の中</text>

        <rect x="180" y="190" width="494" height="252" rx="10" className="fill-blue-50/25 stroke-blue-300 dark:fill-blue-950/10 dark:stroke-blue-800" strokeWidth="1.4" strokeDasharray="6 4" />
        <text x="196" y="212" className="fill-blue-700 text-[10px] font-semibold dark:fill-blue-400">VPC (10.x.0.0/16)</text>

        <rect x="196" y="226" width="462" height="196" rx="8" className="fill-transparent stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="206" y="244" className="fill-zinc-500 text-[9px] font-semibold dark:fill-zinc-500">プライベートサブネット</text>

        <rect x="480" y="260" width="160" height="130" rx="6" className="fill-blue-50/40 stroke-blue-400 dark:fill-blue-950/20 dark:stroke-blue-700" strokeWidth="1.3" strokeDasharray="4 3" />
        <text x="560" y="282" textAnchor="middle" className="fill-zinc-600 text-[9px] font-semibold dark:fill-zinc-400">ルートテーブル</text>
        <text x="560" y="306" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">10.x.0.0/16 → local</text>
        <text x="560" y="330" textAnchor="middle" className="fill-blue-700 text-[8px] font-bold dark:fill-blue-400">拠点 CIDR → VGW</text>
        <text x="560" y="346" textAnchor="middle" className="fill-blue-600 text-[8px] dark:fill-blue-400">（経路伝播で自動）</text>
        <text x="560" y="372" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">この行がないと届かない</text>

        <rect x="214" y="260" width="250" height="130" rx="8" className="fill-transparent stroke-amber-400 dark:stroke-amber-600" strokeWidth="1.4" strokeDasharray="5 3" />
        <text x="339" y="256" textAnchor="middle" className="fill-amber-700 text-[8px] font-semibold dark:fill-amber-400">
          セキュリティグループ（拠点 CIDR を許可）
        </text>

        <rect x="228" y="278" width="222" height="44" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="339" y="298" textAnchor="middle" className="fill-zinc-700 text-[11px] font-bold dark:fill-zinc-300">ECS / EC2（アプリ）</text>
        <text x="339" y="313" textAnchor="middle" className="fill-zinc-500 text-[8px] dark:fill-zinc-500">既存のまま</text>

        <line x1="339" y1="322" x2="339" y2="334" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.4" />

        <rect x="228" y="334" width="222" height="40" rx="6" className="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700" strokeWidth="1.4" />
        <text x="339" y="359" textAnchor="middle" className="fill-zinc-700 text-[11px] font-bold dark:fill-zinc-300">RDS</text>

        <line x1="632" y1="190" x2="632" y2="260" className="stroke-blue-500" strokeWidth="3" />
        <line x1="480" y1="300" x2="450" y2="300" className="stroke-blue-500" strokeWidth="2.5" />

        <text x="424" y="470" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          病院から VPC に入るまでに 4 者をまたぐ。弊社が設定できるのは右端の 2 つから先だけ
        </text>
        <text x="424" y="492" textAnchor="middle" className="fill-zinc-500 text-[9px] dark:fill-zinc-500">
          手前 5 区間はどれも「申し込んで待つ」もので、Terraform では作れない
        </text>
      </svg>
    </div>
  );
}

function SetupStep({
  num,
  tag,
  title,
  resources,
  children,
}: {
  num: number;
  tag: string;
  title: string;
  resources: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
        {num}
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
          <span
            className={
              tag === "新規"
                ? "rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : "rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            }
          >
            {tag}
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{children}</p>
        <div className="flex flex-wrap gap-1.5">
          {resources.map((r) => (
            <span
              key={r}
              className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PacketPathDiagram() {
  const steps = [
    { x: 10, label1: "Direct Connect", label2: "KDDI が用意", owner: "kddi" },
    { x: 119, label1: "AWS のルータ", label2: "札で仕分け → VIF", owner: "aws" },
    { x: 228, label1: "VGW", label2: "VPC の入口", owner: "us" },
    { x: 337, label1: "ルートテーブル", label2: "経路伝播", owner: "us" },
    { x: 446, label1: "セキュリティ", label2: "グループ", owner: "us" },
    { x: 555, label1: "サービスに到達", label2: "EC2 / エンドポイント", owner: "goal" },
  ];
  const fill = {
    kddi: "fill-amber-50 stroke-amber-400 dark:fill-amber-950/30 dark:stroke-amber-700",
    aws: "fill-zinc-50 stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600",
    us: "fill-blue-50 stroke-blue-400 dark:fill-blue-950/30 dark:stroke-blue-700",
    goal: "fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700",
  } as const;
  const text = {
    kddi: "fill-amber-900 dark:fill-amber-200",
    aws: "fill-zinc-800 dark:fill-zinc-200",
    us: "fill-blue-900 dark:fill-blue-200",
    goal: "fill-emerald-900 dark:fill-emerald-200",
  } as const;
  const sub = {
    kddi: "fill-amber-700 dark:fill-amber-400",
    aws: "fill-zinc-500 dark:fill-zinc-400",
    us: "fill-blue-700 dark:fill-blue-400",
    goal: "fill-emerald-700 dark:fill-emerald-400",
  } as const;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 660 195" className="mx-auto w-full max-w-3xl">
        <text x="330" y="24" textAnchor="middle" className="fill-zinc-600 text-[11px] dark:fill-zinc-400">
          病院のパケットが弊社のサービスに届くまでに通る関門
        </text>

        {steps.map((st, i) => (
          <g key={st.label1}>
            <rect x={st.x} y={44} width={95} height={62} rx={8} className={fill[st.owner as keyof typeof fill]} strokeWidth="1.6" />
            <text x={st.x + 47.5} y={72} textAnchor="middle" className={`${text[st.owner as keyof typeof text]} text-[11px] font-bold`}>
              {st.label1}
            </text>
            <text x={st.x + 47.5} y={90} textAnchor="middle" className={`${sub[st.owner as keyof typeof sub]} text-[9px]`}>
              {st.label2}
            </text>
            {i < steps.length - 1 && (
              <line x1={st.x + 95} y1={75} x2={st.x + 109} y2={75} className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="2" />
            )}
          </g>
        ))}

        <line x1="10" y1="124" x2="214" y2="124" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />
        <line x1="10" y1="119" x2="10" y2="129" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />
        <line x1="214" y1="119" x2="214" y2="129" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1.5" />
        <text x="112" y="144" textAnchor="middle" className="fill-zinc-500 text-[11px] font-semibold dark:fill-zinc-400">
          触れない領域
        </text>
        <text x="112" y="159" textAnchor="middle" className="fill-zinc-400 text-[9px] dark:fill-zinc-500">
          KDDI と AWS で完結する
        </text>

        <line x1="228" y1="124" x2="541" y2="124" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="1.5" />
        <line x1="228" y1="119" x2="228" y2="129" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="1.5" />
        <line x1="541" y1="119" x2="541" y2="129" className="stroke-blue-400 dark:stroke-blue-600" strokeWidth="1.5" />
        <text x="385" y="144" textAnchor="middle" className="fill-blue-600 text-[11px] font-semibold dark:fill-blue-400">
          この 3 つが弊社の設定範囲
        </text>
        <text x="385" y="159" textAnchor="middle" className="fill-blue-500 text-[9px] dark:fill-blue-400/80">
          VGW から先は自分の領域
        </text>

        <text x="330" y="185" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          どれか 1 つでも抜けると届かない ── 回線が繋がった＝通信できる、ではない
        </text>
      </svg>
    </div>
  );
}
