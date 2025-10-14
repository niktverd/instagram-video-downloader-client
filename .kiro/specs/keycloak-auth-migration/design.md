# Design Document: Keycloak Authentication Migration

## Overview

This design document outlines the technical approach for migrating from Firebase Authentication to Keycloak. The migration will replace Firebase SDK calls with Keycloak JavaScript adapter (@keycloak/keycloak-js) while maintaining the existing UI components and user experience. The design follows a modular approach, isolating authentication logic in utility functions and context providers to minimize changes across the application.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              AuthContext (Provider)                     │ │
│  │  - Manages authentication state                        │ │
│  │  - Provides currentUser, userLoggedIn, loading         │ │
│  │  - Handles token refresh                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Keycloak Utilities (src/auth/utils.ts)         │ │
│  │  - doSignInWithEmailAndPassword()                      │ │
│  │  - doCreateUserWithEmailAndPassword()                  │ │
│  │  - doSignInWithGoogle()                                │ │
│  │  - doSignOut()                                         │ │
│  │  - getAccessToken()                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │      Keycloak Configuration (src/configs/keycloak.ts)  │ │
│  │  - Initialize Keycloak instance                        │ │
│  │  - Environment-based configuration                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Keycloak Server      │
              │   - User Management    │
              │   - Token Generation   │
              │   - OAuth/OIDC Flow    │
              └────────────────────────┘
```

### Authentication Flow

#### Standard Login Flow

```
User → Login Component → doSignInWithEmailAndPassword()
  → Keycloak.login() → Keycloak Server → Token Response
  → Store Token → Update AuthContext → Redirect to Home
```

#### OAuth/Google Login Flow

```
User → Click "Continue with Google" → doSignInWithGoogle()
  → Keycloak.login({idpHint: 'google'}) → Redirect to Google
  → Google Auth → Redirect back to Keycloak → Token Response
  → Store Token → Update AuthContext → Redirect to Home
```

#### Token Refresh Flow

```
API Request → 401 Response → Check Token Expiry
  → Keycloak.updateToken() → New Token → Retry Request
```

## Components and Interfaces

### 1. Keycloak Configuration Module

**File:** `src/configs/keycloak.ts`

**Purpose:** Initialize and export Keycloak instance with environment-specific configuration.

**Interface:**

```typescript
interface KeycloakConfig {
  url: string; // Keycloak server URL
  realm: string; // Keycloak realm name
  clientId: string; // Client ID for the application
}

export const keycloakInstance: Keycloak;
export const initKeycloak: () => Promise<boolean>;
```

**Configuration:**

- Read from environment variables: `VITE_KEYCLOAK_URL`, `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID`
- Support separate preprod configuration: `VITE_KEYCLOAK_URL_PREPROD`, etc.
- Initialize with options: `{ onLoad: 'check-sso', pkceMethod: 'S256' }`

### 2. Authentication Utilities Module

**File:** `src/auth/utils.ts`

**Purpose:** Provide authentication functions that abstract Keycloak operations.

**Functions:**

```typescript
// Sign in with email and password
export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void>

// Create new user account
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void>

// Sign in with Google OAuth
export const doSignInWithGoogle = async (): Promise<void>

// Sign out current user
export const doSignOut = async (): Promise<void>

// Get current access token
export const getAccessToken = (): string | undefined

// Refresh token if needed
export const refreshToken = async (minValidity?: number): Promise<boolean>

// Check if user is authenticated
export const isAuthenticated = (): boolean
```

**Implementation Notes:**

- `doSignInWithEmailAndPassword`: Use Keycloak's Resource Owner Password Credentials flow or redirect to login page with username hint
- `doCreateUserWithEmailAndPassword`: Call Keycloak Admin API or redirect to registration page
- `doSignInWithGoogle`: Use `keycloak.login({ idpHint: 'google' })`
- Token management: Use Keycloak's built-in token refresh mechanism

### 3. Authentication Context Provider

**File:** `src/contexts/AuthContext.tsx`

**Purpose:** Manage global authentication state and provide it to the application.

**Interface:**

```typescript
interface AuthContextType {
  currentUser: KeycloakUser | null;
  userLoggedIn: boolean;
  loading: boolean;
  refreshAuth: () => Promise<void>;
}

