import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

const DeleteTeam = ({ team, onDelete, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleDelete = () => {
    console.log("Deleted Team Data:", team); // Log the team data to the console
    onDelete(team); // Call the onDelete function passed as props
    setAlertVisible(true); // Show success alert
    setIsModalOpen(false); // Close modal
    setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Delete Team
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md mx-4 p-6 rounded-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button onClick={onClose} className="absolute top-4 right-4">
                <AiOutlineClose size={24} />
              </button>
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete the team <strong>{team.teamName}</strong>?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {alertVisible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md transition-transform transform scale-100">
          Team deleted successfully!
        </div>
      )}
    </div>
  );
};

export default DeleteTeam;
