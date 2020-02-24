import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar-style.css";

const Navbar = props => {
  return (
    <div>
      <div>
        <nav className='navbar'>
          <Link className='navbar-brand' href='#' to='/'>
            <img src='' alt='' className='company-logo' />
          </Link>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link className='nav-link' href='#' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/details'>
                  Shipment Details
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
