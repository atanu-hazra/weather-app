import React from 'react';
import { render, screen } from '../test-utils';
import Footer from '../../src/components/footer/Footer';

/**
 * LESSON 1: The Basics of React Testing & Accessibility Queries
 * - `describe` groups related tests together (e.g. testing the Footer component).
 * - `test` (or `it`) defines an individual test block verifying a specific capability.
 * - `render` mounts our React component into a virtual document body provided by jsdom.
 */
describe('Footer Component', () => {

    test('renders the footer with Github and LinkedIn links', () => {
        // Arrange: Mount the Footer component in the test environment
        render(<Footer />);

        /**
         * ROLE QUERIES: `screen.getAllByRole('link')`
         * - RTL promotes accessibility-first testing. This means we query elements by their ARIA roles 
         *   (e.g., 'link' for anchors, 'button' for buttons, 'heading' for h1-h6) just like screen readers perceive them.
         * - `getAllByRole` returns an array of elements matching the role. It throws an error if none are found.
         * - Matcher: `toHaveLength(number)` verifies that we found exactly two links.
         */
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);

        // Act & Assert Link 1: Github
        const githubLink = links[0];
        
        /**
         * MATCHER: `toHaveAttribute(name, value)`
         * - Purpose: Asserts that an element has a specific attribute with a specific value.
         * - Why it's used: Crucial for testing hyper-links and security.
         * - Notice `target="_blank"` and `rel="noopener noreferrer"`. In real-world web apps, 
         *   rel="noopener noreferrer" is essential for security to prevent reverse tab-nabbing vulnerabilities!
         */
        expect(githubLink).toHaveAttribute('href', 'https://github.com/atanu-hazra');
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

        // Act & Assert Link 2: LinkedIn
        const linkedinLink = links[1];
        expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/atanu-hazra');
        expect(linkedinLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
        
        /**
         * DOM TRAVERSAL: `.querySelector('selector')`
         * - If an element doesn't have an ARIA role or unique text, you can query its children 
         *   using standard HTML DOM methods on the element node itself.
         * - Here we verify that each anchor contains a nested graphic `<img>` tag.
         */
        const githubImage = githubLink.querySelector('img');
        const linkedinImage = linkedinLink.querySelector('img');
        
        // Assert Github SVG presence and asset path
        expect(githubImage).toBeInTheDocument();
        expect(githubImage).toHaveAttribute('src', '/github.svg');
        
        // Assert LinkedIn SVG presence and asset path
        expect(linkedinImage).toBeInTheDocument();
        expect(linkedinImage).toHaveAttribute('src', '/linkedin.svg');
    });
});
