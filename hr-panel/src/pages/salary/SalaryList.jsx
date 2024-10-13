import React, { useState } from "react";
import { FaEnvelope, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const employeeData = [
  {
    id: 1,
    name: "Ajith Kumar",
    salary: 15000,
    presentDays: 2,
    absentDays: 24,
    paidLeave: 0,
    unpaidLeave: 24,
    lossOfPay: 13846.15,
    netSalary: 1153.85,
  },
  {
    id: 2,
    name: "Ajith N",
    salary: 0,
    presentDays: 1,
    absentDays: 25,
    paidLeave: 0,
    unpaidLeave: 25,
    lossOfPay: 0,
    netSalary: 0,
  },
  {
    id: 3,
    name: "Anand T",
    salary: 0,
    presentDays: 0,
    absentDays: 26,
    paidLeave: 0,
    unpaidLeave: 26,
    lossOfPay: 0,
    netSalary: 0,
  },
];

const SalaryList = () => {
  const [employees, setEmployees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2024);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = [2023, 2024, 2025, 2026];

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / entries);

  const handleEntriesChange = (e) => {
    setEntries(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Adjust the position for the title
    doc.setFontSize(18);
    doc.text("Salary Report", 14, 20); // Set y position to avoid overlap
    doc.setFontSize(12);
    
    // Define the columns and data for the PDF
    const columns = [
      { header: "Sl.No", dataKey: "slNo" },
      { header: "Employee Name", dataKey: "name" },
      { header: "Salary", dataKey: "salary" },
      { header: "Present Days", dataKey: "presentDays" },
      { header: "Absent Days", dataKey: "absentDays" },
      { header: "Paid Leave", dataKey: "paidLeave" },
      { header: "Unpaid Leave", dataKey: "unpaidLeave" },
      { header: "Loss of Pay", dataKey: "lossOfPay" },
      { header: "Net Salary", dataKey: "netSalary" },
    ];

    const data = paginatedEmployees.map((employee, index) => ({
      slNo: (currentPage - 1) * entries + index + 1,
      name: employee.name,
      salary: employee.salary.toFixed(2),
      presentDays: employee.presentDays,
      absentDays: employee.absentDays,
      paidLeave: employee.paidLeave,
      unpaidLeave: employee.unpaidLeave,
      lossOfPay: employee.lossOfPay.toFixed(2),
      netSalary: employee.netSalary.toFixed(2),
    }));

    doc.autoTable(columns, data, { startY: 30 }); // Start table below the title
    doc.save("salary_report.pdf");
  };

  return (
    <div className="min-h-screen mt-4 flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white shadow mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Salary List</h2>
        <div className="flex flex-wrap items-center space-x-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-32 mb-2"
          >
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-32 mb-2"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded shadow-md hover:opacity-90 mb-2">
            Submit
          </button>
          
          <button className="bg-green-600 text-white p-2 rounded flex items-center mb-2">
            <FaEnvelope />
          </button>

          <button onClick={downloadPDF} className="bg-purple-600 text-white p-2 rounded flex items-center mb-2">
            <FaDownload />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 p-6 bg-white shadow">
        <div className="flex items-center mb-2 sm:mb-0">
          <label className="mr-2 text-gray-600">Show</label>
          <select
            value={entries}
            onChange={handleEntriesChange}
            className="border border-gray-300 rounded px-2 py-1 w-32"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 text-gray-600">entries</span>
        </div>
        
        <div className="flex items-center border border-gray-300 rounded mb-2 sm:mb-0 w-full sm:w-auto relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="border-0 focus:ring-0 pl-3 pr-2 w-full py-2 rounded"
          />
        </div>
      </div>

      <div className="overflow-x-auto p-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-2 sm:px-6">Sl.No</th>
              <th className="py-3 px-2 sm:px-6">Employee Name</th>
              <th className="py-3 px-2 sm:px-6">Salary</th>
              <th className="py-3 px-2 sm:px-6">Present Days</th>
              <th className="py-3 px-2 sm:px-6">Absent Days</th>
              <th className="py-3 px-2 sm:px-6">Paid Leave</th>
              <th className="py-3 px-2 sm:px-6">Unpaid Leave</th>
              <th className="py-3 px-2 sm:px-6">Loss of Pay</th>
              <th className="py-3 px-2 sm:px-6">Net Salary</th>
              <th className="py-3 px-2 sm:px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedEmployees.map((employee, index) => (
              <tr key={employee.id} className="border-t border-gray-300">
                <td className="py-3 px-2 sm:px-6">{(currentPage - 1) * entries + index + 1}</td>
                <td className="py-3 px-2 sm:px-6">{employee.name}</td>
                <td className="py-3 px-2 sm:px-6">{employee.salary.toFixed(2)}</td>
                <td className="py-3 px-2 sm:px-6">{employee.presentDays}</td>
                <td className="py-3 px-2 sm:px-6">{employee.absentDays}</td>
                <td className="py-3 px-2 sm:px-6">{employee.paidLeave}</td>
                <td className="py-3 px-2 sm:px-6">{employee.unpaidLeave}</td>
                <td className="py-3 px-2 sm:px-6">{employee.lossOfPay.toFixed(2)}</td>
                <td className="py-3 px-2 sm:px-6">{employee.netSalary.toFixed(2)}</td>
                <td className="py-3 px-2 sm:px-6">
                  <button className="bg-blue-500 text-white p-1 rounded mr-2">
                    <FaDownload />
                  </button>
                  <button className="bg-green-500 text-white p-1 rounded">
                    <FaEnvelope />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 p-6 bg-white shadow">
        <div>
          Showing {(currentPage - 1) * entries + 1} to{" "}
          {Math.min(currentPage * entries, filteredEmployees.length)} of{" "}
          {filteredEmployees.length} entries
        </div>
        <div className="flex">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-purple-600 text-white mx-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === i + 1 ? "bg-purple-600 text-white" : "bg-gray-200"
              } rounded`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-purple-600 text-white mx-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryList;
