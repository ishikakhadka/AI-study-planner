import { Route, Routes } from "react-router";
import "./index.css";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "../Layout";
import StudyPlan from "./pages/StudyPlan";
import StudyIndex from "./pages/StudyIndex";
import Tasks from "./pages/Tasks";
import Resources from "./pages/Resources";
import AddResources from "./pages/AddResource";

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
          <Route path="/study-plan/create/:id/" element={<StudyPlan />} />
          <Route path="/study-plan/" element={<StudyIndex />} />
          <Route path="/tasks/" element={<Tasks />} />
          <Route path="/resources/" element={<Resources />} />
          <Route path="/resources-create" element={<AddResources />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
