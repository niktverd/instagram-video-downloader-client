import React from 'react';

import {act, renderHook, waitFor} from '@testing-library/react';

import {AppEnvContext} from '../../../contexts/AppEnv';
import {UiGetInsightsInstagramReportResponse} from '../../../sharedTypes/types/instagramApi';
import * as fetchHelpers from '../../../utils/fetchHelpers';

import {useInsightsData} from './useInsightsData';

// Mock fetch helpers
jest.mock('../../../utils/fetchHelpers');
const mockFetchGet = fetchHelpers.fetchGet as jest.MockedFunction<typeof fetchHelpers.fetchGet>;

// Mock data
const mockApiResponse: UiGetInsightsInstagramReportResponse = {
    '2025-06-15': {
        reach: {account1: 1000, account2: 2000, total: 3000},
        follower_count: {account1: 500, account2: 800, total: 1300},
    },
    '2025-06-14': {
        reach: {account1: 1500, account2: 1800, total: 3300},
        follower_count: {account1: 520, account2: 820, total: 1340},
        online_followers: {account1: 300, account2: 400, total: 700},
    },
};

// Test wrapper with AppEnvContext
const createWrapper = (isProdValue = false) => {
    // eslint-disable-next-line react/display-name
    return ({children}: {children: React.ReactNode}) => (
        <AppEnvContext.Provider value={{isProd: isProdValue}}>{children}</AppEnvContext.Provider>
    );
};

describe('useInsightsData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial state', () => {
        it('should return initial state when no parameters provided', () => {
            const {result} = renderHook(() => useInsightsData(), {
                wrapper: createWrapper(),
            });

            expect(result.current.data).toBeUndefined();
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(typeof result.current.refetch).toBe('function');
        });

        it('should not fetch data when year is missing', () => {
            renderHook(() => useInsightsData(undefined, 6), {
                wrapper: createWrapper(),
            });

            expect(mockFetchGet).not.toHaveBeenCalled();
        });

        it('should not fetch data when month is missing', () => {
            renderHook(() => useInsightsData(2025), {
                wrapper: createWrapper(),
            });

            expect(mockFetchGet).not.toHaveBeenCalled();
        });
    });

    describe('Successful data fetching', () => {
        it('should fetch data when year and month are provided', async () => {
            mockFetchGet.mockResolvedValueOnce(mockApiResponse);

            const {result} = renderHook(() => useInsightsData(2025, 6), {
                wrapper: createWrapper(false),
            });

            // Initial loading state
            expect(result.current.loading).toBe(true);
            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toBeNull();

            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });

            expect(result.current.data).toEqual(mockApiResponse);
            expect(result.current.error).toBeNull();
            expect(mockFetchGet).toHaveBeenCalledWith({
                route: '/ui/get-insights-report',
                query: {year: 2025, month: 6},
                isProd: false,
            });
        });

        it('should use prod environment when isProd is true', async () => {
            mockFetchGet.mockResolvedValueOnce(mockApiResponse);

            renderHook(() => useInsightsData(2025, 6), {
                wrapper: createWrapper(true),
            });

            await waitFor(() => {
                expect(mockFetchGet).toHaveBeenCalledWith({
                    route: '/ui/get-insights-report',
                    query: {year: 2025, month: 6},
                    isProd: true,
                });
            });
        });
    });

    describe('Error handling', () => {
        it('should handle fetch errors', async () => {
            const errorMessage = 'Network error';
            mockFetchGet.mockRejectedValueOnce(new Error(errorMessage));

            const {result} = renderHook(() => useInsightsData(2025, 6), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });

            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toEqual(new Error(errorMessage));
        });

        it('should handle non-Error rejection', async () => {
            mockFetchGet.mockRejectedValueOnce('String error');

            const {result} = renderHook(() => useInsightsData(2025, 6), {
                wrapper: createWrapper(),
            });

            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });

            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toEqual(new Error('Failed to fetch insights data'));
        });
    });

    describe('Manual refetch', () => {
        it('should refetch data when refetch is called', async () => {
            mockFetchGet.mockResolvedValue(mockApiResponse);

            const {result} = renderHook(() => useInsightsData(2025, 6), {
                wrapper: createWrapper(),
            });

            await waitFor(() => expect(result.current.loading).toBe(false));

            // Clear previous calls
            mockFetchGet.mockClear();

            // Call refetch
            act(() => {
                result.current.refetch();
            });

            expect(mockFetchGet).toHaveBeenCalledWith({
                route: '/ui/get-insights-report',
                query: {year: 2025, month: 6},
                isProd: false,
            });
        });
    });
});
