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

export function MergeSort() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortStatus, setSortStatus] = useState("Start"); // "Start", "Pause", "Resume", "Finished"
  const [arraySize, setArraySize] = useState(10);
  const delay = useRef(700);
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

  const mergeSort = async (arr, l, r, dispatch) => {
    if (l >= r) {
      return arr;
    }
    // split the array
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m, dispatch);
    await mergeSort(arr, m + 1, r, dispatch);
    await merge(arr, l, m, r, dispatch);
    if (endSort.current) return;
  };
  const merge = async (arr, start, middle, end) => {
    const n1 = middle - start + 1;
    const n2 = end - middle;
    let L = new Array(n1);
    let R = new Array(n2);
    let Lindices = Array.from({ length: n1 }, (_, i) => start + i);
    let Rindices = Array.from({ length: n2 }, (_, i) => middle + 1 + i);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = arr[start + i];
    for (let j = 0; j < n2; j++) R[j] = arr[middle + 1 + j];

    updateColours(dispatch, Lindices, Rindices);

    let i = 0,
      j = 0,
      k = start;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];

        // updating the coloured elements
        Rindices[Rindices.indexOf(j + middle + 1)] = k;
        Lindices[Lindices.indexOf(k)] = j + middle + 1;
        updateColours(dispatch, Lindices, Rindices);

        j++;
      }
      k++;
      dispatch({ type: "setElements", payload: [...arr] });

      if (endSort.current) return;
      await wait(delay.current);
      await waitWhilePaused(paused, endSort);
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }

    dispatch({ type: "setElements", payload: [...arr] });
    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;
    await wait(delay.current);
    updateColours(dispatch, [], []);
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
            mergeSort,
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
      />
    </div>
  );
}
