import { renderHook, waitFor } from '../test-utils';
import { vi } from 'vitest';
import useAutoLocationSearch from '../../src/hooks/useAutoLocationSearch';

describe('useAutoLocationSearch Custom Hook', () => {

    test('returns empty array initially, and fetches suggestion list successfully on query change', async () => {
        const mockSuggestions = [
            { name: 'Kolkata', country: 'India' },
            { name: 'London', country: 'United Kingdom' }
        ];

        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(mockSuggestions)
        };
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useAutoLocationSearch('Kol'));

        // Starts with default empty array []
        expect(result.current).toEqual([]);

        // Wait for async resolution
        await waitFor(() => {
            expect(result.current).toEqual(mockSuggestions);
        });

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('q=Kol')
        );

        fetchSpy.mockRestore();
    });

    test('handles failed HTTP request gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const mockResponse = {
            ok: false // Trigger Throw new Error('Network response was not ok')
        };
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useAutoLocationSearch('InvalidCity'));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching auto search data:', expect.any(Error));
        });

        expect(result.current).toEqual([]);

        fetchSpy.mockRestore();
        consoleSpy.mockRestore();
    });
});
