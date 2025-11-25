// frontend/src/components/Stats.js
import React from 'react';

const Stats = () => (
  <div className="row g-4">
    <div className="col-6 col-md-3">
      <div className="neo-card text-center" style={{ background: 'var(--bg-sky)' }}>
        <h3 className="display-5 fw-bold">98%</h3>
        <small className="fw-bold">PASS RATE</small>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="neo-card text-center">
        <h3 className="display-5 fw-bold">1.2K</h3>
        <small className="fw-bold">STUDENTS</small>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="neo-card text-center">
        <h3 className="display-5 fw-bold">45+</h3>
        <small className="fw-bold">CLASSROOMS</small>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="neo-card text-center" style={{ background: '#F8D7DA' }}>
        <h3 className="display-5 fw-bold">80+</h3>
        <small className="fw-bold">TEACHERS</small>
      </div>
    </div>
  </div>
);

export default Stats;