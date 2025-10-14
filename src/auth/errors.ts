/* eslint-disable valid-jsdoc */
/**
 * Custom error class for authentication errors
 */
export class AuthError extends Error {
    constructor(message: string, code: string, originalError?: unknown) {
        // eslint-disable-next-line no-console
        console.info(code, originalError);
        super(message);
        this.name = 'AuthError';
    }
}

/**
 * Map Keycloak and network errors to user-friendly messages
 */
export const handleAuthError = (error: unknown): AuthError => {
    // eslint-disable-next-line no-console
    console.error('Authentication error:', error);

    if (error instanceof AuthError) {
        return error;
    }

    if (error instanceof Error) {
        const message = error.message.toLowerCase();

        // Invalid credentials
        if (message.includes('invalid') || message.includes('credentials')) {
            return new AuthError('Invalid email or password', 'INVALID_CREDENTIALS', error);
        }

        // Network errors
        if (
            message.includes('network') ||
            message.includes('fetch') ||
            message.includes('connection')
        ) {
            return new AuthError('Network error. Please try again', 'NETWORK_ERROR', error);
        }

        // Service unavailable
        if (message.includes('503') || message.includes('unavailable')) {
            return new AuthError(
                'Authentication service unavailable',
                'SERVICE_UNAVAILABLE',
                error,
            );
        }

        // User already exists
        if (message.includes('exists') || message.includes('409')) {
            return new AuthError('An account with this email already exists', 'USER_EXISTS', error);
        }

        // Return the original error message if no specific mapping
        return new AuthError(error.message, 'UNKNOWN_ERROR', error);
    }

    // Unknown error type
    return new AuthError('An unexpected error occurred', 'UNKNOWN_ERROR', error);
};
