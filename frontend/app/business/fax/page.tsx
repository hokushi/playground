export default function FaxPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          ファックスの仕組み
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          「紙を電話線で送る」── そのとき実際に何が起きているのか。
          スキャン → 音 → 印刷の流れを順番に見ていきます。
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          全体の流れ
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ファックスは突き詰めると <strong>「紙の絵を、電話で読み上げて、相手に書き取ってもらう」</strong> 装置です。
          ただし読むのも書くのも機械なので、ものすごく速い。流れは 5 ステップに分けられます。
        </p>

        <FaxFlowDiagram />

        <ol className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            <strong>① スキャン</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              横一列に並んだ光センサーで、紙を上から下へ <strong>1 行ずつ</strong> 読み取り、
              <strong>白なら 0 / 黒なら 1</strong> のビット列に変換する。色も灰色もない、白黒だけ。
            </p>
          </li>
          <li>
            <strong>② 圧縮</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              紙のほとんどは白い余白。「白が何個続く、次に黒が何個…」とまとめて
              <strong>長さで表現する (ランレングス)</strong> ことで一気に縮める。G3 では MH / MR / MMR と呼ばれる方式。
            </p>
          </li>
          <li>
            <strong>③ 変調 (モデム)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              電話線は音声 (300〜3400 Hz のアナログ波) しか流せない。
              そこで <strong>0/1 を音の高さや位相に対応付けて</strong>、電話で運べる「ただの音」に変換する。
              これが <strong>モデム (modulator/demodulator)</strong> の仕事。
            </p>
          </li>
          <li>
            <strong>④ 電話線で送る</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              電話線にとっては <strong>ただの音声通話</strong>と区別がつかない。
              通信開始時の「ピーヒョロロ」は、お互いの機種が解像度・速度を交渉している
              <strong>ハンドシェイク</strong>の音。
            </p>
          </li>
          <li>
            <strong>⑤ 復調 → 印刷</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              受信機が音を 0/1 に戻し (復調)、圧縮を展開して<strong>元の白黒ドット</strong>に復元。
              そのまま感熱紙や普通紙にプリントして完了。
            </p>
          </li>
        </ol>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          受信側で復元されるのは <strong>ビットマップ画像</strong> であって <strong>文字データではない</strong>のがポイント。
          「あ」と書かれた紙が届いても、機械にとっては「黒い点がこの位置にこう並んだ画像」でしかない。
          だからファックスを PDF で受け取っても、そのままでは <strong>検索できない</strong> (OCR が必要)。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          送信から受信までの実際のフロー
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ファックスは <strong>電話の上で動く</strong>仕組みなので、流れも「電話をかける」のとほぼ同じです。
          違うのは <strong>両端が機械</strong>で、人間のように「もしもし」とは言わず、
          代わりに <strong>音のサインで自己紹介</strong>するところ。
        </p>

        <FaxCallDiagram />

        <ol className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
          <li>
            <strong>1. 発信</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              送信者が原稿をセットし、相手のファックス番号を入力してスタート。
              送信機が <strong>普通の電話と同じ要領でダイヤル</strong>する。
            </p>
          </li>
          <li>
            <strong>2. 電話局を経由して接続</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              電話会社の交換機が宛先番号にルーティング。
              <strong>相手のファックス機が呼び出される</strong> (普通の電話の着信と同じ)。
            </p>
          </li>
          <li>
            <strong>3. 受信側が自動応答 → 「ピー」</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              受信機は呼び出しを検知すると、<strong>人を介さず</strong>自分で受話。
              直後に <strong>CED 音 (2100 Hz)</strong> を流して「私はファックスです」と宣言。
            </p>
          </li>
          <li>
            <strong>4. 送信側が「私もファックスです」と返答</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              送信機が <strong>CNG 音 (1100 Hz)</strong> で応答。これでお互い「相手は機械」と確認できる。
            </p>
          </li>
          <li>
            <strong>5. 能力交渉 (DIS → DCS)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              受信機が <strong>「対応している解像度・速度・圧縮方式」のリスト (DIS)</strong> を送る。
              送信機が「じゃあこの設定で送ります」と確定 (DCS)。これが「ヒョロロ」の正体。
            </p>
          </li>
          <li>
            <strong>6. 回線テスト (TCF)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              短い既知のパターンを実際に流して、<strong>その回線で本当にその速度が出るか</strong>確認。
              ダメなら 1 段階遅い速度に落として再試行。
            </p>
          </li>
          <li>
            <strong>7. 画像本体を送信 (「ガー…」)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              圧縮済みのビットを音に変調して流す。A4 1 枚で <strong>30 秒〜1 分</strong>程度。
            </p>
          </li>
          <li>
            <strong>8. ページ終了通知 (EOP / MPS)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              「1 ページ終わり」「次のページあり」を送信機が通知。
            </p>
          </li>
          <li>
            <strong>9. 受信確認 (MCF)</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              受信機が「ちゃんと受け取った」と応答。エラーがあれば再送要求 (PPR)。
            </p>
          </li>
          <li>
            <strong>10. 切断</strong>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              両者が電話を切る。送信機には <strong>「正常終了」の通信レポート</strong>が印字されることが多い。
            </p>
          </li>
        </ol>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ここまでが <strong>T.30 プロトコル</strong>と呼ばれる仕様で決められた手順。
          人間が「もしもし」「あ、こんにちは、では○○の件で」と話し始めるのと同じことを、
          機械が <strong>音のパターン</strong>でやっていると考えると分かりやすいです。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          同時に送られた場合はどうなる?
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          ここが重要なポイント。ファックスは <strong>電話回線の上で動いている</strong>ので、
          回線の <strong>「1 つの電話番号 = 同時 1 通話」</strong>という制約をそのまま受け継ぎます。
        </p>

        <BusySignalDiagram />

        <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <p className="text-sm font-medium text-rose-900 dark:text-rose-200">
            シンプルな構成 (1 回線) の場合: 後発は「話中」になる
          </p>
          <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
            A さんが送信中に B さんが同じ番号にダイヤルすると、
            <strong>普通の電話と同じく「ツーツーツー」の話中音</strong>が返る。
            B さんの送信機は通信を諦めるか、<strong>自動リダイヤル機能</strong>で
            数分後にもう一度試す (これが標準的な動作)。
          </p>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            病院・企業の構成: 「代表番号 + 複数回線」(ハントグループ)
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            実際の病院や企業では、<strong>1 つの代表番号の裏に複数の物理回線</strong>を束ねていることが多い。
            電話会社の交換機が <strong>空いている回線に自動で振り分け</strong>てくれる仕組み (ハントグループ)。
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-emerald-900/80 dark:text-emerald-300">
            <li>
              ・例: 代表 <strong>03-XXXX-1234</strong> の裏に物理回線 4 本 → <strong>同時に 4 件</strong>まで受信可能
            </li>
            <li>
              ・5 件目は話中になり、1 件終わった瞬間に繋がる
            </li>
            <li>
              ・送信側からは <strong>1 つの番号</strong>に見えるので意識する必要がない
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            インターネット FAX (FoIP / クラウド FAX) の場合
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            受信側がクラウドサービス経由でファックスを <strong>「メール / PDF」として受け取る</strong>方式なら、
            サービス側のサーバーが <strong>並列で大量に受信できる</strong>ので「同時送信で話中」にはほぼならない。
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            ただし、最終的に <strong>物理ファックス機で印刷</strong>する運用ならボトルネックは結局回線数に戻る。
            「クラウド FAX に変えたら受信漏れが減った」というのは、この
            <strong>受信側の同時並列処理能力が上がった</strong>のが理由。
          </p>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ちなみに <strong>送信が失敗した場合の挙動はファックス機ごとに違う</strong>。
          多くは数分間隔で 3〜5 回リトライしてダメなら諦め、<strong>「送信エラー」のレポートを印刷</strong>する。
          送信者が気付かないと「送ったつもりが届いてない」というトラブルになりがちなのが、この仕組みの弱点です。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          受信したファックスをあとで紙にするのは可能?
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          結論: <strong>できます</strong>。最近のファックス機 (および複合機) はほぼ全部、受信したものを
          <strong>「紙にすぐ印刷しない」モード</strong>を持っています。これを
          <strong>メモリ受信 / 代行受信</strong>と呼びます。
        </p>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            メモリ受信の仕組み
          </p>
          <ol className="mt-2 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>1.</strong> 受信機が画像データを受け取る (ここまではいつも通り)
            </li>
            <li>
              <strong>2.</strong> 復元したビットマップをすぐに紙に印刷せず、
              <strong>機械内部のメモリ (ストレージ) に保存</strong>
            </li>
            <li>
              <strong>3.</strong> ユーザーが <strong>「印刷ボタン」を押した時 or 後から PC で取り出した時</strong> に紙にする
            </li>
          </ol>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            受信時に「ピーガー…」が鳴って機械が受け取ること自体は <strong>リアルタイム</strong>。
            その後の <strong>「紙にする」工程だけ後回しにできる</strong>、というのが正確
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            よく使われるシーン
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>紙切れ・トナー切れ</strong>: 印刷できない状態でも受信は受け付けて、補充後にまとめて出力
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>夜間・休日</strong>: 営業時間外に届いたものを翌朝まとめて確認・印刷 (用紙節約)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>プライバシー保護</strong>: パスワード受信モードで、暗証番号を入れた人だけが印刷可能
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <span>
                <strong>転送・メール化</strong>: 受信したものを <strong>PDF として PC やメールに転送</strong>
                できる機種も多い (病院・クリニックでよくある運用)
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
            さらに進化: クラウド / インターネットファックス
          </p>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-300">
            「メモリ受信」を機械の中ではなく <strong>クラウド上でやる</strong>のが
            <strong>インターネットファックス (FoIP)</strong>。受信したものはクラウド側に PDF として保存され、
            <strong>メール通知 → ブラウザでダウンロード → 必要なら印刷</strong>という流れになる。
            紙がなくても受信できるし、複数人で共有もできる
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
            注意点
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-amber-900/80 dark:text-amber-300">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span>
                <strong>メモリ容量に上限あり</strong>: 古い機種だと数十ページで溢れる。溢れると新規受信を断る
                or 古いものから上書きされる
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span>
                <strong>停電・電源断で消失</strong>するリスクのある機種もある (バッテリーバックアップ有無は機種次第)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
              <span>
                <strong>送信側からは届いたかどうか分からない</strong>: メモリ受信でも「MCF (受け取った)」は返るので、
                送信側のログには「正常終了」と出る。受信側で印刷せずに気付かなければ伝達ミスになる
              </span>
            </li>
          </ul>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          つまり <strong>「受信のリアルタイム性」と「紙にするタイミング」は分けられる</strong>のがポイント。
          通信そのものは Phase 1〜4 で見たフローを必ずリアルタイムで行うが、最後の「印刷」だけは
          後回しにする選択肢があります。
        </p>

        <div className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <p className="text-sm font-medium text-rose-900 dark:text-rose-200">
            誤解しがち: 「メモリ受信があれば通話中は起きないのでは?」 ← <strong>起きます</strong>
          </p>
          <p className="mt-2 text-sm text-rose-900/80 dark:text-rose-300">
            メモリ受信が解決するのは <strong>「受け取った後どう保管・印刷するか」</strong>だけ。
            <strong>電話回線の使い方</strong>は何も変わらないので、
            <strong>「1 番号 = 同時 1 通話」という制約はそのまま残ります</strong>。
          </p>

          <pre className="mt-3 overflow-x-auto rounded bg-white/60 p-3 font-mono text-[11px] leading-relaxed text-rose-950 dark:bg-rose-950/50 dark:text-rose-100">
{`A さんが送信中
   └─ 受信機: 1 つの通信を処理中
      (画像を音で受け取り → メモリに保存中)
      ↓
      この回線は今 A さんで「使用中」

B さんが同時にダイヤル
   └─ 電話局: 「この番号は通話中です」
      ↓
      B さんに「ツーツーツー」(話中音)`}
          </pre>

          <p className="mt-3 text-sm text-rose-900/80 dark:text-rose-300">
            ポイント: メモリ受信は <strong>受信機内部</strong>の話。
            通話中の判定は <strong>電話局 (回線網)</strong>の話なので、レイヤーが違います。
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            では同時に複数受信したい時は?
          </p>
          <div className="mt-3 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs">
              <thead className="bg-zinc-50 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">解決策</th>
                  <th className="px-3 py-2 text-left font-semibold">対応するレイヤー</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white text-zinc-700 dark:divide-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <tr>
                  <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                    複数の電話回線 + 代表番号 (ハントグループ)
                  </td>
                  <td className="px-3 py-2">電話回線 (物理的に入口を増やす)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                    クラウド / インターネットファックス (FoIP)
                  </td>
                  <td className="px-3 py-2">サービス側が大量の回線を持っているので実質同時可</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-zinc-400 line-through dark:text-zinc-600">
                    メモリ受信
                  </td>
                  <td className="px-3 py-2 text-zinc-400 dark:text-zinc-600">関係なし (印刷タイミングだけの話)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            同時受信を可能にしたければ <strong>「物理的に入口 (回線) を増やす」</strong>しかない。
            メモリ受信ではどうにもならない部分
          </p>
        </div>
      </section>
    </main>
  );
}

