import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Button from "./Button";

test("should render button with provided label and navigate to destination", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <Button buttonLabel="Test Button" destination="/test" />
    </Router>
  );

  const button = getByText("Test Button");
  expect(button).toBeTruthy();

  fireEvent.click(button);

  // Wait for the navigation to complete
  await waitFor(() => {
    expect(history.location.pathname).toBe("/test");
  });
});
