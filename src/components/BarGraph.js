import React, { useState, useEffect, useRef } from "react";

export function BarGraph({ data, changeGreen, changeOrange, changeRed }) {
  const graphContainerRef = useRef(null); // Ref to the graph container
  const [graphHeight, setGraphHeight] = useState("79vh"); // Default height
  const [initialViewportHeight, setInitialViewportHeight] = useState(0); // Initialize initial viewport height

  useEffect(() => {
    // Update initial viewport height when the component mounts
    setInitialViewportHeight(window.innerHeight);

    const updateGraphHeight = () => {
      if (graphContainerRef.current) {
        const graphTop = graphContainerRef.current.getBoundingClientRect().top;
        const scrollBarHeight =
          window.innerWidth - document.documentElement.clientWidth;
        const availableHeight =
          window.innerHeight - graphTop - scrollBarHeight; // Calculate available height using updated viewport height
        setGraphHeight(`${availableHeight - 5}px`); // Set height in px
      }
    };

    // Calculate graph height on mount and when resizing the window
    window.addEventListener("resize", updateGraphHeight);
    updateGraphHeight();

    // Cleanup
    return () => window.removeEventListener("resize", updateGraphHeight);
  }, []); // Update graph height when initial viewport height changes

  // Calculate the maximum value to base the height percentages off
  const maxValue = Math.max(...data);

  return (
    <div
      ref={graphContainerRef}
      className="flex w-full overflow-hidden"
      style={{ maxHeight: "100vh", height: graphHeight }}
    >
      {data.map((value, index) => (
        <div
          key={index}
          className={`mx-px bg-sky-200 hover:bg-sky-300 shadow-md ${
            changeGreen && changeGreen.includes(index) ? "green" : ""
          } ${changeOrange && changeOrange.includes(index) ? "orange" : ""}
          ${changeRed && changeRed.includes(index) ? "red" : ""}`}
          style={{
            height: `${(100 * value) / maxValue}%`,
            flex: 1,
            marginRight: "0.05rem",
          }}
        />
      ))}
    </div>
  );
}
