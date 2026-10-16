import { useEffect, useMemo, useState, type CSSProperties } from "react";
import logoUrl from "../logo.png";
import { contributors, editions, groupMeta, managementMeta, positionMeta, sponsors } from "./data";
import type { Contributor, GroupKey, Participation, PositionKey } from "./types";

type Tab = "overview" | "editions" | "sponsors" | "profile" | "settings";
type ImportKind = "staff" | "sponsor" | "challengeCounts";
type SortMode = "chronological" | "daily" | "random";

const importPrompts: Record<ImportKind, string> = {
  staff: `請將來源資料整理為 THJCC Credits 的 JSON。若有任一未知、非唯一或無法判斷的欄位，停止整批處理：不要輸出 JSON，只回傳「原始列、未解決欄位、需要管理員提供的值」。\n\n成功時僅輸出 JSON：\n{\n  "type": "staff",\n  "edition": "3rd Summer Edition",\n  "records": [{\n    "discordId": "...",\n    "displayNickname": "...",\n    "participations": [{ "group": "challenge", "position": "member" }],\n    "managementPosition": "general"\n  }]\n}\n\n不可輸出真名、學校、年級、經歷、email、備註或其他私人欄位。`,
  sponsor: `請將來源資料整理為 THJCC Credits 的 JSON。若有任一未知或不完整欄位，停止整批處理，不輸出 JSON，只回傳原始列、未解決欄位、需要管理員提供的值。\n\n成功時僅輸出：\n{\n  "type": "sponsor",\n  "edition": "3rd Summer Edition",\n  "records": [{ "name": "...", "logo": "...", "website": "https://..." }]\n}`,
  challengeCounts: `請依題單 CSV 結算單一屆的題目作者與驗題者數量。Discord ID 或暱稱無法唯一匹配時，停止整批處理：不輸出 JSON，只回傳原始列、未解決欄位、需要管理員提供的值；不得猜測候選人。\n\n成功時僅輸出：\n{\n  "type": "challengeCounts",\n  "edition": "3rd Summer Edition",\n  "records": [{ "discordId": "...", "authored": 0, "reviewed": 0 }]\n}\n此匯入必須覆蓋該屆舊有結算數量，不可累加。`,
};

function latestParticipation(contributor: Contributor): Participation {
  return [...contributor.participations].sort(
    (a, b) => editions.indexOf(a.edition) - editions.indexOf(b.edition),
  )[0];
}

function orderedParticipations(contributor: Contributor) {
  return [...contributor.participations].sort(
    (a, b) => editions.indexOf(a.edition) - editions.indexOf(b.edition),
  );
}

