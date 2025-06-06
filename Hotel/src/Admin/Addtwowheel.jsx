
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './twowheel.css';

function Addtwowheel() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    file: null, 
  });

  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('price', formData.price);
    payload.append('max', formData.max);
    payload.append('file', formData.file);

    try {
      const response = await axios.post(
        'http://localhost/hotelbackend/controllers/api/User/post/pic.php',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Response:', response.data);
      alert('Room added successfully!');
      setFormData({
        name: '',
        price: '',
        max: '',
        file: null,
      
      });

    
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add Room. Please try again.');
    }
  };

  return (
    <div className="main-2">
      <div className="twomain">
        <div className="container-two">
          <h1>Add Rooms</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Room Type:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price"> Price (per day):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="brand">Max Occupancy:</label>
                <input
                  type="text"
                  id="max"
                  name="max"
                  value={formData.max}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  name="file"
                  className="file-input"
                  accept="image/*"
                  onChange={handleChange}
                  ref={fileInputRef} 
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addtwowheel;

