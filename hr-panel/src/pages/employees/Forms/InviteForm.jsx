// InviteForm.js
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const InviteForm = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-xl mx-4 sm:mx-auto p-8 rounded-lg overflow-hidden relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Invite Employees</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <AiOutlineClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-4">
              {/* Email Address Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Email Addresses <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter multiple email addresses separated by commas"
                  required
                />
                <p className="text-xs text-gray-500">
                  Separated multiple emails by commas (e.g. email@example.com, email@example.com)
                </p>
              </div>

              {/* Invitation Message Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Invitation Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 text-sm h-32"
                  placeholder="Enter your invitation message"
                  required
                ></textarea>
              </div>

              {/* Send Invitations Button */}
              <div className="mt-4">
                <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm">
                  Send Invitations
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default InviteForm;
