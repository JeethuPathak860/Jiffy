import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone, BsPencilSquare, BsGrid, BsList } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import EmployeeCard from "./EmployeeCard";
import AddEmployeeForm from "./Forms/AddEmployeeForm";
import InviteForm from "./Forms/InviteForm";
import Users from "../../assets/images/Users.png";

// Sample employee data
const employeesData = [
  {
    name: "John",
    empId: "EMP-0027",
    dob: "03-10-2001",
    phone: "9113979679",
    email: "John@mineit.tech",
    type: "Employee",
    role: "FrontEnd Developer",
    address: "Bangalore",
    joiningDate: "14-02-2024",
    profileImage: Users,
    status: "online",
  },
  {
    name: "Jane",
    empId: "EMP-0028",
    dob: "15-06-1998",
    phone: "9999888877",
    email: "jane@mineit.tech",
    type: "Employee",
    role: "Backend Developer",
    address: "Mumbai",
    joiningDate: "20-03-2023",
    profileImage: Users,
    status: "offline",
  },
  {
    name: "Alice",
    empId: "EMP-0029",
    dob: "22-11-1995",
    phone: "8888777766",
    email: "alice@mineit.tech",
    type: "Employee",
    role: "UI/UX Designer",
    address: "Delhi",
    joiningDate: "10-01-2022",
    profileImage: Users,
    status: "online",
  },
  {
    name: "Bob",
    empId: "EMP-0030",
    dob: "30-05-1990",
    phone: "7777666655",
    email: "bob@mineit.tech",
    type: "Employee",
    role: "Project Manager",
    address: "Bangalore",
    joiningDate: "14-02-2020",
    profileImage: Users,
    status: "offline",
  },
  // Add more employees as needed
];

const Employees = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Emp ID", "Employee Name", "Email ID", "Position"];
    csvRows.push(headers.join(","));

    employeesData.forEach((employee) => {
      const row = [
        employee.empId,
        employee.name,
        employee.email,
        employee.role,
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 md:p-6">
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
              onClick={exportToCSV}
              className="bg-[#6A1B9A] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
            >
              Export to CSV
            </button>
          </div>
        </div>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {employeesData.map((employee) => (
            <EmployeeCard key={employee.empId} employee={employee} />
          ))}
        </div>
      ) : (
        <EmployeeListView employees={employeesData} />
      )}

      <AddEmployeeForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <InviteForm
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
};

const EmployeeListView = ({ employees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-pink-700 text-white">
            <th className="py-3 px-5">Emp ID</th>
            <th className="py-3 px-5">Employee Name</th>
            <th className="py-3 px-5">Email ID</th>
            <th className="py-3 px-5">Contact Info</th>
            <th className="py-3 px-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.empId} className="border-b">
              <td className="py-3 px-5">{employee.empId}</td>
              <td className="py-3 px-5 flex items-center space-x-4">
                <img
                  src={employee.profileImage}
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

export default Employees;
