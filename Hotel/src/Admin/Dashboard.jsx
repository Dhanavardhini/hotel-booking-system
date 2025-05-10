import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FaAngleDoubleDown } from 'react-icons/fa';
import axios from 'axios';

export default function Dashboard() {
    const [roomBookings, setRoomBookings] = useState(0);
    const [staffCount, setStaffCount] = useState(0);

    useEffect(() => {
      
        axios.get('http://localhost/hotelbackend/controllers/api/User/Get/roombook.php')
            .then(response => {
                console.log('Room Bookings Response:', response.data);
                const count = response.data.length;
                setRoomBookings(count);
            })
            .catch(error => {
                console.error('Error fetching room bookings data:', error);
            });

       
        axios.get('http://localhost/hotelbackend/controllers/api/User/Get/staff.php')
            .then(response => {
                console.log('Staff Details Response:', response.data);
                const count = response.data.length;
                setStaffCount(count);
            })
            .catch(error => {
                console.error('Error fetching staff data:', error);
            });
    }, []);

    return (
        <>
            <main className="main-content">
                <div className="container">
                    <section className="summary-cards">
                        <div className="card1">
                            <h2>Total Users</h2>
                            <p><FaAngleDoubleDown /></p>
                        </div>
                        <div className="card1">
                            <h2>Staff Details</h2>
                            <p><FaAngleDoubleDown /></p>
                        </div>

                        <div className="card2">
                            <h3>Total Room Bookings</h3>
                            <p>{roomBookings}</p>
                        </div>
                        <div className="card2">
                            <h3>Total Staff</h3>
                            <p>{staffCount}</p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
