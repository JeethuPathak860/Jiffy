import React, { useState, useRef } from "react";
import { AiOutlineMail, AiOutlineEye, AiOutlineClose } from "react-icons/ai";
import { BsTelephone, BsPencilSquare, BsGrid, BsList } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import Users from "../assets/images/Users.png";
import { motion } from "framer-motion"; 
import EditEmployeeModal from "./EditEmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";

const employeesData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    position: "FrontEnd Developer",
    imageUrl: Users,
    dob: "1990-01-01",
    phone: "123-456-7890",
    password: "password123",
    type: "developer",
    joiningDate: "2022-01-01",
    department: "development",
    accountNumber: "123456789",
    accessControl: {},
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    position: "FrontEnd Developer",
    imageUrl: Users,
    dob: "1990-01-01",
    phone: "123-456-7890",
    password: "password123",
    type: "developer",
    joiningDate: "2022-01-01",
    department: "development",
    accountNumber: "123456789",
    accessControl: {},
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    position: "FrontEnd Developer",
    imageUrl: Users,
    dob: "1990-01-01",
    phone: "123-456-7890",
    password: "password123",
    type: "developer",
    joiningDate: "2022-01-01",
    department: "development",
    accountNumber: "123456789",
    accessControl: {},
  },
  // Add more employee objects...
];
const EmployeeCard = ({ employee }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [iseViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee); // Set the clicked employee as the current employee
    setIsEditModalOpen(true); // Open the modal
  };

  const handleViewClick = (employee) => {
    console.log(employee);
    setCurrentEmployee(employee); // Set the clicked employee as the current employee
    setIsViewModalOpen(true); // Open the modal
  };

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-lg pt-16 pb-6 px-6 space-y-4 text-center transition-transform transform hover:scale-105 duration-200 mt-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={employee.imageUrl}
            alt={employee.name}
            className="rounded-full border-4 border-pink-600 w-24 h-24 object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mt-12">
          {employee.name}
        </h3>
        <p className="text-sm text-gray-600">{employee.position}</p>
        <div className="flex justify-center space-x-2 mt-4">
          <div className="flex items-center justify-center bg-red-100 rounded-full p-2">
            <AiOutlineMail className="text-red-600 text-lg" />
          </div>
          <div className="flex items-center justify-center bg-blue-100 rounded-full p-2">
            <FaRegCommentDots className="text-blue-600 text-lg" />
          </div>
          <div className="flex items-center justify-center bg-green-100 rounded-full p-2">
            <BsTelephone className="text-green-600 text-lg" />
          </div>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-center space-x-2 mt-4">
          <div className="flex items-center justify-center bg-purple-100 rounded-full p-2">
            <AiOutlineEye
              className="text-purple-600 text-xl"
              onClick={() => handleViewClick(employee)}
            />
          </div>
          <div className="flex items-center justify-center bg-pink-100 rounded-full p-2">
            <BsPencilSquare
              className="text-pink-600 text-xl"
              onClick={() => handleEditClick(employee)} // Pass employee here
            />
          </div>
        </div>
      </div>
      {iseViewModalOpen && currentEmployee && (
        <ViewEmployeeModal
          isOpen={iseViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          employeeData={currentEmployee} // Pass the employee data to modal
        />
      )}

      {isEditModalOpen && currentEmployee && (
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          employeeData={currentEmployee} // Pass the employee data to modal
        />
      )}
    </>
  );
};

const EmployeeListView = ({ employees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-pink-700 text-white">
            <th className="py-3 px-5 text-left">Emp ID</th>
            <th className="py-3 px-5 text-left">Employee Name</th>
            <th className="py-3 px-5 text-left">Email ID</th>
            <th className="py-3 px-5 text-left">Contact Info</th>
            <th className="py-3 px-5 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} className="border-b">
              <td className="py-3 px-5">EMP-{index + 1}</td>
              <td className="py-3 px-5 flex items-center space-x-4">
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
                />
                <span>{employee.name}</span>
              </td>
              <td className="py-3 px-5">{employee.email}</td>
              <td className="py-3 px-5 flex space-x-4">
                <button className="bg-red-100 p-2 rounded-full">
                  <AiOutlineMail className="text-red-600" />
                </button>
                <button className="bg-blue-100 p-2 rounded-full">
                  <FaRegCommentDots className="text-blue-600" />
                </button>
                <button className="bg-green-100 p-2 rounded-full">
                  <BsTelephone className="text-green-600" />
                </button>
              </td>
              <td className="py-3 px-5">
                <select className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Employees = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [inviteEmails, setInviteEmails] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");

  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEntriesChange = (e) => {
    setEntriesToShow(parseInt(e.target.value));
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const handleExportToCSV = () => {
    const csvData = employeesData.map((employee) => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      position: employee.position,
    }));

    const csvRows = [
      ["Emp ID", "Name", "Email", "Position"],
      ...csvData.map(({ id, name, email, position }) => [
        id,
        name,
        email,
        position,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Employee Header Section */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-semibold">Employees</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-lg shadow-md ${
                isGridView ? "bg-pink-700" : "border border-gray-300"
              }`}
            >
              <BsGrid
                className={`text-xl ${
                  isGridView ? "text-white" : "text-gray-600"
                }`}
              />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-lg shadow-md ${
                !isGridView ? "bg-pink-700" : "border border-gray-300"
              }`}
            >
              <BsList
                className={`text-xl ${
                  !isGridView ? "text-white" : "text-gray-600"
                }`}
              />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#6A1B9A] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Add Employee
            </button>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-[#6A1B9A] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Invite
            </button>
            <button
              onClick={handleExportToCSV}
              className="bg-[#6A1B9A] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Export to CSV
            </button>
          </div>
        </div>
      </div>

      {/* Show Entries and Search (only for List View) */}
      {!isGridView && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label>Show</label>
            <select
              value={entriesToShow}
              onChange={handleEntriesChange}
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <label>entries</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
      )}

      {/* Employee List or Grid View */}
      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <EmployeeListView
          employees={filteredEmployees.slice(0, entriesToShow)}
        />
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white w-full max-w-xl mx-4 sm:mx-auto p-8 rounded-lg overflow-hidden relative"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">New Employee</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="h-[70vh] overflow-y-auto pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Enter name"
                  />
                </div>

                {/* Date of Birth Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Enter Phone number"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Enter Email"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    placeholder="Enter password"
                  />
                </div>

                {/* Type Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                    <option value="">Select a role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="qa">QA Engineer</option>
                  </select>
                </div>

                {/* Date of Joining Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Date of Joining <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>

                {/* Department Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                    <option value="">Select a department</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="management">Management</option>
                    <option value="qa">QA</option>
                  </select>
                </div>
              </div>

              {/* Attachments Field */}
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
                    onClick={handleBrowseClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white py-1 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm"
                  >
                    Browse
                  </button>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="border border-gray-300 rounded-md p-2 w-full h-32 text-sm"
                  placeholder="Task details"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white w-full max-w-xl mx-4 sm:mx-auto p-8 rounded-lg overflow-hidden relative"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Invite Employees</h2>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="h-[70vh] overflow-y-auto pr-4">
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
                  />
                  <p className="text-xs text-gray-500">
                    Separated multiple emails by commas (e.g. email@example.com,
                    email@example.com)
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
                  ></textarea>
                </div>

                {/* Send Invitations Button */}
                <div className="mt-4">
                  <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 text-sm">
                    Send Invitations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
