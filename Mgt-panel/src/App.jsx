import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTasks from "./components/MyTasks/MyTasks";
import TeamTask from "./components/TeamTask/TeamTask";
import ModifyTask from "../../hr-panel/src/pages/ModifyTask";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/my-task" element={<MyTasks/>}/>
        <Route path="/team-task" element={<TeamTask todoCount={2} inProgressCount={0} completedCount={10} />} />
        <Route path="/modify-task/view" element={<ModifyTask />} />
        <Route path="/modify-task/edit" element={<ModifyTask />} />
      </Routes>
    </Router>
  );
}
