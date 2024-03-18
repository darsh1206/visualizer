import React, { useReducer, useEffect, useState } from "react";
import { Controls } from "../components/Controls";
import { BarGraph } from "../components/BarGraph";

const initialState = {
  elements: [],
  activeIndices: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setElements":
      return { ...state, elements: action.payload };
    case "setActiveIndices":
      return { ...state, activeIndices: action.payload };
    case "clearActiveIndices":
      return { ...state, activeIndices: [] };
    default:
      throw new Error();
  }
}

export function QuickSort() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [startSort, setStartSort] = useState(false);
  const [pivotColour, setPivotColour] = useState(-1);
  const [arraySize, setArraySize] = useState(10);
  const randomizeElements = (size) => {
    setStartSort(false);
    const newElements = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100 + 1) // Range changed to 1-100 for simplicity
    );
    dispatch({ type: "setElements", payload: newElements });
  };

  useEffect(() => {
    if (startSort) {
      const arrCopy = [...state.elements]; // Make a copy to sort
      quickSort(arrCopy, 0, arrCopy.length - 1).then(() => {
        setStartSort(false); // Reset the startSort state after sorting completes
        setPivotColour(-1); // Reset pivot colour
      });
    }
  }, [startSort]);

  useEffect(() => {
    randomizeElements(10, 50); // Initializes the array with random elements
  }, []);

  useEffect(() => {
    randomizeElements(arraySize);
  }, [arraySize]);

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);

      await Promise.all([
        quickSort(arr, low, pi - 1),
        quickSort(arr, pi + 1, high),
      ]);
    }
  };

  const delayDuration = 400;
  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    setPivotColour(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Highlight comparison before delay
      dispatch({ type: "setActiveIndices", payload: [j, high] });
      await new Promise((resolve) => setTimeout(resolve, delayDuration));

      if (arr[j] < pivot) {
        i++;
        // Highlight elements to be swapped
        dispatch({ type: "setActiveIndices", payload: [i, j] });
        await new Promise((resolve) => setTimeout(resolve, delayDuration));

        // Perform the swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        dispatch({ type: "setElements", payload: [...arr] });

        // Keep the highlight a bit after swap for visual feedback
        await new Promise((resolve) => setTimeout(resolve, delayDuration));
      }
    }

    // Final swap to place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    dispatch({ type: "setElements", payload: [...arr] });
    // Highlight pivot swap then clear
    dispatch({ type: "setActiveIndices", payload: [i + 1, high] });
    dispatch({ type: "clearActiveIndices" });

    return i + 1;
  };

  return (
    <div>
      <Controls
        random={() => randomizeElements(arraySize)}
        startBtn={() => setStartSort(true)}
        size={(newSize) => setArraySize(newSize)}
      />
      <BarGraph
        data={state.elements}
        activeIndices={state.activeIndices}
        pivotColour={pivotColour}
      />
    </div>
  );
}