function initials(value: string) {
  return value
    .split(/[ _-]/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function labels(participation: Participation) {
  const result: string[] = [];
  if (participation.management) result.push(managementMeta[participation.management]);
  participation.groups
    .slice()
    .sort((a, b) => groupMeta[a.group].order - groupMeta[b.group].order)
    .forEach(({ group, position }) => result.push(`${groupMeta[group].short}・${positionMeta[position].label}`));
  return result;
}

function roleText(participation: Participation) {
  return labels(participation).join(" · ");
}

function contributorUrl(id: string) {
  return `${window.location.origin}${window.location.pathname}?contributor=${encodeURIComponent(id)}`;
}

function stableRank(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shuffledIds() {
  const ids = contributors.map((contributor) => contributor.id);
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[swap]] = [ids[swap], ids[index]];
  }
  return ids;
}

function Avatar({ contributor, size = "normal" }: { contributor: Contributor; size?: "normal" | "large" }) {
  return contributor.avatar ? (
    <img className={`avatar ${size}`} src={contributor.avatar} alt={`${contributor.nickname} 的頭像`} />
  ) : (
    <span className={`avatar ${size} generated`} aria-label={`${contributor.nickname} 的頭像`}>
      {initials(contributor.nickname)}
    </span>
  );
}

export default function App() {
  const initialContributor = new URLSearchParams(window.location.search).get("contributor");
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedId, setSelectedId] = useState<string | null>(initialContributor);
  const [query, setQuery] = useState("");
  const [editionFilter, setEditionFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("chronological");
  const [randomOrder, setRandomOrder] = useState<string[]>(() => shuffledIds());
  const [loginOpen, setLoginOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const selected = contributors.find((contributor) => contributor.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId && !selected) setSelectedId(null);
  }, [selectedId, selected]);

  const navigate = (next: Tab) => {
    setTab(next);
    setSelectedId(null);
    window.history.replaceState({}, "", window.location.pathname);
  };

  const openContributor = (id: string) => {
    setSelectedId(id);
    window.history.replaceState({}, "", `?contributor=${encodeURIComponent(id)}`);
  };

  const closeContributor = () => {
    setSelectedId(null);
    window.history.replaceState({}, "", window.location.pathname);
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContributor();
    };
    if (selectedId) window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedId]);

  const visibleContributors = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return [...contributors]
      .filter((contributor) => {
        if (normalizedQuery && !`${contributor.nickname} ${contributor.discordId}`.toLocaleLowerCase().includes(normalizedQuery)) return false;
        return contributor.participations.some((participation) => {
          const matchesEdition = editionFilter === "all" || participation.edition === editionFilter;
          const matchesGroup = groupFilter === "all" || participation.groups.some(({ group }) => group === groupFilter);
          const matchesPosition = positionFilter === "all"
            || (positionFilter === "general" && participation.management === "general")
            || (positionFilter === "deputyGeneral" && participation.management === "deputyGeneral")
            || participation.groups.some(({ position }) => position === positionFilter);
          return matchesEdition && matchesGroup && matchesPosition;
        });
      })
      .sort((a, b) => {
        if (sortMode === "daily") {
          const today = new Date().toISOString().slice(0, 10);
          return stableRank(`${today}:${a.id}`) - stableRank(`${today}:${b.id}`);
        }
        if (sortMode === "random") return randomOrder.indexOf(a.id) - randomOrder.indexOf(b.id);
        const editionDelta = editions.indexOf(latestParticipation(a).edition) - editions.indexOf(latestParticipation(b).edition);
        return editionDelta || a.nickname.localeCompare(b.nickname, "zh-Hant");
      });
  }, [query, editionFilter, groupFilter, positionFilter, randomOrder, sortMode]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate("overview")} aria-label="回到總覽">
          <img className="brand-logo" src={logoUrl} alt="THJCC" />
          <span><strong>THJCC</strong><small>Credits</small></span>
        </button>
        <nav aria-label="主要導覽">
          <button className={tab === "overview" ? "active" : ""} onClick={() => navigate("overview")}>總覽</button>
          <button className={tab === "editions" ? "active" : ""} onClick={() => navigate("editions")}>歷屆</button>
          <button className={tab === "sponsors" ? "active" : ""} onClick={() => navigate("sponsors")}>贊助商</button>
        </nav>
        <button className="login-button" onClick={() => setLoginOpen(true)}>登入 <span aria-hidden="true">↗</span></button>
      </header>

      <main>
        {tab === "overview" && (
          <Overview
            contributors={visibleContributors}
            query={query}
            onQuery={setQuery}
            editionFilter={editionFilter}
            onEditionFilter={setEditionFilter}
            groupFilter={groupFilter}
            onGroupFilter={setGroupFilter}
            positionFilter={positionFilter}
            onPositionFilter={setPositionFilter}
            sortMode={sortMode}
            onSortMode={setSortMode}
            onReshuffle={() => setRandomOrder(shuffledIds())}
            onOpen={openContributor}
          />
        )}
        {tab === "editions" && <Editions onOpen={openContributor} />}
        {tab === "sponsors" && <SponsorOverview />}
        {tab === "profile" && <Profile onBack={() => navigate("overview")} onNotice={setNotice} />}
        {tab === "settings" && <Settings onBack={() => navigate("overview")} onNotice={setNotice} />}
      </main>

      <footer>
        <span>THJCC Credits</span>
        <span>Community contribution record · 不做貢獻排名</span>
      </footer>

      {selected && <ContributorPanel contributor={selected} onClose={closeContributor} onNotice={setNotice} />}
      {loginOpen && <LoginDialog onClose={() => setLoginOpen(false)} onPreview={(next) => { setLoginOpen(false); navigate(next); }} />}
      {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}
    </div>
  );
}

