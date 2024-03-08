import { useEffect, useState } from "react";
import { Controls } from "../components/Controls";
import { BarGraph } from "../components/BarGraph";

export function QuickSort() {
  const [el, setEl] = useState([]);
  const [first, setfirst] = useState(false);
  const [size, setSize] = useState(10);

  function randomizeElments(size, range) {
    let elements = [];
    while (size--) {
      elements.push(Math.floor(Math.random() * range + 1));
    }
    setEl(elements);
  }

  function changeSize(newSize) {
    setSize(newSize);
    randomizeElments(newSize, 50);
  }
  if (!first) {
    randomizeElments(50, 50);
    setfirst(true);
  }
  return (
    <div>
      <Controls random={randomizeElments} size={changeSize} />
      <BarGraph data={el} />
    </div>
  );
}
