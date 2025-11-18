# ⚠️ URGENT: Cloudflare Setup Required for ads.txt Redirect

## Current Situation
- ✅ Your `ads.txt` file now contains the actual Ezoic content (works for ad networks)
- ❌ **BUT** Ezoic requires a **redirect**, not direct content
- ❌ GitHub Pages **CANNOT** do server-side redirects

## Why Redirect is Required
Ezoic's Ads.txt Manager needs to **dynamically update** your ads.txt file. When you have the content directly in the file, Ezoic cannot update it automatically. They need a redirect so they can manage it centrally.

## ✅ SOLUTION: Set Up Cloudflare (Takes 10 Minutes)

### Step 1: Sign Up for Cloudflare (Free)
1. Go to: https://dash.cloudflare.com/sign-up
2. Create a free account
3. Click **"Add a Site"**
4. Enter: `mohitkoli.info`
5. Select **Free Plan** (click Continue)

### Step 2: Update DNS Nameservers
1. Cloudflare will show you **2 nameservers** (e.g., `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
2. Go to your domain registrar (where you bought mohitkoli.info)
3. Find **DNS Settings** or **Nameservers**
4. Replace current nameservers with Cloudflare's nameservers
5. Save and wait 5-30 minutes for propagation

### Step 3: Create Redirect Rule
Once DNS is active:

**Method 1: Redirect Rules (Recommended - New Interface)**
1. Go to: **Rules** → **Redirect Rules**
2. Click **Create rule**
3. Fill in:
   - **Rule name**: `ads.txt Ezoic redirect`
   - **If URL matches**: 
     - Field: `URI Path`
     - Operator: `equals`
     - Value: `/ads.txt`
   - **Then**:
     - Action: `Dynamic redirect`
     - Status code: `301`
     - Redirect URL: `https://srv.adstxtmanager.com/19390/mohitkoli.info`
4. Click **Deploy**

**Method 2: Page Rules (Classic Interface)**
1. Go to: **Rules** → **Page Rules**
2. Click **Create Page Rule**
3. Enter: `mohitkoli.info/ads.txt`
4. Click **Add a Setting** → Select **Forwarding URL**
5. Enter: `https://srv.adstxtmanager.com/19390/mohitkoli.info`
6. Select: **301 - Permanent Redirect**
7. Click **Save and Deploy**

### Step 4: Test
After 5-10 minutes, test:
```bash
curl -I https://www.mohitkoli.info/ads.txt
```

You should see:
```
HTTP/2 301
location: https://srv.adstxtmanager.com/19390/mohitkoli.info
```

Or visit in browser: `https://www.mohitkoli.info/ads.txt` - should redirect automatically.

## Why This Works
- ✅ Cloudflare sits **in front** of GitHub Pages
- ✅ Cloudflare can do **server-side redirects** (301 status)
- ✅ All ad network crawlers will follow the redirect
- ✅ Ezoic can update ads.txt content dynamically
- ✅ **Free plan includes this feature**

## Alternative: If You Can't Use Cloudflare

### Option 1: Use Netlify Instead of GitHub Pages
1. Sign up at https://netlify.com
2. Connect your GitHub repo
3. The `_redirects` file will work automatically
4. Update your domain DNS to point to Netlify

### Option 2: Contact Ezoic Support
- Explain you're on GitHub Pages
- Ask if they have alternative solutions
- They may have a workaround

## Current Status
- ✅ `ads.txt` contains valid Ezoic content (ad networks can read it)
- ⚠️ But Ezoic cannot update it automatically (they need redirect)
- ✅ Cloudflare setup will solve this completely

## Need Help?
- Cloudflare Support: https://support.cloudflare.com
- Ezoic Support: Contact them about GitHub Pages redirect setup

