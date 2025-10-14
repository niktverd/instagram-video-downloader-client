# Implementation Plan

- [x] 1. Install Keycloak dependencies and update package.json
  - Install @keycloak/keycloak-js package
  - Remove firebase package from dependencies
  - Update package.json to reflect new dependencies
  - _Requirements: 1.1, 9.3_

- [ ] 2. Create Keycloak configuration module
  - [x] 2.1 Create src/configs/keycloak.ts file with Keycloak initialization
    - Define KeycloakConfig interface
    - Read Keycloak configuration from environment variables (URL, realm, clientId)
    - Implement environment-based configuration selection (dev vs prod)
    - Initialize Keycloak instance with PKCE and check-sso options
    - Export keycloakInstance and initKeycloak function
    - Add error handling for missing configuration
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ] 2.2 Write unit tests for Keycloak configuration
    - Test Keycloak initialization with valid configuration
    - Test error handling when configuration is missing
    - Test environment-based configuration selection
    - _Requirements: 1.2_

- [ ] 3. Update authentication utilities to use Keycloak
  - [x] 3.1 Refactor doSignInWithEmailAndPassword function
    - Replace Firebase signInWithEmailAndPassword with Keycloak login
    - Implement proper TypeScript types for parameters
    - Add error handling and user-friendly error messages
    - Return authentication result
    - _Requirements: 2.1, 2.2, 2.3, 10.1_

  - [x] 3.2 Refactor doCreateUserWithEmailAndPassword function
    - Replace Firebase createUserWithEmailAndPassword with Keycloak registration
    - Implement redirect to Keycloak registration page or use Admin API
    - Add error handling for registration failures
    - Handle existing user errors
    - _Requirements: 3.1, 3.2, 3.3, 10.4_

  - [x] 3.3 Refactor doSignInWithGoogle function
    - Replace Firebase signInWithPopup with Keycloak OAuth flow
    - Use keycloak.login({ idpHint: 'google' })
    - Add error handling for OAuth failures
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 3.4 Refactor doSignOut function
    - Replace Firebase signOut with Keycloak logout
    - Clear authentication tokens from storage
    - Implement proper cleanup
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 3.5 Add new utility functions for token management
    - Implement getAccessToken function
    - Implement refreshToken function
    - Implement isAuthenticated function
    - Add token expiry checking logic
    - _Requirements: 6.3, 8.1_

  - [ ] 3.6 Write unit tests for authentication utilities
    - Test doSignInWithEmailAndPassword with valid and invalid credentials
    - Test doCreateUserWithEmailAndPassword with valid data and existing user
    - Test doSignInWithGoogle OAuth flow
    - Test doSignOut functionality
    - Test token management functions
    - Mock Keycloak instance for all tests
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 5.1_

- [ ] 4. Update AuthContext to use Keycloak
  - [x] 4.1 Refactor AuthContext provider implementation
    - Replace Firebase onAuthStateChanged with Keycloak event listeners
    - Update initializeUser function to work with Keycloak token
    - Implement Keycloak initialization in useEffect
    - Update currentUser state to use Keycloak token claims
    - Add token refresh logic
    - Handle authentication state changes from Keycloak events
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

  - [x] 4.2 Update AuthContextType interface
    - Define KeycloakUser interface with proper types
    - Update currentUser type to KeycloakUser | null
    - Add refreshAuth function to context type
    - _Requirements: 6.5_

  - [ ] 4.3 Write tests for AuthContext
    - Test initialization with authenticated user
    - Test initialization with unauthenticated user
    - Test state updates on authentication events
    - Test token refresh triggers
    - Test loading states
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 5. Update Login component
  - [x] 5.1 Update Login component to use new Keycloak utilities
    - Update imports to use refactored auth utilities
    - Update error handling for Keycloak-specific errors
    - Ensure loading states work correctly
    - Test form submission with valid credentials
    - Test form submission with invalid credentials
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2_

  - [x] 5.2 Update Google sign-in button handler
    - Update onGoogleSignIn to use refactored doSignInWithGoogle
    - Update error handling for OAuth failures
    - Test Google sign-in flow
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 5.3 Write component tests for Login
    - Test login form submission with valid credentials
    - Test login form submission with invalid credentials
    - Test Google OAuth button click
    - Test loading states during authentication
    - Test error message display
    - Test redirect when already authenticated
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.3_

