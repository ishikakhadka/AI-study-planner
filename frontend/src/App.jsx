import { Route, Routes } from "react-router";
import "./index.css";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
