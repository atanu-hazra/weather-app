import { renderHook, waitFor } from '../test-utils';
import { vi } from 'vitest';
import useWeatherInfo from '../../src/hooks/useWeatherInfo';

/**
 * LESSON 9: Unit Testing React Custom Hooks
 * - React custom hooks cannot be called outside of a React component container because they rely on React lifecycle APIs (like `useState` and `useEffect`).
 * - React Testing Library provides `renderHook()`, which renders a mock functional component internally to wrap and execute the hook safely.
 * - `renderHook` returns an object containing `result`, where `result.current` always reflects the most up-to-date return value of the hook.
 * - When testing async hook updates, we use `waitFor()` to pause assertions until state updates complete.
 */
describe('useWeatherInfo Custom Hook', () => {

    test('returns empty object initially, and fetches weather data successfully on location change', async () => {
        const mockWeatherData = {
            current: { temp_c: 28 },
            location: { name: 'Mumbai' }
        };

        // 1. Spying on global fetch
        // We capture global.fetch and replace it with a mocked response returning our mock JSON weather object.
        const mockResponse = {
            json: vi.fn().mockResolvedValue(mockWeatherData)
        };
        const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

        // 2. Render Hook
        const { result } = renderHook(() => useWeatherInfo('Mumbai'));

        // Assert: Hook starts with the initial empty object state {}
        expect(result.current).toEqual({});

        // 3. Act & Assert: Wait for the asynchronous fetch hook effect to complete
        await waitFor(() => {
            // Once the fetch completes, the hook's internal useState triggers a re-render
            expect(result.current).toEqual(mockWeatherData);
        });

        // Verify fetch details
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('q=Mumbai')
        );

        // Clean up global spy to prevent test leakages!
        fetchSpy.mockRestore();
    });

    test('handles fetch exceptions gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const fetchSpy = vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Down'));

        const { result } = renderHook(() => useWeatherInfo('Delhi'));

        // Wait a small tick for the failed async execution to print log
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching weather data:', expect.any(Error));
        });

        // The hook state should remain empty due to error catch block
        expect(result.current).toEqual({});

        fetchSpy.mockRestore();
        consoleSpy.mockRestore();
    });
});
