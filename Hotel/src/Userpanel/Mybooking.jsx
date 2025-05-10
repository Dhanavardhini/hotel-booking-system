import React, { useState, useEffect } from "react";
import axios from "axios";
import './bb.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost/hotelbackend/controllers/api/User/Get/roombook.php"
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="mybookings-container">
      <h1 className="mybookings-title">My Bookings</h1>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings-text">No bookings available</p>
      ) : (
        <table className="mybookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Number of Days</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.number_of_days}</td>
                <td>{booking.from_date}</td>
                <td>{booking.to_date}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;