- [ ] 6. Update Registration component
  - [x] 6.1 Update Registration component to use new Keycloak utilities
    - Update imports to use refactored auth utilities
    - Add password confirmation validation
    - Update error handling for Keycloak-specific errors
    - Test form submission with valid data
    - Test form submission with mismatched passwords
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 10.4_

  - [ ] 6.2 Write component tests for Registration
    - Test registration form submission with valid data
    - Test password mismatch validation
    - Test registration with existing email
    - Test loading states during registration
    - Test error message display
    - Test redirect when already authenticated
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 7. Implement API authentication with Keycloak tokens
  - [x] 7.1 Create or update fetch helper with token injection
    - Create authenticatedFetch wrapper function
    - Implement automatic Authorization header injection
    - Add Bearer token format
    - _Requirements: 8.1, 8.5_

  - [x] 7.2 Implement 401 handling and token refresh
    - Detect 401 Unauthorized responses
    - Attempt token refresh using Keycloak
    - Retry original request with new token
    - Redirect to login if refresh fails
    - _Requirements: 8.2, 8.3, 8.4, 6.3, 6.4_

  - [ ] 7.3 Write tests for API authentication
    - Test Authorization header is included in requests
    - Test 401 response triggers token refresh
    - Test request retry after successful token refresh
    - Test redirect to login after failed token refresh
    - Mock fetch and Keycloak token refresh
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 8. Update environment configuration
  - [x] 8.1 Add Keycloak environment variables to .env files
    - Add VITE_KEYCLOAK_URL for production
    - Add VITE_KEYCLOAK_REALM for production
    - Add VITE_KEYCLOAK_CLIENT_ID for production
    - Add VITE_KEYCLOAK_URL_PREPROD for development
    - Add VITE_KEYCLOAK_REALM_PREPROD for development
    - Add VITE_KEYCLOAK_CLIENT_ID_PREPROD for development
    - _Requirements: 1.1, 1.3, 1.4_

  - [x] 8.2 Update .env.example with Keycloak variables
    - Add example Keycloak configuration variables
    - Document required environment variables
    - _Requirements: 1.1_

- [ ] 9. Remove Firebase dependencies and configuration
  - [x] 9.1 Remove Firebase imports from all files
    - Remove Firebase imports from src/auth/utils.ts
    - Remove Firebase imports from src/contexts/AuthContext.tsx
    - Verify no other files import Firebase auth
    - _Requirements: 9.1_

  - [x] 9.2 Delete Firebase configuration file
    - Delete src/configs/firebase.ts
    - _Requirements: 9.4_

  - [x] 9.3 Remove Firebase environment variables
    - Remove VITE_FIREBASE_CONFIG from .env
    - Remove VITE_FIREBASE_CONFIG_PREPROD from .env
    - Update .env.example to remove Firebase variables
    - _Requirements: 9.2_

- [ ] 10. Implement protected route authentication
  - [ ] 10.1 Create or update route protection logic
    - Implement authentication check for protected routes
    - Add redirect to login for unauthenticated users
    - Handle token refresh on route access
    - _Requirements: 7.1, 7.2, 7.3_

  - [ ] 10.2 Write tests for protected routes
    - Test authenticated user can access protected routes
    - Test unauthenticated user redirects to login
    - Test token refresh on protected route access
    - Test redirect to login when token refresh fails
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 11. Implement comprehensive error handling
  - [x] 11.1 Create AuthError class and error mapping
    - Define AuthError class with code and message
    - Implement handleAuthError function
    - Map Keycloak errors to user-friendly messages
    - Add error logging for debugging
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 11.2 Update all authentication functions to use error handling
    - Update doSignInWithEmailAndPassword error handling
    - Update doCreateUserWithEmailAndPassword error handling
    - Update doSignInWithGoogle error handling
    - Update doSignOut error handling
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ] 11.3 Write tests for error handling
    - Test invalid credentials error message
    - Test network error message
    - Test service unavailable error message
    - Test existing user error message
    - Test error logging functionality
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 12. Integration testing and validation
  - [ ] 12.1 Write integration tests for complete authentication flows
    - Test complete login flow from form to redirect
    - Test complete registration flow
    - Test complete OAuth flow with mocked provider
    - Test complete logout flow
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 5.1_

  - [ ] 12.2 Perform manual testing of all authentication scenarios
    - Manually test login with valid credentials
    - Manually test login with invalid credentials
    - Manually test registration with new account
    - Manually test registration with existing email
    - Manually test Google OAuth login
    - Manually test logout functionality
    - Manually test token refresh on API call
    - Manually test session persistence across page refresh
    - Manually test protected route access
    - Manually test error messages display
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 5.1, 6.1, 6.2, 6.3, 7.1, 7.2, 8.2, 10.1, 10.2, 10.3, 10.4_

- [ ] 13. Update documentation
  - [x] 13.1 Update README with Keycloak setup instructions
    - Document Keycloak server requirements
    - Document environment variable configuration
    - Document client configuration in Keycloak
    - Add troubleshooting section
    - _Requirements: 1.1, 1.5_

  - [ ] 13.2 Add code comments and JSDoc documentation
    - Add JSDoc comments to all authentication utility functions
    - Add comments explaining Keycloak configuration
    - Document error handling approach
    - _Requirements: 10.5_
