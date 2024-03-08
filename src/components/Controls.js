import { input } from "@material-tailwind/react";
import "../styles.css";
import { useState } from "react";

function Speed() {
  return (
    <div className="flex-row">
      <input
        type="range"
        className=" p-3 m-3 pt-7 range-slider bg-transparent"
        min="0"
        max="1000"
      ></input>
    </div>
  );
}

function Size({ size, range }) {
  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    range(newValue);
    size(newValue);
  };

  return (
    <div className="flex-row ">
      <input
        type="range"
        onChange={handleChange}
        className="w-40 p-3 m-3 pt-7 range-slider bg-transparent"
        min="5"
        max="500"
      ></input>
    </div>
  );
}

function Buttons({ random, range }) {
  const [status, setStatus] = useState(false);

  function changeStatus() {
    setStatus(!status);
  }
  console.log(range);
  return (
    <div className="">
      <button
        onClick={changeStatus}
        className={`font-bold p-2 m-3 hover:${
          !status ? " hover:bg-green-700" : " hover:bg-red-700"
        } hover:text-white hover:scale-110 rounded-lg hover:shadow-md`}
      >
        {status ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => random(range, 50)}
        className="font-bold p-2 m-3 hover:bg-cyan-700 active:bg-cyan-600 hover:text-white hover:scale-110 rounded-lg hover:shadow-md"
      >
        Randomize
      </button>
      <button className="font-bold p-2 m-3 hover:bg-cyan-700 active:bg-cyan-600 hover:text-white hover:scale-110 rounded-lg hover:shadow-md">
        Custom Values
      </button>
    </div>
  );
}
export function Controls({ random, size }) {
  const [range, setRange] = useState(50);

  function changeRange(newRange) {
    setRange(newRange);
  }
  return (
    <div className="flex flex-row flex-wrap text-white bg-sky-900 ">
      <Buttons random={random} range={range} />
      <label className="p-2 m-3">Speed</label>
      <Speed />
      <label className="p-2 m-3 ">Array size</label>
      <Size size={size} range={changeRange} />
    </div>
  );
}
