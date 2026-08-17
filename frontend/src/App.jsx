import { Route, Routes } from "react-router";
import "./index.css";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "../Layout";
import StudyPlan from "./pages/StudyPlan";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study-plan/create" element={<StudyPlan />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
