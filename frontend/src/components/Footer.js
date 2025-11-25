// frontend/src/components/Footer.js
import React from 'react';

const Footer = () => (
  <footer style={{ background: 'var(--primary-navy)', color: 'white', padding: '40px 0' }}>
    <div className="container text-center">
      <h4>WILLOW CRESCENT SECONDARY</h4>
      <p className="small text-white-50">Eldorado Park • Est. 2010</p>
      <div className="d-flex justify-content-center gap-4 my-4 fs-4">
        <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
        <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
        <a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a>
      </div>
      <p className="small m-0">&copy; 2024 Willow Crescent. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;