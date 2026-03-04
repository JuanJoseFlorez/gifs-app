import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GifList } from "./GifList";
import { getGifsByQuery } from "../../../tests/mocks/getGifsByQuery.response.data";

describe("GifList", () => {
  test("Should render GifList correctly", () => {
    const { container } = render(<GifList gifs={getGifsByQuery} />);
    const gifCards = container.querySelectorAll(".gif-card");

    expect(gifCards).toHaveLength(getGifsByQuery.length);
    expect(container).toMatchSnapshot();
  });

  test("Should render empty list when no gifs are provided", () => {
    const { container } = render(<GifList gifs={[]} />);
    const gifCards = container.querySelectorAll(".gif-card");

    expect(gifCards).toHaveLength(0);
  });
});
