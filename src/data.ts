import type { Contributor, GroupKey, PositionKey, Sponsor } from "./types";

export const editions = ["3rd Summer Edition", "2nd Winter Edition", "2nd Summer Edition"];

export const groupMeta: Record<GroupKey, { label: string; short: string; order: number }> = {
  challenge: { label: "出題組", short: "出題", order: 1 },
  review: { label: "驗題組", short: "驗題", order: 2 },
  infrastructure: { label: "網管組", short: "網管", order: 3 },
  administration: { label: "文書組", short: "文書", order: 4 },
  design: { label: "美宣組", short: "美宣", order: 5 },
};

export const positionMeta: Record<PositionKey, { label: string; order: number }> = {
  general: { label: "總召", order: 1 },
  deputyGeneral: { label: "副召", order: 2 },
  leader: { label: "組長", order: 3 },
  deputy: { label: "副組長", order: 4 },
  member: { label: "組員", order: 5 },
};

export const managementMeta = {
  general: positionMeta.general.label,
  deputyGeneral: positionMeta.deputyGeneral.label,
};

// 開發樣本：正式匯入前不將任何未經確認的真實工作人員公開。
export const contributors: Contributor[] = [
  {
    id: "thjcc_c_pg72_demo",
    nickname: "PGpenguin72",
    discordId: "pg_penguin_72",
    participations: [
      {
        edition: "3rd Summer Edition",
        management: "general",
        groups: [{ group: "challenge", position: "member" }],
      },
    ],
  },
  {
    id: "thjcc_c_demo_review",
    nickname: "Review Demo",
    discordId: "review_demo",
    bio: "開發介面樣本；正式資料會由管理員匯入。",
    participations: [
      {
        edition: "3rd Summer Edition",
        groups: [{ group: "review", position: "leader" }],
        counts: { reviewed: 4 },
      },
      {
        edition: "2nd Winter Edition",
        groups: [{ group: "review", position: "member" }],
      },
    ],
    demo: true,
  },
  {
    id: "thjcc_c_demo_infra",
    nickname: "Infra Demo",
    discordId: "infra_demo",
    bio: "開發介面樣本；正式資料會由管理員匯入。",
    participations: [
      {
        edition: "3rd Summer Edition",
        groups: [{ group: "infrastructure", position: "leader" }],
      },
      {
        edition: "2nd Summer Edition",
        groups: [{ group: "infrastructure", position: "member" }],
      },
    ],
    demo: true,
  },
  {
    id: "thjcc_c_demo_design",
    nickname: "Design Demo",
    discordId: "design_demo",
    bio: "開發介面樣本；正式資料會由管理員匯入。",
    participations: [
      {
        edition: "3rd Summer Edition",
        groups: [{ group: "design", position: "deputy" }],
      },
      {
        edition: "2nd Winter Edition",
        groups: [{ group: "administration", position: "member" }],
      },
    ],
    demo: true,
  },
];

export const sponsors: Sponsor[] = [
  {
    id: "sponsor_demo",
    name: "贊助商樣本",
    logoText: "S",
    editions: ["3rd Summer Edition"],
    demo: true,
  },
];
