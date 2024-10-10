import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Transition } from '@headlessui/react';

// Fix for the default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Example employee data for dynamic selection
const employees = [
  { id: 1, name: 'Jeethu Pathak', location: [12.9716, 77.5946] }, // Bangalore
  { id: 2, name: 'Aditi Sharma', location: [28.7041, 77.1025] },  // Delhi
  { id: 3, name: 'Rohan Verma', location: [19.0760, 72.8777] }    // Mumbai
];

const LiveLocation = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]); // Default employee
  const [mapLoaded, setMapLoaded] = useState(false);

  // Update employee location when selection changes
  const handleEmployeeChange = (e) => {
    const employeeId = parseInt(e.target.value);
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee);
    setMapLoaded(false); // Trigger loading animation when map updates
  };

  // Simulate map load animation delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMapLoaded(true);
    }, 500); // Simulate map loading delay
    return () => clearTimeout(timeout);
  }, [selectedEmployee]);

  return (
    <div className="p-5 bg-white shadow-lg mt-6 rounded-lg max-w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Live Location</h2>

      {/* Employee Dropdown */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <label htmlFor="employee" className="text-gray-600 font-medium">
          Select Employee:
        </label>
        <select
          id="employee"
          className="bg-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 ease-in-out"
          value={selectedEmployee.id}
          onChange={handleEmployeeChange}
        >
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {/* Map with loading animation */}
      <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-md">
        <Transition
          show={!mapLoaded}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8V4z"></path>
            </svg>
            <span className="text-indigo-600 font-medium text-lg ml-3">Loading Map...</span>
          </div>
        </Transition>

        {mapLoaded && (
          <MapContainer
            center={selectedEmployee.location}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={selectedEmployee.location}>
              <Popup>{selectedEmployee.name}'s Location</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default LiveLocation;
