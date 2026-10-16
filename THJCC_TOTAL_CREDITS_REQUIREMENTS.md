# THJCC Total Credits Requirements Log

## Document Status

- Status: Implementation in progress
- Last Updated: 2026-08-28
- Interview Round: 29
- Last Confirmed By User: User confirmed Requirement Understanding
- Current Confidence: High — discovery is confirmed; implementation is in progress.

## Project Goal

- Tentative: Create a THJCC website that preserves and presents historical staff and community contribution records across event editions.
- Confirmed from initial brief: The intended framing is a community contribution record, not a plain administrative staff list.

## Target Audience

- Confirmed: The primary audience combines current/former contributors who need to verify or share their record, and the general THJCC community/participants who want to know the people behind each edition.

## Core Concepts

- Confirmed from initial brief: Two primary views are needed: per-edition Credits and cross-edition Total Credits.
- Confirmed from initial brief: Per-edition Credits answers, “Who was involved in this edition, and what did they do?”
- Confirmed from initial brief: Total Credits answers, “What is this person's full THJCC participation history?”
- Confirmed: Only staff and sponsors are within the Credits scope; Guest, Advisor, and Speaker are excluded.
- Confirmed: Challenge, Review, Infrastructure/Network, Administration/Documentation, and Visual Design are Groups, not functional Roles. General Coordinator and Deputy General Coordinator are special all-event management positions.
- Confirmed: Within a Group, people are ordered by leadership position: Team Leader > Deputy Team Leader > Member.
- Confirmed: When a Staff CSV row has no ordinary Group leadership position, default it to Member.
- Confirmed: Staff CSV Position vocabulary is: `!總召` (General Coordinator), `!副召` (Deputy General Coordinator), `組長` (Team Leader), `副組長` (Deputy Team Leader), and blank (Member).
- Confirmed: A contributor may belong to multiple Groups in the same edition. Their card appears in every applicable Group and retains all relevant labels.
- Confirmed: General Coordinator and Deputy General Coordinator are special all-event management positions, displayed before the ordinary Groups; they do not use the Team Leader > Deputy Team Leader > Member order.
- Confirmed: If a General Coordinator or Deputy General Coordinator also belongs to an ordinary Group, they appear in both the special management area and every applicable Group.
- Confirmed: The first received Staff row maps to special management position General Coordinator plus Challenge Group membership as Member. The raw row's personal details are intentionally not copied into this requirements log.
- Unconfirmed: Exact record structure for General Coordinator/Deputy General Coordinator and the complete relationship of Contributor, Edition, Group, leadership position, Contribution, and Sponsor.

## Information Architecture

- Tentative: Separate edition-centric and person-centric paths, with contributor details reachable from Total Credits and potentially from edition pages.
- Confirmed: Total Credits has a separate Sponsors section or tab alongside the people-first contributor index.
- Confirmed: Credits is an independent website rather than a visually integrated THJCC main-site section. Its visual system remains consistent across editions; edition-specific content changes but edition-specific themes do not.
- Confirmed: Total Credits Sponsors overview has one card per sponsor, with logo, formal name, and the editions sponsored. Each per-edition Credits page also includes sponsor cards for that edition.
- Confirmed: Sponsor cards may link to an administrator-provided official website.
- Confirmed: The public website defaults to the people-first Total Credits card index, with navigation to Editions and Sponsors.
- Confirmed: Credits lives under a path on the THJCC main site, while preserving its independent visual system.

## Pages

- Confirmed from initial brief: An individual Credits page for each edition (for example, 2026 Summer, 2026 Winter, 2025 Summer).
- Confirmed: Total Credits should be people-first: visitors initially browse contributor cards and then open a person's history.
- Tentative: A dedicated contributor history/detail page.
- Confirmed: Public Header provides Login. After login, contributors access a separate “My Profile” area; administrators additionally access separate “Admin Settings.”
- Confirmed: Public Header labels are `總覽`, `歷屆`, `贊助商`, and `登入`.
- Unconfirmed: Whether all tentative pages are required and which other historical or index pages exist.

## Contributor Model

- Confirmed: Total Credits cards show the contributor's most recent edition and all of their Group/leadership-position labels from that edition.
- Confirmed: Contributor identity is centered on a Discord username/ID; use the contributor's nickname or usual ID as the primary public display, with real name optional.
- Confirmed: Contributors can use Discord login and Google login.
- Confirmed: A contributor can self-edit basic profile information after login.
- Confirmed: A contributor can submit missing-record additions; designated administrators approve before the additions become public.
- Confirmed: Contributors may immediately edit avatar, display nickname, bio, and social links. Changes to Group, leadership position, historic record, and challenge-work counts require an approved request.
- Confirmed: Contributors submit proposed Group/leadership-record additions or corrections after login; designated administrators approve before public display.
- Confirmed: A contributor's Discord avatar is imported as the initial avatar; they may replace it with a custom avatar. The fallback is initials from their display nickname.
- Confirmed: Contributor avatars are public.
- Confirmed: Every contributor must bind both Discord and Google identities. After binding, the system creates a stable internal contributor ID; this supports a future SSO direction.
- Confirmed: SSO must be established from the beginning as a central THJCC identity service for Credits and future services, including a worker login-record service.
- Tentative: A contributor may have an avatar, display name, Discord username/ID, optional real name, one or more Groups, a leadership position, and contribution counts.
- Unconfirmed: Current/former status and how sponsor records differ from contributor profiles.

## Edition Model

- Confirmed from initial brief: Editions include season/year identifiers such as 2026 Summer, 2026 Winter, and 2025 Summer.
- Confirmed: Group names are expected to remain stable across editions; historic-group renaming or standardization is not required.
- Superseded: The earlier `Year + Summer/Winter` naming convention has been replaced by the user.
- Confirmed: Official edition names use the `0th XXX Edition.` pattern (for example, `3rd Summer Edition`). Edition navigation remains newest first.
- Confirmed: The current initial-import scope is only `3rd Summer Edition`; other edition source data is out of scope for this import.
- Confirmed: Every Staff/Sponsor/challenge-count import JSON targets exactly one Edition. Administrators may manually enter that Edition name (for example, `0th Summer Edition`) in the import workflow.
- Confirmed: On administrator confirmation, manually entered Edition names that do not already exist create the new Edition automatically.

## Role / Team / Contribution Model

