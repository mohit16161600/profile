# GitHub Pages Ads.txt Redirect Setup for Ezoic

Since GitHub Pages doesn't support server-side redirects (like .htaccess), you need to use one of these solutions:

## Option 1: Use Cloudflare (Recommended) ✅

If you're using Cloudflare in front of your GitHub Pages site:

1. Go to Cloudflare Dashboard → Rules → Redirect Rules
2. Create a new redirect rule:
   - **Source URL**: `mohitkoli.info/ads.txt`
   - **Destination URL**: `https://srv.adstxtmanager.com/19390/mohitkoli.info`
   - **Status Code**: 301 (Permanent Redirect)

This is the **best solution** as it provides a true server-side redirect.

## Option 2: Use Netlify

If you deploy to Netlify (even if source is GitHub):

1. The `_redirects` file has been created in your repo
2. Netlify will automatically use it
3. Deploy your site to Netlify

The `_redirects` file contains:
```
/ads.txt  https://srv.adstxtmanager.com/19390/mohitkoli.info  301
```

## Option 3: Update ads.txt Directly (Temporary)

If you can't use redirects, update the `ads.txt` file to point directly to Ezoic:

1. The `ads.txt` file currently contains the Ezoic manager URL
2. This isn't a true redirect, but some ad networks may accept it
3. **Note**: Ezoic prefers a redirect, so this is not ideal

## Option 4: Custom Domain with Redirect Service

If you have a custom domain:

1. Configure DNS to use a service that supports redirects
2. Set up the redirect at the DNS/hosting provider level
3. Point `/ads.txt` to the Ezoic manager URL

## Current Setup

- ✅ `_redirects` file created (for Netlify)
- ✅ `ads.txt` updated with Ezoic manager URL
- ✅ `404.html` created with JavaScript redirect fallback
- ✅ `.htaccess` redirect commented out (doesn't work on GitHub Pages)

## Recommended Action

**Use Cloudflare** if possible - it's the most reliable solution for GitHub Pages sites with custom domains.

## Testing

After setup, test the redirect:
```bash
curl -I https://www.mohitkoli.info/ads.txt
```

You should see a `301` or `302` redirect response.

