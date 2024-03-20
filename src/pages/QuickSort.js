import React, { useReducer, useEffect, useState, useRef } from "react";
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
  const [sortStatus, setSortStatus] = useState("Start"); // "Start", "Pause", "Resume", "Finished"
  const [arraySize, setArraySize] = useState(10);
  const [pivotColour, setPivotColour] = useState(-1);
  const delayDuration = useRef(100);
  const sorting = useRef(false);
  const paused = useRef(false);
  const endSort = useRef(false);

  useEffect(() => {
    randomizeElements(arraySize);
  }, [arraySize]);

  const EndSort = async () => {
    endSort.current = true;
    const temp = delayDuration.current;
    delayDuration.current = 0;
    await new Promise((resolve) => setTimeout(resolve, 200));
    endSort.current = false;
    delayDuration.current = temp;
  };
  const randomizeElements = async (size) => {
    await EndSort();
    const newElements = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    dispatch({ type: "setElements", payload: newElements });
    setSortStatus("Start");
    sorting.current = false;
  };

  const waitWhilePaused = () =>
    new Promise((resolve) => {
      const checkPause = setInterval(() => {
        if (!paused.current) {
          clearInterval(checkPause);
          resolve();
        }
      }, 100);
    });
  const quickSort = async (arr, low, high) => {
    if (low < high) {
      await waitWhilePaused();
      let pi = await partition(arr, low, high);
      await Promise.all([
        quickSort(arr, low, pi - 1),
        quickSort(arr, pi + 1, high),
      ]);
    }
    setPivotColour(-1);
    dispatch({ type: "setActiveIndices", payload: [] });
  };

  const updateSpeed = (newSpeed) => {
    delayDuration.current = 800 - newSpeed;
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    setPivotColour(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      dispatch({ type: "setActiveIndices", payload: [j] });
      await new Promise((resolve) =>
        setTimeout(resolve, delayDuration.current)
      );

      if (arr[j] < pivot) {
        i++;
        // Highlight elements to be swapped
        dispatch({ type: "setActiveIndices", payload: [i, j] });
        await new Promise((resolve) =>
          setTimeout(resolve, delayDuration.current)
        );

        // Perform the swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        dispatch({ type: "setElements", payload: [...arr] });

        // Keep the highlight a bit after swap for visual feedback
        await new Promise((resolve) =>
          setTimeout(resolve, delayDuration.current)
        );
      }
      if (endSort.current) {
        return;
      } else if (paused.current) {
        await new Promise((resolve) => {
          const intervalId = setInterval(() => {
            if (!paused.current) {
              clearInterval(intervalId);
              resolve();
            }
          }, 100);
        });
      }
    }

    // Final swap to place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    dispatch({ type: "setElements", payload: [...arr] });
    // Highlight pivot swap then clear
    dispatch({ type: "setActiveIndices", payload: [i + 1] });
    dispatch({ type: "clearActiveIndices" });

    return i + 1;
  };

  const handleSortControl = () => {
    if (sortStatus === "Start" || sortStatus === "Resume") {
      if (!sorting.current) {
        sorting.current = true;
        paused.current = false;
        setSortStatus("Pause");
        quickSort([...state.elements], 0, state.elements.length - 1).then(
          () => {
            setSortStatus("Start");
            sorting.current = false;
          }
        );
      } else {
        paused.current = false;
        setSortStatus("Pause");
      }
    } else if (sortStatus === "Pause") {
      paused.current = true;
      setSortStatus("Resume");
    }
  };

  return (
    <div>
      <Controls
        random={() => randomizeElements(arraySize)}
        handleSortControl={handleSortControl}
        sortStatus={sortStatus}
        size={setArraySize}
        updateSpeed={updateSpeed}
      />
      <BarGraph
        data={state.elements}
        activeIndices={state.activeIndices}
        pivotColour={pivotColour}
      />
    </div>
  );
}
