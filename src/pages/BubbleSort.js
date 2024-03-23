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

export function BubbleSort() {
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

  const bubbleSort = async (arr, l, r, dispatch) => {
    let sorted = true;
    const red = [];
    while (true) {
      for (let i = l; i < r; i++) {
        // focused elements
        updateColours(dispatch, [i, i + 1], []);

        // swap if the element found is greater than the next element
        if (arr[i] > arr[i + 1]) {
          // check for wait for exit
          await waitWhilePaused(paused, endSort);
          if (endSort.current) return;

          await wait(delay.current);
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          dispatch({ type: "setElements", payload: arr });
          sorted = false;
        }

        // check for wait for exit
        await waitWhilePaused(paused, endSort);
        if (endSort.current) return;

        // remove focused elements
        await wait(delay.current);
        updateColours(dispatch, [], []);
      }
      if (sorted) {
        break;
      }
      // sorted end elements
      red.push(r);
      dispatch({ type: "setRed", payload: red });

      r--;
      sorted = true;
    }

    dispatch({ type: "setRed", payload: [] });
    // check for wait for exit
    await waitWhilePaused(paused, endSort);
    if (endSort.current) return;
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
            bubbleSort,
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
