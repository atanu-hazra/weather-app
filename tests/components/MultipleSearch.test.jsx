import React from 'react';
import { screen, renderWithProviders, fireEvent } from '../test-utils';
import { vi } from 'vitest';
import MultipleSearch from '../../src/components/MultipleSearch';
import useMultipleWeatherInfo from '../../src/hooks/useMultipleWeatherInfo';
import useAutoLocationSearch from '../../src/hooks/useAutoLocationSearch';

// Mock custom hooks
vi.mock('../../src/hooks/useMultipleWeatherInfo', () => ({
    default: vi.fn()
}));

vi.mock('../../src/hooks/useAutoLocationSearch', () => ({
    default: vi.fn()
}));

describe('MultipleSearch Component', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test('loads default input and restores location list from localStorage', () => {
        // Arrange: Preload localStorage with a list of cities
        const mockCities = ['Kolkata', 'Paris'];
        localStorage.setItem('locationList', JSON.stringify(mockCities));

        useMultipleWeatherInfo.mockReturnValue([]);
        useAutoLocationSearch.mockReturnValue([]);

        // Render
        renderWithProviders(<MultipleSearch />);

        // Assert: Input is in the DOM
        const input = screen.getByPlaceholderText(/add a city to compare/i);
        expect(input).toBeInTheDocument();

        // Assert: useMultipleWeatherInfo hook was invoked with restored array
        expect(useMultipleWeatherInfo).toHaveBeenCalledWith(mockCities);
    });

    test('allows adding new cities to comparison and saves list as JSON to localStorage', () => {
        // Arrange
        useMultipleWeatherInfo.mockReturnValue([]);
        useAutoLocationSearch.mockReturnValue([]);

        renderWithProviders(<MultipleSearch />);

        const input = screen.getByPlaceholderText(/add a city to compare/i);
        const addButton = screen.getByRole('button', { name: /add/i });

        // Act: Add Kolkata
        fireEvent.change(input, { target: { value: 'Kolkata' } });
        fireEvent.click(addButton);

        // Assert: Input cleared and hook called with updated array ['Kolkata']
        expect(input.value).toBe('');
        expect(useMultipleWeatherInfo).toHaveBeenCalledWith(['Kolkata']);

        // Assert local storage updated with stringified JSON array
        const stored = JSON.parse(localStorage.getItem('locationList'));
        expect(stored).toEqual(['Kolkata']);
    });

    test('resets comparison list when reset button is clicked', () => {
        // Arrange: Start with preloaded cities
        const mockCities = ['London', 'New York'];
        localStorage.setItem('locationList', JSON.stringify(mockCities));

        useMultipleWeatherInfo.mockReturnValue([]);
        useAutoLocationSearch.mockReturnValue([]);

        renderWithProviders(<MultipleSearch />);

        const resetButton = screen.getByRole('button', { name: /reset/i });

        // Act: Click reset
        fireEvent.click(resetButton);

        // Assert: Hook was invoked with empty array
        expect(useMultipleWeatherInfo).toHaveBeenCalledWith([]);

        // Assert local storage is cleared
        expect(JSON.parse(localStorage.getItem('locationList'))).toEqual([]);
    });
});
