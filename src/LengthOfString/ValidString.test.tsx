import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import ValidString from "./ValidString";

test("valid string input", () => {
  render(<ValidString />);

  const input = screen.getByRole("textbox");
  const button = screen.getByText("Click");

  fireEvent.change(input, { target: { value: "abc" } });
  fireEvent.click(button);

  expect(
    screen.queryByText(/valid string between 3 and 5 characters/i)
  ).toBeNull();
});

test("invalid string input", () => {
  render(<ValidString />);

  const input = screen.getByRole("textbox");
  const button = screen.getByText("Click");

  fireEvent.change(input, { target: { value: "a" } });
  fireEvent.click(button);

  expect(
    screen.getByText(/valid string between 3 and 5 characters/i)
  ).toBeInTheDocument();
});
