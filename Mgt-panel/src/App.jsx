import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTasks from "./components/MyTasks/MyTasks";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/my-task"
          element={
            <MyTasks/>
          }
        />
      </Routes>
    </Router>
  );
}
