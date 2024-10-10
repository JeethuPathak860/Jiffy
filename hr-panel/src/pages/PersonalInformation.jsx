import React, { useState } from "react";
import profileImage from "../assets/profile-image.jpg"; // Import profile image
import Users from "../assets/images/Users.png"; // Use your Users image
import { FaEdit } from "react-icons/fa"; // Icon for edit

const PersonalInformation = () => {
  const [activeTab, setActiveTab] = useState("personal"); // Default tab
  const [formData, setFormData] = useState({
    fullName: "Jeethu Pathak",
    email: "jeethu@mineit.tech",
    phoneNumber: "7760302371",
    dob: "2002-04-02",
    salary: 0,
    department: "Default Department",
    role: "FrontEnd Developer",
    accountNumber: "",
    address: "Seetharama palya, Mahadeva pura post, Bangalore-560048",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State for current password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input when the icon is clicked
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Tabs */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-4 mb-6 flex">
        <button
          className={`flex-grow text-center py-2 font-semibold ${
            activeTab === "personal"
              ? "bg-pink-600 text-white rounded-lg"
              : "text-gray-600 hover:bg-gray-50"
          } transition-all`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Information
        </button>
        <button
          className={`flex-grow text-center py-2 font-semibold ${
            activeTab === "password"
              ? "bg-pink-600 text-white rounded-lg"
              : "text-gray-600 hover:bg-gray-50"
          } transition-all`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {/* Personal Information Section */}
      {activeTab === "personal" && (
        <div className="bg-white shadow-lg rounded-xl p-8">
          <div className="flex items-center mb-6">
            {/* Profile Image Section */}
            <div className="relative w-22 h-20">
              <img
                src={Users}
                alt="Profile"
                className="w-full h-full object-cover rounded-full shadow-md"
              />
              <div
                className="absolute bottom-0 right-0 bg-gray-500 text-white p-1 rounded-full shadow-md cursor-pointer"
                onClick={handleClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden" // Hide the file input
                  accept="image/*" // Optional: specify file types
                />
                <FaEdit size={16} />
              </div>
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                readOnly
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                readOnly
                className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50"
              ></textarea>
            </div>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">
              Submit
            </button>
            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Change Password Section */}
      {activeTab === "password" && (
        <div className="p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          {/* Change Password Form */}
          <div className="grid grid-cols-1 gap-6">
            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Current Password
              </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50 pr-12"
              />
              <button
                type="button"
                onClick={toggleCurrentPasswordVisibility}
                className="absolute right-4 top-11 text-gray-400"
              >
                {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50 pr-12"
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute right-4 top-11 text-gray-400"
              >
                {showNewPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none bg-gray-50 pr-12"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-4 top-11 text-gray-400"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700">
              Submit
            </button>
            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
