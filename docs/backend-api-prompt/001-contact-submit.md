# Task 001 — Contact form submission API
- Scope: contact
- Stack: back-end AI chooses (recommended: Nuxt `server/api/*` routes in the same app)
- Generated: 2026-11-25
- Sources: app/pages/contact.vue, app/components/ui/Dropdown.vue, i18n/locales/en.ts (`contact.*`, `form.*`, `aside.*`, `status.*`), nuxt.config.ts (i18n, runtimeConfig), app/template/app.jsx (`ContactPage`, `ContactTypeSelect`)

---

## 1. Role & goal

You are a senior back-end developer. Build the REST API behind the **contact form** of an existing Nuxt 4 front end (the sulton.dev portfolio). The front end is fixed: it sends the exact payload described below, and your response must match the schemas below exactly.

Choose a stack and justify it in a short paragraph. The recommended option is **Nuxt server routes** (`server/api/contact.post.ts`) in the same Nuxt app: same origin, no CORS, one deploy (the site runs on Vercel). A separate service behind a same-origin `/api` reverse proxy is also acceptable.

Deliver:
- the endpoint(s);
- validation;
- anti-spam and rate limiting;
- persistence of submissions;
- an email notification to the site owner;
- optional newsletter opt-in handling;
- a README with environment variables and a curl test script.

## 2. Product context

sulton.dev is the personal portfolio of a freelance design engineer. It has these pages: projects, blog, photos, services/pricing and contact. Visitors use the **Contact** page (`/contact`) to request work.

The page shows:
- a heading ("Let's build / something.");
- the lead "Tell me about your project. I reply within 1–2 business days, every time.";
- a form;
- a sidebar with a direct email (`hello@sulton.dev`), social links and an availability card.

Today the site runs entirely on mock data, and **the form submits nowhere**: its handler is an empty `// TODO: wire to API endpoint /api/contact`. You are building that endpoint. The site has four UI languages: en (default), uz, ru and de. The visitor's choice is stored in the `sulton.lang` cookie, and URLs carry no locale prefix.

## 3. Global conventions

