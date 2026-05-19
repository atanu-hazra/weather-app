import React from 'react';
import { render, screen } from '../test-utils';
import Loading from '../../src/components/loading/Loading';

/**
 * LESSON 2: Testing Styles, Classes, and CSS Gradients
 * - Visual elements often depend on dynamic CSS classes or inline styles.
 * - RTL provides robust tools to check classes (`toHaveClass`) and inline style declarations (`toHaveStyle`).
 */
describe('Loading Component', () => {

    test('renders the loading text and loader rings', () => {
        // Arrange: Render static Loading component
        render(<Loading />);

        /**
         * REGEX QUERYING: `screen.getByText(/loading/i)`
         * - Using a regular expression (like `/loading/i` where `i` means case-insensitive) is highly recommended.
         * - It makes tests robust: if a designer changes "loading" to "LOADING" or "Loading...", the test will not break!
         * - Matcher: `toBeInTheDocument()` confirms the text exists in the DOM.
         */
        const loadingText = screen.getByText(/loading/i);
        expect(loadingText).toBeInTheDocument();

        /**
         * MATCHER: `toHaveClass(...classNames)`
         * - Purpose: Asserts that an element has the specified CSS/Tailwind class names.
         * - Why it's used: Ensures that structural layout and typography classes (like `text-sm`, `uppercase`) are not accidentally modified or deleted.
         */
        expect(loadingText).toHaveClass('text-sm', 'text-white/40', 'uppercase');
        
        /**
         * ELEMENT SELECTION BY SELECTORS: `document.querySelector`
         * - For pure graphical layout elements (like loading spinner rings or decorative dots) 
         *   that don't contain accessible texts, standard CSS class selectors can be used to query them.
         */
        const loadingRing = document.querySelector('.loading-ring');
        const loadingDot = document.querySelector('.loading-dot');

        expect(loadingRing).toBeInTheDocument();
        expect(loadingDot).toBeInTheDocument();
        
        /**
         * MATCHER: `toHaveStyle(styleObject)`
         * - Purpose: Checks inline CSS style declarations.
         * - Why it's used: Perfect for asserting dynamic layouts, gradients, or colors (e.g. background transitions or loading rings).
         */
        expect(loadingDot).toHaveStyle({
            background: 'linear-gradient(135deg, #6ee7b7, #67e8f9)'
        });
    });
});
