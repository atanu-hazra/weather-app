import React from 'react';
import { screen, renderWithProviders } from '../test-utils';
import Header from '../../src/components/header/Header';

describe('Header Component', () => {
    test('renders logo and default nav links with daytime emoji when no weather data exists', () => {
        // Arrange
        renderWithProviders(<Header />);

        // Act - Static rendering test

        // Assert Logo
        const logoText = screen.getByText(/weather/i);
        
        /**
         * MATCHER: `toBeInTheDocument()`
         * - Purpose: Asserts that the queried element is present inside the DOM.
         * - Why it's used: It is the most fundamental assertion for UI tests. It proves the element is actually loaded and visible on the page.
         */
        expect(logoText).toBeInTheDocument();
        
        expect(screen.getByText('☀️')).toBeInTheDocument();

        // Get Nav Links
        const homeLink = screen.getByRole('link', { name: /home/i });
        const compareLink = screen.getByRole('link', { name: /compare/i });

        expect(homeLink).toBeInTheDocument();

        /**
         * MATCHER: `toHaveAttribute(attributeName, expectedValue)`
         * - Purpose: Asserts that an element has a specific HTML attribute set to a specific value.
         * - Why it's used: Crucial for testing elements with critical attributes, such as verifying standard anchor links (`href`), form buttons (`type="submit"`), or image graphics (`src` and `alt`).
         */
        expect(homeLink).toHaveAttribute('href', '/');

        expect(compareLink).toBeInTheDocument();
        expect(compareLink).toHaveAttribute('href', '/compare');
    });

    test('renders sun emoji ☀️ when is_day is 1 (daytime)', () => {
        // Arrange: Inject preloaded Redux state simulating daytime weather
        const preloadedState = {
            weather: {
                currentWeatherData: {
                    current: {
                        is_day: 1
                    }
                }
            }
        };

        renderWithProviders(<Header />, { preloadedState });

        // Assert sun emoji is visible
        expect(screen.getByText('☀️')).toBeInTheDocument();

        /**
         * MATCHER: `not.toBeInTheDocument()`
         * - Purpose: Asserts that an element does NOT exist in the DOM.
         * - Why it's used: Crucial for testing conditional logic where something must be hidden or removed.
         * 
         * PRO TIP: Query selection prefix is key here!
         * - We must use `screen.queryBy...` instead of `screen.getBy...`.
         * - `getByText()` immediately throws an error and crashes the test if the element is NOT found.
         * - `queryByText()` returns `null` if the element is not found, allowing `not.toBeInTheDocument()` to evaluate successfully!
         */
        expect(screen.queryByText('🌙')).not.toBeInTheDocument();
    });

    test('renders moon emoji 🌙 when is_day is 0 (nighttime)', () => {
        // Arrange: Inject preloaded Redux state simulating nighttime weather
        const preloadedState = {
            weather: {
                currentWeatherData: {
                    current: {
                        is_day: 0
                    }
                }
            }
        };

        renderWithProviders(<Header />, { preloadedState });

        // Assert moon emoji is visible
        expect(screen.getByText('🌙')).toBeInTheDocument();
        
        // Assert sun emoji is absent
        expect(screen.queryByText('☀️')).not.toBeInTheDocument();
    });
});
