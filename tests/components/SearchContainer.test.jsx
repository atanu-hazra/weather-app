import React from 'react';
import { screen, renderWithProviders, fireEvent } from '../test-utils';
import { vi } from 'vitest';
import SearchContainer from '../../src/components/SearchContainer';
import useWeatherInfo from '../../src/hooks/useWeatherInfo';
import useAutoLocationSearch from '../../src/hooks/useAutoLocationSearch';

/**
 * LESSON 8: Mocking Custom React Hooks
 * - When a component uses custom hooks that fetch data or perform operations, we want to mock them in unit/integration tests.
 * - `vi.mock` tells Vitest to intercept imports of a module and replace them with mock versions.
 * - This allows us to control exactly what the hooks return in each test case, making our tests deterministic and fast!
 */
vi.mock('../../src/hooks/useWeatherInfo', () => ({
    default: vi.fn()
}));

vi.mock('../../src/hooks/useAutoLocationSearch', () => ({
    default: vi.fn()
}));

describe('SearchContainer Component', () => {
    
    beforeEach(() => {
        // Clear all mock history and implementations before each test
        vi.clearAllMocks();
        // Clear local storage to start clean
        localStorage.clear();
    });

    test('loads search field and restores currentLocation from localStorage', () => {
        // Arrange: Preload localStorage with a saved city
        localStorage.setItem('currentLocation', 'Paris');
        
        // Mock hook returns
        useWeatherInfo.mockReturnValue({ current: { temp_c: 15 } });
        useAutoLocationSearch.mockReturnValue([]);

        // Render component
        renderWithProviders(<SearchContainer />);

        // Assert: Input is rendered and placeholder matches
        const input = screen.getByPlaceholderText(/search for a city/i);
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');

        // Assert: hook was invoked with the restored currentLocation from localStorage!
        expect(useWeatherInfo).toHaveBeenCalledWith('Paris');
    });

    test('updates state on typing, shows suggestions, and triggers new search on Enter key press', () => {
        // Arrange
        useWeatherInfo.mockReturnValue(null);
        // Return suggestions when typing
        useAutoLocationSearch.mockImplementation((query) => {
            if (query === 'Lon') {
                return [{ name: 'London', country: 'United Kingdom' }];
            }
            return [];
        });

        renderWithProviders(<SearchContainer />);

        const input = screen.getByPlaceholderText(/search for a city/i);
        
        // Act: Simulate typing "Lon" in the input field
        fireEvent.change(input, { target: { value: 'Lon' } });
        expect(input.value).toBe('Lon');

        // Assert suggestions card rendered the suggestion
        expect(screen.getByText('Suggestions')).toBeInTheDocument();
        expect(screen.getByText('London')).toBeInTheDocument();

        // Act: Click Search button
        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);

        // Assert: input is cleared after search submission
        expect(input.value).toBe('');

        // Assert: hook was re-called with the searched city "Lon"
        expect(useWeatherInfo).toHaveBeenCalledWith('Lon');
        expect(localStorage.getItem('currentLocation')).toBe('Lon');
    });

    test('triggers search when pressing Enter key inside search-field', () => {
        useWeatherInfo.mockReturnValue(null);
        useAutoLocationSearch.mockReturnValue([]);

        renderWithProviders(<SearchContainer />);

        const input = screen.getByPlaceholderText(/search for a city/i);

        // Act: Type "Berlin"
        fireEvent.change(input, { target: { value: 'Berlin' } });

        // Act: Simulate pressing Enter key
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        // Assert: search was triggered for Berlin
        expect(useWeatherInfo).toHaveBeenCalledWith('Berlin');
    });

    test('triggers re-fetch on refresh button click', () => {
        useWeatherInfo.mockReturnValue(null);
        useAutoLocationSearch.mockReturnValue([]);

        renderWithProviders(<SearchContainer />);

        const refreshButton = screen.getByRole('button', { name: /refresh/i });
        
        // Act: Click refresh button
        fireEvent.click(refreshButton);

        // We check that useWeatherInfo was called with New Delhi (default) followed by "new delhi " (with a trailing space)
        // because SearchContainer.jsx line 26 sets: setCurrentLocation(prevLocation => (prevLocation + " "))
        expect(useWeatherInfo).toHaveBeenLastCalledWith('new delhi ');
    });
});
