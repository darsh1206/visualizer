import { Nav } from "../components/Nav";
import { MyDrawer } from "../components/MyDrawer";
import { Header } from "../components/homeHeader";
import { useState } from "react";
import { QuickSort } from "./QuickSort";
import { MergeSort } from "./MergeSort";
import "../styles.css";

export function HomePage() {
  const Pages = {
    default: Header,
    QuickSort: QuickSort,
    MergeSort: MergeSort,
    // HeapSort: HeapSort,
    // BubbleSort: BubbleSort,
    // SelectionSort: SelectionSort,
    // InsertionSort: InsertionSort,
    // OddEvenSort: OddEvenSort,
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("default");

  const changeActiveComponent = (component) => {
    setActiveComponent(component);
    closeDrawer();
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const ActivePage = Pages[activeComponent] || Pages["default"];
  return (
    <div className="pri-bg">
      <Nav
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        changeActiveComponent={changeActiveComponent}
      />
      <div>
        <MyDrawer
          isOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
          changeActiveComponent={changeActiveComponent}
        />
        <div
          onClick={isDrawerOpen ? closeDrawer : () => {}}
          className={`${isDrawerOpen ? "filter blur-sm " : ""} `}
        >
          <ActivePage toggleDrawer={toggleDrawer} />
        </div>
      </div>
    </div>
  );
}
