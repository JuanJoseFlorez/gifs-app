import type { FC } from "react";
import type { Gif } from "../../gifs/interfaces/gif.interfaces";

interface Props {
  gifs: Gif[];
}

export const GifList: FC<Props> = ({ gifs }) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div className="gif-card" key={gif.id}>
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <p>
            {gif.width}x{gif.height} ({(gif.size / (1024 * 1024)).toFixed(2)}{" "}
            MB)
          </p>
        </div>
      ))}
    </div>
  );
};
