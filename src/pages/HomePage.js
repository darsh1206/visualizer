import { Nav } from "../components/Nav";
import { useState, useEffect } from "react";
import { Visualizer } from "./Visualizer";
import "../styles.css";
import { Implementations } from "../components/Implementations";
import { Description } from "../components/Description";
import { Footer } from "../components/Footer";

export function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("QuickSort");

  const changeActiveComponent = (component) => {
    setActiveComponent(component);
    closeDrawer();
  };

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page with smooth behavior
    };

    // Call scrollToTop when the component mounts or when the page is refreshed
    window.onload = scrollToTop;

    // Cleanup
    return () => {
      window.onload = null; // Remove the onload event handler when the component unmounts
    };
  }, []);

  return (
    <div className="pri-bg">
      <div>
        <Nav toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      </div>
      <div>
        <div>
          <div className="pb-20">
            <Visualizer
              toggleDrawer={toggleDrawer}
              name={activeComponent}
              changeActiveComponent={changeActiveComponent}
            />
          </div>

          <div className="flex flex-col items-center md:flex-row justify-center align-middle bg-slate-800 py-32">
            <Description name={activeComponent} />
          </div>
          <div className="py-20">
            <Implementations name={activeComponent} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
