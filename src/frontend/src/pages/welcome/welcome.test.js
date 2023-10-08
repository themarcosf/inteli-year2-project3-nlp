const React = require("react");
const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const Welcome = require("./path_to/Welcome");

test("renders Welcome page", () => {
  render(React.createElement(Welcome, null, null), { wrapper: MemoryRouter });
  const welcomeElement = screen.getByText(/Welcome to Nexus/i);
  expect(welcomeElement).toBeInTheDocument();
});