- Superseded: The earlier Role-first model was corrected by the user: Challenge, Review, Infrastructure/Network, Administration/Documentation, and Visual Design are Groups.
- Confirmed: Group is the primary per-edition grouping and display concept. A special General Coordinator/Deputy General Coordinator area appears first, followed by Groups in this order: Challenge > Review > Infrastructure/Network > Administration/Documentation > Visual Design.
- Confirmed: Within each Group, people are ordered by leadership position: Team Leader > Deputy Team Leader > Member.
- Confirmed: Where applicable, a contribution record may include quantitative work counts (for example, number of challenges authored or reviewed).
- Confirmed: Challenge work is publicly represented by counts only (for example, number authored or reviewed); named individual challenges/works are not shown.
- Superseded: The earlier assumption that challenge author/reviewer counts come from a later manual submission/request flow was corrected by the user.
- Superseded: Challenge author/reviewer counts do not come from a manual submission/request flow. Their source is a separate Google Spreadsheet (“題單”) that records each challenge's author and reviewer.
- Confirmed: Challenge author/reviewer data is imported at settlement time from a CSV export of the challenge sheet.
- Confirmed: Challenge-sheet CSV may use either Discord ID or Discord nickname for author/reviewer matching. When the AI cannot uniquely match a value, it must stop the entire batch and ask the administrator.
- Confirmed: For CSV import, multiple rows with the same Discord ID are merged into one contributor record retaining multiple Group/position memberships.
- Superseded: The earlier rule to combine multiple functional roles into one card was based on labels now clarified as Groups; multi-Group membership needs a new decision.
- Confirmed: General Coordinator, Deputy General Coordinator, Team Leader, Deputy Team Leader, and Member concepts must be representable.
- Confirmed: General Coordinator and Deputy General Coordinator are special all-event management positions displayed before ordinary Groups; ordinary Group leadership order does not apply to them.
- Unconfirmed: Exact record structure for these special positions and the complete leadership-position vocabulary.

## UI Direction

- Confirmed: Per-edition Credits use an avatar/contributor card grid grouped directly by Group, then ordered by leadership position.
- Confirmed from initial brief: Desired references combine SITCON Credits (edition/community relationship), Nano Collective Contributors (community-like cards, avatars, tags), and WordCamp Organizers (separate multiple teams and roles).
- Confirmed: Credits is visually independent from the THJCC main site and keeps one consistent visual system across all editions; only content changes between editions.
- Confirmed: Dark theme is the default. Motion is low-key (for example, card/detail and filter transitions) and respects reduced-motion preferences.
- Confirmed: On first visit, follow system theme; if system preference is unavailable, use dark theme.
- Confirmed: Visual personality is clean, technical, and community-oriented; dark mode must not become an excessive hacker/terminal aesthetic.

## Interaction

- Confirmed: Selecting a contributor opens or reveals their history in the Total Credits interface; it is not a separate profile page.
- Confirmed: A shareable deep link opens the relevant contributor card/detail state; the viewer can close it and return to the main Total Credits index.
- Confirmed: Contributor detail opened from a card or share link shows an initial participation summary (edition count, first participation, latest participation), followed by complete newest-first history with Groups, leadership positions, and applicable challenge-work counts.
- Confirmed: Contributor detail will be either a shareable right-side panel or a shareable centered modal, preserving the underlying Total Credits index on close. The final choice is deferred pending a limited comparison demo.
- Confirmed: User explicitly authorized a subagent to create the limited comparison demo during discovery. This exception is only for selecting panel versus modal; it is not authorization for production implementation.
- Confirmed: Desktop contributor detail opens in a shareable right-side panel.
- Confirmed: Contributor cards do not display current/former status; history and most-recent Edition are sufficient.

## Search / Filter

- Confirmed: Total Credits supports text search by nickname and Discord ID, plus filters by edition, Group, and leadership position.
- Confirmed: Total Credits cards default to newest participation first; this is a chronological discovery order, not a contribution ranking.
- Confirmed: When recent participation ties, cards sort by Discord nickname.

## Mobile Behavior

- Confirmed: On mobile, cards show the first recent-edition Group/position label plus a `+N` indicator; opening the card detail reveals all labels.
- Confirmed: On mobile, contributor detail opens as a bottom sheet.
- Unconfirmed: Device priority and other mobile card/detail tradeoffs.

## Data Maintenance

- Confirmed: Website source code is public. Community members may submit Issues and pull requests; authorized maintainers review and merge changes.
- Confirmed: Website/code contributors receive recognition through the Git platform only, not within the public Credits website.
- Confirmed: Initial launch may import currently verified historical data. Missing records can be added later by contributor request and administrator approval.
- Confirmed: The future administrator Settings interface provides a Prompt that an administrator copies to an external AI. The administrator supplies a spreadsheet/CSV source; the AI organizes it as JSON, which is pasted back into Settings.
- Confirmed: Settings previews AI-generated JSON in a readable form before import. An administrator must explicitly confirm import before data is written.
- Confirmed: Imported approved records do not show a public verification/status marker.
- Confirmed: Initial CSV headers include Group, Position, Real Name, Nickname, Discord ID, Email, School, Grade, Organizing Experience, Information Experience, Cybersecurity Experience, Specialties, Self Introduction, and Notes. The meaning of the first listed column is unconfirmed.
- Confirmed: Treat the first CSV column as blank/ignored.
- Confirmed: From the CSV, only Group, Position, and Discord ID/Nickname may be publicly displayed. All other supplied CSV fields must not be public.
- Confirmed: AI JSON excludes real name, school, grade, experience, specialties, self introduction, and notes from the initial CSV import. Email is imported only for dual-account binding, recovery, and administrator contact; it is never public.
- Confirmed: When the AI encounters an unexpected or unresolved value (including an unknown Group), it must stop and ask the administrator; it must not infer a value or continue the import action.
- Confirmed: Correction workflow is contributor request → administrator approval → public update; the change history is retained for administrators only.
- Confirmed: Initial Staff import requires Discord name/ID and at least one participation record; Email may be absent and is later acquired through required Google binding.
- Confirmed: Contributor-supplied optional profile information is public in expanded card detail.
- Confirmed: Public contributor detail fields are avatar, display nickname, self introduction, and social links. Real name is not public.
- Confirmed: Original CSV source files remain private. Administrators send CSV to external AI, then publish the sanitized, organized JSON output. Public JSON must obey the field-visibility policy and omit email and all excluded personal data.
- Confirmed: Staff/Sponsor imports use one JSON type; challenge-sheet settlement updates use a distinct contribution-count JSON type.
- Confirmed: If any source record is unknown, non-unique, or otherwise unresolved, the external AI outputs no JSON for the entire batch and instead asks the administrator focused questions.
- Confirmed: When AI stops an import batch, it returns only a focused question list containing the original row, the unresolved field, and the administrator input needed; it does not propose candidates or output JSON.
- Confirmed: Every AI JSON includes `type`, `edition`, and `records` fields.
- Confirmed: Before copying the AI prompt, an administrator selects the import type and directly enters the target Edition. This target is the authoritative public Edition name and overrides `type`/`edition` contained in pasted JSON during validation and import.
- Confirmed: The AI import prompt must directly map the known Staff CSV values without asking: 出題組→`challenge`, 驗題組→`review`, 網管組→`infrastructure`, 文書組→`administration`, 美宣組→`design`; !總召/總召→`management: general`, !副召/副召→`management: deputyGeneral`, 組長→`leader`, 副組長→`deputy`, and blank Position→`member`.
- Confirmed: Repeated Staff CSV rows for one Discord ID are combined into one contributor record with all applicable Group assignments.
- Confirmed: Staff and Sponsor JSON imports add or update only records included in the JSON; records not included remain unchanged.
- Confirmed: Challenge-count settlement JSON recalculates and replaces author/reviewer counts for its Edition rather than cumulatively adding to them.
- Confirmed: Removing an erroneous Sponsor assignment removes only its Edition relationship. If no Edition relationships remain, the Sponsor disappears from Total Sponsors; administrator audit history remains.
- Confirmed: Each Staff record requires Discord ID, display nickname, and at least one participation object containing Group and position. Special management position is optional; Email may be absent until Google binding.
- Confirmed: Each Sponsor record requires formal name and Logo; official website link is optional.
- Unconfirmed: Exact final JSON key spelling/nesting and non-functional validation messages are implementation details to confirm only when implementation is authorized.