- Base path `/api`. JSON request and response bodies, `Content-Type: application/json`, UTF-8.
- camelCase keys.
- Timestamps are ISO 8601 UTC strings (`2026-11-25T14:03:00Z`).
- Every error response has this shape (it is the shape Nuxt's `$fetch`/`createError` understands):
  ```ts
  interface ApiError {
    statusCode: number
    message: string
    data?: { fields?: Partial<Record<keyof ContactRequest, ContactFieldError>> }
  }
  type ContactFieldError = 'required' | 'invalid' | 'too_short' | 'too_long'
  ```
  Field errors are **machine codes, not sentences**. The front end translates them into the visitor's language, so the API never returns user-facing English.
- No authentication for the public `POST /api/contact`. Any admin endpoints (see §10) need auth.
- The front end calls the relative URL `/api/contact` from the browser only; the form never submits during SSR. Same origin means no CORS. If you deploy on another origin, allow only `https://sulton.dev` (and `http://localhost:3000` in dev) and document the `baseURL` the front end must use.
- Never log full message bodies or email addresses at info level.

## 4. Data model

### 4.1 Request — what the form sends

The form state in the UI is:

```ts
// exactly as the UI holds it today
const form = { name: '', email: '', type: 'web', message: '', subscribe: false }
```

The API contract:

```ts
type ProjectType = 'web' | 'ds' | 'mvp' | 'audit' | 'other'

interface ContactRequest {
  name: string        // visitor's name
  email: string       // reply-to address
  type: ProjectType   // "Project type" dropdown, default 'web'
  message: string     // free text
  subscribe: boolean  // newsletter opt-in checkbox, default false
  locale?: 'en' | 'uz' | 'ru' | 'de'   // (proposed) the UI language at submit time
  website?: string    // (proposed) honeypot field, must be empty
}
```

| Field | Type | Required | Meaning / UI element | Constraints |
|---|---|---|---|---|
| `name` | string | yes | "Name" text input, placeholder "Jane Doe" | Trim. 1–100 chars after trim. |
| `email` | string | yes | "Email" `type="email"` input, placeholder "jane@startup.dev" | Trim and lowercase the domain. Valid email (RFC 5322 practical subset). At most 254 chars. |
| `type` | `ProjectType` | yes | "Project type" dropdown (custom listbox) | One of the 5 values below, otherwise `invalid`. |
| `message` | string | yes | "Message" textarea, placeholder "What are you building? What's the timeline?" | Trim. 10–5000 chars. |
| `subscribe` | boolean | yes | Checkbox "Subscribe me to the newsletter — two posts a month, easy unsubscribe." | Must be a real boolean. A missing value defaults to `false`. |
| `locale` | enum | no *(proposed)* | Active UI locale | Default `en`. Used for the auto-reply language and stored with the submission. |
| `website` | string | no *(proposed)* | Hidden honeypot input | If non-empty, return `201` without storing or sending anything (silent drop). |

`ProjectType` values with their labels, which the owner's notification email should show:

| value | en | uz | ru | de |
|---|---|---|---|---|
| `web` | Web App | *(from locale file)* | *(from locale file)* | *(from locale file)* |
| `ds` | Design System | … | … | … |
| `mvp` | Prototype / MVP | … | … | … |
| `audit` | Performance Audit | … | … | … |
| `other` | Other | … | … | … |

The owner email can use the English labels. The values themselves are fixed strings on the wire.

### 4.2 Stored submission

```ts
interface ContactSubmission {
  id: string                 // UUID v4 or ULID
  createdAt: string          // ISO 8601 UTC
  name: string
  email: string
  type: ProjectType
  message: string
  subscribe: boolean
  locale: 'en' | 'uz' | 'ru' | 'de'
  status: 'new' | 'replied' | 'archived' | 'spam'   // (proposed) owner workflow
  ipHash: string             // SHA-256(ip + server salt), never the raw IP
  userAgent?: string
}
```

Storage suggestion:
- a `contact_submissions` table or collection, indexed on `createdAt` desc, `status` and `email`;
- newsletter opt-ins go to a separate `newsletter_subscribers` record (email, locale, `createdAt`, `confirmedAt`, `unsubscribeToken`) so the two lists stay apart.

On serverless (Vercel), use a hosted database, e.g. Postgres (Neon/Supabase), Vercel KV or Turso, rather than the local filesystem.

## 5. Endpoints

| Method | Path | Body / params | Returns | Used by |
|---|---|---|---|---|
| POST | `/api/contact` | `ContactRequest` | `201 ContactResponse` | Contact page form submit |

### POST `/api/contact`

**Request**

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@startup.dev",
  "type": "mvp",
  "message": "We're building a B2B analytics MVP and need a Nuxt front end in 6 weeks.",
  "subscribe": true,
  "locale": "en",
  "website": ""
}
```

**Success: `201 Created`**

```ts
interface ContactResponse {
  ok: true
  id: string          // submission id
  receivedAt: string  // ISO 8601 UTC
}
```

```json
{ "ok": true, "id": "01JDQ3V7Z8K2M4N6P8R0S2T4V6", "receivedAt": "2026-11-25T14:03:00Z" }
```

**Errors**

| Status | When | Body example |
|---|---|---|
| 400 | Malformed JSON or wrong content type | `{ "statusCode": 400, "message": "Invalid request body" }` |
| 422 | Validation failed: return **all** failing fields at once | `{ "statusCode": 422, "message": "Validation failed", "data": { "fields": { "email": "invalid", "message": "too_short" } } }` |
| 413 | Body over 16 KB | `{ "statusCode": 413, "message": "Payload too large" }` |
| 429 | Rate limit hit; send a `Retry-After` header in seconds | `{ "statusCode": 429, "message": "Too many requests" }` |
| 500 / 502 | Storage or email provider failure | `{ "statusCode": 500, "message": "Could not send message" }` |

**Behaviour, in order**

1. Parse and enforce the size limit.
2. Honeypot: if `website` is non-empty, return `201` with a fake id and do nothing else.
3. Rate-limit by `ipHash`: at most 5 submissions per 10 minutes and at most 20 per day. Also at most 3 per 10 minutes for the same email.
4. Validate per §4.1 and collect all field errors, then return `422`.
5. Persist the `ContactSubmission` with `status: 'new'`.
6. Send the owner a notification email to the address in the `CONTACT_TO` env var:
   - subject: `[sulton.dev] New <type label> enquiry from <name>`;
   - `Reply-To: <visitor email>`;
   - plain-text body with all fields, the locale and the submission id.

   The email must never be sent *from* the visitor's address (SPF/DMARC): send from `CONTACT_FROM` with `Reply-To` set.
7. *(proposed, optional)* Send the visitor an auto-reply in their `locale`: "Thanks — I reply within 1–2 business days."
8. If `subscribe` is true, create or update the newsletter subscriber with double opt-in. Send a confirmation email, and only mark the subscriber confirmed once its link is clicked (GDPR: the owner is in Berlin/EU).
9. Return `201`.

If the email in step 6 fails after the submission was stored, still return `201` (the submission isn't lost). Log the failure and retry asynchronously if the stack allows. Return `5xx` only when persisting fails.

The request must be idempotent-friendly: an identical payload from the same `ipHash` within 60 seconds returns the original `201` response instead of creating a duplicate, which covers double-clicks.

## 6. UI ↔ data map

| UI element (contact page) | Field / endpoint | Notes |
|---|---|---|
| Name input | `name` | `v-model`, no client validation today |
| Email input (`type="email"`) | `email` | Browser-native email check only |
| Project type dropdown | `type` | Options `web`, `ds`, `mvp`, `audit`, `other`; default `web` |
| Message textarea | `message` | |
| Newsletter checkbox | `subscribe` | Default unchecked |
| "Send message →" submit button | `POST /api/contact` | `@submit.prevent="onSubmit"`. The handler is empty today; the front end will call `$fetch('/api/contact', { method: 'POST', body: form })` |
| "or email hello@sulton.dev direct." | none | Static `mailto:` link, not part of the API |
| Sidebar "Other ways" / "Find me" links | none | Static links (email, intro call, CV, GitHub, LinkedIn, X, Read.cv, Mastodon) |
| Sidebar "Status" card (Available May 2026 / Booked Jun 2026 / Tentative Jul–Aug 2026, "Based in Berlin · UTC+1") | none today | Hard-coded translated strings. See the proposed `GET /api/availability` in §7 |

The UI does **not** render anything from the response body yet. It only needs to tell success (2xx) from failure. Front-end follow-ups the owner will add, which your contract must support:
- a success state after `201`;
- inline field errors mapped from `data.fields` codes;
- a disabled button while the request is in flight;
- a "try again in N minutes" message on `429` using `Retry-After`.

## 7. Proposed endpoints (not yet wired in the UI)

### 7.1 `GET /api/availability` *(proposed, optional)*

This would replace the hard-coded availability card so the owner can update it without a deploy.

```ts
interface AvailabilitySlot {
  state: 'available' | 'booked' | 'tentative'   // UI: dot colour + label (status.avail / status.booked / status.tent)
  from: string   // 'YYYY-MM' e.g. '2026-05'
  to?: string    // 'YYYY-MM' for ranges, e.g. Jul–Aug → from '2026-07', to '2026-08'
}
interface AvailabilityResponse {
  slots: AvailabilitySlot[]   // ordered by `from` asc; UI shows max 3
  timezone: string            // e.g. 'UTC+1'
  basedIn: string             // e.g. 'Berlin'
}
```

The front end formats the month names per locale, so return only machine values. Cache with `Cache-Control: public, max-age=300, stale-while-revalidate=3600`.

### 7.2 Owner admin *(proposed, auth required)*

- `GET /api/admin/contact?status=new&limit=50&cursor=…` lists submissions, newest first.
- `PATCH /api/admin/contact/:id` takes `{ status }`.

Protect both with a bearer token from the `ADMIN_TOKEN` env var, or with the auth solution the owner picks (§10).

## 8. Seed data

There is no mock data for submissions. Seed 3 example rows for local development only:

```json
[
  { "name": "Jane Doe", "email": "jane@startup.dev", "type": "mvp", "message": "We're building a B2B analytics MVP and need a Nuxt front end in 6 weeks.", "subscribe": true, "locale": "en", "status": "new" },
  { "name": "Aziz Karimov", "email": "aziz@example.uz", "type": "web", "message": "Bizga kompaniya sayti uchun Nuxt ilovasi kerak.", "subscribe": false, "locale": "uz", "status": "replied" },
  { "name": "Lena Fischer", "email": "lena@example.de", "type": "audit", "message": "Unsere Lighthouse-Werte sind schlecht, können Sie helfen?", "subscribe": false, "locale": "de", "status": "archived" }
]
```

Seed availability (if you build §7.1) from the current UI:
- `available` 2026-05;
- `booked` 2026-06;
- `tentative` 2026-07 to 2026-08;
- timezone `UTC+1`, basedIn `Berlin`.

## 9. Acceptance criteria

- [ ] `POST /api/contact` with the §5 example returns `201` with `{ ok: true, id, receivedAt }`, and a row exists with `status: 'new'`.
- [ ] The owner receives one email with `Reply-To` set to the visitor's address and all 5 fields plus the locale.
- [ ] Missing `name`, an invalid `email`, a `message` shorter than 10 characters and `type: "seo"` together return a single `422` whose `data.fields` holds all four codes.
- [ ] `type` accepts exactly `web`, `ds`, `mvp`, `audit`, `other`.
- [ ] `subscribe` omitted means it is stored as `false`. `subscribe: "yes"` (a string) returns `422 invalid`.
- [ ] A non-empty `website` honeypot returns `201`, with nothing stored and no email sent.
- [ ] A 6th request from the same IP within 10 minutes returns `429` with a `Retry-After` header.
- [ ] An identical payload re-sent within 60 seconds returns the same `id` and no duplicate row.
- [ ] A 20 KB body returns `413`, and non-JSON returns `400`.
- [ ] `subscribe: true` sends a double opt-in confirmation, and the subscriber stays unconfirmed until the link is clicked.
- [ ] No response or log line contains a raw IP or a full message body.
- [ ] The README lists the env vars (`CONTACT_TO`, `CONTACT_FROM`, email provider key, DB URL, `IP_HASH_SALT`, optional `ADMIN_TOKEN`) and includes a curl script covering every case above.

## 10. Open decisions for the owner

1. **Email provider:** Resend, Postmark or SMTP. This affects env vars and deliverability.
2. **Storage:** a database (searchable history) or email-only (simplest, no persistence).
3. **Newsletter:** double opt-in handled here, or forwarded to a provider (Buttondown, ConvertKit, Mailchimp). Is a newsletter actually live yet?
4. **Auto-reply to the visitor** (§5 step 7): yes or no, and in which languages.
5. **Anti-spam strength:** is a honeypot plus rate limiting enough, or should a privacy-friendly challenge (Cloudflare Turnstile) be added? Turnstile needs a front-end widget.
6. **Availability card** (§7.1): keep it hard-coded in the translations or serve it from the API.
7. **Admin access** (§7.2): a simple token, or real auth; also, who reads the submissions.
8. **Data retention:** how long submissions are kept (GDPR), e.g. auto-delete after 12 months.
