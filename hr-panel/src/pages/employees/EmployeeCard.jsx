import React, { useState } from "react";
import { AiOutlineMail, AiOutlineEye } from "react-icons/ai";
import { BsTelephone, BsPencilSquare } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import EditEmployeeModal from "./EditEmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import Users from "../../assets/images/Users.png"; // Fallback image

const EmployeeCard = ({ employee }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleViewClick = (employee) => {
    setCurrentEmployee(employee);
    setIsViewModalOpen(true);
  };

  // API Simulation functions
  const handleEmailClick = () => {
    console.log(`Emailing ${currentEmployee.email}`);
  };

  const handleMessageClick = () => {
    console.log(`Messaging ${currentEmployee.name}`);
  };

  const handleCallClick = () => {
    console.log(`Calling ${currentEmployee.phone}`);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg shadow-md p-6 md:p-10 space-y-4 transition-transform transform hover:scale-105 duration-200 mt-6 md:mt-12 h-64 md:h-72 w-full max-w-xs mx-auto">
        {/* Profile Image */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={employee.imageUrl || Users}
            alt={employee.name}
            className="rounded-full border-4 border-pink-600 w-20 h-20 md:w-24 md:h-24 object-cover shadow-lg"
          />
        </div>

        {/* Employee Name */}
        <h3 className="text-lg font-semibold text-gray-800 text-center mt-16">
          {employee.name}
        </h3>

        {/* Employee Role and Status */}
        <div className="flex justify-center items-center space-x-2">
          <p className="text-sm text-gray-600">{employee.role}</p>
          <span
            className={`w-3 h-3 rounded-full ${
              employee.status === "online"
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
            }`}
          ></span>
          <span className="text-sm text-gray-500">{employee.status}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-2 mt-2">
          <div
            className="flex items-center justify-center bg-red-100 rounded-full p-2 cursor-pointer"
            onClick={handleEmailClick}
          >
            <AiOutlineMail className="text-red-600 text-lg" />
          </div>
          <div
            className="flex items-center justify-center bg-blue-100 rounded-full p-2 cursor-pointer"
            onClick={handleMessageClick}
          >
            <FaRegCommentDots className="text-blue-600 text-lg" />
          </div>
          <div
            className="flex items-center justify-center bg-green-100 rounded-full p-2 cursor-pointer"
            onClick={handleCallClick}
          >
            <BsTelephone className="text-green-600 text-lg" />
          </div>
        </div>

        {/* Horizontal Line Separator */}
        <hr className="border-gray-300 my-2" />

        {/* View & Edit Buttons */}
        <div className="flex justify-center space-x-2 mt-2">
          <div className="flex items-center justify-center bg-purple-100 rounded-full p-2 cursor-pointer">
            <AiOutlineEye
              className="text-purple-600 text-xl"
              onClick={() => handleViewClick(employee)}
            />
          </div>
          <div className="flex items-center justify-center bg-pink-100 rounded-full p-2 cursor-pointer">
            <BsPencilSquare
              className="text-pink-600 text-xl"
              onClick={() => handleEditClick(employee)}
            />
          </div>
        </div>
      </div>

      {/* View Employee Modal */}
      {isViewModalOpen && currentEmployee && (
        <ViewEmployeeModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          employeeData={currentEmployee}
        />
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && currentEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          employeeData={currentEmployee}
        />
      )}
    </>
  );
};

export default EmployeeCard;
