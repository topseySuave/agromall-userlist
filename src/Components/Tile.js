import React from 'react';

const Tile = ({imageBaseUrl, imageData, handleUserClick}) => (
    <div className="tile" onClick={() => handleUserClick(imageData)}>
        <img src={`${imageBaseUrl}${imageData.passport_photo}`} alt={imageData.farmer_id} />
        <div className="title">{`${imageData.first_name} ${imageData.middle_name} ${imageData.surname}`}</div>
    </div>
);

  export default Tile;
