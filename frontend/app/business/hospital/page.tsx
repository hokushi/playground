export default function HospitalPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          病院の組織と用語
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          医事課・医局・クラーク・外来…。中の人にとっては当然でも、外から入ると意味不明な用語が多すぎる。
          <strong>「場所」「組織」「職種」</strong> の 3 軸で整理します。
        </p>
      </header>

      <TableOfContents />

      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            病院の用語は <strong>「場所」「組織 (部門)」「職種」</strong> の 3 種類が混在しているからややこしい
          </li>
          <li>
            <strong>外来 / 病棟</strong> は<strong>場所</strong>の話
          </li>
          <li>
            <strong>医局 / 看護部 / 医事課 / 薬剤部</strong> は<strong>組織 (部門)</strong>の話
          </li>
          <li>
            <strong>医師 / 看護師 / クラーク / MSW</strong> は<strong>職種</strong>の話
          </li>
          <li>
            「<strong>外来の医事課のクラーク</strong>」みたいな組み合わせで現場では呼ばれる
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="overview" num={2}>
          全体像: 院長を頂点とした三本柱
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          病院は会社と同じく組織図があります。トップは <strong>院長 (病院長)</strong>。
          その下に <strong>医療系の組織</strong> と <strong>事務系の組織</strong> が並ぶイメージです。
        </p>

        <OrgChartDiagram />

        <p className="text-zinc-700 dark:text-zinc-300">
          実際の病院ではここに <strong>看護部</strong> が独立した縦軸として存在し、医療・看護・事務の
          <strong>「三本柱」</strong> と呼ばれることが多いです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="places" num={3}>
          場所: 外来 / 病棟 / 救急 / 手術室
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          まず物理的な「場所」の用語から。同じ病院でも <strong>どこで何をしているか</strong>が
          全然違います。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              外来 (がいらい)
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
              <strong>その日のうちに帰る</strong>患者さんを診る場所。診察室・処置室・採血室などが並ぶ。
              一般的な「病院に行く」はここを指す。
              <span className="mt-1 block text-xs opacity-80">
                例: 内科外来、整形外科外来、小児科外来
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              病棟 (びょうとう)
            </h3>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-300">
              <strong>入院</strong>した患者さんが <strong>泊まって治療を受ける</strong>場所。
              「3 病棟」「5 階東」のようにフロア単位で呼ばれる。
              <span className="mt-1 block text-xs opacity-80">
                例: 内科病棟、外科病棟、混合病棟
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <h3 className="text-sm font-semibold text-rose-900 dark:text-rose-200">
              救急外来 (ER)
            </h3>
            <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
              <strong>24 時間体制で急患を受け入れる</strong>場所。「救命救急センター」と呼ぶ大病院も。
              夜間/休日もここだけは動いている。
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-950/30">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200">
              手術室 (オペ室)
            </h3>
            <p className="mt-2 text-sm text-purple-900/80 dark:text-purple-300">
              手術専用の部屋。清潔区域なので関係者以外立ち入り禁止。
              <strong>「OR (Operating Room)」</strong>とも呼ばれる。
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              ICU / HCU
            </h3>
            <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
              重症患者を集中的に診る病棟。<strong>ICU</strong> = 集中治療室、
              <strong>HCU</strong> = 高度治療室 (ICU と一般病棟の間)。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              検査部 / 放射線科 (場所として)
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              採血・心電図・CT・MRI などを行う場所。外来からも病棟からも患者がやってくる。
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="roles" num={4}>
          職種: 誰が何の仕事をしているのか
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここでは <strong>「役職・職種」</strong>を見ます。同じ場所 (外来) に
          色んな職種が混ざっているのが病院の特徴です。
        </p>

        <div className="flex flex-col gap-3">
          <RoleCard
            title="医師 (ドクター)"
            sub="MD / Dr."
            body={
              <>
                診断と治療方針の決定。<strong>研修医</strong> (卒後 1〜2 年)、
                <strong>専攻医</strong> (3〜5 年)、<strong>専門医・指導医</strong>と段階がある。
                所属は<strong>医局</strong>。
              </>
            }
          />
          <RoleCard
            title="看護師 (ナース)"
            sub="Ns / RN"
            body={
              <>
                患者ケア全般。バイタル測定、点滴、与薬、観察、記録、家族対応まで幅広い。
                病棟ごとに <strong>看護師長</strong> → <strong>主任</strong> → <strong>スタッフ</strong> の階層。
              </>
            }
          />
          <RoleCard
            title="クラーク (医師事務作業補助者)"
            sub="Medical Clerk"
            body={
              <>
                <strong>医師の事務作業を代行</strong>する職種。診断書の下書き、紹介状作成、
                電子カルテへの代行入力、各種書類整理など。
                <strong>診療報酬の加算対象</strong>になっているので近年増えている。
                外来クラーク・病棟クラーク・救急クラークなど配属先で呼び分ける。
              </>
            }
          />
          <RoleCard
            title="医療事務"
            sub="所属: 医事課"
            body={
              <>
                <strong>受付・会計・レセプト請求</strong>。患者さんとの最初の接点。
                クラークと混同されがちだが、医療事務は <strong>医事課</strong> の事務、
                クラークは <strong>医師の補助</strong>と役割が違う。
              </>
            }
          />
          <RoleCard
            title="薬剤師"
            sub="所属: 薬剤部"
            body={
              <>
                処方箋に基づく調剤、服薬指導、注射薬の混合。
                病棟担当の <strong>病棟薬剤師</strong> は患者のベッドサイドにも行く。
              </>
            }
          />
          <RoleCard
            title="MSW (医療ソーシャルワーカー)"
            sub="Medical Social Worker"
            body={
              <>
                患者の <strong>社会的・経済的な問題の相談</strong>窓口。
                退院後の介護施設調整、医療費の制度紹介、家族関係の調整など。
                <strong>地域連携室</strong>に所属していることが多い。
              </>
            }
          />
          <RoleCard
            title="検査技師 / 放射線技師"
            sub="MT / RT"
            body={
              <>
                <strong>臨床検査技師 (MT)</strong> = 血液検査・心電図など。
                <strong>診療放射線技師 (RT)</strong> = レントゲン・CT・MRI 撮影。
                どちらも国家資格。
              </>
            }
          />
          <RoleCard
            title="PT / OT / ST"
            sub="リハビリ専門職"
            body={
              <>
                <strong>PT (理学療法士)</strong> = 歩行など基本動作。
                <strong>OT (作業療法士)</strong> = 手の動きや日常動作。
                <strong>ST (言語聴覚士)</strong> = 発声・嚥下 (えんげ)。
              </>
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="documents" num={5}>
          書類・記録: カルテ / レセプト / 紹介状
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          病院のソフトウェアを作るならここを押さえるのが必須。
          <strong>「同じ患者の情報が、用途ごとに違う書類になる」</strong>のがポイントです。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              カルテ (診療録)
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              医師が記録する <strong>診療の経過</strong>。法律で保存が義務付けられている。
              今は <strong>電子カルテ</strong> が主流。
              <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-500">
                英語だと EMR (Electronic Medical Record) / EHR (Electronic Health Record)
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              レセプト (診療報酬明細書)
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              月末に <strong>健康保険組合に出す請求書</strong>。
              「この患者にこの治療をしたので X 円ください」を点数で表現する。
              <strong>医事課</strong>の主な仕事。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              紹介状 (診療情報提供書)
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              他の病院に患者を送る時の <strong>引き継ぎ書類</strong>。
              <strong>逆紹介</strong> = 大病院からクリニックに戻すこと。地域連携室の業務。
              書いた病院には <strong>「診療情報提供料」</strong> という診療報酬点数が付く (後述)。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              退院サマリ
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              入院期間中の経過をまとめた <strong>退院時の総括</strong>。
              次の主治医や転院先が読むことを前提に書かれる。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              指示簿 / ワークシート
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              医師から看護師への <strong>指示の一覧</strong>。
              「点滴 X を 14 時に投与」のような細かい指示が時系列で並ぶ。
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              DPC データ
            </h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              急性期病院で使われる <strong>診断群分類別の包括支払い制度</strong>のデータ。
              「この病気で何日入院したか」で点数が決まる仕組み。
            </p>
          </div>
        </div>

        <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          ケーススタディ: 紹介状を書くと、どうレセプトに反映されるか
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300">
          <strong>紹介状を書く</strong>のは医師の善意ではなく、れっきとした <strong>「医療行為」</strong>で、
          診療報酬点数が決まっています。書類 → 点数 → レセプト → 入金、の流れを具体例で追います。
        </p>

        <ReceiptFlowDiagram />

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            前提: 診療報酬は <strong>「点数」</strong>で表現される
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・<strong>1 点 = 10 円</strong> (全国一律)
            </li>
            <li>
              ・どの医療行為が何点かは <strong>厚労省告示の「点数表」</strong>で定められている
            </li>
            <li>
              ・2 年ごとの <strong>診療報酬改定</strong>で点数が見直される
            </li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">区分</th>
                <th className="px-4 py-2 text-left font-semibold">点数</th>
                <th className="px-4 py-2 text-left font-semibold">いつ取れるか</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  診療情報提供料 (I)
                </td>
                <td className="px-4 py-2 font-mono">250 点</td>
                <td className="px-4 py-2">
                  他の医療機関宛に紹介状を書いた時の基本パターン。月 1 回まで
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  診療情報提供料 (II)
                </td>
                <td className="px-4 py-2 font-mono">500 点</td>
                <td className="px-4 py-2">
                  患者の求めに応じて別医療機関にセカンドオピニオン用情報を提供した時
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  電子的診療情報評価料
                </td>
                <td className="px-4 py-2 font-mono">+ 30 点</td>
                <td className="px-4 py-2">
                  紹介を受けた側が電子的に情報を受け取り評価した場合の加算
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                  連携強化診療情報提供料
                </td>
                <td className="px-4 py-2 font-mono">150 点</td>
                <td className="px-4 py-2">
                  逆紹介後にかかりつけ医に経過報告するなど、継続的な情報共有を行った時
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          ※ 点数は <strong>2024 年度改定</strong>時点。実際の運用には加算・施設基準などの条件が多数あります。
        </p>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
            ストーリー: 田中さん (会社員 45 歳・3 割負担) の例
          </p>
          <ol className="mt-3 flex flex-col gap-3 text-sm text-emerald-900/90 dark:text-emerald-300">
            <li>
              <strong>① 医師がカルテに記録</strong>
              <p className="mt-1 text-xs">
                A 病院で「精査のため B 大学病院へ紹介する」と判断。医師が電子カルテに <strong>紹介状の発行</strong>をオーダー。
                これがそのまま <strong>「診療情報提供料 (I) 250 点」</strong>として記録される
              </p>
            </li>
            <li>
              <strong>② 医事課がレセプトに集計</strong>
              <p className="mt-1 text-xs">
                月末、医事課がその月のカルテ記録から <strong>すべての点数を自動集計</strong>。
                田中さんのレセプトに以下が並ぶ:
              </p>
              <pre className="mt-2 overflow-x-auto rounded bg-white/60 p-3 font-mono text-[11px] leading-relaxed text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-100">
{`再診料                73 点
外来管理加算          52 点
診療情報提供料(I)    250 点
─────────────────────
合計                 375 点 = 3,750 円`}
              </pre>
            </li>
            <li>
              <strong>③ 患者・保険者で按分</strong>
              <p className="mt-1 text-xs">
                その場で田中さんは <strong>3 割 = 1,130 円</strong> (10 円単位四捨五入) を窓口で支払う。
                残りの <strong>7 割 = 2,620 円</strong> は保険者 (健康保険組合など) に請求
              </p>
            </li>
            <li>
              <strong>④ 月末: 医事課が保険者に請求</strong>
              <p className="mt-1 text-xs">
                医事課が月末にまとめて <strong>「○月分の田中さんの治療で 2,620 円ください」</strong>と
                健康保険組合に請求。これが <strong>レセプト請求</strong>の実体。
                <strong>翌々月</strong>に病院の口座に振り込まれる
              </p>
            </li>
          </ol>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            紹介状の有無が患者の窓口負担を変える: 「選定療養費」
          </p>
          <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-300">
            <strong>紹介状なしで大病院 (200 床以上の地域医療支援病院など) を初診すると</strong>、
            保険外で <strong>7,000 円以上 (歯科 5,000 円以上)</strong>の <strong>選定療養費</strong> が上乗せされます。
            これは「軽症で大病院に来ないでね」という誘導。
            紹介状 1 枚で <strong>患者の負担も病院の収益構造も変わる</strong>仕組みです。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            なぜ大病院が「逆紹介率」を気にするのか
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            <strong>地域医療支援病院</strong>などの施設基準では <strong>紹介率・逆紹介率</strong>に
            最低ラインがあり、満たさないと <strong>初診料・再診料が減算</strong>されてしまう。
            つまり「紹介状を書いて元のクリニックに戻す」こと自体が、
            <strong>診療情報提供料 (収入)</strong> と <strong>施設基準維持 (減算回避)</strong> の両面で
            病院経営に効いてくる ── これが地域連携室の仕事が重視される理由です。
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="flow" num={6}>
          患者の流れ: 受診から退院まで
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここまでの用語を <strong>患者さんの目線で順番に並べる</strong>と、現場のイメージがつかみやすくなります。
        </p>

        <PatientFlowDiagram />

        <ol className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>1. 受付 (医事課)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              保険証を確認、カルテを作成 (初診なら) して該当科の<strong>外来</strong>へ案内
            </p>
          </li>
          <li>
            <strong>2. 外来で診察 (医師)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              医師の指示で <strong>検査部</strong> や <strong>放射線科</strong> へ寄ることも。
              <strong>外来クラーク</strong> がカルテ入力を補助
            </p>
          </li>
          <li>
            <strong>3a. その日のうちに帰る場合</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              処方箋を持って <strong>医事課で会計</strong> → 院外薬局へ
            </p>
          </li>
          <li>
            <strong>3b. 入院になる場合</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <strong>病棟</strong>に上がる。看護師長が担当看護師を決定。
              <strong>病棟クラーク</strong> が入院書類を整える
            </p>
          </li>
          <li>
            <strong>4. 入院中</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              医師の指示書に従って看護師がケア。<strong>薬剤師</strong>が薬の管理、
              <strong>PT/OT/ST</strong> がリハビリ、必要なら <strong>MSW</strong> が退院後の調整
            </p>
          </li>
          <li>
            <strong>5. 退院</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              医師が <strong>退院サマリ</strong> を作成。<strong>地域連携室</strong>が次の医療機関に引き継ぎ。
              月末に <strong>医事課</strong>がレセプト請求
            </p>
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="quick" num={7}>
          クイックリファレンス
        </SectionH2>
        <p className="text-zinc-700 dark:text-zinc-300">
          現場で耳にしたら思い出したい用語をまとめておきます。
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Glossary
            entries={[
              ["主治医", "その患者を担当する医師。「○○先生が主治医」"],
              ["指示", "医師が出す医療行為の命令。看護師はこれに従う"],
              ["オーダー", "電子カルテ上での指示・処方の入力。「薬をオーダーする」"],
              ["回診", "医師が病棟の患者を順に診て回ること。朝が多い"],
              ["申し送り", "シフト交代時の引き継ぎ。看護師が中心"],
              ["転棟", "別の病棟に移ること"],
              ["転院", "別の病院に移ること"],
              ["転科", "同じ病院で違う診療科に変わること"],
            ]}
          />
          <Glossary
            entries={[
              ["カンファ", "カンファレンス。診療方針を多職種で話し合う会議"],
              ["症例検討会", "特定の患者についての勉強会"],
              ["ムンテラ", "Mund (口) + Therapie (治療) の独語由来。患者説明のこと"],
              ["IC", "Informed Consent。説明と同意"],
              ["ステる", "亡くなること (sterben 由来の業界用語)"],
              ["バイタル", "脈拍・血圧・体温・呼吸・SpO2 などの生命兆候"],
              ["バルーン", "膀胱留置カテーテル"],
              ["DNAR", "蘇生を行わないという意思表示"],
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionH2 id="summary" num={8}>
          まとめ
        </SectionH2>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              ・用語を聞いたら <strong>「場所?組織?職種?」</strong>と分類するクセをつけると整理しやすい
            </li>
            <li>
              ・<strong>医局 = 医師の集まり</strong>、<strong>医事課 = 事務の集まり</strong>。混同注意
            </li>
            <li>
              ・<strong>クラーク</strong> は事務員ではなく <strong>「医師の事務作業を肩代わりする職種」</strong>
            </li>
            <li>
              ・<strong>外来 / 病棟</strong>は場所、<strong>主治医 / 担当看護師</strong>は人。両方の軸で考える
            </li>
            <li>
              ・書類は同じ患者情報の <strong>違う切り口</strong>。カルテ (記録)、レセプト (請求)、紹介状 (引き継ぎ) と用途が異なる
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function OrgChartDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 280" className="mx-auto w-full max-w-2xl">
        <rect x="240" y="20" width="120" height="40" rx="6" className="fill-zinc-900 dark:fill-zinc-100" />
        <text x="300" y="45" textAnchor="middle" className="fill-zinc-50 text-sm font-semibold dark:fill-zinc-900">院長</text>

        <line x1="300" y1="60" x2="300" y2="90" className="stroke-zinc-400" strokeWidth="1.5" />
        <line x1="100" y1="90" x2="500" y2="90" className="stroke-zinc-400" strokeWidth="1.5" />
        <line x1="100" y1="90" x2="100" y2="115" className="stroke-zinc-400" strokeWidth="1.5" />
        <line x1="300" y1="90" x2="300" y2="115" className="stroke-zinc-400" strokeWidth="1.5" />
        <line x1="500" y1="90" x2="500" y2="115" className="stroke-zinc-400" strokeWidth="1.5" />

        <rect x="40" y="115" width="120" height="36" rx="6" className="fill-emerald-100 stroke-emerald-400 dark:fill-emerald-950/40 dark:stroke-emerald-700" strokeWidth="1.5" />
        <text x="100" y="138" textAnchor="middle" className="fill-emerald-900 text-xs font-semibold dark:fill-emerald-200">診療部 (医局)</text>

        <rect x="240" y="115" width="120" height="36" rx="6" className="fill-blue-100 stroke-blue-400 dark:fill-blue-950/40 dark:stroke-blue-700" strokeWidth="1.5" />
        <text x="300" y="138" textAnchor="middle" className="fill-blue-900 text-xs font-semibold dark:fill-blue-200">看護部</text>

        <rect x="440" y="115" width="120" height="36" rx="6" className="fill-amber-100 stroke-amber-400 dark:fill-amber-950/40 dark:stroke-amber-700" strokeWidth="1.5" />
        <text x="500" y="138" textAnchor="middle" className="fill-amber-900 text-xs font-semibold dark:fill-amber-200">事務部</text>

        <line x1="100" y1="151" x2="100" y2="170" className="stroke-zinc-300" strokeWidth="1" />
        <line x1="300" y1="151" x2="300" y2="170" className="stroke-zinc-300" strokeWidth="1" />
        <line x1="500" y1="151" x2="500" y2="170" className="stroke-zinc-300" strokeWidth="1" />

        <g className="fill-zinc-700 text-[10px] dark:fill-zinc-300" textAnchor="middle">
          <text x="100" y="183">内科 / 外科 / 小児科 …</text>
          <text x="100" y="198">薬剤部</text>
          <text x="100" y="213">検査部 / 放射線科</text>
          <text x="100" y="228">リハ科</text>

          <text x="300" y="183">外来看護</text>
          <text x="300" y="198">病棟看護</text>
          <text x="300" y="213">手術室看護</text>
          <text x="300" y="228">ICU 看護</text>

          <text x="500" y="183">医事課</text>
          <text x="500" y="198">総務課</text>
          <text x="500" y="213">経営企画</text>
          <text x="500" y="228">地域連携室</text>
        </g>

        <text x="300" y="265" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          院長 → 医療系 (医局・看護部) と事務系 (事務部) に分かれる三本柱構造
        </text>
      </svg>
    </div>
  );
}

function ReceiptFlowDiagram() {
  const steps = [
    {
      title: "① 医師",
      sub: "医療行為",
      body: "紹介状を書く / 検査オーダー / 処方",
      color: "emerald",
    },
    {
      title: "② カルテ",
      sub: "記録",
      body: "電子カルテに点数付きで自動記録される (例: 250 点)",
      color: "zinc",
    },
    {
      title: "③ 医事課",
      sub: "月次集計",
      body: "月末に患者ごとの点数を合算 → レセプト作成",
      color: "amber",
    },
    {
      title: "④ レセプト請求",
      sub: "保険者へ",
      body: "1 点 = 10 円で換算した請求書を健康保険組合等に送付",
      color: "blue",
    },
    {
      title: "⑤ 入金",
      sub: "翌々月",
      body: "保険者から病院の口座に振り込まれる",
      color: "purple",
    },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <ol className="flex flex-col gap-3">
        {steps.map((s) => (
          <li
            key={s.title}
            className={`flex flex-col gap-1 rounded-md border px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${colorClass(s.color)}`}
          >
            <div className="flex w-full shrink-0 flex-col sm:w-40">
              <span className="text-sm font-semibold">{s.title}</span>
              <span className="text-[10px] opacity-80">{s.sub}</span>
            </div>
            <span className="text-xs sm:text-sm">{s.body}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        医師の「行為」がそのまま「点数」に翻訳され、月単位で集計されて請求になる
      </p>
    </div>
  );
}

function PatientFlowDiagram() {
  const steps = [
    { label: "受付", sub: "医事課", color: "amber" },
    { label: "外来診察", sub: "医師 + クラーク", color: "emerald" },
    { label: "検査", sub: "検査部 / 放射線科", color: "zinc" },
    { label: "会計 or 入院", sub: "医事課 / 病棟", color: "blue" },
    { label: "退院 + 引き継ぎ", sub: "地域連携室", color: "purple" },
  ];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-stretch gap-2">
            <div
              className={`flex flex-1 flex-col items-center justify-center rounded-md border px-2 py-3 ${colorClass(s.color)}`}
            >
              <span className="text-sm font-semibold">{s.label}</span>
              <span className="mt-1 text-[10px] opacity-80">{s.sub}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center text-zinc-400 dark:text-zinc-600">→</div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        いちばん上の流れは典型例。実際には<strong>検査→診察→検査</strong>と往復することも多い
      </p>
    </div>
  );
}

function colorClass(color: string) {
  switch (color) {
    case "amber":
      return "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200";
    case "emerald":
      return "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200";
    case "blue":
      return "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-200";
    case "purple":
      return "border-purple-300 bg-purple-50 text-purple-900 dark:border-purple-700 dark:bg-purple-950/30 dark:text-purple-200";
    default:
      return "border-zinc-300 bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";
  }
}

function RoleCard({
  title,
  sub,
  body,
}: {
  title: string;
  sub: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500">
          {sub}
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{body}</p>
    </div>
  );
}

function Glossary({ entries }: { entries: [string, string][] }) {
  return (
    <dl className="flex flex-col divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
      {entries.map(([term, def]) => (
        <div key={term} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[8rem,1fr] sm:gap-3">
          <dt className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {term}
          </dt>
          <dd className="text-sm text-zinc-700 dark:text-zinc-300">{def}</dd>
        </div>
      ))}
    </dl>
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
    { id: "overview", num: 2, title: "全体像 (組織図)" },
    { id: "places", num: 3, title: "場所" },
    { id: "roles", num: 4, title: "職種" },
    { id: "documents", num: 5, title: "書類・記録" },
    { id: "flow", num: 6, title: "患者の流れ" },
    { id: "quick", num: 7, title: "クイックリファレンス" },
    { id: "summary", num: 8, title: "まとめ" },
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
