import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BiCalendarCheck } from "react-icons/bi";
import HolidaysList from './HolidaysList'; // Ensure to import the HolidaysList component
import HolidayByPolicy from './HolidayByPolicy'; // Import the HolidayByPolicy component
import ManageLeave from "./MangeLeave";

const LeavePolicy = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const leavePolicies = [
    { title: 'Holiday by Date', icon: <FaCalendarAlt className="text-blue-600 text-4xl md:text-3xl" />, value: '10 Days' },
    { title: 'Holiday by Policy', icon: <BiCalendarCheck className="text-green-600 text-4xl md:text-3xl" />, value: '15 Days' },
    { title: 'Manage Leave', icon: <IoMdTime className="text-purple-600 text-4xl md:text-3xl" />, value: '3 Requests' }
  ];

  const renderContent = () => {
    switch (selectedPolicy) {
      case 'Holiday by Date':
        return <HolidaysList />;
      case 'Holiday by Policy':
        return <HolidayByPolicy />; // Render HolidayByPolicy when this card is clicked
      case 'Manage Leave':
        return <ManageLeave />; // You can replace this with the actual manage leave component
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-300 mt-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leavePolicies.map((policy, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{ height: '150px' }}
            onClick={() => setSelectedPolicy(policy.title)} // Set the selected policy on click
          >
            <div className="flex flex-col flex-grow">
              <span className="text-gray-900 font-bold mb-1 text-sm md:text-base truncate">{policy.title}</span>
              <div className="flex items-center mt-1">
                <div className="flex-shrink-0">{policy.icon}</div>
                <div className="text-lg md:text-xl font-semibold text-gray-800 truncate ml-2">{policy.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the selected policy's content */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default LeavePolicy;
