
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './twobooking.css';

function Twobooking() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost/hotelbackend/controllers/api/User/Get/roomimg.php'); 
        setRooms(response.data); 
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <p className="h1two">Rooms Available</p>
      <div className="two-card">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="room-card" key={room.id}>
              <img 
                src={`http://localhost/hotelbackend/controllers/api/User/upload/${room.file}`} 
                width={400} 
                height={200} 
                className="room-image1" 
                alt={room.name} 
              />
              <div className="room-details">
                <div className="room-name">Room Type : {room.name}</div>
                <div className="room-price">Price : ₹ {room.price}</div>
                <div className="room-max">Max Occupancy: {room.max}</div>
              </div>
              <Link to={{pathname: `/bookform/${room.id}`,}}state={{ price: room.price }} >
                <button className="view-button">Book</button>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading rooms...</p>
        )}
      </div>
    </>
  );
}

export default Twobooking;

