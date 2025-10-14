# Debugging 401 Unauthorized Client Error

## Error Details

```
Request URL: https://keycloak.dev.unico.rn.it/realms/unico-dev/protocol/openid-connect/token
Status: 401 Unauthorized
Error: "unauthorized_client"
Error Description: "Invalid client or Invalid client credentials"
```

## Current Configuration

- Keycloak URL: `https://keycloak.dev.unico.rn.it`
- Realm: `unico-dev`
- Client ID: `video-client`

## Root Cause - IDENTIFIED

The Keycloak server logs reveal the actual issue:

```
Failed to parse realm frontendUrl 'passport-center.unico.rn.it'. Falling back to global value.
Caused by: java.net.MalformedURLException: no protocol: passport-center.unico.rn.it
```

**The realm's Frontend URL is missing the protocol (https://).**

This causes Keycloak to fail when processing authentication requests, resulting in the 401 error.

## Required Keycloak Client Configuration

### Step 1: Verify Client Exists

1. Log into Keycloak Admin Console: `https://keycloak.dev.unico.rn.it/admin`
2. Select realm: `unico-dev`
3. Go to Clients → Check if `video-client` exists
4. If it doesn't exist, create it

### Step 2: Fix Realm Frontend URL (CRITICAL)

**This is the main issue causing your 401 error.**

1. In Keycloak Admin Console, go to: Realm Settings (for `unico-dev`)
2. Go to the "General" tab
3. Find "Frontend URL" field
4. **Current (broken)**: `passport-center.unico.rn.it`
5. **Fix to**: `https://passport-center.unico.rn.it`
6. Click "Save"

The Frontend URL MUST include the protocol (`https://` or `http://`). Without it, Keycloak cannot parse URLs correctly and all authentication requests fail.

### Step 3: Configure Client Settings

The client must have these settings:

#### General Settings

- **Client ID**: `video-client`
- **Name**: Video Client (or any descriptive name)
- **Enabled**: ON
- **Client Protocol**: openid-connect

#### Access Settings

- **Access Type**: public (NOT confidential - frontend apps can't keep secrets)
- **Standard Flow Enabled**: ON
- **Direct Access Grants Enabled**: OFF (we're using standard flow, not password grants)
- **Implicit Flow Enabled**: OFF
- **Service Accounts Enabled**: OFF
- **Authorization Enabled**: OFF

#### Login Settings

- **Root URL**: `http://localhost:5173` (for dev) or your production URL
- **Valid Redirect URIs**:
  - `http://localhost:5173/*`
  - `http://localhost:3000/*`
  - Your production URL with `/*`
- **Valid Post Logout Redirect URIs**: Same as Valid Redirect URIs
- **Web Origins**:
  - `http://localhost:5173`
  - `http://localhost:3000`
  - Your production URL
- **Admin URL**: (leave empty for frontend clients)

#### Advanced Settings

- **Proof Key for Code Exchange Code Challenge Method**: S256 (enable PKCE)

### Step 4: Configure Google Identity Provider (for OAuth)

1. Go to Identity Providers in Keycloak
2. Add Google provider if not already configured
3. Set up Google OAuth credentials
4. Map attributes correctly

## Code Fixes Needed

### 1. Enable PKCE in initialization

The PKCE settings are commented out but should be enabled:

```typescript
// In src/index.tsx
<ReactKeycloakProvider
    authClient={keycloakInstance}
    initOptions={{
        onLoad: 'check-sso', // Changed from 'login-required'
        checkLoginIframe: false,
        pkceMethod: 'S256', // Enable PKCE
    }}
>
```

### 2. Update onLoad strategy

Change from `login-required` to `check-sso` to avoid forcing immediate login and allow the app to load first.

## Testing Steps

After configuration:

1. Clear browser cache and cookies
2. Restart the development server
3. Try accessing the application
4. Check browser console for any new errors
5. Verify redirect URIs match exactly (including port numbers)

## Common Issues

### Issue: Still getting 401

- **Check**: Client ID spelling is exact (case-sensitive)
- **Check**: Realm name is correct
- **Check**: Client is enabled in Keycloak
- **Check**: Access Type is set to "public"

### Issue: CORS errors

- **Check**: Web Origins are configured in Keycloak client
- **Check**: Origins match exactly (no trailing slashes)

### Issue: Redirect loop

- **Check**: Valid Redirect URIs include wildcard `/*`
- **Check**: onLoad is set to 'check-sso' not 'login-required'

## Next Steps

1. Verify/fix Keycloak client configuration
2. Update code to enable PKCE
3. Change onLoad to 'check-sso'
4. Test authentication flow
5. If still issues, check Keycloak server logs
