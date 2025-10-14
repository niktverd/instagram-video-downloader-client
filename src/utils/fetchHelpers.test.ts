/* eslint-disable @typescript-eslint/no-explicit-any */
import {keycloakInstance} from '../configs/keycloak';

import {getHeaders} from './fetchHelpers';

// Mock keycloak
jest.mock('../configs/keycloak', () => ({
    keycloakInstance: {
        authenticated: false,
        tokenParsed: null,
        token: null,
    },
}));

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('fetchHelpers', () => {
    beforeEach(() => {
        localStorageMock.clear();
        jest.clearAllMocks();
        // Reset keycloak mock
        (keycloakInstance as any).authenticated = false;
        (keycloakInstance as any).tokenParsed = null;
        (keycloakInstance as any).token = null;
    });

    describe('getHeaders', () => {
        it('should return basic headers without organization when no organization is set', async () => {
            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': '',
                Authorization: 'Bearer undefined',
            });
            expect(localStorageMock.getItem).toHaveBeenCalledWith('organizationId');
        });

        it('should include organization header when organization is set in localStorage', async () => {
            localStorageMock.getItem.mockImplementation((key: string) => {
                if (key === 'organizationId') return '123';
                return null;
            });

            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': '',
                'x-organization-id': '123',
                Authorization: 'Bearer undefined',
            });
        });

        it('should not include organization header when organizationId is empty string', async () => {
            localStorageMock.getItem.mockImplementation((key: string) => {
                if (key === 'organizationId') return '';
                return null;
            });

            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': '',
                Authorization: 'Bearer undefined',
            });
            expect(headers['x-organization-id']).toBeUndefined();
        });

        it('should handle user authentication when user is logged in', async () => {
            (keycloakInstance as any).authenticated = true;
            (keycloakInstance as any).tokenParsed = {
                sub: 'test-user-id',
            };
            (keycloakInstance as any).token = 'test-token';

            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': 'dGVzdC11c2VyLWlk', // base64 encoded 'test-user-id'
                Authorization: 'Bearer test-token',
            });
        });

        it('should handle user authentication with organization', async () => {
            (keycloakInstance as any).authenticated = true;
            (keycloakInstance as any).tokenParsed = {
                sub: 'test-user-id',
            };
            (keycloakInstance as any).token = 'test-token';
            localStorageMock.getItem.mockImplementation((key: string) => {
                if (key === 'organizationId') return '456';
                return null;
            });

            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': 'dGVzdC11c2VyLWlk',
                'x-organization-id': '456',
                Authorization: 'Bearer test-token',
            });
        });
    });
});