interface KeycloakUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  preferredUsername?: string;
}
```

**Responsibilities:**

- Initialize Keycloak on mount
- Listen to Keycloak authentication events
- Update state when authentication changes
- Provide user information from token claims
- Handle token refresh automatically

### 4. UI Components

**Files:**

- `src/components/auth/Login.tsx`
- `src/components/auth/Registration.tsx`
- `src/pages/AuthPage/AuthPage.tsx`

**Changes:**

- Minimal changes to UI components
- Update imports from `src/auth/utils.ts`
- Error handling for Keycloak-specific errors
- Maintain existing UI/UX

### 5. HTTP Interceptor/Fetch Helper

**File:** `src/utils/fetchHelpers.ts` (to be updated)

**Purpose:** Automatically include authentication tokens in API requests.

**Implementation:**

```typescript
// Wrapper around fetch that adds auth token
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  const token = getAccessToken();

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  const response = await fetch(url, {...options, headers});

  // Handle 401 - attempt token refresh
  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      // Retry with new token
      const newToken = getAccessToken();
      headers['Authorization'] = `Bearer ${newToken}`;
      return fetch(url, {...options, headers});
    }
  }

  return response;
};
```

## Data Models

### User Model (from Keycloak Token)

```typescript
interface KeycloakTokenParsed {
  exp: number; // Token expiration
  iat: number; // Issued at
  sub: string; // Subject (user ID)
  email: string; // User email
  email_verified: boolean; // Email verification status
  name?: string; // Full name
  preferred_username?: string; // Username
  given_name?: string; // First name
  family_name?: string; // Last name
  realm_access?: {
    // Realm roles
    roles: string[];
  };
}
```

### Keycloak Configuration Model

```typescript
interface KeycloakInitOptions {
  onLoad: 'login-required' | 'check-sso';
  checkLoginIframe: boolean;
  pkceMethod: 'S256';
  flow: 'standard' | 'implicit' | 'hybrid';
}
```

## Error Handling

### Error Types and Handling Strategy

1. **Network Errors**
   - Catch: Connection failures, timeouts
   - Action: Display "Network error. Please try again"
   - Log: Full error details for debugging

2. **Invalid Credentials**
   - Catch: 401 from Keycloak
   - Action: Display "Invalid email or password"
   - Log: Attempt timestamp and username (not password)

3. **Service Unavailable**
   - Catch: 503 or connection refused
   - Action: Display "Authentication service unavailable"
   - Log: Service status and error details

4. **Token Expiration**
   - Catch: Expired token during API call
   - Action: Attempt automatic refresh, fallback to login redirect
   - Log: Token expiry time and refresh attempt result

5. **Registration Errors**
   - Catch: User already exists (409)
   - Action: Display "An account with this email already exists"
   - Log: Registration attempt details

### Error Handling Implementation

```typescript
class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

