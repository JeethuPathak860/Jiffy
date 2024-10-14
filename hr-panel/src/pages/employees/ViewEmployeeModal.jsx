import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ViewEmployeeModal = ({ isOpen, onClose, employeeData }) => {
  if (!isOpen || !employeeData) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-sm mx-4 sm:mx-auto p-6 rounded-lg shadow-lg relative"> {/* Reduced max-w-md to max-w-sm and adjusted padding */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {employeeData.name}/{employeeData.empId}
          </h2>
        </div>

        <div className="flex justify-center mb-4">
          <img
            src={employeeData.profileImage}
            alt={`${employeeData.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg" // Reduced size
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-2"> {/* Adjusted padding and spacing */}
          <p className="text-lg font-bold text-purple-700">{employeeData.name}/{employeeData.empId}</p>
          <p className="text-gray-700">
            <strong>Date of Birth:</strong> {employeeData.dob}
          </p>
          <p className="text-gray-700">
            <strong>Phone Number:</strong> {employeeData.phone}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {employeeData.email}
          </p>
          <p className="text-gray-700">
            <strong>User Type:</strong> {employeeData.type}
          </p>
          <p className="text-gray-700">
            <strong>User Role:</strong> {employeeData.role}
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> {employeeData.address}
          </p>
          <p className="text-gray-700">
            <strong>Joined Date:</strong> {employeeData.joiningDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;
