export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "ネットワーク基礎",
    items: [
      { href: "/network/layers", label: "ネットワークの 7 層 (OSI)" },
      { href: "/network", label: "有線と無線" },
      { href: "/network/internet", label: "インターネットの裏側" },
      { href: "/network/domain-url", label: "ドメイン と URL" },
      { href: "/network/port", label: "ポートとは何か (443 / 80)" },
      { href: "/network/ping", label: "ping で疎通を確かめる" },
    ],
  },
  {
    label: "ネットワーク構成",
    items: [
      { href: "/network/switches", label: "L2 / L3 スイッチとポート" },
      { href: "/network/two-sites", label: "2 拠点・セグメント分割と共通 L3" },
      { href: "/network/firewall", label: "ファイアウォール / FortiGate" },
      { href: "/network/proxy", label: "プロキシとは何か" },
      { href: "/network/vpn", label: "VPN の種類 (IP-VPN ほか)" },
    ],
  },
  {
    label: "Web 通信",
    items: [
      { href: "/communication/http", label: "HTTP / TLS / HTTPS" },
      { href: "/cookie", label: "Cookie と Domain" },
      { href: "/cors", label: "CORS はブラウザのルール" },
      { href: "/communication/sse", label: "SSE (Server-Sent Events)" },
    ],
  },
  {
    label: "認証・セキュリティ",
    items: [
      { href: "/keys", label: "秘密鍵と公開鍵" },
      { href: "/communication/client-cert", label: "クライアント証明書 (端末の身分証)" },
      { href: "/business/sso", label: "SSO (シングルサインオン)" },
    ],
  },
  {
    label: "並行処理",
    items: [
      { href: "/threads", label: "スレッドとメモリの基礎" },
      { href: "/web-worker", label: "Web Worker" },
    ],
  },
  {
    label: "開発・インフラ",
    items: [
      { href: "/languages", label: "言語ごとの得意・不得意" },
      { href: "/database", label: "データベースの基本" },
      { href: "/docker", label: "Docker (イメージとコンテナ)" },
      { href: "/infra", label: "インフラの選び方 (実行環境と DB)" },
    ],
  },
  {
    label: "AWS",
    items: [
      { href: "/aws/overview", label: "全体像 (フロント/バック/インフラ)" },
      { href: "/aws/regions", label: "リージョン と データセンター" },
      { href: "/aws/setup", label: "アカウント準備" },
      { href: "/aws/vpc", label: "VPC と サブネット" },
      { href: "/aws/ec2", label: "EC2 を立てる" },
      { href: "/aws/rds", label: "RDS で DB を立てる" },
      { href: "/aws/alb", label: "ALB を立てる" },
      { href: "/aws/route53", label: "Route 53 で HTTPS 化" },
      { href: "/aws/s3", label: "S3 でファイルを置く" },
      { href: "/aws/cognito", label: "Cognito でログインを任せる" },
      { href: "/aws/direct-connect", label: "Direct Connect (オンプレ接続)" },
    ],
  },
  {
    label: "業務",
    items: [
      { href: "/business/hospital", label: "病院の組織と用語" },
      { href: "/business/fax", label: "ファックスの仕組み" },
    ],
  },
  {
    label: "リファレンス",
    items: [
      { href: "/glossary", label: "用語集 (IT・AI・セキュリティ)" },
      { href: "/reads", label: "読んだ日カレンダー" },
    ],
  },
];

/** 「読んだ」ボタンやカレンダーを出さないページ */
export const EXCLUDED_PATHS = new Set(["/", "/reads"]);

const labelByHref = new Map(
  navGroups.flatMap((g) => g.items.map((i) => [i.href, i.label] as const)),
);

/** サイドバーに載っていないパスはパス文字列をそのまま返す */
export function pageLabel(href: string): string {
  return labelByHref.get(href) ?? href;
}
