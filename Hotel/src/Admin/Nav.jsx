// import React from 'react'
// import './Nav.css'
// import { MdDashboard, MdTwoWheeler } from 'react-icons/md'
// import {  FaBookmark, FaCar, FaUserAlt } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { GrLogout } from 'react-icons/gr'
// import AddBoxIcon from '@mui/icons-material/AddBox';
// function Navbar() {

//   return (
//     <>
// <nav className="sidebar">
//         <div className="logo">Room Booking System</div>
//         <div className="nav-links1">
//             <Link to={"/dash"}><a href="#" ><MdDashboard /> Dashboard</a></Link>
//             {/* <Link to={"/two"}><a href="#"><AddBoxIcon /> Add Rooms</a></Link> */}
//             <Link to={"/two"}><a href="#"><AddBoxIcon /> Add Rooms</a></Link>
//             <Link to={"/user"}><a href="#"><FaUserAlt />Staff List</a></Link>
//             <Link to={"/users"}><a href="#"><FaUserAlt />User List</a></Link>
          
//             <Link to={"/logout"}><a href="#"><GrLogout />Logout</a></Link>
//         </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar
import React from 'react';
import './Nav.css';
import { MdDashboard, MdTwoWheeler } from 'react-icons/md';
import { FaBookmark, FaCar, FaUserAlt } from 'react-icons/fa';
import { Link, useLocation ,Navigate} from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Dashboard } from '@mui/icons-material';

function Navbar() {
  const location = useLocation();

  // Check if the current route is '/bookform' or any other page where you don't want the navbar

  
  return (
    <nav className="sidebar">
      <div className="logo">Room Booking System</div>
      <div className="nav-links1">
        <Link to={"/dash"}>
          <a href="#"><MdDashboard /> Dashboard</a>
        </Link>
        <Link to={"/two"}>
          <a href="#"><AddBoxIcon /> Add Rooms</a>
        </Link>
        <Link to={"/user"}>
          <a href="#"><FaUserAlt /> Staff List</a>
        </Link>
        <Link to={"/users"}>
          <a href="#"><FaUserAlt /> User List</a>
        </Link>
        <Link to={"/logout"}>
          <a href="#"><GrLogout /> Logout</a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
