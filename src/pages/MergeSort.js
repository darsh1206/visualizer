import React, { useReducer, useEffect, useState, useRef } from "react";
import { Controls } from "../components/Controls";
import { BarGraph } from "../components/BarGraph";

const initialState = {
  elements: [],
  leftArray: [],
  rightArray: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setElements":
      return { ...state, elements: action.payload };
    case "setLeftArray":
      return { ...state, leftArray: action.payload };
    case "setRightArray":
      return { ...state, rightArray: action.payload };
    default:
      throw new Error();
  }
}

export function MergeSort() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortStatus, setSortStatus] = useState("Start"); // "Start", "Pause", "Resume", "Finished"
  const [arraySize, setArraySize] = useState(10);
  const delayDuration = useRef(100);
  delayDuration.current = 700;
  const sorting = useRef(false);
  const paused = useRef(false);
  const endSort = useRef(false);

  const randomizeElements = async (size) => {
    await EndSort();
    const newElements = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100 + 1)
    );
    dispatch({ type: "setElements", payload: newElements });
    setSortStatus("Start");
    sorting.current = false;
  };

  useEffect(() => {
    randomizeElements(arraySize);
  }, [arraySize]);

  const EndSort = async () => {
    endSort.current = true;
    const temp = delayDuration.current;
    delayDuration.current = 0;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateColours([], []);
    endSort.current = false;
    delayDuration.current = temp;
  };

  const updateColours = (green, orange) => {
    dispatch({
      type: "setLeftArray",
      payload: green,
    });
    dispatch({
      type: "setRightArray",
      payload: orange,
    });
  };

  // Pause the function
  const waitWhilePaused = () =>
    new Promise((resolve) => {
      const checkPause = setInterval(() => {
        if (!paused.current || endSort.current) {
          clearInterval(checkPause);
          resolve();
        }
      }, 100);
    });

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

    updateColours(Lindices, Rindices);

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
        updateColours(Lindices, Rindices);

        j++;
      }
      k++;
      dispatch({ type: "setElements", payload: [...arr] });

      if (endSort.current) return;
      await new Promise((resolve) =>
        setTimeout(resolve, delayDuration.current)
      );
      await waitWhilePaused();
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
    await waitWhilePaused();
    if (endSort.current) return;
    await new Promise((resolve) => setTimeout(resolve, delayDuration.current));
    dispatch({
      type: "setLeftArray",
      payload: [],
    });
    dispatch({
      type: "setRightArray",
      payload: [],
    });
  };

  const updateSpeed = (newSpeed) => {
    delayDuration.current = 800 - newSpeed;
  };

  const handleSortControl = () => {
    if (sortStatus === "Start" || sortStatus === "Resume") {
      if (!sorting.current) {
        sorting.current = true;
        paused.current = false;
        setSortStatus("Pause");
        mergeSort(
          [...state.elements],
          0,
          state.elements.length - 1,
          dispatch
        ).then(() => {
          setSortStatus("Start");
          sorting.current = false;
        });
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
        changeGreen={state.leftArray}
        changeOrange={state.rightArray}
      />
    </div>
  );
}
