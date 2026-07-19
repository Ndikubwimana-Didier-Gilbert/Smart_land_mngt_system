# LandTrack — Smart Land Management System (SLMS)

**Made with**
 — HTML, CSS, and JavaScript,JSON and Ajax only (no backend, no database server)

---
**Deployed Version** : [https://slms-rw.netlify.app]


## 1. What the project does

LandTrack lets a land owner submit an application to register a parcel of land, and lets an administrator review, approve, or reject that application. It is split into two parts:

- **Public zone** — no login required. Anyone can submit an application or check its status.
- **Admin zone** — login required(`use these credentials for testing purposes on login page and click login to view admin zone webpages: username=>admin,password=>admin123`). Staff manage owners, locations, parcels, and applications.

This mirrors how a real land registry works: the public interacts with the front desk (submitting requests), while staff behind the scenes manage the actual records.

---

## 2. Why there is no real database

The assignment requires HTML, CSS, and JavaScript only — no backend language (PHP, Node, etc.) and no database server (MySQL, etc.). Since a browser cannot connect directly to a database, this project simulates one using:

- **JSON files** (`/data/*.json`) — hold the actual records, structured exactly like the database tables in the design (`owner`, `location`, `parcel`, `application`, `admin`).
- **AJAX** (`XMLHttpRequest`) — loads those JSON files into the page when it opens.
- **Plain JavaScript arrays** — hold the data in memory once loaded, so the page can search, filter, and display it.

**Important limitation:** a browser can *read* a JSON file, but it cannot *write back* to it. So any record added during a session (a new application, a new parcel, etc.) only exists in memory for as long as that page stays open. Refreshing the page reloads the original JSON file, so anything added disappears. This is expected and is a direct, honest consequence of "frontend only, no backend" — not a bug.

---

## 3. Folder structure

```
land-management-system/
├── index.html                 Landing page
├── apply.html                 Public application form
├── track.html                 Public status tracker
│
├── admin/
│   ├── login.html              Admin login
│   ├── dashboard.html           Stats overview
│   ├── owners.html              Manage owners
│   ├── locations.html           Manage locations
│   ├── parcels.html             Manage parcels (links owner + location + admin)
│   └── applications.html        Review applications, change status
│
├── css/
│   ├── navbar.css               Navbar styles (shared)
│   ├── style.css                General page + landing page styles
│   ├── forms.css                Form pages (apply, track, login)
│   ├── admin.css                Admin header/nav layout
│   └── tables.css               Data tables in admin pages
│
├── js/
│   ├── db.js                    Shared helpers: arrays, AJAX loader, ID generator
│   ├── navbar.js                Mobile menu toggle
│   ├── admin-common.js          Login check + carries session between admin pages
│   ├── index.js                 Loads landing page stats
│   ├── apply.js                 Handles the public application form
│   ├── track.js                 Handles the status lookup
│   ├── login.js                 Handles admin login
│   ├── dashboard.js              Dashboard stats
│   ├── owners.js / locations.js / parcels.js / applications.js / admins.js
│
└── data/
    ├── owners.json
    ├── locations.json
    ├── parcels.json
    ├── applications.json
    ├── admins.json
    └── stats.json
```

---

## 4. How the database design maps to this project

| Table (from design) | JSON file | Used on |
|---|---|---|
| `owner` | `owners.json` | apply.html, admin/owners.html, admin/parcels.html |
| `location` | `locations.json` | admin/locations.html, admin/parcels.html |
| `parcel` | `parcels.json` | apply.html, track.html, admin/parcels.html, admin/applications.html |
| `application` | `applications.json` | apply.html, track.html, admin/applications.html |
| `admin` | `admins.json` | admin/login.html, admin/admins.html |

The relationships from the design are enforced in the interface itself, since there is no database to enforce them automatically:

- **Location contains parcels** → in `parcels.html`, the location is chosen from a dropdown built from `locations.json`, not typed freely.
- **Owner owns parcels** → same idea, owner is chosen from a dropdown built from `owners.json`.
- **Parcel has applications** → every application record stores a `parcel_id`, and `track.html`/`admin/applications.html` look that ID up in `parcels.json` to show location and land type alongside the status.
- **Admin manages/processes applications** → changing an application's status in `admin/applications.html` writes the current logged-in admin's username into that application's `processed_by` field.

---

## 5. How every page works

### `index.html` (Landing page)
Static content (hero, how-it-works, features, about) plus one dynamic part: the stats strip. `js/index.js` uses AJAX to load `data/stats.json` and fills in the three numbers (parcels registered, districts covered, applications processed).

### `apply.html` (Public application form)
A single form collecting owner details, location details, and parcel details together. On submit, `js/apply.js`:
1. Checks `owners.json` (already loaded via AJAX) to see if this national ID already has an owner record — reuses it if so, creates a new one if not.
2. Creates a new `location` record.
3. Creates a new `parcel` record, linking the owner and location by their IDs.
4. Creates a new `application` record with status `"submitted"`, linked to the new parcel.
5. Shows the applicant their new `app_id` so they can track it later.

### `track.html` (Public status tracker)
Loads `applications.json` and `parcels.json` via AJAX. When the applicant types an `app_id` and submits, a plain loop searches for a matching application, then a second loop finds the linked parcel to show its location and land type alongside the status. A colored badge (gray/blue/green/red) shows the status at a glance.

### `admin/login.html`
Loads `admins.json` via AJAX. On submit, checks the typed username/password against the records. If it matches, redirects to `dashboard.html` with the admin's username, role, and admin_id attached to the URL as a query string — e.g. `dashboard.html?username=admin&role=super_admin&admin_id=ADM-1000`.

> **Note on security:** passwords are compared as plain text here, since there is no server to hash and verify them safely. This is only acceptable because it's a frontend-only demo project — a real system would never store or compare passwords this way.

### Why the URL carries the login info
Since this project doesn't use `localStorage` or `sessionStorage`, there is no way for one page to "remember" that an admin logged in once the browser moves to a different HTML page — each page reload starts JavaScript fresh. The workaround: pass the admin's username, role, and ID through the page's URL as a query string, and read it back out with plain string splitting (see `getQueryParam()` in `js/db.js`). Every admin page runs `protectAdminPage()` (in `js/admin-common.js`) which:
1. Reads the login info from the URL.
2. Sends the browser back to `login.html` if it's missing.
3. Rewrites every link in the admin navigation bar to carry that same query string forward, so clicking "Owners" or "Parcels" doesn't lose the "session."

### `admin/dashboard.html`
Runs `protectAdminPage()`, then loads `parcels.json`, `owners.json`, and `applications.json` via AJAX to calculate and display simple counts (total parcels, total owners, pending applications, approved applications).

### `admin/owners.html` and `admin/locations.html`
Both follow the same pattern: load the JSON file, display it as a table, and provide a small form to add a new record (pushed into the in-memory array and re-rendered). Each row has a delete button that removes that record from the array.

### `admin/parcels.html`
The most connected page. It loads `owners.json` and `locations.json` to build two dropdown menus (so a parcel can only reference owners/locations that actually exist), and loads `parcels.json` to display the existing list. Submitting the form creates a new parcel record linking the selected owner, selected location, and the currently logged-in admin's ID.

### `admin/applications.html`
Loads `parcels.json` (to show a readable label instead of a raw ID) and `applications.json`. Each row has a status dropdown instead of an add form, since applications are only ever created by the public `apply.html` page — admin's job here is to review and change status, not create new ones. Changing a status also stamps `processed_by` with the current admin's username.

### `admin/admins.html`
Same list + add pattern as owners/locations, for managing who can log in to the admin zone.

---

## 6. Where AJAX is used

`XMLHttpRequest` itself is only written once, inside `loadJSON()` in `js/db.js`. Every page loads `db.js` first, then calls `loadJSON(url, callback)` whenever it needs data:

| Page | Loads (via AJAX) |
|---|---|
| `index.html` | `stats.json` |
| `apply.html` | `owners.json`, `locations.json`, `parcels.json`, `applications.json` |
| `track.html` | `applications.json`, `parcels.json` |
| `admin/login.html` | `admins.json` |
| `admin/dashboard.html` | `parcels.json`, `owners.json`, `applications.json` |
| `admin/owners.html` | `owners.json` |
| `admin/locations.html` | `locations.json` |
| `admin/parcels.html` | `owners.json`, `locations.json`, `parcels.json` |
| `admin/applications.html` | `parcels.json`, `applications.json` |
| `admin/admins.html` | `admins.json` |

## 7. Data flow summary (in words)

1. A visitor opens `apply.html`. It fetches the existing `owners.json` in the background using AJAX.
2. They fill in the form and submit. New owner (if needed), location, parcel, and application records are created as JavaScript objects and pushed into in-memory arrays.
3. They receive an `app_id` and can immediately check it on `track.html` (same browser session) — but this only works because both pages exist in the same browser tab's flow; if they close the tab, the new application is not in the JSON file for next time, only the original seed data is.
4. An admin logs in through `admin/login.html`, which checks credentials against `admins.json` and redirects to the dashboard with login info in the URL.
5. The admin moves between `owners.html`, `locations.html`, `parcels.html`, and `applications.html` — each page reloads the seed data from its JSON file fresh, and the URL query string keeps the "logged in as ___" state visible on every page.
6. Any additions or status changes an admin makes exist only for that browsing session, for the same reason described in section 2.

---

## 8. How to run the project

Because `js/db.js` uses AJAX (`XMLHttpRequest`) to load local JSON files, some browsers block this if you simply double-click `index.html` to open it directly from the file system. To avoid this, serve the folder through a simple local server, for example:

```
python3 -m http.server
```

then open `http://localhost:8000` in the browser. Alternatively, use a "Live Server" style extension in your code editor.`Note-that: running the project locally without using web server will cause the json fetching not work as the browser will block that for security reasons`

---

## 9. Known limitations (by design, given the "frontend only" constraint)

- No data persists after a page refresh or browser restart — the JSON files always reset to their seed data.
- Passwords are stored and compared in plain text, since there is no backend to hash them securely.
- There is no real access control preventing someone from typing an admin URL directly, beyond the URL query string check — a determined user could bypass it by guessing a URL with `?username=...` attached. Real access control requires a server-side session, which is outside this project's scope.
- Deleting or adding records only affects the current browser tab's memory, not the actual JSON files on disk.

These limitations exist because the assignment specifically requires a frontend-only solution with no backend or database server — they are not oversights, but direct consequences of that constraint, and are worth mentioning if asked during a project defense.

---

