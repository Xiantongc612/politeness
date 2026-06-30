import "./setup.ts";
import { describe, expect, test } from "bun:test";
import { getQueriesForElement, queries } from "@testing-library/dom";
import { fireEvent, render } from "@testing-library/preact";
import App from "../src/App";

function renderApp() {
  const view = render(<App />);
  const screen = getQueriesForElement(view.container, queries);
  return { ...view, screen };
}

describe("App", () => {
  test("renders the heading", () => {
    const { screen } = renderApp();
    expect(screen.getByText("Politeness Check")).toBeTruthy();
  });

  test("renders textarea and check button", () => {
    const { screen } = renderApp();
    expect(screen.getByPlaceholderText("Enter your message...")).toBeTruthy();
    expect(screen.getByText("Check")).toBeTruthy();
  });

  test("shows scores on submit", () => {
    const { screen } = renderApp();
    const textarea = screen.getByPlaceholderText("Enter your message...");
    fireEvent.input(textarea, { target: { value: "Hello world" } });
    fireEvent.click(screen.getByText("Check"));

    expect(screen.getByText("Politeness")).toBeTruthy();
    expect(screen.getAllByText("5/5").length).toBe(3);
    expect(screen.getByText("Reasonable")).toBeTruthy();
    expect(screen.getByText("Efficient")).toBeTruthy();
  });

  test("clears scores when message changes after submit", () => {
    const { screen } = renderApp();
    const textarea = screen.getByPlaceholderText("Enter your message...");
    fireEvent.input(textarea, { target: { value: "Hello" } });
    fireEvent.click(screen.getByText("Check"));
    expect(screen.getAllByText("5/5").length).toBe(3);

    fireEvent.input(textarea, { target: { value: "Hello w" } });
    expect(screen.queryAllByText("5/5").length).toBe(0);
  });

  test("Enter key triggers check", () => {
    const { screen } = renderApp();
    const textarea = screen.getByPlaceholderText("Enter your message...");
    fireEvent.input(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

    expect(screen.getAllByText("5/5").length).toBe(3);
  });

  test("Shift+Enter does not trigger check", () => {
    const { screen } = renderApp();
    const textarea = screen.getByPlaceholderText("Enter your message...");
    fireEvent.input(textarea, { target: { value: "Hello" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    expect(screen.queryByText("5/5")).toBeNull();
  });

  test("empty message does nothing on check", () => {
    const { screen } = renderApp();
    fireEvent.click(screen.getByText("Check"));
    expect(screen.queryByText("5/5")).toBeNull();
  });
});
