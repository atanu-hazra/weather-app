import React from 'react';
import { render, screen } from '../test-utils';
import HourlyForecastCard from '../../src/components/HourlyForecastCard';

describe('HourlyForecastCard Component', () => {
    const mockHourlyData = {
        temp_c: 24.5,
        chance_of_rain: 40,
        time: '2026-05-19 14:00',
        condition: {
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            text: 'Partly cloudy'
        }
    };

    test('renders hourly forecast data correctly from props', () => {
        render(<HourlyForecastCard hourlyData={mockHourlyData} />);

        expect(screen.getByText('24.5 °C')).toBeInTheDocument();
        expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
        expect(screen.getByText('Rain - 40%')).toBeInTheDocument();
        expect(screen.getByText('14:00')).toBeInTheDocument();

        const iconImg = screen.getByRole('img', { name: /weather-icon/i });
        expect(iconImg).toBeInTheDocument();
        expect(iconImg).toHaveAttribute('src', '//cdn.weatherapi.com/weather/64x64/day/116.png');
    });
});
