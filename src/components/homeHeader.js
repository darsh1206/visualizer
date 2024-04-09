import "../styles.css";
import { motion } from "framer-motion";

function Button({ toggleDrawer }) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={toggleDrawer}
      className="box links p-5 text-2xl font-bold txt bg-blue-500 hover:bg-blue-700 text-white shadow-md hover:shadow-lg rounded-md"
    >
      Get Started
    </motion.div>
  );
}

function Heading() {
  return (
    <h1 className="text-8xl mb-10 mt-5 txt-2 leading-tight tracking-wide font-roboto">
      Try visualization today
    </h1>
  );
}

function SubHeading() {
  return (
    <h1 className="text-4xl txt-2 tracking-wide font-poppins">
      Stuck at understanding Sorting Algorithms?
    </h1>
  );
}
export function Header({ toggleDrawer }) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mt-40 mb-40 flex flex-col items-center justify-center text-center space-y-4"
      >
        <SubHeading />
        <Heading />
        <Button toggleDrawer={toggleDrawer} />
      </motion.div>
      <div className="md:block h-auto w-2 bg-green-700"></div>
    </div>
  );
}
