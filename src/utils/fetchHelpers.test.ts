import {firebaseAuth} from '../configs/firebase';

import {FetchRoutes2, defaultHeaders} from './constants';
import {fetchGet, fetchPost} from './fetchHelpers';

// Mock firebase auth
jest.mock('../configs/firebase', () => ({
    firebaseAuth: {
        currentUser: null,
    },
}));

// Mock fetch
global.fetch = jest.fn();

describe('fetchHelpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({}),
        });
    });

    describe('getHeaders behavior through fetchGet', () => {
        it('should include x-admin-secret with user uid when user is authenticated', async () => {
            // Mock authenticated user
            const mockUser = {
                uid: 'testUid123',
                getIdToken: jest.fn().mockResolvedValue('mockIdToken'),
            };
            (firebaseAuth.currentUser as any) = mockUser;

            await fetchGet({
                route: FetchRoutes2.getAllUsers,
                query: {},
                isProd: false,
            });

            // Check that fetch was called with correct headers
            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'x-organization-id': '1',
                        'x-admin-secret': 'testUid123',
                        Authorization: 'Bearer mockIdToken',
                    }),
                }),
            );
        });

        it('should include empty x-admin-secret when user is not authenticated', async () => {
            // Mock unauthenticated user
            (firebaseAuth.currentUser as any) = null;

            await fetchGet({
                route: FetchRoutes2.getAllUsers,
                query: {},
                isProd: false,
            });

            // Check that fetch was called with correct headers
            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'x-organization-id': '1',
                        'x-admin-secret': '',
                        Authorization: 'Bearer null',
                    }),
                }),
            );
        });

        it('should include empty x-admin-secret when user exists but has no uid', async () => {
            // Mock user without uid
            const mockUser = {
                getIdToken: jest.fn().mockResolvedValue('mockIdToken'),
            };
            (firebaseAuth.currentUser as any) = mockUser;

            await fetchPost({
                route: FetchRoutes2.createUser,
                body: {},
                isProd: false,
            });

            // Check that fetch was called with correct headers
            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'x-admin-secret': '',
                    }),
                }),
            );
        });

        it('should handle getIdToken errors gracefully', async () => {
            // Mock user with failing getIdToken
            const mockUser = {
                uid: 'testUid123',
                getIdToken: jest.fn().mockRejectedValue(new Error('Token error')),
            };
            (firebaseAuth.currentUser as any) = mockUser;

            // Mock console.error to avoid test output noise
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            await fetchGet({
                route: FetchRoutes2.getAllUsers,
                query: {},
                isProd: false,
            });

            // Check that error was logged
            expect(consoleSpy).toHaveBeenCalledWith('Error getting ID token:', expect.any(Error));

            // Check that fetch was still called with uid but null token
            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'x-admin-secret': 'testUid123',
                        Authorization: 'Bearer null',
                    }),
                }),
            );

            consoleSpy.mockRestore();
        });
    });

    describe('defaultHeaders validation', () => {
        it('should not contain x-admin-secret in defaultHeaders', () => {
            expect(defaultHeaders).not.toHaveProperty('x-admin-secret');
        });
    });
});
