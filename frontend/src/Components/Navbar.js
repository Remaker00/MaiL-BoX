import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import Img from './Images/mailLogo.webp';

const Navbar = () => {

  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav>
      <ul className='navbar-link'>
        <div className='nav-mail-logo'>
          <img src={Img} alt='Background Logo' width={50} />
          <h1>MaiL-BoX</h1>
        </div>
        <li>
          <Link to="/mail-box-client" className="link-container">
            <CreateIcon className="create-icon" />
            Compose
          </Link>
        </li>
        <li>
          <Link to="/mail-inbox" className="link-container">
            <InboxIcon className="create-icon" />
            Inbox
          </Link>
        </li>
        <li>
          <Link to="#starred"  className="link-container">
            <StarIcon className="create-icon" />
            Starred
          </Link>
        </li>
        <li>
          <Link to="/mail-sent" className="link-container">
            <SendIcon className="create-icon" />
            Sent
          </Link>
        </li>
        <li>
          <button onClick={handlelogout} className='nav-button'>
            <LogoutIcon className="create-icon" />
            Log Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
