import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Button from "./Button";

test("should render button with provided label and navigate to destination", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <BrowserRouter>
      <Button buttonLabel="Test Button" destination="/test" />
    </BrowserRouter>
  );

  const button = getByText("Test Button");
  expect(button).toBeTruthy();

  fireEvent.click(button);

  // Wait for the navigation to complete
  await waitFor(() => {
    // Access the current location using window.location.pathname
    expect(window.location.pathname).toBe("/test");
  });
});
