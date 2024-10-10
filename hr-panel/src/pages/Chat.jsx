import React, { useState } from "react";
import { FiSearch, FiUser, FiCircle } from "react-icons/fi"; // Import icons
import Users from "../assets/images/Users.png"; // Use your Users image

const Chat = () => {
  // Sample dynamic data for user profiles
  const users = [
    { id: 1, name: "John", online: true, image: Users },
    { id: 2, name: "Bob", online: true, image: Users },
  ];

  // State to track search input
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8">
      {/* Chat Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl mx-auto transition-all duration-300 hover:shadow-md hover:scale-[1.01] transform-gpu">
        {/* Main User Section */}
        <div className="flex items-center mb-8">
          <div className="flex items-center space-x-5 animate-fadeIn">
            <img
              src={Users}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-pink-500 object-cover shadow-lg transition-transform duration-300 hover:scale-110"
            />
            <div>
              <h2 className="text-2xl font-extrabold text-pink-700">
                Jeethu Pathak
              </h2>
              <span className="flex items-center text-sm text-green-600 font-semibold">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center mb-8">
          <input
            type="text"
            placeholder="Find a Friend to Chat"
            className="w-full px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 shadow-sm hover:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-3 p-3 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105">
            <FiSearch className="h-5 w-5" />
          </button>
        </div>

        {/* Friends List */}
        <div className="space-y-6">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-5">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="text-gray-800 font-semibold text-lg flex items-center space-x-2">
                      {user.name}
                    </h3>
                  </div>
                </div>
                {user.online && (
                  <span className="h-5 w-5 bg-green-400 rounded-full border border-white shadow-md animate-pulse relative">
                    <FiCircle className="absolute top-0 left-0 text-green-500" />
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No friends found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
