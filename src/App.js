import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// Adjust the import path according to the actual filename in the package
// import "@material-tailwind/react/dist/material-tailwind-react.min.css"

function App() {
  return (
    <div className="pri-bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