function FaxCallDiagram() {
  const steps: { dir: "→" | "←"; text: string }[] = [
    { dir: "→", text: "電話をかける (ダイヤル)" },
    { dir: "←", text: "「私はファックスです」(ピー音)" },
    { dir: "→", text: "「私もファックスです」(ピー音)" },
    { dir: "←", text: "「私の対応設定はこれです」" },
    { dir: "→", text: "「ではこの設定で送ります」" },
    { dir: "→", text: "画像データ送信 (ガー… 30 秒〜1 分)" },
    { dir: "←", text: "「OK、受け取りました」" },
    { dir: "→", text: "電話を切る" },
  ];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-5 flex items-center justify-center gap-4 text-xs">
        <span className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
          A 送信機
        </span>
        <span className="text-zinc-400 dark:text-zinc-600">⇄</span>
        <span className="rounded-md border border-blue-300 bg-blue-50 px-3 py-1.5 font-semibold text-blue-900 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-200">
          B 受信機
        </span>
      </div>

      <ol className="flex flex-col gap-2">
        {steps.map((s, i) => {
          const isAtoB = s.dir === "→";
          return (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="w-5 shrink-0 text-right font-mono text-xs text-zinc-400 dark:text-zinc-600">
                {i + 1}
              </span>
              <span
                className={`shrink-0 rounded px-2 py-0.5 font-mono text-xs font-semibold ${
                  isAtoB
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-200"
                }`}
              >
                A {s.dir} B
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">{s.text}</span>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-500">
        要点: A が電話をかけて → 互いに「FAX です」と挨拶 → 設定を合わせて → 画像を送って → 切る
      </p>
    </div>
  );
}

function BusySignalDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 220" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="40"
          width="100"
          height="50"
          rx="6"
          className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text x="70" y="62" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          送信者 A
        </text>
        <text x="70" y="78" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          先に発信
        </text>

        <rect
          x="20"
          y="130"
          width="100"
          height="50"
          rx="6"
          className="fill-rose-50 stroke-rose-400 dark:fill-rose-950/30 dark:stroke-rose-700"
          strokeWidth="1.5"
        />
        <text x="70" y="152" textAnchor="middle" className="fill-rose-800 text-xs font-medium dark:fill-rose-200">
          送信者 B
        </text>
        <text x="70" y="168" textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-400">
          同時に発信
        </text>

        <rect
          x="260"
          y="85"
          width="100"
          height="50"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="310" y="107" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          電話局
        </text>
        <text x="310" y="123" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          1 番号 = 1 通話
        </text>

        <rect
          x="480"
          y="85"
          width="100"
          height="50"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="530" y="107" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          受信機
        </text>
        <text x="530" y="123" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          03-XXXX-1234
        </text>

        <line
          x1="120"
          y1="65"
          x2="260"
          y2="100"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#busy-arrow-ok)"
        />
        <text x="190" y="78" textAnchor="middle" className="fill-emerald-700 text-[10px] font-medium dark:fill-emerald-400">
          ✓ 接続
        </text>

        <line
          x1="360"
          y1="110"
          x2="480"
          y2="110"
          className="stroke-emerald-500"
          strokeWidth="2"
          markerEnd="url(#busy-arrow-ok)"
        />

        <line
          x1="120"
          y1="155"
          x2="260"
          y2="120"
          className="stroke-rose-500"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <line
          x1="260"
          y1="120"
          x2="120"
          y2="155"
          className="stroke-rose-500"
          strokeWidth="2"
          markerEnd="url(#busy-arrow-ng)"
        />
        <text x="190" y="148" textAnchor="middle" className="fill-rose-700 text-[10px] font-medium dark:fill-rose-400">
          ✕ 話中
        </text>
        <text x="190" y="162" textAnchor="middle" className="fill-rose-700 text-[10px] dark:fill-rose-400">
          (ツーツーツー)
        </text>

        <text x="300" y="200" textAnchor="middle" className="fill-zinc-600 text-[10px] dark:fill-zinc-400">
          A の通信が終わるまで B は繋がれない。B の送信機は自動リダイヤルで再試行することが多い
        </text>

        <defs>
          <marker
            id="busy-arrow-ok"
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
            id="busy-arrow-ng"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-rose-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function FaxFlowDiagram() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <svg viewBox="0 0 600 200" className="mx-auto w-full max-w-2xl">
        <rect
          x="20"
          y="70"
          width="90"
          height="60"
          rx="6"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="65" y="95" textAnchor="middle" className="fill-zinc-700 text-xs font-medium dark:fill-zinc-300">
          紙
        </text>
        <text x="65" y="112" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          (原稿)
        </text>

        <line x1="110" y1="100" x2="170" y2="100" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#fax-arrow)" />
        <text x="140" y="92" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          スキャン
        </text>

        <rect
          x="170"
          y="70"
          width="100"
          height="60"
          rx="6"
          className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text x="220" y="95" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          送信機
        </text>
        <text x="220" y="112" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          ビット→音
        </text>

        <path
          d="M 270 100 Q 310 70 350 100 Q 390 130 430 100"
          className="fill-none stroke-amber-500"
          strokeWidth="2"
        />
        <text x="350" y="65" textAnchor="middle" className="fill-amber-700 text-[11px] font-medium dark:fill-amber-400">
          電話線 (音)
        </text>
        <text x="350" y="145" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          ピーガー…
        </text>

        <rect
          x="430"
          y="70"
          width="100"
          height="60"
          rx="6"
          className="fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/30 dark:stroke-emerald-700"
          strokeWidth="1.5"
        />
        <text x="480" y="95" textAnchor="middle" className="fill-emerald-800 text-xs font-medium dark:fill-emerald-200">
          受信機
        </text>
        <text x="480" y="112" textAnchor="middle" className="fill-emerald-700 text-[10px] dark:fill-emerald-400">
          音→ビット
        </text>

        <line x1="530" y1="100" x2="565" y2="100" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1.5" markerEnd="url(#fax-arrow)" />

        <rect
          x="558"
          y="70"
          width="32"
          height="60"
          rx="4"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-800 dark:stroke-zinc-600"
          strokeWidth="1.5"
        />
        <text x="574" y="155" textAnchor="middle" className="fill-zinc-500 text-[10px] dark:fill-zinc-500">
          紙
        </text>

        <defs>
          <marker
            id="fax-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400 dark:fill-zinc-600" />
          </marker>
        </defs>
      </svg>
      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        紙 → ビット → 音 → ビット → 紙。途中の電話線では「音」として運ばれる
      </p>
    </div>
  );
}
