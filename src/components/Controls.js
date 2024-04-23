import "../styles.css";
import { useState, React } from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function DropDown({ list, changeActiveComponent }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Quick Sort");
  const listValues = Object.keys(list);

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    setOpenMenu(false);
    changeActiveComponent(sort.replace(" ", ""));
  };

  return (
    <div className="relative inline-block mt-4 lg:mt-3 hover:text-black mx-2 sm:mx-2 lg:mx-2">
      <Menu open={openMenu} handler={setOpenMenu} allowHover>
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center text-sm lg:text-base font-normal capitalize tracking-normal border border-gray-300 rounded-md px-2 py-1 md:px-2 lg:px-2 md:py-1 lg:py-1 sm:py-0 transition-colors duration-300 hover:bg-gray-100 sec-bg"
          >
            {selectedSort}
            <ChevronDownIcon
              className={`h-5 w-5 md:h-4 lg:h-5 transition-transform ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="absolute z-10 top-full left-0 bg-white rounded-md shadow-lg border border-gray-300 divide-y divide-gray-100 ">
          {listValues.map((title, index) => (
            <motion.li
              key={index}
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: 10 },
              }}
              transition={{ duration: 0.2 }}
              initial="closed"
              animate={openMenu ? "open" : "closed"}
              className="px-4 py-2 text-sm md:text-xs lg:text-sm hover:bg-gray-100 cursor-pointer list-none"
              onClick={() => handleSortChange(title.replace("Sort", " Sort"))}
            >
              {title.replace("Sort", " Sort")}
            </motion.li>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

function Speed({ onSpeedChange }) {
  const handleSpeedChange = (e) => {
    const newSpeed = e.target.value;
    onSpeedChange(newSpeed);
  };
  return (
    <div className="flex-row lg:mt-4 sm:mt-5">
      <input
        onChange={handleSpeedChange}
        type="range"
        className="p-2 m-3 sm:pt-2 pt-7 range-slider bg-transparent text-xs md:text-base lg:text-sm"
        min="0"
        max="800"
        defaultValue={100}
        style={{ width: "7rem" }}
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
    <div className="flex-row lg:mt-4 sm:mt-5">
      <input
        type="range"
        onChange={handleChange}
        className="p-2 m-3 sm:pt-2 pt-7 range-slider bg-transparent text-sm md:text-base lg:text-sm"
        min="5"
        defaultValue={10}
        max="150"
        style={{ width: "7rem" }}
      ></input>
    </div>
  );
}

function Buttons({ random, range, handleSortControl, sortStatus, list }) {
  return (
    <div className="">
      <button
        onClick={handleSortControl}
        className={`font-bold p-2 m-3 text-sm md:text-base lg:text-sm hover:${
          sortStatus === "Pause" ? " hover:bg-red-700" : " hover:bg-green-700"
        } hover:text-white hover:scale-110 rounded-lg hover:shadow-md`}
      >
        {sortStatus}
      </button>
      <button
        onClick={() => random(range, 50)}
        className="font-bold p-2 m-3 sm:p-0 text-sm md:text-base lg:text-sm hover:bg-cyan-700 active:bg-cyan-600 hover:text-white hover:scale-110 rounded-lg hover:shadow-md"
      >
        Randomize
      </button>
    </div>
  );
}

export function Controls({
  random,
  size,
  onSpeedChange,
  handleSortControl,
  sortStatus,
  name,
  list,
  changeActiveComponent,
}) {
  const [range, setRange] = useState(50);

  function changeRange(newRange) {
    setRange(newRange);
  }
  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row flex-wrap text-white bg-sky-900 ">
      <div className="flex flex-row flex-wrap">
        <Buttons
          random={random}
          range={range}
          handleSortControl={handleSortControl}
          sortStatus={sortStatus}
        />
        <DropDown list={list} changeActiveComponent={changeActiveComponent} />
      </div>
      <div className="flex flex-row flex-wrap">
        <label className="p-2 m-3 text-sm md:text-base lg:text-sm px-0 lg:px-2 ml-5 lg:ml-3">
          Speed
        </label>
        <Speed onSpeedChange={onSpeedChange} />
        <label className="p-2 m-3 text-sm md:text-base lg:text-sm px-0 lg:px-2">
          Size
        </label>
        <Size size={size} range={changeRange} />
      </div>
    </div>
  );
}
