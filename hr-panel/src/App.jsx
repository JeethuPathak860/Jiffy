import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"; 
import Dashboard from "./pages/Dashboard";
import Recruitment from "./pages/Recruitment";
import MyTask from "./pages/MyTask";
import Employees from "./pages/Employees";
import SalaryList from "./pages/SalaryList";
import LeavePolicy from "./pages/LeavePolicy";
import Departments from "./pages/Departments";
import Roles from "./pages/Roles";
import CompanyInfo from "./pages/CompanyInfo";
import IssueTracking from "./pages/IssueTracking";
import Attendance from "./pages/Attendance";
import Announcement from "./pages/Announcement";
import Events from "./pages/Events";
import MonthlyReport from "./pages/MonthlyReport";
import Chat from "./pages/Chat";
import LiveLocation from "./pages/LiveLocation";
import PersonalInformation from "./pages/PersonalInformation";
import ModifyTask from "./pages/ModifyTask";  
import HolidaysList from "./pages/HolidaysList";
import HolidayByPolicy from "./pages/HolidayByPolicy";
import ManageLeave from "./pages/MangeLeave";

export default function App() {

  return (
    <Router>
      <div className="flex h-screen bg-gray-300  ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4 pt-16 pl-6 overflow-y-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/my-task" element={<MyTask todoCount={2} inProgressCount={0} completedCount={10} />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/salary-list" element={<SalaryList />} /> 
              <Route path="/company-details/leave-policy" element={<LeavePolicy />} /> 
              <Route path="/company-details/department" element={<Departments />} /> 
              <Route path="/company-details/info" element={<CompanyInfo />} /> 
              <Route path="/company-details/role" element={<Roles />} />
              <Route path="/issue-tracking" element={<IssueTracking />} /> 
              <Route path="/attendance" element={<Attendance />} /> 
              <Route path="/announcements" element={<Announcement />} /> 
              <Route path="/events" element={<Events />} /> 
              <Route path="/monthly-report" element={<MonthlyReport />} /> 
              <Route path="/chat" element={<Chat />} /> 
              <Route path="/live" element={<LiveLocation />} /> 
              <Route path="/personal-information" element={<PersonalInformation />} /> 
              <Route path="/modify-task/view" element={<ModifyTask />} />
              <Route path="/modify-task/edit" element={<ModifyTask />} />
              <Route path="/company-details/leave-policy/holidays" element={<HolidaysList />} />
              <Route path="/company-details/leave-policy/policy" element={<HolidayByPolicy />} />
              <Route path="/company-details/leave-policy/manage-leave" element={<ManageLeave />} />


            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
