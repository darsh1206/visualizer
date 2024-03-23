import React, { useReducer, useEffect, useState, useRef } from "react";
import { Controls } from "../components/Controls";
import { BarGraph } from "../components/BarGraph";
import { initialState, reducer } from "../components/SorterReducer";
import {
  wait,
  waitWhilePaused,
  randomizeElements,
  updateColours,
  handleSortControl,
  updateSpeed,
} from "../components/SorterUtils";

export function HeapSort(arr) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortStatus, setSortStatus] = useState("Start"); // "Start", "Pause", "Resume", "Finished"
  const [arraySize, setArraySize] = useState(10);
  const delay = useRef(700);
  const sorting = useRef(false);
  const paused = useRef(false);
  const endSort = useRef(false);
  const red = [];
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

  const heapSort = async (arr, l, r, dispatch) => {
    const n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await max_heapify(arr, n, i, dispatch);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      await waitWhilePaused(paused, endSort);
      if (endSort.current) return;
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      dispatch({ type: "setElements", payload: [...arr] });
      updateColours(dispatch, [0, i], []); // Update colours to highlight the swap
      await wait(delay.current); // Introduce a delay for visualization

      red.push(i);
      dispatch({ type: "setRed", payload: [...red] });

      // call max heapify on the reduced heap
      await max_heapify(arr, i, 0, dispatch);
    }
    // Clear colours after sorting is done
    updateColours(dispatch, [], []);
    dispatch({ type: "setRed", payload: [] });
  };
  const max_heapify = async (arr, n, i, dispatch) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = left + 1;

    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;

    // focusing on the elemnts
    if (right < n) updateColours(dispatch, [largest], [left, right]);
    else if (left < n) updateColours(dispatch, [largest], [left]);

    await wait(delay.current);

    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;

    // swapping indexes based on their values
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      // swapping values
      updateColours(dispatch, [i, largest], []);
      await wait(delay.current);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      dispatch({ type: "setElements", payload: arr });
      await wait(delay.current);

      await waitWhilePaused(paused, endSort);
      if (endSort.current) return;

      // clear focused elements
      updateColours(dispatch, [], []);
      // recurse to heapify the array
      await max_heapify(arr, n, largest, dispatch);
    } else {
      // clear focused elements
      updateColours(dispatch, [], []);
    }
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
            heapSort,
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
