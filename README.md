# Kitchen Order Board

A live, shared ordering board that replaces the paper market list. 204 items across
6 categories (Vegetables & Fruits, Dry Products, Protein, Dairy, Bread, Pastry),
with search, live sync across every device, an admin-only order summary with
category filters, and order history.

## Setup (about 10 minutes, free)

### 1. Create a Firebase project
- Go to https://console.firebase.google.com → **Add project** → give it a name (e.g. `kitchen-order-board`) → follow the prompts (you can disable Google Analytics, it's not needed).

### 2. Create a Firestore database
- In the left sidebar: **Build → Firestore Database → Create database**.
- Choose **Start in production mode** (we'll set custom rules in step 5) and pick a region close to you.

### 3. Register a Web App to get your config
- Project overview (gear icon) → **Project settings** → scroll to "Your apps" → click the **</>** (Web) icon.
- Give it a nickname, click **Register app**. Firebase shows you a `firebaseConfig` object.
- Copy that object.

### 4. Paste your config into index.html
- Open `index.html` in this folder.
- Find this block near the top of the `<script type="module">` section:
  ```js
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    ...
  };
  ```
- Replace it with the config Firebase gave you in step 3.

### 5. Set Firestore security rules
- In Firebase console: **Firestore Database → Rules** tab.
- Replace the contents with what's in `firestore.rules` (included in this folder), then **Publish**.
- Note: these rules allow anyone with the app URL to read/write the board — fine for
  an internal tool on an unlisted URL, but don't post the link publicly. If you want
  real access control later, add Firebase Authentication (I can help with that).

### 6. Change the admin PIN
- In `index.html`, find `const ADMIN_PIN = "2580";` near the top of the script and change it to your own PIN before sharing the app.

### 7. Deploy for free — GitHub Pages (simplest, no CLI needed)
1. Create a new **public** GitHub repo (e.g. `kitchen-order-board`).
2. Upload `index.html` to the repo (drag-and-drop on GitHub's web UI works fine — you don't need git installed).
3. Repo → **Settings → Pages** → under "Build and deployment", set Source to **Deploy from a branch**, branch **main**, folder **/ (root)** → Save.
4. After a minute, GitHub shows your live URL: `https://<your-username>.github.io/kitchen-order-board/`
5. Share that URL with your 15 staff + 2 admins.

Any device that opens the URL will see live updates the moment anyone else taps `+`/`−` —
no refresh needed.

## Using it
- **Everyone**: search, tap `+`/`−` on any item, enter your name once (remembered on your device).
- **Admins**: tap **Admin**, enter the PIN once (remembered on that device) to unlock the
  **Summary** button — a single filterable view of everything currently requested,
  with a "Mark sent & clear board" action that saves the order to **History** before
  clearing it for the next round.
