# Admin Panel

Manage fabrics, gallery images and contact details at **`/admin`** — no database required.

---

## 1. Deploying to Vercel

### Create a Blob store

1. Vercel dashboard → your project → **Storage** → **Create Database** → **Blob**.
2. Connect it to the project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.

### Add the login credentials

Project → **Settings** → **Environment Variables**. Add three, for all environments:

| Name | Value |
| --- | --- |
| `ADMIN_USERNAME` | your chosen username |
| `ADMIN_PASSWORD` | a long, unique password |
| `ADMIN_SESSION_SECRET` | any long random string (32+ characters) |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Redeploy

Environment variables only apply to new deployments. Redeploy after adding them.

> **If you deploy before setting these, nothing breaks.** The public site works
> normally using the content committed in `content/*.json`; only `/admin` will
> refuse to sign in.

---

## 2. Using it

| Screen | What it does |
| --- | --- |
| `/admin` | Counts, storage status, download a backup |
| `/admin/products` | Add, edit, delete, reorder fabrics. The **first 8 appear on the home page** |
| `/admin/gallery` | Add/remove gallery images, set captions, categories and linked fabric. The **first 6 appear on the home page** |
| `/admin/site` | Phone, WhatsApp, email, Instagram, address |
| `/admin/history` | Restore any of the last 10 saved versions |

Works on phone and desktop.

### Images

Paste an **image link** — upload the photo anywhere (Cloudinary, ImgBB, imgur,
Google Drive…) and paste the URL. Paths to files already in `public/` also work,
e.g. `/products/korean-raw-silk/img1.jpeg`.

Any link renders. Hosts listed in `lib/image-hosts.ts` are additionally served
through Next's image optimizer; add a host there and redeploy to speed it up.

### When changes go live

Saving updates the public site within a few seconds — no redeploy needed.

---

## 3. How it works

```
content/*.json   committed seed content, and the fallback if storage fails
      ↓
Vercel Blob      the live copy the admin panel writes to
      ↓
lib/content      loaders every page reads through
```

**The site cannot be broken by the admin panel.**

- **Validation** — bad data is rejected before it is stored: unique slugs, valid
  image links, required fields.
- **Fallback** — if Blob is missing, unreachable or corrupt, every loader returns
  the committed `content/*.json` instead. Pages still render.
- **Backups** — each save snapshots the previous version first; the last 10 are
  kept and restorable from `/admin/history`.
- **Export** — download everything as one JSON file from the dashboard.

---

## 4. Local development

Create `.env.local`:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=whatever-you-like
ADMIN_SESSION_SECRET=any-long-random-string-for-local-use
```

```bash
npm run dev
```

Without `BLOB_READ_WRITE_TOKEN`, the admin panel reads and writes
`content/*.json` directly on disk — so you can try it offline. Committing those
files updates the seed content.

---

## 5. Security notes

- One operator account; credentials come from environment variables only. There
  is no default password — if the variables are unset, sign-in is refused.
- The session is a signed, HTTP-only cookie valid for 7 days.
- `proxy.ts` redirects signed-out visitors, but is **not** the security boundary
  (the Next.js docs are explicit that Proxy must not be used for authorisation).
  Every admin page and every save re-checks the session itself.
- `/admin` is marked `noindex`.
