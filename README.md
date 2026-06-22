# Kandavel Lifestyle Website

Official website for **Kandavel Lifestyle** and **Margit Vintages** — hosted free on GitHub Pages at [kandavel.lifestyle](https://kandavel.lifestyle).

## Pages

| Page | URL |
|------|-----|
| Home | `/index.html` |
| About Us | `/about.html` |
| Products | `/products.html` |
| Contact Us | `/contact.html` |
| Privacy Policy | `/privacy-policy.html` |

## Free Hosting Setup (GitHub Pages + Dynadot)

### Step 1: Push to GitHub

```bash
cd "/Volumes/T7 Shield/Software Projects/kandavellifestyle"
git init
git add .
git commit -m "Initial Kandavel Lifestyle website"
git branch -M main
git remote add origin https://github.com/soori26-coder/kandavel-lifestyle.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Click **Save**
5. Under **Custom domain**, enter: `kandavel.lifestyle`
6. Enable **Enforce HTTPS** (may take up to 24 hours after DNS propagates)

The `CNAME` file in this repo already contains `kandavel.lifestyle`.

### Step 3: Configure DNS at Dynadot

Log in to [Dynadot](https://www.dynadot.com/) → **My Domains** → `kandavel.lifestyle` → **DNS Settings**

**For apex domain (kandavel.lifestyle):** Add these **A records**:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For www subdomain (optional):** Add a **CNAME record**:

| Type | Host | Value |
|------|------|-------|
| CNAME | www | soori26-coder.github.io |

DNS propagation takes 5 minutes to 48 hours.

### Step 4: Verify

- https://kandavel.lifestyle
- https://kandavel.lifestyle/privacy-policy.html
- https://kandavel.lifestyle/about.html

## Pinterest App Registration

Use these URLs when registering **Axenity Atelier OS** at [developers.pinterest.com](https://developers.pinterest.com):

- **Website:** `https://kandavel.lifestyle`
- **Privacy Policy:** `https://kandavel.lifestyle/privacy-policy.html`

## Product Images

Place Margit Vintages product photos in `assets/images/`:

- `world-explorer.jpg`
- `tugboat.jpg`
- `west-coast-surf.jpg`
- `cactus-tour.jpg`
- `skateboarding.jpg`
- `longboard.jpg`
- `be-wild.jpg`

The products page shows styled placeholders until images are added.

## Contact Form (Formspree)

The contact form uses [@formspree/ajax](https://github.com/formspree/formspree-js/tree/master/packages/formspree-ajax) (CDN) to send inquiries to **suresh.d@kandavel.lifestyle**.

### One-time setup

1. Sign up at [formspree.io](https://formspree.io) and create a form
2. Set the notification email to `suresh.d@kandavel.lifestyle`
3. Copy your form ID (e.g. `mnjkqjya` from `https://formspree.io/f/mnjkqjya`)
4. Set it in `js/config.js`:

```javascript
formspreeFormId: 'mnjkqjya',
```

5. In Formspree → **Settings** → **Restrict to Domain**: `kandavel.lifestyle` (not `www.`)
6. Commit and push

## Local Preview

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080
