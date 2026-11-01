import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import store from "./Redux/store";
import TopBar from "./components/TopBar/TopBar";

test("calls the login and registration handlers", () => {
  const onLoginClick = vi.fn();
  const onRegitrsationClick = vi.fn();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <TopBar
          onLoginClick={onLoginClick}
          onRegitrsationClick={onRegitrsationClick}
        />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Register" }));
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  expect(onRegitrsationClick).toHaveBeenCalledOnce();
  expect(onLoginClick).toHaveBeenCalledOnce();
});
