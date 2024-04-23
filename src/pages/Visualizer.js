import React, { useReducer, useEffect, useState, useRef } from "react";
import { Controls } from "../components/Controls";
import { BarGraph } from "../components/BarGraph";
import { initialState, reducer } from "../components/SorterReducer";
import {
  randomizeElements,
  handleSortControl,
  updateSpeed,
} from "../components/SorterUtils";
import {
  mergeSort,
  heapSort,
  quickSort,
  bubbleSort,
  insertionSort,
  selectionSort,
} from "./Algorithms";

const algos = {
  MergeSort: mergeSort,
  HeapSort: heapSort,
  QuickSort: quickSort,
  BubbleSort: bubbleSort,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort,
};
export function Visualizer({ name, changeActiveComponent }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortStatus, setSortStatus] = useState("Start");
  const [arraySize, setArraySize] = useState(10);
  const delay = useRef(700);
  const sorting = useRef(false);
  const paused = useRef(false);
  const endSort = useRef(false);
  const algorithm = algos[name];
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
  }, [arraySize, name]);

  return (
    <div>
      <Controls
        list={algos}
        changeActiveComponent={changeActiveComponent}
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
            algorithm,
            state.elements,
            dispatch,
            endSort,
            delay,
            red
          )
        }
        sortStatus={sortStatus}
        size={setArraySize}
        onSpeedChange={(newSpeed) => updateSpeed(delay, newSpeed)}
        name={name}
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
