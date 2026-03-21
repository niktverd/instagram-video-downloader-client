/* eslint-disable @typescript-eslint/no-explicit-any */
import {keycloak} from '../configs/keycloakApi';

import {getHeaders} from './fetchHelpers';

// Mock keycloak
jest.mock('../configs/keycloakApi', () => ({
    keycloak: {
        authenticated: false,
        token: null,
        subject: null,
        updateToken: jest.fn(),
        login: jest.fn(),
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
        (keycloak as any).authenticated = false;
        (keycloak as any).token = null;
        (keycloak as any).subject = null;
    });

    describe('getHeaders', () => {
        it('should return basic headers without organization when no organization is set', async () => {
            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': '',
                Authorization: 'Bearer null',
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
                Authorization: 'Bearer null',
            });
        });

        it('should handle user authentication when user is logged in', async () => {
            (keycloak as any).authenticated = true;
            (keycloak as any).token = 'test-token';
            (keycloak as any).subject = 'test-user-id';
            (keycloak.updateToken as jest.Mock).mockResolvedValue(true);

            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': 'dGVzdC11c2VyLWlk', // base64 encoded 'test-user-id'
                Authorization: 'Bearer test-token',
            });
            expect(keycloak.updateToken).toHaveBeenCalledWith(30);
        });

        it('should handle user authentication with organization', async () => {
            (keycloak as any).authenticated = true;
            (keycloak as any).token = 'test-token';
            (keycloak as any).subject = 'test-user-id';
            (keycloak.updateToken as jest.Mock).mockResolvedValue(true);

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

        it('should handle token refresh errors gracefully by triggering login', async () => {
            (keycloak as any).authenticated = true;
            (keycloak.updateToken as jest.Mock).mockRejectedValue(
                new Error('Token refresh failed'),
            );

            const headers = await getHeaders();

            expect(headers).toEqual({
                'Content-Type': 'application/json',
                'x-user-token': '',
                Authorization: 'Bearer null',
            });
            expect(keycloak.login).toHaveBeenCalled();
        });
    });
});
