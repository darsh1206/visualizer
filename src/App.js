import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
