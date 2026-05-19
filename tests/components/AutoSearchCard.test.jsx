import React from 'react';
import { render, screen } from '../test-utils';
import { fireEvent } from '../test-utils';
import { vi } from 'vitest';
import AutoSearchCard from '../../src/components/AutoSearchCard';

/**
 * LESSON 6: Testing Click Events and Callback Mocks
 * - When testing user interactions, we often pass a mock function (callback) into the component.
 * - In Vitest, we create a spy/mock function using `vi.fn()`.
 * - We can simulate browser events (like clicks) using React Testing Library's `fireEvent` or `userEvent`.
 * - We then assert that our mock function was called when the user clicked:
 *   `expect(mockHandler).toHaveBeenCalled()` or `expect(mockHandler).toHaveBeenCalledTimes(1)`.
 */
describe('AutoSearchCard Component', () => {

    test('returns null when no autoSearchData is provided', () => {
        const { container } = render(<AutoSearchCard autoSearchData={null} onClickHandler={vi.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    test('returns null when autoSearchData is an empty list', () => {
        const { container } = render(<AutoSearchCard autoSearchData={[]} onClickHandler={vi.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders suggestion list and calls onClickHandler when an item is clicked', () => {
        const mockData = [
            { name: 'Kolkata', country: 'India' },
            { name: 'London', country: 'United Kingdom' }
        ];
        
        // Create a spy/mock function for the click handler
        const mockClickHandler = vi.fn();

        // Render the component
        render(<AutoSearchCard autoSearchData={mockData} onClickHandler={mockClickHandler} />);

        // Assert that the title "Suggestions" exists
        expect(screen.getByText('Suggestions')).toBeInTheDocument();

        // Assert suggestions are in the DOM
        const suggestion1 = screen.getByText('Kolkata');
        const suggestion2 = screen.getByText('London');
        expect(suggestion1).toBeInTheDocument();
        expect(suggestion2).toBeInTheDocument();
        expect(screen.getByText(', India')).toBeInTheDocument();
        expect(screen.getByText(', United Kingdom')).toBeInTheDocument();

        // Act: Simulate a click on the first suggestion item
        // suggestion-item class container represents the clickable suggestion div.
        // It's the parent of Kolkata span. We can click on Kolkata!
        fireEvent.click(suggestion1);

        // Assert: Click callback was invoked!
        expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });
});
