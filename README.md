# CENTRAL RECIPE BOOK — Kitchen Edition

A deployable, mobile-friendly recipe management app for kitchen staff: categorized
recipes with search, a request → admin-approval modification workflow, version
history, favorites, print, and an admin dashboard (pending requests, recipe/category
management, archive, access codes).

It's plain HTML/CSS/JS (no build step) + Firebase Firestore for live, shared data —
the same pattern as your ordering board, so you host it the same way.

---

## Step-by-step: get it running

### Step 1 — Create the Firestore database (do this first — it's the #1 reason recipes don't show up)

Firebase projects don't have a database until you explicitly create one, even if
`firebase-config.js` is already filled in.

1. Go to the [Firebase console](https://console.firebase.google.com) → open project
   **recipe-book-central**.
2. In the left menu: **Build → Firestore Database**.
3. Click **Create database**.
4. Choose **Start in test mode** (easiest — open read/write for 30 days; see Step 2
   to make it permanent). Pick any location close to you, click **Enable**.

If this project already has Firestore enabled (e.g. it's shared with your ordering
board), skip to Step 2.

### Step 2 — Set Firestore rules

Test mode rules expire after 30 days. Go to **Firestore Database → Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish**. This matches the trust level of your ordering board's PIN gate —
it's UI-level access control, not real per-user security. If you'd like this locked
down harder later, ask and I'll write stricter rules plus the matching app changes.

### Step 3 — Open the app

- **Easiest test**: double-click `index.html` to open it in your browser. It should
  connect to Firestore and, on first load, automatically create the categories and
  all 27 recipes.
- **For real use**: don't rely on double-clicking the file long-term — deploy the
  folder to GitHub Pages, Firebase Hosting, or any static host, same as your
  ordering board, so every kitchen device hits the same URL.

### Step 4 — First-login setup

1. Unlock with the default codes: **User: 4671 / Admin: 2580**.
2. As admin, go to **Admin dashboard → Settings** and set your own codes.
3. Browse a recipe or two to confirm the drafts flagged for kitchen review look right.

---

## If recipes still don't show up

A banner will appear at the top of the page explaining the problem. The two most
common causes:

| Symptom | Cause | Fix |
|---|---|---|
| Red banner: "Couldn't reach the recipe database" | Firestore Database not created yet | Do Step 1 above |
| Red banner mentions "permission" or "insufficient" | Firestore rules are blocking access | Do Step 2 above |
| No banner, but the page is just blank/white | `firebase-config.js` wasn't loaded (check browser console, F12) | Make sure you kept the folder structure intact — `index.html` must sit next to `app.v2.js`, `style.v2.css`, `firebase-config.js`, and the `data/` and `images/` folders |

You can also open your browser's developer console (F12 → Console tab) — any
Firestore error will be printed there with more detail than the on-page banner.

---

## What's in this folder

```
index.html              the app shell
style.v2.css              all styling (light theme, mobile + print styles)
app.v2.js                all app logic (Firestore reads/writes, rendering, workflow)
firebase-config.js        your Firebase project config (already filled in)
data/seed-data.js        starting recipe content (only used the very first time)
data/costing-data.js     real ingredient-cost data imported from costing.xlsx
images/                  dish photos extracted from the PPTX
```

## Recent additions (this update)

- **Print now matches the on-screen recipe view** — photo, header with status/version
  badges, prep/cook/yield/price stats, then each recipe part with ingredients and
  method side by side. (Previously it printed as plain unstyled text.)
- **Quick "Category" dropdown** directly on the recipe page (admin-only) — the
  fastest way to move a dish between categories, in addition to the full editor.
- **Lightbox now actually zooms** — click the photo to zoom in centered on where you
  clicked, click again to zoom out; scroll to pan while zoomed.
- **Cost shown next to Price** in the recipe header (admin-only) — pulled live from
  that dish's costing data.
- **All menu items are now in the app.** Every dish from the à la carte PDF that
  wasn't already covered has been added: Charcutería Board, Cheese Board, Padrón,
  Del Mar, Pinchos Chicken/Beef/Shrimp, all 5 side dishes, Umm Ali, Kunafa, Tres
  Leches, Guilty, Waffle, Torte Caprese, Five A Day, Ice Cream, and Sorbet — each
  with a real photo pulled from the PDF and a draft recipe authored from that photo
  and the menu description, flagged **Draft** until a chef confirms it (same
  treatment as the original PPTX gaps).
  - **Important, real bug I found and fixed while doing this**: the Charcutería
    Board and Cheese Board recipes had gone missing entirely from an earlier
    editing pass — restored them from scratch.
- **All dish prices** are the real à la carte menu prices (not the costing sheet's
  numbers, which are a separate/older pricing exercise).
- **Costing filled in for every sellable dish** — 17 from your invoice spreadsheet
  (unchanged), and the remaining ~35 with estimated ingredient weights based on the
  dish photos and standard portion sizes, clearly labeled "Estimated" in the costing
  view (vs. "From supplier invoice data" for the real ones) so it's never confused
  with actual invoiced cost. Only the base sauce and breakfast-prep items (not sold
  as standalone dishes) have no costing.
- **Seeding is now additive, not all-or-nothing.** Previously, new dishes/categories
  I added would only appear automatically on a brand-new, empty database — if your
  app was already running with data in it, they'd never show up. Now the app checks
  what's already there and only adds what's missing, every time it loads, without
  touching anything you've already edited.

## Recent additions (this update)

- **Every ingredient cost cross-checked against your latest supplier price list**
  (`PRICE_LIST_UPDATED_AS_OF_22_08_26.xlsx`, covering LPOs from 30 May – 22 Aug 2026).
  211 ingredient lines across all 52 sellable dishes were updated to the real
  current supplier price wherever that ingredient appears on the list (proteins,
  dairy, oils, produce, pasta, nuts, bread, cheese, etc.) — some moved substantially:
  olive oil, for instance, was previously estimated far too cheap, and shrimp/salmon
  were previously estimated too expensive. Ingredients not on this particular list
  (made-in-house sauces, specific spices, a handful of specialty items) were left at
  their prior estimate since there was nothing more accurate to cross-check against.
  One clearly anomalous price-list entry (a frozen falafel line priced in a way that
  would have made a shared platter's food cost implausibly high) was caught and
  corrected rather than applied blindly — flagging this so you know the update
  wasn't purely mechanical.
- Every dish's cost-to-price ratio was sanity-checked after the update; all 52 now
  fall in a realistic 1.6%–34% food-cost range.

## Recent additions (this update)

- **Renamed the core files** (`app.js` → `app.v2.js`, `style.css` → `style.v2.css`)
  purely to force GitHub/your browser to treat them as brand-new files instead of
  possibly serving a cached copy of the old ones — this was likely why earlier
  updates didn't visibly show up after deploying. **After uploading this version,
  delete the old `app.js` and `style.css` files from your repo** (they're no longer
  used — GitHub's uploader doesn't delete old files automatically, it only adds/
  replaces what you drag in). Next update will bump to `.v3`, and so on.
- **Photo and video per method step.** Each step in a recipe can now have its own
  photo (uploaded from your device, auto-compressed) and/or video (paste a YouTube,
  Vimeo, or direct video link — embedded and playable right in the step). Works the
  same everywhere a recipe is edited (admin direct edit, kitchen staff's
  "propose changes" form, and the new-dish form), and every existing recipe's steps
  keep working exactly as before — nothing needs to be touched unless you want to
  add media to it.
  - In the editor, each step has its own 📷 and 🎥 buttons, plus ↑/↓ to reorder
    steps and ✕ to remove one.
  - In the recipe view, a step's photo can be tapped to open full-size in the
    zoomable lightbox; video plays inline.
  - Printed recipes include step photos too (videos obviously can't print, so a
    small note says "has a video step — view in the app" instead).
  - Photos are compressed client-side before saving, same as the main dish photo —
    if you add a photo to *every single step* of a long recipe, keep an eye on
    total size (Firestore documents cap at 1MB), but for normal use (a few step
    photos here and there) this isn't something you'll run into.

## Earlier additions

- **Price per dish**, shown on list rows and in the detail view, editable by admin.
- **Costing calculator** — a separate view (💰 Costing button, admin-only) per dish
  with an editable ingredient/qty/unit-cost table that auto-calculates line totals,
  total cost, and a suggested menu price (using an editable target food-cost % and
  price multiplier). 17 dishes are pre-filled with real ingredient costs pulled from
  `costing.xlsx`; the rest start empty for the kitchen to fill in.
- **One unified recipe editor** for name, category (so dishes can be moved between
  categories), price, photo (upload from your device — it's resized and stored
  directly, no external image hosting needed), prep/cook/yield, allergens, notes,
  and all recipe parts (add or remove sub-recipes freely). Admins hit "Save changes"
  and it goes live immediately; kitchen staff see the exact same form but their
  "Send for approval" creates a pending request instead — nothing changes until an
  admin approves it.
- **One-click draft/verified toggle** for admins on whichever recipe part is open.
- **List rows now show a thumbnail and allergen pills instead of the Arabic name**
  (Arabic name is still shown on the full recipe page). Clicking a dish's photo in
  the detail view opens it full-size.
- **Delete permanently** (admin) — for a whole dish (Admin → Recipes, or from within
  the editor) or for a single recipe part (remove button inside the editor). This is
  separate from Archive, which is recoverable.
- Fixed a bug where the **Print** button produced a blank page.

## How the content was sourced

- **Source of truth**: `recipe_book_CENTRAL_2.pptx`, the kitchen prep book. Every
  ingredient and method line transcribed from it is marked "From source" in the app.
- **Draft content**: 13 dishes had incomplete slides (ingredients/method missing).
  At your request, those were filled in based on the dish photo and the à la carte
  menu description — flagged **Draft** throughout the app until a chef reviews and
  confirms them via "Edit directly" (admin) or an approved change request.
- **Allergens**: blank on every slide in the PPTX. Where a matching dish exists on
  the à la carte PDF, its allergen tags were copied in and labeled "unverified —
  from guest menu" — a starting point, not a confirmed list.
- **No photo available in source**: Cachopo and Mashed Potato — flagged in the
  recipe's chef notes; add a photo any time via admin edit.
- **Prep/cook times, chef notes, plating notes**: left blank everywhere (not in the
  source at all) for the kitchen to fill in.

## How the approval workflow works

1. Any user opens a recipe → "Request a change" → picks a field, writes the new
   value and a reason → submitted to Firestore as a pending request.
2. Admin dashboard → Pending requests → old vs. new side by side → **Approve**,
   **Reject**, or **Ask for clarification** (visible to the requester under
   "My requests").
3. On approval, the recipe updates, its version number increments, and a full
   snapshot of the *previous* version is stored — visible any time via "Version
   history," showing who requested it, who approved it, and when.
4. Admins also have an "Edit directly" option that skips the queue (they're the
   approval authority already) — still logged the same way in version history.

## Good to know

- **Photos are stored directly in Firestore** as compressed JPEGs (resized to
  ~900px wide client-side before upload), not on separate file storage — simplest
  option with no extra setup, but keep an eye on it if you're uploading a lot of
  very large originals repeatedly, since each edited version's history snapshot
  keeps a copy of the photo at that point in time.
- **Costing is admin-only** for now (the 💰 button only shows for admins) since
  ingredient costs and margins are commercially sensitive — say the word if you'd
  like kitchen staff to see costing too.
- **Pending "full recipe edit" requests** show a summary of which fields changed;
  for a full side-by-side on ingredient/method wording specifically, use the
  "Open dish to compare" button next to the request to view the current live
  version alongside what's being proposed.

## Other features

- **Search** — matches dish name (EN/AR), ingredients, and method text.
- **Favorites** — starred per device (stored locally in the browser, not shared).
- **Print** — clean, photo-free print layout of the open recipe.
- **Archive** — soft-delete; archived recipes are hidden from the main list but
  restorable from Admin → Recipes.
- **Add recipes/categories** — Admin dashboard → Recipes / Categories.
