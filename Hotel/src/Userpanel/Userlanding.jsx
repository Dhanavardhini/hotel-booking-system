import React from 'react'
import "./userlanding.css"
import { Link } from 'react-router-dom'
function Userlanding() {
  return (
    <>
    <div className="user1-main">
    <nav className="navbar-user">
        <div className="navbar-container">
            <div className="logo">Hotel Room Booking System</div>
            <ul className="nav-links">
               <li><a href="#">Home</a></li>
               
                <Link to={"/mybooking"}><li><a href="#">My booking</a></li></Link>
                <Link to={"/userlogin"}><li><a href="#">Logout</a></li></Link>
            </ul>
        </div>
    </nav>

    <div className="hero-image1">
        <div className="hero-text">
         
            <p>Your journey begins with the perfect stay.</p>
            <Link to={"/booktwo"}><a href="#" class="cta-button">Book A Room</a>&nbsp;&nbsp;&nbsp;&nbsp;</Link>
        </div>
    </div>

    <main className="main-content1">
        <div className="card-container1">
            <div className="card">
                <h2>Room Vacancy</h2>
              <h1>20 </h1>
               
               
            </div>
            <div className="card">
                <h2>our staffs on duty</h2>
                <h1>50</h1>
            </div>
           
        </div>
    </main>

    <footer className="footer">
        <div className="footer-container">
            <p>&copy; 2023 Hotel Management System. All rights reserved.</p>
            <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">FAQ</a></li>
            </ul>
        </div>
    </footer>
    </div>
    </>
  )
}

export default Userlanding