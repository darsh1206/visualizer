import React, { useState, useEffect, useRef } from "react";

export function BarGraph({ data }) {
  const graphContainerRef = useRef(null); // Ref to the graph container
  const [graphHeight, setGraphHeight] = useState("80vh"); // Default height

  useEffect(() => {
    const updateGraphHeight = () => {
      const viewportHeight = window.innerHeight;
      if (graphContainerRef.current) {
        const graphTop = graphContainerRef.current.getBoundingClientRect().top;
        const availableHeight = viewportHeight - graphTop; // Calculate available height
        setGraphHeight(`${availableHeight}px`); // Set height in px
      }
    };

    // Calculate graph height on mount and when resizing the window
    window.addEventListener("resize", updateGraphHeight);
    updateGraphHeight();

    // Cleanup
    return () => window.removeEventListener("resize", updateGraphHeight);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Calculate the maximum value to base the height percentages off
  const maxValue = Math.max(...data);

  return (
    <div
      ref={graphContainerRef}
      className="flex w-full"
      style={{ height: graphHeight }}
    >
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-sky-200 "
          style={{
            height: `${(100 * value) / maxValue}%`, // Keep using percentage for individual bars
            flex: 1,
            marginRight: "0.05rem",
          }}
        />
      ))}
    </div>
  );
}
