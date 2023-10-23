import React, { useState } from 'react';
import Modal from 'react-modal';
import UpperComponent from './UpperComponent';
import call from '../asset/dialerimg.jpg';

Modal.setAppElement('#root');

function ResultNavComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    preferredCallbackTime: '',
    comments: '',
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openSuccessModal = () => {
    setSuccessModalIsOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  const handleModalSubmit = () => {
    const data = {
      name: formData.name,
      contactNumber: formData.contactNumber,
      preferredCallbackTime: formData.preferredCallbackTime,
      comments: formData.comments,
    };

    fetch('https://anchorbackend-production.up.railway.app/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          openSuccessModal();
          closeModal();
        } else {
          console.error('Error:', response.status);
          // Handle errors here, e.g., display an error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="secondPageNav">
      <UpperComponent />
      <div className="search-box">
        <div className="icon" >
          <img src={call} alt="" />
        </div>
        <div className="box" onClick={openModal}>
          Request a callback
        </div>
      </div>

      <Modal
        className="modal-container"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Callback Modal"
      >
        <h2 className='modal-title'>Callback Request</h2>
        
          <input
            className="modal-input"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            className="modal-input"
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
          <input
            className="modal-input"
            type="text"
            name="preferredCallbackTime"
            placeholder="Preferred Callback Time"
            value={formData.preferredCallbackTime}
            onChange={handleInputChange}
          />
          <textarea
            className="modal-input"
            name="comments"
            placeholder="Comments/Questions"
            value={formData.comments}
            onChange={handleInputChange}
          />
          <button type="modal-button" onClick={handleModalSubmit}>
            Request a callback
          </button>
       
      </Modal>

      <Modal
        className="modalContainer2"
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Success Modal"
      > <div>
        <h2>Success</h2>
        <p>Callback request sent successfully!</p>
        <button onClick={closeSuccessModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default ResultNavComponent;
