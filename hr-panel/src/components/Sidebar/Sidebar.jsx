import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/jiffy-logo.svg"; // Corrected path
import TypingAnimator from "react-typing-animator";
import {
  faHome,
  faTasks,
  faUsers,
  faMoneyCheckAlt,
  faBuilding,
  faBug,
  faClock,
  faBullhorn,
  faCalendarAlt,
  faChartBar,
  faComments,
  faMapMarkerAlt,
  faChevronDown,
  faBars,
  faTimes,
  faChevronLeft, // Added for closing sidebar on small screens
  faCalendar,
  faInfoCircle,
  faUserFriends,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // Track the currently active section
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Manage sidebar state for smaller screens

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: faHome },
    { name: "Recruitment", path: "/recruitment", icon: faUsers },
    { name: "My Task", path: "/my-task", icon: faTasks },
    { name: "Employees", path: "/employees", icon: faUsers },
    { name: "Salary List", path: "/salary-list", icon: faMoneyCheckAlt },
    {
      name: "Company Details",
      icon: faBuilding,
      children: [
        {
          name: "Leave Policy",
          path: "/company-details/leave-policy",
          icon: faCalendar,
        },
        {
          name: "Department",
          path: "/company-details/department",
          icon: faUserFriends,
        },
        { name: "Role", path: "/company-details/role", icon: faProjectDiagram },
        {
          name: "Company Info",
          path: "/company-details/info",
          icon: faInfoCircle,
        },
      ],
    },
    { name: "Issue Tracking", path: "/issue-tracking", icon: faBug },
    { name: "Attendance", path: "/attendance", icon: faClock },
    { name: "Announcements", path: "/announcements", icon: faBullhorn },
    { name: "Events", path: "/events", icon: faCalendarAlt },
    { name: "Monthly Report", path: "/monthly-report", icon: faChartBar },
    { name: "Chat", path: "/chat", icon: faComments },
    { name: "Live", path: "/live", icon: faMapMarkerAlt },
  ];

  const handleSectionClick = (sectionName) => {
    // Toggle the clicked section and deactivate all others
    setActiveSection((prevActive) =>
      prevActive === sectionName ? "" : sectionName
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close on small screens
  };

  return (
    <>
      {/* Hamburger icon for small screens */}
      <div className="md:hidden p-4 bg-white shadow-lg fixed top-0 left-0 z-20 w-full flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} size="lg" />
        </button>
        <img src={logo} alt="Logo" className="w-30 h-10" />
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300 transform fixed md:relative z-20 w-64 bg-white shadow-lg h-screen flex flex-col`}
      >
        {/* Close icon for small screens */}
        <div className="md:hidden p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        </div>

        {/* Logo */}
        <div className="p-5 flex items-center justify-center md:mt-4">
          <img src={logo} alt="Logo" className="w-30 h-10" />
        </div>

        {/* Scrollable Menu & Let's Connect */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-none">
          <ul className="mt-4">
            {menuItems.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item.children ? (
                  <>
                    <div
                      className={`flex items-center justify-between cursor-pointer p-2 mb-2 ${
                        activeSection === item.name
                          ? "bg-[#BC2D75] text-white rounded-lg"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSectionClick(item.name)}
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={item.icon} className="mr-3" />
                        <span>{item.name}</span>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={activeSection === item.name ? "rotate-180" : ""}
                      />
                    </div>

                    {activeSection === item.name && (
                      <ul className="ml-4 mt-2">
                        {item.children.map((child, idx) => (
                          <li key={idx} className="mb-2">
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                isActive
                                  ? "bg-[#BC2D75] text-white flex items-center p-2 rounded-lg"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center p-2 rounded-lg"
                              }
                            >
                              <FontAwesomeIcon
                                icon={child.icon}
                                className="mr-2"
                              />
                              {child.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-[#BC2D75] text-white flex items-center p-2 mb-2 rounded-lg"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center p-4 mb-2 rounded-lg"
                    }
                    end
                    onClick={() => handleSectionClick(item.name)} // Activate this section
                  >
                    <FontAwesomeIcon icon={item.icon} className="mr-3" />
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <div className="p-4">
            <TypingAnimator
              textArray={["Let's Connect..."]}
              cursorColor="linear-gradient(90deg, #f36, #f90)"
              textColor="linear-gradient(90deg, #f36, #f90)"
              fontSize="20px"
              loop
              typingSpeed={100}
              delaySpeed={1000}
              backspace
              dynamicDelay
            />
            <div className="flex justify-center mt-3 space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-pink-500 text-xl hover:text-blue-400 transition-colors duration-300"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-pink-500 text-xl hover:text-[#E1306C] transition-colors duration-300"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-pink-500 text-xl hover:text-red-600 transition-colors duration-300"
                />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-pink-500 text-xl hover:text-green-500 transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
