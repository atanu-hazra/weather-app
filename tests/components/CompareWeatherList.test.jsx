import React from 'react';
import { screen, renderWithProviders } from '../test-utils';
import CompareWeatherList from '../../src/components/CompareWeatherList';

describe('CompareWeatherList Component', () => {

    test('renders Loading component fallback when multipleWeatherData is null', () => {
        // Arrange: Inject null multipleWeatherData into store
        const preloadedState = {
            weather: {
                multipleWeatherData: null
            }
        };

        renderWithProviders(<CompareWeatherList />, { preloadedState });

        // Assert: Loading fallback displayed
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders multiple weather cards side-by-side from Redux store array list', () => {
        // Arrange: Preload store with two mock cities
        const mockMultipleData = [
            {
                current: {
                    last_updated: '2026-05-19 12:00',
                    temp_c: 25,
                    feelslike_c: 27,
                    condition: { icon: '/col.png', text: 'Sunny' },
                    humidity: 50,
                    cloud: 10,
                    uv: 5,
                    wind_kph: 8,
                    wind_dir: 'W'
                },
                forecast: {
                    forecastday: [
                        {
                            day: { mintemp_c: 20, maxtemp_c: 30, daily_will_it_rain: 0, maxwind_kph: 12 },
                            astro: { sunrise: '05:30 AM', sunset: '06:30 PM' }
                        }
                    ]
                },
                location: { name: 'Kolkata', region: 'West Bengal', country: 'India', localtime: '20:00' }
            },
            {
                current: {
                    last_updated: '2026-05-19 12:00',
                    temp_c: 12,
                    feelslike_c: 11,
                    condition: { icon: '/lon.png', text: 'Light Rain' },
                    humidity: 90,
                    cloud: 100,
                    uv: 2,
                    wind_kph: 25,
                    wind_dir: 'SW'
                },
                forecast: {
                    forecastday: [
                        {
                            day: { mintemp_c: 8, maxtemp_c: 15, daily_will_it_rain: 80, maxwind_kph: 35 },
                            astro: { sunrise: '06:00 AM', sunset: '08:00 PM' }
                        }
                    ]
                },
                location: { name: 'London', region: 'Greater London', country: 'United Kingdom', localtime: '15:30' }
            }
        ];

        const preloadedState = {
            weather: {
                multipleWeatherData: mockMultipleData
            }
        };

        renderWithProviders(<CompareWeatherList />, { preloadedState });

        // Assert: Both cities names are rendered in the list
        expect(screen.getByText('Kolkata')).toBeInTheDocument();
        expect(screen.getByText('London')).toBeInTheDocument();

        // Assert temperatures are displayed
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();

        // Assert conditions are displayed
        expect(screen.getByText('Sunny')).toBeInTheDocument();
        expect(screen.getByText('Light Rain')).toBeInTheDocument();

        // Get total mapped weather icons (2 cards = 2 icons)
        const icons = screen.getAllByRole('img', { name: /weather-icon/i });
        
        /**
         * MATCHER: `toHaveLength`
         * - Purpose: Asserts collection array size.
         * - Here it verifies exactly 2 comparison card elements are rendered.
         */
        expect(icons).toHaveLength(2);
    });
});