## Permissions and Editing Workflow

- Confirmed: Discord/Google accounts are bound identities. Google Groups membership manages current administrator permission only; its membership changes do not need historic recording and do not determine public Credits Group records.
- Confirmed: One Google Group, `thjcc-admin@gm.scint.org`, grants the full Credits Administrator permission set: approval, JSON import confirmation, and Group ordering.
- Confirmed: Credits Administrators may manually modify any contributor's record; this is not limited to their own profile.
- Confirmed: Administrator manual edits update public data immediately and automatically write an administrator-only audit record.
- Confirmed: Administrators cannot directly edit Discord binding, Google binding, or internal Contributor ID; changes must use the account recovery/rebinding flow.
- Confirmed: For an erroneous contributor-Edition or contributor-Group assignment, administrators remove only that participation record while retaining the contributor account and audit history.
- Confirmed: Google Groups is used only to check administrator permission. It never supplies Credits Group rosters or historical participation data.
- Confirmed: Ordinary Group leadership positions are supplied through JSON import data, not Google Groups.
- Confirmed: Administrator permission is refreshed only when an administrator manually triggers synchronization.
- Confirmed: Manual administrator-permission synchronization displays last-sync time and result, and writes an administrator-only audit event.
- Tentative: The user identified `~/sso.pg72.tw` as a future SSO reference project. It must not be inspected or implemented during discovery unless the user explicitly moves to a later phase.
- Confirmed: If a contributor loses an account, they request recovery through `admin@thjcc.org` or a Discord ticket; administrators perform the recovery/rebinding process.
- Confirmed: Any Credits Administrator may complete account recovery/rebinding and must leave an administrator-only audit record.
- Unconfirmed: Detailed future SSO behavior beyond Credits/worker login-record service is out of scope for this discovery.

## Confirmed Requirements

- Maintain this file as the ongoing requirements memory throughout discovery.
- Do not begin implementation, generate UI, choose a technology stack, produce a mockup, or create a full wireframe before explicit approval.
- Per-edition Credits are edition-centric; Total Credits is person-centric.
- Total Credits starts from a people-first contributor-card index.
- Per-edition Credits are grouped by Group, then ordered by leadership position.
- Group membership is the main per-edition work descriptor; contribution records may include authored/reviewed challenge counts where applicable.
- A contributor appearing in multiple Groups in an edition is shown in every applicable Group, with all applicable labels visible.
- General Coordinator and Deputy General Coordinator are special all-event management positions shown before ordinary Groups.
- A General Coordinator/Deputy General Coordinator who also belongs to an ordinary Group appears in both places.
- Challenge work shows numeric counts only; challenge titles are not public Credits data.
- Credits include only staff and sponsors; their display must be clearly distinguished.
- Total Credits includes a separate Sponsors section or tab.
- Contributor public identity uses nickname/usual ID first; real name is optional.
- Discord and Google login are required authentication options; Google Groups is intended to manage permissions.
- Contributors may self-edit basic data and submit missing-record requests, subject to designated-administrator approval.
- Google Groups membership manages current administrator permissions only; it is not historic Credits data and does not set public Group membership.
- Group names are stable across editions.
- General Coordinator, Deputy General Coordinator, Team Leader, Deputy Team Leader, and Member concepts must be representable.
- Contributors can immediately edit avatar, display nickname, bio, and social links; Group, leadership position, historic records, and challenge counts need administrator approval.
- Discord avatars are imported initially, can be replaced with a custom avatar, and fall back to display-nickname initials.
- Editions use `0th XXX Edition.` naming and are ordered newest first.
- On mobile, cards show one recent-edition label plus `+N`; detail reveals all labels.
- Credits is an independent, visually consistent website across editions; editions change content only, not theme.
- Contributor detail begins with participation count plus first/latest edition, followed by complete newest-first history.
- A sponsor appears once in the Total Credits Sponsors overview and also has a card on every edition it sponsored.
- Website source code is public; community members may contribute through Issues and pull requests reviewed by authorized maintainers.
- Dark theme is the default; motion is restrained and respects reduced-motion preferences.
- On first visit, follow system theme; if system preference is unavailable, use dark theme.
- Administrators explicitly set every future Group's order.
- The primary audience is both contributors verifying/sharing their record and the general THJCC community learning who contributed to an edition.
- Website/code contributors are recognized through the Git platform only, not in public Credits.
- Launch with currently verified imported data; fill historical gaps through contributor requests and administrator approval.
- Administrator Settings must provide an AI-import prompt for converting source material into JSON import data.
- The first planned import is a Staff record; a raw source row was supplied and conceptually mapped, while JSON generation awaits the import contract.
- AI import uses administrator copy/paste with an external AI: spreadsheet/CSV source → AI-organized JSON → Settings preview → administrator confirmation → import.
- Approved imported records have no public verification/status marker.
- AI must stop and ask the administrator when it sees unexpected or unresolved source values; it must not infer values or continue import actions.
- The known CSV contains personal data fields. Real name, school, grade, experience, specialties, self introduction, and notes are excluded; email is private identity/account data used only for binding, recovery, and administrator contact.
- From the CSV, only Group, Position, and Discord ID/Nickname are public. Email is private; all other listed CSV fields are excluded entirely.
- The first CSV column is blank and ignored. Current import scope is only `3rd Summer Edition`.
- Official edition names follow `0th XXX Edition.` (example: `3rd Summer Edition`), not the superseded year/season format.
- Non-public CSV fields are excluded from JSON and the Credits system entirely.
- Corrections follow contributor request → administrator approval → public update, with administrator-only change history.
- Avatars are public.
- Every contributor must bind both Discord and Google; a stable internal contributor ID is created after binding.
- Same-Discord-ID CSV rows merge into one contributor with multiple Group/position memberships.
- Challenge author/reviewer counts originate from a separate Google Spreadsheet that records authors and reviewers for each challenge.
- Challenge author/reviewer data is imported at settlement time from CSV exported from the challenge sheet.
- SSO is a central THJCC service from the start, supporting Credits and future worker login-record services.
- Initial imported identity data is limited to Discord name, Discord ID, and email; optional profile information must be contributor-supplied later.
- Lost-account recovery occurs through `admin@thjcc.org` or a Discord ticket, followed by administrator recovery/rebinding.
- Email is private and used only for dual-account binding, recovery, and administrator contact.
- Contributor-supplied optional profile information is public in expanded card detail.
- A blank ordinary Group leadership position defaults to Member. The first received Staff record is resolved as General Coordinator + Challenge Group Member, pending JSON-contract definition.
- CSV Position values are fixed as `!總召`, `!副召`, `組長`, `副組長`, or blank (Member).
- Challenge-sheet CSV may match by Discord ID or nickname. Any non-unique/unknown match stops the entire batch and requires an administrator question.
- Public expanded contributor detail includes avatar, display nickname, self introduction, and social links; real name is not public.
- `thjcc-admin@gm.scint.org` is the single Google Group for full Credits Administrator permissions.
- A shareable deep link opens the relevant contributor card/detail state within Total Credits; no standalone public contributor page is required.
- Total Credits cards show all Group/leadership-position labels from the contributor's most recent edition.
- Total Credits provides nickname/Discord-ID search and filters for edition, Group, and leadership position.
- Total Credits cards sort by newest participation first, without creating a contribution ranking.
- Public website language is Traditional Chinese only.
- On mobile, contributor detail uses a bottom sheet.
- If any import ambiguity exists, AI outputs no JSON for the entire batch and asks focused questions instead.
- Desktop contributor detail uses a shareable right-side panel.
- Credits lives under a THJCC main-site path while retaining an independent visual system.
- Same-recency Total Credits cards tie-break by Discord nickname.
- Total Credits is the default public landing page, with navigation to Editions and Sponsors.
- Header Login leads to separate My Profile for contributors; administrators additionally access separate Admin Settings.
- Each import JSON targets one manually entered Edition name.
- A manually entered new Edition name is created automatically on confirmed import.
- Visual personality is clean, technical, and community-oriented rather than excessive hacker/terminal styling.
- Contributor cards never show current/former status.
- Sponsor cards may link to administrator-provided official websites.
- Public Header labels are `總覽`, `歷屆`, `贊助商`, and `登入`.
- Original CSV files are private; sanitized AI-organized JSON is public and omits email/excluded personal data.
- Staff/Sponsor imports and challenge-count settlement imports use separate JSON types.
- Every AI JSON includes `type`, `edition`, and `records` fields.
- Staff/Sponsor imports add or update only included records; omitted records remain unchanged.
- Challenge-count settlement imports replace recalculated author/reviewer counts for their Edition.
- Credits Administrators may manually modify any contributor record, not only their own.
- Google Groups is permission-only: it never supplies Credits Group rosters or historic participation. Ordinary Group leadership positions come from JSON import data.
- Administrator permission membership refresh is manual.
- Staff record minimum: Discord ID, display nickname, and at least one participation object with Group and position; special management position is optional and Email can be added at Google binding.
- Sponsor record minimum: formal name and Logo; official website is optional.
- Manual administrator permission sync shows last-sync time/result and leaves an audit event.
- Any Credits Administrator may complete account recovery/rebinding with an administrator-only audit record.
- Administrator manual edits take effect publicly immediately and are automatically recorded in administrator-only audit history.
- Administrators cannot directly edit Discord binding, Google binding, or internal Contributor ID; use the recovery/rebinding workflow.
- Removing an erroneous assignment removes only the Edition/Group participation record; it retains the contributor account and audit history.
- Staff import requires Discord name/ID plus participation data; Email may be absent and is later acquired through required Google binding.
- Avoid a plain tabular staff list as the main experience.
- Avoid contribution scores, rankings, or “most contribution” comparisons.
- Keep confirmed, tentative, inferred, rejected, and unresolved items distinct.

