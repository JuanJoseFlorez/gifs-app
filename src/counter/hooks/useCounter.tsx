import { useState } from "react";

export const useCounter = (initial_value: number = 10) => {
  const [counter, setCounter] = useState<number>(initial_value);

  const handleAdd = () => {
    setCounter((prevState) => prevState + 1);
  };

  const handleSubtract = () => {
    if (counter > 1) {
      setCounter((prevState) => prevState - 1);
    }
  };

  const handleReset = () => {
    setCounter(initial_value);
  };
  return { counter, handleAdd, handleSubtract, handleReset };
};
