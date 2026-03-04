import { describe, expect, test, vi } from "vitest";

import { act, renderHook } from "@testing-library/react";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

vi.mock("../actions/get-gifs-by-query.action", () => ({
  getGifsByQuery: vi.fn().mockResolvedValue([
    {
      id: "Nzz86dByLtYTS",
      title: "naruto shippuden GIF",
      url: "https://media1.giphy.com/media/v1.Y2lkPTBiOTliNTcxcHZ2dnE5aWt6Nm9lZjNiYmZvZjRxMTlrZnJqNXh0c3ppNXoyZmRkYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Nzz86dByLtYTS/giphy.gif",
      width: 500,
      height: 283,
      size: 1038037,
    },
    {
      id: "JRlqKEzTDKci5JPcaL",
      title: "Naruto Uzumaki Running GIF by MOODMAN",
      url: "https://media0.giphy.com/media/v1.Y2lkPTBiOTliNTcxcHZ2dnE5aWt6Nm9lZjNiYmZvZjRxMTlrZnJqNXh0c3ppNXoyZmRkYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JRlqKEzTDKci5JPcaL/giphy.gif",
      width: 480,
      height: 226,
      size: 274617,
    },
  ]),
}));

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearch("Naruto");
    });
    expect(result.current.gifs.length).toBe(2);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });
    expect(result.current.gifs.length).toBe(2);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });

    expect(result.current.gifs.length).toBe(2);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error"),
    );

    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });

    expect(result.current.gifs.length).toBe(2);
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("naruto1");
    });
    await act(async () => {
      await result.current.handleSearch("naruto2");
    });
    await act(async () => {
      await result.current.handleSearch("naruto3");
    });
    await act(async () => {
      await result.current.handleSearch("naruto4");
    });
    await act(async () => {
      await result.current.handleSearch("naruto5");
    });
    await act(async () => {
      await result.current.handleSearch("naruto6");
    });
    await act(async () => {
      await result.current.handleSearch("naruto7");
    });
    await act(async () => {
      await result.current.handleSearch("naruto8");
    });
    await act(async () => {
      await result.current.handleSearch("naruto9");
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      "naruto9",
      "naruto8",
      "naruto7",
      "naruto6",
      "naruto5",
      "naruto4",
      "naruto3",
      "naruto2",
    ]);
  });

  test("should validate whether an empty query performs a search", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("");
    });
    expect(result.current.previousTerms).toStrictEqual([]);
  });

  test("should validate if query is already present in previousTerms", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("test");
    });
    expect(result.current.previousTerms).toStrictEqual(["test"]);

    await act(async () => {
      await result.current.handleSearch("test");
    });
    expect(result.current.previousTerms).toStrictEqual(["test"]);
  });
});
