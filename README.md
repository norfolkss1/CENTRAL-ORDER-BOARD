# CENTRAL RECIPE BOOK — Kitchen Edition

A deployable, mobile-friendly recipe management app for kitchen staff: categorized
recipes with search, a request → admin-approval modification workflow, version
history, favorites, print, costing, and an admin dashboard (pending requests,
recipe/category management, archive, access codes).

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
it's UI-level access control, not real per-user security.

### Step 3 — Open the app

- **Easiest test**: double-click `index.html` to open it in your browser. It should
  connect to Firestore and automatically create any categories/recipes that are
  missing from your database.
- **For real use**: deploy the folder to GitHub Pages (or Firebase Hosting), so
  every kitchen device hits the same URL. See "Deploying updates" below.

### Step 4 — First-login setup

1. Unlock with the default codes: **User: 4671 / Admin: 2580**.
2. As admin, go to **Admin dashboard → Settings** and set your own codes.
3. Browse a recipe or two to confirm everything looks right.

---

## Deploying updates (and why files are named `.v3`, `.v4`, etc.)

The core files are versioned in their filename (`app.v3.js`, `style.v3.css`) on
purpose. GitHub's web uploader doesn't delete old files when you drag new ones in,
and browsers/GitHub's CDN cache JS and CSS aggressively — so simply re-uploading
`app.js` under the same name is the single most common reason an update "doesn't
show up." Giving the file a new name forces every browser to treat it as a
brand-new resource, no caching ambiguity possible.

**Each time you get an updated copy of this app, the version number in the
filenames will have gone up** (e.g. `.v3` → `.v4`) and `index.html` will already
point to the new names. When you deploy:

1. Upload/replace everything as usual (see below).
2. **Delete the previous version's `app.vN.js` and `style.vN.css`** from your repo
   — they're dead weight once `index.html` no longer references them.
3. Hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) before judging whether it worked.

### Recommended: deploy via git, not the web uploader

The web uploader has repeatedly caused partial/nested uploads. This is far more
reliable:

```
cd YOURREPO
rm -rf * .[!.]*
cp -r /path/to/unzipped/me-recipe-book/* .
git add -A
git commit -m "update recipe book"
git push
```

`git status`/`git add -A` show you exactly what changed before it goes live —
catch a bad copy before it's public, not after.

### Verifying a deploy actually landed

1. On GitHub, open the repo and check `index.html`'s "Latest commit" timestamp —
   confirm it's actually recent, and that `data/` and `images/` aren't empty.
2. Open your site, hard-refresh, then **F12 → Network tab → refresh again** —
   confirm the newest `app.vN.js` filename is what's actually loading (not an
   older version number).

---

## What's in this folder

```
index.html              the app shell
style.v3.css             all styling (light theme, mobile + print styles)
app.v3.js                all app logic (Firestore reads/writes, rendering, workflow)
firebase-config.js       your Firebase project config (already filled in)
data/seed-data.js        starting recipe content (tops up anything missing on load)
data/costing-data.js     ingredient-cost data (real invoice + estimated + latest price list)
images/                  dish photos
```

---

## Changelog

### Video steps — mobile fix
- **Fixed: a recipe with a video step could fail to open on mobile.** Likely cause:
  a pasted Google Drive "share" link doesn't work as a raw `<video>` source, and
  some mobile browsers would hang/blank out trying to load it that way. Now,
  YouTube, Vimeo, and Google Drive share links are each embedded properly; anything
  else only gets a native video player if it's an actual direct video file link —
  otherwise it shows as a plain tappable "🎥 Watch video ↗" link, so a broken video
  link can never take the rest of the recipe down with it.

### Photo & video per method step
- Each step in a recipe can have its own photo (uploaded from your device,
  auto-compressed) and/or video (paste a YouTube, Vimeo, Google Drive, or direct
  video link). Available everywhere a recipe is edited — admin direct edit, kitchen
  staff's "propose changes" form, and the new-dish form. Existing recipes' steps
  keep working exactly as before; nothing needs to be touched unless you add media.
  - In the editor: each step has its own 📷 and 🎥 buttons, plus ↑/↓ to reorder and
    ✕ to remove.
  - In the recipe view: a step's photo opens full-size in the zoomable lightbox;
    video plays inline.
  - Print includes step photos (video steps get a note instead, since paper can't
    play video).
  - Photos are compressed client-side before saving — adding one to *every* step of
    a very long recipe is the only scenario where Firestore's 1MB document limit
    could become relevant; normal use won't come close.

