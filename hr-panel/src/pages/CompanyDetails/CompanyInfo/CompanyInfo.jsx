import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

const companiesData = [
  { 
    id: 1, 
    name: "Merry's Info-Tech & New-Gen Educare LLP", 
    logo: "https://via.placeholder.com/40", 
    email: "mineit.tech@gmail.com",
    timeIn: '10:00 AM',
    timeOut: '07:00 PM',
    address: '#24 Corner Woods, Second Floor, Dr.Raja Gopal Road, Bengaluru',
    workingDays: 26,
  },
];

const CompanyInfo = () => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const filteredCompanies = companiesData.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / entries);

  const openModal = (company, isEdit) => {
    setSelectedCompany(company);
    setEditMode(isEdit);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="p-6 sm:p-10 bg-gray-50 mt-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Company Info</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="mr-2 text-gray-600">Show</label>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 text-gray-600">entries</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-4 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-pink-600 text-white text-left text-sm font-medium">
              <th className="py-3 px-6">Sl.No</th>
              <th className="py-3 px-6">Company Name</th>
              <th className="py-3 px-6">Logo</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredCompanies.slice((currentPage - 1) * entries, currentPage * entries).map((company, index) => (
              <tr key={company.id} className="border-t border-gray-300">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{company.name}</td>
                <td className="py-3 px-6">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="py-3 px-6">{company.email}</td>
                <td className="py-3 px-6 text-center">
                  <div className="inline-flex space-x-2">
                    <button 
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                      onClick={() => openModal(company, false)}
                    >
                      <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
                    </button>
                    <button 
                      className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                      onClick={() => openModal(company, true)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">
          Showing {Math.min((currentPage - 1) * entries + 1, filteredCompanies.length)} to{' '}
          {Math.min(currentPage * entries, filteredCompanies.length)} of {filteredCompanies.length} entries
        </p>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 ${currentPage === 1 ? 'text-gray-400' : 'text-purple-600'} hover:underline`}
          >
            Previous
          </button>
          <span className="px-3 py-1 bg-purple-600 text-white rounded-full">{currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 mx-1 ${currentPage === totalPages ? 'text-gray-400' : 'text-purple-600'} hover:underline`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Company Details"
        className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto mt-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedCompany && (
          <div>
            {editMode ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Edit Company Details</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700">Company Name</label>
                      <input
                        type="text"
                        defaultValue={selectedCompany.name}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Time In</label>
                      <input
                        type="time"
                        defaultValue="10:00"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Time Out</label>
                      <input
                        type="time"
                        defaultValue="19:00"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        defaultValue={selectedCompany.email}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Address</label>
                      <input
                        type="text"
                        defaultValue={selectedCompany.address}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Working Days</label>
                      <input
                        type="number"
                        defaultValue={selectedCompany.workingDays}
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>
                  <button type="submit" className="mt-4 px-6 py-2 bg-purple-600 text-white rounded">
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Company Details</h2>
                <p><strong>Company Name:</strong> {selectedCompany.name}</p>
                <p><strong>Email:</strong> {selectedCompany.email}</p>
                <p><strong>Time In:</strong> {selectedCompany.timeIn}</p>
                <p><strong>Time Out:</strong> {selectedCompany.timeOut}</p>
                <p><strong>Address:</strong> {selectedCompany.address}</p>
                <p><strong>Working Days:</strong> {selectedCompany.workingDays}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompanyInfo;
