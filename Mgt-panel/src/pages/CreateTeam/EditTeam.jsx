import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import { FiCheck } from "react-icons/fi"; // Check icon for selected members

function EditTeam({ initialData, onClose }) {
  const [formData, setFormData] = useState(initialData);
  const [focusedField, setFocusedField] = useState(null);
  const [leaders] = useState(["User A", "User B", "User C"]); // Sample team leaders
  const [members] = useState(["User A", "User B", "User C", "User D"]); // Sample members
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMembersChange = (member) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(member)
        ? prevSelected.filter((m) => m !== member)
        : [...prevSelected, member]
    );
    setFormData((prevData) => ({
      ...prevData,
      members: selectedMembers,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Team Data:", formData);
    onClose();
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="bg-white w-full max-w-5xl mx-auto p-8 rounded-lg relative overflow-auto min-h-[80vh]">
      <button onClick={onClose} className="absolute top-4 right-4">
        <AiOutlineClose size={24} />
      </button>
      <h2 className="text-lg font-semibold mb-6">Edit Team</h2>
      <form onSubmit={handleSubmit}>
        {/* Team Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Team Name</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleInputChange}
            placeholder="Team Name"
            required
            onFocus={() => handleFocus("teamName")}
            onBlur={handleBlur}
            className={`w-full border rounded-md p-3 text-sm ${
              focusedField === "teamName"
                ? "border-none outline outline-2 outline-[#3D3399] shadow-lg"
                : "border-gray-300"
            }`}
          />
        </div>

        {/* Select Team Leader */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Select Team Leader</label>
          <select
            name="teamLeader"
            onChange={handleInputChange}
            className={`w-full border rounded-md p-3 text-sm ${
              focusedField === "teamLeader"
                ? "border-none outline outline-2 outline-[#3D3399] shadow-lg"
                : "border-gray-300"
            }`}
            onFocus={() => handleFocus("teamLeader")}
            onBlur={handleBlur}
            required
          >
            <option value="" disabled>
              Select Team Leader
            </option>
            {leaders.map((leader, index) => (
              <option key={index} value={leader}>
                {leader}
              </option>
            ))}
          </select>
        </div>

        {/* Select Team Members */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Select Team Members</label>
          <div
            className={`border rounded-md p-3 text-sm ${
              focusedField === "members"
                ? "border-none outline outline-2 outline-[#3D3399] shadow-lg"
                : "border-gray-300"
            }`}
            onFocus={() => handleFocus("members")}
            onBlur={handleBlur}
          >
            <div
              className="cursor-pointer"
              onClick={() =>
                document.getElementById("members-dropdown").classList.toggle("hidden")
              }
            >
              {selectedMembers.length === 0 ? (
                "Select Team Members"
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-[#4CAF50] text-white px-2 py-1 rounded-full"
                    >
                      {member} <FiCheck className="ml-1" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div id="members-dropdown" className="hidden mt-3">
              {members.map((member, index) => (
                <div
                  key={index}
                  onClick={() => handleMembersChange(member)}
                  className={`p-2 border-b hover:bg-gray-100 cursor-pointer ${
                    selectedMembers.includes(member)
                      ? "text-[#4CAF50]"
                      : "text-gray-800"
                  }`}
                >
                  {member}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#3D3399] text-white py-2 px-4 rounded-lg border border-[#3D3399] shadow-lg hover:bg-white hover:text-[#2B1F7D] hover:font-bold transition duration-200 text-sm w-full sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTeam;
