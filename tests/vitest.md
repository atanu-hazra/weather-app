# 🎓 React & Vitest Testing Mastery Curriculum

A comprehensive, phase-by-phase study guide and progress tracker for learning how to test React components like a pro using **Vitest** and **React Testing Library (RTL)**.

---

## 🛠️ Testing Command Cheat Sheet

We have configured several powerful npm scripts inside `package.json` to make running and debugging tests a breeze:

*   **`npm run test`**
    *   *What it does:* Runs Vitest in interactive watch mode.
    *   *When to use:* While coding! It automatically re-runs only the tests affected by your changes as you save files.
*   **`npm run test:ui`** 🖥️
    *   *What it does:* Launches a gorgeous, interactive browser-based dashboard.
    *   *When to use:* Excellent for visualizing test files, code structures, and debugging failed assertions visually.
*   **`npm run test:run`**
    *   *What it does:* Runs all tests once and exits.
    *   *When to use:* Perfect for pre-commit hooks, CI/CD pipelines, or as a final check before deploying.
*   **`npm run test:coverage`** 📊
    *   *What it does:* Audits your code and tells you exactly what percentage of lines, branches, and functions are covered by tests.

---

## 🎯 Matcher Study Guide (The Real-World Favorites)

Here is a quick-reference guide explaining the matchers we use in our tests and their exact purpose:

| Matcher | Real-World Purpose | Real-World Example |
| :--- | :--- | :--- |
| **`toBeInTheDocument()`** | ⭐ **Most Used!** Proves that an HTML element exists in the DOM. | `expect(screen.getByText('Mumbai')).toBeInTheDocument();` |
| **`not.toBeInTheDocument()`** | Asserts that an element is **absent** from the DOM (e.g. loader disappeared). | `expect(screen.queryByText('🌙')).not.toBeInTheDocument();` |
| **`toHaveAttribute(attr, val)`** | Verifies critical element attributes (like `href` links, `src` images, `type`). | `expect(homeLink).toHaveAttribute('href', '/');` |
| **`toHaveClass(...classes)`** | Asserts specific CSS or Tailwind styles are applied on an element. | `expect(text).toHaveClass('text-sm', 'uppercase');` |
| **`toHaveStyle(styleObj)`** | Checks inline CSS style declarations. | `expect(dot).toHaveStyle({ background: 'linear-gradient(...)' });` |
| **`toBeNull()`** | Asserts a value is strictly `null` (useful for components returning `null`). | `expect(container.firstChild).toBeNull();` |
| **`toHaveLength(number)`** | Verifies the size of a mapped list collection or array of matching elements. | `expect(cards).toHaveLength(4);` |
| **`toContain(substring)`** | Asserts that a string contains a partial text (e.g., dynamic gradients or logs). | `expect(gradientStr).toContain('rgb(74, 144, 226)');` |

---
