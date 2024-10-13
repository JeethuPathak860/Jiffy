import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

const ViewEmployeeModal = ({ isOpen, onClose, employeeData }) => {
    console.log("eguyuykdsfa")
    console.log(isOpen)
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div
          className="bg-white w-full max-w-xl mx-4 sm:mx-auto p-8 rounded-lg overflow-hidden relative"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Employee Information</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="h-[70vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Displaying Employee Details */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Full Name</label>
                <p className="text-sm">{employeeData.name}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Date of Birth</label>
                <p className="text-sm">{employeeData.dob}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone</label>
                <p className="text-sm">{employeeData.phone}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <p className="text-sm">{employeeData.email}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Type</label>
                <p className="text-sm">{employeeData.type}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Joining Date</label>
                <p className="text-sm">{employeeData.joiningDate}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Department</label>
                <p className="text-sm">{employeeData.department}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Account Number</label>
                <p className="text-sm">{employeeData.accountNumber}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Access Control</label>
                <ul className="list-disc pl-5">
                  {Object.entries(employeeData.accessControl).map(
                    ([role, access]) =>
                      access && <li key={role}>{role}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewEmployeeModal;
