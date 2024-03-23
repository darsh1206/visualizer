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

export function InsertionSort() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortStatus, setSortStatus] = useState("Start"); // "Start", "Pause", "Resume", "Finished"
  const [arraySize, setArraySize] = useState(10);
  const delay = useRef(700);
  const sorting = useRef(false);
  const paused = useRef(false);
  const endSort = useRef(false);

  const insertionSort = async (arr, l, r, dispatch) => {
    for (let i = l; i < r; i++) {
      dispatch({ type: "setGreen", payload: [i, i + 1] });
      await wait(delay.current);

      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        await wait(delay.current);
        dispatch({ type: "setElements", payload: arr });

        await waitWhilePaused(paused, endSort);
        if (endSort.current) return;

        let j = i;
        dispatch({ type: "setGreen", payload: [j, j - 1] });
        while (j > 0 && arr[j] < arr[j - 1]) {
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          await wait(delay.current);
          dispatch({ type: "setElements", payload: arr });

          await waitWhilePaused(paused, endSort);
          if (endSort.current) return;
          j--;
          dispatch({ type: "setGreen", payload: [j, j - 1] });
        }
      }
    }
    dispatch({ type: "setGreen", payload: [] });
  };

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
            insertionSort,
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
