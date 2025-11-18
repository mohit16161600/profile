# Cloudflare Redirect Setup for ads.txt (GitHub Pages)

## Why This is Needed
GitHub Pages serves `ads.txt` as a plain text file and **cannot perform server-side redirects**. To properly redirect `/ads.txt` to Ezoic's manager, you need to use Cloudflare Page Rules.

## Step-by-Step Setup

### 1. Sign Up for Cloudflare (Free)
- Go to https://cloudflare.com
- Create a free account
- Add your domain `mohitkoli.info`

### 2. Update DNS Nameservers
- Cloudflare will provide nameservers
- Update your domain's nameservers at your registrar
- Wait for DNS propagation (usually 5-30 minutes)

### 3. Create Page Rule for ads.txt Redirect

**Option A: Using Page Rules (Classic)**
1. Go to **Rules** → **Page Rules**
2. Click **Create Page Rule**
3. Enter:
   - **URL**: `mohitkoli.info/ads.txt`
   - **Setting**: **Forwarding URL**
   - **Status Code**: **301 - Permanent Redirect**
   - **Destination URL**: `https://srv.adstxtmanager.com/19390/mohitkoli.info`
4. Click **Save and Deploy**

**Option B: Using Redirect Rules (New)**
1. Go to **Rules** → **Redirect Rules**
2. Click **Create rule**
3. Configure:
   - **Rule name**: `ads.txt redirect`
   - **If URL matches**: `mohitkoli.info/ads.txt`
   - **Then**: Redirect to `https://srv.adstxtmanager.com/19390/mohitkoli.info`
   - **Status code**: `301`
4. Click **Deploy**

### 4. Test the Redirect

After setup, test with:
```bash
curl -I https://www.mohitkoli.info/ads.txt
```

Expected response:
```
HTTP/2 301
location: https://srv.adstxtmanager.com/19390/mohitkoli.info
```

### 5. Verify in Browser
Visit: `https://www.mohitkoli.info/ads.txt`
- Should automatically redirect to Ezoic's manager
- You should see the Ezoic ads.txt content

## Important Notes

- ✅ Cloudflare free plan includes 3 Page Rules (enough for this)
- ✅ This works for all automated crawlers (ad networks)
- ✅ True server-side redirect (301 status)
- ✅ No code changes needed

## Alternative: If You Can't Use Cloudflare

If you cannot use Cloudflare, the current `ads.txt` file contains the direct URL. Some ad networks may accept this, but Ezoic prefers a proper redirect.

## Troubleshooting

**Redirect not working?**
- Check DNS propagation: https://www.whatsmydns.net
- Verify Page Rule is active in Cloudflare dashboard
- Clear browser cache
- Wait 5-10 minutes for changes to propagate

**Still having issues?**
- Contact Ezoic support for alternative solutions
- Consider using Netlify instead of GitHub Pages