function Overview({ contributors: cards, query, onQuery, editionFilter, onEditionFilter, groupFilter, onGroupFilter, positionFilter, onPositionFilter, sortMode, onSortMode, onReshuffle, onOpen }: {
  contributors: Contributor[]; query: string; onQuery: (value: string) => void; editionFilter: string; onEditionFilter: (value: string) => void; groupFilter: string; onGroupFilter: (value: string) => void; positionFilter: string; onPositionFilter: (value: string) => void; sortMode: SortMode; onSortMode: (value: SortMode) => void; onReshuffle: () => void; onOpen: (id: string) => void;
}) {
  return <>
    <section className="hero">
      <p className="eyebrow">THJCC CREDITS</p>
      <h1>THJCC Credits<br /><em>貢獻紀錄</em></h1>
      <span className="dev-note">開發樣本，非正式名單</span>
    </section>
    <section className="browse-section" aria-label="工作人員總覽">
      <div className="toolbar">
        <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="搜尋暱稱或 Discord ID" /></label>
        <div className="filters">
          <select value={editionFilter} onChange={(event) => onEditionFilter(event.target.value)} aria-label="依屆次篩選"><option value="all">所有屆次</option>{editions.map((edition) => <option key={edition}>{edition}</option>)}</select>
          <select value={groupFilter} onChange={(event) => onGroupFilter(event.target.value)} aria-label="依組別篩選"><option value="all">所有組別</option>{Object.entries(groupMeta).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select>
          <select value={positionFilter} onChange={(event) => onPositionFilter(event.target.value)} aria-label="依職位篩選"><option value="all">所有職位</option>{Object.entries(positionMeta).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select>
          <select value={sortMode} onChange={(event) => onSortMode(event.target.value as SortMode)} aria-label="排序方式"><option value="chronological">資料順序</option><option value="daily">每日輪替</option><option value="random">隨機排序</option></select>
          {sortMode === "random" && <button className="reshuffle" onClick={onReshuffle}>重新亂序</button>}
        </div>
      </div>
      <div className="result-line"><strong>{cards.length}</strong> 位工作人員 <span>{sortMode === "chronological" ? "依最近參與屆次排序" : sortMode === "daily" ? "每日固定輪替" : "目前隨機順序"}</span></div>
      <div className="contributor-grid">
        {cards.map((contributor) => <ContributorCard key={contributor.id} contributor={contributor} onOpen={onOpen} />)}
      </div>
      {!cards.length && <div className="empty-state">找不到符合條件的工作人員。試著清除篩選條件。</div>}
    </section>
  </>;
}

function ContributorCard({ contributor, onOpen }: { contributor: Contributor; onOpen: (id: string) => void }) {
  const recent = latestParticipation(contributor);
  const recentLabels = labels(recent);
  const leadGroup = recent.groups[0]?.group;
  const cardHue: Record<GroupKey, number> = { challenge: 19, review: 276, infrastructure: 205, administration: 48, design: 330 };
  const themeHue = leadGroup ? cardHue[leadGroup] : 228;
  const roleType = recent.management ? managementMeta[recent.management] : leadGroup ? groupMeta[leadGroup].label : "工作人員";
  return <button className="contributor-card" style={{ "--card-hue": themeHue } as CSSProperties} onClick={() => onOpen(contributor.id)} aria-label={`查看 ${contributor.nickname} 的參與紀錄`}>
    <div className="card-top"><span className="card-series">THJCC</span><span className="card-type">{roleType}</span></div>
    <div className="card-art"><Avatar contributor={contributor} /><span className="card-art-label">CONTRIBUTOR</span>{contributor.demo && <span className="demo-pill">樣本</span>}</div>
    <div className="card-ident"><strong>{contributor.nickname}</strong><span>◎</span></div>
    <p className="card-id">@{contributor.discordId}</p>
    <div className="card-meta"><span>{recent.edition}</span><div className="tag-row">{recentLabels.slice(0, 3).map((label) => <span className="tag" key={label}>{label}</span>)}{recentLabels.length > 3 && <span className="mobile-more">+{recentLabels.length - 3}</span>}</div></div>
    <div className="card-bottom"><span>THJCC CREDITS</span><span>{contributor.participations.length} EDITION{contributor.participations.length === 1 ? "" : "S"}</span></div>
  </button>;
}

function ContributorPanel({ contributor, onClose, onNotice }: { contributor: Contributor; onClose: () => void; onNotice: (value: string) => void }) {
  const history = orderedParticipations(contributor);
  const first = history[history.length - 1];
  const latest = history[0];
  const share = async () => {
    try {
      await navigator.clipboard.writeText(contributorUrl(contributor.id));
      onNotice("已複製此工作人員的分享連結");
    } catch { onNotice("無法自動複製，請從瀏覽器網址列取得連結"); }
  };
  return <div className="panel-layer" role="presentation"><aside className="contributor-panel" role="dialog" aria-modal="true" aria-label={`${contributor.nickname} 的參與紀錄`}>
    <div className="panel-actions"><button onClick={share}>分享</button><button className="close-button" onClick={onClose} aria-label="關閉">×</button></div>
    <div className="panel-heading"><Avatar contributor={contributor} size="large" /><div>{contributor.demo && <span className="demo-pill">開發樣本</span>}<h2>{contributor.nickname}</h2><p>@{contributor.discordId}</p></div></div>
    {contributor.bio && <p className="bio">{contributor.bio}</p>}
    {contributor.socialLinks?.length ? <div className="social-links">{contributor.socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div> : null}
    <dl className="summary"><div><dt>參與屆數</dt><dd>{history.length}</dd></div><div><dt>第一次參與</dt><dd>{first.edition}</dd></div><div><dt>最近一次</dt><dd>{latest.edition}</dd></div></dl>
    <section className="history"><p className="section-kicker">EDITION HISTORY</p>{history.map((participation) => <article className="history-entry" key={participation.edition}><div className="history-dot" /><div><h3>{participation.edition}</h3><p>{roleText(participation)}</p>{participation.counts && <div className="count-row">{participation.counts.authored !== undefined && <span>出題 {participation.counts.authored} 題</span>}{participation.counts.reviewed !== undefined && <span>驗題 {participation.counts.reviewed} 題</span>}</div>}</div></article>)}</section>
  </aside></div>;
}

function Editions({ onOpen }: { onOpen: (id: string) => void }) {
  const [edition, setEdition] = useState(editions[0]);
  const groups = Object.keys(groupMeta) as GroupKey[];
  const inEdition = contributors.filter((contributor) => contributor.participations.some((participation) => participation.edition === edition));
  const management = inEdition.filter((contributor) => contributor.participations.find((participation) => participation.edition === edition)?.management);
  return <section className="page-section">
    <p className="eyebrow">EDITION CREDITS</p><h1 className="page-title">歷屆工作人員</h1>
    <div className="edition-switcher">{editions.map((item) => <button key={item} className={edition === item ? "active" : ""} onClick={() => setEdition(item)}>{item}</button>)}</div>
    <p className="edition-description">{edition} 的工作人員與贊助紀錄。相同工作人員會出現在每個所屬組別。</p>
    {!!management.length && <EditionGroup title="籌備總覽" subtitle="總召與副召" contributors={management} edition={edition} onOpen={onOpen} management />}
    {groups.map((group) => {
      const entries = inEdition.filter((contributor) => contributor.participations.find((participation) => participation.edition === edition)?.groups.some((entry) => entry.group === group));
      return entries.length ? <EditionGroup key={group} title={groupMeta[group].label} contributors={entries} edition={edition} onOpen={onOpen} group={group} /> : null;
    })}
    <EditionSponsors edition={edition} />
  </section>;
}

function EditionGroup({ title, subtitle, contributors: cards, edition, onOpen, group, management }: { title: string; subtitle?: string; contributors: Contributor[]; edition: string; onOpen: (id: string) => void; group?: GroupKey; management?: boolean }) {
  const ordered = [...cards].sort((a, b) => {
    const aRecord = a.participations.find((item) => item.edition === edition)!;
    const bRecord = b.participations.find((item) => item.edition === edition)!;
    const aRank = management ? (aRecord.management === "general" ? 1 : 2) : positionMeta[aRecord.groups.find((entry) => entry.group === group)!.position].order;
    const bRank = management ? (bRecord.management === "general" ? 1 : 2) : positionMeta[bRecord.groups.find((entry) => entry.group === group)!.position].order;
    return aRank - bRank || a.nickname.localeCompare(b.nickname, "zh-Hant");
  });
  return <section className="edition-group"><div className="group-heading"><div><p className="section-kicker">{subtitle || "STAFF"}</p><h2>{title}</h2></div><span>{ordered.length} 人</span></div><div className="contributor-grid compact">{ordered.map((contributor) => <ContributorCard key={`${edition}-${title}-${contributor.id}`} contributor={contributor} onOpen={onOpen} />)}</div></section>;
}

function EditionSponsors({ edition }: { edition: string }) {
  const entries = sponsors.filter((sponsor) => sponsor.editions.includes(edition));
  return <section className="edition-group"><div className="group-heading"><div><p className="section-kicker">SPONSORS</p><h2>贊助商</h2></div></div>{entries.length ? <div className="sponsor-grid">{entries.map((sponsor) => <SponsorCard key={sponsor.id} sponsor={sponsor} />)}</div> : <p className="muted">尚未匯入贊助商資料。</p>}</section>;
}

function SponsorOverview() { return <section className="page-section"><p className="eyebrow">TOTAL SPONSORS</p><h1 className="page-title">感謝每一份支持。</h1><p className="edition-description">贊助關係會保留在各個活動屆次，不混入工作人員紀錄。</p><div className="sponsor-grid wide">{sponsors.map((sponsor) => <SponsorCard key={sponsor.id} sponsor={sponsor} />)}</div></section>; }

function SponsorCard({ sponsor }: { sponsor: typeof sponsors[number] }) { return <article className="sponsor-card"><span className="sponsor-logo">{sponsor.logoText}</span><div><div className="sponsor-heading"><h2>{sponsor.name}</h2>{sponsor.demo && <span className="demo-pill">樣本</span>}</div><p>{sponsor.editions.join(" · ")}</p>{sponsor.website && <a href={sponsor.website} target="_blank" rel="noreferrer">官方網站 ↗</a>}</div></article>; }

function LoginDialog({ onClose, onPreview }: { onClose: () => void; onPreview: (tab: "profile" | "settings") => void }) { return <div className="dialog-layer"><section className="login-dialog" role="dialog" aria-modal="true" aria-label="登入"><button className="close-button" onClick={onClose} aria-label="關閉">×</button><p className="eyebrow">IDENTITY</p><h2>登入功能準備中</h2><p>正式版會要求綁定 Discord 與 Google，並以 Google Groups 檢查目前是否具管理員權限。PGID 僅作為 SSO 流程實作參考，尚未決定是否串接。</p><div className="auth-status"><span>○</span><div><strong>登入方式尚未設定</strong><small>完成身份服務與權限後才會開放正式登入。</small></div></div><button className="disabled-login" disabled>登入功能尚未開放</button><div className="preview-links"><p>開發介面預覽</p><button onClick={() => onPreview("profile")}>我的資料</button><button onClick={() => onPreview("settings")}>管理設定</button></div></section></div>; }

function Profile({ onBack, onNotice }: { onBack: () => void; onNotice: (value: string) => void }) { const [nickname, setNickname] = useState("PGpenguin72"); const [bio, setBio] = useState("一隻企鵝，想要在資訊界上出一份力。"); return <section className="private-page"><button className="back" onClick={onBack}>← 回到公開 Credits</button><p className="eyebrow">MY PROFILE · PREVIEW</p><h1 className="page-title">我的資料</h1><p className="edition-description">此頁為登入服務啟用前的介面預覽。正式版僅允許已綁定 Discord 與 Google 的使用者修改自己的公開基本資料。</p><form className="profile-form" onSubmit={(event) => { event.preventDefault(); onNotice("開發預覽：正式串接後才會儲存公開基本資料"); }}><label>顯示暱稱<input value={nickname} onChange={(event) => setNickname(event.target.value)} /></label><label>自我介紹<textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} /></label><label>社群連結<input placeholder="https://" /></label><button className="primary">儲存公開基本資料</button></form><div className="request-note"><strong>需要更正組別、職位、歷屆紀錄或題數？</strong><p>正式版將在此提交申請，需由管理員審核後才公開。</p></div></section>; }

function ContributorManagement({ onNotice }: { onNotice: (value: string) => void }) {
  const [records, setRecords] = useState(contributors);
  const [selectedId, setSelectedId] = useState(records[0].id);
  const [edition, setEdition] = useState(editions[0]);
  const [group, setGroup] = useState<GroupKey>("challenge");
  const [position, setPosition] = useState<"leader" | "deputy" | "member">("member");
  const [management, setManagement] = useState<"" | "general" | "deputyGeneral">("");
  const selected = records.find((record) => record.id === selectedId)!;
  const updateSelected = (updater: (contributor: Contributor) => Contributor) => setRecords((current) => current.map((record) => record.id === selectedId ? updater(record) : record));
  const addParticipation = () => updateSelected((record) => ({ ...record, participations: [{ edition, management: management || undefined, groups: [{ group, position }] }, ...record.participations] }));
  const removeParticipation = (index: number) => updateSelected((record) => ({ ...record, participations: record.participations.filter((_, entryIndex) => entryIndex !== index) }));
  return <section className="management-card">
    <div className="management-heading"><div><p className="section-kicker">CONTRIBUTION MANAGEMENT</p><h2>管理工作人員貢獻紀錄</h2></div><span>開發預覽</span></div>
    <p className="field-help">可選取任何工作人員，新增、移除或調整其屆次、組別、職位與總召／副召身分。Discord、Google 綁定與內部 ID 不在此修改。</p>
    <div className="manage-layout">
      <div className="record-list">{records.map((record) => <button key={record.id} className={record.id === selectedId ? "active" : ""} onClick={() => setSelectedId(record.id)}><Avatar contributor={record} /><span><strong>{record.nickname}</strong><small>@{record.discordId}</small></span><em>{record.participations.length} 屆</em></button>)}</div>
      <div className="record-editor">
        <div className="editor-person"><Avatar contributor={selected} size="large" /><div><h3>{selected.nickname}</h3><p>@{selected.discordId}</p><code>{selected.id}</code></div></div>
        <div className="record-history"><h4>現有貢獻紀錄</h4>{selected.participations.map((participation, index) => <div className="editable-record" key={index}><div><strong>{participation.edition}</strong><span>{roleText(participation)}</span></div><button onClick={() => removeParticipation(index)}>移除</button></div>)}</div>
        <div className="add-record"><h4>新增貢獻紀錄</h4><div className="record-fields"><label>屆次<select value={edition} onChange={(event) => setEdition(event.target.value)}>{editions.map((item) => <option key={item}>{item}</option>)}</select></label><label>組別<select value={group} onChange={(event) => setGroup(event.target.value as GroupKey)}>{Object.entries(groupMeta).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label><label>職位<select value={position} onChange={(event) => setPosition(event.target.value as "leader" | "deputy" | "member")}>{(["leader", "deputy", "member"] as const).map((key) => <option key={key} value={key}>{positionMeta[key].label}</option>)}</select></label><label>籌備身分<select value={management} onChange={(event) => setManagement(event.target.value as "" | "general" | "deputyGeneral")}><option value="">無</option><option value="general">總召</option><option value="deputyGeneral">副召</option></select></label></div><button className="secondary" onClick={addParticipation}>加入此筆紀錄</button></div>
        <button className="primary save-record" onClick={() => onNotice("開發預覽：正式版會立即公開更新並寫入管理員稽核紀錄")}>儲存此工作人員的變更</button>
      </div>
    </div>
  </section>;
}

function Settings({ onBack, onNotice }: { onBack: () => void; onNotice: (value: string) => void }) { const [kind, setKind] = useState<ImportKind>("staff"); const [edition, setEdition] = useState("3rd Summer Edition"); const [json, setJson] = useState(""); const [preview, setPreview] = useState<{ ok: boolean; message: string; count?: number } | null>(null); const [copied, setCopied] = useState(false);
  const validate = () => { try { const parsed = JSON.parse(json); if (!parsed || parsed.type !== kind || typeof parsed.edition !== "string" || !Array.isArray(parsed.records)) throw new Error("頂層必須包含符合目前類型的 type、edition、records。"); if (parsed.edition !== edition) throw new Error("JSON 的 edition 必須和上方指定屆次相同。"); for (const [index, record] of parsed.records.entries()) { if (kind === "staff" && (!record.discordId || !record.displayNickname || !Array.isArray(record.participations) || !record.participations.length)) throw new Error(`第 ${index + 1} 筆 Staff 缺少 discordId、displayNickname 或 participations。`); if (kind === "sponsor" && (!record.name || !record.logo)) throw new Error(`第 ${index + 1} 筆 Sponsor 缺少 name 或 logo。`); if (kind === "challengeCounts" && (!record.discordId || (!Number.isFinite(record.authored) && !Number.isFinite(record.reviewed)))) throw new Error(`第 ${index + 1} 筆題數資料無效。`); } setPreview({ ok: true, message: "格式有效。確認後才會寫入資料。", count: parsed.records.length }); } catch (error) { setPreview({ ok: false, message: error instanceof Error ? error.message : "JSON 無法解析。" }); } };
  const copyPrompt = async () => { try { await navigator.clipboard.writeText(importPrompts[kind]); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { onNotice("無法自動複製，請手動選取提示詞"); } };
  return <section className="private-page settings"><button className="back" onClick={onBack}>← 回到公開 Credits</button><p className="eyebrow">ADMIN SETTINGS · PREVIEW</p><h1 className="page-title">管理設定</h1><p className="edition-description">此頁為管理流程介面。實際寫入、稽核與 Google Groups 手動同步需要後端啟用。</p><ContributorManagement onNotice={onNotice} /><div className="settings-grid"><section className="import-card"><h2>AI JSON 匯入</h2><div className="segmented">{(["staff", "sponsor", "challengeCounts"] as ImportKind[]).map((item) => <button key={item} className={kind === item ? "active" : ""} onClick={() => { setKind(item); setJson(""); setPreview(null); }}>{item === "staff" ? "工作人員" : item === "sponsor" ? "贊助商" : "題數結算"}</button>)}</div><label>目標屆次<input value={edition} onChange={(event) => setEdition(event.target.value)} placeholder="例如：0th Summer Edition" /></label><p className="field-help">不存在的名稱會在確認匯入時建立為新屆次。</p><div className="prompt-box"><div><strong>給外部 AI 的提示詞</strong><button onClick={copyPrompt}>{copied ? "已複製" : "複製"}</button></div><pre>{importPrompts[kind]}</pre></div><label>貼入 AI 整理後的 JSON<textarea value={json} onChange={(event) => setJson(event.target.value)} placeholder='{ "type": "staff", "edition": "3rd Summer Edition", "records": [] }' rows={10} spellCheck="false" /></label><button className="primary" type="button" onClick={validate}>檢查並預覽</button>{preview && <div className={`validation ${preview.ok ? "valid" : "invalid"}`}><strong>{preview.ok ? "可以進入確認" : "無法匯入"}</strong><p>{preview.message}{preview.count !== undefined ? ` 共 ${preview.count} 筆。` : ""}</p>{preview.ok && <button onClick={() => onNotice("開發預覽：正式版將在這一步寫入資料並留下管理員稽核紀錄")}>確認匯入（預覽）</button>}</div>}</section><aside className="admin-card"><h2>管理員權限</h2><p>權限群組</p><code>thjcc-admin@gm.scint.org</code><p className="field-help">Google Groups 只判斷目前是否為管理員，不提供歷屆工作人員名單。</p><button className="secondary" onClick={() => onNotice("開發預覽：同步完成後會顯示時間、結果與稽核紀錄")}>手動同步權限（預覽）</button><hr /><h2>可直接管理</h2><ul><li>任一工作人員的公開資料</li><li>歷屆參與與組別紀錄</li><li>贊助商與屆次關係</li></ul><p className="field-help">Discord / Google 綁定與內部 ID 必須走帳號復原流程，不能直接修改。</p></aside></div></section>; }
