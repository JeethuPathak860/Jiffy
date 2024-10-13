import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaUserPlus, FaFilter, FaMoneyBill, FaClipboardCheck, FaTimes } from "react-icons/fa";
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Recruitment = () => {
  const stats = [
    { title: 'Total Requirement', value: 2, percentage: 50, icon: <FaUserPlus className="text-blue-500" /> },
    { title: 'Applications Received', value: 30, percentage: 80, icon: <FaClipboardCheck className="text-green-500" /> },
    { title: 'Today Interviews', value: 5, percentage: 60, icon: <FaMoneyBill className="text-orange-500" /> },
    { title: 'Shortlisted', value: 12, percentage: 70, icon: <FaFilter className="text-purple-500" /> },
    { title: 'Selected', value: 3, percentage: 20, icon: <FaUserPlus className="text-green-600" /> },
    { title: 'Rejected', value: 5, percentage: 50, icon: <FaTimes className="text-red-500" /> },
    { title: 'Hired', value: 3, percentage: 20, icon: <FaUserPlus className="text-green-700" /> }
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

  return (
    <div className="p-4 bg-gray-300 min-h-screen">
      {/* Stat Cards */}
      <h2 className="text-xl font-semibold mb-4">Recruitment Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Row: First 3 Cards */}
        {stats.slice(0, 3).map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ height: '150px' }} // Height remains consistent
          >
            {/* Left Side: Icon and Text */}
            <div className="flex flex-col items-start">
              <span className="text-gray-800 font-medium">{stat.title}</span>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>

            {/* Right Side: Circular Progress Bar */}
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

      {/* Second Row: Remaining 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
        {stats.slice(3).map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ height: '150px' }} // Consistent height
          >
            {/* Left Side: Icon and Text */}
            <div className="flex flex-col items-start">
              <span className="text-gray-800 font-medium">{stat.title}</span>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-4xl">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>

            {/* Right Side: Circular Progress Bar */}
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

      {/* Charts Section */}
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
    </div>
  );
};

export default Recruitment;
