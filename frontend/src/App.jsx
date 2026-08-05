import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<Students />} />
    </Routes>
  );
}

export default App;