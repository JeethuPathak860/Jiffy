import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTasks from "./pages/MyTasks/MyTasks";
import TeamTask from "./pages/TeamTask/TeamTask";
import ViewTask from "./pages/TeamTask/ViewTask";
import CreateTeam from "./pages/CreateTeam/CreateTeam";
import CreateTeamCards from "./pages/CreateTeam/CreateTeamCards";
import EditTeam from "./pages/CreateTeam/EditTeam";
import Sidebar from "./components/Sidebar/Sidebar"; // Ensure this is the correct path
import Navbar from "./components/Header/Navbar"; // Ensure this is the correct path

export default function App() {
  const teamsData = [
    {
      teamName: 'Algorithm Avengers',
      progress: 100,
      members: ['Abdul Ahad', 'Anusiya M', 'Bhanuprasad Yadav P', 'Jeethu Pathak'],
    },
    {
      teamName: 'Code Crafters',
      progress: 75,
      members: ['Ajith Kumar', 'BHAVYA SREE M', 'Nithyashree N B'],
    },
    {
      teamName: 'Quality Seekers',
      progress: 100,
      members: ['Bipin Chavan', 'M.S.Purnima', 'Meena Mani', 'Vaibhavi Dhadde'],
    },
  ];

  return (
    <Router>
      <div className="flex h-screen bg-gray-300">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4 pt-2 pl-6 overflow-y-auto scrollbar-thin">
            <Routes>
              <Route path="/my-task" element={<MyTasks />} />
              <Route path="/create-team" element={<CreateTeam />} />
              <Route path="/team-task" element={<TeamTask todoCount={2} inProgressCount={0} completedCount={10} />} />
              <Route path="/modify-task/view" element={<ViewTask />} />
              <Route path="/modify-task/edit" element={<EditTeam />} />
              <Route path="/team-card" element={<CreateTeamCards teams={teamsData} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
