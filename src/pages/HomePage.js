import { Nav } from "../components/Nav";
import { MyDrawer } from "../components/MyDrawer";
import { Header } from "../components/homeHeader";
import { useState } from "react";
import { Visualizer } from "./Visualizer";
import "../styles.css";
import { Implementations } from "../components/Implementations";
import { Description } from "../components/Description";

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
  const DescriptionPage = activeComponent === "default" ? "div" : Description;

  return (
    <div className="pri-bg">
      <MyDrawer
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        toggleDrawer={toggleDrawer}
        isDrawerOpen={isDrawerOpen}
        changeActiveComponent={changeActiveComponent}
      />
      <div
        className={`${
          isDrawerOpen ? "filter blur-sm pointer-events-none" : ""
        } `}
      >
        <Nav
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          changeActiveComponent={changeActiveComponent}
        />
        <div
          onClick={isDrawerOpen ? closeDrawer : () => {}}
          
        >
          <div className="pb-20">
            <ActivePage toggleDrawer={toggleDrawer} name={activeComponent} />
          </div>
          <hr></hr>
          <div
            className={`bg-slate-800 ${
              activeComponent !== "default" ? "py-32" : ""
            }`}
          >
            <DescriptionPage name={activeComponent} />
          </div>
          <hr></hr>
          <Implementations name={activeComponent} />
        </div>
      </div>
    </div>
  );
}
