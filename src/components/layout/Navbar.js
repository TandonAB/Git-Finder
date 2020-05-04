import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ title }) => {
  return (
    <nav className="navbar bg-primary">
      <h3>
        <i className="fa fa-github" /> {title}
      </h3>

      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Github Finder',
};
export default Navbar;
