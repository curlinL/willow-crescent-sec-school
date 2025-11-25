// frontend/src/components/AboutAcademics.js
import React from 'react';

const AboutAcademics = () => (
  <div className="container">
    <div className="row g-5">
      <div className="col-lg-6">
        <h2>About Us</h2>
        <p>
          <strong>Willow Crescent Secondary School</strong> stands as a pillar of strength in Eldorado Park.
          We believe every child has a unique potential waiting to be unlocked.
        </p>
        <p>From our science labs to our sports fields, we provide the environment for holistic growth.</p>

        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <div className="neo-card p-3">
              <i className="bi bi-trophy-fill text-danger fs-3"></i>
              <h5>Excellence</h5>
              <p className="small m-0">Striving for top results in every grade.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="neo-card p-3">
              <i className="bi bi-people-fill text-danger fs-3"></i>
              <h5>Community</h5>
              <p className="small m-0">Strong ties with Eldos parents.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="academics" className="col-lg-6">
        <h2>Academics</h2>
        <div className="neo-card">
          <ul className="list-unstyled m-0">
            <li className="mb-3 d-flex align-items-center">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <strong>STEM Focus:</strong>&nbsp;Math, Physics &amp; Life Sciences
            </li>
            <li className="mb-3 d-flex align-items-center">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <strong>Commerce:</strong>&nbsp;Accounting &amp; Business Studies
            </li>
            <li className="mb-3 d-flex align-items-center">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <strong>Humanities:</strong>&nbsp;History, Geography &amp; Arts
            </li>
            <li className="mb-3 d-flex align-items-center">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <strong>Languages:</strong>&nbsp;English, Afrikaans &amp; IsiZulu
            </li>
          </ul>
          <hr />
          <p className="small text-muted fst-italic">
            &quot;Our curriculum is designed to prepare students for University and the Workforce.&quot;
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutAcademics;