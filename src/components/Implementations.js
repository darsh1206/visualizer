import React, { useState, useEffect } from "react";
import data from "../data/sorts.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Tab, Tabs } from "@mui/material";
import { motion } from "framer-motion";

export function Implementations({ name }) {
  const [implementations, setImplementations] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight * 0.8;
      setIsVisible(bottom > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  useEffect(() => {
    const sortImplementations = data[name];
    if (sortImplementations) {
      setImplementations(sortImplementations);
      const firstLanguage = Object.keys(sortImplementations)[0];
      setSelectedLanguage(firstLanguage);
    } else {
      setImplementations({});
      setSelectedLanguage("");
    }
  }, [name]);

  useEffect(() => {
    if (selectedLanguage && implementations[selectedLanguage]) {
      setCurrentTabIndex(
        Object.keys(implementations).indexOf(selectedLanguage)
      );
    }
  }, [selectedLanguage, implementations]);

  return (
    <motion.div
      className="p-4 flex justify-center my-28"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
        scale: { damping: 10, stiffness: 100 },
      }}
    >
      <div className="bg-lightGray rounded-2xl overflow-hidden w-11/12 shadow-2xl">
        {selectedLanguage && (
          <div className="bg-slate-800 rounded-md p-5">
            <div className="text-3xl font-bold text-slate-400 py-5 px-5">
              Implementations
            </div>
            <Tabs
              value={currentTabIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              indicatorColor="none"
            >
              {Object.keys(implementations).map((language, index) => (
                <Tab
                  key={language}
                  label={language}
                  style={{
                    color: index === currentTabIndex ? "" : "white",
                  }}
                  onClick={() => setSelectedLanguage(language)}
                  sx={{
                    "&.Mui-selected:hover": {
                      borderBottom: `2px solid ${
                        index === currentTabIndex ? "white" : ""
                      }`,
                    },
                  }}
                />
              ))}
            </Tabs>
            <div className="mt-2">
              <SyntaxHighlighter
                language={selectedLanguage}
                style={materialLight}
                className="shadow-2xl rounded-2xl"
              >
                {Array.isArray(implementations[selectedLanguage])
                  ? implementations[selectedLanguage].join("\n")
                  : implementations[selectedLanguage]}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
