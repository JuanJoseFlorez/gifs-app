import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PreviousSearches } from "./PreviousSearches";

describe("PreviousSearches", () => {
  const searches = ["test1", "test2"];
  test("should render PreviousSearches correctly", () => {
    const { container } = render(
      <PreviousSearches searches={searches} onLabelClicked={() => {}} />,
    );

    const listContainerItems = container.querySelector(
      ".previous-searches-list",
    );

    const listItems = listContainerItems?.querySelectorAll("li");

    expect(listItems?.length).toBe(2);
    expect(container).toMatchSnapshot();
  });
  test("should render PreviousSearches correctly with empty searches", () => {
    const { container } = render(
      <PreviousSearches searches={[]} onLabelClicked={() => {}} />,
    );

    const listContainerItems = container.querySelector(
      ".previous-searches-list",
    );

    const listItems = listContainerItems?.querySelectorAll("li");

    expect(listItems?.length).toBe(0);
  });
  test("should call onLabelClicked", () => {
    const onLabelClicked = vi.fn();
    render(
      <PreviousSearches searches={searches} onLabelClicked={onLabelClicked} />,
    );

    const term1 = screen.getByText("test1");

    fireEvent.click(term1);

    expect(onLabelClicked).toBeCalledTimes(1);
  });
});
