import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar-style.css";
import logo from "../assets/logo.png";

const Navbar = props => {
  return (
    <div>
      <nav className='navbar'>
        <div>
          <Link className='navbar-brand' href='#' to='/'>
            <img
              class='img-responsive lazyloaded'
              src={logo}
              alt='FreightHub'
            ></img>
          </Link>
        </div>

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
  );
};

export default Navbar;
