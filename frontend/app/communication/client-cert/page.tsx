import type { ReactNode } from "react";
import Link from "next/link";

export default function ClientCertPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-10 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          クライアント証明書
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          端末に証明書を入れておき、<strong>許可した端末からしか接続できないようにする</strong>仕組み。
          HTTPS（ACM の証明書）はそのまま使い、その上に<strong>端末を制限するためだけに足す</strong>ものです。
          前提になる ACM の証明書の仕組みから始めて、接続の瞬間に何が起きているか、
          端末に入れるまでの流れ、設計で決めることまでをまとめます。
        </p>
      </header>

      <TableOfContents />

      {/* 1. 先に結論 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="intro" num={1}>
          先に結論
        </SectionH2>
        <ul className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <li>
            ・普段の HTTPS では<strong>サーバーだけ</strong>が証明書を見せて、
            ブラウザが「本物のサイトか」を確かめている
          </li>
          <li>
            ・クライアント証明書はその<strong>逆向き</strong>。
            <strong>端末の側も</strong>証明書を見せて、サーバーが「こちらが許可した端末か」を確かめる
            （お互いに見せ合うので <strong>mTLS = 相互 TLS</strong> とも呼ぶ）
          </li>
          <li>
            ・<strong>HTTPS の代わりではない</strong>。ACM の証明書による HTTPS はそのままで、
            そこに<strong>端末の制限だけを足す</strong>
          </li>
          <li>
            ・端末に入れるのは<strong>証明書と秘密鍵のセット</strong>。
            証明書は人に見られてもよく、<strong>秘密鍵を持っていること</strong>がその端末である証拠になる
          </li>
          <li>
            ・確かめているのは<strong>「どの端末か」であって「誰か」ではない</strong>。
            人の確認が要るなら別に組み合わせる
          </li>
          <li>
            ・証明書のない端末は、接続の段階で切られるので
            <strong>ログイン画面にすらたどり着けない</strong>
          </li>
        </ul>
      </section>

      {/* 2. ACM の証明書 */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="acm" num={2}>
          まず、ACM の証明書はどう使われているか
        </SectionH2>
        <P>
          クライアント証明書の前に、すでに使っている証明書から見ていきます。
          <InlineLink href="/aws/route53">Route 53 で HTTPS 化</InlineLink>{" "}
          のページで ACM から発行して ALB に付けた、あの証明書です。
          <strong>最初に 1 回だけやる準備</strong>と、<strong>アクセスのたびに起きること</strong>に分けて描きます。
          この章の内容は、クライアント証明書を入れても<strong>何も変わりません</strong>（前提として知っておく部分です）。
        </P>

        <SubH3>その前に: CA（認証局）とは</SubH3>
        <P>
          CA は<strong>証明書を発行する役</strong>です（Certificate Authority の略）。
          「この公開鍵は hokushi-aws.click のもの」と確認したうえで、<strong>CA 自身の秘密鍵で署名</strong>して証明書にします。
          証明書を受け取った側は、その CA を信頼していれば「CA が確認して署名したのだから本物だ」と判断できます。
          会社と社員証の関係に近く、<strong>会社が CA、社員証が証明書</strong>です。
        </P>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <Th />
                <Th>公的な CA</Th>
                <Th>プライベート CA</Th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <Td strong>例</Td>
                <Td>Amazon（ACM の裏にいる CA）、Let&apos;s Encrypt など</Td>
                <Td>自分たちで用意する（AWS Private CA など）</Td>
              </tr>
              <tr>
                <Td strong>誰が信頼しているか</Td>
                <Td>世界中のブラウザ・OS に<strong>最初から登録済み</strong></Td>
                <Td>
                  <strong>自分で登録した相手だけ</strong>（今回は ALB）
                </Td>
              </tr>
              <tr>
                <Td strong>このページで発行するもの</Td>
                <Td>ACM の証明書（HTTPS 用。すでにある）</Td>
                <Td>クライアント証明書（端末制限用。今回足す）</Td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubH3>準備（最初に 1 回だけ）</SubH3>
        <AcmSetupDiagram />
        <P>
          ACM の中では、まず<strong>秘密鍵と公開鍵のペア</strong>が作られます。
          そのうち<strong>公開鍵は証明書の中に書き込まれ</strong>、ドメイン名や期限といっしょに Amazon の CA が署名します。
          つまり「証明書と秘密鍵」と書いているのは、<strong>「公開鍵入りの証明書」と「秘密鍵」</strong>のことです。
        </P>
        <KeyPairToCertDiagram />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <Th />
                <Th>誰が持つか</Th>
                <Th>どう使われるか</Th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <Td strong>🔑 秘密鍵</Td>
                <Td>
                  <strong>ACM と ALB だけ</strong>
                </Td>
                <Td>接続のたびに署名を作る（手順 3）。外には出ない</Td>
              </tr>
              <tr>
                <Td strong>🔓 公開鍵</Td>
                <Td>
                  <strong>証明書の中</strong>に入っている
                </Td>
                <Td>証明書ごとブラウザに渡され、署名を確かめるのに使われる（手順 4）</Td>
              </tr>
              <tr>
                <Td strong>📄 証明書</Td>
                <Td>ALB が持ち、誰にでも見せる</Td>
                <Td>「この公開鍵は hokushi-aws.click のもの」と CA が保証する書類</Td>
              </tr>
            </tbody>
          </table>
        </div>

        <P>
          秘密鍵を自分でダウンロードしたりサーバーに置いたりすることはなく、
          期限が近づくと ACM が自動で更新してくれます。
        </P>

        <Note>
          <InlineLink href="/keys">秘密鍵と公開鍵</InlineLink>{" "}
          のページでは、公開鍵を<strong>相手の DB に前もって登録</strong>していました。
          ブラウザは世界中のサイトの公開鍵を前もって持っておけないので、HTTPS では代わりに
          <strong>接続のたびに公開鍵を証明書に入れて渡し</strong>、
          「本当にこのドメインの公開鍵か」は CA の署名で保証します。
          ブラウザが前もって持っているのは、<strong>各サイトの公開鍵ではなく、信頼する CA の公開鍵</strong>（手順 4 の ③ で使う）だけです。
        </Note>

        <SubH3>アクセスのたび</SubH3>
        <AcmAccessDiagram />

        <div className="flex flex-col gap-2 rounded-lg border border-l-4 border-zinc-200 border-l-indigo-400 bg-indigo-50/30 px-5 py-4 dark:border-zinc-800 dark:border-l-indigo-500/70 dark:bg-indigo-950/10">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Q. ブラウザは ALB に何か持って行くの？
          </p>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>身元を証明するもの（証明書や鍵）は何も持って行きません。</strong>
            普段の HTTPS で証明書を見せるのは ALB だけで、ブラウザは<strong>見せてもらって確かめる側</strong>です。
          </p>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            開きたいパスや Cookie などは、暗号化の準備が終わったあと（下の手順 6）で初めて送ります。
          </p>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            つまり ALB から見ると、<strong>接続の段階ではブラウザが誰なのか分かりません</strong>。
            ここで端末にも証明書を持って行かせるのが、クライアント証明書です。
          </p>
        </div>

        <SubH3>細かい手順</SubH3>
        <P>
          <Code>https://hokushi-aws.click</Code> を開いたときの流れです（TLS 1.3 の場合）。
          手順 3〜5 が、暗号化の準備をする <strong>TLS ハンドシェイク</strong>です
          （暗号方式の相談など、証明書に関係しないやり取りは省いています）。
        </P>

        <ol className="flex flex-col">
          <FlowStep
            n={1}
            actor="ブラウザ → Route 53"
            title="ドメインの IP アドレスを聞く"
            carry={[<>「hokushi-aws.click の IP アドレスは？」という問い合わせ</>]}
          >
            ALB の IP アドレスが返ってきます。まだ暗号化の話は出てきません。
          </FlowStep>
          <FlowStep
            n={2}
            actor="ブラウザ → ALB"
            title="443 番ポートにつなぐ（TCP）"
            carry={[<>「443 番につなぎたい」という合図だけ（中身はなし）</>]}
          >
            通り道ができただけで、まだ何も暗号化されていません（
            <InlineLink href="/network/port">ポート</InlineLink> のページ）。
          </FlowStep>
          <FlowStep
            n={3}
            actor="ALB → ブラウザ"
            title="証明書と署名を送る"
            carry={[
              <>ACM の証明書（途中の発行者の証明書もいっしょに）</>,
              <>
                <strong>秘密鍵で作った署名</strong>（この接続のために、その場で作る）
              </>,
              <>「こちらの準備は終わり」の合図（Finished）</>,
            ]}
          >
            秘密鍵そのものは送りません。送るのは、秘密鍵を持っていないと作れない署名だけです。
            クライアント証明書を使う構成では、ここに<strong>「そちらの証明書も見せて」</strong>が加わります（3 章）。
          </FlowStep>
          <FlowStep n={4} actor="ブラウザ" title="証明書を確かめる">
            次の 4 つを確かめます。番号は上の図の証明書の項目と対応しています。
            <ol className="mt-2 flex flex-col gap-2">
              <CheckRow n="①" field="発行先" title="アドレスバーのドメインと同じか">
                証明書に書かれた <Code>hokushi-aws.click</Code> と、今つなごうとしているドメインを比べます。
                別のサイトの証明書を見せられたら、ここで気付けます。
              </CheckRow>
              <CheckRow n="②" field="有効期限" title="期限内か">
                切れていれば警告画面になります。ACM は自動で更新するので、普段は意識しません。
              </CheckRow>
              <CheckRow n="③" field="発行者" title="信頼している発行者か">
                ブラウザや OS には<strong>「信頼する発行者（認証局 = CA）の一覧」</strong>が最初から入っていて、
                Amazon はその中にいます。一覧にない発行者の証明書だと警告になります。
              </CheckRow>
              <CheckRow n="④" field="公開鍵" title="ALB が秘密鍵を持っているか">
                手順 3 の署名を、証明書の中の<strong>公開鍵</strong>で確かめます。
                証明書そのものは鍵マークから誰でも見られるので、<strong>見せるだけでは本物の証拠にならない</strong>からです
                （鍵ペアの話は <InlineLink href="/keys">秘密鍵と公開鍵</InlineLink> のページ）。
              </CheckRow>
            </ol>
            <span className="mt-2 block">
              1 つでも通らなければ、ブラウザは警告画面を出して先に進みません。
            </span>
          </FlowStep>
          <FlowStep
            n={5}
            actor="ブラウザ → ALB"
            title="「こちらも準備完了」と返す（Finished）"
            carry={[<>完了の合図（ブラウザ側で計算した値）</>]}
          >
            ここでハンドシェイクが終わり、アドレスバーに 🔒 が付きます。<strong>ここから先のやり取りは暗号化されます。</strong>
          </FlowStep>
          <FlowStep
            n={6}
            actor="ブラウザ → ALB"
            title="HTTPS でリクエストを送る"
            last
            carry={[
              <>
                <Code>GET /</Code>（開きたいパス）
              </>,
              <>
                <Code>Host: hokushi-aws.click</Code>
              </>,
              <>
                <Code>Cookie</Code>（ログイン状態など。あれば）
              </>,
              <>
                <Code>User-Agent</Code>（ブラウザの種類）など
              </>,
            ]}
          >
            ブラウザが<strong>パスや Cookie を持って行くのは、ここが初めて</strong>です。
            すべて暗号化されているので、途中の経路からは読めません。
            <span className="mt-1.5 block">
              中身は普通の <strong>HTTP のリクエスト</strong>で、それを手順 3〜5 で準備した暗号化の中に入れて送ります。
              この「HTTP を TLS で暗号化して送る」ことを <strong>HTTPS</strong> と呼びます（
              <InlineLink href="/communication/http">HTTP / TLS / HTTPS</InlineLink> のページ）。
            </span>
          </FlowStep>
        </ol>

        <Note>
          まとめると、<strong>証明書は「見せるもの」、秘密鍵は「見せずに持っているもの」</strong>で、
          この 2 つが揃って初めて「本物のサーバー」と認められます。
          クライアント証明書は、<strong>このセットを端末にも持たせる</strong>話です。
        </Note>
      </section>

      {/* 3. ハンドシェイク */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="handshake" num={3}>
          つなぐ瞬間に何が起きているか
        </SectionH2>
        <P>
          2 章の HTTPS の流れはそのままで、<strong>端末の側も証明書を見せる</strong>手順が足されます。
          クライアント証明書の確認は、<strong>HTTP のリクエストより前</strong>、
          暗号化された通信路を作る段階（TLS ハンドシェイク）で行われます。
          <InlineLink href="/communication/http">HTTP / TLS / HTTPS</InlineLink>{" "}
          のページでいう「TLS の層」の話です。
        </P>

        <HandshakeDiagram />
      </section>

      {/* 4. 端末に仕込む */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="install" num={4}>
          「端末に仕込む」とは ── 発行からサーバー設定まで
        </SectionH2>
        <P>
          流れはおおまかに 4 段階です。
          作業する場所が<strong>管理者の手元・端末・サーバー</strong>と分かれます。
        </P>

        <div className="flex flex-col">
          <Step n={1} where="管理者" title="プライベート CA を用意する">
            自分たち専用の「証明書の発行窓口」で、2 章の Amazon の CA にあたる役を自分たちで持ちます。
            AWS Private CA のようなサービスを使うか、OpenSSL などで自前で作ります。
            <strong>CA の秘密鍵が一番大事な鍵</strong>で、これが漏れると誰でも「許可された端末」の証明書を作れてしまいます。
          </Step>
          <Step n={2} where="管理者" title="端末ごとに証明書を発行する">
            端末用の鍵ペアを作り、CA が署名して証明書にします。
            持ち主の名前（Subject）に端末名を入れておくと、あとで「どの端末からの接続か」が分かります。
          </Step>
          <Step n={3} where="端末" title="端末にインストールする">
            秘密鍵と証明書をパスワード付きで 1 つにまとめたファイル（<Code>.p12</Code> / <Code>.pfx</Code>）を取り込みます。
            台数が多いと 1 台ずつは現実的でないので、MDM（Intune など、端末をまとめて管理する仕組み）で配ります。
            取り込むときは<strong>秘密鍵を書き出せない設定</strong>にしておきます。
          </Step>
          <Step n={4} where="サーバー" title="サーバーに「この CA を信頼する」と登録する" last>
            AWS なら ALB の mTLS 機能を使います。
            CA の証明書（トラストストア）と失効リストを登録し、検証する設定にします。
          </Step>
        </div>

        <SubH3>検証するのは ALB</SubH3>
        <WhereDiagram />
        <P>
          クライアント証明書を確かめられるのは、<strong>TLS を終わらせている場所だけ</strong>です。
          <InlineLink href="/network/proxy">プロキシ</InlineLink>{" "}
          のページで見たとおり、ブラウザの接続相手は ALB なので、検証も ALB で行います。
          ALB は通した証明書の情報を <Code>X-Amzn-Mtls-Clientcert-Subject</Code>{" "}
          などのヘッダーに入れて奥のアプリに渡すので、
          アプリはそれを見て<strong>どの端末から来たか</strong>を知ることができます。
        </P>
        <Note>
          ALB の手前に CDN など<strong>別に TLS を終わらせる箱</strong>を置く構成だと、
          ALB には端末の証明書が届きません。その場合は手前の箱で検証する必要があります。
        </Note>

        <SubH3>入れたあとも続く作業</SubH3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Term term="期限が来たら更新">
            証明書には必ず期限があり、切れた瞬間にその端末は入れなくなります。
            全台を同じ日に発行すると、<strong>全台が同じ日に止まります</strong>。
          </Term>
          <Term term="紛失・盗難したら失効">
            PC やタブレットを置き忘れたり盗まれたりしても、その端末には証明書が入ったままなので、
            <strong>拾った人が接続できてしまいます</strong>。
            そこでその証明書を失効リストに載せて、ALB に弾かせます。
          </Term>
          <Term term="CA 自体にも期限がある">
            CA の証明書が切れると、<strong>そこから発行した証明書が全部無効</strong>になります。
            CA の期限は長めに取るのが普通です。
          </Term>
        </div>
      </section>

      {/* 5. 設計で決めること */}
      <section className="flex flex-col gap-4">
        <SectionH2 id="design" num={5}>
          設計で決めること
        </SectionH2>
        <P>
          「クライアント証明書でやる」と決めたあとに、具体的に決める必要がある項目です。
        </P>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                <Th>決めること</Th>
                <Th>決めておかないと困ること</Th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              <tr>
                <Td strong>証明書は端末ごとに発行するか</Td>
                <Td>
                  全台に同じ証明書を入れていると、1 台を紛失・盗難して失効させたとき、
                  <strong>残りの全台も同じ証明書なのでつながらなくなる</strong>（全台に入れ直し）
                </Td>
              </tr>
              <tr>
                <Td strong>CA をどう用意し、CA の秘密鍵をどこに置くか</Td>
                <Td>CA の秘密鍵が漏れると、誰でも許可された端末になりすませる</Td>
              </tr>
              <tr>
                <Td strong>どこで検証するか</Td>
                <Td>ALB か、その手前の箱か。TLS を終わらせる場所でしか検証できない</Td>
              </tr>
              <tr>
                <Td strong>どうやって端末に配るか</Td>
                <Td>台数・端末の種類（Windows / iPad など）・MDM の有無で手順がまるで変わる</Td>
              </tr>
              <tr>
                <Td strong>秘密鍵を書き出せないようにできるか</Td>
                <Td>書き出せると、コピーして別の端末で使えてしまう</Td>
              </tr>
              <tr>
                <Td strong>有効期限と、誰がいつ更新するか</Td>
                <Td>ある日突然、端末がつながらなくなる</Td>
              </tr>
              <tr>
                <Td strong>紛失・盗難時の連絡先と失効の手順</Td>
                <Td>紛失・盗難した端末が、失効させるまで接続できてしまう</Td>
              </tr>
              <tr>
                <Td strong>人の認証をどう組み合わせるか</Td>
                <Td>共有端末で「誰が操作したか」を残せない</Td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Link
        href="/keys"
        className="group flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-6 py-5 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            関連ページ
          </p>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            秘密鍵と公開鍵
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            証明書の中身の公開鍵と、端末に残す秘密鍵 ── <strong>どっちが何をするか</strong>の話。
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

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="underline underline-offset-2 hover:text-zinc-950 dark:hover:text-zinc-50"
    >
      {children}
    </Link>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
      {children}
    </p>
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

function FlowStep({
  n,
  actor,
  title,
  carry,
  notCarry,
  last,
  children,
}: {
  n: number;
  actor: string;
  title: string;
  carry?: ReactNode[];
  notCarry?: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {n}
        </span>
        {!last && <span className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />}
      </div>
      <div className="mb-3 flex w-full min-w-0 flex-col gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-zinc-300 bg-zinc-50 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {actor}
          </span>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
        </div>
        {carry && (
          <div className="rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
            <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              持って行くもの
            </p>
            <ul className="mt-1 flex flex-col gap-0.5 text-[13px] text-zinc-800 dark:text-zinc-200">
              {carry.map((c, i) => (
                <li key={i}>・{c}</li>
              ))}
            </ul>
            {notCarry && (
              <p className="mt-1.5 text-[12px] text-zinc-500 dark:text-zinc-400">
                持って行かないもの: {notCarry}
              </p>
            )}
          </div>
        )}
        <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</div>
      </div>
    </li>
  );
}

/** ブラウザが証明書で確かめる 1 項目。field = 図の証明書のどの欄か */
function CheckRow({
  n,
  field,
  title,
  children,
}: {
  n: string;
  field: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">{n}</span>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
            {field}
          </span>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>
      </div>
    </li>
  );
}

/** 手順の 1 段。where = その作業をする場所 */
function Step({
  n,
  where,
  title,
  last,
  children,
}: {
  n: number;
  where: "管理者" | "端末" | "サーバー";
  title: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {n}
        </span>
        {!last && <span className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />}
      </div>
      <div className="mb-3 flex w-full flex-col gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-zinc-300 bg-zinc-50 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {where}
          </span>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>
      </div>
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
    { id: "acm", num: 2, title: "ACM の証明書はどう使われているか" },
    { id: "handshake", num: 3, title: "つなぐ瞬間に何が起きているか" },
    { id: "install", num: 4, title: "端末に仕込むまでの流れ" },
    { id: "design", num: 5, title: "設計で決めること" },
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

function Box({
  name,
  sub,
  tone = "plain",
}: {
  name: string;
  sub?: string;
  tone?: "plain" | "server" | "device";
}) {
  const cls = {
    plain: "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900",
    server: "border-indigo-300 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/30",
    device: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
  }[tone];
  return (
    <div className={`w-full rounded-lg border px-4 py-3 text-center sm:w-44 ${cls}`}>
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{name}</p>
      {sub && (
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">{sub}</p>
      )}
    </div>
  );
}

/** 横向きの矢印（狭い画面では縦向きになる） */
function Arrow({ label, dir = "right" }: { label: string; dir?: "right" | "left" }) {
  return (
    <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
      <span className="text-center text-[11px] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <span className="text-2xl leading-none">
        <span className="sm:hidden">{dir === "right" ? "↓" : "↑"}</span>
        <span className="hidden sm:inline">{dir === "right" ? "→" : "←"}</span>
      </span>
    </div>
  );
}

function AcmSetupDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:justify-center sm:gap-4">
      <Box name="Route 53" sub="hokushi-aws.click を持っている" />
      <Arrow label="ドメインの持ち主か確認" />
      <Box name="ACM" sub="鍵ペアを作り、証明書を発行" tone="server" />
      <Arrow label="ALB に付ける" />
      <Box name="ALB" sub="証明書（公開鍵入り）と秘密鍵を持つ" tone="server" />
    </div>
  );
}

/** ACM の中で、鍵ペアから証明書ができるまで */
function KeyPairToCertDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:justify-center sm:gap-4">
      <div className="flex w-full flex-col gap-1.5 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-3 dark:border-zinc-700 dark:bg-zinc-900 sm:w-44">
        <p className="text-center text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
          鍵ペアを作る
        </p>
        <span className="rounded border border-zinc-800 bg-zinc-800 px-2 py-1 text-center text-[11px] font-medium text-zinc-50 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900">
          🔑 秘密鍵
        </span>
        <span className="rounded border border-dashed border-zinc-400 bg-white px-2 py-1 text-center text-[11px] font-medium text-zinc-700 dark:border-zinc-500 dark:bg-transparent dark:text-zinc-300">
          🔓 公開鍵
        </span>
      </div>

      <Arrow label="証明書に入れる" />

      <div className="w-full rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-3 dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-56">
        <p className="text-center text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
          Amazon の CA が署名
        </p>
        <div className="mt-1.5 rounded-md border border-indigo-200 bg-white px-3 py-2 text-[11px] dark:border-indigo-900 dark:bg-zinc-950">
          <p className="font-semibold text-zinc-700 dark:text-zinc-300">📄 証明書</p>
          <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">発行先: hokushi-aws.click</p>
          <p className="text-zinc-600 dark:text-zinc-400">有効期限・発行者</p>
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">🔓 公開鍵</p>
          <p className="mt-0.5 border-t border-indigo-100 pt-0.5 text-indigo-700 dark:border-indigo-900 dark:text-indigo-300">
            ✒ CA の署名
          </p>
        </div>
      </div>

      <Arrow label="ALB へ" />

      <div className="flex w-full flex-col gap-1.5 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-3 dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-44">
        <p className="text-center text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
          ALB が持つもの
        </p>
        <span className="rounded border border-indigo-200 bg-white px-2 py-1 text-center text-[11px] font-medium text-zinc-700 dark:border-indigo-900 dark:bg-zinc-950 dark:text-zinc-300">
          📄 証明書（公開鍵入り）
        </span>
        <span className="rounded border border-zinc-800 bg-zinc-800 px-2 py-1 text-center text-[11px] font-medium text-zinc-50 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900">
          🔑 秘密鍵
        </span>
      </div>
    </div>
  );
}

/** 図の中の証明書。mark = ブラウザが確かめる項目の番号 */
function CertCard() {
  const fields = [
    { mark: "①", label: "発行先", value: "hokushi-aws.click" },
    { mark: "②", label: "有効期限", value: "〜 2027/08/31" },
    { mark: "③", label: "発行者", value: "Amazon" },
    { mark: "④", label: "公開鍵", value: "MIIBIjANBg…" },
  ];
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="rounded-md border border-indigo-200 bg-white px-3 py-2 text-left dark:border-indigo-900 dark:bg-zinc-950">
        <p className="mb-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
          📄 証明書（見せる）
        </p>
        <dl className="grid grid-cols-[auto_auto_1fr] gap-x-1.5 gap-y-0.5 text-[11px]">
          {fields.map((f) => (
            <div key={f.label} className="contents">
              <dt className="font-semibold text-indigo-600 dark:text-indigo-400">{f.mark}</dt>
              <dt className="text-zinc-500 dark:text-zinc-400">{f.label}</dt>
              <dd className="truncate font-mono text-zinc-800 dark:text-zinc-200">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-md border border-zinc-800 bg-zinc-800 px-3 py-1.5 text-left text-[11px] font-medium text-zinc-50 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900">
        🔑 秘密鍵（見せない・署名に使う）
      </div>
    </div>
  );
}

function AcmAccessDiagram() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
        <div className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-3 text-center dark:border-zinc-700 dark:bg-zinc-900 sm:w-32">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">ブラウザ</p>
          <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
            ①〜④ を確かめる
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Arrow label="https://hokushi-aws.click" dir="right" />
          <Arrow label="証明書 + 署名" dir="left" />
        </div>

        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-3 dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-64">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">ALB</p>
          <CertCard />
        </div>

        <Arrow label="HTTP 80" />

        <div className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-3 text-center dark:border-zinc-700 dark:bg-zinc-900 sm:w-28">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">EC2</p>
          <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">アプリ</p>
        </div>
      </div>
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
        暗号化されるのはブラウザ〜ALB の間。証明書と秘密鍵は ALB だけが持ち、EC2 には置かない
      </p>
    </div>
  );
}

type HandshakeRow = {
  n: string;
  /** device / server = その側だけで行う処理、それ以外 = 矢印で送るメッセージ */
  dir: "toServer" | "toDevice" | "both" | "device" | "server";
  text: ReactNode;
  sub?: string;
};

function HandshakeDiagram() {
  const rows: HandshakeRow[] = [
    { n: "①", dir: "toServer", text: "つなぎたい" },
    {
      n: "②",
      dir: "toDevice",
      text: (
        <>
          ALB の証明書 ＋ <strong>「そちらの証明書も見せて」</strong>
        </>
      ),
    },
    { n: "③", dir: "device", text: "ALB の証明書を確かめる", sub: "ここまでは 2 章と同じ" },
    {
      n: "④",
      dir: "device",
      text: "出す証明書を選ぶ",
      sub: "ブラウザに「証明書の選択」画面が出ることがある",
    },
    {
      n: "⑤",
      dir: "toServer",
      text: (
        <>
          クライアント証明書（公開鍵入り）＋ <strong>秘密鍵で作った署名</strong>
        </>
      ),
    },
    { n: "⑥", dir: "server", text: "証明書と署名を確かめる", sub: "通らなければここで切断" },
    {
      n: "⑦",
      dir: "both",
      text: (
        <>
          暗号化された通信路ができ、<strong>ここで初めて HTTP が流れる</strong>
        </>
      ),
      sub: "GET /login など",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="min-w-[32rem]">
        <div className="mb-3 grid grid-cols-[2rem_7rem_1fr_7rem] items-center gap-2">
          <span />
          <p className="rounded-lg border border-amber-300 bg-amber-50 py-2 text-center text-sm font-semibold text-zinc-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-zinc-100">
            端末
          </p>
          <span />
          <p className="rounded-lg border border-indigo-300 bg-indigo-50 py-2 text-center text-sm font-semibold text-zinc-900 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-zinc-100">
            サーバー (ALB)
          </p>
        </div>

        <ol className="flex flex-col gap-2">
          {rows.map((r) => {
            const message = r.dir !== "device" && r.dir !== "server";
            return (
              <li
                key={r.n}
                className="grid grid-cols-[2rem_7rem_1fr_7rem] items-center gap-2"
              >
                <span className="text-center text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  {r.n}
                </span>
                {message ? (
                  <div className="col-span-3 flex flex-col items-center gap-0.5 px-10">
                    <p className="text-center text-[13px] text-zinc-800 dark:text-zinc-200">
                      {r.text}
                    </p>
                    {r.sub && (
                      <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-400">
                        {r.sub}
                      </p>
                    )}
                    <div className="flex w-full items-center text-zinc-400 dark:text-zinc-600">
                      {r.dir !== "toServer" && <span className="text-sm leading-none">◀</span>}
                      <span className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
                      {r.dir !== "toDevice" && <span className="text-sm leading-none">▶</span>}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`col-span-3 flex ${r.dir === "server" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[18rem] rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900/60">
                      <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                        {r.text}
                      </p>
                      {r.sub && (
                        <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                          {r.sub}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
          ①〜⑥ が TLS ハンドシェイク。証明書の確認はすべて HTTP より前に終わる
        </p>
      </div>
    </div>
  );
}

function WhereDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:justify-center sm:gap-4">
      <Box name="端末" sub="証明書 + 秘密鍵" tone="device" />
      <Arrow label="証明書つきで接続" />
      <div className="w-full rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-3 text-center dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-48">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">ALB</p>
        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">ここで検証する</p>
        <div className="mt-2 flex flex-col gap-1 text-[11px] text-zinc-600 dark:text-zinc-400">
          <span className="rounded border border-indigo-200 bg-white px-1.5 py-0.5 dark:border-indigo-900 dark:bg-zinc-950">
            信頼する CA（トラストストア）
          </span>
          <span className="rounded border border-indigo-200 bg-white px-1.5 py-0.5 dark:border-indigo-900 dark:bg-zinc-950">
            失効リスト
          </span>
        </div>
      </div>
      <Arrow label="ヘッダーに端末の情報" />
      <Box name="アプリ" sub="どの端末か分かる" />
    </div>
  );
}
