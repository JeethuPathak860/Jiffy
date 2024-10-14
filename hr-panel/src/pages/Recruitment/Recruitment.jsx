import React, { useState, useRef, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaUserPlus, FaFilter, FaMoneyBill, FaClipboardCheck, FaTimes } from "react-icons/fa";
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate, useLocation } from "react-router-dom";
import RecruitmentList from "./RecruitmentForms/RecruitmentList";
import ReceivedApplicationsList from "./RecruitmentForms/ReceivedApplicationsList";
import TodayInterviews from "./RecruitmentForms/TodayInterviews";
import InterviewList from "./RecruitmentForms/InterviewList";
import SelectedCandidatesList from "./RecruitmentForms/SelectedCandidatesList";
import RejectedCandidatesList from "./RecruitmentForms/RejectedCandidatesList";
import HiredCandidatesList from "./RecruitmentForms/HiredCandidatesList";

const Recruitment = () => {
  const [selectedStat, setSelectedStat] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const location = useLocation();

  const stats = [
    { title: 'Total Recruitments', value: 2, percentage: 50, icon: <FaUserPlus className="text-blue-500" />, route: '/recruitment/recruitment-list', component: <RecruitmentList /> },
    { title: 'Applications Received', value: 30, percentage: 80, icon: <FaClipboardCheck className="text-green-500" />, route: '/recruitment/receivedapplication-list', component: <ReceivedApplicationsList /> },
    { title: 'Today Interviews', value: 5, percentage: 60, icon: <FaMoneyBill className="text-orange-500" />, route: '/recruitment/todayinterview', component: <TodayInterviews /> },
    { title: 'Shortlisted', value: 12, percentage: 70, icon: <FaFilter className="text-purple-500" />, route: '/recruitment/interview-list', component: <InterviewList /> },
    { title: 'Selected', value: 3, percentage: 20, icon: <FaUserPlus className="text-green-600" />, route: '/recruitment/selected', component: <SelectedCandidatesList /> },
    { title: 'Rejected', value: 5, percentage: 50, icon: <FaTimes className="text-red-500" />, route: '/recruitment/rejected', component: <RejectedCandidatesList /> },
    { title: 'Hired', value: 3, percentage: 20, icon: <FaUserPlus className="text-green-700" />, route: '/recruitment/hired', component: <HiredCandidatesList /> }
  ];

  const departmentWiseData = {
    labels: ['Marketing', 'IT', 'Non IT', 'HR', 'Management', 'Accounts'],
    datasets: [{
      label: 'Departments',
      data: [10, 20, 30, 10, 15, 15],
      backgroundColor: ['#4B77BE', '#5F255F', '#D21243', '#B3C100', '#F39C12', '#7D3C98']
    }]
  };

  const applicationSourceData = {
    labels: ['Our Portal', 'JobPortal', 'SocialMedia', 'Referral'],
    datasets: [{
      label: 'Application Source',
      data: [10, 20, 30, 5],
      backgroundColor: ['#3498DB', '#E74C3C', '#9B59B6', '#F1C40F']
    }]
  };

  const recruitmentReportData = {
    labels: ['Interviewed', 'Shortlisted', 'Rejected', 'Hired'],
    datasets: [{
      label: 'Status',
      data: [15, 10, 5, 3],
      backgroundColor: ['#1ABC9C', '#3498DB', '#E74C3C', '#2ECC71']
    }]
  };

  const handleCardClick = (stat) => {
    setSelectedStat(stat);
    navigate(stat.route);
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedStat]);

  return (
    <div className="p-4 bg-gray-300 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Recruitment Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.slice(0, 3).map((stat, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(stat)}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{ height: '150px' }}
          >
            <div className="flex flex-col items-start">
              <span className="text-gray-800 font-medium">{stat.title}</span>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>
            <div className="h-16 w-16">
              <CircularProgressbar
                value={stat.percentage}
                text={`${stat.percentage}%`}
                styles={buildStyles({
                  pathColor: stat.percentage > 50 ? "#4CAF50" : "#FF5722",
                  textColor: "#333",
                  trailColor: "#ddd",
                  backgroundColor: "#f8f8f8",
                  textSize: '22px'
                })}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        {stats.slice(3).map((stat, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(stat)}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{ height: '150px' }}
          >
            <div className="flex flex-col items-start">
              <span className="text-gray-800 font-medium">{stat.title}</span>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>
            <div className="h-16 w-16">
              <CircularProgressbar
                value={stat.percentage}
                text={`${stat.percentage}%`}
                styles={buildStyles({
                  pathColor: stat.percentage > 50 ? "#4CAF50" : "#FF5722",
                  textColor: "#333",
                  trailColor: "#ddd",
                  backgroundColor: "#f8f8f8",
                  textSize: '22px'
                })}
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Department Wise Distribution</h3>
          <Doughnut data={departmentWiseData} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Application Received by Source</h3>
          <Bar data={applicationSourceData} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recruitment Report</h3>
          <Bar data={recruitmentReportData} />
        </div>
      </div>

      {selectedStat && (
        <div ref={formRef} className="mt-8 bg-white rounded-xl shadow-lg p-6">
          {selectedStat.component}
        </div>
      )}
    </div>
  );
};

export default Recruitment;
