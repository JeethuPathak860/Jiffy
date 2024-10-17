import React, { useState, useRef } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { ImSpinner } from "react-icons/im";
import { AiOutlinePlus, AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import Users from "../../assets/images/Users.png"; // Adjust path as needed
import { motion, AnimatePresence } from "framer-motion";
import CreateTeamCards from "./CreateTeamCards"; // Import the CreateTeamCards component


const CreateTeam = ({ todoCount, inProgressCount, completedCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    description: "",
    teamLeader: "",
    teamMember: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [teams, setTeams] = useState([]); // State to manage teams
  const fileInputRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? [...files] : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.teamName) errors.teamName = "Team Name is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.teamLeader) errors.teamLeader = "Select a Team Leader";
    if (!formData.teamMember) errors.teamMember = "Select a Team Member";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTeam = {
        teamName: formData.teamName,
        description: formData.description,
        progress: 0, // You can set an initial progress here
        members: [formData.teamLeader, formData.teamMember], // Add members to the team
      };
      setTeams([...teams, newTeam]); // Update teams state with new team
      console.log("Form data submitted:", formData);
      closeModal();
      setFormData({ teamName: "", description: "", teamLeader: "", teamMember: "" }); // Reset form data
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="mt-6 space-y-6 px-4 md:px-0">
      {/* Team Header Card */}
      <div className="p-6 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Team</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="bg-[#3D3399] text-white py-2 px-4 rounded-lg border border-[#3D3399] shadow-[0_0_15px_5px_rgba(61,51,153,0.5)] hover:bg-white hover:text-[#2B1F7D] hover:font-bold hover:shadow-[0_0_15px_5px_rgba(61,51,153,0.6)] transition duration-200 text-sm w-full sm:w-auto"
              onClick={openModal}
            >
              Add Team <AiOutlinePlus className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Render the CreateTeamCards Component */}
      <CreateTeamCards teams={teams} />

      {/* Add Team Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-3xl mx-4 sm:mx-auto p-6 rounded-lg relative overflow-hidden mt-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">New Team</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Team Name */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-sm font-medium">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('teamName')}
                      onBlur={handleBlur}
                      className={`w-full border rounded-md p-2 text-sm ${focusedField === 'teamName' ? 'border-none outline outline-2 outline-[#3D3399] shadow-[0_0_25px_1px_rgba(61,51,153,0.5)]' : 'border-gray-300'}`}
                      placeholder="Enter team name"
                      required
                    />
                    {formErrors.teamName && <p className="text-red-500">{formErrors.teamName}</p>}
                  </div>

                  {/* Description */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-sm font-medium">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('description')}
                      onBlur={handleBlur}
                      className={`w-full border rounded-md p-2 text-sm ${focusedField === 'description' ? 'border-none outline outline-2 outline-[#3D3399] shadow-[0_0_15px_5px_rgba(61,51,153,0.5)]' : 'border-gray-300'}`}
                      placeholder="Enter team description"
                      required
                    />
                    {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}
                  </div>

                  {/* Select Team Leader */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-sm font-medium">
                      Select Team Leader <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="teamLeader"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('teamLeader')}
                      onBlur={handleBlur}
                      className={`w-full border rounded-md p-2 text-sm ${focusedField === 'teamLeader' ? 'border-none outline outline-2 outline-[#3D3399] shadow-[0_0_15px_5px_rgba(61,51,153,0.5)]' : 'border-gray-300'}`}
                      required
                    >
                      <option value="" disabled>Select Team Leader</option>
                      {["User A", "User B", "User C", "User D"].map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                    {formErrors.teamLeader && <p className="text-red-500">{formErrors.teamLeader}</p>}
                  </div>

                  {/* Select Team Member */}
                  <div className="space-y-2 col-span-2">
                    <label className="block text-sm font-medium">
                      Select Team Member <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="teamMember"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('teamMember')}
                      onBlur={handleBlur}
                      multiple
                      className={`w-full border rounded-md p-2 text-sm ${focusedField === 'teamMember' ? 'border-none outline outline-2 outline-[#3D3399] shadow-[0_0_15px_5px_rgba(61,51,153,0.5)]' : 'border-gray-300'}`}
                      required
                    >
                      <option value="" disabled>Select Team Member</option>
                      {["User A", "User B", "User C", "User D"].map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                    {formErrors.teamMember && <p className="text-red-500">{formErrors.teamMember}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="bg-[#3D3399] text-white py-2 px-4 rounded-lg border border-[#3D3399] hover:bg-white hover:text-[#2B1F7D] transition duration-200 w-full"
                    >
                      Add Team
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
};

export default CreateTeam;
