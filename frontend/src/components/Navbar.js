// frontend/src/components/Navbar.js
import React from 'react';

const NavbarWC = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#home">
          <i className="bi bi-mortarboard-fill" style={{ color: 'var(--accent-red)' }}></i>{' '}
          WILLOW<span style={{ color: 'var(--primary-navy)' }}>CRESCENT</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#academics">Academics</a></li>
            <li className="nav-item"><a className="nav-link" href="#gallery">Gallery</a></li>
            <li className="nav-item"><a className="nav-link" href="#policies">Policies</a></li>
            <li className="nav-item"><a className="nav-link" href="#admin">Admin</a></li>
            <li className="nav-item ms-lg-2">
              <a href="#contact" className="btn-custom" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarWC;