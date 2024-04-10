import { React, useEffect } from "react";
import { useState } from "react";
import "../styles.css";
import data from "../data/description.json";
import { List, ListItem, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";

export function Description({ name }) {
  const [description, setDescription] = useState("");
  const [complexities, setComplexities] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".rounded-2xl"); // Assuming the class name is unique
      if (element) {
        const rect = element.getBoundingClientRect();
        const middleOffset = rect.top + rect.height / 2;
        setIsVisible(middleOffset > 0 && middleOffset < window.innerHeight);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  useEffect(() => {
    setDescription(data[name].description);
    setComplexities(data[name].complexities);
  }, [name]);
  return (
    <motion.div
      className="p-4 rounded-2xl bg-white shadow-2xl flex flex-col duration-300 md:flex-row mx-10"
      initial={{ opacity: 0, scale: 0.1 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
        scale: { damping: 10, stiffness: 100 },
      }}
    >
      <div className="h-full w-full mr-2 rounded-2xl">
        <h1 className="m-2 text-4xl font-bold text-sky-600">{name}</h1>

        <div className="flex p-3 text-pretty text-lg">{description}</div>
      </div>

      <Card className="w-auto bg-sky-900 rounded-2xl  shadow-2xl">
        <div className="text-white z-10 nav-bg absolute pl-8 pr-8 pb-2 pt-2 rounded-tl-2xl rounded-br-2xl font-semibold">
          <h1>PERFORMANCE</h1>
        </div>
        <List className="pt-10 w-80">
          {Object.entries(complexities).map(([key, value]) => (
            <ListItem className=" text-gray-200">
              <b>{key}:</b>
              <p className="ml-1">{value}</p>
            </ListItem>
          ))}
        </List>
      </Card>
    </motion.div>
  );
}
