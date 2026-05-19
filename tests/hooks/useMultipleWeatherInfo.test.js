import { renderHook, waitFor } from '../test-utils';
import { vi } from 'vitest';
import useMultipleWeatherInfo from '../../src/hooks/useMultipleWeatherInfo';

describe('useMultipleWeatherInfo Custom Hook', () => {

    test('fetches weather for multiple locations and maps unique cities in list successfully', async () => {
        const mockCitiesList = ['Mumbai', 'Paris'];
        
        const mockMumbaiData = {
            location: { name: 'Mumbai' },
            current: { temp_c: 26 }
        };
        const mockParisData = {
            location: { name: 'Paris' },
            current: { temp_c: 14 }
        };

        // 1. Spying and implementing dynamic mock fetch resolutions
        // Since we are fetching multiple locations simultaneously, we check the query parameter
        // in the URL string to return the appropriate mocked JSON response.
        const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((url) => {
            const parsedUrl = String(url);
            let resolveData = mockMumbaiData;
            
            if (parsedUrl.includes('Paris')) {
                resolveData = mockParisData;
            }

            return Promise.resolve({
                json: () => Promise.resolve(resolveData)
            });
        });

        // 2. Render Hook
        const { result } = renderHook(() => useMultipleWeatherInfo(mockCitiesList));

        // Initial check: empty list
        expect(result.current).toEqual([]);

        // 3. Act & Assert: Wait for all concurrent fetches to resolve and set the hook's state
        await waitFor(() => {
            expect(result.current).toHaveLength(2);
        });

        /**
         * MATCHER: `expect.arrayContaining([item1, item2])`
         * - Purpose: Asserts that an array contains all specified items, regardless of their index order.
         * - Why it's used: Perfect for async concurrent calls (like Promise.all) where responses might arrive and be pushed in arbitrary order. It makes tests flexible and resilient.
         */
        expect(result.current).toEqual(
            expect.arrayContaining([mockMumbaiData, mockParisData])
        );

        // Assert fetch was called exactly twice (once for Mumbai, once for Paris)
        expect(fetchSpy).toHaveBeenCalledTimes(2);

        fetchSpy.mockRestore();
    });
});
