// MyDrawer.js
import { Link } from "react-router-dom";
import "../styles.css";
const logSorts = ["Quick Sort", "Merge Sort", "Heap Sort"];
const quadSorts = [
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Odd Even Sort",
];

export function MyDrawer({ isOpen, closeDrawer, changeActiveComponent }) {
  return (
    <div
      className={`fixed right-0 w-70 h-full bg-black shadow-md transform transition-transform z-20 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } nav-bg`}
    >
      <div className="p-8 text-white pt-5 text-right">
        <h1 className="text-2xl mb-10 font-bold txt-2">Sorting Algorithms</h1>

        <h1 className="text-xl mb-6 font-bold txt-2">Logarithmic Sorts</h1>
        <ul>
          {logSorts.map((sort, index) => (
            <li
              key={index}
              className="mb-5 transition-transform transform hover:scale-110"
            >
              <Link
                to="#"
                onClick={() =>
                  changeActiveComponent(`${sort.replace(" ", "")}`)
                }
                className="font-bold py-2 px-4 rounded ml-10 txt links txt-2"
              >
                {sort}
              </Link>
            </li>
          ))}
        </ul>

        <h1 className="text-xl mb-6 font-bold txt-2">Quadratric Sorts</h1>
        <ul>
          {quadSorts.map((sort, index) => (
            <li
              key={index}
              className="mb-5 transition-transform transform hover:scale-110"
            >
              <a className=" font-bold py-2 px-4 rounded ml-10 txt links txt-2">
                {sort}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
