import React, { useReducer, useEffect, useState, useRef } from "react";
import { Controls } from "../components/Controls";
import { BarGraph } from "../components/BarGraph";
import { initialState, reducer } from "../components/SorterReducer";
import {
  wait,
  waitWhilePaused,
  randomizeElements,
  handleSortControl,
  updateSpeed,
} from "../components/SorterUtils";

export function QuickSort() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortStatus, setSortStatus] = useState("Start"); // "Start", "Pause", "Resume", "Finished"
  const [arraySize, setArraySize] = useState(10);
  const delay = useRef(100);
  const sorting = useRef(false);
  const paused = useRef(false);
  const endSort = useRef(false);

  useEffect(() => {
    randomizeElements(
      arraySize,
      dispatch,
      sortStatus,
      setSortStatus,
      sorting,
      endSort,
      delay
    );
  }, [arraySize]);

  const quickSort = async (arr, low, high, dispatch) => {
    if (low < high) {
      let pi = await partition(arr, low, high, dispatch);
      await Promise.all([
        quickSort(arr, low, pi - 1, dispatch),
        quickSort(arr, pi + 1, high, dispatch),
      ]);
    }

    dispatch({ type: "setGreen", payload: [] });
  };

  const partition = async (arr, low, high, dispatch) => {
    let pivot = arr[high];
    dispatch({ type: "setOrange", payload: [high] });
    let i = low - 1;

    for (let j = low; j < high; j++) {
      dispatch({ type: "setGreen", payload: [j] });
      await wait(delay.current);

      if (arr[j] < pivot) {
        i++;
        // Highlight elements to be swapped
        dispatch({ type: "setGreen", payload: [i, j] });
        wait(delay.current);

        // Perform the swap
        [arr[i], arr[j]] = [arr[j], arr[i]];
        dispatch({ type: "setElements", payload: [...arr] });
        // Keep the highlight a bit after swap for visual feedback
      }
      await wait(delay.current);
      if (endSort.current) {
        return;
      }
      await waitWhilePaused(paused, endSort);
      if (endSort.current) {
        return;
      }
    }

    // Final swap to place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    dispatch({ type: "setElements", payload: [...arr] });
    dispatch({ type: "setGreen", payload: [i + 1] });
    dispatch({ type: "setGreen", payload: [] });
    await wait(delay.current);
    return i + 1;
  };

  return (
    <div>
      <Controls
        random={() =>
          randomizeElements(
            arraySize,
            dispatch,
            sortStatus,
            setSortStatus,
            sorting,
            endSort,
            delay
          )
        }
        handleSortControl={() =>
          handleSortControl(
            sortStatus,
            setSortStatus,
            sorting,
            paused,
            quickSort,
            state.elements,
            dispatch
          )
        }
        sortStatus={sortStatus}
        size={setArraySize}
        onSpeedChange={(newSpeed) => updateSpeed(delay, newSpeed)}
      />
      <BarGraph
        data={state.elements}
        changeGreen={state.Green}
        changeOrange={state.Orange}
        changeRed={state.Red}
      />
    </div>
  );
}