## Tentative Preferences

- Contributor detail uses a timeline, edition history, Group/position history, contribution history, or a combination; exact form is undecided.
- Total Credits begins with contributor summaries, then opens complete individual history.
- Superseded: A representative or most-recent Role is no longer the default card label; use a yet-to-be-defined most-recent Group/position rule.
- Confirmed: The special General Coordinator/Deputy General Coordinator area is followed by Groups ordered Challenge > Review > Infrastructure/Network > Administration/Documentation > Visual Design. Administrators explicitly set every future Group's order.
- Contributor cards should feel community-oriented rather than corporate-directory-like.

## Open Questions

- Deferred to a later authorized implementation phase: exact JSON key spelling/nesting and detailed SSO scope beyond Credits plus worker login-record service.

## Contradictions and Risks

- No unresolved contradiction identified; the previous inclusion of Guest, Advisor, and Speaker has been explicitly superseded.
- Risk: Sponsor records may represent organisations rather than people, which conflicts with the people-first premise of Total Credits unless their scope is explicitly separated.
- Risk: Detailed contribution records can become costly to gather and verify across past editions; desired depth needs confirmation before making it a core promise.
- Risk: Showing a multi-Group contributor in several sections can visually repeat them; retained labels and card design must make the intentional duplication clear.
- Risk: General Coordinator/Deputy General Coordinator is an exception to the ordinary Group/leadership ordering and needs a precise display convention.
- Risk: A card with several recent-edition labels can become dense on mobile; a responsive priority rule is still required.
- Resolved: Website source is public, with Issues/PRs reviewed by authorized maintainers; public Credits do not recognize website/code contributors.
- Resolved: On first visit, follow system theme; if system preference is unavailable, use dark theme.
- Risk: AI-generated JSON can invent, omit, or misclassify historical data; import must be validated before public display.
- Risk: Inconsistent or ambiguous CSV headers may cause the external AI to infer incorrect Group, leadership, or edition values; import Prompt must require explicit uncertainty reporting.
- Mitigated: The import prompt now names the target Edition and all confirmed Staff mappings explicitly. AI questions are reserved for unknown Group labels, non-unique Discord IDs, or genuinely missing required public fields.
- Mitigated: Sensitive CSV fields are excluded entirely from the Credits system; public CSV fields are limited to Group, Position, and Discord ID/Nickname.
- Risk: Requiring both Discord and Google binding requires careful administrator verification during recovery; recovery channel and audit are set, while detailed SSO verification is deferred.
- Mitigated: The first raw Staff row's `!總召` maps to General Coordinator and blank ordinary Group position defaults to Member; its Group mapping is now resolved.
- Mitigated: Email is private and restricted to binding, recovery, and administrator contact.
- Risk: Nickname matching in a challenge-sheet CSV can be ambiguous after a rename or duplicate display name; the import must stop rather than guess.
- Resolved: User selected the right-side panel after the authorized limited demo.
- Mitigated: Administrator edits are immediately audited; erroneous participation removes only the assignment, preserving contributor account/audit history.
- Resolved: Google Groups is permission-only; Credits Group rosters and history come from JSON/manual administration.

## Explicitly Rejected Ideas

- A plain staff-list experience such as “name | title | edition” as the primary presentation.
- Contribution scores, rankings, or comparative claims about who contributed most.
- Starting design or implementation before discovery is explicitly confirmed complete.
- Guest, Advisor, and Speaker entries in Credits (superseded by user in Round 2).

## Assumptions and Inferences

- Inference (unconfirmed): The site may serve both recognition/community-memory and externally understandable portfolio/verification purposes.
- Inference (unconfirmed): Contributor identity should be stable across editions even when Groups or leadership positions change.
- Inference (unconfirmed): Historical accuracy is more important than forcing every edition into one current organisational structure.

## Decision Log