const handleAuthError = (error: unknown): AuthError => {
  // Map Keycloak errors to user-friendly messages
  if (error instanceof Error) {
    if (error.message.includes('Invalid credentials')) {
      return new AuthError('Invalid email or password', 'INVALID_CREDENTIALS', error);
    }
    // ... other error mappings
  }

  return new AuthError('An unexpected error occurred', 'UNKNOWN_ERROR', error);
};
```

## Testing Strategy

### Unit Tests

1. **Authentication Utilities Tests** (`src/auth/utils.test.ts`)
   - Test each authentication function with mocked Keycloak instance
   - Verify correct Keycloak methods are called with correct parameters
   - Test error handling for each function
   - Test token refresh logic

2. **AuthContext Tests** (`src/contexts/AuthContext.test.tsx`)
   - Test initialization with authenticated user
   - Test initialization with unauthenticated user
   - Test state updates on authentication events
   - Test token refresh triggers

3. **Component Tests**
   - Test Login component with valid/invalid credentials
   - Test Registration component with valid/invalid data
   - Test OAuth button click behavior
   - Test loading states and error displays

### Integration Tests

1. **Authentication Flow Tests**
   - Test complete login flow from form submission to redirect
   - Test registration flow
   - Test OAuth flow (with mocked OAuth provider)
   - Test logout flow

2. **Protected Route Tests**
   - Test access to protected routes when authenticated
   - Test redirect to login when unauthenticated
   - Test token refresh on protected routes

3. **API Integration Tests**
   - Test API calls include correct Authorization header
   - Test 401 handling and token refresh
   - Test API calls after token refresh

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new account
- [ ] Register with existing email
- [ ] Login with Google OAuth
- [ ] Logout functionality
- [ ] Token refresh on API call
- [ ] Session persistence across page refresh
- [ ] Protected route access when authenticated
- [ ] Protected route redirect when unauthenticated
- [ ] Error messages display correctly
- [ ] Loading states work correctly

## Migration Strategy

### Phase 1: Setup and Configuration

1. Install @keycloak/keycloak-js package
2. Create Keycloak configuration file
3. Add Keycloak environment variables
4. Initialize Keycloak instance

### Phase 2: Core Authentication

1. Update authentication utilities to use Keycloak
2. Update AuthContext to use Keycloak
3. Test basic login/logout functionality

### Phase 3: UI Integration

1. Update Login component
2. Update Registration component
3. Update OAuth flow
4. Test all authentication UI flows

### Phase 4: API Integration

1. Update fetch helpers to include Keycloak tokens
2. Implement token refresh on 401
3. Test API authentication

### Phase 5: Cleanup

1. Remove Firebase dependencies
2. Remove Firebase configuration
3. Update environment variables
4. Remove unused Firebase code

### Phase 6: Testing and Validation

1. Run all unit tests
2. Run integration tests
3. Perform manual testing
4. Validate in preprod environment

## Security Considerations

1. **Token Storage**
   - Keycloak tokens stored in memory by default (secure)
   - Avoid localStorage for sensitive tokens
   - Use httpOnly cookies if possible

2. **PKCE Flow**
   - Use PKCE (Proof Key for Code Exchange) for OAuth flows
   - Configured in Keycloak init options

3. **Token Refresh**
   - Implement automatic token refresh before expiration
   - Use refresh tokens securely
   - Clear tokens on logout

4. **HTTPS**
   - Ensure all Keycloak communication over HTTPS in production
   - Configure CORS properly on Keycloak server

5. **Client Configuration**
   - Use public client type in Keycloak (no client secret in frontend)
   - Configure valid redirect URIs
   - Set appropriate token lifetimes

## Dependencies

### New Dependencies

- `@keycloak/keycloak-js`: ^25.0.0 (Keycloak JavaScript adapter)

### Dependencies to Remove

- `firebase`: ^11.5.0 (complete removal after migration)

### Environment Variables

**New Variables:**

```
VITE_KEYCLOAK_URL=https://keycloak.example.com
VITE_KEYCLOAK_REALM=my-realm
VITE_KEYCLOAK_CLIENT_ID=instagram-video-downloader

VITE_KEYCLOAK_URL_PREPROD=https://keycloak-preprod.example.com
VITE_KEYCLOAK_REALM_PREPROD=my-realm-preprod
VITE_KEYCLOAK_CLIENT_ID_PREPROD=instagram-video-downloader-preprod
```

**Variables to Remove:**

```
VITE_FIREBASE_CONFIG
VITE_FIREBASE_CONFIG_PREPROD
```

## Rollback Plan

If issues arise during migration:

1. **Immediate Rollback**
   - Revert code changes via git
   - Restore Firebase environment variables
   - Redeploy previous version

2. **Partial Rollback**
   - Keep Keycloak code but feature-flag it
   - Allow switching between Firebase and Keycloak via environment variable
   - Gradual migration of users

3. **Data Considerations**
   - User accounts in Firebase remain intact
   - May need to migrate user data to Keycloak
   - Consider dual-authentication period for smooth transition
