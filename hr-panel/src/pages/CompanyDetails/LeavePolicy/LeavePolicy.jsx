import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BiCalendarCheck } from "react-icons/bi";
import HolidaysList from "./HolidaysList";
import HolidayByPolicy from "./HolidayByPolicy";
import ManageLeave from "./MangeLeave"; // Correct the typo in the import

const LeavePolicy = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null); // Track the selected policy card
  const formRef = useRef(null); // Reference for scrolling to the form on card click
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Array of policy cards with route and component mapping
  const leavePolicies = [
    { 
      title: 'Holiday by Date', 
      icon: <FaCalendarAlt className="text-blue-600 text-4xl md:text-3xl" />, 
      value: '10 Days', 
      route: '/company-details/leave-policy/holidays', 
      component: <HolidaysList /> 
    },
    { 
      title: 'Holiday by Policy', 
      icon: <BiCalendarCheck className="text-green-600 text-4xl md:text-3xl" />, 
      value: '15 Days', 
      route: '/company-details/leave-policy/policy', 
      component: <HolidayByPolicy /> 
    },
    { 
      title: 'Manage Leave', 
      icon: <IoMdTime className="text-purple-600 text-4xl md:text-3xl" />, 
      value: '3 Requests', 
      route: '/company-details/leave-policy/manage-leave', 
      component: <ManageLeave /> 
    }
  ];

  // Handle card click, set the selected policy and navigate to the route
  const handleCardClick = (policy) => {
    setSelectedPolicy(policy); // Set the selected policy
    navigate(policy.route); // Navigate to the respective route (optional, depends on use case)
  };

  // Scroll to the form when a card is clicked
  // useEffect(() => {
  //   if (formRef.current && selectedPolicy) {
  //     formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [selectedPolicy]);

  return (
    <div className="p-4 bg-gray-300 min-h-screen">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leavePolicies.map((policy, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{ height: '150px' }}
            onClick={() => handleCardClick(policy)} // Handle card click to show the form
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

      {/* Render the selected form below the cards */}
      {selectedPolicy && (
        <div ref={formRef} className="mt-8 bg-white rounded-xl shadow-lg p-6">
          {selectedPolicy.component}
        </div>
      )}
    </div>
  );
};

export default LeavePolicy;
