import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootReducer } from "../../store/root-reducer";
import { configureStore } from "@reduxjs/toolkit";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
