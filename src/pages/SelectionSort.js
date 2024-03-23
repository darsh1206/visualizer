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

export function SelectionSort() {
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

  const selectionSort = async (arr, l, r, dispatch) => {
    const red = [];
    for (let i = l; i < r; i++) {
      dispatch({ type: "setRed", payload: red });

      dispatch({ type: "setOrange", payload: [i] });

      // exit or pause
      await waitWhilePaused(paused, endSort);
      if (endSort.current) return;
      await wait(delay.current);

      for (let j = i + 1; j < r + 1; j++) {
        dispatch({ type: "setGreen", payload: [j] });
        if (arr[j] < arr[i]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await wait(delay.current);
          dispatch({ type: "setElements", payload: arr });
        }
        // exit or pause
        await waitWhilePaused(paused, endSort);
        if (endSort.current) return;
        await wait(delay.current);
      }
      red.push(i);
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
            selectionSort,
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
