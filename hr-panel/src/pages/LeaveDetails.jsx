import React from "react";

const LeaveDetails = ({ leave, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative">
        <h2 className="text-xl font-semibold mb-4">Leave Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Employee ID:</label>
            <input
              type="text"
              value={leave.employeeId}
              readOnly
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Leave Type:</label>
            <input
              type="text"
              value={leave.leaveType}
              readOnly
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Applied On:</label>
            <input
              type="date"
              value={leave.appliedOn}
              readOnly
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Leave Date:</label>
            <input
              type="text"
              value={`${leave.leaveFrom} to ${leave.leaveTo}`}
              readOnly
              className="border border-gray-300 rounded w-full px-3 py-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Reason:</label>
          <textarea
            value={leave.reason}
            readOnly
            className="border border-gray-300 rounded w-full px-3 py-2"
            rows={3}
          />
        </div>
        <div className="flex justify-center mt-4">
          <label className="block text-gray-700">Status:</label>
          <span
            className={`inline-block px-3 py-1 rounded-full text-white ml-2 ${
              leave.status === 'Pending'
                ? 'bg-yellow-500'
                : leave.status === 'Approved'
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          >
            {leave.status}
          </span>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
