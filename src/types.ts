export type GroupKey = "challenge" | "review" | "infrastructure" | "administration" | "design";
export type GroupPositionKey = "leader" | "deputy" | "member";
export type PositionKey = "general" | "deputyGeneral" | GroupPositionKey;

export type Participation = {
  edition: string;
  groups: Array<{ group: GroupKey; position: GroupPositionKey }>;
  management?: "general" | "deputyGeneral";
  counts?: { authored?: number; reviewed?: number };
};

export type Contributor = {
  id: string;
  nickname: string;
  discordId: string;
  avatar?: string;
  bio?: string;
  socialLinks?: Array<{ label: string; href: string }>;
  participations: Participation[];
  demo?: boolean;
};

export type Sponsor = {
  id: string;
  name: string;
  logoText: string;
  website?: string;
  editions: string[];
  demo?: boolean;
};
