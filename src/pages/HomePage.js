import { Nav } from "../components/Nav";
import { MyDrawer } from "../components/MyDrawer";
import { Header } from "../components/homeHeader";
import { useState } from "react";
import "../color.css";
export function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    console.log(isDrawerOpen);
  };

  return (
    <div className="pri-bg">
      <Nav toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <div>
        <MyDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
        <div
          onClick={closeDrawer}
          className={`${
            isDrawerOpen ? "filter pointer-events-none" : ""
          } flex justify-center`}
        >
          <Header />
        </div>
      </div>
    </div>
  );
}
