import { Nav } from "../components/Nav";
import { MyDrawer } from "../components/MyDrawer";
import { Header } from "../components/homeHeader";
import { useState, useEffect } from "react";
import { Visualizer } from "./Visualizer";
import "../styles.css";
import { Implementations } from "../components/Implementations";

export function HomePage() {
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

  const ActivePage = activeComponent === "default" ? Header : Visualizer;

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
          <ActivePage toggleDrawer={toggleDrawer} name={activeComponent} />
          <Implementations name={activeComponent} />
        </div>
      </div>
    </div>
  );
}
