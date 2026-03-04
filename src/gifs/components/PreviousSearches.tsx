import type { FC } from "react";

interface Props {
  searches: string[];
  onLabelClicked: (term: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClicked }) => {
  return (
    <div className="previous-searches">
      <h2>Previous Searches</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li onClick={() => onLabelClicked(term)} key={term}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};
