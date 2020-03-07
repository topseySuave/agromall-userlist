import React from 'react';

const RenderModal = ({ handleUserClick, currentUser, imageBaseUrl }) => {
    return (
      <div id="myModal" className="modal">
          <div className="modal-content">
              <span className="close" onClick={() => handleUserClick({})}>&times;</span>
              <center>
                <div className="data-container">
                  <img
                    src={`${imageBaseUrl}${currentUser.passport_photo}`}
                    alt={currentUser.farmer_id}
                  />
                </div>
              </center>
              <div className="full-data">
                <h1>Farmers name: {`${currentUser.first_name} ${currentUser.middle_name} ${currentUser.surname}`}</h1>
                <h2>Date Of Birth: {currentUser.dob}</h2>
                <h2>Gender: {currentUser.gender}</h2>
                <h2>Nationality: {currentUser.nationality}</h2>
                <h3>Address: {currentUser.address}</h3>
                <h4>Mobile: {currentUser.mobile_no}</h4>
                <h4>id type: {currentUser.id_type}</h4>
                <h4>id no: {currentUser.id_no}</h4>
                <h4>issue date: {currentUser.issue_date}</h4>
                <h4>expiry date: {currentUser.expiry_date}</h4>
              </div>
          </div>
      </div>
    );
  };

  export default RenderModal;