### Ingredient costs refreshed against your latest supplier price list
- Cross-checked against `PRICE_LIST_UPDATED_AS_OF_22_08_26.xlsx` — 211 ingredient
  lines across all 52 sellable dishes updated to real current supplier prices
  wherever a match existed (olive oil was previously estimated far too cheap;
  shrimp/salmon were estimated too expensive — among other corrections). Items not
  on that particular list (house-made sauces, some spices, a few specialty items)
  were left at their prior estimate. One clearly anomalous price-list entry (a
  frozen falafel line that would have made a shared platter's food cost
  implausibly high) was caught and corrected rather than applied blindly. Every
  dish's cost-to-price ratio was sanity-checked afterward — all 52 land in a
  realistic 1.6%–34% food-cost range.

### Full menu + costing + polish pass
- **Print now matches the on-screen recipe view** — photo, header with
  status/version badges, prep/cook/yield/price stats, then each recipe part with
  ingredients and method side by side.
- **Quick "Category" dropdown** directly on the recipe page (admin) for moving a
  dish between categories in one step, in addition to the full editor.
- **Lightbox zooms** — tap the photo to zoom in centered on where you tapped, tap
  again to zoom out; scroll/drag to pan while zoomed.
- **Cost shown next to Price** in the recipe header (admin-only), pulled live from
  that dish's costing data.
- **All à la carte menu items are in the app**, including everything that wasn't
  already covered: Charcutería Board, Cheese Board, Padrón, Del Mar, Pinchos
  Chicken/Beef/Shrimp, all 5 side dishes, Umm Ali, Kunafa, Tres Leches, Guilty,
  Waffle, Torte Caprese, Five A Day, Ice Cream, and Sorbet — each with a real photo
  and a draft recipe authored from that photo and the menu description, flagged
  **Draft** until a chef confirms it.
- **All dish prices** are the real à la carte menu prices.
- **Costing filled in for every sellable dish** — 17 from the original invoice
  spreadsheet, the rest with estimated ingredient weights, clearly labeled
  "Estimated" vs. "From supplier invoice data" so the two are never confused.
- **Seeding is additive, not all-or-nothing** — the app tops up whatever
  dishes/categories are missing every time it loads, without touching anything
  you've already edited (previously, new content only appeared automatically on a
  brand-new empty database).

### Core features
- **One unified recipe editor** for name, category, price, photo, prep/cook/yield,
  allergens, notes, and all recipe parts (add/remove sub-recipes freely). Admin's
  "Save changes" goes live immediately; kitchen staff see the identical form but
  their "Send for approval" creates a pending request instead — nothing changes
  until an admin approves it.
- **Costing calculator** — a separate view (💰 Costing, admin-only) per dish with an
  editable ingredient/qty/unit-cost table that auto-calculates totals and a
  suggested menu price from an editable target food-cost % and price multiplier.
- **One-click draft/verified toggle** for admins on whichever recipe part is open.
- **List rows** show a thumbnail, allergen pills, and price (Arabic name is still on
  the full recipe page).
- **Delete permanently** (admin) — for a whole dish or a single recipe part —
  separate from Archive, which is recoverable.
- **Search** — matches dish name (EN/AR), ingredients, and method text.
- **Favorites** — starred per device (stored locally, not shared).
- **Archive** — soft-delete; hidden from the main list but restorable from
  Admin → Recipes.
- **Add recipes/categories** — Admin dashboard → Recipes / Categories.

---

## How the content was sourced

- **Source of truth**: `recipe_book_CENTRAL_2.pptx`, the kitchen prep book. Every
  ingredient/method line transcribed from it is marked "Verified from source" in
  the app.
- **Draft content**: dishes with incomplete or missing source slides were filled in
  based on the dish photo and the à la carte menu description, flagged **Draft**
  until a chef reviews and confirms them.
- **Allergens**: blank in the PPTX. Where a matching dish exists on the à la carte
  PDF, its allergen tags were copied in and labeled "unverified — from guest menu."
- **Prep/cook times, chef notes, plating notes**: left blank where not present in
  any source, for the kitchen to fill in.

## How the approval workflow works

1. Anyone opens a recipe → the edit form → makes changes → **admin** hits "Save
   changes" (goes live immediately) or **kitchen staff** hits "Send for approval"
   (creates a pending request).
2. Admin dashboard → Pending requests → shows what changed → **Approve**, **Reject**,
   or **Ask for clarification** (visible to the requester under "My requests").
3. On approval, the recipe updates, its version number increments, and the full
   previous version is stored — visible any time via "Version history."

## Good to know

- **Photos are stored directly in Firestore** as compressed JPEGs, not on separate
  file storage — simplest option, no extra setup required.
- **Costing is admin-only** for now — say the word if you'd like kitchen staff to
  see it too.
- **Pending "full recipe edit" requests** show a summary of which fields changed;
  use "Open dish to compare" for a full side-by-side on ingredient/method wording.
