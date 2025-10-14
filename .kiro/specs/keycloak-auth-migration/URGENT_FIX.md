# URGENT FIX - 401 Unauthorized Error

## Problem Identified ✓

Your Keycloak server logs show the root cause:

```
Failed to parse realm frontendUrl 'passport-center.unico.rn.it'
Caused by: java.net.MalformedURLException: no protocol
```

## The Fix (5 minutes)

### In Keycloak Admin Console:

1. **Log in**: Go to `https://keycloak.dev.unico.rn.it/admin`
2. **Select Realm**: Choose `unico-dev` from the dropdown
3. **Go to Realm Settings** → General tab
4. **Find "Frontend URL"** field
5. **Current value**: `passport-center.unico.rn.it` ❌
6. **Change to**: `https://passport-center.unico.rn.it` ✓
7. **Click Save**

### Why This Fixes It

The Frontend URL is used by Keycloak to construct redirect URLs and validate requests. Without the protocol (`https://`), Java's URL parser throws a `MalformedURLException`, causing all authentication to fail with 401 errors.

## After Fixing

1. Clear your browser cache/cookies
2. Restart your dev server (if needed)
3. Try logging in again

The 401 error should be resolved immediately after fixing the Frontend URL.

## Additional Configuration (if still issues)

If you still have problems after fixing the Frontend URL, check:

### Client Configuration (`video-client`)

- **Access Type**: public
- **Valid Redirect URIs**:
  - `http://localhost:5173/*`
  - `http://localhost:3000/*`
  - `https://passport-center.unico.rn.it/*`
- **Web Origins**:
  - `http://localhost:5173`
  - `http://localhost:3000`
  - `https://passport-center.unico.rn.it`

## Code Changes Already Made

I've already updated your code to use `check-sso` instead of `login-required` in `src/index.tsx`. This provides better error handling and doesn't force immediate login.

## Need Help?

If the issue persists after fixing the Frontend URL, share:

1. The new error message from browser console
2. Any new errors from Keycloak server logs
