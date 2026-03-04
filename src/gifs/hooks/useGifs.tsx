import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interfaces";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifResponse = await getGifsByQuery(term);
    setGifs(gifResponse);
    gifsCache.current[term] = gifResponse;
  };

  const handleSearch = async (query: string = "") => {
    // Transform query to lower case and remove white spaces
    query = query.toLowerCase().trim();

    // Validate query is not empty
    if (query.length === 0) return;

    // If term already exists in previousTerm finish
    if (previousTerms.includes(query)) {
      handleTermClicked(query);
      return;
    }
    setPreviousTerms([query, ...previousTerms].splice(0, 8));

    const gifResponse = await getGifsByQuery(query);
    setGifs(gifResponse);

    gifsCache.current[query] = gifResponse;
  };
  return {
    gifs,
    previousTerms,
    handleSearch,
    handleTermClicked,
  };
};
