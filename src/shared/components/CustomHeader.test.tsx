import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "test title";
  test("should render title correctly", () => {
    render(<CustomHeader title={title} />);

    // const title = screen.getByRole("heading", { level: 1 });
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeDefined();
  });
  test("should render description when provided", () => {
    const description = "test description";
    render(<CustomHeader title={title} description={description} />);
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });
  test("should not render description when not provided", () => {
    const { container } = render(<CustomHeader title="test title" />);
    const divElement = container.querySelector(".content-center");
    const h1 = divElement?.querySelector("h1");
    expect(h1?.innerHTML).toBe(title);

    const p = divElement?.querySelector("p");
    expect(p).toBeNull();
  });
});
