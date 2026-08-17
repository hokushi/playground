export default function AwsRegionsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          AWS リージョン と データセンター
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「東京リージョン内の複数のデータセンターにまたがって構成」「複数リージョン間で可用性確保」──
          営業資料でよく見るこの表現が <strong>実際にどういう構造</strong>を指しているのかを整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>リージョン</strong> = 地理的に独立したクラウドの拠点 (東京、大阪、バージニア など)
          </li>
          <li>
            <strong>1 リージョン = 複数の AZ (アベイラビリティゾーン)</strong> で構成される。
            AZ ≒ 「物理的に離れたデータセンター群」
          </li>
          <li>
            <strong>AZ をまたいで設計</strong>すると、リージョン内のどこかの AZ が落ちてもサービス継続 (= <strong>高可用性</strong>)
          </li>
          <li>
            <strong>リージョンをまたいで設計</strong>すると、リージョンごと災害でも継続 (= <strong>災害対策 / DR</strong>)
          </li>
          <li>
            営業資料の <strong>「複数データセンターにまたがる」= Multi-AZ</strong>、
            <strong>「複数リージョン間」= Multi-Region</strong>、と読み替えると正確
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="region" num={2}>
          リージョン (Region): 地理的な拠点
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          リージョンは <strong>地理的に離れた巨大な拠点</strong>で、各リージョンは <strong>完全に独立</strong>しています。
          東京リージョンで動いているサーバとバージニアリージョンで動いているサーバは
          <strong>別の組織が運営しているくらいの距離感</strong>で扱われ、障害も別々、料金も別々、コンプライアンス境界も別々。
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">リージョン</th>
                <th className="px-4 py-2 text-left font-semibold">コード</th>
                <th className="px-4 py-2 text-left font-semibold">AZ 数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">東京</td>
                <td className="px-4 py-2 font-mono text-xs">ap-northeast-1</td>
                <td className="px-4 py-2">4</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">大阪</td>
                <td className="px-4 py-2 font-mono text-xs">ap-northeast-3</td>
                <td className="px-4 py-2">3</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">バージニア北部 (US)</td>
                <td className="px-4 py-2 font-mono text-xs">us-east-1</td>
                <td className="px-4 py-2">6</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">シンガポール</td>
                <td className="px-4 py-2 font-mono text-xs">ap-southeast-1</td>
                <td className="px-4 py-2">3</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">フランクフルト</td>
                <td className="px-4 py-2 font-mono text-xs">eu-central-1</td>
                <td className="px-4 py-2">3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          ※ 全世界で <strong>30 以上</strong>のリージョンがある。日本で使うときの第一候補は東京 (ap-northeast-1)。
        </p>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            どのリージョンを選ぶか
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>・<strong>ユーザーへのレイテンシ</strong>: 日本からなら東京 / 大阪が一番速い (数 ms〜十数 ms)</li>
            <li>・<strong>データの所在 (コンプライアンス)</strong>: 「個人情報は国内に置く」「医療データは国内に置く」等の要件</li>
            <li>・<strong>サービスの可用性</strong>: 新しい AWS サービスは us-east-1 / バージニア先行で日本リージョンに遅れて来ることが多い</li>
            <li>・<strong>料金</strong>: リージョンごとに違う。バージニアが一番安い傾向</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="az" num={3}>
          アベイラビリティゾーン (AZ)
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          1 つのリージョンの中には <strong>複数の AZ (Availability Zone)</strong> があります。
          AZ は <strong>「物理的に離れたデータセンター群」</strong>のことで、それぞれが
          <strong>独自の電源・冷却・ネットワーク</strong>を持っており、片方が停電しても残りは生きている、という独立性があります。
        </p>

        <RegionAzHierarchyDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              AZ の特徴
            </h3>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              <li>・名前: <code className="font-mono text-xs">ap-northeast-1a</code>, <code className="font-mono text-xs">1c</code>, <code className="font-mono text-xs">1d</code> ...</li>
              <li>・AZ 間は数十 km 離れている</li>
              <li>・<strong>同時被災しない</strong>距離だが、低遅延の専用線で繋がっている</li>
              <li>・AZ 間の通信は <strong>1〜数 ms</strong> 程度</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              なぜ「データセンター」ではなく AZ?
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <strong>1 AZ = 1 棟ではなく、複数のデータセンタービル</strong>で構成されることが多い。
              ユーザーから見えるのは AZ 単位で、その中の個別ビルは AWS の運用範囲。
              「リージョン &gt; AZ &gt; データセンター」の 3 階層と覚えると正確。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="multiaz" num={4}>
          Multi-AZ 設計 = 「複数データセンターにまたがる」
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          営業資料でよく見る <strong>「東京リージョン内の複数のデータセンターにまたがって構成」</strong> ──
          これは <strong>同じリージョン内の複数の AZ にリソースを分散配置している</strong>という意味です。
          AWS 用語では <strong>「Multi-AZ 構成」</strong>と呼ばれます。
        </p>

        <SingleVsMultiAzDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <h3 className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              単一 AZ 構成 (ダメな例)
            </h3>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              全部のサーバを <code className="font-mono text-xs">1a</code> だけに置く。
              <strong>1a が停電 → 全停止</strong>。リージョンは生きていても自分のサービスは死ぬ。
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              Multi-AZ 構成 (高可用性)
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              サーバを <code className="font-mono text-xs">1a / 1c / 1d</code> に分散。
              <strong>1a が停電 → 残りで継続</strong>。負荷分散の前段 (ALB) も AZ を跨いで配置する。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よくある Multi-AZ パターン
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>EC2 (サーバ)</strong>: Auto Scaling Group で複数 AZ に分散
            </li>
            <li>
              ・<strong>ALB (ロードバランサ)</strong>: 標準で Multi-AZ 対応
            </li>
            <li>
              ・<strong>RDS (DB)</strong>: Multi-AZ オプションで <strong>別 AZ にスタンバイ DB</strong> を持つ。
              プライマリ障害時に自動フェイルオーバー
            </li>
            <li>
              ・<strong>S3</strong>: そもそも <strong>1 リージョン内で勝手に複数 AZ にレプリケート</strong>される (ユーザー側の設定不要)
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="multiregion" num={5}>
          Multi-Region 設計 = 「複数リージョン間」
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Multi-AZ で守れるのは <strong>「リージョン内の局所的な障害」</strong>まで。
          リージョンごと落ちる事象 ── 大地震、海底ケーブル切断、AWS 自身のソフトウェア障害、政治的シャットダウン ──
          に備えるには <strong>別のリージョンにも展開する</strong>必要があります。これが <strong>Multi-Region 構成</strong>。
        </p>

        <MultiRegionDiagram />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              アクティブ / スタンバイ
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              普段は <strong>東京だけ</strong>で運用、何かあったら <strong>大阪に切り替え</strong>る方式。
              比較的シンプルだが、切り替えに数分〜数時間かかる。
              DB のレプリケーション + DNS 切り替えで実現することが多い。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              アクティブ / アクティブ
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              東京も大阪も <strong>同時に本番運用</strong>。地理的に近いユーザーに振り分ける (Route 53 等)。
              片方が落ちても即座に他方が引き受ける。一方で <strong>データ整合性の設計が極めて難しい</strong>。
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
            「AZ 間でも同じ問題があるのでは?」 ── 鋭い指摘
          </p>
          <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
            原理としては同じですが、<strong>AZ 間と Region 間でレイテンシが桁違い</strong>なので、
            書き込み同期の選択肢が変わり、結果として難易度が大きく違います。
          </p>

          <div className="mt-3 overflow-hidden rounded-md border border-blue-200 dark:border-blue-800">
            <table className="w-full text-xs">
              <thead className="bg-white text-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">観点</th>
                  <th className="px-3 py-2 text-left font-semibold">AZ 間 (同一リージョン内)</th>
                  <th className="px-3 py-2 text-left font-semibold">Region 間</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 bg-white text-blue-900/90 dark:divide-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
                <tr>
                  <td className="px-3 py-2 font-medium">レイテンシ</td>
                  <td className="px-3 py-2"><strong>1〜数 ms</strong></td>
                  <td className="px-3 py-2"><strong>10〜100ms+</strong> (TYO-OSA で 10ms、TYO-USA で 100ms 超)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">レプリケーション方式</td>
                  <td className="px-3 py-2">
                    <strong>同期</strong>: 書き込み完了を返す前に両方の AZ に書く
                  </td>
                  <td className="px-3 py-2">
                    <strong>非同期</strong>: 100ms の往復を毎回待てないので、後追いで複製
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">書き込み競合</td>
                  <td className="px-3 py-2">
                    起きない (片方が primary、片方が standby のことが多い)
                  </td>
                  <td className="px-3 py-2">
                    アクティブ/アクティブ構成では <strong>起きうる</strong> (ラグ中に両側で書かれる)
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">運用の手間</td>
                  <td className="px-3 py-2">
                    AWS が裏で全部やる。<strong>RDS の Multi-AZ オプションを ON にするだけ</strong>
                  </td>
                  <td className="px-3 py-2">
                    自前で設計が必要 (DynamoDB Global Tables など一部例外あり)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-300">
            ポイント: AZ 間は <strong>「書き込みのたびにもう片方にも書き込む」が実用速度</strong>で可能。
            だから一貫性問題は <strong>構造的に発生させない</strong>設計ができる。
            Region 間は同じことをすると毎リクエストが 100ms 待ちになるので、
            <strong>非同期にせざるを得ず、結果としてラグや競合が発生する</strong> ── ここが本質的な違いです。
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            Multi-Region は安くないし、簡単でもない
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-amber-900/80 dark:text-amber-300">
            <li>
              ・<strong>コスト 2 倍</strong> (インフラ・転送料・運用工数)
            </li>
            <li>
              ・<strong>データ整合性</strong>: 東京と大阪の DB をどう同期するか。書き込み競合をどう解決するか
            </li>
            <li>
              ・<strong>切り替え試験</strong>を定期的にやらないと、本当に切り替わるか分からない (机上の DR は意味がない)
            </li>
            <li>
              ・なので営業資料に「<strong>将来的に検討</strong>」とよく書かれる。すぐ実装できるものではない
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function RegionAzHierarchyDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="rounded-lg border-2 border-blue-300 bg-blue-50/50 p-4 dark:border-blue-700 dark:bg-blue-950/20">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
          🌏 リージョン: <code className="font-mono text-xs">ap-northeast-1</code> (東京)
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {["1a", "1c", "1d"].map((az) => (
            <div
              key={az}
              className="rounded-md border-2 border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-700 dark:bg-emerald-950/30"
            >
              <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                🏢 AZ: <code className="font-mono">ap-northeast-1{az}</code>
              </p>
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="rounded border border-zinc-300 bg-white px-2 py-1 text-[10px] text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  DC 1
                </div>
                <div className="rounded border border-zinc-300 bg-white px-2 py-1 text-[10px] text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  DC 2
                </div>
                <div className="rounded border border-zinc-300 bg-white px-2 py-1 text-[10px] text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                  DC 3
                </div>
              </div>
              <p className="mt-1.5 text-[9px] text-emerald-700 dark:text-emerald-400">
                独立した電源・冷却・NW
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <strong>リージョン → AZ → データセンター</strong> の 3 階層。ユーザーが意識するのは AZ まで
      </p>
    </div>
  );
}

function SingleVsMultiAzDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border-2 border-rose-300 bg-rose-50/40 p-4 dark:border-rose-700 dark:bg-rose-950/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            単一 AZ ❌
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded border-2 border-rose-400 bg-white p-2 dark:border-rose-600 dark:bg-zinc-900">
              <p className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100">1a</p>
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●EC2</span>
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●EC2</span>
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●DB</span>
              </div>
            </div>
            <div className="rounded border border-dashed border-zinc-300 bg-zinc-50/50 p-2 dark:border-zinc-700 dark:bg-zinc-900/30">
              <p className="text-[9px] text-zinc-400 dark:text-zinc-600">1c</p>
              <p className="mt-1 text-[8px] text-zinc-400 dark:text-zinc-600">(空)</p>
            </div>
            <div className="rounded border border-dashed border-zinc-300 bg-zinc-50/50 p-2 dark:border-zinc-700 dark:bg-zinc-900/30">
              <p className="text-[9px] text-zinc-400 dark:text-zinc-600">1d</p>
              <p className="mt-1 text-[8px] text-zinc-400 dark:text-zinc-600">(空)</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-rose-700 dark:text-rose-400">
            1a が落ちたら <strong>全停止</strong>
          </p>
        </div>

        <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50/40 p-4 dark:border-emerald-700 dark:bg-emerald-950/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Multi-AZ ✓
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded border-2 border-emerald-400 bg-white p-2 dark:border-emerald-600 dark:bg-zinc-900">
              <p className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100">1a</p>
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●EC2</span>
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●DB主</span>
              </div>
            </div>
            <div className="rounded border-2 border-emerald-400 bg-white p-2 dark:border-emerald-600 dark:bg-zinc-900">
              <p className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100">1c</p>
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●EC2</span>
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●DB副</span>
              </div>
            </div>
            <div className="rounded border-2 border-emerald-400 bg-white p-2 dark:border-emerald-600 dark:bg-zinc-900">
              <p className="text-[9px] font-semibold text-zinc-900 dark:text-zinc-100">1d</p>
              <div className="mt-1 flex flex-col gap-0.5">
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">●EC2</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-400">
            1a が落ちても <strong>1c / 1d で継続</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function MultiRegionDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr,3rem,1fr]">
        <div className="rounded-lg border-2 border-blue-300 bg-blue-50/40 p-4 dark:border-blue-700 dark:bg-blue-950/20">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
            🌏 東京リージョン
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            ap-northeast-1
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["1a", "1c", "1d"].map((az) => (
              <div
                key={az}
                className="rounded border border-emerald-400 bg-white p-1.5 text-[9px] dark:border-emerald-600 dark:bg-zinc-900"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{az}</p>
                <p className="text-zinc-600 dark:text-zinc-400">●EC2</p>
                <p className="text-zinc-600 dark:text-zinc-400">●DB</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-blue-700 dark:text-blue-400">
            Multi-AZ で構成
          </p>
        </div>

        <div className="flex flex-col items-center text-xs text-zinc-500 dark:text-zinc-500">
          <span>⇄</span>
          <span className="mt-1 text-center text-[10px]">
            DB レプリケーション
          </span>
          <span className="text-center text-[10px]">
            DNS / Route 53
          </span>
        </div>

        <div className="rounded-lg border-2 border-purple-300 bg-purple-50/40 p-4 dark:border-purple-700 dark:bg-purple-950/20">
          <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">
            🌏 大阪リージョン
          </p>
          <p className="text-xs text-purple-700 dark:text-purple-400">
            ap-northeast-3
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["3a", "3b", "3c"].map((az) => (
              <div
                key={az}
                className="rounded border border-emerald-400 bg-white p-1.5 text-[9px] dark:border-emerald-600 dark:bg-zinc-900"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{az}</p>
                <p className="text-zinc-600 dark:text-zinc-400">●EC2</p>
                <p className="text-zinc-600 dark:text-zinc-400">●DB</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-purple-700 dark:text-purple-400">
            Multi-AZ で構成
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        <strong>Multi-Region</strong>: リージョンごと落ちても、もう片方で継続できる構成
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
    { id: "intro", num: 1, title: "先に結論" },
    { id: "region", num: 2, title: "リージョン" },
    { id: "az", num: 3, title: "アベイラビリティゾーン" },
    { id: "multiaz", num: 4, title: "Multi-AZ 設計" },
    { id: "multiregion", num: 5, title: "Multi-Region 設計" },
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
