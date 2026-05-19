## 📚 Curriculum Roadmap & Progress Tracker

### Phase 1: Presentation & Rendering Basics
*   **Target Components:** `Footer`, `Loading`
*   **Concepts Learned:** Basic AAA (Arrange-Act-Assert) pattern, case-insensitive Regex queries (`/text/i`), querying HTML elements, and basic matchers.

### Phase 2: Navigation & Context Wrappers
*   **Target Components:** `Header`
*   **Concepts Learned:** Wrapping components in context using `renderWithProviders`, preloading Redux state to mock custom states, and checking router `Link` attributes.

### Phase 3: List Collections & Mapped Arrays
*   **Target Components:** `HourlyForecastCard`, `HourlyForecast`
*   **Concepts Learned:** Asserting mapped lists using `getAllByRole` and `.toHaveLength()`, testing component prop-mapping, and asserting null states.

### Phase 4: Side Effects & Interaction Callbacks
*   **Target Components:** `AutoSearchCard`, `CurrentWeatherCard`
*   **Concepts Learned:** Simulating user click events, creating spy callbacks with `vi.fn()`, verifying callback counts, asserting document body mutations, and utilizing `toContain` to prevent environment style failures.

### Phase 5: Hook Mocking & Key Inputs
*   **Target Components:** `SearchContainer`, `MultipleSearch`
*   **Concepts Learned:** intercepting imports with `vi.mock`, stubbing custom hooks with `mockReturnValue`, simulating text inputs and keypresses (like pressing `Enter`), and testing localStorage side effects.

### Phase 6: Side-by-Side List Comparisons
*   **Target Components:** `CompareWeatherCard`, `CompareWeatherList`
*   **Concepts Learned:** Testing reusable grid layouts and side-by-side component lists by preloading multi-item Redux states.

### Phase 7: Testing Custom Hooks Directly
*   **Target Hooks:** `useWeatherInfo`, `useAutoLocationSearch`, `useMultipleWeatherInfo`
*   **Concepts Learned:** Testing stateful hook logic and async side-effects using RTL's `renderHook()` and `act()`.

### Phase 8: Testing Redux Slices & Reducers
*   **Target Slices:** `weatherSlice.js`
*   **Concepts Learned:** Pure functions unit testing, verifying initial state, and checking reducer action payload state mutations.