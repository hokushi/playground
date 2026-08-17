export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "並行処理",
    items: [
      { href: "/web-worker", label: "Web Worker" },
      { href: "/threads", label: "Threads & Memory" },
    ],
  },
  {
    label: "ネットワーク",
    items: [
      { href: "/network", label: "有線と無線" },
      { href: "/network/internet", label: "インターネットの裏側" },
      { href: "/network/layers", label: "ネットワークの 7 層 (OSI)" },
      { href: "/network/domain-url", label: "ドメイン と URL" },
      { href: "/network/vpn", label: "VPN の種類 (IP-VPN ほか)" },
    ],
  },
  {
    label: "ネットワーク構成",
    items: [
      { href: "/network/firewall", label: "ファイアウォール / FortiGate" },
    ],
  },
  {
    label: "Web 通信",
    items: [
      { href: "/communication/http", label: "HTTP / TLS / HTTPS" },
      { href: "/communication/sse", label: "SSE" },
    ],
  },
  {
    label: "業務",
    items: [
      { href: "/business/hospital", label: "病院の組織と用語" },
      { href: "/business/fax", label: "ファックス" },
    ],
  },
  {
    label: "バック・フロント",
    items: [
      { href: "/docker", label: "Docker でローカル DB" },
      { href: "/cors", label: "CORS はブラウザのルール" },
      { href: "/cookie", label: "Cookie と Domain" },
      { href: "/keys", label: "秘密鍵と公開鍵" },
    ],
  },
  {
    label: "用語集",
    items: [{ href: "/glossary", label: "IT・AI・セキュリティ" }],
  },
  {
    label: "AWS",
    items: [
      { href: "/aws/overview", label: "全体像 (フロント/バック/インフラ)" },
      { href: "/aws/regions", label: "リージョン と データセンター" },
      { href: "/aws/setup", label: "アカウント準備" },
      { href: "/aws/vpc", label: "VPC と サブネット" },
      { href: "/aws/ec2", label: "EC2 を立てる" },
      { href: "/aws/alb", label: "ALB を立てる" },
      { href: "/aws/route53", label: "Route 53 で HTTPS 化" },
      { href: "/aws/s3", label: "S3 でファイルを置く" },
      { href: "/aws/cognito", label: "Cognito でログインを任せる" },
    ],
  },
  {
    label: "記録",
    items: [{ href: "/reads", label: "読んだ日カレンダー" }],
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
