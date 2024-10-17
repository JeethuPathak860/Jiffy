import React, { useState, useEffect } from "react";
import Users from "../../assets/images/Users.png"; // Adjusted path
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { MdOutlineMessage } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { PiUserCircleGearFill } from "react-icons/pi";
import { CgLogOut } from "react-icons/cg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importing icons for navbar hamburger

const Navbar = () => {
  const emojis = ["😍", "🥰", "😊", "😉", "🤨", "😛"];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [notificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
  const [messageDropdownVisible, setMessageDropdownVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false); // Manage navbar visibility
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % emojis.length;
      setCurrentEmoji(emojis[index]);
    }, 1000);

    return () => clearInterval(interval);
  }, [emojis]);

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((prev) => !prev);
    setNotificationDropdownVisible(false);
    setMessageDropdownVisible(false);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownVisible((prev) => !prev);
    setProfileDropdownVisible(false);
    setMessageDropdownVisible(false);
  };

  const toggleMessageDropdown = () => {
    setMessageDropdownVisible((prev) => !prev);
    setProfileDropdownVisible(false);
    setNotificationDropdownVisible(false);
  };

  const handleProfileClick = () => {
    navigate("/personal-information");
    setProfileDropdownVisible(false);
  };

  const toggleNavbarVisibility = () => {
    setNavbarVisible(!navbarVisible); // Toggle navbar visibility
  };

  return (
    <>
      <nav className="bg-gray-300 w-full h-16 flex items-center justify-between px-6 shadow-md z-10">
        <div className="text-blue-900 font-semibold text-lg">Dashboard</div>
        <div className="flex items-center space-x-6">
          {/* Hamburger icon for small screens */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleNavbarVisibility}
          >
            <FontAwesomeIcon icon={navbarVisible ? faTimes : faBars} size="lg" />
          </button>

          {/* Notifications Icon */}
          <div className="relative" onClick={toggleNotificationDropdown}>
            <NotificationsActiveIcon className="text-gray-600 text-xl cursor-pointer" />
            <AnimatePresence>
              {notificationDropdownVisible && (
                <motion.div
                  initial={{ opacity: 0, translateY: -10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-10 right-0 bg-white shadow-lg rounded-xl p-4 mt-1 w-64"
                >
                  {/* Notification Items */}
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>New comment on your post</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>Meeting at 3 PM</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>New follower added</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages Icon */}
          <div className="relative" onClick={toggleMessageDropdown}>
            <MdOutlineMessage className="text-gray-600 text-xl cursor-pointer" />
            <AnimatePresence>
              {messageDropdownVisible && (
                <motion.div
                  initial={{ opacity: 0, translateY: -10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-10 right-0 bg-white shadow-lg rounded-xl p-4 mt-1 w-64"
                >
                  {/* Message Items */}
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>Message from John</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>New message received</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                    <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <span>Reminder: Project deadline</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Icon */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <img
              src={Users}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-blue-900 font-semibold">
              Hello, Jeethu Pathak
            </span>
            <span className="text-xl">{currentEmoji}</span>
          </div>
        </div>

        {/* Profile Dropdown Menu */}
        <AnimatePresence>
          {profileDropdownVisible && (
            <motion.div
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 right-14 bg-white shadow-lg rounded-xl p-4 mt-1 w-44"
            >
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
                onClick={handleProfileClick}
              >
                <PiUserCircleGearFill className="text-pink-600 text-2xl" />
                <span>My Profile</span>
              </div>
              <div className="border-b border-gray-300 my-2" /> {/* Divider */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                <CgLogOut className="text-pink-600 text-2xl" />
                <span>Logout</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Responsive Navbar Items */}
      <AnimatePresence>
        {navbarVisible && (
          <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 right-0 bg-white shadow-lg rounded-lg w-64 p-4"
          >
            {/* Add navbar items here if needed */}
            <ul>
              <li className="py-2 hover:bg-gray-100 rounded-lg">Item 1</li>
              <li className="py-2 hover:bg-gray-100 rounded-lg">Item 2</li>
              <li className="py-2 hover:bg-gray-100 rounded-lg">Item 3</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
