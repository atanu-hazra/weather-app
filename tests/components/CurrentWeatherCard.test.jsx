import React from 'react';
import { screen, renderWithProviders } from '../test-utils';
import CurrentWeatherCard from '../../src/components/CurrentWeatherCard';

/**
 * LESSON 7: Testing Side Effects and Fallback Components
 * - React components can sometimes cause side effects, like mutating `document.title` or `document.body.style` directly.
 * - We can assert on these window/document mutations in jsdom!
 * - When testing components that render different templates based on data:
 *   1. Test the "empty" state (does it render a loading spinner or empty message?).
 *   2. Test the "populated" state (does it render all the detailed fields?).
 */
describe('CurrentWeatherCard Component', () => {

    test('renders Loading component fallback when weather data is empty', () => {
        // Arrange: Preload with empty weather data
        renderWithProviders(<CurrentWeatherCard />);

        // Assert: It should render the Loading state
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.queryByText('Kolkata')).not.toBeInTheDocument();
    });

    test('renders full weather card data and mutates document.body.style correctly based on time range', () => {
        // Arrange: Create a comprehensive mock data structure representing Redux state
        const mockWeatherData = {
            current: {
                last_updated: '2026-05-19 12:00', // Noon (12:00 -> 1200)
                temp_c: 24.5,
                feelslike_c: 26.2,
                condition: { icon: '/cloudy.png', text: 'Mostly Cloudy' },
                humidity: 75,
                cloud: 90,
                uv: 8, // Should map to "Very High"
                wind_kph: 12,
                wind_dir: 'NNE'
            },
            forecast: {
                forecastday: [
                    {
                        day: {
                            mintemp_c: 21,
                            maxtemp_c: 29.5,
                            daily_will_it_rain: 15,
                            maxwind_kph: 18.5
                        },
                        astro: {
                            sunrise: '05:22 AM',
                            sunset: '06:44 PM'
                        }
                    }
                ]
            },
            location: {
                name: 'Kolkata',
                region: 'West Bengal',
                country: 'India',
                localtime: '2026-05-19 12:15'
            }
        };

        const preloadedState = {
            weather: {
                currentWeatherData: mockWeatherData
            }
        };

        // Render the component with the preloaded state
        renderWithProviders(<CurrentWeatherCard />, { preloadedState });

        // Assert Location Information
        expect(screen.getByText('Kolkata')).toBeInTheDocument();
        expect(screen.getByText(/West Bengal, India/)).toBeInTheDocument();

        // Assert Primary Weather Information
        expect(screen.getByText('24.5')).toBeInTheDocument();
        expect(screen.getByText(/Feels like/)).toHaveTextContent('Feels like 26.2 °C');
        expect(screen.getByText('Mostly Cloudy')).toBeInTheDocument();
        expect(screen.getByText('21 ~ 29.5 °C')).toBeInTheDocument();

        // Assert Image icon
        const icon = screen.getByRole('img', { name: /weather-icon/i });
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('src', '/cloudy.png');

        // Assert Extra Detailed Information
        expect(screen.getByText('75%')).toBeInTheDocument(); // Humidity
        expect(screen.getByText('90%')).toBeInTheDocument(); // Cloud
        expect(screen.getByText('15%')).toBeInTheDocument(); // Rain
        
        // Assert UV mapping! 8 maps to "Very High" -> total text "8 Very High"
        expect(screen.getByText('8 Very High')).toBeInTheDocument();
        
        expect(screen.getByText('12 kph NNE')).toBeInTheDocument(); // Wind
        expect(screen.getByText('18.5 kph')).toBeInTheDocument(); // Max Wind Speed
        expect(screen.getByText('05:22 AM')).toBeInTheDocument(); // Sunrise
        expect(screen.getByText('06:44 PM')).toBeInTheDocument(); // Sunset
        
        // Assert Last updated timestamp
        expect(screen.getByText('2026-05-19 12:15')).toBeInTheDocument();

        /**
         * ASSERTING SIDE EFFECTS:
         * 1. 12:00 maps to 1200.
         * 2. 1200 fits in range { start: 1101, end: 1459, name: "Noon", gradient: "linear-gradient(to bottom, #4a90e2, #5c8ebf)", color: "#5c8ebf" }
         * 3. Assert dayTime name "Noon" is in the document!
         */
        expect(screen.getByText(/Noon/i)).toBeInTheDocument();

        // 4. Assert body background gradient style changed!
        /**
         * MATCHER: `toContain(substring)`
         * - Purpose: Asserts that a string contains a specific substring (or an array contains a specific item).
         * - Why it's used: Extremely useful when checking for complex, generated, or formatted strings where we only care about part of the value (like specific RGB colors in a dynamic gradient). 
         * - This is a "Pro" tip to prevent browser engine CSS parser differences from breaking test suites!
         */
        expect(document.body.style.backgroundImage).toContain('rgb(74, 144, 226)');
        expect(document.body.style.backgroundImage).toContain('rgb(92, 142, 191)');
        expect(document.body.style.backgroundColor).toBe('rgb(92, 142, 191)');
    });
});
