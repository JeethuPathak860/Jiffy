import React, { useState, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const EditEmployeeModal = ({ isOpen, onClose, employeeData }) => {
  const fileInputRef = useRef(null);

  // Initialize formData with defaults if employeeData is undefined
  const [formData, setFormData] = useState({
    name: employeeData?.name || '',
    dob: employeeData?.dob || '',
    phone: employeeData?.phone || '',
    email: employeeData?.email || '',
    password: employeeData?.password || '',
    type: employeeData?.type || '',
    joiningDate: employeeData?.joiningDate || '',
    department: employeeData?.department || '',
    accountNumber: employeeData?.accountNumber || '',
    accessControl: employeeData?.accessControl || {
      Management: false,
      Accounts: false,
      Sales: false,
      Admin: false,
      'Project Manager': false,
      Employee: false,
      Client: false,
      All: false,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      accessControl: {
        ...prev.accessControl,
        [value]: checked,
      },
    }));
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    console.log("Submitted Data: ", formData);
    onClose(); // Close modal after submission
  };

  return (
    isOpen && (
      // Changed from fixed to absolute
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
        <div className="bg-white w-full max-w-2xl mx-4 sm:mx-auto p-8 mt-16 rounded-lg relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Edit Employee</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter name"
                />
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter Phone number"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter Email"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter password"
                />
              </div>

              {/* Type Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Type <span className="text-red-500">*</span></label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Select a role</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="qa">QA Engineer</option>
                </select>
              </div>

              {/* Date of Joining Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date of Joining <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>

              {/* Department Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Department <span className="text-red-500">*</span></label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="">Select a department</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="management">Management</option>
                  <option value="qa">QA</option>
                </select>
              </div>

              {/* Account Number Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Account Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Enter Account Number"
                />
              </div>

              {/* Upload Profile Picture */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Upload Profile Picture</label>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                  />
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full pr-24 text-sm"
                    placeholder="Choose file (JPEG or JPG only)"
                    readOnly
                  />
                  <button
                    onClick={handleBrowseClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                  >
                    Browse
                  </button>
                </div>
              </div>

              {/* Access Control */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium">Access Control</label>
                <div className="flex flex-col">
                  {['Management', 'Accounts', 'Sales', 'Admin', 'Project Manager', 'Employee', 'Client', 'All'].map((role) => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        value={role}
                        checked={formData.accessControl[role] || false}
                        onChange={handleCheckboxChange}
                      />
                      <span className="ml-2">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditEmployeeModal;
