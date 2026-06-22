import type { ReactNode } from "react";
import { Screenshot } from "@/app/_components/Screenshot";

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  );
}

export default function DockerPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Docker のイメージとコンテナ
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          まずは「イメージ」と「コンテナ」が何かをざっくり理解する
        </p>
      </header>

      {/* Docker とは */}
      <Card title="Docker ってなに？">
        <P>
          <strong>アプリや DB を「箱」ごと動かす仕組み</strong>。
          PostgreSQL のようなソフトを自分の PC に直接インストールしなくても、
          用意された箱を動かすだけで使える。
        </P>
        <P>
          「環境を汚さない」「消すのも一瞬」「誰の PC でも同じものが動く」のが嬉しいところ。
          この「箱」まわりで出てくる 2 大用語が <strong>イメージ</strong> と{" "}
          <strong>コンテナ</strong>。
        </P>
      </Card>

      {/* イメージ */}
      <Card title="イメージ（image）＝ 設計図・ひな形">
        <P>
          <strong>アプリと必要なものが全部詰まった「読み取り専用のテンプレート」</strong>。
          これ自体は動かない。あくまで「これを元に動かす」ための型。
        </P>
        <div className="rounded-md border border-indigo-200 bg-indigo-50/50 px-4 py-3 dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <p className="text-[14px] leading-relaxed text-zinc-800 dark:text-zinc-200">
            たとえると <strong>「料理のレシピ＋材料セット」</strong>。
            レシピそのものは食べられないけど、これがあれば同じ料理を何回でも作れる。
          </p>
        </div>
        <P>
          イメージは <Code>postgres:17</Code> のように<strong>名前とバージョン</strong>を持つ。
          世界中の人が作ったイメージは <strong>Docker Hub</strong> という置き場で配布されていて、
          そこからダウンロードして使う。
        </P>
        <Screenshot
          src="/backend/docker-desktop-images.png"
          alt="Docker Desktop の Images タブ。postgres タグ 17 のイメージがある"
          width={3014}
          height={1848}
          caption="Docker Desktop の Images タブ。ダウンロード済みの「設計図」一覧。postgres:17（一番下）がこのプロジェクトで使っているイメージ。"
        />
      </Card>

      {/* コンテナ */}
      <Card title="コンテナ（container）＝ 実際に動いている箱">
        <P>
          <strong>イメージを元に起動した「実体」</strong>。
          これが実際に動いて、PostgreSQL が使えるようになる。
        </P>
        <div className="rounded-md border border-emerald-200 bg-emerald-50/50 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <p className="text-[14px] leading-relaxed text-zinc-800 dark:text-zinc-200">
            さっきの例えなら <strong>「レシピから実際に作った料理」</strong>。
            1 つのレシピ（イメージ）から、料理（コンテナ）は何皿でも作れる。
          </p>
        </div>
        <P>
          コンテナは<strong>起動・停止・削除</strong>ができる。消しても元のイメージは残るので、
          また同じものをすぐ作り直せる。
        </P>
        <Screenshot
          src="/backend/docker-desktop-containers.png"
          alt="Docker Desktop の Containers タブ。memory-game が起動中"
          width={3014}
          height={1848}
          caption="Docker Desktop の Containers タブ。緑のしるしが付いた memory-game が、いま実際に動いているコンテナ。右の ▷/□/🗑 で起動・停止・削除できる。"
        />
      </Card>

      {/* 関係の図 */}
      <Card title="イメージとコンテナの関係">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950/40 sm:flex-row sm:justify-center sm:gap-6">
          <div className="w-full rounded-lg border border-indigo-300 bg-indigo-50 px-4 py-3 text-center dark:border-indigo-800 dark:bg-indigo-950/30 sm:w-56">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              イメージ
            </p>
            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
              設計図（postgres:17）
            </p>
          </div>

          <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-600">
            <span className="text-[12px] text-zinc-500 dark:text-zinc-400">
              起動（run）
            </span>
            <span className="text-2xl leading-none">→</span>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-56">
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-center dark:border-emerald-800 dark:bg-emerald-950/30">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                コンテナ
              </p>
              <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
                実際に動く箱
              </p>
            </div>
            <p className="text-center text-[12px] text-zinc-500 dark:text-zinc-400">
              （1 つのイメージから何個でも作れる）
            </p>
          </div>
        </div>
        <P>
          プログラミングに例えるなら、<strong>イメージ＝クラス</strong>、
          <strong>コンテナ＝そのクラスから作ったインスタンス</strong>、という関係に近い。
        </P>
      </Card>

      {/* おまけ用語 */}
      <Card title="ついでに覚える用語">
        <P>
          <strong>Docker Hub</strong> … イメージの配布場所（アプリストアのようなもの）。
          <Code>postgres</Code> などの公式イメージをここから取ってくる。
        </P>
        <P>
          <strong>ボリューム（volume）</strong> … コンテナの<strong>データ保存場所</strong>。
          コンテナは消すと中身も消えるが、データをボリュームに置いておけば
          コンテナを作り直しても残る（DB のデータ保存に使う）。
        </P>
        <Screenshot
          src="/backend/docker-desktop-volumes.png"
          alt="Docker Desktop の Volumes タブ。memory-game_pgdata がある"
          width={3014}
          height={1848}
          caption="Docker Desktop の Volumes タブ。memory-game_pgdata が、このプロジェクトの DB データの保存場所。docker compose down -v の -v はこれを消す（＝データが消える）という意味。"
        />
        <P>
          <strong>docker-compose</strong> … 「どんなコンテナをどう立てるか」を 1 つのファイル
          （<Code>docker-compose.yml</Code>）にまとめて書いておく仕組み。
          コマンド一発でまとめて起動できる。
        </P>
      </Card>

      {/* まとめ */}
      <section className="rounded-lg border border-amber-200 bg-amber-50/60 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-950/20">
        <p className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">
          <strong>ひとことで:</strong> <strong>イメージ</strong>＝設計図（動かない型）、
          <strong>コンテナ</strong>＝それを起動した実体（実際に動く箱）。
          イメージ 1 つからコンテナは何個でも作れる。
        </p>
      </section>
    </main>
  );
}
