import React from 'react';
import { screen, renderWithProviders } from '../test-utils';
import HourlyForecast from '../../src/components/HourlyForecast';

describe('HourlyForecast Component', () => {
    test('returns null (renders nothing) if no forecast data exists', () => {
        // Arrange
        const { container } = renderWithProviders(<HourlyForecast />);

        /**
         * MATCHER: `toBeNull()`
         * - Purpose: Asserts that a value is exactly `null`.
         * - Why it's used: Perfect for verifying components that render nothing (i.e. return `null`) under certain conditions. 
         * - Here, `container.firstChild` will be `null` because the component returns nothing, proving the guard clause works!
         */
        expect(container.firstChild).toBeNull();
    });

    test('renders nested forecast lists (Today, Tomorrow, custom date) with correct hour card counts', () => {
        // Arrange
        const mockForecastday = [
            {
                date: '2026-05-19',
                hour: [
                    {
                        temp_c: 20,
                        chance_of_rain: 10,
                        time: '2026-05-19 09:00',
                        condition: { icon: '/icon9.png', text: 'Sunny' }
                    },
                    {
                        temp_c: 22,
                        chance_of_rain: 20,
                        time: '2026-05-19 12:00',
                        condition: { icon: '/icon12.png', text: 'Sunny' }
                    }
                ]
            },
            {
                date: '2026-05-20',
                hour: [
                    {
                        temp_c: 18,
                        chance_of_rain: 90,
                        time: '2026-05-20 09:00',
                        condition: { icon: '/icon-rain.png', text: 'Heavy Rain' }
                    }
                ]
            },
            {
                date: '2026-05-21',
                hour: [
                    {
                        temp_c: 25,
                        chance_of_rain: 0,
                        time: '2026-05-21 15:00',
                        condition: { icon: '/icon-hot.png', text: 'Clear' }
                    }
                ]
            }
        ];

        const preloadedState = {
            weather: {
                currentWeatherData: {
                    forecast: {
                        forecastday: mockForecastday
                    }
                }
            }
        };

        renderWithProviders(<HourlyForecast />, { preloadedState });

        // Assert Headers exist
        expect(screen.getByRole('heading', { name: /hourly forecast/i })).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Tommorow')).toBeInTheDocument();
        expect(screen.getByText('2026-05-21')).toBeInTheDocument();

        // Get Hour Cards
        const hourCards = screen.getAllByRole('img', { name: /weather-icon/i });

        /**
         * MATCHER: `toHaveLength(number)`
         * - Purpose: Asserts that an array, string, or collection has a specific length property.
         * - Why it's used: Vital for listing tests. Instead of checking if each individual item is in the document, we can count the total matched elements in one line. Here, it verifies that exactly 4 hourly cards are mapped and rendered.
         */
        expect(hourCards).toHaveLength(4);

        // Assert specific items are rendered
        expect(screen.getAllByText('Sunny')).toHaveLength(2);
        expect(screen.getByText('Heavy Rain')).toBeInTheDocument();
        expect(screen.getByText('Rain - 90%')).toBeInTheDocument();
        expect(screen.getByText('15:00')).toBeInTheDocument();
    });
});
