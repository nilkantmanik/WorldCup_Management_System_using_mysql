import React, { useState } from 'react';
import './model.css'; // Import your CSS file for styling

const BlurredWindow = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Blurred Background */}
      {isModalOpen && <div className="background"></div>}

      {/* Modal Window */}
      {isModalOpen && (
        <div className="modal">
          <div className="content">
            {/* Your modal content goes here */}
            <p>This is a blurred window</p>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Button to Open Modal */}
      <button onClick={openModal}>Open Blurred Window</button>
    </>
  );
};

export default BlurredWindow;
