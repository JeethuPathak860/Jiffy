import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Header/Navbar"; 
import Dashboard from "./pages/dashboard/Dashboard";
import Recruitment from "./pages/Recruitment/Recruitment";
import MyTask from "./pages/mytask/MyTask";
import Employees from "./pages/employees/Employees";
import SalaryList from "./pages/salary/SalaryList";
import LeavePolicy from "./pages/CompanyDetails/LeavePolicy/LeavePolicy";
import Departments from "./pages/CompanyDetails/department/Departments";
import Roles from "./pages/CompanyDetails/role/Roles";
import CompanyInfo from "./pages/CompanyDetails/CompanyInfo/CompanyInfo";
import IssueTracking from "./pages/IssueTracking/IssueTracking";
import Attendance from "./pages/Attendance/Attendance";
import Announcement from "./pages/Announcements/Announcement";
import Events from "./pages/Events/Events";
import MonthlyReport from "./pages/MonthlyReport/MonthlyReport";
import Chat from "./pages/Chat/Chat";
import LiveLocation from "./pages/LiveLocation/LiveLocation";
import PersonalInformation from "./pages/UserProfile/PersonalInformation";
import ModifyTask from "./pages/mytask/ViewTask";  
import HolidaysList from "./pages/CompanyDetails/LeavePolicy/HolidaysList";
import HolidayByPolicy from "./pages/CompanyDetails/LeavePolicy/HolidayByPolicy";
import ManageLeave from "./pages/CompanyDetails/LeavePolicy/MangeLeave";
import ViewTask from "./pages/mytask/ViewTask";
import EditTask from "./pages/mytask/EditTask";
// import RequirementsList from "./pages/Recruitment/RecruitmentList";
// import Footer from "./components/Footer/Footer";

export default function App() {

  return (
    <Router>
      <div className="flex h-screen bg-gray-300  ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4 pt-2 pl-6 overflow-y-auto">
            <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
              <Route path="/modify-task/view" element={<ViewTask />} />
              <Route path="/modify-task/edit" element={<EditTask />} />
              <Route path="/recruitment/recruitment-list" element={<Recruitment />} />
              <Route path="/recruitment/receivedapplication-list" element={<Recruitment />} /> 
              <Route path="/recruitment/todayinterview" element={<Recruitment />} /> 
              <Route path="/recruitment/interview-list" element={<Recruitment />} /> 
              <Route path="//recruitment/selected" element={<Recruitment />} /> 
              <Route path="/recruitment/rejected" element={<Recruitment />} />
              <Route path="/recruitment/hired" element={<Recruitment />} /> 

              <Route path="/company-details/leave-policy/holidays" element={<LeavePolicy />} />
              <Route path="/company-details/leave-policy/policy" element={<LeavePolicy />} />
              <Route path="/company-details/leave-policy/manage-leave" element={<LeavePolicy />} />
            </Routes>
          </div>
          {/* <Footer/> */}
        </div>
      </div>
    </Router>
  );
}
