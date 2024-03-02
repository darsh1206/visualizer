import { ReactComponent as MyIcon1 } from "./menu.svg";
import { ReactComponent as MyIcon2 } from "./cross.svg";
import { motion } from "framer-motion";
import "../color.css";
import { hover } from "@testing-library/user-event/dist/hover";
export function Nav({ toggleDrawer, isDrawerOpen }) {
  function Button() {
    const Icon = isDrawerOpen ? MyIcon2 : MyIcon1;
    return (
      <motion.div
        onClick={toggleDrawer}
        className="container px-2 py-2 rounded pri-bg txt-clr nav-btn cursor-pointer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
      >
        <Icon />
      </motion.div>
    );
  }

  function NavBar() {
    return (
      <nav class=" text-gray-200 w-full nav-bg">
        <div class="container mx-auto flex justify-between items-center">
          <a
            href="#"
            class=" font-bold p-5 txt-2 text-2xl transition-transform transform hover:scale-110"
          >
            Sorting Visualizer
          </a>
          <div class="flex gap-4">
            <div class="mr-6 relative">
              <Button />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return <NavBar />;
}
