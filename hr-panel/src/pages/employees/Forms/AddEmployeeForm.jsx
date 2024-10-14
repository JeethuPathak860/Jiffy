import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AddEmployeeForm = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);

  // Handle file input button click
  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  // Handle form submission using FormData for file uploads
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Append file input data (if available)
    if (fileInputRef.current.files.length > 0) {
      Array.from(fileInputRef.current.files).forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    // Log the form data to check (you can replace this with an API call)
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Handle form submission logic here (e.g., send to API)
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-start overflow-auto">
        {/* Modal container - Adjusting the margin-top here */}
        <div className="bg-white w-full max-w-3xl mx-4 sm:mx-auto p-6 rounded-lg mt-10 relative shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">New Employee</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* Form section */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter Phone number"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="qa">QA Engineer</option>
                </select>
              </div>

              {/* Date of Joining */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Date of Joining <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfJoining"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                >
                  <option value="">Select a department</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="management">Management</option>
                  <option value="qa">QA</option>
                </select>
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-2 mt-4">
              <label className="block text-sm font-medium">Attachments</label>
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full pr-24 text-sm"
                  placeholder="Choose file (JPEG or JPG only)"
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                >
                  Browse
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mt-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                className="border border-gray-300 rounded-md p-2 w-full h-32 text-sm"
                placeholder="Task details"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm w-full sm:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddEmployeeForm;
