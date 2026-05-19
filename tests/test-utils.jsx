import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import weatherReducer from '../src/store/weatherSlice';

/**
 * Custom render helper that wraps components with a Redux Provider and React Router.
 * This prevents context errors and isolates each test with its own store state.
 */
function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { weather: weatherReducer },
      preloadedState,
    }),
    route = '/',
    history = [route],
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={history}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
export { renderWithProviders };