| Date | Round | Type | Decision / Change | Source |
| --- | --- | --- | --- | --- |
| 2026-08-25 | 1 | Initial brief | Begin discovery; do not design, choose a stack, or implement. | User |
| 2026-08-25 | 1 | Initial brief | Separate edition-centric Credits and person-centric Total Credits views. | User |
| 2026-08-25 | 1 | Initial brief | Reject staff-list and ranking-centric primary experiences. | User |
| 2026-08-25 | 2 | Confirmed | Total Credits opens as a people-first contributor-card index. | User, Round 1 Q1: A |
| 2026-08-25 | 2 | Confirmed | Contributor detail foregrounds a representative or current role before history. Exact selection rule remains open. | User, Round 1 Q2: B |
| 2026-08-25 | 2 | Confirmed | Roles are the main contribution descriptor; challenge author/reviewer counts may be recorded. | User, Round 1 Q3 |
| 2026-08-25 | 2 | Confirmed | Include Guest, Advisor, Speaker, and Sponsor categories, visibly distinguished from staff. | User, Round 1 Q4: C |
| 2026-08-25 | 3 | Confirmed | Per-edition card grids are grouped directly by Role. | User, Round 2 Q1: A |
| 2026-08-25 | 3 | Confirmed | Total Credits cards use the role from the most recent edition. | User, Round 2 Q2: A |
| 2026-08-25 | 3 | Confirmed | Show authored/reviewed challenge counts only, not individual challenge names. | User, Round 2 Q3: A |
| 2026-08-25 | 3 | Superseded | Credits scope changed from staff + Guest/Advisor/Speaker/Sponsor to staff + sponsors only. Reason: user clarified the intended scope. | User, Round 2 Q4: A + clarification |
| 2026-08-25 | 4 | Confirmed | Sponsors appear in a separate section or tab in Total Credits. | User, Round 3 Q1: B |
| 2026-08-25 | 4 | Confirmed | Use nickname/usual ID as the primary public contributor identity; real name is optional. | User, Round 3 Q2: A |
| 2026-08-25 | 4 | Confirmed | Functional role names are stable; no historic-role renaming/standardization workflow is needed. | User, Round 3 Q3 clarification |
| 2026-08-25 | 4 | Confirmed | Multiple functional roles appear on one card, ordered General Coordinator > Challenge Author > Challenge Reviewer > Infrastructure > Administration > Visual Design. | User, Round 3 Q4: C + clarification |
| 2026-08-25 | 4 | Confirmed | Support member/leader concepts including General Coordinator, Deputy General Coordinator, Team Leader, and a future Deputy Team Leader option. | User, Round 3 addition |
| 2026-08-25 | 4 | Confirmed | Provide Discord and Google login; use Google Groups for permissions. Contributors self-edit basic data and submit additions for designated-admin approval. | User, Round 3 addition |
| 2026-08-25 | 5 | Superseded | Labels previously recorded as functional Roles are Groups; the earlier role-first grouping/model is replaced with a Group-first model. | User, Round 4 clarification |
| 2026-08-25 | 5 | Confirmed | Per-edition Groups are ordered General Coordinator > Challenge > Review > Infrastructure/Network > Administration/Documentation > Visual Design; people within each Group are ordered Team Leader > Deputy Team Leader > Member. | User, Round 4 clarification; later refined in Round 5 |
| 2026-08-25 | 5 | Confirmed | Discord/Google accounts are bound identities; Google Groups membership is intended to validate a user's Group association and manage permissions. | User, Round 4 clarification |
| 2026-08-25 | 5 | Confirmed | Use a shareable deep link that opens the relevant contributor card in the Total Credits experience; the viewer can close it and return to the main index. No separate profile page. | User, Round 4 Q3: B + clarification |
| 2026-08-25 | 5 | Confirmed | Sponsor records show logo, formal name, and the editions sponsored. | User, Round 4 Q4: A |
| 2026-08-25 | 6 | Confirmed | A multi-Group contributor appears in every applicable Group and displays all relevant labels. | User, Round 5 Q1 |
| 2026-08-25 | 6 | Confirmed | General Coordinator and Deputy General Coordinator are special all-event management positions displayed before ordinary Groups; do not apply ordinary Group leadership ordering to them. | User, Round 5 Q2: A + B |
| 2026-08-25 | 6 | Superseded | Google Groups no longer represents public Group association. It only manages current administrator permissions; its changes need not be recorded historically. | User, Round 5 Q3 |
| 2026-08-25 | 6 | Confirmed | Contributors immediately edit avatar, nickname, bio, and social links. Group, leadership position, historic records, and contribution counts require administrator-approved requests. | User, Round 5 Q4: A |
| 2026-08-25 | 7 | Confirmed | General Coordinator/Deputy General Coordinator who also belong to ordinary Groups appear in both the special management area and each applicable Group. | User, Round 6 Q1: B |
| 2026-08-25 | 7 | Confirmed | Total Credits cards show the most recent edition and all Group/leadership-position labels held in that edition. | User, Round 6 Q2: A |
| 2026-08-25 | 7 | Confirmed | Contributors submit Group/leadership-record additions or corrections; designated administrators approve them. | User, Round 6 Q3: A |
| 2026-08-25 | 7 | Confirmed | Total Credits supports nickname/Discord-ID search and filters by edition, Group, and leadership position. | User, Round 6 Q4: A |
| 2026-08-25 | 8 | Confirmed | Import Discord avatar initially; contributor may replace it; fall back to nickname initials. | User, Round 7 Q1: A |
| 2026-08-25 | 8 | Confirmed | Use `Year + Summer/Winter` edition names and newest-first edition navigation. | User, Round 7 Q2: A |
| 2026-08-25 | 8 | Confirmed | On mobile, show the first label plus `+N`; reveal all labels in card detail. | User, Round 7 Q3: B |
| 2026-08-25 | 8 | Confirmed | Credits is an independent website with a consistent visual system across editions; only content changes per edition. | User, Round 7 Q4 clarification |
| 2026-08-25 | 8 | Tentative | The user suggested allowing people who want to improve or rewrite the website to contribute; workflow is unconfirmed. | User, Round 7 Q4 addition |
| 2026-08-25 | 9 | Confirmed | Website source is public; community members can contribute via Issues and pull requests reviewed by authorized maintainers. | User, Round 8 Q1: A |
| 2026-08-25 | 9 | Confirmed | Contributor detail begins with participation summary (count, first/latest edition), then complete newest-first history. | User, Round 8 Q2: B |
| 2026-08-25 | 9 | Confirmed | Sponsors have both one Total Credits overview card with all sponsored editions and a card on each sponsored edition page. | User, Round 8 Q3: A + clarification |
| 2026-08-25 | 9 | Confirmed | Dark theme is the default; use low-key motion and respect reduced-motion preferences. | User, Round 8 Q4: A + clarification |
| 2026-08-26 | 10 | Confirmed | Primary audience includes both contributors verifying/sharing their records and general THJCC community/participants learning who contributed. | User, Round 9 Q1: A + B |
| 2026-08-26 | 10 | Confirmed | Website/code contributors are recognized on the Git platform only, not within public Credits. | User, Round 9 Q2: B |
| 2026-08-26 | 10 | Tentative | Theme should follow system preference while dark remains the default; precedence needs clarification. | User, Round 9 Q3: B |
| 2026-08-26 | 10 | Confirmed | Launch with currently verified imported data, then fill gaps through contributor request and administrator approval. | User, Round 9 Q5: A |
| 2026-08-26 | 10 | Unanswered | Future-Group ordering was asked in Round 9 Q4 but no choice was supplied. | User response |
| 2026-08-26 | 11 | Confirmed | On first visit, follow system theme; if system preference is unavailable, use dark theme. | User, Round 10 Q1: B |
| 2026-08-26 | 11 | Confirmed | Administrators manually set ordering for future Groups. | User, Round 10 Q2: A |
| 2026-08-26 | 11 | Confirmed | The first planned import is a Staff record. | User, Round 10 Q3: A |
| 2026-08-26 | 11 | Confirmed | Future Settings must provide an AI-import prompt for administrators to generate JSON import data from source material. | User, Round 10 clarification |
| 2026-08-26 | 12 | Confirmed | Administrators copy the Settings Prompt to an external AI; the AI organizes spreadsheet/CSV source data into JSON for paste-back import. | User, Round 11 Q1: A + Q3 clarification |
| 2026-08-26 | 12 | Confirmed | AI-generated JSON receives a readable preview; an administrator explicitly confirms before import. | User, Round 11 Q2: A |
| 2026-08-26 | 12 | Confirmed | Approved imported records do not show a public verification/status marker. | User, Round 11 Q4: A |
| 2026-08-28 | Implementation 7 | Implemented | JSON import now has target Edition/type controls; generated prompts carry the exact target and confirmed staff mappings, while validate/apply enforce the selected values. | User feedback + implementation |
| 2026-08-26 | Implementation 2 | Confirmed | The public position filter must include 總召 alongside ordinary Group positions. | User |
| 2026-08-26 | Implementation 2 | Confirmed | An open contributor detail panel or mobile sheet closes when the visitor presses Escape. | User |
| 2026-08-26 | Implementation 2 | Confirmed | The overview headline must be neutral: THJCC Credits 貢獻紀錄; do not use promotional or sentimental slogans. | User |
| 2026-08-26 | Implementation 2 | Confirmed | Use the workspace logo.png as the THJCC header icon. | User |
| 2026-08-26 | Implementation 2 | Confirmed | Admin Settings must include an interface to manage each contributor's individual participation records, not only imports. | User |
| 2026-08-26 | Implementation 2 | Confirmed | Total Credits provides three sort modes: chronological data order, deterministic daily rotation, and a manually refreshed random order. | User |
| 2026-08-26 | Implementation 2 | Superseded | PGID is an SSO implementation reference only. Direct PGID integration remains unconfirmed and must not be presented as decided. | User |
| 2026-08-26 | Implementation 2 | Implemented | Added total-coordinator filtering, Escape close, neutral headline, local logo asset, contributor-record management preview, and sorting controls. | Implementation |
| 2026-08-26 | Implementation 3 | Confirmed | Credits belongs inside THJCC-Website and must be reachable through a credits path. | User |
| 2026-08-26 | Implementation 3 | Implemented | Integrated Credits into the THJCC Website application and added static-hosting entry points for /credits/ and /2026-summer/credits/. | Implementation |
| 2026-08-26 | Implementation 4 | Confirmed | Credits keeps its own visual system and must not be restyled to share the THJCC event-site layout. | User |
| 2026-08-26 | Implementation 4 | Implemented | Made the Credits header span the full viewport while keeping its content aligned with the page container on wide screens. | Implementation |
| 2026-08-26 | Implementation 5 | Confirmed | Production Credits data is stored in Cloudflare D1. Public pages read sanitized data through an API; a static JSON file is only acceptable for development samples, not the production source of truth. | User |
| 2026-08-26 | Implementation 6 | Implemented | Added a D1-normalized Credits schema, a Worker-owned public /api/credits endpoint, local D1 migration workflow, generated binding types, and static asset routing through the same Worker. The public endpoint excludes private email, account bindings, and audit events. | Implementation |
| 2026-08-26 | Implementation 6 | Risk held | Administrator write endpoints remain disabled until the required Discord/Google identity and Google Groups authorization flow is implemented. | Implementation |
| 2026-08-26 | Implementation 7 | Implemented | Created the remote Cloudflare D1 database `thjcc-credits` in APAC, bound it to the Worker configuration, and applied migration `0001_credits_schema.sql`. The remote database is currently schema-only; no contributor or sponsor data has been imported. | Implementation with user authorization |
| 2026-08-26 | Implementation 8 | Superseded | The earlier note that no Staff row had been provided was incorrect. The user supplied an authorized initial `3rd Summer Edition` record for `PGpenguin72/企鵝`. | Conversation record review |
| 2026-08-26 | Implementation 8 | Implemented | Added and applied the public-only initial-data migration for `PGpenguin72/企鵝`: Discord ID, edition, General Coordinator, Challenge Group, and Member. No real name, email, school, grade, experience, or notes were stored. The public API now returns this record. | Implementation with user authorization |
| 2026-08-26 | Implementation 9 | Confirmed | PGID (`https://sso.pg72.tw`) is the first authentication integration. The earlier decision to defer direct PGID integration is superseded. | User |
| 2026-08-26 | Implementation 9 | Implemented | Replaced the fake management-preview entry point with PGID login/session/logout routes using OIDC Authorization Code + PKCE S256, state, nonce, validated ID-token/UserInfo claims, D1-backed one-time transactions, and secure HttpOnly sessions. No token, email, or client secret is sent to the browser or public API. | Implementation |
| 2026-08-26 | Implementation 9 | Blocked by configuration | PGID requires an administrator-created confidential client with client ID `thjcc-credits` and exact callback `https://thjcc-website.thjcc-3rd-summer-edition-ctf-misc.workers.dev/auth/pgid/callback`. The public client ID is deployed; the once-only `PGID_CLIENT_SECRET` has not been provisioned in the Credits Worker, so login correctly returns `pgid_auth_unavailable` until that one-time setup occurs. | PGID contract + implementation |
| 2026-08-27 | Implementation 10 | Confirmed | Administrator authority remains sourced from `thjcc-admin@gm.scint.org`, but the first integration is a one-way Google Group → private Google Sheet synchronization by Apps Script. Credits will read the Sheet only; it must not modify Google Group membership. | User |
| 2026-08-27 | Implementation 10 | Documented | Added the Group-to-Sheet synchronization design, including private data contract, direct-member limitation, hourly/manual sync plan, failure handling, freshness gate, and no-reverse-write rule. | Implementation |
| 2026-08-28 | Implementation 10 | Reported complete | User reported that the private Google Sheet setup is complete. Sheet ID, access method, and successful Group-to-Sheet synchronization have not yet been verified by Credits. | User |
| 2026-08-28 | Implementation 10 | Verified | Verified the supplied private Sheet `管理員資料` has `admin_access` with an `email` header and `sync_metadata` with a `last_successful_sync` timestamp. The Group-to-Sheet synchronization has a recorded successful run. The production Worker still needs a read-only service-account credential to access it independently. | Implementation |
| 2026-08-28 | Implementation 10 | Implemented | Added the production read-only Google Sheets authorization gate. The Worker uses the configured service-account secret to read `admin_access` and `last_successful_sync`, permits an authenticated PGID email only when it appears in the current Sheet and the sync is under 24 hours old, and caches a successful snapshot for five minutes. The Group roster and its emails remain private and are never written to D1 or returned by a public API. | Implementation |
| 2026-08-28 | Implementation 10 | Deployed; signed-in verification pending | Corrected the Worker configuration so `GOOGLE_ADMIN_SHEET_ID` is available at runtime, regenerated bindings, passed worker type-check and production build, and deployed Worker version `0d0b65cb-17b6-4e3e-b144-77dc766bd6a1`. The public Credits API remains healthy. A real signed-in administrator must now confirm that the management navigation appears. | Implementation |
| 2026-08-28 | Implementation 11 | Implemented | Replaced the client-only management preview with administrator-protected D1 write endpoints. An administrator can add or update a contributor's Group/position for a specific Edition, optionally set or clear General/Deputy General status, and remove an individual Group assignment. The Worker verifies both the PGID session and current Google-Sheet administrator access on every write, requires same-origin JSON requests, validates controlled vocabulary, and records every successful change in the private `admin_audit_events` table. | Implementation |
| 2026-08-28 | Implementation 11 | Deployed; signed-in write verification pending | Worker version `56ad0154-ef76-42cb-8f35-0aa09146b0c6` passed TypeScript, production build, startup profiling, deployment dry-run, and public API health check. No schema migration was needed because the existing D1 schema already includes participations, assignments, and audit events. A signed-in administrator must confirm one harmless save action in the deployed UI. | Implementation |
| 2026-08-28 | Implementation 12 | Implemented | Completed the administrator workflow: D1-backed record editing; safe creation/update of Group definitions and ordering; server-validated JSON preview plus explicit apply for Staff, Sponsor, and challenge-count settlement imports; automatic Edition creation for Staff/Sponsor imports; private audit-history viewing; and Google-Sheet synchronization status. JSON imports enforce recognized Groups, bounded records, exact Discord-ID matching for challenge counts, and full-batch rejection on invalid input. | Implementation |
| 2026-08-28 | Implementation 12 | Deployed; final administrator workflow verification pending | Applied remote migration `0004_credit_groups.sql`, preserving all existing Credits data and adding the five current Groups. Deployed Worker version `247fdba3-3e9a-4979-a740-420acdbc95d0`; type-check, production build, startup check, deployment dry-run, public API health check, and unauthenticated management-API rejection (`401`) all passed. A signed-in administrator must validate a non-destructive JSON preview and one confirmed save before production sign-off. | Implementation |
| 2026-08-28 | Implementation 13 | Implemented | Completed remaining direct-management gaps: administrators can edit any contributor's public nickname, avatar URL, biography, and social links without access to identity bindings or email; and can remove a Sponsor's relationship to exactly one Edition while retaining the Sponsor record and audit history. | Implementation |
| 2026-08-28 | Implementation 13 | Deployed; signed-in import verification pending | Deployed Worker version `ffb5a41c-cd62-4efe-ab13-d665f379ff09`. Worker type-check, production build, startup profile, deployment dry-run, remote migration check, public API health check, and clean diff check passed. The final required evidence is a signed-in administrator's successful JSON validate-and-apply flow on this version. | Implementation |
| 2026-08-26 | 13 | Confirmed | Existing administrator Google Group is `thjcc-admin@gm.scint.org`; it provides full Credits Administrator permissions. | User, Round 12 Q2: A + clarification |
| 2026-08-26 | 13 | Confirmed | AI must stop and ask when it encounters an unexpected or unresolved value; it must not infer or continue import action. | User, Round 12 Q4 clarification |
| 2026-08-26 | 13 | Confirmed | Initial CSV headers were provided; Edition is absent and no actual Staff row has yet been supplied. | User, Round 12 Q1 |
| 2026-08-26 | 14 | Confirmed | From CSV data, only Group, Position, and Discord ID/Nickname may be publicly displayed; all other listed fields are not public. | User, Round 13 Q1 |
| 2026-08-26 | 14 | Confirmed | Ignore the blank first CSV column. Current import scope is only `3rd Summer Edition`; other edition data is not needed for this import. | User, Round 13 Q2–Q3 |
| 2026-08-26 | 15 | Confirmed | Corrections follow contributor request → administrator approval → public update, with administrator-only change history. | User, Round 14 Q1: A |
| 2026-08-26 | 15 | Confirmed | Non-public CSV fields are excluded entirely from the Credits system; only Group, Position, and Discord ID/Nickname from CSV may be public. | User, Round 14 Q2: A |
| 2026-08-26 | 15 | Superseded | `Year + Summer/Winter` naming is replaced by the official `0th XXX Edition.` pattern, for example `3rd Summer Edition`. | User, Round 14 Q3 clarification |
| 2026-08-26 | 16 | Confirmed | Avatars are public. | User, Round 15 Q2 clarification |
| 2026-08-26 | 16 | Confirmed | Contributors must bind both Discord and Google; binding creates a stable internal contributor ID and supports future SSO. | User, Round 15 Q3 |
| 2026-08-26 | 16 | Confirmed | Same-Discord-ID CSV rows merge into one contributor record with multiple Group/position memberships. | User, Round 15 Q4: A |
| 2026-08-26 | 16 | Confirmed | Challenge author/reviewer counts will be attached through later submission/request flow rather than initial CSV import. | User, Round 15 Q1 |
| 2026-08-26 | 17 | Superseded | Challenge author/reviewer counts are sourced from a separate Google Spreadsheet (“題單”) listing each challenge's author/reviewer, not a manual submission/request flow. | User, Round 16 Q1 clarification |
| 2026-08-26 | 17 | Confirmed | SSO is required from the beginning as central THJCC identity for Credits and future worker login-record services. | User, Round 16 Q2 clarification |
| 2026-08-26 | 17 | Confirmed | Account recovery is requested via `admin@thjcc.org` or Discord ticket, then handled by administrators. | User, Round 16 Q3 |
| 2026-08-26 | 17 | Confirmed | Initial imported identity data is limited to Discord name, Discord ID, and email; optional information is entered later by the contributor. | User, Round 16 Q4 |
| 2026-08-26 | 17 | Pending import | First raw Staff row received but not imported: special-position and Group-leadership mapping are ambiguous; AI must stop and ask. Sensitive source fields intentionally omitted from this log. | User, Round 16 Q5 |
| 2026-08-26 | 18 | Confirmed | `!總召` maps to General Coordinator. A blank ordinary Group position defaults to Member; the first row is General Coordinator + Challenge Group Member. | User, Round 17 Q1 |
| 2026-08-26 | 18 | Confirmed | Email is private and used only for dual-account binding, recovery, and administrator contact. | User, Round 17 Q2: A |
| 2026-08-26 | 18 | Confirmed | Challenge author/reviewer data is imported at settlement from a CSV export of the challenge sheet. | User, Round 17 Q3: C |
| 2026-08-26 | 18 | Confirmed | Contributor-supplied optional profile information is public in expanded card detail. | User, Round 17 Q4: C |
| 2026-08-26 | 18 | Resolved pending import | First raw Staff row's conceptual mapping is resolved; actual JSON is deferred until the import contract is defined. | User, Round 17 Q1 |
| 2026-08-26 | 19 | Confirmed | Staff CSV Position vocabulary is `!總召`, `!副召`, `組長`, `副組長`, or blank (Member). | User, Round 18 Q1: A |
| 2026-08-26 | 19 | Confirmed | Challenge-sheet CSV may use Discord ID or nickname; an unknown/non-unique match stops the entire batch and asks the administrator. | User, Round 18 Q2: C |
| 2026-08-26 | 19 | Confirmed | Public expanded detail shows avatar, display nickname, self introduction, and social links; real name remains private. | User, Round 18 Q3: B |
| 2026-08-26 | 20 | Confirmed | Public site defaults to people-first Total Credits, with navigation to Editions and Sponsors. | User, Round 19 Q1: A |
| 2026-08-26 | 20 | Deferred | Contributor detail will be either a shareable right-side panel or centered modal; user wants a later simple demo to decide. No UI demo is made during discovery. | User, Round 19 Q2 |
| 2026-08-26 | 20 | Confirmed | Original CSV is private; sanitized AI-organized JSON is public and must omit email/excluded personal data. | User, Round 19 Q3 |
| 2026-08-26 | 20 | Confirmed | Staff/Sponsor imports use one JSON type; challenge-sheet settlement updates use another contribution-count JSON type. | User, Round 19 Q4: A |
| 2026-08-26 | 20 | Exception authorized | User authorized a subagent to create a limited panel-versus-modal comparison demo during discovery; this does not authorize production implementation. | User, Round 20 request |
| 2026-08-26 | 21 | Confirmed | Total Credits cards default to newest participation first, without contribution ranking. | User, Round 20 Q1: A |
| 2026-08-26 | 21 | Confirmed | Public website language is Traditional Chinese only. | User, Round 20 Q2: A |
| 2026-08-26 | 21 | Confirmed | Mobile contributor detail uses a bottom sheet. | User, Round 20 Q3: B |
| 2026-08-26 | 21 | Confirmed | Any unresolved import source record stops the entire batch; AI outputs questions, not JSON. | User, Round 20 Q4: A |
| 2026-08-26 | 22 | Confirmed | Desktop contributor detail uses a shareable right-side panel. | User, Round 21 Q1: A |
| 2026-08-26 | 22 | Confirmed | Credits lives under a path on the THJCC main site while retaining an independent visual system. | User, Round 21 Q2: B |
| 2026-08-26 | 22 | Confirmed | Same-recency Total Credits cards tie-break by Discord nickname. | User, Round 21 Q3: A |
| 2026-08-26 | 22 | Confirmed | Stopped AI batches return only focused questions with original row, unresolved field, and required administrator input. | User, Round 21 Q4: A |
| 2026-08-26 | 23 | Confirmed | Public Header Login leads to separate My Profile for contributors; administrators additionally access separate Admin Settings. | User, Round 22 Q1: A + Q4: A |
| 2026-08-26 | 23 | Confirmed | Each Staff/Sponsor/challenge-count JSON targets exactly one manually entered Edition name. | User, Round 22 Q2: A + clarification |
| 2026-08-26 | 23 | Confirmed | Visual personality is clean, technical, and community-oriented, not excessive hacker/terminal styling. | User, Round 22 Q3: A |
| 2026-08-26 | 24 | Confirmed | A manually entered new Edition name is created automatically on confirmed import. | User, Round 23 Q1: B |
| 2026-08-26 | 24 | Confirmed | Contributor cards do not show current/former status. | User, Round 23 Q2: A |
| 2026-08-26 | 24 | Confirmed | Sponsor cards link to administrator-provided official websites. | User, Round 23 Q3: A |
| 2026-08-26 | 24 | Confirmed | Public Header labels are 總覽、歷屆、贊助商、登入. | User, Round 23 Q4: A |
| 2026-08-26 | 25 | Confirmed | Staff/Sponsor JSON imports add or update included records and retain records omitted from the JSON. | User, Round 24 Q1–Q2: A |
| 2026-08-26 | 25 | Confirmed | Challenge-count settlement JSON recalculates and replaces author/reviewer counts for its Edition. | User, Round 24 Q3: A |
| 2026-08-26 | 25 | Confirmed | Every AI JSON includes `type`, `edition`, and `records`. | User, Round 24 Q4: A |
| 2026-08-26 | 25 | Confirmed | Credits Administrators can manually modify any contributor's record, not just their own. | User, Round 24 addition |
| 2026-08-26 | 27 | Confirmed | Google Groups is only for administrator-permission checks; it never supplies Credits Group rosters or historical membership. | User, Round 26 Q1 |
| 2026-08-26 | 27 | Confirmed | Ordinary Group leadership positions are supplied by JSON import data. | User, Round 26 Q2: JSON |
| 2026-08-26 | 27 | Confirmed | Administrator permission synchronization is manual. | User, Round 26 Q3: C |
| 2026-08-26 | 27 | Confirmed | Erroneous Sponsor assignments remove only the Edition relationship; empty Sponsors disappear from overview and audit history remains. | User, Round 26 Q4: A |
| 2026-08-26 | 28 | Confirmed | Staff records require Discord ID, display nickname, and at least one Group/position participation; special management position is optional and Email can be acquired after Google binding. | User, Round 27 Q1: A |
| 2026-08-26 | 28 | Confirmed | Sponsor records require formal name and Logo; official website is optional. | User, Round 27 Q2: B |
| 2026-08-26 | 28 | Confirmed | Manual administrator permission synchronization shows last-sync time/result and writes an audit event. | User, Round 27 Q3: A |
| 2026-08-26 | 28 | Confirmed | Any Credits Administrator may complete account recovery/rebinding and must leave an audit record. | User, Round 27 Q4: A |
| 2026-08-26 | 29 | Discovery confirmed | User accepted the Requirement Understanding. Status changed to “Discovery confirmed, implementation not started.” | User |
| 2026-08-26 | Implementation 1 | Confirmed | User authorized implementation. Initial application will integrate with PGID using OIDC Authorization Code + PKCE; its registered client ID and production callback URI are not yet configured. | User + PGID integration reference |
| 2026-08-26 | Implementation 1 | Implemented | Created the public React interface, responsive contributor detail behavior, and non-writing previews for identity, profile and administrative JSON import flows. Raw CSV-only profile fields were excluded from public sample data. | Implementation |
| 2026-08-26 | 26 | Confirmed | Administrator manual edits apply publicly immediately and automatically create administrator-only audit records. | User, Round 25 Q1: A |
| 2026-08-26 | 26 | Confirmed | Administrators cannot directly edit Discord/Google bindings or internal Contributor ID; use account recovery/rebinding. | User, Round 25 Q2: A |
| 2026-08-26 | 26 | Confirmed | Erroneous contributor-Edition/Group assignments are removed without deleting the contributor account; audit history remains. | User, Round 25 Q3: A |
| 2026-08-26 | 26 | Confirmed | Email is optional in Staff import and acquired later through required Google binding; Staff import requires Discord name/ID plus participation data. | User, Round 25 Q4: B + clarification |
| 2026-08-26 | 26 | Tentative / conflict | User proposed Google Groups API roster synchronization, conflicting with the earlier Google-Groups-permission-only model. | User, Round 25 clarification |
| 2026-08-26 | 12 | Confirmed | Administrators copy the Settings Prompt to an external AI; the AI organizes spreadsheet/CSV source data into JSON for paste-back import. | User, Round 11 Q1: A + Q3 clarification |
| 2026-08-26 | 12 | Confirmed | AI-generated JSON receives a readable preview; an administrator explicitly confirms before import. | User, Round 11 Q2: A |
| 2026-08-26 | 12 | Confirmed | Approved imported records do not show a public verification/status marker. | User, Round 11 Q4: A |

## Next Questions

1. Complete signed-in administrator verification of JSON preview and a confirmed D1 save using the corrected target-Edition prompt.
2. Confirm whether manual Google Group synchronization remains sufficient or needs a scheduled Apps Script trigger.
