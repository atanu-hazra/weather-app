import React from 'react';
import { render, screen } from '../test-utils';
import CompareWeatherCard from '../../src/components/CompareWeatherCard';

describe('CompareWeatherCard Component', () => {

    const mockWeatherData = {
        current: {
            last_updated: '2026-05-19 12:00', // Noon time -> background style mutations
            temp_c: 24,
            feelslike_c: 26,
            condition: { icon: '/icon.png', text: 'Sunny' },
            humidity: 60,
            cloud: 20,
            uv: 6, // maps to "High" uvLevel switch-case
            wind_kph: 10,
            wind_dir: 'N'
        },
        forecast: {
            forecastday: [
                {
                    day: {
                        mintemp_c: 18,
                        maxtemp_c: 28,
                        daily_will_it_rain: 0,
                        maxwind_kph: 15
                    },
                    astro: {
                        sunrise: '05:00 AM',
                        sunset: '07:00 PM'
                    }
                }
            ]
        },
        location: {
            name: 'Mumbai',
            region: 'Maharashtra',
            country: 'India',
            localtime: '2026-05-19 12:15'
        }
    };

    test('returns null when no weatherData is provided', () => {
        const { container } = render(<CompareWeatherCard weatherData={null} />);
        
        // Assert: Correctly returns null (empty DOM container)
        expect(container.firstChild).toBeNull();
    });

    test('renders weather details correctly from weatherData prop', () => {
        render(<CompareWeatherCard weatherData={mockWeatherData} />);

        // Assert: City name, region, and country are rendered
        expect(screen.getByText('Mumbai')).toBeInTheDocument();
        expect(screen.getByText(/Maharashtra, India/)).toBeInTheDocument();

        // Assert: Temperature and feels like temperature
        expect(screen.getByText('24')).toBeInTheDocument();
        expect(screen.getByText(/Feels like/)).toHaveTextContent('Feels like 26 °C');

        // Assert: UV High level switch works (6 maps to High)
        expect(screen.getByText('6 High')).toBeInTheDocument();

        // Assert: Weather icon and src path
        const icon = screen.getByRole('img', { name: /weather-icon/i });
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('src', '/icon.png');

        // Assert: Extra details
        expect(screen.getByText('60%')).toBeInTheDocument(); // Humidity
        expect(screen.getByText('20%')).toBeInTheDocument(); // Cloud
        expect(screen.getByText('0%')).toBeInTheDocument(); // Rain
        expect(screen.getByText('10 kph N')).toBeInTheDocument(); // Wind
        expect(screen.getByText('15 kph')).toBeInTheDocument(); // Max Wind
        expect(screen.getByText('05:00 AM')).toBeInTheDocument(); // Sunrise
        expect(screen.getByText('07:00 PM')).toBeInTheDocument(); // Sunset
    });
});
